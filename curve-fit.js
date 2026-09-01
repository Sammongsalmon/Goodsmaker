/* GOODSMAKER_CURVE_FIT v110 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;   // Node 테스트용
  if (root) root.GoodsMakerCurveFit = api;                                  // 브라우저
})(typeof self !== 'undefined' ? self : null, function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  // 칼선 고정점 줄이기 — 3차 베지에 맞춤 (v110)
  //
  // 칼선은 픽셀 마스크의 윤곽에서 나온다. 그래서 점이 곧 픽셀 수만큼 있고,
  // 지금까지는 그 점마다 곡선 조각을 하나씩 냈다. 400px 짜리 시험 도안에서도
  // **675개**가 나왔다. 일러스트레이터에서 열면 고정점이 새까맣게 찍혀 손을
  // 댈 수가 없다.
  //
  // 점을 그냥 솎아 내면(더글라스–포이커) 곡률이 각져서 인쇄물에 티가 난다.
  // 그래서 **모양을 지키면서** 줄인다 — 허용 오차를 mm 로 정하고, 그 안에
  // 들어오는 한 가장 적은 수의 3차 베지에로 갈아 끼운다.
  // Schneider 의 곡선 맞춤(Graphics Gems, 1990)이다.
  //
  //   1) 꺾인 자리(코너)를 먼저 찾아 거기서 끊는다. 안 끊으면 직각이
  //      둥글게 뭉개진다 — 스티커 모서리가 실제로 그랬다.
  //   2) 조각마다 양 끝 접선을 잡고 최소제곱으로 조종점을 구한다.
  //   3) 가장 많이 벗어난 점을 재고, 허용 오차를 넘으면 그 자리에서
  //      둘로 갈라 되풀이한다. 오차가 조금 넘으면 매개변수만 다시
  //      맞춰 본다(뉴턴–랩슨) — 그것만으로 대개 들어온다.
  //
  // DOM 이 없다. (점 배열, 오차) → (베지에 배열) 순수 함수라서 Node 에서
  // 그대로 검사한다 (tools/test-curve-fit.js).
  // ══════════════════════════════════════════════════════════════════

  const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
  const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
  const mul = (a, k) => ({ x: a.x * k, y: a.y * k });
  const dot = (a, b) => a.x * b.x + a.y * b.y;
  const len = a => Math.hypot(a.x, a.y);
  function unit(a) { const l = len(a); return l > 1e-12 ? { x: a.x / l, y: a.y / l } : { x: 0, y: 0 }; }

  // 3차 베지에 위의 한 점 (de Casteljau)
  function bezierAt(bez, t) {
    const s = 1 - t;
    const a = s * s * s, b = 3 * s * s * t, c = 3 * s * t * t, d = t * t * t;
    return {
      x: a * bez[0].x + b * bez[1].x + c * bez[2].x + d * bez[3].x,
      y: a * bez[0].y + b * bez[1].y + c * bez[2].y + d * bez[3].y
    };
  }
  function bezierTangentAt(bez, t) {
    const s = 1 - t;
    return {
      x: 3 * s * s * (bez[1].x - bez[0].x) + 6 * s * t * (bez[2].x - bez[1].x) + 3 * t * t * (bez[3].x - bez[2].x),
      y: 3 * s * s * (bez[1].y - bez[0].y) + 6 * s * t * (bez[2].y - bez[1].y) + 3 * t * t * (bez[3].y - bez[2].y)
    };
  }
  function bezierSecondAt(bez, t) {
    const s = 1 - t;
    return {
      x: 6 * s * (bez[2].x - 2 * bez[1].x + bez[0].x) + 6 * t * (bez[3].x - 2 * bez[2].x + bez[1].x),
      y: 6 * s * (bez[2].y - 2 * bez[1].y + bez[0].y) + 6 * t * (bez[3].y - 2 * bez[2].y + bez[1].y)
    };
  }

  function chordLengthParameterize(points) {
    const u = [0];
    for (let i = 1; i < points.length; i++) u[i] = u[i - 1] + len(sub(points[i], points[i - 1]));
    const total = u[u.length - 1];
    if (total <= 1e-12) return points.map((_, i) => i / Math.max(1, points.length - 1));
    for (let i = 0; i < u.length; i++) u[i] /= total;
    return u;
  }

  // 양 끝점과 접선 방향은 고정하고, 조종점 거리만 최소제곱으로 푼다.
  function generateBezier(points, u, tan1, tan2) {
    const n = points.length;
    const first = points[0], last = points[n - 1];
    let c00 = 0, c01 = 0, c11 = 0, x0 = 0, x1 = 0;
    for (let i = 0; i < n; i++) {
      const t = u[i], s = 1 - t;
      const b0 = s * s * s, b1 = 3 * s * s * t, b2 = 3 * s * t * t, b3 = t * t * t;
      const a0 = mul(tan1, b1), a1 = mul(tan2, b2);
      c00 += dot(a0, a0); c01 += dot(a0, a1); c11 += dot(a1, a1);
      const tmp = sub(points[i], add(mul(first, b0 + b1), mul(last, b2 + b3)));
      x0 += dot(a0, tmp); x1 += dot(a1, tmp);
    }
    const det = c00 * c11 - c01 * c01;
    let alphaL, alphaR;
    if (Math.abs(det) > 1e-12) {
      alphaL = (c11 * x0 - c01 * x1) / det;
      alphaR = (c00 * x1 - c01 * x0) / det;
    } else {
      const c = c00 + c01;
      alphaL = alphaR = Math.abs(c) > 1e-12 ? x0 / c : 0;
    }
    const segLen = len(sub(last, first));
    // 음수나 터무니없이 큰 값이 나오면(점이 몰려 있을 때) 무난한 1/3 로 돌아간다.
    if (!(alphaL > segLen * 1e-6) || !(alphaR > segLen * 1e-6) || alphaL > segLen * 3 || alphaR > segLen * 3) {
      const k = segLen / 3;
      return [first, add(first, mul(tan1, k)), add(last, mul(tan2, k)), last];
    }
    return [first, add(first, mul(tan1, alphaL)), add(last, mul(tan2, alphaR)), last];
  }

  function computeMaxError(points, bez, u) {
    let maxDist = 0, index = Math.floor(points.length / 2);
    for (let i = 1; i < points.length - 1; i++) {
      const d = sub(bezierAt(bez, u[i]), points[i]);
      const dist = d.x * d.x + d.y * d.y;
      if (dist > maxDist) { maxDist = dist; index = i; }
    }
    return { error: Math.sqrt(maxDist), index };
  }

  // 뉴턴–랩슨 한 걸음: 점에서 곡선까지 가장 가까운 매개변수로 민다.
  function reparameterize(points, u, bez) {
    return u.map((t, i) => {
      const p = bezierAt(bez, t), d1 = bezierTangentAt(bez, t), d2 = bezierSecondAt(bez, t);
      const diff = sub(p, points[i]);
      const numerator = dot(diff, d1);
      const denominator = dot(d1, d1) + dot(diff, d2);
      if (Math.abs(denominator) < 1e-12) return t;
      const next = t - numerator / denominator;
      return next < 0 ? 0 : next > 1 ? 1 : next;
    });
  }

  function fitCubic(points, tan1, tan2, error, out, depth) {
    if (points.length < 2) return;
    if (points.length === 2) {
      const k = len(sub(points[1], points[0])) / 3;
      out.push([points[0], add(points[0], mul(tan1, k)), add(points[1], mul(tan2, k)), points[1]]);
      return;
    }
    let u = chordLengthParameterize(points);
    let bez = generateBezier(points, u, tan1, tan2);
    let { error: maxError, index } = computeMaxError(points, bez, u);
    if (maxError < error) { out.push(bez); return; }
    // 오차가 조금 넘을 때만 매개변수를 다시 맞춰 본다. 많이 넘으면 헛수고다.
    if (maxError < error * error + error) {
      for (let i = 0; i < 12; i++) {
        u = reparameterize(points, u, bez);
        bez = generateBezier(points, u, tan1, tan2);
        const next = computeMaxError(points, bez, u);
        maxError = next.error; index = next.index;
        if (maxError < error) { out.push(bez); return; }
      }
    }
    if (depth > 24) { out.push(bez); return; }   // 안전장치 — 무한 분할 금지
    if (index <= 0) index = 1;
    if (index >= points.length - 1) index = points.length - 2;
    const center = unit(sub(points[index - 1], points[index + 1]));
    fitCubic(points.slice(0, index + 1), tan1, center, error, out, depth + 1);
    fitCubic(points.slice(index), mul(center, -1), tan2, error, out, depth + 1);
  }

  // 꺾인 자리 찾기. 앞뒤 window px 만큼 떨어진 점으로 방향을 재야
  // 픽셀 계단(한 칸씩 어긋나는 것)을 코너로 오해하지 않는다.
  function findCorners(points, angleDeg, window) {
    const n = points.length;
    // 들어오는 방향과 나가는 방향의 내적은 곧 cos(꺾인 각). 직선이면 1,
    // 직각이면 0, 되꺾이면 -1 이다. angleDeg 보다 많이 꺾이면 코너다.
    const limit = Math.cos(angleDeg * Math.PI / 180);
    const corners = new Uint8Array(n);
    if (n < 8) return corners;
    const w = Math.max(2, Math.min(Math.floor(n / 6), window));
    for (let i = 0; i < n; i++) {
      const a = unit(sub(points[i], points[(i - w + n) % n]));
      const b = unit(sub(points[(i + w) % n], points[i]));
      if (dot(a, b) < limit) corners[i] = 1;
    }
    // 붙어 있는 코너 후보는 가장 뾰족한 것 하나만 남긴다.
    const kept = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      if (!corners[i]) continue;
      let best = i, bestDot = 2;
      for (let k = 0; k < w; k++) {
        const j = (i + k) % n;
        if (!corners[j]) break;
        const a = unit(sub(points[j], points[(j - w + n) % n]));
        const b = unit(sub(points[(j + w) % n], points[j]));
        const d = dot(a, b);
        if (d < bestDot) { bestDot = d; best = j; }
      }
      kept[best] = 1;
      for (let k = 0; k < w; k++) { const j = (i + k) % n; if (!corners[j]) break; if (j !== best) corners[j] = 0; }
    }
    return kept;
  }

  // 같은 자리에 겹친 점을 걷어낸다. 안 걷어내면 접선이 0 이 되어 맞춤이 무너진다.
  function dedupe(points, epsilon) {
    const out = [];
    for (const p of points) {
      const last = out[out.length - 1];
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > epsilon) out.push({ x: p.x, y: p.y });
    }
    while (out.length > 1 && Math.hypot(out[0].x - out[out.length - 1].x, out[0].y - out[out.length - 1].y) <= epsilon) out.pop();
    return out;
  }

  // ── 바깥에서 쓰는 것 ───────────────────────────────────────────────
  // 닫힌 윤곽(점 배열) → 3차 베지에 배열. 각 원소는 [P0, C1, C2, P3].
  function fitClosedPath(rawPoints, options) {
    const opt = options || {};
    const maxError = Math.max(0.01, Number(opt.maxError) || 0.5);
    const points = dedupe(rawPoints, Math.min(0.35, maxError * 0.5));
    if (points.length < 4) return null;
    const corners = findCorners(points, Number(opt.cornerAngle) || 62, Number(opt.cornerWindow) || 4);
    const cornerList = [];
    for (let i = 0; i < corners.length; i++) if (corners[i]) cornerList.push(i);

    const out = [];
    const tangentAt = (index, forward) => {
      const n = points.length, w = Math.max(1, Math.min(3, Math.floor(n / 8)));
      return forward
        ? unit(sub(points[(index + w) % n], points[index]))
        : unit(sub(points[(index - w + n) % n], points[index]));
    };

    if (!cornerList.length) {
      // 코너가 없으면 닫힌 고리다. 반대편에서 한 번 끊어 두 조각으로 맞춘다 —
      // 한 조각으로는 시작·끝 접선이 서로를 묶어 버려 잘 안 맞는다.
      cornerList.push(Math.floor(points.length / 2));
    }
    // **0번 점에서 반드시 시작한다.** 내보내기는 원래 윤곽의 첫 점에서 붓을
    // 내리므로(`path[0] m`), 맞춘 곡선이 다른 데서 시작하면 그만큼 벌어진다.
    if (!cornerList.includes(0)) cornerList.push(0);
    cornerList.sort((a, b) => a - b);
    for (let c = 0; c < cornerList.length; c++) {
      const start = cornerList[c], end = cornerList[(c + 1) % cornerList.length];
      const slice = [];
      let i = start;
      for (;;) {
        slice.push(points[i]);
        if (i === end) break;
        i = (i + 1) % points.length;
        if (slice.length > points.length) break;
      }
      if (slice.length < 2) continue;
      fitCubic(slice, tangentAt(start, true), tangentAt(end, false), maxError, out, 0);
    }
    return out.length ? out : null;
  }

  // 맞춘 곡선이 원래 윤곽에서 얼마나 벗어났는지 — 수치로 확인하려고 둔다.
  // 맞춘 곡선이 원래 윤곽에서 얼마나 벗어났는지. 곡선을 **길이에 맞춰**
  // 촘촘히 뜯어야 한다 — 조각마다 같은 수로 뜯으면 긴 곡선에서 표본이
  // 성겨져 실제보다 크게 나온다. 처음에 그 때문에 멀쩡한 맞춤을 다 버렸다.
  function measureDeviation(rawPoints, beziers, spacing) {
    if (!beziers || !beziers.length) return { max: Infinity, mean: Infinity };
    const step = Math.max(0.05, Number(spacing) || 0.25);
    const samples = [];
    for (const bez of beziers) {
      const rough = len(sub(bez[1], bez[0])) + len(sub(bez[2], bez[1])) + len(sub(bez[3], bez[2]));
      const count = Math.max(8, Math.min(400, Math.ceil(rough / step)));
      for (let i = 0; i < count; i++) samples.push(bezierAt(bez, i / count));
    }
    samples.push(bezierAt(beziers[beziers.length - 1], 1));
    let max = 0, sum = 0;
    for (const p of rawPoints) {
      let best = Infinity;
      for (const s of samples) {
        const d = (s.x - p.x) * (s.x - p.x) + (s.y - p.y) * (s.y - p.y);
        if (d < best) best = d;
      }
      const dist = Math.sqrt(best);
      if (dist > max) max = dist;
      sum += dist;
    }
    return { max, mean: sum / Math.max(1, rawPoints.length) };
  }

  function polygonArea(points) {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const a = points[i], b = points[(i + 1) % points.length];
      area += a.x * b.y - b.x * a.y;
    }
    return Math.abs(area) / 2;
  }

  return { fitClosedPath, measureDeviation, bezierAt, polygonArea, _internal: { findCorners, dedupe, generateBezier, chordLengthParameterize } };
});
