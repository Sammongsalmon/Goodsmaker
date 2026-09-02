/* GOODSMAKER_GUIDE_RENDER v132 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;   // Node 테스트용
  if (root) root.GoodsMakerGuideRender = api;                               // 브라우저
})(typeof self !== 'undefined' ? self : null, function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  // 인쇄소 가이드 페이지를 캔버스에 그린다 (v132)
  //
  // 사용자: "가이드파일 올리면 미리보기 스크린창에 가이드 미리보기 버튼이 뜸.
  //          그거 누르면 코롯토, 스티커 미리보기 대신 가이드 화면(설명 포함,
  //          pdf 상에서 잘리는 대지 외 부분(대체로 설명하는 부분)도 보이게
  //          해줘야 해.) 미리보기가 나와."
  //
  // 여태 가이드 미리보기는 판형·재단상자·도안 자리를 **상자로만** 그렸다.
  // 인쇄소가 판형 옆에 적어 둔 설명("여기까지 잘립니다", "화이트는 이 레이어에")
  // 은 보이지 않았고, 그 설명이 대지 밖에 있으면 PDF 뷰어에서도 잘려 안 보인다.
  //
  // 그래서 내용 스트림을 직접 해석해 그린다. 완전한 PDF 뷰어가 아니라 **눈으로
  // 확인하는 용도**다 — 글꼴은 기기 글꼴로 대신 그리고(자리와 크기는 맞춘다),
  // 그림자·투명 그룹·패턴 같은 것은 근사한다. 대신 두 가지를 지킨다.
  //   ① 좌표계는 PDF 그대로다. 그래서 판형 밖의 설명도 자리가 맞는다.
  //   ② 한 번은 **재기만** 하고(measure) 한 번은 그린다. 잰 상자와 판형의
  //      합집합을 화면에 담으므로 대지 밖 설명이 잘리지 않는다.
  //
  // 실패하면 조용히 물러난다 — 부르는 쪽이 상자만 그린 예전 화면으로 돌아간다.
  // ══════════════════════════════════════════════════════════════════

  const MAX_FORM_DEPTH = 12;
  const MAX_OPS = 400000;

  function mul(a, b) {   // a 다음 b (PDF 는 행벡터라 a × b)
    return [
      a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3],
      a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3],
      a[4] * b[0] + a[5] * b[2] + b[4], a[4] * b[1] + a[5] * b[3] + b[5]
    ];
  }
  function apply(m, x, y) { return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]; }

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function grayCss(g) { const v = Math.round(clamp01(g) * 255); return `rgb(${v},${v},${v})`; }
  function rgbCss(r, g, b) {
    return `rgb(${Math.round(clamp01(r) * 255)},${Math.round(clamp01(g) * 255)},${Math.round(clamp01(b) * 255)})`;
  }
  function cmykCss(c, m, y, k) {
    return rgbCss((1 - clamp01(c)) * (1 - clamp01(k)), (1 - clamp01(m)) * (1 - clamp01(k)), (1 - clamp01(y)) * (1 - clamp01(k)));
  }

  // ── ToUnicode CMap ────────────────────────────────────────────────
  // Identity-H 로 넣은 한글은 바이트가 글리프 번호라 그대로는 못 읽는다.
  // bfchar/bfrange 만 읽으면 대부분의 인쇄소 가이드가 읽힌다.
  function parseToUnicode(text) {
    const map = new Map();
    const hex = s => s.replace(/[^0-9A-Fa-f]/g, '');
    const uni = s => {
      const h = hex(s); let out = '';
      for (let i = 0; i + 3 < h.length; i += 4) out += String.fromCharCode(parseInt(h.substr(i, 4), 16));
      return out;
    };
    const charRe = /beginbfchar([\s\S]*?)endbfchar/g;
    let m;
    while ((m = charRe.exec(text))) {
      const pairs = m[1].match(/<[0-9A-Fa-f]+>\s*<[0-9A-Fa-f]*>/g) || [];
      for (const pair of pairs) {
        const parts = pair.match(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]*)>/);
        if (parts) map.set(parseInt(parts[1], 16), uni(parts[2]));
      }
    }
    const rangeRe = /beginbfrange([\s\S]*?)endbfrange/g;
    while ((m = rangeRe.exec(text))) {
      const body = m[1];
      const simple = body.match(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]*)>/g) || [];
      for (const entry of simple) {
        const p = entry.match(/<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]*)>/);
        if (!p) continue;
        const lo = parseInt(p[1], 16), hi = parseInt(p[2], 16), base = parseInt(hex(p[3]).slice(-4) || '0', 16);
        for (let c = lo; c <= hi && c - lo < 65536; c++) map.set(c, String.fromCharCode(base + (c - lo)));
      }
    }
    return map;
  }

  // ══════════════════════════════════════════════════════════════════
  async function renderPage(ctx, guideApi, guide, page, opts) {
    const options = opts || {};
    const I = guideApi && guideApi._internal;
    if (!I || !I.Lexer || !I.get || !I.dget) throw new Error('guide-template 내부 함수를 찾지 못했습니다.');
    const { Lexer, get, dget, numOf, streamData, latin1 } = I;
    const doc = guide.doc;

    // 재는 판(measure) 인가 그리는 판인가
    const measure = !!options.measure;
    const bounds = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
    const note = (x, y) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      if (x < bounds.x0) bounds.x0 = x; if (x > bounds.x1) bounds.x1 = x;
      if (y < bounds.y0) bounds.y0 = y; if (y > bounds.y1) bounds.y1 = y;
    };

    const base = options.base || [1, 0, 0, 1, 0, 0];   // PDF 좌표 → 캔버스 좌표
    const fontCache = new Map();
    let opCount = 0;

    function resolveDict(v) { const r = get(doc, v); return r && (r.t === 'dict' || r.t === 'stream') ? r : null; }

    function readFont(fontDict) {
      if (!fontDict) return { family: 'sans-serif', toUnicode: null, twoByte: false };
      if (fontCache.has(fontDict)) return fontCache.get(fontDict);
      const rec = { family: 'sans-serif', toUnicode: null, twoByte: false };
      try {
        const baseFont = dget(doc, fontDict, 'BaseFont');
        const name = baseFont && baseFont.t === 'name' ? baseFont.v : '';
        if (/serif|myungjo|batang|times|georgia/i.test(name) && !/sans/i.test(name)) rec.family = 'serif';
        const sub = dget(doc, fontDict, 'Subtype');
        const enc = dget(doc, fontDict, 'Encoding');
        rec.twoByte = (sub && sub.v === 'Type0') || (enc && enc.t === 'name' && /Identity|UCS2|UniKS/i.test(enc.v));
      } catch (_) { /* 이름을 못 읽어도 기본 글꼴로 그린다 */ }
      fontCache.set(fontDict, rec);
      return rec;
    }
    async function loadToUnicode(fontDict, rec) {
      if (!fontDict || rec.toUnicode !== null) return;
      rec.toUnicode = undefined;
      try {
        const tu = dget(doc, fontDict, 'ToUnicode');
        if (tu && tu.t === 'stream') rec.toUnicode = parseToUnicode(latin1(await streamData(doc, tu, options.inflate)));
      } catch (_) { /* 없으면 바이트 그대로 읽는다 */ }
    }

    // ── 한 개의 내용 스트림을 해석한다 ──────────────────────────────
    async function run(text, resources, ctm, depth) {
      if (depth > MAX_FORM_DEPTH) return;
      const lex = new Lexer(text, 0);
      let operands = [];
      const stack = [];
      const gs = {
        ctm, fill: '#000', stroke: '#000', lineWidth: 1,
        fillSpace: 'DeviceGray', strokeSpace: 'DeviceGray',
        font: null, fontSize: 12, charSpace: 0, wordSpace: 0, hscale: 1, leading: 0, rise: 0, render: 0,
        alpha: 1
      };
      let tm = null, tlm = null;
      let path = [];              // [[op, ...pts]] — PDF 좌표
      let start = null, cur = null;
      let pendingClip = 0;        // 0 없음 1 nonzero 2 evenodd

      const num = v => { const f = parseFloat(v); return Number.isFinite(f) ? f : 0; };
      const popn = k => { const out = operands.slice(-k).map(num); while (out.length < k) out.unshift(0); return out; };

      const resDict = key => {
        const r = resolveDict(resources);
        if (!r) return null;
        return resolveDict(dget(doc, r, key));
      };

      function beginCanvasPath() {
        if (measure) return;
        ctx.beginPath();
        for (const seg of path) {
          if (seg[0] === 'm') { const p = apply(gs.ctm, seg[1], seg[2]); ctx.moveTo(...toCanvas(p)); }
          else if (seg[0] === 'l') { const p = apply(gs.ctm, seg[1], seg[2]); ctx.lineTo(...toCanvas(p)); }
          else if (seg[0] === 'c') {
            const a = toCanvas(apply(gs.ctm, seg[1], seg[2])), b = toCanvas(apply(gs.ctm, seg[3], seg[4])), c = toCanvas(apply(gs.ctm, seg[5], seg[6]));
            ctx.bezierCurveTo(a[0], a[1], b[0], b[1], c[0], c[1]);
          } else if (seg[0] === 'h') ctx.closePath();
        }
      }
      function toCanvas(p) { return [base[0] * p[0] + base[2] * p[1] + base[4], base[1] * p[0] + base[3] * p[1] + base[5]]; }
      function notePath() {
        for (const seg of path) for (let k = 1; k + 1 < seg.length; k += 2) {
          const p = apply(gs.ctm, seg[k], seg[k + 1]); note(p[0], p[1]);
        }
      }
      function scaleOf(m) { return Math.sqrt(Math.abs(m[0] * m[3] - m[1] * m[2])) || 1; }
      function paint(fill, stroke, evenodd) {
        notePath();
        if (!measure && path.length) {
          beginCanvasPath();
          ctx.globalAlpha = gs.alpha;
          if (fill) { ctx.fillStyle = gs.fill; ctx.fill(evenodd ? 'evenodd' : 'nonzero'); }
          if (stroke) {
            ctx.strokeStyle = gs.stroke;
            ctx.lineWidth = Math.max(0.35, gs.lineWidth * scaleOf(gs.ctm) * scaleOf(base));
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        }
        finishPath();
      }
      function finishPath() {
        if (pendingClip && !measure && path.length) {
          beginCanvasPath();
          ctx.clip(pendingClip === 2 ? 'evenodd' : 'nonzero');
        }
        pendingClip = 0; path = []; cur = null; start = null;
      }

      function setColor(which, space, vals) {
        let css = '#000';
        if (space === 'DeviceRGB' || (space === 'ICC' && vals.length === 3)) css = rgbCss(vals[0], vals[1], vals[2]);
        else if (space === 'DeviceCMYK' || (space === 'ICC' && vals.length === 4)) css = cmykCss(vals[0], vals[1], vals[2], vals[3]);
        else if (space === 'DeviceGray' || (space === 'ICC' && vals.length === 1)) css = grayCss(vals[0]);
        else if (space === 'Separation') css = grayCss(1 - clamp01(vals[vals.length - 1] ?? 1));   // 농도 → 회색으로 근사
        else if (vals.length === 3) css = rgbCss(vals[0], vals[1], vals[2]);
        else if (vals.length === 4) css = cmykCss(vals[0], vals[1], vals[2], vals[3]);
        else if (vals.length === 1) css = grayCss(vals[0]);
        else css = '#808080';                                    // 패턴 등 — 회색으로 자리만
        if (which === 'fill') gs.fill = css; else gs.stroke = css;
      }
      function spaceOf(nameOrRef) {
        if (!nameOrRef) return 'DeviceGray';
        if (/^\/?DeviceRGB$/.test(nameOrRef)) return 'DeviceRGB';
        if (/^\/?DeviceCMYK$/.test(nameOrRef)) return 'DeviceCMYK';
        if (/^\/?DeviceGray|CalGray$/.test(nameOrRef)) return 'DeviceGray';
        if (/^\/?Pattern$/.test(nameOrRef)) return 'Pattern';
        const cs = resDict('ColorSpace');
        const entry = cs ? get(doc, (cs.t === 'dict' ? cs.map : cs.dict.map).get(nameOrRef.replace(/^\//, ''))) : null;
        if (entry && entry.t === 'array' && entry.v.length) {
          const head = get(doc, entry.v[0]);
          const kind = head && head.t === 'name' ? head.v : '';
          if (kind === 'ICCBased') return 'ICC';
          if (kind === 'Separation' || kind === 'DeviceN') return 'Separation';
          if (kind === 'CalRGB' || kind === 'Lab') return 'DeviceRGB';
          if (kind === 'CalGray') return 'DeviceGray';
          if (kind === 'Indexed') return 'DeviceRGB';
        }
        return 'DeviceGray';
      }

      async function drawText(bytes) {
        if (!tm) return;
        const rec = gs.font || { family: 'sans-serif', toUnicode: undefined, twoByte: false };
        let str = '';
        if (rec.twoByte) {
          for (let i = 0; i + 1 < bytes.length; i += 2) {
            const code = (bytes.charCodeAt(i) << 8) | bytes.charCodeAt(i + 1);
            str += (rec.toUnicode && rec.toUnicode.get(code)) || (code >= 32 && code < 0xd800 ? String.fromCharCode(code) : ' ');
          }
        } else {
          for (let i = 0; i < bytes.length; i++) {
            const code = bytes.charCodeAt(i);
            str += (rec.toUnicode && rec.toUnicode.get(code)) || String.fromCharCode(code);
          }
        }
        const m = mul([gs.fontSize * gs.hscale, 0, 0, gs.fontSize, 0, gs.rise], mul(tm, gs.ctm));
        const origin = apply(m, 0, 0);
        note(origin[0], origin[1]);
        let advance = 0;
        if (!measure && str.trim() && gs.render !== 3 && gs.render !== 7) {
          const size = Math.hypot(m[0], m[1]) * scaleOf(base);
          const p = toCanvas(origin);
          ctx.save();
          ctx.globalAlpha = gs.alpha;
          // 글꼴이 없으니 크기·자리만 맞춘다. 기울기는 텍스트 행렬에서 가져온다.
          const angle = Math.atan2(m[1], m[0]);
          ctx.translate(p[0], p[1]);
          if (Math.abs(angle) > 1e-4) ctx.rotate(-angle * Math.sign(base[3] || 1));
          ctx.scale(1, 1);
          ctx.font = `${Math.max(1, size).toFixed(2)}px ${rec.family}`;
          ctx.fillStyle = gs.render === 1 || gs.render === 5 ? gs.stroke : gs.fill;
          ctx.textBaseline = 'alphabetic';
          ctx.fillText(str, 0, 0);
          advance = ctx.measureText(str).width / (scaleOf(base) || 1);
          ctx.restore();
          note(origin[0] + advance * Math.cos(angle), origin[1] + advance * Math.sin(angle));
        } else {
          advance = str.length * gs.fontSize * 0.5 * gs.hscale;
          const dir = apply(mul(tm, gs.ctm), advance, 0);
          note(dir[0], dir[1]);
        }
        // 다음 글자 자리 — 대략이면 된다(줄바꿈은 Td/TD/T* 가 정확히 잡는다).
        tm = mul([1, 0, 0, 1, advance + gs.charSpace * str.length, 0], tm);
      }

      async function drawXObject(name) {
        const xo = resDict('XObject');
        if (!xo) return;
        const holder = xo.t === 'dict' ? xo.map : xo.dict.map;
        const obj = get(doc, holder.get(name.replace(/^\//, '')));
        if (!obj || obj.t !== 'stream') return;
        const sub = dget(doc, obj, 'Subtype');
        if (sub && sub.v === 'Form') {
          const mtx = dget(doc, obj, 'Matrix');
          let m = gs.ctm;
          if (mtx && mtx.t === 'array' && mtx.v.length === 6) m = mul(mtx.v.map(v => numOf(get(doc, v), 0)), gs.ctm);
          const res = dgetRawRes(obj) || resources;
          try {
            const body = latin1(await streamData(doc, obj, options.inflate));
            if (!measure) ctx.save();
            await run(body, res, m, depth + 1);
            if (!measure) ctx.restore();
          } catch (_) { /* 못 읽는 폼은 건너뛴다 */ }
          return;
        }
        // 이미지 — 네 모서리를 재고, 그릴 수 있으면 그린다.
        for (const [ux, uy] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
          const p = apply(gs.ctm, ux, uy); note(p[0], p[1]);
        }
        if (measure) return;
        try {
          const bmp = await decodeImage(obj);
          if (!bmp) {
            // 못 읽는 이미지는 자리만 옅게 칠해 "여기 그림이 있다" 를 보인다.
            ctx.save(); ctx.globalAlpha = 0.18 * gs.alpha; ctx.fillStyle = '#5b7fa6';
            ctx.beginPath();
            const q = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([ux, uy]) => toCanvas(apply(gs.ctm, ux, uy)));
            ctx.moveTo(q[0][0], q[0][1]); for (let k = 1; k < 4; k++) ctx.lineTo(q[k][0], q[k][1]);
            ctx.closePath(); ctx.fill(); ctx.restore();
            return;
          }
          const m = mul([1 / bmp.width, 0, 0, -1 / bmp.height, 0, 1], gs.ctm);
          const t = mul(m, base);
          ctx.save();
          ctx.globalAlpha = gs.alpha;
          ctx.setTransform(t[0], t[1], t[2], t[3], t[4], t[5]);
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(bmp, 0, 0);
          ctx.restore();
        } catch (_) { /* 그림 하나를 못 그려도 나머지는 그린다 */ }
      }
      function dgetRawRes(obj) { const r = dget(doc, obj, 'Resources'); return r || null; }

      async function decodeImage(obj) {
        const filter = dget(doc, obj, 'Filter');
        const names = !filter ? [] : filter.t === 'name' ? [filter.v]
          : filter.t === 'array' ? filter.v.map(f => (get(doc, f) || {}).v) : [];
        const w = numOf(dget(doc, obj, 'Width'), 0), h = numOf(dget(doc, obj, 'Height'), 0);
        if (!(w > 0 && h > 0) || w * h > 36000000) return null;
        if (names.includes('DCTDecode') || names.includes('JPXDecode')) {
          if (typeof createImageBitmap !== 'function' || typeof Blob !== 'function') return null;
          const blob = new Blob([obj.raw], { type: names.includes('DCTDecode') ? 'image/jpeg' : 'image/jp2' });
          return await createImageBitmap(blob);
        }
        let data;
        try { data = await streamData(doc, obj, options.inflate); } catch (_) { return null; }
        const bpc = numOf(dget(doc, obj, 'BitsPerComponent'), 8);
        if (bpc !== 8) return null;
        const csv = dget(doc, obj, 'ColorSpace');
        const csName = csv && csv.t === 'name' ? csv.v : '';
        const comps = csName === 'DeviceRGB' ? 3 : csName === 'DeviceCMYK' ? 4 : csName === 'DeviceGray' ? 1 : 0;
        if (!comps || data.length < w * h * comps) return null;
        if (typeof document === 'undefined') return null;
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        const g = c.getContext('2d'); const img = g.createImageData(w, h);
        for (let i = 0, n = w * h; i < n; i++) {
          let r, gg, b;
          if (comps === 1) { r = gg = b = data[i]; }
          else if (comps === 3) { r = data[i * 3]; gg = data[i * 3 + 1]; b = data[i * 3 + 2]; }
          else {
            const k = data[i * 4 + 3] / 255;
            r = 255 * (1 - data[i * 4] / 255) * (1 - k);
            gg = 255 * (1 - data[i * 4 + 1] / 255) * (1 - k);
            b = 255 * (1 - data[i * 4 + 2] / 255) * (1 - k);
          }
          img.data[i * 4] = r; img.data[i * 4 + 1] = gg; img.data[i * 4 + 2] = b; img.data[i * 4 + 3] = 255;
        }
        g.putImageData(img, 0, 0);
        return c;
      }

      while (lex.i < text.length) {
        if (++opCount > MAX_OPS) return;
        lex.skip();
        if (lex.i >= text.length) break;
        const at = lex.i, ch = text[at];
        if (ch === '(' || ch === '<' || ch === '[' || ch === '/') { lex.value(); operands.push(text.slice(at, lex.i)); continue; }
        const tok = lex.token();
        if (tok === null) break;
        if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(tok)) { operands.push(tok); continue; }

        switch (tok) {
          case 'q': stack.push({ ...gs }); if (!measure) ctx.save(); break;
          case 'Q': { const prev = stack.pop(); if (prev) Object.assign(gs, prev); if (!measure) ctx.restore(); break; }
          case 'cm': { const v = popn(6); gs.ctm = mul(v, gs.ctm); break; }
          case 'w': gs.lineWidth = popn(1)[0]; break;
          case 'gs': {
            const eg = resDict('ExtGState');
            const holder = eg ? (eg.t === 'dict' ? eg.map : eg.dict.map) : null;
            const st = holder ? resolveDict(holder.get(String(operands[operands.length - 1] || '').replace(/^\//, ''))) : null;
            if (st) { const ca = dget(doc, st, 'ca'); if (ca && ca.t === 'num') gs.alpha = clamp01(ca.v); }
            break;
          }
          case 'm': { const v = popn(2); path.push(['m', v[0], v[1]]); cur = start = v; break; }
          case 'l': { const v = popn(2); path.push(['l', v[0], v[1]]); cur = v; break; }
          case 'c': { const v = popn(6); path.push(['c', v[0], v[1], v[2], v[3], v[4], v[5]]); cur = [v[4], v[5]]; break; }
          case 'v': { const v = popn(4); const p0 = cur || [0, 0]; path.push(['c', p0[0], p0[1], v[0], v[1], v[2], v[3]]); cur = [v[2], v[3]]; break; }
          case 'y': { const v = popn(4); path.push(['c', v[0], v[1], v[2], v[3], v[2], v[3]]); cur = [v[2], v[3]]; break; }
          case 'h': path.push(['h']); if (start) cur = start; break;
          case 're': {
            const v = popn(4);
            path.push(['m', v[0], v[1]], ['l', v[0] + v[2], v[1]], ['l', v[0] + v[2], v[1] + v[3]], ['l', v[0], v[1] + v[3]], ['h']);
            cur = start = [v[0], v[1]];
            break;
          }
          case 'n': finishPath(); break;
          case 'f': case 'F': paint(true, false, false); break;
          case 'f*': paint(true, false, true); break;
          case 'S': paint(false, true, false); break;
          case 's': path.push(['h']); paint(false, true, false); break;
          case 'B': paint(true, true, false); break;
          case 'B*': paint(true, true, true); break;
          case 'b': path.push(['h']); paint(true, true, false); break;
          case 'b*': path.push(['h']); paint(true, true, true); break;
          case 'W': pendingClip = 1; break;
          case 'W*': pendingClip = 2; break;
          case 'g': setColor('fill', 'DeviceGray', popn(1)); gs.fillSpace = 'DeviceGray'; break;
          case 'G': setColor('stroke', 'DeviceGray', popn(1)); gs.strokeSpace = 'DeviceGray'; break;
          case 'rg': setColor('fill', 'DeviceRGB', popn(3)); gs.fillSpace = 'DeviceRGB'; break;
          case 'RG': setColor('stroke', 'DeviceRGB', popn(3)); gs.strokeSpace = 'DeviceRGB'; break;
          case 'k': setColor('fill', 'DeviceCMYK', popn(4)); gs.fillSpace = 'DeviceCMYK'; break;
          case 'K': setColor('stroke', 'DeviceCMYK', popn(4)); gs.strokeSpace = 'DeviceCMYK'; break;
          case 'cs': gs.fillSpace = spaceOf(String(operands[operands.length - 1] || '')); break;
          case 'CS': gs.strokeSpace = spaceOf(String(operands[operands.length - 1] || '')); break;
          case 'sc': case 'scn': {
            const nums = operands.filter(o => /^[+-]?(\d+\.?\d*|\.\d+)$/.test(o)).map(num);
            setColor('fill', gs.fillSpace, nums);
            break;
          }
          case 'SC': case 'SCN': {
            const nums = operands.filter(o => /^[+-]?(\d+\.?\d*|\.\d+)$/.test(o)).map(num);
            setColor('stroke', gs.strokeSpace, nums);
            break;
          }
          case 'BT': tm = tlm = [1, 0, 0, 1, 0, 0]; break;
          case 'ET': tm = tlm = null; break;
          case 'Tf': {
            gs.fontSize = popn(1)[0];
            const fonts = resDict('Font');
            const holder = fonts ? (fonts.t === 'dict' ? fonts.map : fonts.dict.map) : null;
            const key = String(operands[operands.length - 2] || '').replace(/^\//, '');
            const fd = holder ? resolveDict(holder.get(key)) : null;
            gs.font = readFont(fd);
            if (fd) await loadToUnicode(fd, gs.font);
            break;
          }
          case 'Td': { const v = popn(2); tlm = mul([1, 0, 0, 1, v[0], v[1]], tlm || [1, 0, 0, 1, 0, 0]); tm = tlm.slice(); break; }
          case 'TD': { const v = popn(2); gs.leading = -v[1]; tlm = mul([1, 0, 0, 1, v[0], v[1]], tlm || [1, 0, 0, 1, 0, 0]); tm = tlm.slice(); break; }
          case 'Tm': { const v = popn(6); tlm = v.slice(); tm = v.slice(); break; }
          case 'T*': { tlm = mul([1, 0, 0, 1, 0, -gs.leading], tlm || [1, 0, 0, 1, 0, 0]); tm = tlm.slice(); break; }
          case 'TL': gs.leading = popn(1)[0]; break;
          case 'Tc': gs.charSpace = popn(1)[0]; break;
          case 'Tw': gs.wordSpace = popn(1)[0]; break;
          case 'Tz': gs.hscale = popn(1)[0] / 100; break;
          case 'Ts': gs.rise = popn(1)[0]; break;
          case 'Tr': gs.render = popn(1)[0] | 0; break;
          case 'Tj': case "'": case '"': {
            if (tok !== 'Tj') { tlm = mul([1, 0, 0, 1, 0, -gs.leading], tlm || [1, 0, 0, 1, 0, 0]); tm = tlm.slice(); }
            const raw = operands[operands.length - 1] || '';
            await drawText(decodeLiteral(raw));
            break;
          }
          case 'TJ': {
            const arr = operands[operands.length - 1] || '';
            const parts = arr.match(/\((?:\\.|[^\\)])*\)|<[0-9A-Fa-f\s]*>|[+-]?(?:\d+\.?\d*|\.\d+)/g) || [];
            for (const part of parts) {
              if (part[0] === '(' || part[0] === '<') await drawText(decodeLiteral(part));
              else if (tm) tm = mul([1, 0, 0, 1, -parseFloat(part) / 1000 * gs.fontSize * gs.hscale, 0], tm);
            }
            break;
          }
          case 'Do': await drawXObject(String(operands[operands.length - 1] || '')); break;
          case 'BI': { const ei = text.indexOf('EI', lex.i); lex.i = ei < 0 ? text.length : ei + 2; break; }
          default: break;
        }
        operands = [];
      }
    }

    function decodeLiteral(raw) {
      if (!raw) return '';
      if (raw[0] === '<') {
        const hex = raw.replace(/[^0-9A-Fa-f]/g, '');
        let out = '';
        for (let i = 0; i + 1 < hex.length; i += 2) out += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        if (hex.length % 2) out += String.fromCharCode(parseInt(hex.slice(-1) + '0', 16));
        return out;
      }
      const body = raw.slice(1, -1);
      let out = '';
      for (let i = 0; i < body.length; i++) {
        const c = body[i];
        if (c !== '\\') { out += c; continue; }
        const n = body[++i];
        if (n === 'n') out += '\n'; else if (n === 'r') out += '\r'; else if (n === 't') out += '\t';
        else if (n === 'b') out += '\b'; else if (n === 'f') out += '\f';
        else if (n >= '0' && n <= '7') {
          let oct = n;
          while (oct.length < 3 && body[i + 1] >= '0' && body[i + 1] <= '7') oct += body[++i];
          out += String.fromCharCode(parseInt(oct, 8));
        } else if (n !== undefined) out += n;
      }
      return out;
    }

    const resources = dget(doc, page.pageDict, 'Resources');
    await run(page.content, resources, [1, 0, 0, 1, 0, 0], 0);
    return measure && Number.isFinite(bounds.x0) ? bounds : null;
  }

  // 판형과 실제 그려진 것을 다 담는 상자를 낸다 (대지 밖 설명까지).
  async function contentBounds(guideApi, guide, page, opts) {
    try {
      const box = await renderPage(null, guideApi, guide, page, { ...(opts || {}), measure: true });
      if (!box) return null;
      // 터무니없이 큰 좌표는 버린다 — 못 읽은 연산자 하나가 화면을 다 망친다.
      const limit = Math.max(page.media.w, page.media.h) * 6 + 2000;
      if (box.x1 - box.x0 > limit || box.y1 - box.y0 > limit) return null;
      return box;
    } catch (_) { return null; }
  }

  return { renderPage, contentBounds, _internal: { parseToUnicode, mul, apply } };
});
