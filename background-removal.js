/* GOODSMAKER_BACKGROUND_REMOVAL v63 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;   // Node 테스트용
  if (root) root.GoodsMakerBackground = api;                                 // 브라우저
})(typeof self !== 'undefined' ? self : null, function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  // 사진 배경 자동 투명화
  //
  // 이 파일에는 DOM 이 없다. 전부 (Uint8ClampedArray, w, h) 만 받는 순수
  // 함수라서 Node 에서 그대로 불러 수치로 검사할 수 있다. 실제로 그렇게
  // 검사하고 있다(tools/test-background-removal.js).
  //
  // 네 단계로 나뉜다.
  //   1) 테두리 띠에서 "우세한 단색" 을 찾아 배경색을 정한다.
  //   2) 틈 닫기와 입구 잠금으로 벽을 세운 뒤, 테두리에서 시작해
  //      바깥과 이어진 배경만 물감통처럼 지운다. 안쪽 구멍의 같은 색은
  //      바깥과 안 이어져 있으므로 그대로 남는다.
  //   3) 경계의 안티앨리어싱 픽셀에서 배경색 성분을 빼낸다.
  //      C = α·F + (1-α)·B  →  α 와 F 를 풀어 반투명 픽셀로 되돌린다.
  //   4) 알파를 쓴다.
  // ══════════════════════════════════════════════════════════════════

  const DEFAULTS = Object.freeze({
    edgePercent: 6,        // 테두리에서 몇 % 안쪽까지 훑어 배경색을 찾을지
    tolerance: 24,         // 배경색으로 볼 색 차이(채널 평균 기준, 0~100)
    minCoverage: 0.5,      // 그 띠의 몇 할 이상이 한 색이어야 "단색 배경" 으로 인정할지
    gapClosePx: 0,         // 끊긴 외곽선을 이어 붙일 반지름(px). 0 이면 끄기
    featherPx: 2,          // 경계에서 언믹싱을 시도할 폭(px)
    probeDepth: 7,         // 오브젝트 색을 찾으러 안쪽으로 몇 px 까지 들어갈지
    coreRadius: 2,         // F 를 찾을 안쪽 반원의 반지름(px)
    runTolerance: 18,      // 연속 판정의 색 관용도
    unmix: true,           // 안티앨리어싱 언믹싱을 할지
    sealPoints: [],        // [{x, y, radius}] — 여기는 배경이 못 지나간다
    edgeTrim: 0,           // 외곽에 남은 잡티를 모양으로 골라 지우는 세기(0~100). 0 이면 끄기
    silhouetteMinPx: 0,    // 이 지름(px)보다 작은 떨어진 덩어리·안쪽 구멍을 정리한다. 0 이면 끄기
    protectInsidePx: 0,    // 외곽선의 틈을 이 반경(px)으로 닫고, 그 안쪽에서 새 들어간 배경을 되돌린다. 0 이면 끄기
    haloTrimPx: 0,         // 본체에서 이 거리(px)보다 멀리 뻗은 옅은 번짐을 잘라낸다. 0 이면 끄기
    haloBodyAlpha: 128,    // 무엇을 "본체" 로 볼지의 알파 기준
    minAlpha: 8            // 이보다 옅게 남는 경계 픽셀은 그냥 지운다(0~255)
    //
    // minAlpha 를 0 으로 두지 않는 이유: 캔버스는 내부적으로 알파를 곱해
    // 저장한다(premultiplied). 그래서 putImageData → toDataURL → 다시 읽기
    // 를 거치면 아주 옅은 픽셀의 색이 뭉개진다. 크로미움에서 실측한 값:
    //   α=5  → 색 어긋남 21    α=13 → 9    α=26 → 4    α=64 → 2    α≥230 → 0
    // α 8 미만은 3% 도 안 보이는 픽셀이라 색이 틀어져도 눈에 안 띄지만,
    // 그런 픽셀을 남겨 두면 칼선 계산에서 잡티로 잡힌다. 그래서 지운다.
  });

  // ── 색 거리 ───────────────────────────────────────────────────────
  // 채널 평균 차이와 비슷한 눈금이 되도록 √3 으로 나눈다. 관용도 24 는
  // "채널마다 평균 24 정도까지는 같은 색으로 본다" 로 읽힌다. 휘도 가중을
  // 쓰지 않는 이유: 빨강 배경 위의 파랑처럼 휘도가 비슷하고 색상만 다른
  // 조합에서 가중치가 차이를 뭉개 버린다.
  const INV_SQRT3 = 1 / Math.sqrt(3);
  function colorDistance(r1, g1, b1, r2, g2, b2) {
    const dr = r1 - r2, dg = g1 - g2, db = b1 - b2;
    return Math.sqrt(dr * dr + dg * dg + db * db) * INV_SQRT3;
  }

  // ── 유클리드 거리 변환 (Felzenszwalb) — 제곱거리를 돌려준다 ──────
  function edt1d(f, n, d, v, z) {
    let k = 0;
    v[0] = 0; z[0] = -Infinity; z[1] = Infinity;
    for (let q = 1; q < n; q++) {
      let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
      while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
      k++; v[k] = q; z[k] = s; z[k + 1] = Infinity;
    }
    k = 0;
    for (let q = 0; q < n; q++) {
      while (z[k + 1] < q) k++;
      const dq = q - v[k];
      d[q] = dq * dq + f[v[k]];
    }
  }

  function distanceToMask(mask, w, h, targetValue) {
    const n = w * h, inf = 1e12;
    const temp = new Float32Array(n), out = new Float32Array(n);
    const maxLen = Math.max(w, h);
    const f = new Float64Array(maxLen), d = new Float64Array(maxLen);
    const v = new Int32Array(maxLen), z = new Float64Array(maxLen + 1);
    let anyTarget = false;
    for (let y = 0; y < h; y++) {
      let rowHas = false;
      for (let x = 0; x < w; x++) {
        const hit = mask[y * w + x] === targetValue;
        f[x] = hit ? 0 : inf;
        if (hit) { rowHas = true; anyTarget = true; }
      }
      if (rowHas) { edt1d(f, w, d, v, z); for (let x = 0; x < w; x++) temp[y * w + x] = d[x]; }
      else for (let x = 0; x < w; x++) temp[y * w + x] = inf;
    }
    if (!anyTarget) { out.fill(inf); return out; }
    for (let x = 0; x < w; x++) {
      let colHas = false;
      for (let y = 0; y < h; y++) { f[y] = temp[y * w + x]; if (f[y] < inf * .5) colHas = true; }
      if (colHas) { edt1d(f, h, d, v, z); for (let y = 0; y < h; y++) out[y * w + x] = d[y]; }
      else for (let y = 0; y < h; y++) out[y * w + x] = inf;
    }
    return out;
  }

  function dilateMask(mask, w, h, radius) {
    if (radius <= 0) return new Uint8Array(mask);
    const dist = distanceToMask(mask, w, h, 1), out = new Uint8Array(mask.length);
    const limit = (radius + .35) * (radius + .35);
    for (let i = 0; i < out.length; i++) if (dist[i] <= limit) out[i] = 1;
    return out;
  }

  function erodeMask(mask, w, h, radius) {
    if (radius <= 0) return new Uint8Array(mask);
    const dist = distanceToMask(mask, w, h, 0), out = new Uint8Array(mask.length);
    const limit = radius * radius;
    for (let i = 0; i < out.length; i++) if (mask[i] && dist[i] > limit) out[i] = 1;
    return out;
  }

  // 마스크로 고른 픽셀들의 우세한 색 (v86).
  //
  // 올가미는 사람이 "여기 지워라" 라고 직접 그린 것이다. 그런데 자동 배경
  // 검출이 실패하면(배경이 여러 색이거나 그러데이션이면 실패한다)
  // removeBackground 가 통째로 실패를 돌려주고, 올가미도 같이 버려졌다.
  // 올가미가 자동 검출에 묶여 있을 이유가 없으므로, 검출이 실패하면
  // **올가미 안쪽에서** 기준색을 뽑아 쓴다.
  //
  // detectBackgroundColor 와 같은 방식이다 — 거친 격자(채널 16단계)로
  // 최빈 구간을 잡고, 그 구간 안에서만 평균을 낸다. 처음부터 평균을 내면
  // 서로 다른 색이 섞여 존재하지 않는 색이 나온다.
  function detectDominantColor(data, w, h, mask) {
    const bins = new Int32Array(16 * 16 * 16);
    const sums = new Float64Array(16 * 16 * 16 * 3);
    let sampled = 0;
    for (let i = 0; i < w * h; i++) {
      if (mask && !mask[i]) continue;
      const t = i * 4;
      if (data[t + 3] < 8) continue;
      const r = data[t], g = data[t + 1], b = data[t + 2];
      const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
      bins[key]++; sums[key * 3] += r; sums[key * 3 + 1] += g; sums[key * 3 + 2] += b;
      sampled++;
    }
    if (!sampled) return { ok: false, reason: '고른 자리에 불투명한 픽셀이 없습니다.' };
    let best = -1, bestCount = 0;
    for (let k = 0; k < bins.length; k++) if (bins[k] > bestCount) { bestCount = bins[k]; best = k; }
    if (best < 0) return { ok: false, reason: '색을 찾지 못했습니다.' };
    const c = bins[best];
    return {
      ok: true,
      color: {
        r: Math.round(sums[best * 3] / c),
        g: Math.round(sums[best * 3 + 1] / c),
        b: Math.round(sums[best * 3 + 2] / c)
      },
      coverage: c / sampled,
      sampled
    };
  }

  // ══════════════════════════════════════════════════════════════════
  // 외곽선 안쪽 보호 (v86)
  //
  // 흰 종이 위의 흰 채움(사용자 도안의 머리카락·코트가 그렇다)은 외곽선이
  // 유일한 벽이다. 그 벽에 몇 픽셀짜리 틈만 있어도 물감통이 새 들어가
  // **안쪽을 통째로 먹는다.** 합성으로 재보니 3px 틈 세 개에 안쪽의
  // 99.2% 가 사라졌다.
  //
  // v81 은 이걸 "조각이 끊겼습니다" 로 알려 주기만 했다(틈 닫기 기본값 0).
  // 사용자 제안: "화이트 패스 딴 부분 안쪽으로는 픽셀이 안 지워지게".
  // 그대로 한다 — 다만 벽은 **사용자가 그린 선**에서 딴다.
  //
  //   1) 잉크 = 원본에서 배경색과 충분히 다른 픽셀 (= 그린 선)
  //   2) 그 잉크를 반경 r 로 닫아(팽창→침식) 외곽선의 틈을 잇는다
  //   3) 테두리에서 흘려, 그 벽을 못 넘는 곳이 "외곽선 안쪽"
  //   4) 안쪽인데 지워진 픽셀은 원본으로 되돌린다
  //
  // 머리카락 사이처럼 **진짜로 뚫린 곳**은 잉크가 감싸지 않아 바깥과
  // 이어지므로 되돌리지 않는다 — 도넛 구멍 문제가 생기지 않는다.
  //
  // 반경을 키우면 가까이 붙은 두 획이 이어져 그 사이가 "안쪽" 이 된다.
  // 그래서 기본값을 작게 잡았다. 값별 실측은 인수인계 문서에 있다.
  // ══════════════════════════════════════════════════════════════════
  // 벽으로 칠 잉크의 색 거리 상한. 채움이 배경과 이보다 가까우면 채움도 잉크가
  // 되는데, 그 경우는 어차피 물감통이 채움을 먹는 경우라 벽으로 세는 편이 맞다.
  const WALL_INK_MAX = 12;

  // 그린 선이 감싸고 있는 안쪽을 돌려준다 (v88 에서 올가미도 쓰도록 분리).
  // 벽 = 잉크를 반경 r 로 팽창시킨 것, 안쪽 = 테두리에서 흘려 못 닿는 곳.
  // core 는 벽까지 포함하지 않은 순수 안쪽, mask 는 벽의 안쪽 절반까지 포함한다.
  function outlineInterior(data, w, h, bgColor, options = {}) {
    const reach = Math.max(0, Math.round(Number(options.protectInsidePx) || 0));
    if (reach <= 0 || !bgColor) return null;
    const n = w * h;
    const tol = Math.max(4, Math.min(Number(options.tolerance) || 0, WALL_INK_MAX));
    const ink = new Uint8Array(n);
    let anyInk = false;
    for (let i = 0; i < n; i++) {
      const t = i * 4;
      if (data[t + 3] === 0) continue;
      if (colorDistance(data[t], data[t + 1], data[t + 2], bgColor.r, bgColor.g, bgColor.b) > tol) { ink[i] = 1; anyInk = true; }
    }
    if (!anyInk) return null;
    const wall = dilateMask(ink, w, h, reach);
    const outside = new Uint8Array(n), stack = new Int32Array(n);
    let top = 0;
    const push = (i) => { if (!outside[i] && !wall[i]) { outside[i] = 1; stack[top++] = i; } };
    for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
    for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
    while (top > 0) {
      const i = stack[--top], x = i % w, y = (i - x) / w;
      if (x > 0) push(i - 1);
      if (x < w - 1) push(i + 1);
      if (y > 0) push(i - w);
      if (y < h - 1) push(i + w);
    }
    const core = new Uint8Array(n);
    for (let i = 0; i < n; i++) if (!outside[i] && !wall[i]) core[i] = 1;
    const grown = dilateMask(core, w, h, reach);
    const mask = new Uint8Array(n);
    for (let i = 0; i < n; i++) if (!outside[i] && (core[i] || grown[i])) mask[i] = 1;
    return { mask, core, outside };
  }

  function protectInsideOutline(out, data, w, h, bgColor, options = {}) {
    const reach = Math.max(0, Math.round(Number(options.protectInsidePx) || 0));
    if (reach <= 0 || !bgColor) return { restored: 0, enclosed: 0 };
    const n = w * h;
    // 벽의 잉크 기준은 **배경 관용도보다 낮아야 한다.**
    // 벽이 답할 질문은 "이 픽셀이 배경인가" 가 아니라 "여기 뭔가 그려졌는가" 다.
    // 관용도를 그대로 쓰면 연한 회색으로 그린 머리카락 선(배경과의 거리 25 남짓)이
    // 관용도 30 에 걸려 잉크가 아니게 되고, 벽에 그만큼 구멍이 뚫린다.
    // 그 구멍으로 배경이 새 들어가 안쪽을 먹는다 — 사용자가 "아직도 좀 심해" 라고
    // 한 자리가 이것이다. 그래서 상한을 따로 둔다.
    const tol = Math.max(4, Math.min(Number(options.tolerance) || 0, WALL_INK_MAX));

    const ink = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      const t = i * 4;
      if (data[t + 3] === 0) continue;
      if (colorDistance(data[t], data[t + 1], data[t + 2], bgColor.r, bgColor.g, bgColor.b) > tol) ink[i] = 1;
    }
    // 잉크가 아예 없으면 벽이 없다 — 아무것도 되돌리지 않는다.
    let anyInk = false;
    for (let i = 0; i < n && !anyInk; i++) if (ink[i]) anyInk = true;
    if (!anyInk) return { restored: 0, enclosed: 0 };

    // 벽은 **팽창만** 한다. 여기서 한 번 틀렸다 — 팽창→침식(모폴로지 닫기)로
    // 틈을 이으려 했는데, 얇은 선이 끊긴 자리는 닫기로 안 이어진다. 팽창이
    // 만든 다리는 침식 반경보다 얇아 침식이 도로 지워 버린다. 실측에서
    // "감싸인 영역 = 잉크 넓이" 로 나와(안쪽이 하나도 안 감싸였다) 잡았다.
    const wall = dilateMask(ink, w, h, reach);

    const outside = new Uint8Array(n), stack = new Int32Array(n);
    let top = 0;
    const push = (i) => { if (!outside[i] && !wall[i]) { outside[i] = 1; stack[top++] = i; } };
    for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
    for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
    while (top > 0) {
      const i = stack[--top], x = i % w, y = (i - x) / w;
      if (x > 0) push(i - 1);
      if (x < w - 1) push(i + 1);
      if (y > 0) push(i - w);
      if (y < h - 1) push(i + w);
    }

    // 벽을 팽창시킨 만큼 안쪽이 반경 r 만큼 모자라다. 그 띠를 되찾되,
    // **바깥으로는 못 나가게** 자른다. 벽이 잉크 양쪽으로 r 씩이라
    // 안쪽을 r 만큼 키워도 바깥 영역에는 닿지 않는다.
    const core = new Uint8Array(n);
    for (let i = 0; i < n; i++) if (!outside[i] && !wall[i]) core[i] = 1;
    const grown = dilateMask(core, w, h, reach);

    let restored = 0, enclosed = 0;
    for (let i = 0; i < n; i++) {
      if (outside[i]) continue;
      if (!core[i] && !grown[i]) continue;      // 벽의 바깥쪽 절반은 건드리지 않는다
      enclosed++;
      const t = i * 4;
      if (out[t + 3] !== 0 || data[t + 3] === 0) continue;
      out[t] = data[t]; out[t + 1] = data[t + 1]; out[t + 2] = data[t + 2]; out[t + 3] = data[t + 3];
      restored++;
    }
    return { restored, enclosed };
  }

  // ══════════════════════════════════════════════════════════════════
  // 가장자리 번짐(헤일로) 잘라내기 (v83)
  //
  // 원본에 알파가 없는 도안이라도, 원본의 가장자리가 부드러우면(JPEG 로
  // 뭉갠 선화가 특히 그렇다) 언믹싱이 그 부드러움을 **충실하게** 알파
  // 램프로 옮긴다. 흰 종이 위에서는 맞는 그림이지만, 검은 배경에 놓으면
  // 그 램프가 회색 번짐으로 보인다.
  //
  // 실측(선화 한 장): 부분알파 13,903px 중
  //   본체 안 반투명        5,551px
  //   거리 1 (진짜 AA)      3,331px   ← 이건 지우면 안 된다. 계단이 생긴다
  //   거리 2~6 (번짐)       5,021px   ← 평균 알파 15.7, 87% 가 알파 32 미만
  //
  // 그래서 **본체(알파 128 이상)에서 얼마나 멀리 뻗었는가**로 가른다.
  // 알파 크기로 자르면 진짜 반투명한 면까지 같이 얇아진다.
  //
  // 딱 잘라 내지 않고 1px 에 걸쳐 잦아들게 한다. 유클리드 거리라 이 잦아듦이
  // 소수점까지 매끄럽고, 그래서 새 계단이 생기지 않는다.
  // ══════════════════════════════════════════════════════════════════
  function trimEdgeHalo(data, w, h, options = {}) {
    const reach = Number(options.haloTrimPx) || 0;
    if (reach <= 0) return { cleared: 0, faded: 0 };
    const bodyAlpha = Math.max(1, Math.min(255, options.haloBodyAlpha || 128));
    const n = w * h, body = new Uint8Array(n);
    let anyBody = false;
    for (let i = 0; i < n; i++) if (data[i * 4 + 3] >= bodyAlpha) { body[i] = 1; anyBody = true; }
    // 본체가 하나도 없으면 기준이 없다 — 아무것도 건드리지 않는다.
    if (!anyBody) return { cleared: 0, faded: 0 };

    // 바깥과 이어진 자리만 손댄다. 이걸 안 하면 그림 **안쪽**의 진짜 반투명한
    // 면(유리·물·연기)이 통째로 지워진다 — 그 한가운데는 불투명 픽셀에서
    // 멀리 떨어져 있어 거리만 보면 번짐과 구별이 안 되기 때문이다.
    // (테스트에서 알파 100 짜리 10×10 면이 실제로 사라졌다.)
    // "배경" 은 두 갈래다. 테두리에서 이어진 곳, 그리고 knownBackground 로 받은
    // 곳 — **올가미가 방금 지운 주머니**다. 가닥 사이에 갇혀 테두리에서 못 닿지만
    // 사람이 "여기가 배경" 이라고 짚어 준 자리다. 이걸 안 넣으면 주머니
    // 가장자리의 번짐만 안 잘려 자동으로 지운 데와 결이 달라진다.
    const known = options.knownBackground || null;
    const outside = new Uint8Array(n), stack = new Int32Array(n);
    let top = 0;
    const push = (i) => { if (!outside[i] && !body[i]) { outside[i] = 1; stack[top++] = i; } };
    for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
    for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
    if (known) { for (let i = 0; i < n; i++) if (known[i]) push(i); }
    while (top > 0) {
      const i = stack[--top], x = i % w, y = (i - x) / w;
      if (x > 0) push(i - 1);
      if (x < w - 1) push(i + 1);
      if (y > 0) push(i - w);
      if (y < h - 1) push(i + w);
    }

    const dist2 = distanceToMask(body, w, h, 1);
    // 잘라 내는 폭. 1.5 도 재 봤지만 먼 꼬리가 지워지지 않고 흐려지기만 해서
    // (거리4 잔여 599px vs 116px) 1.0 으로 뒀다. 안전 쪽 수치는 둘이 같았다 —
    // 지워진 알파의 최댓값 79 대 83, 알파 128 넘게 지운 픽셀은 양쪽 다 0개.
    //
    // 곧은 수직·수평 가장자리에서는 거리가 정수로 떨어져 사실상 딱 잘린다.
    // 지워지는 픽셀이 알파 80 아래라 그 계단은 눈에 안 띈다. 곡선·사선에서는
    // 거리가 소수라 실제로 매끄럽게 잦아든다 — 진짜 도안은 거의 다 이쪽이다.
    const FADE = 1.0;
    let cleared = 0, faded = 0;
    for (let i = 0; i < n; i++) {
      const t = i * 4, a = data[t + 3];
      if (a === 0 || !outside[i]) continue;
      const d = Math.sqrt(dist2[i]);
      if (d <= reach) continue;
      const keep = Math.max(0, 1 - (d - reach) / FADE);
      const na = Math.round(a * keep);
      if (na === a) continue;
      data[t + 3] = na;
      if (na === 0) cleared++; else faded++;
    }
    return { cleared, faded };
  }

  // ══════════════════════════════════════════════════════════════════
  // 1) 배경색 찾기
  //    테두리에서 안쪽으로 edgePercent 만큼 들어간 띠를 훑는다. 꼭짓점은
  //    두 변이 겹쳐 자연히 두 번 세어지므로, 모서리보다 무겁게 잡힌다 —
  //    "꼭짓점·모서리를 우세하게 감싸고 있는" 색을 찾는 목적에 맞는다.
  // ══════════════════════════════════════════════════════════════════
  function detectBackgroundColor(data, w, h, options) {
    const opt = Object.assign({}, DEFAULTS, options || {});
    const band = Math.max(1, Math.round(Math.min(w, h) * opt.edgePercent / 100));
    const tol = opt.tolerance;

    // 거친 격자(채널 16단계)로 최빈 구간을 먼저 잡는다. 처음부터 평균을 내면
    // 배경과 오브젝트가 섞여 둘 사이 어딘가의 존재하지 않는 색이 나온다.
    const bins = new Int32Array(16 * 16 * 16);
    const sums = new Float64Array(16 * 16 * 16 * 3);
    let sampled = 0;

    const visit = (x, y) => {
      const i = (y * w + x) * 4;
      if (data[i + 3] < 8) return;              // 이미 투명한 곳은 표본에서 뺀다
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
      bins[key]++; sums[key * 3] += r; sums[key * 3 + 1] += g; sums[key * 3 + 2] += b;
      sampled++;
    };
    for (let y = 0; y < h; y++) {
      const edgeRow = y < band || y >= h - band;
      for (let x = 0; x < w; x++) {
        if (edgeRow || x < band || x >= w - band) visit(x, y);
      }
    }
    if (!sampled) return { ok: false, reason: '테두리가 이미 전부 투명합니다.' };

    let best = -1, bestCount = 0;
    for (let k = 0; k < bins.length; k++) if (bins[k] > bestCount) { bestCount = bins[k]; best = k; }
    let br = sums[best * 3] / bestCount, bg = sums[best * 3 + 1] / bestCount, bb = sums[best * 3 + 2] / bestCount;

    // 격자 경계에 걸쳐 갈라진 색을 모아 두 번 다듬는다.
    for (let pass = 0; pass < 2; pass++) {
      let sr = 0, sg = 0, sb = 0, n = 0;
      for (let y = 0; y < h; y++) {
        const edgeRow = y < band || y >= h - band;
        for (let x = 0; x < w; x++) {
          if (!(edgeRow || x < band || x >= w - band)) continue;
          const i = (y * w + x) * 4;
          if (data[i + 3] < 8) continue;
          if (colorDistance(data[i], data[i + 1], data[i + 2], br, bg, bb) <= tol) {
            sr += data[i]; sg += data[i + 1]; sb += data[i + 2]; n++;
          }
        }
      }
      if (!n) break;
      br = sr / n; bg = sg / n; bb = sb / n;
    }

    // 얼마나 우세한지, 그리고 네 변을 실제로 감싸고 있는지 센다.
    let inTol = 0, total = 0;
    const edgeHit = [0, 0, 0, 0], edgeTotal = [0, 0, 0, 0];
    for (let y = 0; y < h; y++) {
      const edgeRow = y < band || y >= h - band;
      for (let x = 0; x < w; x++) {
        if (!(edgeRow || x < band || x >= w - band)) continue;
        const i = (y * w + x) * 4;
        if (data[i + 3] < 8) continue;
        total++;
        const near = colorDistance(data[i], data[i + 1], data[i + 2], br, bg, bb) <= tol;
        if (near) inTol++;
        const sides = [];
        if (y < band) sides.push(0);
        if (y >= h - band) sides.push(1);
        if (x < band) sides.push(2);
        if (x >= w - band) sides.push(3);
        for (const s of sides) { edgeTotal[s]++; if (near) edgeHit[s]++; }
      }
    }
    const coverage = total ? inTol / total : 0;
    const sidesCovered = edgeHit.reduce((acc, hit, idx) => acc + (edgeTotal[idx] && hit / edgeTotal[idx] >= 0.35 ? 1 : 0), 0);

    return {
      ok: coverage >= opt.minCoverage,
      color: { r: Math.round(br), g: Math.round(bg), b: Math.round(bb) },
      coverage, sidesCovered, bandPx: band, sampled: total,
      reason: coverage >= opt.minCoverage ? '' :
        `테두리 ${opt.edgePercent}% 안에서 한 가지 색이 차지하는 비율이 ${Math.round(coverage * 100)}% 뿐입니다. 단색 배경이 아니거나, 범위·관용도를 넓혀야 합니다.`
    };
  }

  // ══════════════════════════════════════════════════════════════════
  // 2) 바깥과 이어진 배경만 지우기
  // ══════════════════════════════════════════════════════════════════
  // seedMask 를 주면 **테두리 대신 그 마스크에서** 물감통이 번진다(올가미).
  // 그 밖의 모든 단계는 테두리에서 번질 때와 글자 하나 다르지 않다 — 그래서
  // 올가미도 언믹싱·잡티 정리·구멍 되돌리기를 똑같이 받는다.
  function buildBackgroundRegion(data, w, h, bgColor, opt) {
    const n = w * h;
    const seed = opt.seedMask || null;
    const isBg = new Uint8Array(n);       // 색이 배경색과 같은가
    const opaque = new Uint8Array(n);     // 원래 알파가 있는가
    const tol = opt.tolerance;
    for (let i = 0, p = 0; i < n; i++, p += 4) {
      const a = data[p + 3];
      opaque[i] = a >= 8 ? 1 : 0;
      if (a < 8) { isBg[i] = 1; continue; } // 이미 투명한 곳은 배경으로 친다
      if (colorDistance(data[p], data[p + 1], data[p + 2], bgColor.r, bgColor.g, bgColor.b) <= tol) isBg[i] = 1;
    }

    // 물감이 지나갈 수 있는 곳 = 배경색인 곳. 입구 잠금 지점은 그 자리에
    // 원반 하나를 세우는 것과 같아서, 지날 수 없는 곳으로 뺀다.
    // 테두리에서 번질 때는 이미 투명한 곳도 지나갈 수 있다(그쪽이 곧 바깥이다).
    // 올가미는 다르다 — 이미 지워 놓은 배경을 타고 넘으면 대지 전체로 번져
    // 올가미를 두른 뜻이 없어진다. **아직 남아 있는** 배경색만 지나간다.
    const passable = new Uint8Array(n);
    for (let i = 0; i < n; i++) passable[i] = seed ? (isBg[i] && opaque[i]) : isBg[i];
    for (const point of (opt.sealPoints || [])) {
      const cx = Math.round(point.x), cy = Math.round(point.y);
      const rad = Math.max(1, Math.round(point.radius || 3));
      const r2 = rad * rad;
      for (let y = Math.max(0, cy - rad); y <= Math.min(h - 1, cy + rad); y++) {
        for (let x = Math.max(0, cx - rad); x <= Math.min(w - 1, cx + rad); x++) {
          const dx = x - cx, dy = y - cy;
          if (dx * dx + dy * dy <= r2) passable[y * w + x] = 0;
        }
      }
    }

    const floodFromBorder = allowed => {
      const reach = new Uint8Array(n), queue = new Int32Array(n);
      let head = 0, tail = 0;
      const push = i => { if (i < 0 || i >= n || reach[i] || !allowed[i]) return; reach[i] = 1; queue[tail++] = i; };
      if (seed) { for (let i = 0; i < n; i++) if (seed[i]) push(i); }
      else {
      for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
      for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
      }
      while (head < tail) {
        const i = queue[head++], x = i % w, y = (i / w) | 0;
        if (x > 0) push(i - 1);
        if (x < w - 1) push(i + 1);
        if (y > 0) push(i - w);
        if (y < h - 1) push(i + w);
      }
      return { reach, count: tail };
    };

    // ── 틈 닫기 ────────────────────────────────────────────────────
    // 처음에는 오브젝트 쪽을 "닫기(팽창→침식)" 해서 벽을 세웠는데, 벽이
    // 얇을 때 실패했다. 두께 3px 짜리 선의 8px 틈을 반지름 5 로 닫아 보면
    // 팽창은 틈을 메우지만 이어진 부분이 가늘어서 침식이 도로 뚫는다.
    // (실측: 팽창 후 x=80,y=41 은 벽인데 침식 후 다시 구멍)
    //
    // 그래서 배경 쪽을 깎는 방식으로 바꿨다. 배경을 r 만큼 침식하면 폭이
    // 2r 보다 좁은 통로는 아예 사라진다. 그 상태에서 테두리부터 번진 뒤,
    // 다시 r 만큼 넓혀 원래 배경 두께를 되찾는다(= 열기 연산).
    // 넓힐 때 잠금 원반을 뛰어넘지 않도록 마지막에 연결성으로 한 번 더 거른다.
    let reach = null, gapFallback = false;
    const r = opt.gapClosePx > 0 ? Math.max(1, Math.round(opt.gapClosePx)) : 0;
    if (r > 0) {
      const core = erodeMask(passable, w, h, r);
      const coreReach = floodFromBorder(core);
      if (coreReach.count > 0) {
        const grown = dilateMask(coreReach.reach, w, h, r);
        const allowed = new Uint8Array(n);
        for (let i = 0; i < n; i++) allowed[i] = (grown[i] && passable[i]) ? 1 : 0;
        reach = floodFromBorder(allowed).reach;
      } else {
        // 바깥 배경이 통째로 2r 보다 얇으면 깎을 것이 남지 않는다.
        // 이때는 틈 닫기를 포기하고 평범하게 번진다(조용히 아무것도 안
        // 지우는 것보다 낫다).
        gapFallback = true;
      }
    }
    if (!reach) reach = floodFromBorder(passable).reach;

    // ── 올가미: 걷어낼 덩어리와 아닌 덩어리를 가른다 ────────────────
    //
    // 실측이 길을 정해 줬다. 사용자 도안의 머리카락 뭉치 위에 올가미를 두르고
    // 그 안의 흰 덩어리 195개를 재 보니 이렇게 갈렸다.
    //
    //   그림 채움  70,356px 중 올가미 안 21,206px (30%)   ← 건드리면 안 된다
    //              33,221px 중          15,513px (47%)
    //               6,459px 중           3,631px (56%)
    //   가닥 사이   5,455px 중           5,455px (100%)   ← 지워야 한다
    //   주머니      2,865px 중           2,865px (100%)
    //
    // 채움은 올가미 밖으로 크게 뻗고, 주머니는 올가미 안에 담겨 있다.
    // 그래서 판단은 **덩어리 단위 · 담긴 비율**로 한다.
    //
    // 여기서 "안쪽만 지운다" 는 안 된다. 그러면 위 채움의 21,206px 이
    // 그대로 뚫린다 — 사용자가 내보낸 그림·화이트에서 본 바로 그 구멍이다.
    // 사용자 지시: "걷어낼 영역과 아닌 영역을 판별해서 아닌 영역은 어떤
    // 픽셀도 떨어지지 않게." 그러니 뻗은 덩어리는 **통째로** 놔둔다.
    //
    // (외곽선 안쪽 판정 outlineInterior 로도 갈라 보려 했지만 — v88 이 그렇게
    //  했다 — 같은 도안에서 주머니가 100% 와 0%, 채움이 99% 와 0% 로 나와
    //  어느 반경에서도 신호가 되지 않는다. 실측해서 버린 길이다.)
    let spilledLobes = 0;
    if (seed) {
      const ratio = Number.isFinite(opt.spillRatio) ? opt.spillRatio : 0.5;
      const seen = new Uint8Array(n), stack = new Int32Array(n), blob = new Int32Array(n);
      for (let start = 0; start < n; start++) {
        if (!reach[start] || seen[start]) continue;
        let top = 0, count = 0, inside = 0;
        seen[start] = 1; stack[top++] = start;
        while (top) {
          const i = stack[--top];
          blob[count++] = i;
          if (seed[i]) inside++;
          const x = i % w, y = (i / w) | 0;
          if (x > 0 && reach[i - 1] && !seen[i - 1]) { seen[i - 1] = 1; stack[top++] = i - 1; }
          if (x < w - 1 && reach[i + 1] && !seen[i + 1]) { seen[i + 1] = 1; stack[top++] = i + 1; }
          if (y > 0 && reach[i - w] && !seen[i - w]) { seen[i - w] = 1; stack[top++] = i - w; }
          if (y < h - 1 && reach[i + w] && !seen[i + w]) { seen[i + w] = 1; stack[top++] = i + w; }
        }
        // 삐져나온 몫이 담긴 몫의 ratio 배를 넘으면 그림 쪽으로 본다.
        // 넘지 않으면 페인트통처럼 덩어리째(삐져나온 자락까지) 지운다.
        if ((count - inside) > inside * ratio) {
          for (let k = 0; k < count; k++) reach[blob[k]] = 0;
          spilledLobes++;
        }
      }
    }

    // 지울 곳 = 물감통이 닿을 수 있고 + 실제로 배경색인 곳.
    const remove = new Uint8Array(n);
    let removed = 0;
    for (let i = 0; i < n; i++) if (reach[i] && isBg[i] && opaque[i]) { remove[i] = 1; removed++; }
    // 원래 투명했던 곳도 배경으로 취급해 경계 계산에 넣는다(알파는 그대로 0).
    const bgAll = new Uint8Array(n);
    for (let i = 0; i < n; i++) bgAll[i] = (remove[i] || !opaque[i]) ? 1 : 0;

    return { isBg, opaque, remove, bgAll, removed, reach, gapFallback, spilledLobes };
  }

  // ══════════════════════════════════════════════════════════════════
  // 3) 안티앨리어싱 언믹싱
  //
  //    경계 픽셀은 배경 B 와 오브젝트 F 가 α 로 섞인 값이다.
  //        C = α·F + (1-α)·B
  //    B 는 알고 있고 F 는 "좀 더 안쪽에서 일정 픽셀 이상 연속되는 색" 을
  //    표본으로 삼아 정한다. 그러면 α 는 C-B 를 F-B 에 정사영해서 얻는다.
  //        α = (C-B)·(F-B) / |F-B|²
  //    빨강 배경 + 파랑 오브젝트의 보라 픽셀 → 파랑 + α 0.5.
  //    흰 배경 + 유색 오브젝트의 희끄무레한 픽셀 → 오브젝트 색 + 낮은 α.
  //    (희끗한 테두리가 남지 않는다.)
  // ══════════════════════════════════════════════════════════════════
  // F 는 "안쪽으로 파고들며 만나는 색 중 **배경색에서 가장 먼 것**" 으로 잡는다.
  //
  // v78 이전에는 "관용도 안에서 가장 길게 이어지는 구간" 을 찾아 그 중앙값을
  // 썼다(minRun 3칸 이상). 그 방식은 굵은 색면에는 맞지만 **선화에서는 거의
  // 항상 실패한다** — 경계 안쪽에 있는 것은 두께 2~3px 짜리 외곽선이라 3칸을
  // 못 채우고, 실패하면 unmixEdges 가 그 픽셀을 통째로 건너뛴다. 그래서 흰
  // 채움 + 얇은 검은 외곽선 도안에서는 언믹싱이 사실상 꺼져 있었다.
  // (실측: 경계 알파 평균 오차 0.347 · 이웃 간 급변 560곳. 경계폭을 2 에서
  //  6 으로 올려도 숫자가 한 자리도 안 바뀌었다 = 아무 일도 안 하고 있었다.)
  //
  // 가장 먼 색을 고르면 그 자리가 곧 선의 심지다. 색면에서는 색면 자체가
  // 가장 먼 색이므로 예전 방식과 같은 답을 준다. 잡티 하나에 끌려가지 않도록
  // 가장 먼 세 개의 채널별 중앙값을 쓴다.
  function sampleForegroundColor(data, w, h, x0, y0, dirX, dirY, bgAll, opt, B) {
    // 1px 씩 걷는 직선 탐침으로는 두께 2px 짜리 선의 심지를 건너뛴다.
    // (실측: 심지 45,45,50 대신 램프 픽셀 159,160,164 를 F 로 잡아 α 가
    //  0.5 여야 할 자리에서 1.0 이 나왔다 — 경계 픽셀 152개가 그렇게 꽉
    //  채워졌다.) 그래서 안쪽 방향 **반원 이웃**을 통째로 훑는다. 반지름
    //  안에 심지가 있으면 어느 각도에서 들어와도 반드시 걸린다.
    // 반지름을 넓히면 얇은 선의 심지를 더 잘 찾지만, 외곽선이 없는 면의
    // 가장자리에서 **안쪽에 있는 다른 선**까지 집어 와 어두운 헤일로를
    // 만든다. 그래서 probeDepth 와 따로 두고 좁게 잡는다.
    const rad = Math.max(1, Math.round(opt.coreRadius));
    const r2 = rad * rad;
    const picks = [];
    for (let dy = -rad; dy <= rad; dy++) {
      for (let dx = -rad; dx <= rad; dx++) {
        if (!dx && !dy) continue;
        if (dx * dx + dy * dy > r2) continue;
        if (dx * dirX + dy * dirY <= 0) continue;   // 안쪽 반원만
        const x = x0 + dx, y = y0 + dy;
        if (x < 0 || y < 0 || x >= w || y >= h) continue;
        const i = y * w + x;
        if (bgAll[i]) continue;
        const p = i * 4;
        if (data[p + 3] < 8) continue;
        picks.push({
          d: colorDistance(data[p], data[p + 1], data[p + 2], B.r, B.g, B.b),
          r: data[p], g: data[p + 1], b: data[p + 2]
        });
      }
    }
    if (!picks.length) return null;
    // 배경색에서 가장 먼 색이 곧 선의 심지(또는 색면 자체)다. 잡티 하나에
    // 끌려가지 않도록 가장 먼 세 개의 채널별 중앙값을 쓴다.
    picks.sort((a, b) => b.d - a.d);
    const take = picks.slice(0, Math.min(3, picks.length));
    const mid = arr => { arr.sort((a, b) => a - b); return arr[(arr.length - 1) >> 1]; };
    return { r: mid(take.map(v => v.r)), g: mid(take.map(v => v.g)), b: mid(take.map(v => v.b)) };
  }

  function unmixEdges(data, w, h, bgColor, region, opt) {
    const { bgAll, remove, opaque } = region;
    const n = w * h;
    // 경계에서 featherPx 안쪽(오브젝트 쪽)과 1px 바깥(지울 쪽)을 함께 본다.
    // 바깥쪽 한 겹을 넣는 이유: 관용도 안에 겨우 들어와 지워질 픽셀 중에도
    // 오브젝트 성분이 조금 남아 있는 것이 있어, 그냥 지우면 경계가 깎인다.
    const distToBg = distanceToMask(bgAll, w, h, 1);
    const distToObj = distanceToMask(bgAll, w, h, 0);
    const outAlpha = new Float32Array(n);
    const outColor = new Uint8ClampedArray(n * 3);
    const touched = new Uint8Array(n);
    // 바깥쪽 띠도 경계폭을 따라간다. 안티앨리어싱은 배경 쪽으로도 번지는데
    // 1.6px 로 못 박아 두면 그 바깥 절반이 손도 안 닿은 채 잘려 나간다.
    const outReach = Math.max(1.6, Math.min(opt.featherPx, 4));
    const bandOut = outReach * outReach;
    const bandIn = (opt.featherPx + .35) * (opt.featherPx + .35);
    const B = bgColor;
    let unmixed = 0;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const isRemoved = remove[i] === 1;
        if (!opaque[i]) continue;
        if (isRemoved) { if (distToObj[i] > bandOut) continue; }
        else if (distToBg[i] > bandIn) continue;

        const p = i * 4;
        const C = [data[p], data[p + 1], data[p + 2]];
        // 배경에서 멀어지는 방향 = 지울 영역의 반대쪽. 주변 8칸에서
        // 배경 쪽 무게중심을 구해 그 반대로 파고든다.
        let sx = 0, sy = 0, cnt = 0;
        for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h || (!dx && !dy)) continue;
          if (bgAll[ny * w + nx]) { sx += dx; sy += dy; cnt++; }
        }
        if (!cnt) continue;
        const norm = Math.hypot(sx, sy) || 1;
        const dirX = -sx / norm, dirY = -sy / norm;

        const F = sampleForegroundColor(data, w, h, x, y, dirX, dirY, bgAll, opt, B);
        if (!F) continue;
        const fr = F.r - B.r, fg = F.g - B.g, fb = F.b - B.b;
        const denom = fr * fr + fg * fg + fb * fb;
        // 오브젝트 색이 배경색과 거의 같으면 나눌 것이 없다. 손대지 않는다.
        if (denom < 12) continue;
        const cr = C[0] - B.r, cg = C[1] - B.g, cb = C[2] - B.b;
        let alpha = (cr * fr + cg * fg + cb * fb) / denom;
        if (!(alpha > 0)) alpha = 0;
        if (alpha > 1) alpha = 1;

        // 되찾은 색 F' = (C - (1-α)B) / α.
        // α 가 작을수록 0 으로 나누는 쪽이라 값이 튄다. 그래서 α 가 낮을 때는
        // 표본으로 잡은 F 를 그대로 쓰고, 높을 때만 F' 로 옮겨 간다.
        let outR = F.r, outG = F.g, outB = F.b;
        if (alpha > 0.02) {
          const inv = 1 / alpha;
          const pr = (C[0] - (1 - alpha) * B.r) * inv;
          const pg = (C[1] - (1 - alpha) * B.g) * inv;
          const pb = (C[2] - (1 - alpha) * B.b) * inv;
          let t = (alpha - 0.3) / 0.4;                 // 0.3~0.7 사이에서 갈아탄다
          t = t < 0 ? 0 : t > 1 ? 1 : t;
          t = t * t * (3 - 2 * t);                     // smoothstep
          outR = F.r + (pr - F.r) * t;
          outG = F.g + (pg - F.g) * t;
          outB = F.b + (pb - F.b) * t;
        }
        outAlpha[i] = alpha * (data[p + 3] / 255);
        outColor[i * 3] = outR; outColor[i * 3 + 1] = outG; outColor[i * 3 + 2] = outB;
        touched[i] = 1;
        unmixed++;
      }
    }
    return { outAlpha, outColor, touched, unmixed };
  }

  // ══════════════════════════════════════════════════════════════════
  // 4) 전체 실행
  // ══════════════════════════════════════════════════════════════════
  // ── ⑤ 외곽 잔여 픽셀 정리 ─────────────────────────────────────────
  // 배경을 지우고 나면 외곽선 바깥에 자잘한 픽셀이 삐죽삐죽 남는다. 배경색과
  // 충분히 다르다는 이유로 관용도를 빠져나간 것들이다(선과 배경이 섞인
  // 중간색, JPG 압축 잡티, 스캔 노이즈). 관용도를 올려 잡으려 하면 이번에는
  // 그림 안쪽 밝은 부분까지 갉아먹는다 — 색으로는 구분이 안 된다.
  //
  // 그래서 색이 아니라 **모양**으로 고른다. 픽셀 하나를 반지름 r 원판으로
  // 둘러싸고 그 안에 남아 있는 픽셀이 몇 개나 되는지 세면:
  //
  //     안쪽          100%
  //     곧은 가장자리   62%
  //     직각 모서리     38%
  //     1px 수염        24%
  //     외톨이 점        3%
  //   (반지름 3 원판 = 29칸 기준. 실측값이다)
  //
  // 이 비율이 기준보다 낮은 픽셀만 지운다. 기준 상한을 0.34 로 묶어 두므로
  // **곧은 가장자리도 직각 모서리도 어떤 세기에서도 살아남는다.** 수염은 한
  // 겹씩 벗겨지므로 세기가 높을수록 같은 일을 여러 번 돌린다.
  //
  // 반지름 2 와 3 을 네 가지 도형(원·직각사각·45°삼각·15°삼각)으로 재 봤다.
  // 반지름 2 는 상한 0.34 에서 1px 수염을 끝까지 못 지우고(8→2), 0.40 으로
  // 올리면 원이 깎였다. 반지름 3 이 그 둘을 동시에 만족한 유일한 조합이다:
  //   세기 100 에서 원 0 · 직각사각 0 · 45°삼각 -6/1830 · 1px 수염 8→0.
  //
  // 한 번의 통과 안에서는 "통과를 시작할 때의 알파" 만 보고 센다. 지우면서
  // 세면 훑는 방향에 따라 결과가 달라져 같은 그림도 매번 다르게 나온다.
  const TRIM_MAX_RATIO = 0.34;
  const TRIM_RADIUS = 3;

  function trimOutlineSpecks(data, w, h, options = {}) {
    const strength = Math.max(0, Math.min(100, Number(options.strength) || 0));
    if (strength <= 0) return { removed: 0, passes: 0, blobs: 0, ratio: 0, minBlobPx: 0 };

    // radius·maxRatio 는 눈금을 재 보려고 열어 둔 것이다(Node 검사에서 쓴다).
    // 앱은 기본값 그대로 쓴다 — 사람에게 내미는 손잡이는 세기 하나뿐이다.
    const radius = Math.max(1, Math.round(Number(options.radius) || TRIM_RADIUS));
    const maxRatio = Number.isFinite(options.maxRatio) ? options.maxRatio : TRIM_MAX_RATIO;
    const ratio = maxRatio * (strength / 100);
    const passes = strength > 66 ? 3 : strength > 33 ? 2 : 1;
    const alphaFloor = Math.max(1, Number(options.minAlpha) || 8);

    // 원판 오프셋. 반지름 3 이면 29칸.
    const offsets = [];
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx * dx + dy * dy <= radius * radius) offsets.push([dx, dy]);
      }
    }
    const need = ratio * offsets.length;

    let removed = 0;
    for (let pass = 0; pass < passes; pass++) {
      const alive = new Uint8Array(w * h);
      const empty = new Uint8Array(w * h);
      for (let i = 0; i < w * h; i++) {
        const on = data[i * 4 + 3] >= alphaFloor ? 1 : 0;
        alive[i] = on; empty[i] = on ? 0 : 1;
      }
      // 원판 안이 전부 차 있는 픽셀은 셀 필요가 없다 — 늘 100% 다. 빈 곳에서
      // 반지름 안에 드는 띠만 본다. 이게 없으면 2400만 화소 × 29칸 × 3통과가
      // 되어 폰에서 몇 초씩 멈춘다. 띠는 보통 전체의 몇 % 뿐이다.
      const band = dilateMask(empty, w, h, radius);
      let hit = 0;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          if (!alive[i] || !band[i]) continue;
          let support = 0;
          for (let k = 0; k < offsets.length; k++) {
            const nx = x + offsets[k][0], ny = y + offsets[k][1];
            // 대지 밖은 "비어 있음" 으로 센다. 그림이 가장자리에 닿아 있으면
            // 그 줄이 통째로 깎이겠지만, 배경을 지운 그림은 사방이 배경이라
            // 실제로는 닿지 않는다.
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
            if (alive[ny * w + nx]) support++;
          }
          if (support < need) { data[i * 4 + 3] = 0; hit++; }
        }
      }
      removed += hit;
      if (!hit) break;   // 더 벗길 것이 없으면 남은 통과는 건너뛴다
    }

    // 완전히 떨어져 나온 작은 덩어리는 원판 셈으로도 여러 번 돌려야 사라진다.
    // 크기로 한 번에 걷어내는 편이 싸고 결과도 예측하기 쉽다.
    const cap = Math.max(6, Math.min(64, Math.round(w * h / 40000)));
    const minBlobPx = Math.round((strength / 100) * cap);
    let blobs = 0;
    if (minBlobPx >= 2) {
      const seen = new Uint8Array(w * h);
      const stack = new Int32Array(w * h);
      const bucket = new Int32Array(w * h);
      for (let start = 0; start < w * h; start++) {
        if (seen[start] || data[start * 4 + 3] < alphaFloor) continue;
        let top = 0, n = 0;
        stack[top++] = start; seen[start] = 1;
        while (top > 0) {
          const i = stack[--top];
          bucket[n++] = i;
          const x = i % w, y = (i / w) | 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy) continue;
              const nx = x + dx, ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
              const j = ny * w + nx;
              if (seen[j] || data[j * 4 + 3] < alphaFloor) continue;
              seen[j] = 1; stack[top++] = j;
            }
          }
          // 이미 기준을 넘었으면 더 셀 필요가 없다. 다만 표시는 끝까지
          // 해 둬야 같은 덩어리를 다시 시작점으로 잡지 않는다.
        }
        if (n < minBlobPx) {
          for (let k = 0; k < n; k++) data[bucket[k] * 4 + 3] = 0;
          removed += n; blobs++;
        }
      }
    }

    return { removed, passes, blobs, ratio, minBlobPx };
  }

  // ── ⑥ 실루엣 정리 ─────────────────────────────────────────────
  // ⑤(외곽 잔여 픽셀 정리)는 픽셀 하나하나의 **모양**을 본다 — 수염이나
  // 외톨이 점처럼 이웃이 적은 것을 벗겨 낸다. 그것만으로는 "이웃끼리 뭉쳐
  // 있는 잡티 덩어리" 가 안 잡힌다. 원판 안이 제법 차 있으면 살아남기 때문이다.
  //
  // 여기서는 **덩어리 단위**로 본다. 그림을 실루엣으로 보고
  //   · 정한 크기보다 작은 **떨어진 덩어리**는 잡티로 보고 지운다
  //   · 정한 크기보다 작은 **안쪽 구멍**은 잘못 지워진 것으로 보고 되돌린다
  // 되돌릴 때는 원본 픽셀을 그대로 가져온다 — "지우기 전으로 돌린다" 는 뜻이다.
  //
  // 크기 기준을 사람이 정해야 하는 이유: 그림에서 떨어져 있는 작은 조각이
  // 잡티인지 진짜 그림인지는 그림마다 다르다(눈동자 하이라이트, 흩날리는
  // 머리카락 끝). 그래서 지름으로 받아 면적으로 환산해 쓴다.
  //
  // 연결 판정은 8방향이다. 4방향으로 하면 대각선으로만 이어진 얇은 선이
  // 조각조각 끊겨 진짜 그림이 잡티로 몰린다.
  function cleanSilhouette(data, w, h, options = {}) {
    const stat = { blobs: 0, blobPixels: 0, holes: 0, holePixels: 0, minAreaPx: 0 };
    const diameter = Math.max(0, Number(options.silhouetteMinPx) || 0);
    if (diameter < 1) return stat;
    const minArea = Math.max(2, Math.round(Math.PI * (diameter / 2) * (diameter / 2)));
    stat.minAreaPx = minArea;
    const alphaFloor = Math.max(1, Number(options.minAlpha) || 8);
    const n = w * h;
    const on = new Uint8Array(n);
    for (let i = 0; i < n; i++) on[i] = data[i * 4 + 3] >= alphaFloor ? 1 : 0;

    const NB8 = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
    const seen = new Uint8Array(n);
    const queue = new Int32Array(n);
    const bucket = new Int32Array(n);

    const walk = (start, want) => {
      let head = 0, tail = 0, count = 0, touchesEdge = false;
      seen[start] = 1; queue[tail++] = start;
      while (head < tail) {
        const i = queue[head++];
        bucket[count++] = i;
        const x = i % w, y = (i / w) | 0;
        if (x === 0 || y === 0 || x === w - 1 || y === h - 1) touchesEdge = true;
        for (let k = 0; k < 8; k++) {
          const nx = x + NB8[k][0], ny = y + NB8[k][1];
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const j = ny * w + nx;
          if (seen[j] || on[j] !== want) continue;
          seen[j] = 1; queue[tail++] = j;
        }
      }
      return { count, touchesEdge };
    };

    // ① 작은 떨어진 덩어리 지우기
    for (let start = 0; start < n; start++) {
      if (seen[start] || !on[start]) continue;
      const { count } = walk(start, 1);
      if (count >= minArea) continue;
      for (let k = 0; k < count; k++) data[bucket[k] * 4 + 3] = 0;
      stat.blobs++; stat.blobPixels += count;
    }

    // ② 작은 안쪽 구멍 되돌리기. 대지 가장자리에 닿는 투명 영역은 바깥
    //    배경이므로 건드리지 않는다.
    if (options.original) {
      const src = options.original;
      seen.fill(0);
      for (let i = 0; i < n; i++) on[i] = data[i * 4 + 3] >= alphaFloor ? 1 : 0;
      for (let start = 0; start < n; start++) {
        if (seen[start] || on[start]) continue;
        const { count, touchesEdge } = walk(start, 0);
        if (touchesEdge || count >= minArea) continue;
        for (let k = 0; k < count; k++) {
          const p = bucket[k] * 4;
          data[p] = src[p]; data[p + 1] = src[p + 1]; data[p + 2] = src[p + 2]; data[p + 3] = src[p + 3];
        }
        stat.holes++; stat.holePixels += count;
      }
    }
    return stat;
  }

  // ── ⑦ 조각 세기 ───────────────────────────────────────────────
  // 배경이 외곽선의 틈으로 새 들어가면 가는 가닥(머리카락 끝 같은)이 갉아먹혀
  // **점선처럼 끊긴다**. 그림 색이 배경색과 거의 같을 때 특히 그렇다 — 흰 종이
  // 위의 흰 채움은 외곽선이 유일한 벽이라, 그 벽에 틈이 하나만 있어도 샌다.
  //
  // 이건 관용도나 경계 처리로는 못 막는다. 막는 도구는 이미 있다(틈 닫기).
  // 문제는 그 값의 기본이 0 이라 아무도 켜지 않는다는 것이다. 그래서 결과가
  // 몇 조각으로 끊겼는지 세어 알려 준다 — 사람이 값을 올릴 근거가 된다.
  //
  // 잡티는 세지 않는다(minArea 미만은 무시). 진짜로 떨어져 있는 그림
  // (눈동자 하이라이트 같은 것)도 조각으로 세지므로, 이건 경고가 아니라
  // 힌트다.
  function countPieces(data, w, h, minAlpha, minArea) {
    const n = w * h;
    const on = new Uint8Array(n);
    for (let i = 0; i < n; i++) on[i] = data[i * 4 + 3] >= minAlpha ? 1 : 0;
    const NB8 = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
    const seen = new Uint8Array(n), queue = new Int32Array(n);
    let pieces = 0, largest = 0;
    for (let start = 0; start < n; start++) {
      if (seen[start] || !on[start]) continue;
      let head = 0, tail = 0, count = 0;
      seen[start] = 1; queue[tail++] = start;
      while (head < tail) {
        const i = queue[head++]; count++;
        const x = i % w, y = (i / w) | 0;
        for (let k = 0; k < 8; k++) {
          const nx = x + NB8[k][0], ny = y + NB8[k][1];
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const j = ny * w + nx;
          if (seen[j] || !on[j]) continue;
          seen[j] = 1; queue[tail++] = j;
        }
      }
      if (count >= minArea) pieces++;
      if (count > largest) largest = count;
    }
    return { pieces, largest };
  }

  // ══════════════════════════════════════════════════════════════════
  // 올가미 자리 다듬기 (v93)
  //
  // 씨앗 모드는 언믹싱을 쓰지 않는다(그쪽 계산은 F ≈ B 라 잡음만 낸다 — v91).
  // 그러면 "색이 문턱 안인가" 하나로 0/255 를 가르는데, 진짜 선화의 경계는
  // 3~4px 에 걸쳐 부드럽게 잦아들고 거기에 JPEG 잡음이 얹혀 있다. 그 위에서
  // 문턱 하나로 자르면 픽셀이 들쭉날쭉 갈려 **삐죽삐죽한 톱니**가 남는다.
  //
  // 언믹싱 대신 **모양**으로 푼다. 색을 다시 풀지 않으므로 잡음에 흔들리지
  // 않는다.
  //   ① 외톨이 지움/구멍 메움 — 이웃이 2칸 이하면 되돌리고, 7칸 이상이면 채운다.
  //      1px 짜리 톱니는 이 한 걸음에서 사라진다.
  //   ② 덮임 비율로 알파 — 3×3 안에서 지울 자리가 차지하는 비율을 알파로 쓴다.
  //      경계 픽셀이 0/255 가 아니라 그 사이 값을 받아 **가장자리가 매끈해진다.**
  function smoothSeedRemoval(remove, w, h, passes) {
    const n = w * h;
    let cur = remove;
    for (let p = 0; p < passes; p++) {
      const next = new Uint8Array(cur);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          let c = 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            if (cur[i + dy * w + dx]) c++;
          }
          // **외톨이만** 건드린다. v93 은 이웃 2칸 이하를 전부 지웠는데, 그러면
          // 작은 주머니와 뾰족한 쐐기의 가장자리가 통째로 깎인다 — 지름 7px
          // 짜리가 49 → 25px 밖에 안 지워졌다(실측). 이웃이 하나도 없을 때만
          // 지운다. 1px 톱니는 그래도 사라진다.
          if (cur[i]) { if (c === 0) next[i] = 0; }
          else if (c >= 7) next[i] = 1;
        }
      }
      cur = next;
    }
    // 덮임 비율 (3×3 평균). 가장자리 한 겹이 중간값을 받는다.
    const cov = new Float32Array(n);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sum = 0, cnt = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          sum += cur[ny * w + nx]; cnt++;
        }
        cov[y * w + x] = cnt ? sum / cnt : 0;
      }
    }
    return { mask: cur, cov };
  }

  function removeBackground(data, w, h, options) {
    const opt = Object.assign({}, DEFAULTS, options || {});
    const detection = (options && options.backgroundColor)
      ? { ok: true, color: options.backgroundColor, coverage: 1, sidesCovered: 4, bandPx: 0, sampled: 0, reason: '' }
      : detectBackgroundColor(data, w, h, opt);
    if (!detection.ok) return { ok: false, reason: detection.reason, detection };

    let region = buildBackgroundRegion(data, w, h, detection.color, opt);

    // ── 좁은 목 끊기 (v92) ──────────────────────────────────────────
    //
    // 올가미가 주머니를 딱 맞게 둘렀는데도 아무것도 안 지워지는 일이 있다.
    // 주머니가 **가닥 끝의 좁은 목**으로 그림 몸통과 이어져 있으면, 색으로만
    // 이어 붙인 덩어리가 몸통까지 통째로 삼켜 "올가미 밖으로 크게 뻗은 것"
    // 으로 판정되기 때문이다. 사용자 도안의 머리카락이 정확히 그렇다 —
    // 선이 끝나는 자리에서 주머니와 채움이 만난다.
    //
    // 배경 지우기에는 이미 이걸 위한 도구가 있다. **틈 닫기**다. 배경 쪽을
    // 반경 r 만큼 깎으면 폭이 2r 보다 좁은 통로가 사라지고, 번진 뒤 다시
    // 넓히면 원래 두께를 되찾는다. 목만 끊기고 넓은 곳은 그대로다.
    //
    // 사용자가 값을 직접 정해 두지 않았으면, 지울 것이 나올 때까지 반경을
    // 1px 씩 올려 본다. 처음부터 지워지면 한 번도 더 돌지 않으므로(대부분이
    // 그렇다) 느려지지 않고, 실패할 때만 몇 번 더 돈다.
    //
    // 실측(합성 · 목 4px): 틈 닫기 0 이면 0px, 2 면 주머니 7,250px 이 전부
    // 지워지고 몸통 35,700px 은 한 픽셀도 안 줄었다. 목 10px 은 5 가 필요했다.
    // 올가미가 몸통에 걸친 경우에는 반경 8 까지 올려도 여전히 아무것도 안
    // 지운다 — 넓게 이어진 곳은 깎아도 갈라지지 않기 때문이다(안전 확인).
    // v93 — 반경마다 따로 재서 **합친다**.
    //
    // v92 는 "하나도 못 지웠을 때만" 목을 끊었고, 끊은 결과로 통째로 갈아
    // 끼웠다. 둘 다 틀렸다.
    //
    //  · 올가미를 여러 개 두르면 **한 번에** 계산한다. 그중 하나만 r=0 에서
    //    지워져도 총합이 0 이 아니라서, 목이 필요한 나머지는 영영 안 끊겼다.
    //    (실측: 큰 주머니 4,500px 은 지워지고 목으로 이어진 4,800px 은 그대로)
    //  · 반대로 목을 끊은 결과로 갈아 끼우면, 침식에 사라지는 **작은 주머니**가
    //    통째로 빠진다. 지름 9px 짜리가 그랬다.
    //
    // 그래서 반경 0 과 목 끊기 반경들을 각각 재서 지울 곳을 **합집합**으로
    // 모은다. 어느 반경에서든 "올가미에 담긴 덩어리" 로 인정받으면 지운다.
    // 합쳐도 안전하다 — 각 반경에서 이미 담긴 비율을 통과한 것들이고,
    // 그림 몸통은 어느 반경에서도 통과하지 못한다(반경 8 까지 실측).
    let neckCut = 0;
    if (opt.seedMask && !(opt.gapClosePx > 0)) {
      const maxCut = Math.max(1, Math.round(Number(opt.seedNeckMaxPx) || 4));
      // 성글게 훑는다. 큰 도안에서 한 칸씩 다 돌면 몇 초씩 더 걸리는데,
      // 목은 어차피 반경 하나를 넘기면 끊긴다.
      const ladder = [];
      for (let r = 2; r <= maxCut; r += 2) ladder.push(r);
      if (!ladder.length) ladder.push(maxCut);
      for (const r of ladder) {
        const tried = buildBackgroundRegion(data, w, h, detection.color, { ...opt, gapClosePx: r });
        let added = 0;
        for (let i = 0; i < w * h; i++) {
          if (tried.remove[i] && !region.remove[i]) { region.remove[i] = 1; region.removed++; added++; }
        }
        if (added) neckCut = r;
      }
    }

    if (!region.removed) {
      return {
        ok: false, detection, nothingToRemove: true, neckCut,
        spilledLobes: region.spilledLobes || 0,
        reason: opt.seedMask
          ? '올가미 안에 지울 배경색이 없습니다.'
          : '배경색은 찾았지만 바깥에서 이어지는 영역이 없습니다. 관용도를 올리거나 틈 닫기를 켜 보세요.'
      };
    }

    const out = new Uint8ClampedArray(data);
    let unmixedCount = 0;

    // 언믹싱은 **테두리에서 번지는 자동 지우기에서만** 한다.
    //
    //     α = (C-B)·(F-B) / |F-B|²
    //
    // 이 식은 오브젝트 색 F 를 배경색 B 와 충분히 가를 수 있을 때만 쓸모가 있다.
    // 자동 지우기의 경계는 바깥 실루엣 — 대개 진한 외곽선이라 F 가 잘 갈린다.
    // 그런데 올가미가 지우는 곳은 **가닥 사이에 갇힌 주머니**다. 그 건너편은
    // 같은 그림의 흰 채움이라 F ≈ B 가 되고, 분모가 작아 JPEG 잡음이 그대로
    // α 로 증폭된다. 그렇게 나온 반투명 띠가 사용자가 본 "부슬부슬한 픽셀"
    // 이었고, 알파가 8 은 넘으니 뒤따르는 잡티 정리(문턱 8)도 그것을 성한
    // 픽셀로 보고 지나쳤다 — 그래서 "튀어나온 부분" 까지 남았다.
    //
    // 실측(사용자 도안, 올가미 자리 경계 기준):
    //             부슬/경계   수염
    //   언믹싱 켬     0.96     5.9%
    //   언믹싱 끔     0.00     0.2%     ← 자동 지운 데(0.06 · 0.1%)와 같은 결
    // 지워지는 배경도 15,668px → 17,143px 로 늘었다. 반투명으로 어정쩡하게
    // 남던 것이 제대로 지워진 것이다.
    //
    // 나머지 단계(외곽 정리·덩어리/구멍 정리·번짐 잘라내기)는 그대로 지난다.
    if (opt.unmix && !opt.seedMask) {
      const edge = unmixEdges(data, w, h, detection.color, region, opt);
      unmixedCount = edge.unmixed;
      for (let i = 0; i < w * h; i++) {
        if (!edge.touched[i]) continue;
        const p = i * 4;
        const a = Math.round(edge.outAlpha[i] * 255);
        if (a <= opt.minAlpha) { out[p + 3] = 0; continue; }
        out[p] = edge.outColor[i * 3];
        out[p + 1] = edge.outColor[i * 3 + 1];
        out[p + 2] = edge.outColor[i * 3 + 2];
        out[p + 3] = a;
      }
    }
    let seedFeathered = 0;
    if (opt.seedMask && opt.seedSmooth !== false) {
      // 올가미 자리는 모양으로 다듬고 덮임 비율을 알파로 쓴다(위 설명 참고).
      const soft = smoothSeedRemoval(region.remove, w, h, 1);
      for (let i = 0; i < w * h; i++) {
        const p = i * 4;
        // 지울 자리는 **끝까지** 지운다. 덮임 비율로 깎으면 작은 주머니가
        // 가장자리만 남기고 반쯤 살아남는다(v93 의 사고).
        if (soft.mask[i]) { out[p + 3] = 0; continue; }
        // 그 바깥 한 겹에만 덮임 비율만큼 알파를 준다 = 안티앨리어싱.
        const c = soft.cov[i];
        if (c <= 0) continue;
        const a = Math.round(data[p + 3] * (1 - c));
        if (a >= out[p + 3]) continue;          // 이미 더 지워져 있으면 둔다
        if (a > 0 && a < opt.minAlpha) { out[p + 3] = 0; seedFeathered++; continue; }
        if (a !== out[p + 3] && a > 0) seedFeathered++;
        out[p + 3] = a;
      }
    } else {
      // 언믹싱이 손대지 않은 배경은 그대로 지운다.
      for (let i = 0; i < w * h; i++) {
        if (!region.remove[i]) continue;
        if (opt.unmix && out[i * 4 + 3] !== data[i * 4 + 3]) continue; // 언믹싱이 이미 정한 값은 둔다
        out[i * 4 + 3] = 0;
      }
    }

    // 외곽선 안쪽으로 새 들어간 배경을 먼저 되돌린다. 잡티 정리보다 앞이어야
    // 정리 단계가 **되돌린 뒤의 모양**을 보고 판단한다.
    //
    // 씨앗 모드(올가미)에서는 이 단계를 끈다. 이 보호는 "그린 선이 감싼
    // 안쪽으로 새 들어간 것" 을 되돌리는 것인데, 올가미는 애초에 **그 안쪽에
    // 손으로 씨앗을 놓는 도구**다. 켜 두면 방금 지운 것을 그대로 되살려
    // 올가미가 아무 일도 안 한 것이 된다 — v88 에서 실제로 그랬다.
    const guard = protectInsideOutline(out, data, w, h, detection.color,
      { protectInsidePx: opt.seedMask ? 0 : opt.protectInsidePx, tolerance: opt.tolerance });

    // 마지막에 외곽 잡티를 정리한다. 언믹싱이 끝난 뒤라야 "지금 실제로 남은
    // 모양" 을 보고 셀 수 있다.
    const trim = trimOutlineSpecks(out, w, h, { strength: opt.edgeTrim, minAlpha: opt.minAlpha });
    // 모양으로 훑은 뒤, 덩어리 단위로 한 번 더 본다. 순서가 중요하다 —
    // 수염을 먼저 벗겨야 그 수염으로 이어져 있던 잡티가 덩어리로 떨어져 나온다.
    const shape = cleanSilhouette(out, w, h,
      { silhouetteMinPx: opt.silhouetteMinPx, minAlpha: opt.minAlpha, original: data });

    // 마지막으로 가장자리 번짐을 잘라낸다. 모양이 다 정해진 뒤라야
    // "본체" 가 무엇인지 제대로 잡힌다. 조각 세기보다는 앞이어야
    // 번짐으로 겨우 이어져 있던 가닥이 끊긴 것도 조각으로 세어진다.
    // 씨앗 모드에서는 방금 지운 주머니도 "배경" 으로 넘긴다. 테두리에서 번지는
    // 자동 지우기에서는 region.remove 가 이미 바깥과 이어져 있어 결과가 같다.
    const halo = trimEdgeHalo(out, w, h, {
      haloTrimPx: opt.haloTrimPx, haloBodyAlpha: opt.haloBodyAlpha,
      knownBackground: opt.seedMask ? region.remove : null
    });

    let remaining = 0;
    for (let i = 0; i < w * h; i++) if (out[i * 4 + 3] > 0) remaining++;
    // 20px 보다 작은 것은 잡티로 보고 조각에서 뺀다.
    const piece = countPieces(out, w, h, Math.max(1, opt.minAlpha), 20);

    return {
      ok: true,
      data: out,
      detection,
      removedPixels: region.removed,
      unmixedPixels: unmixedCount,
      trimmedPixels: trim.removed,
      trimmedBlobs: trim.blobs,
      silhouetteBlobs: shape.blobs,
      silhouetteBlobPixels: shape.blobPixels,
      silhouetteHoles: shape.holes,
      silhouetteHolePixels: shape.holePixels,
      silhouetteMinAreaPx: shape.minAreaPx,
      protectedRestored: guard.restored,
      protectedEnclosed: guard.enclosed,
      spilledLobes: region.spilledLobes || 0,
      neckCut, seedFeathered,
      haloCleared: halo.cleared,
      haloFaded: halo.faded,
      pieces: piece.pieces,
      largestPiece: piece.largest,
      remainingPixels: remaining,
      removedRatio: region.removed / (w * h)
    };
  }

  return {
    DEFAULTS,
    colorDistance,
    distanceToMask,
    dilateMask,
    erodeMask,
    trimEdgeHalo,
    outlineInterior,
    protectInsideOutline,
    detectDominantColor,
    detectBackgroundColor,
    buildBackgroundRegion,
    sampleForegroundColor,
    unmixEdges,
    trimOutlineSpecks,
    cleanSilhouette,
    countPieces,
    removeBackground
  };
});
