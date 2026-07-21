(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const els = {
    canvas: $('previewCanvas'), stage: $('stageWrap'), busy: $('busyOverlay'),
    acrylicModeBtn: $('acrylicModeBtn'), stickerModeBtn: $('stickerModeBtn'),
    acrylicControls: $('acrylicControls'), stickerControls: $('stickerControls'),
    singleFileInput: $('singleFileInput'), multiFileInput: $('multiFileInput'),
    imageStatus: $('imageStatus'), stickerCount: $('stickerCount'), qualityNotice: $('qualityNotice'),
    productWidth: $('productWidth'), productHeight: $('productHeight'), bleedMm: $('bleedMm'), alphaThreshold: $('alphaThreshold'),
    includeHoles: $('includeHoles'), addFlatBase: $('addFlatBase'), generateBtn: $('generateBtn'),
    artboardWidth: $('artboardWidth'), artboardHeight: $('artboardHeight'), stickerBorder: $('stickerBorder'), stickerBleed: $('stickerBleed'),
    generateStickerBtn: $('generateStickerBtn'), selectionEditor: $('selectionEditor'), selWidth: $('selWidth'), selRotation: $('selRotation'), selX: $('selX'), selY: $('selY'),
    bringFrontBtn: $('bringFrontBtn'), deleteStickerBtn: $('deleteStickerBtn'),
    exportSvgBtn: $('exportSvgBtn'), exportAiBtn: $('exportAiBtn'), resetBtn: $('resetBtn'),
    zoomOutBtn: $('zoomOutBtn'), zoomInBtn: $('zoomInBtn'), fitBtn: $('fitBtn'), zoomLabel: $('zoomLabel'), geometryMeta: $('geometryMeta')
  };

  const ctx = els.canvas.getContext('2d');
  const state = {
    mode: 'acrylic',
    source: null,
    stickers: [],
    selectedId: null,
    view: 'composite',
    zoom: 1,
    result: null,
    dragging: null,
    generationToken: 0
  };

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function num(el, fallback = 0) { const v = Number(el.value); return Number.isFinite(v) ? v : fallback; }
  function uid() { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`; }
  function nextFrame() { return new Promise(resolve => requestAnimationFrame(() => resolve())); }
  function makeCanvas(w, h) { const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
  function dataUrlToBlob(dataUrl) {
    const [head, body] = dataUrl.split(',');
    const mime = /data:([^;]+)/.exec(head)?.[1] || 'application/octet-stream';
    const bytes = atob(body); const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }
  function downloadBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function escapeXml(s) { return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch])); }

  async function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function fileToImageRecord(file) {
    const dataUrl = await new Promise((resolve, reject) => {
      const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = reject; r.readAsDataURL(file);
    });
    const img = await loadImage(dataUrl);
    return { img, dataUrl, name: file.name || 'image', naturalWidth: img.naturalWidth || img.width, naturalHeight: img.naturalHeight || img.height };
  }

  async function loadSample() {
    try {
      const img = await loadImage('sample.png');
      state.source = { img, dataUrl: 'sample.png', name: 'sample.png', naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
      els.imageStatus.textContent = '샘플 로드됨';
      await generateAcrylic();
    } catch (err) {
      els.imageStatus.textContent = '이미지 필요';
      setNotice('info', '이미지를 추가해 주세요', '투명 PNG를 올리면 외곽선과 재단여백을 생성합니다.');
      drawPreview();
    }
  }

  function setMode(mode) {
    state.mode = mode;
    state.result = null;
    state.zoom = 1;
    els.acrylicModeBtn.classList.toggle('active', mode === 'acrylic');
    els.stickerModeBtn.classList.toggle('active', mode === 'sticker');
    els.acrylicModeBtn.setAttribute('aria-selected', String(mode === 'acrylic'));
    els.stickerModeBtn.setAttribute('aria-selected', String(mode === 'sticker'));
    els.acrylicControls.classList.toggle('hidden', mode !== 'acrylic');
    els.stickerControls.classList.toggle('hidden', mode !== 'sticker');
    if (mode === 'acrylic') generateAcrylic(); else generateSticker();
  }

  function setBusy(on) { els.busy.classList.toggle('hidden', !on); }
  function setNotice(kind, title, detail) {
    els.qualityNotice.className = `notice ${kind}`;
    els.qualityNotice.innerHTML = `<strong>${escapeXml(title)}</strong><span>${escapeXml(detail)}</span>`;
  }

  function getTrimBounds(record, threshold = 1) {
    const w = record.naturalWidth, h = record.naturalHeight;
    const maxDim = 1200;
    const s = Math.min(1, maxDim / Math.max(w, h));
    const c = makeCanvas(Math.round(w * s), Math.round(h * s));
    const cctx = c.getContext('2d', { willReadFrequently: true });
    cctx.drawImage(record.img, 0, 0, c.width, c.height);
    const d = cctx.getImageData(0, 0, c.width, c.height).data;
    let minX = c.width, minY = c.height, maxX = -1, maxY = -1;
    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        if (d[(y * c.width + x) * 4 + 3] >= threshold) {
          if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < minX) return { sx: 0, sy: 0, sw: w, sh: h };
    return { sx: minX / s, sy: minY / s, sw: (maxX - minX + 1) / s, sh: (maxY - minY + 1) / s };
  }

  function imageDataToMask(imageData, threshold) {
    const n = imageData.width * imageData.height;
    const mask = new Uint8Array(n);
    const data = imageData.data;
    for (let i = 0; i < n; i++) mask[i] = data[i * 4 + 3] >= threshold ? 1 : 0;
    return mask;
  }

  function directedBoundaryEdges(mask, w, h) {
    const edgeMap = new Map();
    const add = (x1, y1, x2, y2, dir) => {
      const key = `${x1},${y1}`;
      const arr = edgeMap.get(key) || [];
      arr.push({ x1, y1, x2, y2, dir, used: false });
      edgeMap.set(key, arr);
    };
    const at = (x, y) => (x >= 0 && y >= 0 && x < w && y < h) ? mask[y * w + x] : 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!mask[y * w + x]) continue;
        if (!at(x, y - 1)) add(x, y, x + 1, y, 0);
        if (!at(x + 1, y)) add(x + 1, y, x + 1, y + 1, 1);
        if (!at(x, y + 1)) add(x + 1, y + 1, x, y + 1, 2);
        if (!at(x - 1, y)) add(x, y + 1, x, y, 3);
      }
    }
    return edgeMap;
  }

  function chooseNextEdge(candidates, currentDir) {
    const preference = [(currentDir + 1) % 4, currentDir, (currentDir + 3) % 4, (currentDir + 2) % 4];
    for (const dir of preference) {
      const edge = candidates.find(e => !e.used && e.dir === dir);
      if (edge) return edge;
    }
    return candidates.find(e => !e.used) || null;
  }

  function traceContours(mask, w, h) {
    const edgeMap = directedBoundaryEdges(mask, w, h);
    const contours = [];
    for (const arr of edgeMap.values()) {
      for (const first of arr) {
        if (first.used) continue;
        const points = [{ x: first.x1, y: first.y1 }];
        first.used = true;
        let edge = first;
        let guard = 0;
        while (guard++ < w * h * 4) {
          points.push({ x: edge.x2, y: edge.y2 });
          if (edge.x2 === first.x1 && edge.y2 === first.y1) break;
          const nextArr = edgeMap.get(`${edge.x2},${edge.y2}`) || [];
          const next = chooseNextEdge(nextArr, edge.dir);
          if (!next) break;
          next.used = true; edge = next;
        }
        if (points.length >= 5 && points[points.length - 1].x === points[0].x && points[points.length - 1].y === points[0].y) {
          points.pop();
          const simplified = simplifyClosed(points, 1.15);
          if (Math.abs(polygonArea(simplified)) > 4) contours.push(simplified);
        }
      }
    }
    return contours;
  }

  function polygonArea(points) {
    let a = 0;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) a += points[j].x * points[i].y - points[i].x * points[j].y;
    return a / 2;
  }

  function pointSegDistSq(p, a, b) {
    const vx = b.x - a.x, vy = b.y - a.y;
    const wx = p.x - a.x, wy = p.y - a.y;
    const c1 = vx * wx + vy * wy;
    if (c1 <= 0) return wx * wx + wy * wy;
    const c2 = vx * vx + vy * vy;
    if (c2 <= c1) { const dx = p.x - b.x, dy = p.y - b.y; return dx * dx + dy * dy; }
    const t = c1 / c2; const px = a.x + t * vx, py = a.y + t * vy;
    const dx = p.x - px, dy = p.y - py; return dx * dx + dy * dy;
  }

  function simplifyOpen(points, epsilon) {
    if (points.length <= 2) return points.slice();
    const epsSq = epsilon * epsilon;
    const keep = new Uint8Array(points.length); keep[0] = 1; keep[points.length - 1] = 1;
    const stack = [[0, points.length - 1]];
    while (stack.length) {
      const [start, end] = stack.pop(); let maxDist = 0, idx = -1;
      for (let i = start + 1; i < end; i++) {
        const d = pointSegDistSq(points[i], points[start], points[end]);
        if (d > maxDist) { maxDist = d; idx = i; }
      }
      if (maxDist > epsSq && idx > 0) { keep[idx] = 1; stack.push([start, idx], [idx, end]); }
    }
    return points.filter((_, i) => keep[i]);
  }

  function simplifyClosed(points, epsilon) {
    if (points.length < 8) return points.slice();
    let far = 1, maxD = -1;
    const p0 = points[0];
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - p0.x, dy = points[i].y - p0.y, d = dx * dx + dy * dy;
      if (d > maxD) { maxD = d; far = i; }
    }
    const a = points.slice(0, far + 1);
    const b = points.slice(far).concat([points[0]]);
    const sa = simplifyOpen(a, epsilon);
    const sb = simplifyOpen(b, epsilon);
    return sa.slice(0, -1).concat(sb.slice(0, -1));
  }

  function arcIndices(n, start, end) {
    const out = []; let i = start;
    while (true) { out.push(i); if (i === end) break; i = (i + 1) % n; if (out.length > n + 1) break; }
    return out;
  }

  function applyFlatBase(path) {
    if (!path || path.length < 6 || polygonArea(path) <= 0) return { path, base: null };
    let maxY = -Infinity, minY = Infinity;
    for (const p of path) { maxY = Math.max(maxY, p.y); minY = Math.min(minY, p.y); }
    const tol = Math.max(2, (maxY - minY) * 0.018);
    const candidates = path.map((p, i) => ({ p, i })).filter(v => v.p.y >= maxY - tol);
    if (candidates.length < 2) return { path, base: null };
    let left = candidates[0], right = candidates[0];
    for (const c of candidates) { if (c.p.x < left.p.x) left = c; if (c.p.x > right.p.x) right = c; }
    if (right.p.x - left.p.x < 8) return { path, base: null };
    const arc1 = arcIndices(path.length, left.i, right.i);
    const arc2 = arcIndices(path.length, right.i, left.i);
    const avg = arr => arr.reduce((s, i) => s + path[i].y, 0) / arr.length;
    const bottomArc = avg(arc1) > avg(arc2) ? arc1 : arc2;
    const keepArc = bottomArc === arc1 ? arc2 : arc1;
    const result = keepArc.map(i => ({ ...path[i] }));
    const start = result[0], end = result[result.length - 1];
    const y = Math.max(start.y, end.y, maxY - tol * 0.25);
    result[0] = { x: start.x, y }; result[result.length - 1] = { x: end.x, y };
    return { path: result, base: { x1: Math.min(start.x, end.x), x2: Math.max(start.x, end.x), y } };
  }

  function rasterizePaths(paths, w, h) {
    const c = makeCanvas(w, h); const cctx = c.getContext('2d', { willReadFrequently: true });
    cctx.fillStyle = '#fff';
    for (const path of paths) {
      if (!path.length) continue;
      cctx.beginPath(); cctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) cctx.lineTo(path[i].x, path[i].y);
      cctx.closePath(); cctx.fill();
    }
    const d = cctx.getImageData(0, 0, w, h).data; const mask = new Uint8Array(w * h);
    for (let i = 0; i < mask.length; i++) mask[i] = d[i * 4 + 3] > 0 ? 1 : 0;
    return mask;
  }

  function makeBleed(originalData, objectMask, outerMask, holeMask, w, h, bleedPx, includeHoles, baseNoBleed) {
    const n = w * h;
    const allowed = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      if (!outerMask[i]) allowed[i] = 1;
      else if (includeHoles && holeMask[i]) allowed[i] = 1;
      if (baseNoBleed && baseNoBleed[i]) allowed[i] = 0;
    }
    const dist = new Int16Array(n); dist.fill(-1);
    const src = new Int32Array(n); src.fill(-1);
    const q = new Int32Array(n); let head = 0, tail = 0;
    const dirs = [-1, 1, -w, w, -w - 1, -w + 1, w - 1, w + 1];
    const alpha = originalData.data;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        if (!allowed[i]) continue;
        let best = -1, bestA = -1;
        for (const off of dirs) {
          const ni = i + off;
          if (objectMask[ni]) {
            const a = alpha[ni * 4 + 3]; if (a > bestA) { bestA = a; best = ni; }
          }
        }
        if (best >= 0) { dist[i] = 1; src[i] = best; q[tail++] = i; }
      }
    }
    while (head < tail) {
      const i = q[head++]; const d = dist[i]; if (d >= bleedPx) continue;
      const x = i % w, y = (i / w) | 0;
      for (let k = 0; k < dirs.length; k++) {
        const ni = i + dirs[k];
        const nx = ni % w, ny = (ni / w) | 0;
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
        if (Math.abs(nx - x) > 1 || Math.abs(ny - y) > 1) continue;
        if (!allowed[ni] || dist[ni] !== -1) continue;
        dist[ni] = d + 1; src[ni] = src[i]; q[tail++] = ni;
      }
    }
    const out = new ImageData(w, h); const od = out.data;
    for (let i = 0; i < n; i++) {
      if (dist[i] < 1 || dist[i] > bleedPx || src[i] < 0) continue;
      const s = src[i] * 4, t = i * 4;
      od[t] = alpha[s]; od[t + 1] = alpha[s + 1]; od[t + 2] = alpha[s + 2]; od[t + 3] = 255;
    }
    return out;
  }

  function buildBaseNoBleed(base, objectMask, w, h, bleedPx) {
    if (!base) return null;
    const mask = new Uint8Array(w * h);
    const y0 = clamp(Math.round(base.y), 0, h - 1);
    const x1 = clamp(Math.floor(base.x1), 0, w - 1), x2 = clamp(Math.ceil(base.x2), 0, w - 1);
    for (let x = x1; x <= x2; x++) {
      let touchesInk = false;
      for (let yy = Math.max(0, y0 - 4); yy <= Math.min(h - 1, y0 + 1); yy++) if (objectMask[yy * w + x]) { touchesInk = true; break; }
      if (!touchesInk) {
        for (let yy = y0; yy <= Math.min(h - 1, y0 + bleedPx + 2); yy++) mask[yy * w + x] = 1;
      }
    }
    return mask;
  }

  async function generateAcrylic() {
    if (state.mode !== 'acrylic' || !state.source) { drawPreview(); return; }
    const token = ++state.generationToken; setBusy(true); await nextFrame();
    try {
      const widthMm = clamp(num(els.productWidth, 70), 5, 1000);
      const heightMm = clamp(num(els.productHeight, 70), 5, 1000);
      const bleedMm = clamp(num(els.bleedMm, 2), 0, 20);
      const threshold = clamp(num(els.alphaThreshold, 24), 1, 254);
      const includeHoles = els.includeHoles.checked;
      const flatBase = els.addFlatBase.checked;
      const ppm = clamp(900 / Math.max(widthMm, heightMm), 3, 11);
      const coreW = Math.max(24, Math.round(widthMm * ppm));
      const coreH = Math.max(24, Math.round(heightMm * ppm));
      const bleedPx = Math.max(0, Math.round(bleedMm * ppm));
      const pad = Math.max(10, bleedPx + 8);
      const w = coreW + pad * 2, h = coreH + pad * 2;
      const original = makeCanvas(w, h); const octx = original.getContext('2d', { willReadFrequently: true });
      const trim = getTrimBounds(state.source, threshold);
      const fit = Math.min(coreW / trim.sw, coreH / trim.sh);
      const drawW = trim.sw * fit, drawH = trim.sh * fit;
      const dx = pad + (coreW - drawW) / 2, dy = pad + (coreH - drawH) / 2;
      octx.imageSmoothingEnabled = true; octx.imageSmoothingQuality = 'high';
      octx.drawImage(state.source.img, trim.sx, trim.sy, trim.sw, trim.sh, dx, dy, drawW, drawH);
      const originalData = octx.getImageData(0, 0, w, h);
      const objectMask = imageDataToMask(originalData, threshold);
      let contours = traceContours(objectMask, w, h);
      if (!contours.length) throw new Error('투명하지 않은 픽셀을 찾지 못했습니다.');
      let outerPaths = contours.filter(p => polygonArea(p) > 0);
      const holePaths = contours.filter(p => polygonArea(p) < 0);
      let base = null;
      if (flatBase && outerPaths.length) {
        let largestIdx = 0;
        for (let i = 1; i < outerPaths.length; i++) if (Math.abs(polygonArea(outerPaths[i])) > Math.abs(polygonArea(outerPaths[largestIdx]))) largestIdx = i;
        const changed = applyFlatBase(outerPaths[largestIdx]);
        outerPaths = outerPaths.slice(); outerPaths[largestIdx] = changed.path; base = changed.base;
      }
      const outerMask = rasterizePaths(outerPaths, w, h);
      const holeMask = holePaths.length ? rasterizePaths(holePaths, w, h) : new Uint8Array(w * h);
      const baseNoBleed = flatBase ? buildBaseNoBleed(base, objectMask, w, h, bleedPx) : null;
      const bleedData = makeBleed(originalData, objectMask, outerMask, holeMask, w, h, bleedPx, includeHoles, baseNoBleed);
      const bleed = makeCanvas(w, h); bleed.getContext('2d').putImageData(bleedData, 0, 0);
      const fullPrint = makeCanvas(w, h); const fctx = fullPrint.getContext('2d'); fctx.drawImage(bleed, 0, 0); fctx.drawImage(original, 0, 0);
      const cutPaths = outerPaths.concat(includeHoles ? holePaths : []);
      const actualWmm = drawW / ppm, actualHmm = drawH / ppm;
      const ppi = Math.min(trim.sw / (actualWmm / 25.4), trim.sh / (actualHmm / 25.4));
      state.result = { mode: 'acrylic', widthPx: w, heightPx: h, widthMm: w / ppm, heightMm: h / ppm, productWidthMm: widthMm, productHeightMm: heightMm, ppm, original, bleed, fullPrint, cutPaths, outerPaths, holePaths, includeHoles, base, ppi, actualWmm, actualHmm };
      updateQualityAcrylic(ppi, actualWmm, actualHmm);
      els.geometryMeta.textContent = `대상 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · 실제 그림 ${actualWmm.toFixed(1)} × ${actualHmm.toFixed(1)} mm · ${Math.round(ppi)} ppi · 칼선 ${cutPaths.length}개`;
      if (token === state.generationToken) drawPreview();
    } catch (err) {
      console.error(err); setNotice('bad', '생성할 수 없습니다', err.message || '이미지 처리 중 오류가 발생했습니다.');
    } finally { if (token === state.generationToken) setBusy(false); }
  }

  function updateQualityAcrylic(ppi, wMm, hMm) {
    if (ppi >= 300) setNotice('good', `인쇄 해상도 양호 · ${Math.round(ppi)} ppi`, `현재 그림 크기 ${wMm.toFixed(1)} × ${hMm.toFixed(1)} mm에서 300 ppi 이상입니다.`);
    else if (ppi >= 180) setNotice('warn', `확대 시 주의 · ${Math.round(ppi)} ppi`, '가까이서 보면 가장자리나 세부가 다소 흐려질 수 있습니다. 300 ppi 이상을 권장합니다.');
    else setNotice('bad', `화질 깨짐 위험 · ${Math.round(ppi)} ppi`, '입력 크기에 비해 원본 픽셀이 부족합니다. 더 큰 이미지를 쓰거나 완성 크기를 줄여 주세요.');
  }

  function dilateMask(mask, w, h, radius) {
    const out = new Uint8Array(mask); if (radius <= 0) return out;
    const dist = new Int16Array(w * h); dist.fill(-1);
    const q = new Int32Array(w * h); let head = 0, tail = 0;
    for (let i = 0; i < mask.length; i++) if (mask[i]) { dist[i] = 0; q[tail++] = i; }
    const dirs = [-1, 1, -w, w, -w - 1, -w + 1, w - 1, w + 1];
    while (head < tail) {
      const i = q[head++], d = dist[i]; if (d >= radius) continue;
      const x = i % w, y = (i / w) | 0;
      for (const off of dirs) {
        const ni = i + off, nx = ni % w, ny = (ni / w) | 0;
        if (nx < 0 || nx >= w || ny < 0 || ny >= h || Math.abs(nx - x) > 1 || Math.abs(ny - y) > 1 || dist[ni] !== -1) continue;
        dist[ni] = d + 1; out[ni] = 1; q[tail++] = ni;
      }
    }
    return out;
  }

  function renderStickerToCanvas(sticker, canvas, ppm, alphaOnly = false) {
    const cctx = canvas.getContext('2d');
    const w = sticker.widthMm * ppm;
    const h = w * sticker.naturalHeight / sticker.naturalWidth;
    cctx.save(); cctx.translate(sticker.xMm * ppm, sticker.yMm * ppm); cctx.rotate(sticker.rotation * Math.PI / 180);
    if (alphaOnly) {
      cctx.drawImage(sticker.img, -w / 2, -h / 2, w, h);
    } else {
      cctx.imageSmoothingEnabled = true; cctx.imageSmoothingQuality = 'high'; cctx.drawImage(sticker.img, -w / 2, -h / 2, w, h);
    }
    cctx.restore();
  }

  async function generateSticker() {
    if (state.mode !== 'sticker') return;
    const token = ++state.generationToken; setBusy(true); await nextFrame();
    try {
      const widthMm = clamp(num(els.artboardWidth, 210), 20, 1000), heightMm = clamp(num(els.artboardHeight, 297), 20, 1000);
      const borderMm = clamp(num(els.stickerBorder, 2), 0, 20), bleedMm = clamp(num(els.stickerBleed, 1), 0, 20);
      const ppm = clamp(950 / Math.max(widthMm, heightMm), 2.2, 7);
      const w = Math.round(widthMm * ppm), h = Math.round(heightMm * ppm);
      const borderPx = Math.round(borderMm * ppm), bleedPx = Math.round(bleedMm * ppm);
      const original = makeCanvas(w, h), printBase = makeCanvas(w, h), bleed = makeCanvas(w, h);
      const pctx = printBase.getContext('2d'), bctx = bleed.getContext('2d');
      const cutPaths = [];
      for (const sticker of state.stickers) {
        const item = makeCanvas(w, h); renderStickerToCanvas(sticker, item, ppm, true);
        const id = item.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, w, h);
        const mask = imageDataToMask(id, 20);
        const borderMask = dilateMask(mask, w, h, borderPx);
        const bleedMask = dilateMask(borderMask, w, h, bleedPx);
        const borderImage = pctx.createImageData(w, h), bleedImage = bctx.createImageData(w, h);
        for (let i = 0; i < mask.length; i++) {
          if (borderMask[i] && !mask[i]) { const t = i * 4; borderImage.data[t] = 255; borderImage.data[t+1] = 255; borderImage.data[t+2] = 255; borderImage.data[t+3] = 255; }
          if (bleedMask[i] && !borderMask[i]) { const t = i * 4; bleedImage.data[t] = 255; bleedImage.data[t+1] = 255; bleedImage.data[t+2] = 255; bleedImage.data[t+3] = 255; }
        }
        const bc = makeCanvas(w, h), blc = makeCanvas(w, h); bc.getContext('2d').putImageData(borderImage, 0, 0); blc.getContext('2d').putImageData(bleedImage, 0, 0);
        pctx.drawImage(bc, 0, 0); bctx.drawImage(blc, 0, 0);
        const paths = traceContours(borderMask, w, h).filter(p => polygonArea(p) > 0);
        cutPaths.push(...paths);
      }
      for (const sticker of state.stickers) renderStickerToCanvas(sticker, original, ppm, false);
      pctx.drawImage(original, 0, 0);
      const fullPrint = makeCanvas(w, h); const fctx = fullPrint.getContext('2d'); fctx.drawImage(bleed, 0, 0); fctx.drawImage(printBase, 0, 0);
      const ppis = state.stickers.map(s => s.naturalWidth / (s.widthMm / 25.4));
      const minPpi = ppis.length ? Math.min(...ppis) : Infinity;
      state.result = { mode: 'sticker', widthPx: w, heightPx: h, widthMm, heightMm, ppm, original, printBase, bleed, fullPrint, cutPaths, ppi: minPpi };
      updateQualitySticker(minPpi);
      els.geometryMeta.textContent = `대지 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · 이미지 ${state.stickers.length}개 · 칼선 ${cutPaths.length}개${Number.isFinite(minPpi) ? ` · 최저 ${Math.round(minPpi)} ppi` : ''}`;
      if (token === state.generationToken) drawPreview();
    } catch (err) {
      console.error(err); setNotice('bad', '스티커 대지를 만들 수 없습니다', err.message || '처리 중 오류가 발생했습니다.');
    } finally { if (token === state.generationToken) setBusy(false); }
  }

  function updateQualitySticker(ppi) {
    if (!state.stickers.length) return setNotice('info', '이미지를 추가해 주세요', '대지 위에 여러 이미지를 올리고 드래그해서 배치할 수 있습니다.');
    if (ppi >= 300) setNotice('good', `모든 이미지 해상도 양호`, `가장 낮은 이미지도 ${Math.round(ppi)} ppi입니다.`);
    else if (ppi >= 180) setNotice('warn', `일부 이미지 확대 주의`, `가장 낮은 이미지가 ${Math.round(ppi)} ppi입니다.`);
    else setNotice('bad', `일부 이미지 화질 깨짐 위험`, `가장 낮은 이미지가 ${Math.round(ppi)} ppi입니다. 선택한 이미지 크기를 줄여 주세요.`);
  }

  function drawPath(c, path, scaleX, scaleY, offsetX, offsetY) {
    if (!path.length) return;
    c.moveTo(offsetX + path[0].x * scaleX, offsetY + path[0].y * scaleY);
    for (let i = 1; i < path.length; i++) c.lineTo(offsetX + path[i].x * scaleX, offsetY + path[i].y * scaleY);
    c.closePath();
  }

  function resizePreviewCanvas() {
    const rect = els.stage.getBoundingClientRect(); const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(1, Math.round(rect.width * dpr)), h = Math.max(1, Math.round(rect.height * dpr));
    if (els.canvas.width !== w || els.canvas.height !== h) { els.canvas.width = w; els.canvas.height = h; }
    drawPreview();
  }

  function getViewTransform() {
    const r = state.result;
    const cw = els.canvas.width, ch = els.canvas.height;
    if (!r) return { scale: 1, x: 0, y: 0, boardW: 0, boardH: 0 };
    const fit = Math.min((cw - 100) / r.widthPx, (ch - 100) / r.heightPx);
    const scale = Math.max(0.05, fit * state.zoom);
    const boardW = r.widthPx * scale, boardH = r.heightPx * scale;
    return { scale, x: (cw - boardW) / 2, y: (ch - boardH) / 2, boardW, boardH };
  }

  function drawPreview() {
    const cw = els.canvas.width, ch = els.canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    const r = state.result;
    if (!r) {
      ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.72)'; ctx.font = `${14 * (window.devicePixelRatio || 1)}px system-ui`; ctx.textAlign = 'center';
      ctx.fillText(state.mode === 'acrylic' ? '이미지를 추가하면 미리보기가 나타납니다.' : '스티커 이미지를 추가해 주세요.', cw / 2, ch / 2); ctx.restore(); return;
    }
    const t = getViewTransform();
    ctx.save(); ctx.shadowColor = 'rgba(25,22,18,.20)'; ctx.shadowBlur = 30; ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(t.x, t.y, t.boardW, t.boardH); ctx.restore();
    ctx.save(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    if (state.view === 'original') ctx.drawImage(r.mode === 'sticker' ? r.original : r.original, t.x, t.y, t.boardW, t.boardH);
    else if (state.view === 'bleed') ctx.drawImage(r.fullPrint, t.x, t.y, t.boardW, t.boardH);
    else if (state.view === 'composite') ctx.drawImage(r.fullPrint, t.x, t.y, t.boardW, t.boardH);
    ctx.restore();
    if (state.view === 'cutline' || state.view === 'composite') {
      ctx.save(); ctx.beginPath();
      for (const p of r.cutPaths) drawPath(ctx, p, t.scale, t.scale, t.x, t.y);
      ctx.strokeStyle = '#ff24b9'; ctx.lineWidth = Math.max(1.4, 1.2 * (window.devicePixelRatio || 1)); ctx.setLineDash([]); ctx.stroke(); ctx.restore();
    }
    if (r.mode === 'sticker' && state.selectedId && state.view !== 'cutline') drawSelection(t);
    ctx.save(); ctx.strokeStyle = 'rgba(60,58,54,.25)'; ctx.lineWidth = 1; ctx.strokeRect(t.x + .5, t.y + .5, t.boardW - 1, t.boardH - 1); ctx.restore();
    els.zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
  }

  function drawSelection(t) {
    const s = state.stickers.find(v => v.id === state.selectedId); if (!s || !state.result) return;
    const ppm = state.result.ppm, w = s.widthMm * ppm * t.scale, h = w * s.naturalHeight / s.naturalWidth;
    const cx = t.x + s.xMm * ppm * t.scale, cy = t.y + s.yMm * ppm * t.scale;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(s.rotation * Math.PI / 180); ctx.strokeStyle = '#2f6fed'; ctx.lineWidth = 2 * (window.devicePixelRatio || 1); ctx.setLineDash([7, 5]); ctx.strokeRect(-w/2, -h/2, w, h); ctx.setLineDash([]);
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2f6fed'; ctx.lineWidth = 2; for (const [x,y] of [[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]) { ctx.beginPath(); ctx.arc(x,y,5*(window.devicePixelRatio||1),0,Math.PI*2); ctx.fill(); ctx.stroke(); }
    ctx.restore();
  }

  function boardPointFromEvent(ev) {
    if (!state.result) return null;
    const rect = els.canvas.getBoundingClientRect(); const sx = els.canvas.width / rect.width, sy = els.canvas.height / rect.height;
    const px = (ev.clientX - rect.left) * sx, py = (ev.clientY - rect.top) * sy;
    const t = getViewTransform();
    return { xPx: (px - t.x) / t.scale, yPx: (py - t.y) / t.scale, xMm: (px - t.x) / t.scale / state.result.ppm, yMm: (py - t.y) / t.scale / state.result.ppm };
  }

  function hitSticker(point) {
    for (let i = state.stickers.length - 1; i >= 0; i--) {
      const s = state.stickers[i]; const dx = point.xMm - s.xMm, dy = point.yMm - s.yMm; const a = -s.rotation * Math.PI / 180;
      const lx = dx * Math.cos(a) - dy * Math.sin(a), ly = dx * Math.sin(a) + dy * Math.cos(a);
      const h = s.widthMm * s.naturalHeight / s.naturalWidth;
      if (Math.abs(lx) <= s.widthMm / 2 && Math.abs(ly) <= h / 2) return s;
    }
    return null;
  }

  function selectSticker(id) {
    state.selectedId = id; const s = state.stickers.find(v => v.id === id);
    els.selectionEditor.classList.toggle('empty', !s);
    if (s) { els.selWidth.value = s.widthMm.toFixed(1); els.selRotation.value = s.rotation.toFixed(0); els.selX.value = s.xMm.toFixed(1); els.selY.value = s.yMm.toFixed(1); }
    drawPreview();
  }

  function updateSelectedFromFields() {
    const s = state.stickers.find(v => v.id === state.selectedId); if (!s) return;
    s.widthMm = clamp(num(els.selWidth, s.widthMm), 2, 500); s.rotation = num(els.selRotation, s.rotation); s.xMm = num(els.selX, s.xMm); s.yMm = num(els.selY, s.yMm);
    drawPreview(); scheduleStickerGenerate();
  }

  let acrylicTimer = null, stickerTimer = null;
  function scheduleAcrylicGenerate() { clearTimeout(acrylicTimer); acrylicTimer = setTimeout(generateAcrylic, 260); }
  function scheduleStickerGenerate() { clearTimeout(stickerTimer); stickerTimer = setTimeout(generateSticker, 320); }

  async function addStickerFiles(files) {
    const widthMm = clamp(num(els.artboardWidth, 210), 20, 1000), heightMm = clamp(num(els.artboardHeight, 297), 20, 1000);
    for (let i = 0; i < files.length; i++) {
      const rec = await fileToImageRecord(files[i]);
      const width = Math.min(50, widthMm * .28);
      const col = state.stickers.length % 4, row = Math.floor(state.stickers.length / 4) % 5;
      state.stickers.push({ ...rec, id: uid(), widthMm: width, rotation: 0, xMm: clamp(width/2 + 10 + col*(width+8), width/2, widthMm-width/2), yMm: clamp(width/2 + 10 + row*(width+8), width/2, heightMm-width/2) });
    }
    els.stickerCount.textContent = `${state.stickers.length}개`;
    if (state.stickers.length) selectSticker(state.stickers[state.stickers.length - 1].id);
    await generateSticker();
  }

  function pathToSvgD(path) {
    if (!path.length) return '';
    return `M ${path.map((p, i) => `${i ? 'L ' : ''}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')} Z`;
  }

  function exportSvg() {
    const r = state.result; if (!r) return alert('먼저 칼선과 재단여백을 만들어 주세요.');
    const originalUrl = r.original.toDataURL('image/png');
    const bleedUrl = r.fullPrint.toDataURL('image/png');
    const paths = r.cutPaths.map(p => `<path d="${pathToSvgD(p)}" fill="none" stroke="#ff00b8" stroke-width="1" vector-effect="non-scaling-stroke"/>`).join('\n');
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${r.widthMm.toFixed(4)}mm" height="${r.heightMm.toFixed(4)}mm" viewBox="0 0 ${r.widthPx} ${r.heightPx}">\n  <title>라미아크릴 제작 데이터</title>\n  <metadata>칼선은 CUTLINE, 재단여백 포함 인쇄층은 PRINT_WITH_BLEED, 원본은 ORIGINAL_ARTWORK 그룹입니다.</metadata>\n  <g id="ORIGINAL_ARTWORK" data-layer="original" style="display:none"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" xlink:href="${originalUrl}"/></g>\n  <g id="PRINT_WITH_BLEED" data-layer="print"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" xlink:href="${bleedUrl}"/></g>\n  <g id="CUTLINE" data-layer="cutline">${paths}</g>\n</svg>`;
    downloadBlob(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `lamia-${r.mode}-cutline.svg`);
  }

  function asciiBytes(str) { const out = new Uint8Array(str.length); for (let i=0;i<str.length;i++) out[i] = str.charCodeAt(i) & 255; return out; }
  function concatBytes(parts) { const len = parts.reduce((s,p)=>s+p.length,0); const out = new Uint8Array(len); let o=0; for(const p of parts){out.set(p,o);o+=p.length;} return out; }

  function makePdfAi(r) {
    const imageData = r.fullPrint.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, r.widthPx, r.heightPx).data;
    const n = r.widthPx * r.heightPx; const rgb = new Uint8Array(n * 3), alpha = new Uint8Array(n);
    for (let i=0;i<n;i++) { rgb[i*3]=imageData[i*4]; rgb[i*3+1]=imageData[i*4+1]; rgb[i*3+2]=imageData[i*4+2]; alpha[i]=imageData[i*4+3]; }
    const pageW = r.widthMm * 72 / 25.4, pageH = r.heightMm * 72 / 25.4;
    const sx = pageW / r.widthPx, sy = pageH / r.heightPx;
    let content = `q\n${pageW.toFixed(5)} 0 0 ${pageH.toFixed(5)} 0 0 cm\n/Im0 Do\nQ\n1 0 0.72 RG\n0.25 w\n`;
    for (const p of r.cutPaths) {
      if (!p.length) continue;
      content += `${(p[0].x*sx).toFixed(4)} ${(pageH-p[0].y*sy).toFixed(4)} m\n`;
      for (let i=1;i<p.length;i++) content += `${(p[i].x*sx).toFixed(4)} ${(pageH-p[i].y*sy).toFixed(4)} l\n`;
      content += 'h S\n';
    }
    const contentBytes = asciiBytes(content);
    const objects = [];
    objects[1] = asciiBytes('<< /Type /Catalog /Pages 2 0 R >>');
    objects[2] = asciiBytes('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    objects[3] = asciiBytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW.toFixed(5)} ${pageH.toFixed(5)}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`);
    objects[4] = concatBytes([asciiBytes(`<< /Length ${contentBytes.length} >>\nstream\n`), contentBytes, asciiBytes('\nendstream')]);
    objects[5] = concatBytes([asciiBytes(`<< /Type /XObject /Subtype /Image /Width ${r.widthPx} /Height ${r.heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /SMask 6 0 R /Length ${rgb.length} >>\nstream\n`), rgb, asciiBytes('\nendstream')]);
    objects[6] = concatBytes([asciiBytes(`<< /Type /XObject /Subtype /Image /Width ${r.widthPx} /Height ${r.heightPx} /ColorSpace /DeviceGray /BitsPerComponent 8 /Length ${alpha.length} >>\nstream\n`), alpha, asciiBytes('\nendstream')]);
    const chunks = [asciiBytes('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n')]; const offsets = [0]; let pos = chunks[0].length;
    for (let i=1;i<=6;i++) { offsets[i]=pos; const head=asciiBytes(`${i} 0 obj\n`), tail=asciiBytes('\nendobj\n'); chunks.push(head,objects[i],tail); pos += head.length+objects[i].length+tail.length; }
    const xrefPos = pos; let xref = `xref\n0 7\n0000000000 65535 f \n`;
    for(let i=1;i<=6;i++) xref += `${String(offsets[i]).padStart(10,'0')} 00000 n \n`;
    xref += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
    chunks.push(asciiBytes(xref)); return concatBytes(chunks);
  }

  function exportAi() {
    const r = state.result; if (!r) return alert('먼저 칼선과 재단여백을 만들어 주세요.');
    const bytes = makePdfAi(r);
    downloadBlob(new Blob([bytes], { type: 'application/pdf' }), `lamia-${r.mode}-cutline.ai`);
  }

  function resetAll() {
    if (state.mode === 'acrylic') {
      els.productWidth.value = 70; els.productHeight.value = 70; els.bleedMm.value = 2; els.alphaThreshold.value = 24; els.includeHoles.checked = false; els.addFlatBase.checked = true; loadSample();
    } else {
      state.stickers = []; state.selectedId = null; els.stickerCount.textContent = '0개'; els.artboardWidth.value = 210; els.artboardHeight.value = 297; els.stickerBorder.value = 2; els.stickerBleed.value = 1; selectSticker(null); generateSticker();
    }
  }

  // Events
  els.acrylicModeBtn.addEventListener('click', () => setMode('acrylic'));
  els.stickerModeBtn.addEventListener('click', () => setMode('sticker'));
  els.singleFileInput.addEventListener('change', async e => {
    const file = e.target.files?.[0]; if (!file) return;
    state.source = await fileToImageRecord(file); els.imageStatus.textContent = file.name; await generateAcrylic();
  });
  els.multiFileInput.addEventListener('change', async e => { const files = [...(e.target.files || [])]; if (files.length) await addStickerFiles(files); e.target.value=''; });
  els.generateBtn.addEventListener('click', generateAcrylic); els.generateStickerBtn.addEventListener('click', generateSticker);
  [els.productWidth, els.productHeight, els.bleedMm, els.alphaThreshold].forEach(el => el.addEventListener('input', scheduleAcrylicGenerate));
  [els.includeHoles, els.addFlatBase].forEach(el => el.addEventListener('change', generateAcrylic));
  [els.artboardWidth, els.artboardHeight, els.stickerBorder, els.stickerBleed].forEach(el => el.addEventListener('input', scheduleStickerGenerate));
  [els.selWidth, els.selRotation, els.selX, els.selY].forEach(el => el.addEventListener('input', updateSelectedFromFields));
  els.bringFrontBtn.addEventListener('click', () => { const i=state.stickers.findIndex(v=>v.id===state.selectedId); if(i>=0){const [s]=state.stickers.splice(i,1);state.stickers.push(s);drawPreview();scheduleStickerGenerate();} });
  els.deleteStickerBtn.addEventListener('click', () => { state.stickers=state.stickers.filter(v=>v.id!==state.selectedId); els.stickerCount.textContent=`${state.stickers.length}개`; selectSticker(null); generateSticker(); });
  els.exportSvgBtn.addEventListener('click', exportSvg); els.exportAiBtn.addEventListener('click', exportAi); els.resetBtn.addEventListener('click', resetAll);
  document.querySelectorAll('.view-tab').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.view-tab').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); state.view=btn.dataset.view; drawPreview(); }));
  els.zoomInBtn.addEventListener('click', () => { state.zoom=clamp(state.zoom*1.2,.2,5);drawPreview(); });
  els.zoomOutBtn.addEventListener('click', () => { state.zoom=clamp(state.zoom/1.2,.2,5);drawPreview(); });
  els.fitBtn.addEventListener('click', () => { state.zoom=1;drawPreview(); });

  els.canvas.addEventListener('pointerdown', ev => {
    if (state.mode !== 'sticker' || !state.result) return;
    const p=boardPointFromEvent(ev); if(!p)return; const s=hitSticker(p); selectSticker(s?.id || null);
    if(s){ state.dragging={id:s.id,dx:p.xMm-s.xMm,dy:p.yMm-s.yMm}; els.canvas.setPointerCapture(ev.pointerId); }
  });
  els.canvas.addEventListener('pointermove', ev => {
    if(!state.dragging || state.mode!=='sticker')return; const p=boardPointFromEvent(ev); const s=state.stickers.find(v=>v.id===state.dragging.id); if(!p||!s)return;
    s.xMm=p.xMm-state.dragging.dx; s.yMm=p.yMm-state.dragging.dy; els.selX.value=s.xMm.toFixed(1); els.selY.value=s.yMm.toFixed(1); drawPreview();
  });
  const endDrag=()=>{if(state.dragging){state.dragging=null;scheduleStickerGenerate();}};
  els.canvas.addEventListener('pointerup',endDrag); els.canvas.addEventListener('pointercancel',endDrag);

  for (const dz of document.querySelectorAll('.dropzone')) {
    dz.addEventListener('dragover', e=>{e.preventDefault();dz.classList.add('dragover');});
    dz.addEventListener('dragleave', ()=>dz.classList.remove('dragover'));
    dz.addEventListener('drop', async e=>{e.preventDefault();dz.classList.remove('dragover');const files=[...e.dataTransfer.files].filter(f=>f.type.startsWith('image/'));if(!files.length)return;if(dz.htmlFor==='singleFileInput'){state.source=await fileToImageRecord(files[0]);els.imageStatus.textContent=files[0].name;await generateAcrylic();}else await addStickerFiles(files);});
  }

  window.addEventListener('resize', resizePreviewCanvas);
  new ResizeObserver(resizePreviewCanvas).observe(els.stage);
  resizePreviewCanvas();
  loadSample();
})();
