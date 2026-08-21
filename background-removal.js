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
    minRun: 3,             // 그 안에서 몇 px 이상 연속 같은 색이어야 오브젝트 색으로 볼지
    runTolerance: 18,      // 연속 판정의 색 관용도
    unmix: true,           // 안티앨리어싱 언믹싱을 할지
    sealPoints: [],        // [{x, y, radius}] — 여기는 배경이 못 지나간다
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
  function sampleForegroundColor(data, w, h, x0, y0, dirX, dirY, bgAll, opt) {
    const samples = [];
    for (let k = 1; k <= opt.probeDepth; k++) {
      const x = Math.round(x0 + dirX * k), y = Math.round(y0 + dirY * k);
      if (x < 0 || y < 0 || x >= w || y >= h) break;
      const i = y * w + x;
      if (bgAll[i]) { samples.push(null); continue; }
      const p = i * 4;
      if (data[p + 3] < 8) { samples.push(null); continue; }
      samples.push([data[p], data[p + 1], data[p + 2]]);
    }
    // 색 차이가 runTolerance 안에서 이어지는 가장 긴 구간을 찾는다.
    let bestStart = -1, bestLen = 0, start = -1, len = 0;
    for (let k = 0; k < samples.length; k++) {
      const s = samples[k];
      if (!s) { start = -1; len = 0; continue; }
      if (start < 0) { start = k; len = 1; }
      else {
        const a = samples[start];
        len = colorDistance(s[0], s[1], s[2], a[0], a[1], a[2]) <= opt.runTolerance ? len + 1 : 1;
        if (len === 1) start = k;
      }
      if (len > bestLen) { bestLen = len; bestStart = start; }
    }
    if (bestLen < opt.minRun) return null;
    // 그 구간의 중앙값(채널별)을 쓴다. 평균은 튀는 픽셀 하나에 끌려간다.
    const rs = [], gs = [], bs = [];
    for (let k = bestStart; k < bestStart + bestLen; k++) { rs.push(samples[k][0]); gs.push(samples[k][1]); bs.push(samples[k][2]); }
    const mid = arr => { arr.sort((a, b) => a - b); return arr[(arr.length - 1) >> 1]; };
    return { r: mid(rs), g: mid(gs), b: mid(bs) };
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
    const bandOut = 1.6 * 1.6;
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

        const F = sampleForegroundColor(data, w, h, x, y, dirX, dirY, bgAll, opt);
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

    let remaining = 0;
    for (let i = 0; i < w * h; i++) if (out[i * 4 + 3] > 0) remaining++;

    return {
      ok: true,
      data: out,
      detection,
      removedPixels: region.removed,
      unmixedPixels: unmixedCount,
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
    detectBackgroundColor,
    buildBackgroundRegion,
    sampleForegroundColor,
    unmixEdges,
    removeBackground
  };
});
