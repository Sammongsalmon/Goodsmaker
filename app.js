(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const els = {
    canvas: $('previewCanvas'), stage: $('stageWrap'), busy: $('busyOverlay'),
    acrylicModeBtn: $('acrylicModeBtn'), stickerModeBtn: $('stickerModeBtn'),
    acrylicControls: $('acrylicControls'), stickerControls: $('stickerControls'),
    singleFileInput: $('singleFileInput'), multiFileInput: $('multiFileInput'),
    imageStatus: $('imageStatus'), stickerCount: $('stickerCount'), qualityNotice: $('qualityNotice'),
    productWidth: $('productWidth'), productHeight: $('productHeight'), bleedMm: $('bleedMm'),
    acrylicBorderMm: $('acrylicBorderMm'), alphaThreshold: $('alphaThreshold'), alphaThresholdBordered: $('alphaThresholdBordered'),
    colorSampleRadius: $('colorSampleRadius'), colorSampleField: $('colorSampleField'),
    includeHoles: $('includeHoles'), addFlatBase: $('addFlatBase'), flatBaseOptions: $('flatBaseOptions'),
    baseGapTransparentBtn: $('baseGapTransparentBtn'), baseGapFillBtn: $('baseGapFillBtn'), baseGapHelp: $('baseGapHelp'), generateBtn: $('generateBtn'),
    acrylicBorderlessBtn: $('acrylicBorderlessBtn'), acrylicBorderedBtn: $('acrylicBorderedBtn'),
    acrylicBorderlessFields: $('acrylicBorderlessFields'), acrylicBorderedFields: $('acrylicBorderedFields'), acrylicStyleHelp: $('acrylicStyleHelp'),
    artboardWidth: $('artboardWidth'), artboardHeight: $('artboardHeight'), stickerBorder: $('stickerBorder'), stickerBleed: $('stickerBleed'),
    stickerAlphaThreshold: $('stickerAlphaThreshold'), stickerAlphaThresholdBordered: $('stickerAlphaThresholdBordered'), stickerIncludeHoles: $('stickerIncludeHoles'),
    stickerBorderlessBtn: $('stickerBorderlessBtn'), stickerBorderedBtn: $('stickerBorderedBtn'),
    stickerBorderlessFields: $('stickerBorderlessFields'), stickerBorderedFields: $('stickerBorderedFields'), stickerStyleHelp: $('stickerStyleHelp'),
    stickerBorderFillOptions: $('stickerBorderFillOptions'), stickerBorderFillTransparentBtn: $('stickerBorderFillTransparentBtn'),
    stickerBorderFillWhiteBtn: $('stickerBorderFillWhiteBtn'), stickerBorderFillHelp: $('stickerBorderFillHelp'),
    stickerWhiteBleedField: $('stickerWhiteBleedField'), stickerWhiteBleed: $('stickerWhiteBleed'),
    stickerBackgroundEnabled: $('stickerBackgroundEnabled'), stickerBackgroundOptions: $('stickerBackgroundOptions'),
    stickerBackgroundColorBtn: $('stickerBackgroundColorBtn'), stickerBackgroundImageBtn: $('stickerBackgroundImageBtn'),
    stickerBackgroundColorField: $('stickerBackgroundColorField'), stickerBackgroundImageFields: $('stickerBackgroundImageFields'),
    stickerBackgroundColor: $('stickerBackgroundColor'), stickerBackgroundFile: $('stickerBackgroundFile'),
    stickerBackgroundStatus: $('stickerBackgroundStatus'), stickerBackgroundFit: $('stickerBackgroundFit'),
    generateStickerBtn: $('generateStickerBtn'), selectionEditor: $('selectionEditor'), selWidth: $('selWidth'), selRotation: $('selRotation'), selX: $('selX'), selY: $('selY'),
    bringFrontBtn: $('bringFrontBtn'), deleteStickerBtn: $('deleteStickerBtn'),
    exportSvgBtn: $('exportSvgBtn'), exportAiBtn: $('exportAiBtn'), resetBtn: $('resetBtn'),
    exportBackground: $('exportBackground'), exportBackgroundRow: $('exportBackgroundRow'),
    exportArtwork: $('exportArtwork'), exportWhite: $('exportWhite'), exportBleed: $('exportBleed'), exportCutline: $('exportCutline'), exportBleedRow: $('exportBleedRow'),
    zoomOutBtn: $('zoomOutBtn'), zoomInBtn: $('zoomInBtn'), fitBtn: $('fitBtn'), zoomLabel: $('zoomLabel'), geometryMeta: $('geometryMeta'),
    processingQuality: $('processingQuality'), previewBackground: $('previewBackground'), customBackground: $('customBackground'), customBackgroundField: $('customBackgroundField'),
    cutSimplify: $('cutSimplify'), cutSimplifyValue: $('cutSimplifyValue'), cutSmooth: $('cutSmooth'), cutSmoothValue: $('cutSmoothValue'),
    bleedViewTab: $('bleedViewTab'), bleedLegend: $('bleedLegend'), backgroundViewTab: $('backgroundViewTab'), backgroundLegend: $('backgroundLegend')
  };

  const ctx = els.canvas.getContext('2d');
  const state = {
    mode: 'acrylic',
    finishStyle: { acrylic: 'borderless', sticker: 'borderless' },
    baseGapMode: 'transparent',
    stickerBorderFill: 'transparent',
    stickerBackgroundType: 'color',
    stickerBackgroundImage: null,
    source: null,
    stickers: [],
    selectedId: null,
    view: 'composite',
    zoom: 1,
    result: null,
    dragging: null,
    generationToken: 0,
    previewBackground: 'checker'
  };

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function num(el, fallback = 0) { const v = Number(el?.value); return Number.isFinite(v) ? v : fallback; }
  function uid() { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`; }
  function nextFrame() { return new Promise(resolve => requestAnimationFrame(() => resolve())); }
  function makeCanvas(w, h) { const c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
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
    return { img, dataUrl, name: file.name || 'image', naturalWidth: img.naturalWidth || img.width, naturalHeight: img.naturalHeight || img.height, trimCache: Object.create(null) };
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
    updateFinishStyleUi();
    if (mode === 'acrylic') generateAcrylic(); else generateSticker();
  }

  function setBusy(on) { els.busy.classList.toggle('hidden', !on); }
  function setNotice(kind, title, detail) {
    els.qualityNotice.className = `notice ${kind}`;
    els.qualityNotice.innerHTML = `<strong>${escapeXml(title)}</strong><span>${escapeXml(detail)}</span>`;
  }

  function getProcessingMaxDimension() {
    const quality = els.processingQuality?.value || 'fast';
    if (quality === 'precise') return 1200;
    if (quality === 'balanced') return 820;
    return 520;
  }

  function getCachedTrimBounds(record, threshold) {
    if (!record.trimCache) record.trimCache = Object.create(null);
    const key = String(Math.round(threshold));
    if (!record.trimCache[key]) record.trimCache[key] = getTrimBounds(record, threshold);
    return record.trimCache[key];
  }

  function applyPreviewBackground() {
    const value = els.previewBackground?.value || 'checker';
    state.previewBackground = value;
    els.stage.classList.remove('bg-checker', 'bg-white', 'bg-gray', 'bg-black', 'bg-custom');
    els.stage.classList.add(`bg-${value}`);
    const custom = els.customBackground?.value || '#8a8a8a';
    els.stage.style.setProperty('--preview-bg', custom);
    els.customBackgroundField?.classList.toggle('hidden', value !== 'custom');
  }

  function currentFinishStyle(mode = state.mode) { return state.finishStyle[mode] || 'borderless'; }

  function setFinishStyle(mode, style) {
    state.finishStyle[mode] = style;
    updateFinishStyleUi();
    if (mode === 'acrylic') generateAcrylic(); else generateSticker();
  }

  function setBaseGapMode(mode) {
    state.baseGapMode = mode;
    updateFlatBaseUi();
    generateAcrylic();
  }

  function setStickerBorderFill(mode) {
    state.stickerBorderFill = mode;
    updateStickerBorderFillUi();
    generateSticker();
  }

  function setStickerBackgroundType(type) {
    state.stickerBackgroundType = type;
    updateStickerBackgroundUi();
    generateSticker();
  }

  function selectView(view) {
    state.view = view;
    document.querySelectorAll('.view-tab').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  }

  function updateFlatBaseUi() {
    const enabled = !!els.addFlatBase.checked;
    els.flatBaseOptions.classList.toggle('hidden', !enabled);
    const transparent = state.baseGapMode === 'transparent';
    els.baseGapTransparentBtn.classList.toggle('active', transparent);
    els.baseGapFillBtn.classList.toggle('active', !transparent);
    els.baseGapHelp.textContent = transparent
      ? '새로 생긴 바닥 안쪽은 투명하게 두고, 해당 구간 바깥에도 색상 재단여백을 만들지 않습니다.'
      : '새로 생긴 바닥 안쪽과 바깥 재단여백까지 주변 도안 색상으로 이어서 채웁니다.';
  }

  function updateStickerBorderFillUi() {
    const bordered = state.finishStyle.sticker === 'bordered';
    const white = state.stickerBorderFill === 'white';
    els.stickerBorderFillOptions.classList.toggle('hidden', !bordered);
    els.stickerBorderFillTransparentBtn.classList.toggle('active', !white);
    els.stickerBorderFillWhiteBtn.classList.toggle('active', white);
    els.stickerWhiteBleedField.classList.toggle('hidden', !bordered || !white);
    els.stickerBorderFillHelp.textContent = white
      ? '그림과 칼선 사이를 화이트로 채우고, 입력한 만큼 칼선 밖에도 화이트 재단여백을 냅니다.'
      : '그림과 칼선 사이를 투명하게 유지합니다.';
  }

  function updateStickerBackgroundUi() {
    const enabled = state.mode === 'sticker' && !!els.stickerBackgroundEnabled.checked;
    const isImage = state.stickerBackgroundType === 'image';
    els.stickerBackgroundOptions.classList.toggle('hidden', !els.stickerBackgroundEnabled.checked);
    els.stickerBackgroundColorBtn.classList.toggle('active', !isImage);
    els.stickerBackgroundImageBtn.classList.toggle('active', isImage);
    els.stickerBackgroundColorField.classList.toggle('hidden', isImage);
    els.stickerBackgroundImageFields.classList.toggle('hidden', !isImage);
    els.backgroundViewTab.classList.toggle('hidden', !enabled);
    els.backgroundLegend.classList.toggle('hidden', !enabled);
    els.exportBackgroundRow.classList.toggle('hidden', !enabled);
    els.exportBackground.disabled = !enabled;
    if (!enabled && state.view === 'background') selectView('composite');
  }

  function updateFinishStyleUi() {
    const acrylicBorderless = state.finishStyle.acrylic === 'borderless';
    els.acrylicBorderlessBtn.classList.toggle('active', acrylicBorderless);
    els.acrylicBorderedBtn.classList.toggle('active', !acrylicBorderless);
    els.acrylicBorderlessFields.classList.toggle('hidden', !acrylicBorderless);
    els.acrylicBorderedFields.classList.toggle('hidden', acrylicBorderless);
    els.colorSampleField.classList.toggle('hidden', !acrylicBorderless);
    els.acrylicStyleHelp.textContent = acrylicBorderless
      ? '칼선은 그림 외곽을 따르고, 밖으로 인접 색을 확장해 재단여백을 만듭니다.'
      : '입력한 투명 테두리만큼 그림 밖으로 칼선을 이동하며, 그 사이에는 인쇄색을 만들지 않습니다.';

    const stickerBorderless = state.finishStyle.sticker === 'borderless';
    els.stickerBorderlessBtn.classList.toggle('active', stickerBorderless);
    els.stickerBorderedBtn.classList.toggle('active', !stickerBorderless);
    els.stickerBorderlessFields.classList.toggle('hidden', !stickerBorderless);
    els.stickerBorderedFields.classList.toggle('hidden', stickerBorderless);
    els.stickerStyleHelp.textContent = stickerBorderless
      ? '배치된 각 그림 외곽에 칼선을 만들고 인접 색으로 재단여백을 확장합니다.'
      : '각 그림 밖으로 입력한 테두리 폭을 확보한 뒤 그 외곽에 칼선을 만듭니다.';

    updateFlatBaseUi();
    updateStickerBorderFillUi();
    updateStickerBackgroundUi();

    const showBleed = currentFinishStyle() === 'borderless';
    els.bleedViewTab.classList.toggle('hidden', !showBleed);
    els.bleedLegend.classList.toggle('hidden', !showBleed);
    els.exportBleedRow.classList.toggle('disabled', !showBleed);
    els.exportBleed.disabled = !showBleed;
    if (!showBleed && state.view === 'bleed') selectView('composite');
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
          const simplified = simplifyClosed(points, 0.35);
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


  function getBoundarySamplingConfig() {
    const quality = els.processingQuality?.value || 'fast';
    const radius = clamp(Math.round(num(els.colorSampleRadius, 12)), 3, 24);
    return {
      radius,
      frameRadius: quality === 'precise' ? 8 : quality === 'balanced' ? 7 : 6,
      tangentSpread: quality === 'precise' ? 7 : quality === 'balanced' ? 6 : 5,
      minAlpha: quality === 'precise' ? 104 : quality === 'balanced' ? 120 : 136,
      colorClusterDistance: quality === 'precise' ? 54 : quality === 'balanced' ? 50 : 46,
      maskPasses: quality === 'precise' ? 2 : 1,
      minComponent: quality === 'precise' ? 3 : quality === 'balanced' ? 4 : 5
    };
  }

  function colorDistanceSq(r1, g1, b1, r2, g2, b2) {
    const dr = r1 - r2, dg = g1 - g2, db = b1 - b2;
    return dr * dr + dg * dg + db * db;
  }

  function dominantColor(samples, threshold, fallback = [0, 0, 0]) {
    if (!samples.length) return fallback;
    const thresholdSq = threshold * threshold;
    const clusters = [];
    const ordered = samples.slice().sort((a, b) => b.weight - a.weight);
    for (const s of ordered) {
      let best = null, bestD = Infinity;
      for (const c of clusters) {
        const d = colorDistanceSq(s.r, s.g, s.b, c.r / c.weight, c.g / c.weight, c.b / c.weight);
        if (d <= thresholdSq && d < bestD) { best = c; bestD = d; }
      }
      if (!best) { best = { r: 0, g: 0, b: 0, weight: 0, count: 0 }; clusters.push(best); }
      best.r += s.r * s.weight; best.g += s.g * s.weight; best.b += s.b * s.weight; best.weight += s.weight; best.count++;
    }
    clusters.sort((a, b) => (b.weight * Math.sqrt(b.count)) - (a.weight * Math.sqrt(a.count)));
    const c = clusters[0];
    return [Math.round(c.r / c.weight), Math.round(c.g / c.weight), Math.round(c.b / c.weight)];
  }

  function removeSmallComponents(mask, w, h, minSize) {
    if (minSize <= 1) return mask;
    const n = w * h, seen = new Uint8Array(n), queue = new Int32Array(n), out = new Uint8Array(mask);
    const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]];
    for (let start = 0; start < n; start++) {
      if (!mask[start] || seen[start]) continue;
      let head = 0, tail = 0; queue[tail++] = start; seen[start] = 1;
      while (head < tail) {
        const i = queue[head++], x = i % w, y = (i / w) | 0;
        for (const [dx,dy] of dirs) {
          const nx=x+dx, ny=y+dy; if(nx<0||ny<0||nx>=w||ny>=h) continue;
          const ni=ny*w+nx; if(mask[ni]&&!seen[ni]){seen[ni]=1;queue[tail++]=ni;}
        }
      }
      if (tail < minSize) for (let j=0;j<tail;j++) out[queue[j]]=0;
    }
    return out;
  }

  function stabilizeAlphaMask(imageData, threshold, config) {
    const { width: w, height: h, data } = imageData;
    const n = w * h;
    const weak = clamp(Math.round(threshold), 1, 254);
    const solid = clamp(Math.max(96, weak * 3), 96, 232);
    let mask = new Uint8Array(n);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x, a = data[i * 4 + 3];
        if (a >= solid) { mask[i] = 1; continue; }
        if (a < weak) continue;
        let support = 0, strongSupport = 0;
        for (let yy = Math.max(0, y - 1); yy <= Math.min(h - 1, y + 1); yy++) {
          for (let xx = Math.max(0, x - 1); xx <= Math.min(w - 1, x + 1); xx++) {
            if (xx === x && yy === y) continue;
            const na = data[(yy * w + xx) * 4 + 3];
            if (na >= weak) support++;
            if (na >= solid) strongSupport++;
          }
        }
        mask[i] = strongSupport >= 1 || support >= 3 ? 1 : 0;
      }
    }
    for (let pass = 0; pass < config.maskPasses; pass++) {
      const next = new Uint8Array(mask);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          let count = 0;
          for (let yy=y-1;yy<=y+1;yy++) for(let xx=x-1;xx<=x+1;xx++) count += mask[yy*w+xx];
          const a = data[i*4+3];
          if (mask[i] && count <= 2 && a < solid) next[i] = 0;
          else if (!mask[i] && count >= 7 && a >= Math.max(8, weak * .45)) next[i] = 1;
        }
      }
      mask = next;
    }
    return removeSmallComponents(mask, w, h, config.minComponent);
  }

  function makeBoundaryMask(mask, w, h) {
    const boundary = new Uint8Array(w * h);
    for (let y=0;y<h;y++) for(let x=0;x<w;x++) {
      const i=y*w+x; if(!mask[i]) continue;
      if(x===0||y===0||x===w-1||y===h-1||!mask[i-1]||!mask[i+1]||!mask[i-w]||!mask[i+w]) boundary[i]=1;
    }
    return boundary;
  }

  function estimateBoundaryFrame(objectMask, boundaryMask, w, h, x, y, radius) {
    let sw=0,mx=0,my=0;
    for(let yy=Math.max(0,y-radius);yy<=Math.min(h-1,y+radius);yy++) for(let xx=Math.max(0,x-radius);xx<=Math.min(w-1,x+radius);xx++){
      const dx=xx-x,dy=yy-y,d2=dx*dx+dy*dy; if(d2>radius*radius||!boundaryMask[yy*w+xx]) continue;
      const wt=1/(1+d2*.18);sw+=wt;mx+=dx*wt;my+=dy*wt;
    }
    if(sw<2) return {nx:0,ny:1,tx:1,ty:0};
    mx/=sw;my/=sw;let cxx=0,cxy=0,cyy=0;
    for(let yy=Math.max(0,y-radius);yy<=Math.min(h-1,y+radius);yy++) for(let xx=Math.max(0,x-radius);xx<=Math.min(w-1,x+radius);xx++){
      const dx0=xx-x,dy0=yy-y,d2=dx0*dx0+dy0*dy0; if(d2>radius*radius||!boundaryMask[yy*w+xx]) continue;
      const wt=1/(1+d2*.18),dx=dx0-mx,dy=dy0-my;cxx+=dx*dx*wt;cxy+=dx*dy*wt;cyy+=dy*dy*wt;
    }
    const theta=.5*Math.atan2(2*cxy,cxx-cyy);let tx=Math.cos(theta),ty=Math.sin(theta),nx=-ty,ny=tx;
    let plus=0,minus=0;
    for(let depth=1;depth<=radius;depth++) for(let lateral=-2;lateral<=2;lateral++){
      const wt=1/(1+depth*.2+Math.abs(lateral)*.35);
      let xx=Math.round(x+nx*depth+tx*lateral),yy=Math.round(y+ny*depth+ty*lateral);
      if(xx>=0&&yy>=0&&xx<w&&yy<h&&objectMask[yy*w+xx]) plus+=wt;
      xx=Math.round(x-nx*depth+tx*lateral);yy=Math.round(y-ny*depth+ty*lateral);
      if(xx>=0&&yy>=0&&xx<w&&yy<h&&objectMask[yy*w+xx]) minus+=wt;
    }
    if(minus>plus){nx=-nx;ny=-ny;}
    return {nx,ny,tx,ty};
  }

  function buildBoundaryModel(originalData, objectMask, boundaryMask, w, h, x, y, config, frame) {
    const data=originalData.data, samples=[], near=[];
    const spread=config.tangentSpread;
    for(let lateral=-spread;lateral<=spread;lateral++){
      let first=-1, ref=null;
      for(let depth=0;depth<=config.radius;depth++){
        const sx=Math.round(x+frame.nx*depth+frame.tx*lateral),sy=Math.round(y+frame.ny*depth+frame.ty*lateral);
        if(sx<0||sy<0||sx>=w||sy>=h) continue;
        const i=sy*w+sx,a=data[i*4+3];
        if(objectMask[i]&&a>=config.minAlpha){first=depth;ref=[data[i*4],data[i*4+1],data[i*4+2]];break;}
      }
      if(first<0) continue;
      for(let depth=first;depth<=Math.min(config.radius,first+5);depth++){
        const sx=Math.round(x+frame.nx*depth+frame.tx*lateral),sy=Math.round(y+frame.ny*depth+frame.ty*lateral);
        if(sx<0||sy<0||sx>=w||sy>=h) continue;
        const i=sy*w+sx,a=data[i*4+3]; if(!objectMask[i]||a<config.minAlpha) continue;
        const r=data[i*4],g=data[i*4+1],b=data[i*4+2];
        if(colorDistanceSq(r,g,b,ref[0],ref[1],ref[2])>Math.pow(config.colorClusterDistance*1.35,2)) break;
        const centerBoost=lateral===0?3:Math.abs(lateral)===1?1.6:1;const weight=centerBoost*Math.pow(a/255,2)/(1+first*.7+(depth-first)*.45+Math.abs(lateral)*.38);
        const s={r,g,b,u:lateral,v:depth,weight};samples.push(s);near.push(s);
      }
    }
    for(let v=1;v<=config.radius;v++){
      const localSpread=Math.min(config.tangentSpread+2,2+Math.floor(v*.55));
      for(let u=-localSpread;u<=localSpread;u++){
        const sx=Math.round(x+frame.nx*v+frame.tx*u),sy=Math.round(y+frame.ny*v+frame.ty*u);
        if(sx<0||sy<0||sx>=w||sy>=h) continue;
        const i=sy*w+sx,a=data[i*4+3]; if(!objectMask[i]||a<config.minAlpha) continue;
        samples.push({r:data[i*4],g:data[i*4+1],b:data[i*4+2],u,v,weight:Math.pow(a/255,2)/(1+v*.5+Math.abs(u)*.22)});
      }
    }
    const self=(y*w+x)*4;
    const anchor=dominantColor(near,config.colorClusterDistance*.75,[data[self],data[self+1],data[self+2]]);
    if(samples.length<4) return {c1:anchor,c2:null,u1:0,v1:1,u2:0,v2:1,w1:1,w2:0};
    let far=null,farScore=0;
    for(const s of samples){const d=colorDistanceSq(s.r,s.g,s.b,anchor[0],anchor[1],anchor[2]);const score=d*Math.sqrt(s.weight);if(score>farScore){farScore=score;far=s;}}
    if(!far||farScore<Math.pow(config.colorClusterDistance*1.1,2)*.15) return {c1:anchor,c2:null,u1:0,v1:1,u2:0,v2:1,w1:1,w2:0};
    let c1=anchor.slice(),c2=[far.r,far.g,far.b],stats=null;
    for(let iter=0;iter<5;iter++){
      const a={r:0,g:0,b:0,u:0,v:0,w:0},b={r:0,g:0,b:0,u:0,v:0,w:0};
      for(const s of samples){const d1=colorDistanceSq(s.r,s.g,s.b,c1[0],c1[1],c1[2]),d2=colorDistanceSq(s.r,s.g,s.b,c2[0],c2[1],c2[2]);const z=d1<=d2?a:b;z.r+=s.r*s.weight;z.g+=s.g*s.weight;z.b+=s.b*s.weight;z.u+=s.u*s.weight;z.v+=s.v*s.weight;z.w+=s.weight;}
      if(a.w){c1=[a.r/a.w,a.g/a.w,a.b/a.w];} if(b.w){c2=[b.r/b.w,b.g/b.w,b.b/b.w];} stats={a,b};
    }
    if(!stats||!stats.a.w||!stats.b.w) return {c1:anchor,c2:null,u1:0,v1:1,u2:0,v2:1,w1:1,w2:0};
    const total=stats.a.w+stats.b.w,sep=colorDistanceSq(c1[0],c1[1],c1[2],c2[0],c2[1],c2[2]);
    if(Math.min(stats.a.w,stats.b.w)/total<.11||sep<Math.pow(config.colorClusterDistance*.95,2)) return {c1:anchor,c2:null,u1:stats.a.u/stats.a.w,v1:stats.a.v/stats.a.w,u2:0,v2:1,w1:1,w2:0};
    const dAnchor1=colorDistanceSq(c1[0],c1[1],c1[2],anchor[0],anchor[1],anchor[2]);
    const dAnchor2=colorDistanceSq(c2[0],c2[1],c2[2],anchor[0],anchor[1],anchor[2]);
    if(dAnchor2<dAnchor1){[c1,c2]=[c2,c1];stats={a:stats.b,b:stats.a};}
    return {c1:c1.map(Math.round),c2:c2.map(Math.round),u1:stats.a.u/stats.a.w,v1:stats.a.v/stats.a.w,u2:stats.b.u/stats.b.w,v2:stats.b.v/stats.b.w,w1:stats.a.w/total,w2:stats.b.w/total};
  }

  function prepareBoundaryModels(originalData, objectMask, boundaryMask, w, h, config) {
    const n=w*h;
    const valid=new Uint8Array(n),has2=new Uint8Array(n),c1r=new Uint8Array(n),c1g=new Uint8Array(n),c1b=new Uint8Array(n),c2r=new Uint8Array(n),c2g=new Uint8Array(n),c2b=new Uint8Array(n);
    const nx=new Float32Array(n),ny=new Float32Array(n),tx=new Float32Array(n),ty=new Float32Array(n),u1=new Float32Array(n),v1=new Float32Array(n),u2=new Float32Array(n),v2=new Float32Array(n),w1=new Float32Array(n),w2=new Float32Array(n);
    for(let i=0;i<n;i++){
      if(!boundaryMask[i]) continue; const x=i%w,y=(i/w)|0,frame=estimateBoundaryFrame(objectMask,boundaryMask,w,h,x,y,config.frameRadius);
      const m=buildBoundaryModel(originalData,objectMask,boundaryMask,w,h,x,y,config,frame);
      valid[i]=1;nx[i]=frame.nx;ny[i]=frame.ny;tx[i]=frame.tx;ty[i]=frame.ty;c1r[i]=m.c1[0];c1g[i]=m.c1[1];c1b[i]=m.c1[2];u1[i]=m.u1;v1[i]=m.v1;w1[i]=m.w1;
      if(m.c2){has2[i]=1;c2r[i]=m.c2[0];c2g[i]=m.c2[1];c2b[i]=m.c2[2];u2[i]=m.u2;v2[i]=m.v2;w2[i]=m.w2;}
    }
    return {valid,has2,c1r,c1g,c1b,c2r,c2g,c2b,nx,ny,tx,ty,u1,v1,u2,v2,w1,w2};
  }

  function modelColorAt(models, seed, x, y, w) {
    if(!models.has2[seed]) return [models.c1r[seed],models.c1g[seed],models.c1b[seed]];
    const sx=seed%w,sy=(seed/w)|0,dx=x-sx,dy=y-sy;
    const u=dx*models.tx[seed]+dy*models.ty[seed],v=dx*models.nx[seed]+dy*models.ny[seed];
    const d1=(u-models.u1[seed])**2+.72*(v-models.v1[seed])**2-.35*Math.log(.001+models.w1[seed]);
    const d2=(u-models.u2[seed])**2+.72*(v-models.v2[seed])**2-.35*Math.log(.001+models.w2[seed]);
    return d1<=d2?[models.c1r[seed],models.c1g[seed],models.c1b[seed]]:[models.c2r[seed],models.c2g[seed],models.c2b[seed]];
  }

  class MinHeap {
    constructor(){this.items=[];this.costs=[];}
    push(item,cost){let i=this.items.length;this.items.push(item);this.costs.push(cost);while(i>0){const p=(i-1)>>1;if(this.costs[p]<=cost)break;this.items[i]=this.items[p];this.costs[i]=this.costs[p];i=p;}this.items[i]=item;this.costs[i]=cost;}
    pop(){if(!this.items.length)return null;const item=this.items[0],cost=this.costs[0],lastItem=this.items.pop(),lastCost=this.costs.pop();if(this.items.length){let i=0;while(true){let l=i*2+1,r=l+1;if(l>=this.items.length)break;let c=r<this.items.length&&this.costs[r]<this.costs[l]?r:l;if(this.costs[c]>=lastCost)break;this.items[i]=this.items[c];this.costs[i]=this.costs[c];i=c;}this.items[i]=lastItem;this.costs[i]=lastCost;}return {item,cost};}
    get length(){return this.items.length;}
  }

  function edt1d(f, n, d, v, z) {
    let k = 0;
    v[0] = 0;
    z[0] = -Infinity;
    z[1] = Infinity;
    for (let q = 1; q < n; q++) {
      let s;
      while (true) {
        const p = v[k];
        s = ((f[q] + q * q) - (f[p] + p * p)) / (2 * q - 2 * p);
        if (s > z[k] || k === 0) break;
        k--;
      }
      k++;
      v[k] = q;
      z[k] = s;
      z[k + 1] = Infinity;
    }
    k = 0;
    for (let q = 0; q < n; q++) {
      while (z[k + 1] < q) k++;
      const p = v[k], delta = q - p;
      d[q] = delta * delta + f[p];
    }
  }

  function distanceToMask(mask, w, h, targetValue) {
    const n = w * h, inf = 1e12;
    const temp = new Float32Array(n), out = new Float32Array(n);
    const maxLen = Math.max(w, h), f = new Float64Array(maxLen), d = new Float64Array(maxLen);
    const v = new Int32Array(maxLen), z = new Float64Array(maxLen + 1);
    let anyTarget = false;
    for (let y = 0; y < h; y++) {
      let rowHas = false;
      for (let x = 0; x < w; x++) {
        const hit = mask[y * w + x] === targetValue;
        f[x] = hit ? 0 : inf;
        rowHas ||= hit;
        anyTarget ||= hit;
      }
      if (rowHas) {
        edt1d(f, w, d, v, z);
        for (let x = 0; x < w; x++) temp[y * w + x] = d[x];
      } else {
        for (let x = 0; x < w; x++) temp[y * w + x] = inf;
      }
    }
    if (!anyTarget) { out.fill(inf); return out; }
    for (let x = 0; x < w; x++) {
      let colHas = false;
      for (let y = 0; y < h; y++) {
        f[y] = temp[y * w + x];
        if (f[y] < inf * .5) colHas = true;
      }
      if (colHas) {
        edt1d(f, h, d, v, z);
        for (let y = 0; y < h; y++) out[y * w + x] = d[y];
      } else {
        for (let y = 0; y < h; y++) out[y * w + x] = inf;
      }
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

  function subtractMask(mask, subtract) {
    const out = new Uint8Array(mask.length);
    for (let i = 0; i < out.length; i++) if (mask[i] && !subtract[i]) out[i] = 1;
    return out;
  }

  function differenceMask(a, b) {
    const out = new Uint8Array(a.length);
    for (let i = 0; i < out.length; i++) if (a[i] && !b[i]) out[i] = 1;
    return out;
  }

  function makeBleed(originalData, objectMask, outerMask, holeMask, w, h, bleedPx, includeHoles, baseNoBleed) {
    const n=w*h,expandedOuter=dilateMask(outerMask,w,h,bleedPx),expandedObject=dilateMask(objectMask,w,h,bleedPx),allowed=new Uint8Array(n);
    for(let i=0;i<n;i++){
      if(objectMask[i])continue;const inHole=holeMask[i]===1;
      const ok=inHole?(includeHoles&&expandedObject[i]):(outerMask[i]||expandedOuter[i]);
      if(ok&&!(baseNoBleed&&baseNoBleed[i]))allowed[i]=1;
    }
    const config=getBoundarySamplingConfig(),boundaryMask=makeBoundaryMask(objectMask,w,h),models=prepareBoundaryModels(originalData,objectMask,boundaryMask,w,h,config);
    const cost=new Float32Array(n),source=new Int32Array(n);cost.fill(Infinity);source.fill(-1);const heap=new MinHeap();
    const dirs=[[-1,0,1],[1,0,1],[0,-1,1],[0,1,1],[-1,-1,1.414],[1,-1,1.414],[-1,1,1.414],[1,1,1.414]];
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=y*w+x;if(!allowed[i])continue;
      for(const[dx,dy,step]of dirs){const sx=x+dx,sy=y+dy;if(sx<0||sy<0||sx>=w||sy>=h)continue;const seed=sy*w+sx;if(!models.valid[seed])continue;
        const mx=-dx/step,my=-dy/step,outx=-models.nx[seed],outy=-models.ny[seed],align=mx*outx+my*outy,lateral=Math.abs(mx*models.tx[seed]+my*models.ty[seed]);
        const c=step*(1+Math.max(0,.15-align)*1.7+lateral*.12);if(c<cost[i]){cost[i]=c;source[i]=seed;heap.push(i,c);}
      }
    }
    while(heap.length){const node=heap.pop(),i=node.item;if(node.cost>cost[i]+1e-4)continue;const x=i%w,y=(i/w)|0,seed=source[i];
      for(const[dx,dy,step]of dirs){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;const ni=ny*w+nx;if(!allowed[ni])continue;
        const ux=dx/step,uy=dy/step,outx=-models.nx[seed],outy=-models.ny[seed],align=ux*outx+uy*outy,lateral=Math.abs(ux*models.tx[seed]+uy*models.ty[seed]);
        const nc=node.cost+step*(1+Math.max(0,-.05-align)*1.2+lateral*.08);if(nc+1e-4<cost[ni]){cost[ni]=nc;source[ni]=seed;heap.push(ni,nc);}
      }
    }
    const out=new ImageData(w,h),od=out.data,src=originalData.data,printMask=new Uint8Array(n);
    for(let i=0;i<n;i++){const t=i*4,x=i%w,y=(i/w)|0;
      if(objectMask[i]){printMask[i]=1;if(models.valid[i]&&src[t+3]<248){const c=modelColorAt(models,i,x,y,w);od[t]=c[0];od[t+1]=c[1];od[t+2]=c[2];od[t+3]=255;}}
      else if(source[i]>=0){const c=modelColorAt(models,source[i],x,y,w);od[t]=c[0];od[t+1]=c[1];od[t+2]=c[2];od[t+3]=255;printMask[i]=1;}
    }
    return {imageData:out,printMask};
  }

  function buildBaseNoBleed(baseAddedMask, objectMask, w, h, bleedPx) {
    if (!baseAddedMask) return null;
    let hasGap = false;
    for (let i = 0; i < baseAddedMask.length; i++) if (baseAddedMask[i]) { hasGap = true; break; }
    if (!hasGap) return null;
    const expanded = dilateMask(baseAddedMask, w, h, Math.max(1, bleedPx + 1));
    const out = new Uint8Array(w * h);
    for (let i = 0; i < out.length; i++) if (expanded[i] && !objectMask[i]) out[i] = 1;
    return out;
  }

  function whiteCanvasFromMask(mask,w,h){const c=makeCanvas(w,h),id=c.getContext('2d').createImageData(w,h);for(let i=0;i<mask.length;i++)if(mask[i]){const t=i*4;id.data[t]=255;id.data[t+1]=255;id.data[t+2]=255;id.data[t+3]=255;}c.getContext('2d').putImageData(id,0,0);return c;}

  function arcPoints(points, start, end) {
    const out = [points[start]];
    let i = start;
    while (i !== end) {
      i = (i + 1) % points.length;
      out.push(points[i]);
      if (out.length > points.length + 1) break;
    }
    return out;
  }

  function concaveCornerIndices(points, epsilon) {
    const n = points.length;
    if (n < 6) return [];
    const sign = Math.sign(polygonArea(points)) || 1;
    const step = clamp(Math.round(Math.max(1, epsilon * .7)), 1, Math.min(8, Math.floor(n / 5)));
    const protectedIndices = [];
    for (let i = 0; i < n; i++) {
      const a = points[(i - step + n) % n], b = points[i], c = points[(i + step) % n];
      const v1x = b.x - a.x, v1y = b.y - a.y, v2x = c.x - b.x, v2y = c.y - b.y;
      const l1 = Math.hypot(v1x, v1y), l2 = Math.hypot(v2x, v2y);
      if (Math.min(l1, l2) < Math.max(1.5, epsilon * .65)) continue;
      const cross = v1x * v2y - v1y * v2x;
      if (cross * sign >= 0) continue;
      const dot = clamp((v1x * v2x + v1y * v2y) / (l1 * l2), -1, 1);
      const turn = Math.acos(dot);
      if (turn >= .30) protectedIndices.push(i);
    }
    if (protectedIndices.length < 2) return protectedIndices;
    const merged = [];
    const minGap = Math.max(2, Math.round(epsilon * .55));
    for (const idx of protectedIndices) {
      const prev = merged[merged.length - 1];
      if (prev == null || idx - prev > minGap) merged.push(idx);
      else {
        const prevTurn = Math.abs(localCross(points, prev));
        const curTurn = Math.abs(localCross(points, idx));
        if (curTurn > prevTurn) merged[merged.length - 1] = idx;
      }
    }
    if (merged.length > 1 && (merged[0] + n - merged[merged.length - 1]) <= minGap) {
      const first = merged[0], last = merged[merged.length - 1];
      if (Math.abs(localCross(points, last)) > Math.abs(localCross(points, first))) merged[0] = last;
      merged.pop();
      merged.sort((a,b)=>a-b);
    }
    return merged;
  }

  function localCross(points, i) {
    const n=points.length,a=points[(i-1+n)%n],b=points[i],c=points[(i+1)%n];
    return (b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);
  }

  function simplifyClosedPreserveConcave(points, epsilon) {
    if (epsilon <= .05 || points.length < 8) return points.slice();
    const protectedIndices = concaveCornerIndices(points, epsilon);
    if (!protectedIndices.length) return simplifyClosed(points, epsilon);
    if (protectedIndices.length === 1) {
      const start = protectedIndices[0], rotated = arcPoints(points, start, (start - 1 + points.length) % points.length);
      rotated.push(rotated[0]);
      return simplifyOpen(rotated, epsilon).slice(0, -1);
    }
    const out = [];
    for (let k = 0; k < protectedIndices.length; k++) {
      const a = protectedIndices[k], b = protectedIndices[(k + 1) % protectedIndices.length];
      const segment = simplifyOpen(arcPoints(points, a, b), epsilon);
      if (!out.length) out.push(...segment.slice(0, -1));
      else out.push(...segment.slice(0, -1));
    }
    return out.length >= 3 ? out : points.slice();
  }

  function simplifyCutPaths(paths,ppm){
    const eps=Math.max(.05,num(els.cutSimplify,.25)*ppm);
    return paths.map(p=>simplifyClosedPreserveConcave(p,eps)).filter(p=>p.length>=3&&Math.abs(polygonArea(p))>3);
  }

  function getCutSmoothAmount() { return clamp(num(els.cutSmooth, 35) / 100, 0, 1); }

  function curveSegments(path, smoothAmount = getCutSmoothAmount()) {
    const n = path.length;
    if (n < 2) return [];
    const amount = clamp(smoothAmount, 0, 1);
    const segments = [];
    for (let i = 0; i < n; i++) {
      const p0 = path[i], p1 = path[(i + 1) % n];
      if (amount <= .001) { segments.push({p0,c1:p0,c2:p1,p1,linear:true}); continue; }
      const prev = path[(i - 1 + n) % n], next = path[(i + 2) % n];
      let c1 = { x: p0.x + (p1.x - prev.x) * amount / 6, y: p0.y + (p1.y - prev.y) * amount / 6 };
      let c2 = { x: p1.x - (next.x - p0.x) * amount / 6, y: p1.y - (next.y - p0.y) * amount / 6 };
      const segLen = Math.hypot(p1.x-p0.x,p1.y-p0.y);
      const prevLen = Math.hypot(p0.x-prev.x,p0.y-prev.y), nextLen = Math.hypot(next.x-p1.x,next.y-p1.y);
      const cap1 = Math.min(segLen, prevLen) * (.42 * amount + .03);
      const cap2 = Math.min(segLen, nextLen) * (.42 * amount + .03);
      const d1 = Math.hypot(c1.x-p0.x,c1.y-p0.y), d2 = Math.hypot(c2.x-p1.x,c2.y-p1.y);
      if (d1 > cap1 && d1 > 0) { const q=cap1/d1;c1={x:p0.x+(c1.x-p0.x)*q,y:p0.y+(c1.y-p0.y)*q}; }
      if (d2 > cap2 && d2 > 0) { const q=cap2/d2;c2={x:p1.x+(c2.x-p1.x)*q,y:p1.y+(c2.y-p1.y)*q}; }
      const avgNeighbor = (prevLen + nextLen) * .5;
      if (Math.abs(p1.y-p0.y) < .35 && segLen > Math.max(8, avgNeighbor * 3.2)) {
        c1 = {x:p0.x+(p1.x-p0.x)/3,y:p0.y+(p1.y-p0.y)/3};
        c2 = {x:p0.x+(p1.x-p0.x)*2/3,y:p0.y+(p1.y-p0.y)*2/3};
      }
      segments.push({p0,c1,c2,p1,linear:false});
    }
    return segments;
  }

  function translatePaths(paths,dx,dy){return paths.map(p=>p.map(q=>({x:q.x+dx,y:q.y+dy})));}

  async function generateAcrylic() {
    if (state.mode !== 'acrylic' || !state.source) { drawPreview(); return; }
    const token=++state.generationToken;setBusy(true);await nextFrame();
    try{
      const style=currentFinishStyle('acrylic'),widthMm=clamp(num(els.productWidth,70),5,1000),heightMm=clamp(num(els.productHeight,70),5,1000);
      const bleedMm=style==='borderless'?clamp(num(els.bleedMm,2),0,20):0,borderMm=style==='bordered'?clamp(num(els.acrylicBorderMm,2),0,20):0;
      const threshold=clamp(num(style==='borderless'?els.alphaThreshold:els.alphaThresholdBordered,24),1,254),includeHoles=els.includeHoles.checked,flatBase=els.addFlatBase.checked,baseGapMode=state.baseGapMode;
      const targetMaxPx=getProcessingMaxDimension(),ppm=clamp(targetMaxPx/Math.max(widthMm,heightMm),2.2,12),coreW=Math.max(24,Math.round(widthMm*ppm)),coreH=Math.max(24,Math.round(heightMm*ppm));
      const bleedPx=Math.round(bleedMm*ppm),borderPx=Math.round(borderMm*ppm),pad=Math.max(10,Math.max(bleedPx,borderPx)+8),w=coreW+pad*2,h=coreH+pad*2;
      const original=makeCanvas(w,h),octx=original.getContext('2d',{willReadFrequently:true}),trim=getCachedTrimBounds(state.source,threshold),fit=Math.min(coreW/trim.sw,coreH/trim.sh),drawW=trim.sw*fit,drawH=trim.sh*fit,dx=pad+(coreW-drawW)/2,dy=pad+(coreH-drawH)/2;
      octx.imageSmoothingEnabled=true;octx.imageSmoothingQuality='high';octx.drawImage(state.source.img,trim.sx,trim.sy,trim.sw,trim.sh,dx,dy,drawW,drawH);
      const originalData=octx.getImageData(0,0,w,h),objectMask=stabilizeAlphaMask(originalData,threshold,getBoundarySamplingConfig());
      let contours=traceContours(objectMask,w,h);if(!contours.length)throw new Error('투명하지 않은 픽셀을 찾지 못했습니다.');
      let outerPaths=contours.filter(p=>polygonArea(p)>0),holePaths=contours.filter(p=>polygonArea(p)<0),base=null;
      const unbasedOuterPaths=outerPaths.map(path=>path.map(p=>({...p})));
      if(flatBase&&outerPaths.length){let largest=0;for(let i=1;i<outerPaths.length;i++)if(Math.abs(polygonArea(outerPaths[i]))>Math.abs(polygonArea(outerPaths[largest])))largest=i;const changed=applyFlatBase(outerPaths[largest]);outerPaths=outerPaths.slice();outerPaths[largest]=changed.path;base=changed.base;}
      const outerMask=rasterizePaths(outerPaths,w,h),unbasedOuterMask=flatBase&&base?rasterizePaths(unbasedOuterPaths,w,h):null,baseAddedMask=unbasedOuterMask?differenceMask(outerMask,unbasedOuterMask):null,holeMask=holePaths.length?rasterizePaths(holePaths,w,h):new Uint8Array(w*h),bleed=makeCanvas(w,h),fullPrint=makeCanvas(w,h);
      let printMask=objectMask,artworkOutput=original;
      if(style==='borderless'){
        const baseNoBleed=flatBase&&baseGapMode==='transparent'?buildBaseNoBleed(baseAddedMask,objectMask,w,h,bleedPx):null,result=makeBleed(originalData,objectMask,outerMask,holeMask,w,h,bleedPx,includeHoles,baseNoBleed);
        bleed.getContext('2d').putImageData(result.imageData,0,0);printMask=result.printMask;
      }else if(flatBase&&baseGapMode==='fill'&&baseAddedMask){
        const baseFill=makeBleed(originalData,objectMask,outerMask,holeMask,w,h,0,false,null),baseCanvas=makeCanvas(w,h);
        baseCanvas.getContext('2d').putImageData(baseFill.imageData,0,0);printMask=baseFill.printMask;artworkOutput=makeCanvas(w,h);const actx=artworkOutput.getContext('2d');actx.drawImage(baseCanvas,0,0);actx.drawImage(original,0,0);
      }
      const fctx=fullPrint.getContext('2d');if(style==='borderless')fctx.drawImage(bleed,0,0);fctx.drawImage(artworkOutput,0,0);
      let cutPaths;
      if(style==='borderless')cutPaths=outerPaths.concat(includeHoles?holePaths:[]);
      else{
        const cutOuter=dilateMask(outerMask,w,h,borderPx);cutPaths=traceContours(cutOuter,w,h).filter(p=>polygonArea(p)>0);
        if(includeHoles&&holePaths.length){const cutHoles=erodeMask(holeMask,w,h,borderPx);cutPaths.push(...traceContours(cutHoles,w,h).filter(p=>polygonArea(p)>0));}
      }
      cutPaths=simplifyCutPaths(cutPaths,ppm);
      const white=whiteCanvasFromMask(style==='borderless'||(flatBase&&baseGapMode==='fill')?printMask:objectMask,w,h),actualWmm=drawW/ppm,actualHmm=drawH/ppm,ppi=Math.min(trim.sw/(actualWmm/25.4),trim.sh/(actualHmm/25.4));
      state.result={mode:'acrylic',finishStyle:style,widthPx:w,heightPx:h,widthMm:w/ppm,heightMm:h/ppm,productWidthMm:widthMm,productHeightMm:heightMm,ppm,original:artworkOutput,white,bleed,fullPrint,cutPaths,cutSmooth:getCutSmoothAmount(),outerPaths,holePaths,includeHoles,base,baseGapMode,ppi,actualWmm,actualHmm};
      updateQualityAcrylic(ppi,actualWmm,actualHmm);els.geometryMeta.textContent=`${style==='borderless'?'무테':'유테'}${flatBase?` · 밑바닥 ${baseGapMode==='transparent'?'빈 공간':'색상 채움'}`:''} · 대상 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · 실제 그림 ${actualWmm.toFixed(1)} × ${actualHmm.toFixed(1)} mm · ${Math.round(ppi)} ppi · 칼선 ${cutPaths.length}개`;
      if(token===state.generationToken)drawPreview();
    }catch(err){console.error(err);setNotice('bad','생성할 수 없습니다',err.message||'이미지 처리 중 오류가 발생했습니다.');}finally{if(token===state.generationToken)setBusy(false);}
  }

  function updateQualityAcrylic(ppi,wMm,hMm){
    if(ppi>=300)setNotice('good',`인쇄 해상도 양호 · ${Math.round(ppi)} ppi`,`현재 그림 크기 ${wMm.toFixed(1)} × ${hMm.toFixed(1)} mm에서 300 ppi 이상입니다.`);
    else if(ppi>=180)setNotice('warn',`확대 시 주의 · ${Math.round(ppi)} ppi`,'가까이서 보면 가장자리나 세부가 다소 흐려질 수 있습니다. 300 ppi 이상을 권장합니다.');
    else setNotice('bad',`화질 깨짐 위험 · ${Math.round(ppi)} ppi`,'입력 크기에 비해 원본 픽셀이 부족합니다. 더 큰 이미지를 쓰거나 완성 크기를 줄여 주세요.');
  }

  function renderStickerLocal(sticker, ppm, boardW, boardH, padPx) {
    const w=sticker.widthMm*ppm,h=w*sticker.naturalHeight/sticker.naturalWidth,a=sticker.rotation*Math.PI/180,ca=Math.abs(Math.cos(a)),sa=Math.abs(Math.sin(a));
    const bboxW=w*ca+h*sa,bboxH=w*sa+h*ca,cx=sticker.xMm*ppm,cy=sticker.yMm*ppm;
    const left=clamp(Math.floor(cx-bboxW/2-padPx),0,boardW-1),top=clamp(Math.floor(cy-bboxH/2-padPx),0,boardH-1),right=clamp(Math.ceil(cx+bboxW/2+padPx),left+1,boardW),bottom=clamp(Math.ceil(cy+bboxH/2+padPx),top+1,boardH);
    const canvas=makeCanvas(right-left,bottom-top),cctx=canvas.getContext('2d',{willReadFrequently:true});
    cctx.save();cctx.translate(cx-left,cy-top);cctx.rotate(a);cctx.imageSmoothingEnabled=true;cctx.imageSmoothingQuality='high';cctx.drawImage(sticker.img,-w/2,-h/2,w,h);cctx.restore();
    return {canvas,left,top,widthPx:w,heightPx:h};
  }

  function renderStickerBackground(w, h, widthMm, heightMm) {
    const canvas = makeCanvas(w, h), cctx = canvas.getContext('2d');
    if (!els.stickerBackgroundEnabled.checked) return { canvas, ppi: Infinity };
    if (state.stickerBackgroundType === 'color' || !state.stickerBackgroundImage) {
      cctx.fillStyle = els.stickerBackgroundColor.value || '#ffffff';
      cctx.fillRect(0, 0, w, h);
      return { canvas, ppi: Infinity };
    }
    const record = state.stickerBackgroundImage, img = record.img;
    const fitMode = els.stickerBackgroundFit.value || 'cover';
    cctx.imageSmoothingEnabled = true;
    cctx.imageSmoothingQuality = 'high';
    if (fitMode === 'stretch') {
      cctx.drawImage(img, 0, 0, w, h);
      return { canvas, ppi: Math.min(record.naturalWidth/(widthMm/25.4), record.naturalHeight/(heightMm/25.4)) };
    }
    const scale = fitMode === 'contain' ? Math.min(w/record.naturalWidth, h/record.naturalHeight) : Math.max(w/record.naturalWidth, h/record.naturalHeight);
    const dw = record.naturalWidth*scale, dh = record.naturalHeight*scale;
    cctx.drawImage(img, (w-dw)/2, (h-dh)/2, dw, dh);
    const usedWidthMm = dw / (w/widthMm), usedHeightMm = dh / (h/heightMm);
    return { canvas, ppi: Math.min(record.naturalWidth/(usedWidthMm/25.4), record.naturalHeight/(usedHeightMm/25.4)) };
  }

  async function generateSticker() {
    if(state.mode!=='sticker')return;const token=++state.generationToken;setBusy(true);await nextFrame();
    try{
      const style=currentFinishStyle('sticker'),widthMm=clamp(num(els.artboardWidth,210),20,1000),heightMm=clamp(num(els.artboardHeight,297),20,1000),bleedMm=style==='borderless'?clamp(num(els.stickerBleed,2),0,20):0,borderMm=style==='bordered'?clamp(num(els.stickerBorder,2),0,20):0;
      const whiteFill=style==='bordered'&&state.stickerBorderFill==='white',whiteBleedMm=whiteFill?clamp(num(els.stickerWhiteBleed,1),0,10):0;
      const threshold=clamp(num(style==='borderless'?els.stickerAlphaThreshold:els.stickerAlphaThresholdBordered,24),1,254),includeHoles=els.stickerIncludeHoles.checked,targetMaxPx=getProcessingMaxDimension(),ppm=clamp(targetMaxPx/Math.max(widthMm,heightMm),1.5,8),w=Math.round(widthMm*ppm),h=Math.round(heightMm*ppm),bleedPx=Math.round(bleedMm*ppm),borderPx=Math.round(borderMm*ppm),whiteBleedPx=Math.round(whiteBleedMm*ppm),padPx=Math.max(8,Math.max(bleedPx,borderPx+whiteBleedPx)+8);
      const original=makeCanvas(w,h),white=makeCanvas(w,h),bleed=makeCanvas(w,h),fullPrint=makeCanvas(w,h),octx=original.getContext('2d'),wctx=white.getContext('2d'),bctx=bleed.getContext('2d'),fctx=fullPrint.getContext('2d'),cutPaths=[];
      const backgroundResult=renderStickerBackground(w,h,widthMm,heightMm),background=backgroundResult.canvas,hasBackground=els.stickerBackgroundEnabled.checked;
      if(hasBackground)fctx.drawImage(background,0,0);
      const ppis=[];if(Number.isFinite(backgroundResult.ppi))ppis.push(backgroundResult.ppi);
      for(const sticker of state.stickers){
        const local=renderStickerLocal(sticker,ppm,w,h,padPx),lw=local.canvas.width,lh=local.canvas.height,ldata=local.canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,lw,lh),objectMask=stabilizeAlphaMask(ldata,threshold,getBoundarySamplingConfig()),contours=traceContours(objectMask,lw,lh);
        if(!contours.length)continue;const outerPaths=contours.filter(p=>polygonArea(p)>0),holePaths=contours.filter(p=>polygonArea(p)<0),outerMask=rasterizePaths(outerPaths,lw,lh),holeMask=holePaths.length?rasterizePaths(holePaths,lw,lh):new Uint8Array(lw*lh);
        let localBleed=makeCanvas(lw,lh),printMask=objectMask,whiteMask=objectMask,localCuts;
        if(style==='borderless'){
          const result=makeBleed(ldata,objectMask,outerMask,holeMask,lw,lh,bleedPx,includeHoles,null);localBleed.getContext('2d').putImageData(result.imageData,0,0);printMask=result.printMask;whiteMask=printMask;localCuts=outerPaths.concat(includeHoles?holePaths:[]);
        }else{
          const cutOuter=dilateMask(outerMask,lw,lh,borderPx);localCuts=traceContours(cutOuter,lw,lh).filter(p=>polygonArea(p)>0);
          let cutHoleMask=null;
          if(includeHoles&&holePaths.length){cutHoleMask=erodeMask(holeMask,lw,lh,borderPx);localCuts.push(...traceContours(cutHoleMask,lw,lh).filter(p=>polygonArea(p)>0));}
          if(whiteFill){
            whiteMask=dilateMask(cutOuter,lw,lh,whiteBleedPx);
            if(cutHoleMask){
              const keepHole=whiteBleedPx>0?erodeMask(cutHoleMask,lw,lh,whiteBleedPx):cutHoleMask;
              whiteMask=subtractMask(whiteMask,keepHole);
            }
          }
        }
        localCuts=simplifyCutPaths(localCuts,ppm);cutPaths.push(...translatePaths(localCuts,local.left,local.top));
        const localWhite=whiteCanvasFromMask(whiteMask,lw,lh);
        if(style==='borderless'){bctx.drawImage(localBleed,local.left,local.top);fctx.drawImage(localBleed,local.left,local.top);}wctx.drawImage(localWhite,local.left,local.top);octx.drawImage(local.canvas,local.left,local.top);fctx.drawImage(local.canvas,local.left,local.top);
        ppis.push(sticker.naturalWidth/(sticker.widthMm/25.4));
      }
      const minPpi=ppis.length?Math.min(...ppis):Infinity;
      state.result={mode:'sticker',finishStyle:style,widthPx:w,heightPx:h,widthMm,heightMm,ppm,background,hasBackground,original,white,bleed,fullPrint,cutPaths,cutSmooth:getCutSmoothAmount(),ppi:minPpi,stickerBorderFill:state.stickerBorderFill,whiteBleedMm};
      updateQualitySticker(minPpi);els.geometryMeta.textContent=`${style==='borderless'?'무테':`유테 · ${whiteFill?'화이트':'투명'}`} · 대지 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · 이미지 ${state.stickers.length}개${hasBackground?' · 배경지':''} · 칼선 ${cutPaths.length}개${Number.isFinite(minPpi)?` · 최저 ${Math.round(minPpi)} ppi`:''}`;
      if(token===state.generationToken)drawPreview();
    }catch(err){console.error(err);setNotice('bad','스티커 대지를 만들 수 없습니다',err.message||'처리 중 오류가 발생했습니다.');}finally{if(token===state.generationToken)setBusy(false);}
  }

  function updateQualitySticker(ppi){
    if(!state.stickers.length){
      if(els.stickerBackgroundEnabled.checked)return setNotice('info','배경지 대지 준비됨','스티커 이미지를 추가하거나 배경지만 별도 레이어로 내보낼 수 있습니다.');
      return setNotice('info','이미지를 추가해 주세요','대지 위에 여러 이미지를 올리고 드래그해서 배치할 수 있습니다.');
    }
    if(ppi>=300)setNotice('good','모든 이미지 해상도 양호',`가장 낮은 이미지도 ${Math.round(ppi)} ppi입니다.`);
    else if(ppi>=180)setNotice('warn','일부 이미지 확대 주의',`가장 낮은 이미지가 ${Math.round(ppi)} ppi입니다.`);
    else setNotice('bad','일부 이미지 화질 깨짐 위험',`가장 낮은 이미지가 ${Math.round(ppi)} ppi입니다. 선택한 이미지 크기를 줄여 주세요.`);
  }
  function drawPath(c, path, scaleX, scaleY, offsetX, offsetY, smoothAmount = 0) {
    if (!path.length) return;
    c.moveTo(offsetX + path[0].x * scaleX, offsetY + path[0].y * scaleY);
    for (const seg of curveSegments(path, smoothAmount)) {
      if (seg.linear) c.lineTo(offsetX + seg.p1.x * scaleX, offsetY + seg.p1.y * scaleY);
      else c.bezierCurveTo(
        offsetX + seg.c1.x * scaleX, offsetY + seg.c1.y * scaleY,
        offsetX + seg.c2.x * scaleX, offsetY + seg.c2.y * scaleY,
        offsetX + seg.p1.x * scaleX, offsetY + seg.p1.y * scaleY
      );
    }
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
    const cw=els.canvas.width,ch=els.canvas.height;ctx.clearRect(0,0,cw,ch);const r=state.result;
    if(!r){ctx.save();ctx.fillStyle='rgba(255,255,255,.72)';ctx.font=`${14*(window.devicePixelRatio||1)}px system-ui`;ctx.textAlign='center';ctx.fillText(state.mode==='acrylic'?'이미지를 추가하면 미리보기가 나타납니다.':'스티커 이미지를 추가해 주세요.',cw/2,ch/2);ctx.restore();return;}
    const t=getViewTransform();ctx.save();ctx.shadowColor='rgba(25,22,18,.20)';ctx.shadowBlur=30;ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(t.x,t.y,t.boardW,t.boardH);ctx.restore();
    ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
    if(state.view==='background'&&r.hasBackground)ctx.drawImage(r.background,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='original')ctx.drawImage(r.original,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='white')ctx.drawImage(r.white,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='bleed')ctx.drawImage(r.fullPrint,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='composite'){if(r.hasBackground)ctx.drawImage(r.background,t.x,t.y,t.boardW,t.boardH);ctx.drawImage(r.white,t.x,t.y,t.boardW,t.boardH);if(r.finishStyle==='borderless')ctx.drawImage(r.bleed,t.x,t.y,t.boardW,t.boardH);ctx.drawImage(r.original,t.x,t.y,t.boardW,t.boardH);}
    ctx.restore();
    if(state.view==='cutline'||state.view==='composite'){ctx.save();ctx.beginPath();for(const p of r.cutPaths)drawPath(ctx,p,t.scale,t.scale,t.x,t.y,r.cutSmooth||0);ctx.strokeStyle='#ff24b9';ctx.lineWidth=Math.max(1.4,1.2*(window.devicePixelRatio||1));ctx.stroke();ctx.restore();}
    if(r.mode==='sticker'&&state.selectedId&&state.view!=='cutline')drawSelection(t);
    ctx.save();ctx.strokeStyle='rgba(60,58,54,.25)';ctx.lineWidth=1;ctx.strokeRect(t.x+.5,t.y+.5,t.boardW-1,t.boardH-1);ctx.restore();els.zoomLabel.textContent=`${Math.round(state.zoom*100)}%`;
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
  function scheduleAcrylicGenerate() { clearTimeout(acrylicTimer); acrylicTimer = setTimeout(generateAcrylic, 380); }
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


  function pathToSvgD(path, smoothAmount = 0){
    if(!path.length)return'';
    let d=`M ${path[0].x.toFixed(2)} ${path[0].y.toFixed(2)}`;
    for(const seg of curveSegments(path,smoothAmount)){
      if(seg.linear)d+=` L ${seg.p1.x.toFixed(2)} ${seg.p1.y.toFixed(2)}`;
      else d+=` C ${seg.c1.x.toFixed(2)} ${seg.c1.y.toFixed(2)} ${seg.c2.x.toFixed(2)} ${seg.c2.y.toFixed(2)} ${seg.p1.x.toFixed(2)} ${seg.p1.y.toFixed(2)}`;
    }
    return `${d} Z`;
  }
  function selectedLayers(){return{background:!!els.exportBackground.checked&&!els.exportBackground.disabled,artwork:els.exportArtwork.checked,white:els.exportWhite.checked,bleed:els.exportBleed.checked&&!els.exportBleed.disabled,cutline:els.exportCutline.checked};}
  function exportSvg(){
    const r=state.result;if(!r)return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');
    const groups=[];
    if(pick.background&&r.background)groups.push(`<g id="BACKGROUND" data-layer="background"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.background.toDataURL('image/png')}"/></g>`);
    if(pick.white)groups.push(`<g id="WHITE" data-layer="white"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.white.toDataURL('image/png')}"/></g>`);
    if(pick.bleed)groups.push(`<g id="BLEED_EXTENSION" data-layer="bleed"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.bleed.toDataURL('image/png')}"/></g>`);
    if(pick.artwork)groups.push(`<g id="ARTWORK" data-layer="artwork"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.original.toDataURL('image/png')}"/></g>`);
    if(pick.cutline){const paths=r.cutPaths.map(p=>`<path d="${pathToSvgD(p,r.cutSmooth||0)}" fill="none" stroke="#ff00b8" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`).join('\n');groups.push(`<g id="CUTLINE" data-layer="cutline">${paths}</g>`);}
    const svg=`<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${r.widthMm.toFixed(4)}mm" height="${r.heightMm.toFixed(4)}mm" viewBox="0 0 ${r.widthPx} ${r.heightPx}">\n<title>라미아크릴 제작 데이터</title>\n<metadata>finish-style=${r.finishStyle}; cut-smooth=${((r.cutSmooth||0)*100).toFixed(0)}%; layers=${Object.entries(pick).filter(([,v])=>v).map(([k])=>k).join(',')}</metadata>\n${groups.join('\n')}\n</svg>`;
    downloadBlob(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}),`lamia-${r.mode}-${r.finishStyle}.svg`);
  }

  function asciiBytes(str){const out=new Uint8Array(str.length);for(let i=0;i<str.length;i++)out[i]=str.charCodeAt(i)&255;return out;}
  function concatBytes(parts){const len=parts.reduce((s,p)=>s+p.length,0),out=new Uint8Array(len);let o=0;for(const p of parts){out.set(p,o);o+=p.length;}return out;}
  function canvasRgbAlpha(canvas){const d=canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,canvas.width,canvas.height).data,n=canvas.width*canvas.height,rgb=new Uint8Array(n*3),alpha=new Uint8Array(n);for(let i=0;i<n;i++){rgb[i*3]=d[i*4];rgb[i*3+1]=d[i*4+1];rgb[i*3+2]=d[i*4+2];alpha[i]=d[i*4+3];}return{rgb,alpha};}
  function makePdfAi(r,pick){
    const pageW=r.widthMm*72/25.4,pageH=r.heightMm*72/25.4,sx=pageW/r.widthPx,sy=pageH/r.heightPx,layers=[];
    if(pick.background&&r.background)layers.push(['Background',r.background]);
    if(pick.white)layers.push(['White',r.white]);
    if(pick.bleed)layers.push(['Bleed',r.bleed]);
    if(pick.artwork)layers.push(['Artwork',r.original]);
    let content='';for(let i=0;i<layers.length;i++)content+=`q\n${pageW.toFixed(5)} 0 0 ${pageH.toFixed(5)} 0 0 cm\n/Im${i} Do\nQ\n`;
    if(pick.cutline){
      content+='1 0 0.72 RG\n0.25 w\n1 J\n1 j\n';
      for(const p of r.cutPaths){
        if(!p.length)continue;
        content+=`${(p[0].x*sx).toFixed(4)} ${(pageH-p[0].y*sy).toFixed(4)} m\n`;
        for(const seg of curveSegments(p,r.cutSmooth||0)){
          if(seg.linear)content+=`${(seg.p1.x*sx).toFixed(4)} ${(pageH-seg.p1.y*sy).toFixed(4)} l\n`;
          else content+=`${(seg.c1.x*sx).toFixed(4)} ${(pageH-seg.c1.y*sy).toFixed(4)} ${(seg.c2.x*sx).toFixed(4)} ${(pageH-seg.c2.y*sy).toFixed(4)} ${(seg.p1.x*sx).toFixed(4)} ${(pageH-seg.p1.y*sy).toFixed(4)} c\n`;
        }
        content+='h S\n';
      }
    }
    const objects=[];objects[1]=asciiBytes('<< /Type /Catalog /Pages 2 0 R >>');objects[2]=asciiBytes('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    const resourceEntries=[];let nextObj=5;for(let i=0;i<layers.length;i++){resourceEntries.push(`/Im${i} ${nextObj} 0 R`);nextObj+=2;}
    objects[3]=asciiBytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW.toFixed(5)} ${pageH.toFixed(5)}] /Resources << /XObject << ${resourceEntries.join(' ')} >> >> /Contents 4 0 R >>`);
    const contentBytes=asciiBytes(content);objects[4]=concatBytes([asciiBytes(`<< /Length ${contentBytes.length} >>\nstream\n`),contentBytes,asciiBytes('\nendstream')]);
    let objNo=5;for(const[,canvas]of layers){const{rgb,alpha}=canvasRgbAlpha(canvas),maskObj=objNo+1;objects[objNo]=concatBytes([asciiBytes(`<< /Type /XObject /Subtype /Image /Width ${r.widthPx} /Height ${r.heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /SMask ${maskObj} 0 R /Length ${rgb.length} >>\nstream\n`),rgb,asciiBytes('\nendstream')]);objects[maskObj]=concatBytes([asciiBytes(`<< /Type /XObject /Subtype /Image /Width ${r.widthPx} /Height ${r.heightPx} /ColorSpace /DeviceGray /BitsPerComponent 8 /Length ${alpha.length} >>\nstream\n`),alpha,asciiBytes('\nendstream')]);objNo+=2;}
    const count=objNo-1,chunks=[asciiBytes('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n')],offsets=[0];let pos=chunks[0].length;
    for(let i=1;i<=count;i++){offsets[i]=pos;const head=asciiBytes(`${i} 0 obj\n`),tail=asciiBytes('\nendobj\n');chunks.push(head,objects[i],tail);pos+=head.length+objects[i].length+tail.length;}
    const xrefPos=pos;let xref=`xref\n0 ${count+1}\n0000000000 65535 f \n`;for(let i=1;i<=count;i++)xref+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;xref+=`trailer\n<< /Size ${count+1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;chunks.push(asciiBytes(xref));return concatBytes(chunks);
  }
  function exportAi(){const r=state.result;if(!r)return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');const bytes=makePdfAi(r,pick);downloadBlob(new Blob([bytes],{type:'application/pdf'}),`lamia-${r.mode}-${r.finishStyle}.ai`);}

  function resetAll(){
    if(state.mode==='acrylic'){
      state.source=null;state.result=null;state.finishStyle.acrylic='borderless';state.baseGapMode='transparent';
      els.singleFileInput.value='';els.imageStatus.textContent='이미지 필요';els.productWidth.value=70;els.productHeight.value=70;els.bleedMm.value=2;els.acrylicBorderMm.value=2;els.alphaThreshold.value=24;els.alphaThresholdBordered.value=24;els.colorSampleRadius.value=12;els.includeHoles.checked=false;els.addFlatBase.checked=true;
      setNotice('info','이미지를 추가해 주세요','투명 PNG를 올리면 그림, 화이트, 칼선, 재단여백 레이어를 생성합니다.');updateFinishStyleUi();drawPreview();
    }else{
      state.stickers=[];state.selectedId=null;state.finishStyle.sticker='borderless';state.stickerBorderFill='transparent';state.stickerBackgroundType='color';state.stickerBackgroundImage=null;
      els.stickerCount.textContent='0개';els.artboardWidth.value=210;els.artboardHeight.value=297;els.stickerBorder.value=2;els.stickerBleed.value=2;els.stickerWhiteBleed.value=1;els.stickerAlphaThreshold.value=24;els.stickerAlphaThresholdBordered.value=24;els.stickerIncludeHoles.checked=false;els.stickerBackgroundEnabled.checked=false;els.stickerBackgroundColor.value='#ffffff';els.stickerBackgroundFit.value='cover';els.stickerBackgroundFile.value='';els.stickerBackgroundStatus.textContent='선택된 이미지 없음';
      selectSticker(null);updateFinishStyleUi();generateSticker();
    }
  }

  els.acrylicModeBtn.addEventListener('click',()=>setMode('acrylic'));
  els.stickerModeBtn.addEventListener('click',()=>setMode('sticker'));
  els.acrylicBorderlessBtn.addEventListener('click',()=>setFinishStyle('acrylic','borderless'));
  els.acrylicBorderedBtn.addEventListener('click',()=>setFinishStyle('acrylic','bordered'));
  els.stickerBorderlessBtn.addEventListener('click',()=>setFinishStyle('sticker','borderless'));
  els.stickerBorderedBtn.addEventListener('click',()=>setFinishStyle('sticker','bordered'));
  els.baseGapTransparentBtn.addEventListener('click',()=>setBaseGapMode('transparent'));
  els.baseGapFillBtn.addEventListener('click',()=>setBaseGapMode('fill'));
  els.stickerBorderFillTransparentBtn.addEventListener('click',()=>setStickerBorderFill('transparent'));
  els.stickerBorderFillWhiteBtn.addEventListener('click',()=>setStickerBorderFill('white'));
  els.stickerBackgroundColorBtn.addEventListener('click',()=>setStickerBackgroundType('color'));
  els.stickerBackgroundImageBtn.addEventListener('click',()=>setStickerBackgroundType('image'));

  els.singleFileInput.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;state.source=await fileToImageRecord(file);els.imageStatus.textContent=file.name;await generateAcrylic();});
  els.multiFileInput.addEventListener('change',async e=>{const files=[...(e.target.files||[])];if(files.length)await addStickerFiles(files);e.target.value='';});
  els.stickerBackgroundFile.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;state.stickerBackgroundImage=await fileToImageRecord(file);els.stickerBackgroundStatus.textContent=file.name;state.stickerBackgroundType='image';updateStickerBackgroundUi();await generateSticker();});

  els.generateBtn.addEventListener('click',generateAcrylic);
  els.generateStickerBtn.addEventListener('click',generateSticker);
  [els.productWidth,els.productHeight,els.bleedMm,els.acrylicBorderMm,els.alphaThreshold,els.alphaThresholdBordered,els.colorSampleRadius].forEach(el=>el.addEventListener('input',scheduleAcrylicGenerate));
  els.includeHoles.addEventListener('change',generateAcrylic);
  els.addFlatBase.addEventListener('change',()=>{updateFlatBaseUi();generateAcrylic();});
  [els.artboardWidth,els.artboardHeight,els.stickerBorder,els.stickerBleed,els.stickerWhiteBleed,els.stickerAlphaThreshold,els.stickerAlphaThresholdBordered].forEach(el=>el.addEventListener('input',scheduleStickerGenerate));
  els.stickerIncludeHoles.addEventListener('change',generateSticker);
  els.stickerBackgroundEnabled.addEventListener('change',()=>{updateStickerBackgroundUi();generateSticker();});
  els.stickerBackgroundColor.addEventListener('input',scheduleStickerGenerate);
  els.stickerBackgroundFit.addEventListener('change',generateSticker);
  [els.selWidth,els.selRotation,els.selX,els.selY].forEach(el=>el.addEventListener('input',updateSelectedFromFields));
  els.bringFrontBtn.addEventListener('click',()=>{const i=state.stickers.findIndex(v=>v.id===state.selectedId);if(i>=0){const[s]=state.stickers.splice(i,1);state.stickers.push(s);drawPreview();scheduleStickerGenerate();}});
  els.deleteStickerBtn.addEventListener('click',()=>{state.stickers=state.stickers.filter(v=>v.id!==state.selectedId);els.stickerCount.textContent=`${state.stickers.length}개`;selectSticker(null);generateSticker();});
  els.exportSvgBtn.addEventListener('click',exportSvg);
  els.exportAiBtn.addEventListener('click',exportAi);
  els.resetBtn.addEventListener('click',resetAll);
  document.querySelectorAll('.view-tab').forEach(btn=>btn.addEventListener('click',()=>{if(btn.classList.contains('hidden'))return;selectView(btn.dataset.view);drawPreview();}));
  els.zoomInBtn.addEventListener('click',()=>{state.zoom=clamp(state.zoom*1.2,.2,5);drawPreview();});
  els.zoomOutBtn.addEventListener('click',()=>{state.zoom=clamp(state.zoom/1.2,.2,5);drawPreview();});
  els.fitBtn.addEventListener('click',()=>{state.zoom=1;drawPreview();});
  els.previewBackground.addEventListener('change',()=>{applyPreviewBackground();drawPreview();});
  els.customBackground.addEventListener('input',()=>{applyPreviewBackground();drawPreview();});
  els.processingQuality.addEventListener('change',()=>{if(state.mode==='acrylic')generateAcrylic();else generateSticker();});
  els.cutSimplify.addEventListener('input',()=>{els.cutSimplifyValue.textContent=`${Number(els.cutSimplify.value).toFixed(2)} mm`;if(state.mode==='acrylic')scheduleAcrylicGenerate();else scheduleStickerGenerate();});
  els.cutSmooth.addEventListener('input',()=>{els.cutSmoothValue.textContent=`${Math.round(Number(els.cutSmooth.value))}%`;if(state.mode==='acrylic')scheduleAcrylicGenerate();else scheduleStickerGenerate();});

  els.canvas.addEventListener('pointerdown',ev=>{if(state.mode!=='sticker'||!state.result)return;const p=boardPointFromEvent(ev);if(!p)return;const s=hitSticker(p);selectSticker(s?.id||null);if(s){state.dragging={id:s.id,dx:p.xMm-s.xMm,dy:p.yMm-s.yMm};els.canvas.setPointerCapture(ev.pointerId);}});
  els.canvas.addEventListener('pointermove',ev=>{if(!state.dragging||state.mode!=='sticker')return;const p=boardPointFromEvent(ev),s=state.stickers.find(v=>v.id===state.dragging.id);if(!p||!s)return;s.xMm=p.xMm-state.dragging.dx;s.yMm=p.yMm-state.dragging.dy;els.selX.value=s.xMm.toFixed(1);els.selY.value=s.yMm.toFixed(1);drawPreview();});
  const endDrag=()=>{if(state.dragging){state.dragging=null;scheduleStickerGenerate();}};els.canvas.addEventListener('pointerup',endDrag);els.canvas.addEventListener('pointercancel',endDrag);
  for(const dz of document.querySelectorAll('.dropzone')){dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('dragover');});dz.addEventListener('dragleave',()=>dz.classList.remove('dragover'));dz.addEventListener('drop',async e=>{e.preventDefault();dz.classList.remove('dragover');const files=[...e.dataTransfer.files].filter(f=>f.type.startsWith('image/'));if(!files.length)return;if(dz.htmlFor==='singleFileInput'){state.source=await fileToImageRecord(files[0]);els.imageStatus.textContent=files[0].name;await generateAcrylic();}else await addStickerFiles(files);});}
  window.addEventListener('resize',resizePreviewCanvas);new ResizeObserver(resizePreviewCanvas).observe(els.stage);applyPreviewBackground();updateFinishStyleUi();resizePreviewCanvas();setNotice('info','이미지를 추가해 주세요','투명 PNG를 올리면 그림, 화이트, 칼선, 재단여백 레이어를 생성합니다.');
})();
