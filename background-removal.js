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
    const outside = new Uint8Array(n), stack = new Int32Array(n);
    let top = 0;
    const push = (i) => { if (!outside[i] && !body[i]) { outside[i] = 1; stack[top++] = i; } };
    for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
    for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
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
  function buildBackgroundRegion(data, w, h, bgColor, opt) {
    const n = w * h;
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
    const passable = new Uint8Array(n);
    for (let i = 0; i < n; i++) passable[i] = isBg[i];
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
      for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
      for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
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

    // 지울 곳 = 바깥에서 닿을 수 있고 + 실제로 배경색인 곳.
    const remove = new Uint8Array(n);
    let removed = 0;
    for (let i = 0; i < n; i++) if (reach[i] && isBg[i] && opaque[i]) { remove[i] = 1; removed++; }
    // 원래 투명했던 곳도 배경으로 취급해 경계 계산에 넣는다(알파는 그대로 0).
    const bgAll = new Uint8Array(n);
    for (let i = 0; i < n; i++) bgAll[i] = (remove[i] || !opaque[i]) ? 1 : 0;

    return { isBg, opaque, remove, bgAll, removed, reach, gapFallback };
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

  function removeBackground(data, w, h, options) {
    const opt = Object.assign({}, DEFAULTS, options || {});
    const detection = (options && options.backgroundColor)
      ? { ok: true, color: options.backgroundColor, coverage: 1, sidesCovered: 4, bandPx: 0, sampled: 0, reason: '' }
      : detectBackgroundColor(data, w, h, opt);
    if (!detection.ok) return { ok: false, reason: detection.reason, detection };

    const region = buildBackgroundRegion(data, w, h, detection.color, opt);
    if (!region.removed) {
      return {
        ok: false, detection,
        reason: '배경색은 찾았지만 바깥에서 이어지는 영역이 없습니다. 관용도를 올리거나 틈 닫기를 켜 보세요.'
      };
    }

    const out = new Uint8ClampedArray(data);
    let unmixedCount = 0;

    if (opt.unmix) {
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
    // 언믹싱이 손대지 않은 배경은 그대로 지운다.
    for (let i = 0; i < w * h; i++) {
      if (!region.remove[i]) continue;
      if (opt.unmix && out[i * 4 + 3] !== data[i * 4 + 3]) continue; // 언믹싱이 이미 정한 값은 둔다
      out[i * 4 + 3] = 0;
    }

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
    const halo = trimEdgeHalo(out, w, h, { haloTrimPx: opt.haloTrimPx, haloBodyAlpha: opt.haloBodyAlpha });

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
