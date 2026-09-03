/* GOODSMAKER_UI_VISUALS v150 */
(function () {
  'use strict';

  // ── 값을 그림으로 (v150) ───────────────────────────────────────────
  //
  // 사용자: "글이 굉장히 많고 거의 다 글자 버튼이잖아. … 직관적이고 덜
  //          번잡스럽게 ui를 정리할 수 있는 방법이 있다면 제안해줘"
  //
  // `밑바닥 모서리 둥글기 55%`, `칼선 부드럽게 0.5mm` 같은 값은 숫자를 읽어도
  // 어느 쪽이 어떻게 되는지 안 잡힌다. 칸 옆에 **그 값 그대로 그린 작은 그림**
  // 하나를 두면 도움말을 안 펴도 방향이 보인다.
  //
  // 그림은 설명이지 미리보기가 아니다 — 실제 도안이 아니라 **뜻이 통하는 최소
  // 도형**만 그린다. 무거우면 슬라이더를 끌 때 걸리므로, 44×28 캔버스 하나에
  // 도형 몇 개가 전부다.
  //
  // DOM 만 쓰고 app.js 를 안 건드린다. 값은 칸 안의 input 에서 읽는다.

  var W = 46, H = 28;

  function ctxOf(canvas) {
    var dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    return ctx;
  }
  function css(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function ink() { return css('--muted', '#7b8598'); }
  function accent() { return css('--accent', '#e5399a'); }

  // 0~1 로 정규화한 값. min/max 는 input 이 들고 있다.
  function ratioOf(input) {
    var v = parseFloat(input.value);
    var lo = parseFloat(input.min), hi = parseFloat(input.max);
    if (!isFinite(v)) v = 0;
    if (!isFinite(lo)) lo = 0;
    if (!isFinite(hi)) hi = 1;
    if (hi <= lo) return 0;
    return Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
  }

  // 밑바닥 모서리 둥글기 — 왼쪽 아래 모서리가 얼마나 깎이는지.
  function drawCorner(ctx, t) {
    var x = 8, y = 5, w = W - 16, h = H - 11;
    var r = Math.min(w, h) * 0.5 * t;
    ctx.beginPath();
    ctx.moveTo(x + r, y + h);
    ctx.lineTo(x + w - r, y + h);
    if (r > 0) ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - r); else ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + h - r);
    if (r > 0) ctx.quadraticCurveTo(x, y + h, x + r, y + h);
    ctx.closePath();
    ctx.fillStyle = css('--surface-2', '#eef1f6');
    ctx.fill();
    ctx.strokeStyle = accent();
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // 칼선 부드럽게 — 삐뚤빼뚤이 값만큼 펴진다.
  function drawSmooth(ctx, t) {
    var pts = [];
    for (var i = 0; i <= 40; i++) {
      var x = 4 + (W - 8) * (i / 40);
      var wave = Math.sin(i * 0.55) * 3.4 + Math.sin(i * 1.9) * 2.6 * (1 - t);
      pts.push({ x: x, y: H / 2 + wave * (1 - t * 0.55) });
    }
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (var j = 1; j < pts.length; j++) ctx.lineTo(pts[j].x, pts[j].y);
    ctx.strokeStyle = accent();
    ctx.lineWidth = 1.6;
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  // 칼선 단순화 — 곡선은 그대로, 점(고정점)만 줄어든다.
  function drawSimplify(ctx, t) {
    ctx.beginPath();
    for (var i = 0; i <= 40; i++) {
      var x = 4 + (W - 8) * (i / 40);
      var y = H / 2 + Math.sin(i * 0.42) * 6;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = ink();
    ctx.lineWidth = 1.4;
    ctx.stroke();
    var count = Math.max(3, Math.round(11 - 8 * t));
    ctx.fillStyle = accent();
    for (var k = 0; k < count; k++) {
      var u = k / (count - 1);
      var px = 4 + (W - 8) * u, py = H / 2 + Math.sin(u * 40 * 0.42) * 6;
      ctx.beginPath(); ctx.arc(px, py, 1.9, 0, Math.PI * 2); ctx.fill();
    }
  }

  // 화이트 안쪽으로 밀기 — 화이트가 그림 안쪽으로 그만큼 물러난다.
  function drawChoke(ctx, t) {
    var cx = W / 2, cy = H / 2, rx = 15, ry = 9;
    ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = css('--muted', '#7b8598');
    ctx.globalAlpha = 0.28; ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = ink(); ctx.lineWidth = 1.2; ctx.stroke();
    var inset = 1 + 5 * t;
    ctx.beginPath(); ctx.ellipse(cx, cy, Math.max(1, rx - inset), Math.max(1, ry - inset), 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.strokeStyle = accent(); ctx.lineWidth = 1.2; ctx.stroke();
  }

  // 재단여백 — 칼선 바깥으로 그만큼 색이 더 깔린다.
  function drawBleed(ctx, t) {
    var cx = W / 2, cy = H / 2, rx = 10, ry = 7;
    var pad = 1 + 5 * t;
    ctx.beginPath(); ctx.ellipse(cx, cy, rx + pad, ry + pad, 0, 0, Math.PI * 2);
    ctx.fillStyle = accent(); ctx.globalAlpha = 0.3; ctx.fill(); ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = css('--surface-2', '#eef1f6'); ctx.fill();
    ctx.strokeStyle = accent(); ctx.lineWidth = 1.4; ctx.setLineDash([3, 2]); ctx.stroke();
    ctx.setLineDash([]);
  }

  var KINDS = { corner: drawCorner, smooth: drawSmooth, simplify: drawSimplify, choke: drawChoke, bleed: drawBleed };

  function paint(canvas) {
    var kind = canvas.dataset.previewKind;
    var input = document.getElementById(canvas.dataset.previewInput);
    var fn = KINDS[kind];
    if (!fn || !input) return;
    fn(ctxOf(canvas), ratioOf(input));
  }

  var mounted = [];
  function refresh() {
    var fields = document.querySelectorAll('[data-preview]:not([data-preview-ready])');
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var kind = field.getAttribute('data-preview');
      var input = field.querySelector('input[id]');
      if (!KINDS[kind] || !input) { field.setAttribute('data-preview-ready', 'skip'); continue; }
      field.setAttribute('data-preview-ready', '1');
      var canvas = document.createElement('canvas');
      canvas.className = 'field-preview';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.dataset.previewKind = kind;
      canvas.dataset.previewInput = input.id;
      // 값 칸 바로 옆에 둔다 — 이름 밑, 설명 위.
      var row = field.querySelector('.input-with-unit, .range-with-value');
      if (row) row.appendChild(canvas); else field.appendChild(canvas);
      mounted.push(canvas);
      paint(canvas);
    }
    for (var j = 0; j < mounted.length; j++) paint(mounted[j]);
    return mounted.length;
  }

  function start() {
    refresh();
    document.addEventListener('input', function (event) {
      var t = event.target;
      if (!t || !t.id) return;
      for (var i = 0; i < mounted.length; i++) {
        if (mounted[i].dataset.previewInput === t.id) paint(mounted[i]);
      }
    }, true);
    // 테마·글자 크기가 바뀌면 색과 크기를 다시 잡는다.
    if (typeof MutationObserver === 'function') {
      var pending = 0;
      new MutationObserver(function () {
        if (pending) return;
        pending = requestAnimationFrame(function () { pending = 0; refresh(); });
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
      new MutationObserver(function () {
        if (pending) return;
        pending = requestAnimationFrame(function () { pending = 0; refresh(); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  window.GoodsMakerUiVisuals = { refresh: refresh };
})();
