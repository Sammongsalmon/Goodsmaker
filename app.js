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
    borderlessBaseOptions: $('borderlessBaseOptions'), baseSlopeKeepBtn: $('baseSlopeKeepBtn'), baseSlopeLevelBtn: $('baseSlopeLevelBtn'),
    baseSlopeHelp: $('baseSlopeHelp'), baseLiftField: $('baseLiftField'), baseLiftMm: $('baseLiftMm'), baseSlopeStatus: $('baseSlopeStatus'),
    borderedBaseOptions: $('borderedBaseOptions'), baseAnchorColorBtn: $('baseAnchorColorBtn'), baseAnchorFullBtn: $('baseAnchorFullBtn'),
    baseAnchorHelp: $('baseAnchorHelp'), baseColorToleranceField: $('baseColorToleranceField'), baseColorTolerance: $('baseColorTolerance'),
    holeNoneBtn: $('holeNoneBtn'), holeInternalBtn: $('holeInternalBtn'), holeExternalBtn: $('holeExternalBtn'), holeModeHelp: $('holeModeHelp'),
    holeOptions: $('holeOptions'), holeDiameter: $('holeDiameter'), holeWall: $('holeWall'), holeInset: $('holeInset'), holeWallField: $('holeWallField'), holeInsetField: $('holeInsetField'),
    holePositionStatus: $('holePositionStatus'), resetHolePositionBtn: $('resetHolePositionBtn'),
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
    stickerBackgroundColorBtn: $('stickerBackgroundColorBtn'), stickerBackgroundImageBtn: $('stickerBackgroundImageBtn'), stickerBackgroundPatternBtn: $('stickerBackgroundPatternBtn'),
    stickerBackgroundColorField: $('stickerBackgroundColorField'), stickerBackgroundImageFields: $('stickerBackgroundImageFields'), stickerBackgroundPatternFields: $('stickerBackgroundPatternFields'),
    stickerBackgroundColor: $('stickerBackgroundColor'), stickerBackgroundFile: $('stickerBackgroundFile'), stickerPatternFile: $('stickerPatternFile'),
    stickerBackgroundStatus: $('stickerBackgroundStatus'), stickerPatternStatus: $('stickerPatternStatus'), stickerBackgroundFit: $('stickerBackgroundFit'),
    stickerBackgroundCustomFields: $('stickerBackgroundCustomFields'), stickerBackgroundScale: $('stickerBackgroundScale'), stickerBackgroundX: $('stickerBackgroundX'), stickerBackgroundY: $('stickerBackgroundY'),
    stickerPatternScale: $('stickerPatternScale'), stickerPatternX: $('stickerPatternX'), stickerPatternY: $('stickerPatternY'),
    generateStickerBtn: $('generateStickerBtn'), selectionEditor: $('selectionEditor'), selWidth: $('selWidth'), selRotation: $('selRotation'), selX: $('selX'), selY: $('selY'),
    bringFrontBtn: $('bringFrontBtn'), deleteStickerBtn: $('deleteStickerBtn'),
    exportPngBtn: $('exportPngBtn'), exportSvgBtn: $('exportSvgBtn'), exportAiBtn: $('exportAiBtn'), resetBtn: $('resetBtn'),
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
    baseSupportMode: 'color',
    borderlessBaseLevel: false,
    stickerBorderFill: 'transparent',
    stickerBackgroundType: 'color',
    stickerBackgroundImage: null,
    stickerPatternImage: null,
    source: null,
    stickers: [],
    selectedId: null,
    view: 'composite',
    zoom: 1,
    result: null,
    dragging: null,
    generationToken: 0,
    previewBackground: 'checker',
    hole: {
      draftMode: 'none', appliedMode: 'none',
      draftXmm: null, draftYmm: null, appliedXmm: null, appliedYmm: null,
      appliedDiameterMm: 3, appliedWallMm: 1.5, appliedInsetMm: 2.5,
      dirty: false
    }
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

  const WORKSPACE_DB_NAME = 'acrylic-production-manager';
  const WORKSPACE_STORE = 'workspace';
  const WORKSPACE_KEY = 'current-v1';
  const WORKSPACE_META_KEY = 'acrylic-production-manager-meta-v1';
  let persistenceDbPromise = null;
  let persistenceTimer = null;
  let persistenceNeedsImages = false;
  let isRestoringWorkspace = false;

  function openWorkspaceDb() {
    if (!('indexedDB' in window)) return Promise.resolve(null);
    if (persistenceDbPromise) return persistenceDbPromise;
    persistenceDbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(WORKSPACE_DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(WORKSPACE_STORE)) db.createObjectStore(WORKSPACE_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }).catch(error => {
      console.warn('작업 내용 저장소를 열 수 없습니다.', error);
      return null;
    });
    return persistenceDbPromise;
  }

  function readWorkspaceMetaFallback() {
    try {
      const raw = localStorage.getItem(WORKSPACE_META_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function sameImageMeta(a, b) {
    return !!a && !!b
      && a.name === b.name
      && Number(a.naturalWidth) === Number(b.naturalWidth)
      && Number(a.naturalHeight) === Number(b.naturalHeight);
  }

  function mergeWorkspaceSnapshots(full, meta) {
    if (!full) return meta;
    if (!meta || Number(meta.savedAt || 0) < Number(full.savedAt || 0)) return full;
    const fullStickers = new Map((full.stickers || []).map(item => [item.id, item]));
    const attachImage = (metaRecord, fullRecord) => {
      if (!metaRecord) return null;
      return sameImageMeta(metaRecord, fullRecord)
        ? { ...metaRecord, dataUrl: fullRecord.dataUrl || null }
        : metaRecord;
    };
    return {
      ...full,
      ...meta,
      source: attachImage(meta.source, full.source),
      stickers: (meta.stickers || []).map(item => attachImage(item, fullStickers.get(item.id))),
      stickerBackgroundImage: attachImage(meta.stickerBackgroundImage, full.stickerBackgroundImage),
      stickerPatternImage: attachImage(meta.stickerPatternImage, full.stickerPatternImage)
    };
  }

  async function readPersistedWorkspace() {
    const fallback = readWorkspaceMetaFallback();
    const db = await openWorkspaceDb();
    if (!db) return fallback;
    return new Promise(resolve => {
      const tx = db.transaction(WORKSPACE_STORE, 'readonly');
      const request = tx.objectStore(WORKSPACE_STORE).get(WORKSPACE_KEY);
      request.onsuccess = () => resolve(mergeWorkspaceSnapshots(request.result || null, fallback));
      request.onerror = () => resolve(fallback);
    });
  }

  async function writePersistedWorkspace(snapshot) {
    const db = await openWorkspaceDb();
    if (!db) return;
    await new Promise((resolve, reject) => {
      const tx = db.transaction(WORKSPACE_STORE, 'readwrite');
      tx.objectStore(WORKSPACE_STORE).put(snapshot, WORKSPACE_KEY);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    }).catch(error => console.warn('작업 내용을 저장하지 못했습니다.', error));
  }

  function snapshotImageRecord(record) {
    if (!record?.dataUrl) return null;
    return {
      dataUrl: record.dataUrl,
      name: record.name || 'image',
      naturalWidth: record.naturalWidth || record.img?.naturalWidth || record.img?.width || 1,
      naturalHeight: record.naturalHeight || record.img?.naturalHeight || record.img?.height || 1
    };
  }

  function snapshotFormValues() {
    const values = {};
    document.querySelectorAll('input[id], select[id]').forEach(el => {
      if (el.type === 'file') return;
      values[el.id] = el.type === 'checkbox' ? { checked: !!el.checked } : { value: el.value };
    });
    return values;
  }

  function makeWorkspaceSnapshot() {
    return {
      version: 1,
      savedAt: Date.now(),
      ui: snapshotFormValues(),
      state: {
        mode: state.mode,
        finishStyle: { ...state.finishStyle },
        baseGapMode: state.baseGapMode,
        baseSupportMode: state.baseSupportMode,
        borderlessBaseLevel: state.borderlessBaseLevel,
        stickerBorderFill: state.stickerBorderFill,
        stickerBackgroundType: state.stickerBackgroundType,
        selectedId: state.selectedId,
        view: state.view,
        zoom: state.zoom,
        previewBackground: state.previewBackground,
        hole: { ...state.hole }
      },
      source: snapshotImageRecord(state.source),
      stickers: state.stickers.map(sticker => ({
        ...snapshotImageRecord(sticker),
        id: sticker.id,
        widthMm: sticker.widthMm,
        rotation: sticker.rotation,
        xMm: sticker.xMm,
        yMm: sticker.yMm
      })),
      stickerBackgroundImage: snapshotImageRecord(state.stickerBackgroundImage),
      stickerPatternImage: snapshotImageRecord(state.stickerPatternImage)
    };
  }

  function saveWorkspaceMetaFallback(snapshot) {
    try {
      const stripImage = record => record ? { ...record, dataUrl: null } : null;
      const meta = {
        ...snapshot,
        source: stripImage(snapshot.source),
        stickers: snapshot.stickers.map(stripImage),
        stickerBackgroundImage: stripImage(snapshot.stickerBackgroundImage),
        stickerPatternImage: stripImage(snapshot.stickerPatternImage)
      };
      localStorage.setItem(WORKSPACE_META_KEY, JSON.stringify(meta));
    } catch (_) {
      // IndexedDB remains the primary store. The metadata fallback is optional.
    }
  }

  function saveWorkspaceMetaNow() {
    if (isRestoringWorkspace) return;
    const snapshot = makeWorkspaceSnapshot();
    saveWorkspaceMetaFallback(snapshot);
  }

  async function saveWorkspaceNow() {
    if (isRestoringWorkspace) return;
    clearTimeout(persistenceTimer);
    persistenceTimer = null;
    persistenceNeedsImages = false;
    const snapshot = makeWorkspaceSnapshot();
    saveWorkspaceMetaFallback(snapshot);
    await writePersistedWorkspace(snapshot);
  }

  function schedulePersist(delay = 650, includeImages = false) {
    if (isRestoringWorkspace) return;
    persistenceNeedsImages = persistenceNeedsImages || includeImages;
    clearTimeout(persistenceTimer);
    persistenceTimer = setTimeout(() => {
      const saveImages = persistenceNeedsImages;
      persistenceNeedsImages = false;
      if (saveImages) saveWorkspaceNow();
      else saveWorkspaceMetaNow();
    }, delay);
  }

  async function imageRecordFromSnapshot(snapshot) {
    if (!snapshot?.dataUrl) return null;
    const img = await loadImage(snapshot.dataUrl);
    return {
      img,
      dataUrl: snapshot.dataUrl,
      name: snapshot.name || 'image',
      naturalWidth: snapshot.naturalWidth || img.naturalWidth || img.width,
      naturalHeight: snapshot.naturalHeight || img.naturalHeight || img.height,
      trimCache: Object.create(null)
    };
  }

  function restoreFormValues(values = {}) {
    for (const [id, stored] of Object.entries(values)) {
      const el = $(id);
      if (!el || el.type === 'file') continue;
      if (el.type === 'checkbox' && Object.prototype.hasOwnProperty.call(stored, 'checked')) el.checked = !!stored.checked;
      else if (Object.prototype.hasOwnProperty.call(stored, 'value')) el.value = stored.value;
    }
  }

  async function restoreWorkspace() {
    const saved = await readPersistedWorkspace();
    if (!saved?.state) return false;
    isRestoringWorkspace = true;
    try {
      restoreFormValues(saved.ui);
      const restoredState = saved.state;
      state.mode = restoredState.mode === 'sticker' ? 'sticker' : 'acrylic';
      state.finishStyle = {
        acrylic: restoredState.finishStyle?.acrylic === 'bordered' ? 'bordered' : 'borderless',
        sticker: restoredState.finishStyle?.sticker === 'bordered' ? 'bordered' : 'borderless'
      };
      state.baseGapMode = restoredState.baseGapMode === 'fill' ? 'fill' : 'transparent';
      state.baseSupportMode = restoredState.baseSupportMode === 'full' ? 'full' : 'color';
      state.borderlessBaseLevel = !!restoredState.borderlessBaseLevel;
      state.stickerBorderFill = restoredState.stickerBorderFill === 'white' ? 'white' : 'transparent';
      state.stickerBackgroundType = ['image', 'pattern'].includes(restoredState.stickerBackgroundType) ? restoredState.stickerBackgroundType : 'color';
      state.selectedId = restoredState.selectedId || null;
      state.view = ['composite', 'background', 'original', 'white', 'bleed', 'cutline'].includes(restoredState.view) ? restoredState.view : 'composite';
      state.zoom = clamp(Number(restoredState.zoom) || 1, .2, 5);
      state.previewBackground = restoredState.previewBackground || 'checker';
      state.hole = {
        draftMode: 'none', appliedMode: 'none', draftXmm: null, draftYmm: null,
        appliedXmm: null, appliedYmm: null, appliedDiameterMm: 3,
        appliedWallMm: 1.5, appliedInsetMm: 2.5, dirty: false,
        ...(restoredState.hole || {})
      };

      const [source, background, pattern, stickers] = await Promise.all([
        imageRecordFromSnapshot(saved.source),
        imageRecordFromSnapshot(saved.stickerBackgroundImage),
        imageRecordFromSnapshot(saved.stickerPatternImage),
        Promise.all((saved.stickers || []).map(async item => {
          const record = await imageRecordFromSnapshot(item);
          if (!record) return null;
          return {
            ...record,
            id: item.id || uid(),
            widthMm: Number(item.widthMm) || 30,
            rotation: Number(item.rotation) || 0,
            xMm: Number(item.xMm) || 0,
            yMm: Number(item.yMm) || 0
          };
        }))
      ]);
      state.source = source;
      state.stickerBackgroundImage = background;
      state.stickerPatternImage = pattern;
      state.stickers = stickers.filter(Boolean);
      if (!state.stickers.some(item => item.id === state.selectedId)) state.selectedId = null;

      els.imageStatus.textContent = state.source?.name || '이미지 필요';
      els.stickerCount.textContent = `${state.stickers.length}개`;
      els.stickerBackgroundStatus.textContent = state.stickerBackgroundImage?.name || '선택된 이미지 없음';
      els.stickerPatternStatus.textContent = state.stickerPatternImage?.name || '선택된 패턴 없음';
      return true;
    } catch (error) {
      console.warn('저장된 작업 내용을 복원하지 못했습니다.', error);
      return false;
    } finally {
      isRestoringWorkspace = false;
    }
  }

  function setMode(mode, options = {}) {
    state.mode = mode;
    state.result = null;
    if (!options.preserveZoom) state.zoom = 1;
    els.acrylicModeBtn.classList.toggle('active', mode === 'acrylic');
    els.stickerModeBtn.classList.toggle('active', mode === 'sticker');
    els.acrylicModeBtn.setAttribute('aria-selected', String(mode === 'acrylic'));
    els.stickerModeBtn.setAttribute('aria-selected', String(mode === 'sticker'));
    els.acrylicControls.classList.toggle('hidden', mode !== 'acrylic');
    els.stickerControls.classList.toggle('hidden', mode !== 'sticker');
    updateFinishStyleUi();
    if (!options.skipGenerate) {
      if (mode === 'acrylic') generateAcrylic(); else generateSticker();
    }
    schedulePersist();
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

  function setBaseSupportMode(mode) {
    state.baseSupportMode = mode;
    updateFlatBaseUi();
    generateAcrylic();
  }

  function setBorderlessBaseLevel(enabled) {
    state.borderlessBaseLevel = !!enabled;
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

  function markHoleDirty() {
    const diameter=clamp(num(els.holeDiameter,3),1.5,12),wall=clamp(num(els.holeWall,1.5),.6,8),inset=clamp(num(els.holeInset,2.5),.5,15);
    state.hole.dirty = state.hole.draftMode !== state.hole.appliedMode
      || state.hole.draftXmm !== state.hole.appliedXmm
      || state.hole.draftYmm !== state.hole.appliedYmm
      || Math.abs(diameter-state.hole.appliedDiameterMm)>.0001
      || Math.abs(wall-state.hole.appliedWallMm)>.0001
      || Math.abs(inset-state.hole.appliedInsetMm)>.0001;
    updateHoleUi();
    drawPreview();
  }

  function setHoleMode(mode) {
    state.hole.draftMode = mode;
    if (mode === 'none') {
      state.hole.draftXmm = null;
      state.hole.draftYmm = null;
    } else if (state.result?.mode === 'acrylic') {
      ensureDraftHolePosition(true);
    }
    state.hole.dirty = true;
    updateHoleUi();
    drawPreview();
  }

  function updateHoleUi() {
    const mode = state.hole.draftMode;
    const enabled = mode !== 'none';
    els.holeNoneBtn.classList.toggle('active', mode === 'none');
    els.holeInternalBtn.classList.toggle('active', mode === 'internal');
    els.holeExternalBtn.classList.toggle('active', mode === 'external');
    els.holeOptions.classList.toggle('hidden', !enabled);
    els.holeWallField.classList.toggle('hidden', mode !== 'external');
    els.holeInsetField.classList.toggle('hidden', mode !== 'internal');
    els.canvas.classList.toggle('hole-editing', enabled && state.mode === 'acrylic');
    if (mode === 'none') {
      els.holeModeHelp.textContent = '타공이 없는 일반 칼선으로 제작합니다.';
      els.holePositionStatus.textContent = '타공 없음';
    } else {
      els.holeModeHelp.textContent = mode === 'internal'
        ? '기본 3 mm 구멍을 칼선 안쪽 2.5 mm에 배치합니다. 가이드를 드래그한 뒤 다시 만들기로 적용하세요.'
        : '기본 3 mm 구멍과 1.5 mm 벽 두께의 투명 고리를 외곽에 결합합니다. 가이드를 드래그한 뒤 다시 만들기로 적용하세요.';
      const applied = !state.hole.dirty && mode === state.hole.appliedMode;
      els.holePositionStatus.textContent = applied ? '적용된 위치' : '미적용 위치 · 다시 만들기 필요';
    }
    els.generateBtn.textContent = enabled ? '타공 위치 적용 · 칼선 다시 만들기' : '칼선 다시 만들기';
  }

  function applyHoleAndGenerate() {
    state.hole.appliedMode = state.hole.draftMode;
    state.hole.appliedXmm = state.hole.draftXmm;
    state.hole.appliedYmm = state.hole.draftYmm;
    state.hole.appliedDiameterMm=clamp(num(els.holeDiameter,3),1.5,12);
    state.hole.appliedWallMm=clamp(num(els.holeWall,1.5),.6,8);
    state.hole.appliedInsetMm=clamp(num(els.holeInset,2.5),.5,15);
    state.hole.dirty = false;
    updateHoleUi();
    generateAcrylic();
  }

  function selectView(view) {
    state.view = view;
    document.querySelectorAll('.view-tab').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  }

  function updateFlatBaseUi() {
    const enabled = !!els.addFlatBase.checked;
    const bordered = state.finishStyle.acrylic === 'bordered';
    els.flatBaseOptions.classList.toggle('hidden', !enabled);
    els.borderlessBaseOptions.classList.toggle('hidden', !enabled || bordered);
    els.borderedBaseOptions.classList.toggle('hidden', !enabled || !bordered);
    const transparent = state.baseGapMode === 'transparent';
    els.baseGapTransparentBtn.classList.toggle('active', transparent);
    els.baseGapFillBtn.classList.toggle('active', !transparent);
    els.baseGapHelp.textContent = transparent
      ? '새로 생긴 바닥 안쪽은 투명하게 두고, 해당 구간 바깥에도 색상 재단여백을 만들지 않습니다.'
      : '새로 생긴 바닥 안쪽과 바깥 재단여백까지 주변 도안 색상으로 이어서 채웁니다.';

    const level = !!state.borderlessBaseLevel;
    els.baseSlopeKeepBtn.classList.toggle('active', !level);
    els.baseSlopeLevelBtn.classList.toggle('active', level);
    els.baseLiftField.classList.toggle('hidden', !level);
    els.baseSlopeHelp.textContent = level
      ? '두 돌출부 중 높은 쪽을 기준으로 아래 이미지를 잘라 수평 밑면을 만듭니다. 추가 올림으로 자르는 높이를 더 위로 조절할 수 있습니다.'
      : '가장 아래로 돌출된 좌·우 부분만 직선으로 연결합니다. 직선 양옆에는 새 투명 밑바닥 픽셀을 만들지 않습니다.';

    const colorMode = state.baseSupportMode === 'color';
    els.baseAnchorColorBtn.classList.toggle('active', colorMode);
    els.baseAnchorFullBtn.classList.toggle('active', !colorMode);
    els.baseColorToleranceField.classList.toggle('hidden', !colorMode);
    els.baseAnchorHelp.textContent = colorMode
      ? '가장 낮은 좌·우 지점 주변과 색이 엄격하게 비슷한 연결 픽셀 덩어리를 찾고, 그 덩어리의 바깥쪽 끝에서 둥근 받침을 내립니다.'
      : '도안 전체에서 가장 왼쪽과 오른쪽으로 돌출된 지점을 받침의 가로 범위로 사용합니다.';
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
    const type = state.stickerBackgroundType;
    const isColor = type === 'color', isImage = type === 'image', isPattern = type === 'pattern';
    els.stickerBackgroundOptions.classList.toggle('hidden', !els.stickerBackgroundEnabled.checked);
    els.stickerBackgroundColorBtn.classList.toggle('active', isColor);
    els.stickerBackgroundImageBtn.classList.toggle('active', isImage);
    els.stickerBackgroundPatternBtn.classList.toggle('active', isPattern);
    els.stickerBackgroundColorField.classList.toggle('hidden', !isColor);
    els.stickerBackgroundImageFields.classList.toggle('hidden', !isImage);
    els.stickerBackgroundPatternFields.classList.toggle('hidden', !isPattern);
    els.stickerBackgroundCustomFields.classList.toggle('hidden', !isImage || els.stickerBackgroundFit.value !== 'custom');
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
    updateHoleUi();

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
          const simplified = simplifyClosed(points, 0.18);
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

  function medianNumber(values) {
    if (!values.length) return -1;
    const sorted = values.slice().sort((a,b)=>a-b);
    return sorted[(sorted.length - 1) >> 1];
  }

  function analyzeBottomProtrusions(mask, w, h) {
    const b=maskBounds(mask,w,h),profile=new Int32Array(w);profile.fill(-1);
    for(let x=b.minX;x<=b.maxX;x++)for(let y=b.maxY;y>=b.minY;y--)if(mask[y*w+x]){profile[x]=y;break;}
    const radius=clamp(Math.round((b.maxX-b.minX+1)*.006),1,4),smooth=new Int32Array(w);smooth.fill(-1);
    for(let x=b.minX;x<=b.maxX;x++){
      const vals=[];for(let xx=Math.max(b.minX,x-radius);xx<=Math.min(b.maxX,x+radius);xx++)if(profile[xx]>=0)vals.push(profile[xx]);
      smooth[x]=medianNumber(vals);
    }
    const center=(b.minX+b.maxX)/2,maxBand=Math.max(2,Math.round((b.maxY-b.minY+1)*.026));
    const minimumSideSpan=Math.max(3,Math.round((b.maxX-b.minX+1)*.022));
    const sideCandidate=(x0,x1,side)=>{
      let sideMax=-1;for(let x=x0;x<=x1;x++)sideMax=Math.max(sideMax,smooth[x]);
      if(sideMax<0)return null;
      let active=[],usedBand=0;
      for(let band=0;band<=maxBand;band++){
        active=[];for(let x=x0;x<=x1;x++)if(smooth[x]>=sideMax-band)active.push(x);
        usedBand=band;if(active.length>=minimumSideSpan||band===maxBand)break;
      }
      if(!active.length)return null;
      // 각 절반에서 최하단에 가까운 픽셀 덩어리의 바깥쪽 끝을 사용합니다.
      // 한쪽 발만 더 낮더라도 반대쪽 절반을 독립적으로 찾으므로 두 점의 실제 높이 차이가 보존됩니다.
      const x=side==='left'?active[0]:active[active.length-1];
      return{x,y:Math.max(0,profile[x]),sideMax,band:usedBand};
    };
    let left=sideCandidate(b.minX,Math.floor(center),'left'),right=sideCandidate(Math.ceil(center),b.maxX,'right');
    if(!left||!right||right.x<=left.x){
      const valid=[];for(let x=b.minX;x<=b.maxX;x++)if(profile[x]>=0)valid.push(x);
      if(valid.length<2)return null;
      const q=Math.max(1,Math.floor(valid.length*.18));
      const lx=valid[Math.min(valid.length-1,q)],rx=valid[Math.max(0,valid.length-1-q)];
      left={x:lx,y:profile[lx],sideMax:smooth[lx],band:maxBand};right={x:rx,y:profile[rx],sideMax:smooth[rx],band:maxBand};
    }
    return{left,right,deltaY:Math.abs(left.y-right.y),robustMax:Math.max(left.sideMax,right.sideMax),band:Math.max(left.band,right.band),bounds:b,profile};
  }

  function nearestBottomPathIndex(path, target) {
    let best=0,bestScore=Infinity;
    for(let i=0;i<path.length;i++){
      const p=path[i],dx=p.x-target.x,dy=p.y-target.y;
      const score=dx*dx+dy*dy*2.4+(p.y<target.y-5?18:0);
      if(score<bestScore){bestScore=score;best=i;}
    }
    return best;
  }

  function applyFlatBase(path, bottom, levelY = null) {
    if (!path || path.length < 6 || polygonArea(path) <= 0 || !bottom) return { path, base: null };
    const leftTarget={x:bottom.left.x,y:bottom.left.y+1},rightTarget={x:bottom.right.x+1,y:bottom.right.y+1};
    const leftIndex=nearestBottomPathIndex(path,leftTarget),rightIndex=nearestBottomPathIndex(path,rightTarget);
    if(leftIndex===rightIndex)return{path,base:null};
    const arc1=arcIndices(path.length,leftIndex,rightIndex),arc2=arcIndices(path.length,rightIndex,leftIndex);
    const avg=arr=>arr.reduce((sum,i)=>sum+path[i].y,0)/Math.max(1,arr.length);
    const bottomArc=avg(arc1)>avg(arc2)?arc1:arc2,keepArc=bottomArc===arc1?arc2:arc1;
    const result=keepArc.map(i=>({...path[i]}));
    if(result.length<3)return{path,base:null};
    const yLeft=levelY==null?leftTarget.y:levelY,yRight=levelY==null?rightTarget.y:levelY;
    const firstIsLeft=Math.abs(result[0].x-leftTarget.x)<=Math.abs(result[0].x-rightTarget.x);
    const a=firstIsLeft?{x:leftTarget.x,y:yLeft}:{x:rightTarget.x,y:yRight};
    const b=firstIsLeft?{x:rightTarget.x,y:yRight}:{x:leftTarget.x,y:yLeft};
    result[0]=a;result[result.length-1]=b;
    return{path:result,base:{x1:Math.min(leftTarget.x,rightTarget.x),x2:Math.max(leftTarget.x,rightTarget.x),y1:yLeft,y2:yRight,deltaY:bottom.deltaY,levelled:levelY!=null,sourceBand:bottom.band}};
  }

  function clipBaseAddedMask(mask, base, w, h) {
    if(!mask||!base)return mask;
    const out=new Uint8Array(mask.length),minX=Math.max(0,Math.floor(base.x1)),maxX=Math.min(w-1,Math.ceil(base.x2));
    for(let y=0;y<h;y++)for(let x=minX;x<=maxX;x++){const i=y*w+x;if(mask[i])out[i]=1;}
    return out;
  }

  function cropCanvasBelow(canvas, y) {
    const cut=Math.max(0,Math.min(canvas.height,Math.floor(y+0.001)));
    if(cut<canvas.height)canvas.getContext('2d').clearRect(0,cut,canvas.width,canvas.height-cut);
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


  function nearestMaskPixel(mask, w, h, x, y, maxRadius = 12) {
    x = Math.round(x); y = Math.round(y);
    if (x >= 0 && y >= 0 && x < w && y < h && mask[y*w+x]) return {x,y};
    for (let r=1;r<=maxRadius;r++) {
      for (let yy=y-r;yy<=y+r;yy++) for (let xx=x-r;xx<=x+r;xx++) {
        if (xx<0||yy<0||xx>=w||yy>=h||Math.max(Math.abs(xx-x),Math.abs(yy-y))!==r) continue;
        if (mask[yy*w+xx]) return {x:xx,y:yy};
      }
    }
    return null;
  }

  function sampleRobustColor(imageData, mask, w, h, x, y, radius = 4) {
    const samples=[],d=imageData.data;
    for(let yy=Math.max(0,y-radius);yy<=Math.min(h-1,y+radius);yy++) for(let xx=Math.max(0,x-radius);xx<=Math.min(w-1,x+radius);xx++){
      const dx=xx-x,dy=yy-y,i=yy*w+xx,a=d[i*4+3];
      if(dx*dx+dy*dy>radius*radius||!mask[i]||a<96)continue;
      samples.push({r:d[i*4],g:d[i*4+1],b:d[i*4+2],weight:(a/255)/(1+Math.hypot(dx,dy)*.45)});
    }
    const t=(y*w+x)*4;
    return dominantColor(samples,18,[d[t]||0,d[t+1]||0,d[t+2]||0]);
  }

  function floodSimilarComponent(imageData, mask, w, h, seedX, seedY, tolerance) {
    const seed=nearestMaskPixel(mask,w,h,seedX,seedY,16);
    if(!seed)return null;
    const d=imageData.data,base=sampleRobustColor(imageData,mask,w,h,seed.x,seed.y,4);
    const tol=Math.max(4,tolerance),baseSq=Math.pow(tol*1.85,2),stepSq=Math.pow(tol*1.18,2);
    const seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
    const start=seed.y*w+seed.x;queue[tail++]=start;seen[start]=1;
    let minX=seed.x,maxX=seed.x,minY=seed.y,maxY=seed.y,count=0,leftPoint={x:seed.x,y:seed.y},rightPoint={x:seed.x,y:seed.y};
    const dirs=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]];
    while(head<tail){
      const i=queue[head++],x=i%w,y=(i/w)|0,t=i*4,cr=d[t],cg=d[t+1],cb=d[t+2],ca=d[t+3];
      count++;if(x<minX||(x===minX&&y>leftPoint.y)){minX=x;leftPoint={x,y};}if(x>maxX||(x===maxX&&y>rightPoint.y)){maxX=x;rightPoint={x,y};}minY=Math.min(minY,y);maxY=Math.max(maxY,y);
      for(const[dx,dy]of dirs){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;const ni=ny*w+nx;if(seen[ni]||!mask[ni])continue;const nt=ni*4,a=d[nt+3];if(a<104)continue;
        const nr=d[nt],ng=d[nt+1],nb=d[nt+2];
        if(colorDistanceSq(nr,ng,nb,base[0],base[1],base[2])>baseSq)continue;
        if(ca>=104&&colorDistanceSq(nr,ng,nb,cr,cg,cb)>stepSq)continue;
        seen[ni]=1;queue[tail++]=ni;
      }
    }
    return {mask:seen,minX,maxX,minY,maxY,count,leftPoint,rightPoint,color:base};
  }

  function bottomSideSeeds(mask,w,h){
    const b=maskBounds(mask,w,h),tol=Math.max(2,Math.round((b.maxY-b.minY+1)*.025));
    let left=null,right=null;
    for(let y=Math.max(0,b.maxY-tol);y<=b.maxY;y++)for(let x=b.minX;x<=b.maxX;x++){
      if(!mask[y*w+x])continue;
      if(!left||x<left.x||(x===left.x&&y>left.y))left={x,y};
      if(!right||x>right.x||(x===right.x&&y>right.y))right={x,y};
    }
    return {left:left||{x:b.minX,y:b.maxY},right:right||{x:b.maxX,y:b.maxY},bounds:b};
  }

  function makeRoundedRectMask(w,h,x1,y1,x2,y2,radius){
    const out=new Uint8Array(w*h);x1=clamp(Math.round(x1),0,w-1);x2=clamp(Math.round(x2),0,w-1);y1=clamp(Math.round(y1),0,h-1);y2=clamp(Math.round(y2),0,h-1);
    if(x2<x1)[x1,x2]=[x2,x1];if(y2<y1)[y1,y2]=[y2,y1];
    const r=clamp(radius,0,Math.min((x2-x1+1)/2,(y2-y1+1)/2)),rr=r*r;
    for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++){
      const cx=x<x1+r?x1+r:x>x2-r?x2-r:x,cy=y<y1+r?y1+r:y>y2-r?y2-r:y;
      const dx=x-cx,dy=y-cy;if(dx*dx+dy*dy<=rr+.25)out[y*w+x]=1;
    }
    return out;
  }

  function buildBorderedSupport(originalData, objectMask, baseCutMask, w, h, borderPx, mode, tolerance) {
    const seeds=bottomSideSeeds(objectMask,w,h),b=seeds.bounds;
    let leftX=b.minX,rightX=b.maxX,leftY=seeds.left.y,rightY=seeds.right.y,source='full';
    if(mode==='color'){
      const lc=floodSimilarComponent(originalData,objectMask,w,h,seeds.left.x,seeds.left.y,tolerance);
      const rc=floodSimilarComponent(originalData,objectMask,w,h,seeds.right.x,seeds.right.y,tolerance);
      if(lc&&rc&&lc.count>=5&&rc.count>=5){leftX=lc.leftPoint.x;leftY=lc.leftPoint.y;rightX=rc.rightPoint.x;rightY=rc.rightPoint.y;source='color';}
    }
    const sidePad=Math.max(1,borderPx),x1=clamp(leftX-sidePad,0,w-1),x2=clamp(rightX+sidePad,0,w-1);
    const bottomY=clamp(b.maxY+Math.max(2,borderPx),0,h-2);
    let topY=Math.min(leftY,rightY,b.maxY-Math.max(2,borderPx*.55));
    topY=clamp(topY,0,bottomY-2);
    const radius=clamp(Math.min(Math.max(2,borderPx*.52),(bottomY-topY+1)*.46,(x2-x1+1)*.10),1,Math.max(1,borderPx));
    const supportMask=makeRoundedRectMask(w,h,x1,topY,x2,bottomY,radius);
    let combined=unionMask(baseCutMask,supportMask);
    const joint=Math.max(1,Math.round(Math.min(borderPx*.28,4)));
    combined=erodeMask(dilateMask(combined,w,h,joint),w,h,joint);
    const supportOnly=differenceMask(combined,baseCutMask);
    const interiorRadius=Math.max(1,Math.round(borderPx));
    const supportInterior=erodeMask(supportMask,w,h,interiorRadius);
    return {mask:combined,supportMask,supportOnly,supportInterior,base:{x1,x2,topY,bottomY,radius,source}};
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

  function fitColorPlane(samples, fallback) {
    if (!samples || samples.length < 3) {
      return { r0:fallback[0], g0:fallback[1], b0:fallback[2], ru:0, rv:0, gu:0, gv:0, bu:0, bv:0, minR:fallback[0], maxR:fallback[0], minG:fallback[1], maxG:fallback[1], minB:fallback[2], maxB:fallback[2] };
    }
    let sw=0,mu=0,mv=0,mr=0,mg=0,mb=0,minR=255,maxR=0,minG=255,maxG=0,minB=255,maxB=0;
    for(const q of samples){const wt=q.weight||1;sw+=wt;mu+=q.u*wt;mv+=q.v*wt;mr+=q.r*wt;mg+=q.g*wt;mb+=q.b*wt;minR=Math.min(minR,q.r);maxR=Math.max(maxR,q.r);minG=Math.min(minG,q.g);maxG=Math.max(maxG,q.g);minB=Math.min(minB,q.b);maxB=Math.max(maxB,q.b);}
    mu/=sw;mv/=sw;mr/=sw;mg/=sw;mb/=sw;
    let suu=.02,svv=.02,suv=0,sur=0,svr=0,sug=0,svg=0,sub=0,svb=0;
    for(const q of samples){const wt=q.weight||1,u=q.u-mu,v=q.v-mv; suu+=u*u*wt;svv+=v*v*wt;suv+=u*v*wt;sur+=u*(q.r-mr)*wt;svr+=v*(q.r-mr)*wt;sug+=u*(q.g-mg)*wt;svg+=v*(q.g-mg)*wt;sub+=u*(q.b-mb)*wt;svb+=v*(q.b-mb)*wt;}
    const det=suu*svv-suv*suv;
    const solve=(cu,cv)=>Math.abs(det)<1e-8?[0,0]:[(cu*svv-cv*suv)/det,(cv*suu-cu*suv)/det];
    let [ru,rv]=solve(sur,svr),[gu,gv]=solve(sug,svg),[bu,bv]=solve(sub,svb);
    const cap=10;ru=clamp(ru,-cap,cap);rv=clamp(rv,-cap,cap);gu=clamp(gu,-cap,cap);gv=clamp(gv,-cap,cap);bu=clamp(bu,-cap,cap);bv=clamp(bv,-cap,cap);
    return {r0:mr-ru*mu-rv*mv,g0:mg-gu*mu-gv*mv,b0:mb-bu*mu-bv*mv,ru,rv,gu,gv,bu,bv,minR,maxR,minG,maxG,minB,maxB};
  }

  function evalColorPlane(plane,u,v){
    const pad=18;
    return [
      clamp(plane.r0+plane.ru*u+plane.rv*v,plane.minR-pad,plane.maxR+pad),
      clamp(plane.g0+plane.gu*u+plane.gv*v,plane.minG-pad,plane.maxG+pad),
      clamp(plane.b0+plane.bu*u+plane.bv*v,plane.minB-pad,plane.maxB+pad)
    ].map(v=>Math.round(clamp(v,0,255)));
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
      for(let depth=first;depth<=Math.min(config.radius,first+6);depth++){
        const sx=Math.round(x+frame.nx*depth+frame.tx*lateral),sy=Math.round(y+frame.ny*depth+frame.ty*lateral);
        if(sx<0||sy<0||sx>=w||sy>=h) continue;
        const i=sy*w+sx,a=data[i*4+3]; if(!objectMask[i]||a<config.minAlpha) continue;
        const r=data[i*4],g=data[i*4+1],b=data[i*4+2];
        if(colorDistanceSq(r,g,b,ref[0],ref[1],ref[2])>Math.pow(config.colorClusterDistance*1.55,2)&&depth>first+1) break;
        const centerBoost=lateral===0?3.2:Math.abs(lateral)===1?1.8:1;
        const weight=centerBoost*Math.pow(a/255,2)/(1+first*.55+(depth-first)*.32+Math.abs(lateral)*.30);
        const q={r,g,b,u:lateral,v:depth,weight};samples.push(q);near.push(q);
      }
    }
    for(let v=1;v<=config.radius;v++){
      const localSpread=Math.min(config.tangentSpread+3,2+Math.floor(v*.62));
      for(let u=-localSpread;u<=localSpread;u++){
        const sx=Math.round(x+frame.nx*v+frame.tx*u),sy=Math.round(y+frame.ny*v+frame.ty*u);
        if(sx<0||sy<0||sx>=w||sy>=h) continue;
        const i=sy*w+sx,a=data[i*4+3]; if(!objectMask[i]||a<config.minAlpha) continue;
        samples.push({r:data[i*4],g:data[i*4+1],b:data[i*4+2],u,v,weight:Math.pow(a/255,2)/(1+v*.38+Math.abs(u)*.18)});
      }
    }
    const self=(y*w+x)*4;
    const anchor=dominantColor(near,config.colorClusterDistance*.82,[data[self],data[self+1],data[self+2]]);
    if(samples.length<4) return {c1:anchor,c2:null,u1:0,v1:1,u2:0,v2:1,w1:1,w2:0,plane1:fitColorPlane(samples,anchor),plane2:null};
    let far=null,farScore=0;
    for(const q of samples){const d=colorDistanceSq(q.r,q.g,q.b,anchor[0],anchor[1],anchor[2]);const score=d*Math.sqrt(q.weight);if(score>farScore){farScore=score;far=q;}}
    if(!far||farScore<Math.pow(config.colorClusterDistance*1.12,2)*.14){
      return {c1:anchor,c2:null,u1:0,v1:1,u2:0,v2:1,w1:1,w2:0,plane1:fitColorPlane(samples,anchor),plane2:null};
    }
    let c1=anchor.slice(),c2=[far.r,far.g,far.b],stats=null;
    for(let iter=0;iter<5;iter++){
      const a={r:0,g:0,b:0,u:0,v:0,w:0},b={r:0,g:0,b:0,u:0,v:0,w:0};
      for(const q of samples){const d1=colorDistanceSq(q.r,q.g,q.b,c1[0],c1[1],c1[2]),d2=colorDistanceSq(q.r,q.g,q.b,c2[0],c2[1],c2[2]);const z=d1<=d2?a:b;z.r+=q.r*q.weight;z.g+=q.g*q.weight;z.b+=q.b*q.weight;z.u+=q.u*q.weight;z.v+=q.v*q.weight;z.w+=q.weight;}
      if(a.w)c1=[a.r/a.w,a.g/a.w,a.b/a.w];if(b.w)c2=[b.r/b.w,b.g/b.w,b.b/b.w];stats={a,b};
    }
    if(!stats||!stats.a.w||!stats.b.w){
      return {c1:anchor,c2:null,u1:0,v1:1,u2:0,v2:1,w1:1,w2:0,plane1:fitColorPlane(samples,anchor),plane2:null};
    }
    const total=stats.a.w+stats.b.w,sep=colorDistanceSq(c1[0],c1[1],c1[2],c2[0],c2[1],c2[2]);
    if(Math.min(stats.a.w,stats.b.w)/total<.10||sep<Math.pow(config.colorClusterDistance*.92,2)){
      return {c1:anchor,c2:null,u1:stats.a.u/stats.a.w,v1:stats.a.v/stats.a.w,u2:0,v2:1,w1:1,w2:0,plane1:fitColorPlane(samples,anchor),plane2:null};
    }
    const dAnchor1=colorDistanceSq(c1[0],c1[1],c1[2],anchor[0],anchor[1],anchor[2]);
    const dAnchor2=colorDistanceSq(c2[0],c2[1],c2[2],anchor[0],anchor[1],anchor[2]);
    if(dAnchor2<dAnchor1){[c1,c2]=[c2,c1];stats={a:stats.b,b:stats.a};}
    const group1=[],group2=[];
    for(const q of samples){
      const d1=colorDistanceSq(q.r,q.g,q.b,c1[0],c1[1],c1[2]),d2=colorDistanceSq(q.r,q.g,q.b,c2[0],c2[1],c2[2]);
      (d1<=d2?group1:group2).push(q);
    }
    return {
      c1:c1.map(Math.round),c2:c2.map(Math.round),
      u1:stats.a.u/stats.a.w,v1:stats.a.v/stats.a.w,u2:stats.b.u/stats.b.w,v2:stats.b.v/stats.b.w,
      w1:stats.a.w/total,w2:stats.b.w/total,
      plane1:fitColorPlane(group1,c1),plane2:fitColorPlane(group2,c2)
    };
  }

  function prepareBoundaryModels(originalData, objectMask, boundaryMask, w, h, config) {
    const n=w*h;
    const valid=new Uint8Array(n),has2=new Uint8Array(n),c1r=new Uint8Array(n),c1g=new Uint8Array(n),c1b=new Uint8Array(n),c2r=new Uint8Array(n),c2g=new Uint8Array(n),c2b=new Uint8Array(n);
    const nx=new Float32Array(n),ny=new Float32Array(n),tx=new Float32Array(n),ty=new Float32Array(n),u1=new Float32Array(n),v1=new Float32Array(n),u2=new Float32Array(n),v2=new Float32Array(n),w1=new Float32Array(n),w2=new Float32Array(n);
    const plane1=new Array(n),plane2=new Array(n);
    for(let i=0;i<n;i++){
      if(!boundaryMask[i]) continue;
      const x=i%w,y=(i/w)|0,frame=estimateBoundaryFrame(objectMask,boundaryMask,w,h,x,y,config.frameRadius);
      const m=buildBoundaryModel(originalData,objectMask,boundaryMask,w,h,x,y,config,frame);
      valid[i]=1;nx[i]=frame.nx;ny[i]=frame.ny;tx[i]=frame.tx;ty[i]=frame.ty;c1r[i]=m.c1[0];c1g[i]=m.c1[1];c1b[i]=m.c1[2];u1[i]=m.u1;v1[i]=m.v1;w1[i]=m.w1;plane1[i]=m.plane1;
      if(m.c2){has2[i]=1;c2r[i]=m.c2[0];c2g[i]=m.c2[1];c2b[i]=m.c2[2];u2[i]=m.u2;v2[i]=m.v2;w2[i]=m.w2;plane2[i]=m.plane2;}
    }
    return {valid,has2,c1r,c1g,c1b,c2r,c2g,c2b,nx,ny,tx,ty,u1,v1,u2,v2,w1,w2,plane1,plane2};
  }

  function modelColorAt(models, seed, x, y, w) {
    const sx=seed%w,sy=(seed/w)|0,dx=x-sx,dy=y-sy;
    const u=dx*models.tx[seed]+dy*models.ty[seed],v=dx*models.nx[seed]+dy*models.ny[seed];
    if(!models.has2[seed]){
      const plane=models.plane1[seed];
      return plane?evalColorPlane(plane,u,v):[models.c1r[seed],models.c1g[seed],models.c1b[seed]];
    }
    const d1=(u-models.u1[seed])**2+.72*(v-models.v1[seed])**2-.35*Math.log(.001+models.w1[seed]);
    const d2=(u-models.u2[seed])**2+.72*(v-models.v2[seed])**2-.35*Math.log(.001+models.w2[seed]);
    const plane=d1<=d2?models.plane1[seed]:models.plane2[seed];
    if(plane)return evalColorPlane(plane,u,v);
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

  function smoothBleedGradient(imageData, activeMask, w, h, passes) {
    if (passes <= 0) return;
    const d=imageData.data;
    const dirs=[[-1,0,1],[1,0,1],[0,-1,1],[0,1,1],[-1,-1,.68],[1,-1,.68],[-1,1,.68],[1,1,.68]];
    for(let pass=0;pass<passes;pass++){
      const src=new Uint8ClampedArray(d);
      for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
        const i=y*w+x;if(!activeMask[i])continue;const t=i*4,cr=src[t],cg=src[t+1],cb=src[t+2];
        let rr=cr*2.15,gg=cg*2.15,bb=cb*2.15,sw=2.15;
        for(const[dx,dy,spatial]of dirs){const ni=(y+dy)*w+x+dx;if(!activeMask[ni])continue;const nt=ni*4,dr=src[nt]-cr,dg=src[nt+1]-cg,db=src[nt+2]-cb,cd=dr*dr+dg*dg+db*db;
          const edge=cd<2300?1:cd<6400?.32:.035;const wt=spatial*edge;rr+=src[nt]*wt;gg+=src[nt+1]*wt;bb+=src[nt+2]*wt;sw+=wt;}
        d[t]=Math.round(rr/sw);d[t+1]=Math.round(gg/sw);d[t+2]=Math.round(bb/sw);
      }
    }
  }

  function propagatedColor(models, source, i, x, y, w, quality) {
    const seed=source[i];if(seed<0)return[0,0,0];
    const base=modelColorAt(models,seed,x,y,w),radius=quality==='precise'?2:1;
    let rr=base[0]*2.4,gg=base[1]*2.4,bb=base[2]*2.4,sw=2.4;
    const seen=new Set([seed]);
    for(let dy=-radius;dy<=radius;dy++)for(let dx=-radius;dx<=radius;dx++){
      if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;if(nx<0||ny<0)continue;const ni=ny*w+nx;if(ni<0||ni>=source.length)continue;const s2=source[ni];if(s2<0||seen.has(s2))continue;seen.add(s2);
      const c=modelColorAt(models,s2,x,y,w),cd=colorDistanceSq(c[0],c[1],c[2],base[0],base[1],base[2]);
      if(cd>5200)continue;const wt=(1/(1+Math.hypot(dx,dy)))*(cd<1800?1:.35);rr+=c[0]*wt;gg+=c[1]*wt;bb+=c[2]*wt;sw+=wt;
    }
    return [Math.round(rr/sw),Math.round(gg/sw),Math.round(bb/sw)];
  }

  function makeBleed(originalData, objectMask, outerMask, holeMask, w, h, bleedPx, includeHoles, baseNoBleed, protectedTransparentMask=null, transparentSeedMask=null) {
    const n=w*h,expandedOuter=dilateMask(outerMask,w,h,bleedPx),expandedObject=dilateMask(objectMask,w,h,bleedPx),allowed=new Uint8Array(n),noWrite=new Uint8Array(n);
    for(let i=0;i<n;i++){
      if(objectMask[i])continue;
      const inHole=holeMask[i]===1;
      const ok=inHole?(includeHoles&&expandedObject[i]):(outerMask[i]||expandedOuter[i]);
      if(!ok||(baseNoBleed&&baseNoBleed[i]))continue;
      allowed[i]=1;
      if((protectedTransparentMask&&protectedTransparentMask[i])||(transparentSeedMask&&transparentSeedMask[i]))noWrite[i]=1;
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
        const transparencyPenalty=noWrite[ni]?0.05:0;
        const nc=node.cost+step*(1+transparencyPenalty+Math.max(0,-.05-align)*1.2+lateral*.08);if(nc+1e-4<cost[ni]){cost[ni]=nc;source[ni]=seed;heap.push(ni,nc);}
      }
    }
    const out=new ImageData(w,h),od=out.data,src=originalData.data,printMask=new Uint8Array(n),active=new Uint8Array(n),quality=els.processingQuality?.value||'fast';
    for(let i=0;i<n;i++){const t=i*4,x=i%w,y=(i/w)|0;
      if(objectMask[i]){printMask[i]=1;if(models.valid[i]&&src[t+3]<248){const c=modelColorAt(models,i,x,y,w);od[t]=c[0];od[t+1]=c[1];od[t+2]=c[2];od[t+3]=255;}}
      else if(source[i]>=0&&!noWrite[i]){const c=propagatedColor(models,source,i,x,y,w,quality);od[t]=c[0];od[t+1]=c[1];od[t+2]=c[2];od[t+3]=255;printMask[i]=1;active[i]=1;}
    }
    smoothBleedGradient(out,active,w,h,quality==='precise'?7:quality==='balanced'?5:3);
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

  function normalizedVector(x,y,fallback={x:1,y:0}){const l=Math.hypot(x,y);return l>1e-7?{x:x/l,y:y/l}:{...fallback};}

  function rawArc(raw,start,end){
    const out=[raw[start]];let i=start;
    while(i!==end){i=(i+1)%raw.length;out.push(raw[i]);if(out.length>raw.length+1)break;}
    return out;
  }

  function anchorIndices(raw,anchors){
    const out=[];
    for(const p of anchors){
      let idx=raw.indexOf(p);
      if(idx<0){let best=0,bestD=Infinity;for(let i=0;i<raw.length;i++){const d=(raw[i].x-p.x)**2+(raw[i].y-p.y)**2;if(d<bestD){bestD=d;best=i;}}idx=best;}
      out.push(idx);
    }
    return out;
  }

  function maxChordDeviation(points) {
    if(!points||points.length<3)return 0;
    const a=points[0],b=points[points.length-1],dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);
    if(len<1e-6)return 0;
    let max=0;
    for(let i=1;i<points.length-1;i++)max=Math.max(max,Math.abs(dy*points[i].x-dx*points[i].y+b.x*a.y-b.y*a.x)/len);
    return max;
  }

  function fitBezierHandles(points,t0,t1){
    const p0=points[0],p3=points[points.length-1],chord=Math.hypot(p3.x-p0.x,p3.y-p0.y);
    if(points.length<3||chord<.5)return{h0:chord/3,h1:chord/3};
    const cumulative=[0];let total=0;
    for(let i=1;i<points.length;i++){total+=Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y);cumulative.push(total);}
    if(total<1e-5)return{h0:chord/3,h1:chord/3};
    let c00=1e-6,c01=0,c11=1e-6,x0=0,x1=0;
    for(let i=1;i<points.length-1;i++){
      const t=cumulative[i]/total,u=1-t,b0=u*u*u,b1=3*u*u*t,b2=3*u*t*t,b3=t*t*t;
      const bx=(b0+b1)*p0.x+(b2+b3)*p3.x,by=(b0+b1)*p0.y+(b2+b3)*p3.y;
      const a0x=t0.x*b1,a0y=t0.y*b1,a1x=-t1.x*b2,a1y=-t1.y*b2,rx=points[i].x-bx,ry=points[i].y-by;
      c00+=a0x*a0x+a0y*a0y;c01+=a0x*a1x+a0y*a1y;c11+=a1x*a1x+a1y*a1y;x0+=a0x*rx+a0y*ry;x1+=a1x*rx+a1y*ry;
    }
    const det=c00*c11-c01*c01;let h0=chord/3,h1=chord/3;
    if(Math.abs(det)>1e-8){h0=(x0*c11-x1*c01)/det;h1=(x1*c00-x0*c01)/det;}
    const minH=Math.max(.25,chord*.045),maxH=Math.max(minH,chord*1.15);
    if(!Number.isFinite(h0)||h0<=0)h0=chord/3;if(!Number.isFinite(h1)||h1<=0)h1=chord/3;
    return{h0:clamp(h0,minH,maxH),h1:clamp(h1,minH,maxH)};
  }

  function cubicAt(p0,c1,c2,p3,t){
    const u=1-t,u2=u*u,t2=t*t;
    return{x:u2*u*p0.x+3*u2*t*c1.x+3*u*t2*c2.x+t2*t*p3.x,y:u2*u*p0.y+3*u2*t*c1.y+3*u*t2*c2.y+t2*t*p3.y};
  }

  function fittedArcError(arc,p0,p1,startDir,endDir,fit){
    if(!arc||arc.length<3)return{error:0,index:-1};
    const c1={x:p0.x+startDir.x*fit.h0,y:p0.y+startDir.y*fit.h0},c2={x:p1.x-endDir.x*fit.h1,y:p1.y-endDir.y*fit.h1};
    const cumulative=[0];let total=0;
    for(let i=1;i<arc.length;i++){total+=Math.hypot(arc[i].x-arc[i-1].x,arc[i].y-arc[i-1].y);cumulative.push(total);}
    if(total<1e-6)return{error:0,index:-1};
    let maxError=0,maxIndex=-1;
    for(let i=1;i<arc.length-1;i++){
      const q=cubicAt(p0,c1,c2,p1,cumulative[i]/total),error=Math.hypot(q.x-arc[i].x,q.y-arc[i].y);
      if(error>maxError){maxError=error;maxIndex=i;}
    }
    return{error:maxError,index:maxIndex};
  }

  // RDP가 줄인 꼭짓점을 그대로 직선으로 잇지 않고, 원본 외곽에 맞춘 cubic Bézier의 오차가
  // 커지는 구간에만 제어용 앵커를 되돌려 넣습니다. 따라서 점 수는 줄면서도 곡선 추세는 유지됩니다.
  function refineCurveAnchors(raw,anchors,epsilon){
    let current=anchors.slice();
    const errorLimit=clamp(.65+epsilon*.10,.8,2.6),maxAnchors=Math.min(raw.length,768);
    for(let iteration=0;iteration<7&&current.length<maxAnchors;iteration++){
      const meta=curveMetadata(raw,current,epsilon),idxs=anchorIndices(raw,current),next=[];let changed=false;
      for(let i=0;i<current.length;i++){
        const j=(i+1)%current.length,p0=current[i],p1=current[j],arc=rawArc(raw,idxs[i],idxs[j]),m0=meta.nodes[i],m1=meta.nodes[j],fit=meta.segments[i];
        next.push(p0);
        if(arc.length<5||next.length>=maxAnchors)continue;
        const startDir=m0.concave?m0.outDir:m0.smoothDir,endDir=m1.concave?m1.inDir:m1.smoothDir;
        const measured=fittedArcError(arc,p0,p1,startDir,endDir,fit);
        if(measured.index>0&&measured.index<arc.length-1&&measured.error>errorLimit){next.push(arc[measured.index]);changed=true;}
      }
      current=next;
      if(!changed)break;
    }
    return current;
  }

  function curveMetadata(raw, anchors, epsilon) {
    const n=raw.length,sign=Math.sign(polygonArea(raw))||1,idxs=anchorIndices(raw,anchors);
    const protectedIndices=concaveCornerIndices(raw,Math.max(.1,epsilon)),protectedSet=new Set(protectedIndices);
    const window=clamp(Math.round(2+epsilon*.72),2,Math.max(2,Math.min(24,Math.floor(n/8))));
    const nodes=[];
    for(let ai=0;ai<anchors.length;ai++){
      const p=anchors[ai],idx=idxs[ai],before=raw[(idx-window+n)%n],after=raw[(idx+window)%n];
      const inDir=normalizedVector(p.x-before.x,p.y-before.y),outDir=normalizedVector(after.x-p.x,after.y-p.y,inDir),smoothDir=normalizedVector(after.x-before.x,after.y-before.y,outDir);
      const v1=normalizedVector(p.x-before.x,p.y-before.y),v2=normalizedVector(after.x-p.x,after.y-p.y),dot=clamp(v1.x*v2.x+v1.y*v2.y,-1,1),turn=Math.acos(dot);
      const cross=(p.x-before.x)*(after.y-p.y)-(p.y-before.y)*(after.x-p.x);
      let nearProtected=false;for(const pi of protectedIndices){const d=Math.min((idx-pi+n)%n,(pi-idx+n)%n);if(d<=window){nearProtected=true;break;}}
      const concave=nearProtected||(cross*sign<0&&turn>.26);
      nodes.push({inDir,outDir,smoothDir,concave});
    }
    const segments=[];
    for(let i=0;i<anchors.length;i++){
      const j=(i+1)%anchors.length,arc=rawArc(raw,idxs[i],idxs[j]);
      const startDir=nodes[i].concave?nodes[i].outDir:nodes[i].smoothDir;
      const endDir=nodes[j].concave?nodes[j].inDir:nodes[j].smoothDir;
      const fit=fitBezierHandles(arc,startDir,endDir);
      fit.linear=arc.length>=3&&Math.hypot(anchors[j].x-anchors[i].x,anchors[j].y-anchors[i].y)>=6&&maxChordDeviation(arc)<=.14;
      segments.push(fit);
    }
    return {nodes,segments,epsilon};
  }

  function attachCurveMetadata(raw, path, epsilon){
    const meta=curveMetadata(raw,path,epsilon);
    try{Object.defineProperty(path,'_curveMeta',{value:meta,writable:true,configurable:true,enumerable:false});}catch(_){path._curveMeta=meta;}
    return path;
  }

  function simplifyCutPaths(paths,ppm){
    const eps=Math.max(.02,num(els.cutSimplify,.25)*ppm);
    return paths.map(raw=>{
      const simplified=eps<=.06?raw.slice():simplifyClosedPreserveConcave(raw,eps);
      const curveAnchors=eps<=.06?simplified:refineCurveAnchors(raw,simplified,eps);
      return attachCurveMetadata(raw,curveAnchors,eps);
    }).filter(p=>p.length>=3&&Math.abs(polygonArea(p))>3);
  }

  function getCutSmoothAmount() { return clamp(num(els.cutSmooth, 35) / 100, 0, 1); }

  function blendDirection(a,b,t){return normalizedVector(a.x*(1-t)+b.x*t,a.y*(1-t)+b.y*t,b);}

  function curveSegments(path, smoothAmount = getCutSmoothAmount()) {
    const n=path.length;if(n<2)return[];
    const amount=clamp(smoothAmount,0,1),meta=path._curveMeta;
    if(meta&&meta.nodes&&meta.nodes.length===n){
      const segments=[];
      for(let i=0;i<n;i++){
        const p0=path[i],p1=path[(i+1)%n],m0=meta.nodes[i],m1=meta.nodes[(i+1)%n],fit=meta.segments?.[i];
        if(fit?.linear){segments.push({p0,p1,linear:true});continue;}
        const out=m0.concave?blendDirection(m0.outDir,m0.smoothDir,amount):m0.smoothDir;
        const incoming=m1.concave?blendDirection(m1.inDir,m1.smoothDir,amount):m1.smoothDir;
        const chord=Math.hypot(p1.x-p0.x,p1.y-p0.y);
        let h0=fit?.h0??chord/3,h1=fit?.h1??chord/3;
        const smoothScale=.96+.12*amount;h0*=smoothScale;h1*=smoothScale;
        if(m0.concave&&amount<.2)h0=Math.min(h0,chord*.46);
        if(m1.concave&&amount<.2)h1=Math.min(h1,chord*.46);
        h0=clamp(h0,.2,Math.max(.2,chord*1.15));h1=clamp(h1,.2,Math.max(.2,chord*1.15));
        const c1={x:p0.x+out.x*h0,y:p0.y+out.y*h0},c2={x:p1.x-incoming.x*h1,y:p1.y-incoming.y*h1};
        segments.push({p0,c1,c2,p1,linear:false});
      }
      return segments;
    }
    const segments=[];
    for(let i=0;i<n;i++){
      const p0=path[i],p1=path[(i+1)%n],prev=path[(i-1+n)%n],next=path[(i+2)%n],base=.78+.22*amount;
      const c1={x:p0.x+(p1.x-prev.x)*base/6,y:p0.y+(p1.y-prev.y)*base/6},c2={x:p1.x-(next.x-p0.x)*base/6,y:p1.y-(next.y-p0.y)*base/6};
      segments.push({p0,c1,c2,p1,linear:false});
    }
    return segments;
  }

  function translatePaths(paths,dx,dy){
    return paths.map(p=>{
      const out=p.map(q=>({x:q.x+dx,y:q.y+dy}));
      if(p._curveMeta)try{Object.defineProperty(out,'_curveMeta',{value:p._curveMeta,writable:true,configurable:true,enumerable:false});}catch(_){out._curveMeta=p._curveMeta;}
      return out;
    });
  }

  function unionMask(a,b){const out=new Uint8Array(a.length);for(let i=0;i<out.length;i++)out[i]=a[i]||b[i]?1:0;return out;}
  function intersectMask(a,b){const out=new Uint8Array(a.length);for(let i=0;i<out.length;i++)if(a[i]&&b[i])out[i]=1;return out;}
  function makeCircleMask(w,h,cx,cy,r){
    const out=new Uint8Array(w*h),rr=r*r,minX=Math.max(0,Math.floor(cx-r-1)),maxX=Math.min(w-1,Math.ceil(cx+r+1)),minY=Math.max(0,Math.floor(cy-r-1)),maxY=Math.min(h-1,Math.ceil(cy+r+1));
    for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){const dx=x+.5-cx,dy=y+.5-cy;if(dx*dx+dy*dy<=rr)out[y*w+x]=1;}
    return out;
  }
  function circlePath(cx,cy,r,clockwise=false){
    const count=32,out=[];for(let i=0;i<count;i++){const a=(clockwise?-1:1)*i*Math.PI*2/count-Math.PI/2;out.push({x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r});}
    return out;
  }
  function clearCanvasWithMask(canvas,mask){
    if(!mask)return;const c=canvas.getContext('2d',{willReadFrequently:true}),id=c.getImageData(0,0,canvas.width,canvas.height),d=id.data;
    for(let i=0;i<mask.length;i++)if(mask[i])d[i*4+3]=0;c.putImageData(id,0,0);
  }
  function maskBounds(mask,w,h){let minX=w,minY=h,maxX=-1,maxY=-1,sx=0,sy=0,count=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(!mask[y*w+x])continue;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);sx+=x;sy+=y;count++;}return count?{minX,minY,maxX,maxY,cx:sx/count,cy:sy/count}:{minX:0,minY:0,maxX:w-1,maxY:h-1,cx:w/2,cy:h/2};}
  function boundaryPointList(mask,w,h,step=2){const b=makeBoundaryMask(mask,w,h),out=[];let k=0;for(let i=0;i<b.length;i++)if(b[i]&&((k++)%step===0))out.push({x:i%w,y:(i/w)|0});return out;}
  function nearestPoint(points,x,y){let best=null,bestD=Infinity;for(const p of points){const d=(p.x-x)**2+(p.y-y)**2;if(d<bestD){bestD=d;best=p;}}return best;}
  function getHoleSpec(ppm,applied=false){const diameter=applied?state.hole.appliedDiameterMm:clamp(num(els.holeDiameter,3),1.5,12),wall=applied?state.hole.appliedWallMm:clamp(num(els.holeWall,1.5),.6,8),inset=applied?state.hole.appliedInsetMm:clamp(num(els.holeInset,2.5),.5,15);return{diameterMm:diameter,wallMm:wall,insetMm:inset,innerR:diameter*ppm/2,wallPx:wall*ppm,outerR:(diameter/2+wall)*ppm,insetPx:inset*ppm};}
  function snapInternal(mask,w,h,x,y,required,insideDistance=null){
    const dist=insideDistance||distanceToMask(mask,w,h,0),ok=(xx,yy)=>xx>=0&&yy>=0&&xx<w&&yy<h&&mask[Math.round(yy)*w+Math.round(xx)]&&dist[Math.round(yy)*w+Math.round(xx)]>required*required;
    x=clamp(x,0,w-1);y=clamp(y,0,h-1);if(ok(x,y))return{x,y};
    const maxR=Math.max(w,h);for(let r=2;r<maxR;r+=2){const samples=Math.max(16,Math.ceil(r*.8));for(let j=0;j<samples;j++){const a=j*Math.PI*2/samples,xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r;if(ok(xx,yy))return{x:xx,y:yy};}}
    const b=maskBounds(mask,w,h);return{x:b.cx,y:b.cy};
  }
  function snapExternal(mask,w,h,x,y,outerR,wallPx,boundaryPoints=null,bounds=null){
    const pts=boundaryPoints||boundaryPointList(mask,w,h,2),b=bounds||maskBounds(mask,w,h),edge=nearestPoint(pts,x,y)||{x:b.cx,y:b.minY};
    let dir=normalizedVector(edge.x-b.cx,edge.y-b.cy,{x:0,y:-1});
    if(Math.abs(dir.y)<.12&&edge.y<=b.minY+3)dir={x:0,y:-1};
    const overlap=Math.max(1.5,wallPx*.72),offset=Math.max(0,outerR-overlap);
    return{x:edge.x+dir.x*offset,y:edge.y+dir.y*offset};
  }
  function resolveHolePosition(mask,w,h,pad,ppm,mode,xMm,yMm,spec,insideDistance=null,boundaryPoints=null,bounds=null){
    const b=bounds||maskBounds(mask,w,h);let x=Number.isFinite(xMm)?pad+xMm*ppm:b.cx,y=Number.isFinite(yMm)?pad+yMm*ppm:b.minY;
    if(mode==='internal'){
      if(!Number.isFinite(xMm)||!Number.isFinite(yMm)){x=b.cx;y=b.minY+spec.innerR+spec.insetPx;}
      return snapInternal(mask,w,h,x,y,spec.innerR+spec.insetPx,insideDistance);
    }
    if(!Number.isFinite(xMm)||!Number.isFinite(yMm)){x=b.cx;y=b.minY-spec.outerR;}
    return snapExternal(mask,w,h,x,y,spec.outerR,spec.wallPx,boundaryPoints,b);
  }
  function ensureDraftHolePosition(forceDefault=false){
    const r=state.result;if(!r||r.mode!=='acrylic'||state.hole.draftMode==='none')return;
    const spec=getHoleSpec(r.ppm),mode=state.hole.draftMode;
    const xMm=forceDefault?null:state.hole.draftXmm,yMm=forceDefault?null:state.hole.draftYmm;
    const pos=resolveHolePosition(r.constraintMask,r.widthPx,r.heightPx,r.pad,r.ppm,mode,xMm,yMm,spec,r.insideDistance,r.boundaryPoints,r.constraintBounds);
    state.hole.draftXmm=(pos.x-r.pad)/r.ppm;state.hole.draftYmm=(pos.y-r.pad)/r.ppm;
    markHoleDirty();
  }
  function draftHolePixel(r=state.result){if(!r||state.hole.draftMode==='none')return null;return{x:r.pad+state.hole.draftXmm*r.ppm,y:r.pad+state.hole.draftYmm*r.ppm};}

  async function generateAcrylic() {
    if (state.mode !== 'acrylic' || !state.source) { drawPreview(); return; }
    const token=++state.generationToken;setBusy(true);await nextFrame();
    try{
      const style=currentFinishStyle('acrylic'),widthMm=clamp(num(els.productWidth,70),5,1000),heightMm=clamp(num(els.productHeight,70),5,1000);
      const bleedMm=style==='borderless'?clamp(num(els.bleedMm,2),0,20):0,borderMm=style==='bordered'?clamp(num(els.acrylicBorderMm,2),0,20):0;
      const threshold=clamp(num(style==='borderless'?els.alphaThreshold:els.alphaThresholdBordered,24),1,254),includeHoles=els.includeHoles.checked,flatBase=els.addFlatBase.checked,baseGapMode=state.baseGapMode;
      const targetMaxPx=getProcessingMaxDimension(),ppm=clamp(targetMaxPx/Math.max(widthMm,heightMm),2.2,12),coreW=Math.max(24,Math.round(widthMm*ppm)),coreH=Math.max(24,Math.round(heightMm*ppm));
      const bleedPx=Math.round(bleedMm*ppm),borderPx=Math.round(borderMm*ppm),appliedHoleMode=state.hole.appliedMode,holeSpec=getHoleSpec(ppm,true);
      const holePad=appliedHoleMode==='external'?Math.ceil(holeSpec.outerR+bleedPx+5):0;
      const pad=Math.max(10,Math.max(bleedPx,borderPx)+8,holePad),w=coreW+pad*2,h=coreH+pad*2;
      const original=makeCanvas(w,h),octx=original.getContext('2d',{willReadFrequently:true}),trim=getCachedTrimBounds(state.source,threshold),fit=Math.min(coreW/trim.sw,coreH/trim.sh),drawW=trim.sw*fit,drawH=trim.sh*fit,dx=pad+(coreW-drawW)/2,dy=pad+(coreH-drawH)/2;
      octx.imageSmoothingEnabled=true;octx.imageSmoothingQuality='high';octx.drawImage(state.source.img,trim.sx,trim.sy,trim.sw,trim.sh,dx,dy,drawW,drawH);
      let originalData=octx.getImageData(0,0,w,h),rawObjectMask=stabilizeAlphaMask(originalData,threshold,getBoundarySamplingConfig());
      let bottomAnalysis=style==='borderless'&&flatBase?analyzeBottomProtrusions(rawObjectMask,w,h):null;
      const originalBottomAnalysis=bottomAnalysis;
      let levelY=null;
      if(style==='borderless'&&flatBase&&state.borderlessBaseLevel&&bottomAnalysis){
        const liftPx=clamp(num(els.baseLiftMm,0),0,15)*ppm;
        levelY=clamp(Math.min(bottomAnalysis.left.y,bottomAnalysis.right.y)+1-liftPx,pad+2,h-pad-2);
        cropCanvasBelow(original,levelY);
        originalData=octx.getImageData(0,0,w,h);
        rawObjectMask=stabilizeAlphaMask(originalData,threshold,getBoundarySamplingConfig());
        bottomAnalysis=analyzeBottomProtrusions(rawObjectMask,w,h);
      }
      let contours=traceContours(rawObjectMask,w,h);if(!contours.length)throw new Error('투명하지 않은 픽셀을 찾지 못했습니다.');
      let outerPaths=contours.filter(p=>polygonArea(p)>0),imageHolePaths=contours.filter(p=>polygonArea(p)<0),base=null,baseAddedMask=null,supportInterior=null;
      const unbasedOuterPaths=outerPaths.map(path=>path.map(q=>({...q})));

      // 무테 밑바닥은 가장 아래로 돌출된 좌·우 부분만 연결하며, 직선 양옆에는 새 투명 영역을 만들지 않습니다.
      if(style==='borderless'&&flatBase&&outerPaths.length&&bottomAnalysis){
        let largest=0;for(let i=1;i<outerPaths.length;i++)if(Math.abs(polygonArea(outerPaths[i]))>Math.abs(polygonArea(outerPaths[largest])))largest=i;
        const changed=applyFlatBase(outerPaths[largest],bottomAnalysis,state.borderlessBaseLevel?levelY:null);outerPaths=outerPaths.slice();outerPaths[largest]=changed.path;base=changed.base;
      }
      let artOuterMask=rasterizePaths(outerPaths,w,h),unbasedOuterMask=style==='borderless'&&flatBase&&base?rasterizePaths(unbasedOuterPaths,w,h):null;
      if(unbasedOuterMask){
        baseAddedMask=clipBaseAddedMask(differenceMask(artOuterMask,unbasedOuterMask),base,w,h);
        artOuterMask=unionMask(unbasedOuterMask,baseAddedMask);
      }
      if(style==='borderless'&&flatBase){
        if((originalBottomAnalysis||bottomAnalysis)&&base){
          const measured=originalBottomAnalysis||bottomAnalysis;
          const diffMm=measured.deltaY/ppm;
          els.baseSlopeStatus.textContent=diffMm<.12
            ? '좌·우 돌출부가 거의 수평입니다.'
            : `좌·우 돌출부 높이 차이 약 ${diffMm.toFixed(2)} mm · ${state.borderlessBaseLevel?'높은 쪽 기준으로 수평 보정됨':'현재는 두 점을 그대로 연결함'}`;
        }else els.baseSlopeStatus.textContent='안정적인 좌·우 밑바닥 돌출부를 찾지 못해 원본 외곽을 유지했습니다.';
      }
      const imageHoleMask=imageHolePaths.length?rasterizePaths(imageHolePaths,w,h):new Uint8Array(w*h);

      let baseSilhouetteMask=style==='bordered'?dilateMask(artOuterMask,w,h,borderPx):new Uint8Array(artOuterMask);
      if(style==='bordered'&&flatBase){
        const tolerance=clamp(num(els.baseColorTolerance,18),4,60);
        const support=buildBorderedSupport(originalData,rawObjectMask,baseSilhouetteMask,w,h,borderPx,state.baseSupportMode,tolerance);
        baseSilhouetteMask=support.mask;base=support.base;baseAddedMask=support.supportOnly;supportInterior=support.supportInterior;
      }

      const constraintBounds=maskBounds(baseSilhouetteMask,w,h),insideDistance=distanceToMask(baseSilhouetteMask,w,h,0),boundaryPoints=boundaryPointList(baseSilhouetteMask,w,h,2);
      let holePosition=null,holeDisk=null,outerDisk=null,ringTransparent=null,protectedTransparent=null,combinedSilhouetteMask=baseSilhouetteMask;
      let objectMask=new Uint8Array(rawObjectMask),artworkOutput=makeCanvas(w,h);artworkOutput.getContext('2d').drawImage(original,0,0);
      if(appliedHoleMode!=='none'){
        holePosition=resolveHolePosition(baseSilhouetteMask,w,h,pad,ppm,appliedHoleMode,state.hole.appliedXmm,state.hole.appliedYmm,holeSpec,insideDistance,boundaryPoints,constraintBounds);
        state.hole.appliedXmm=(holePosition.x-pad)/ppm;state.hole.appliedYmm=(holePosition.y-pad)/ppm;
        holeDisk=makeCircleMask(w,h,holePosition.x,holePosition.y,holeSpec.innerR);
        objectMask=subtractMask(objectMask,holeDisk);clearCanvasWithMask(artworkOutput,holeDisk);
        protectedTransparent=holeDisk;
        if(appliedHoleMode==='external'){
          outerDisk=makeCircleMask(w,h,holePosition.x,holePosition.y,holeSpec.outerR);
          combinedSilhouetteMask=unionMask(baseSilhouetteMask,outerDisk);
          const jointRoundPx=clamp(Math.round(Math.min(holeSpec.wallPx*.42,.65*ppm)),1,Math.max(1,Math.round(holeSpec.wallPx*.6)));
          combinedSilhouetteMask=erodeMask(dilateMask(combinedSilhouetteMask,w,h,jointRoundPx),w,h,jointRoundPx);
          // 도안 픽셀이 고리와 겹치면 도안이 우선이고, 나머지 고리와 구멍만 투명 운반 영역으로 둡니다.
          ringTransparent=subtractMask(outerDisk,rawObjectMask);
          protectedTransparent=unionMask(ringTransparent,holeDisk);
        }
      }

      const bleed=makeCanvas(w,h),fullPrint=makeCanvas(w,h);let printMask=objectMask;
      if(style==='borderless'){
        const baseNoBleed=flatBase&&baseGapMode==='transparent'?buildBaseNoBleed(baseAddedMask,objectMask,w,h,bleedPx):null;
        const result=makeBleed(originalData,objectMask,combinedSilhouetteMask,imageHoleMask,w,h,bleedPx,includeHoles,baseNoBleed,protectedTransparent,protectedTransparent);
        bleed.getContext('2d').putImageData(result.imageData,0,0);printMask=result.printMask;
      }else if(flatBase&&baseGapMode==='fill'&&supportInterior){
        const fillTarget=unionMask(artOuterMask,supportInterior);
        const baseFill=makeBleed(originalData,objectMask,fillTarget,imageHoleMask,w,h,0,false,null,protectedTransparent,protectedTransparent),baseCanvas=makeCanvas(w,h);
        baseCanvas.getContext('2d').putImageData(baseFill.imageData,0,0);printMask=baseFill.printMask;
        const composed=makeCanvas(w,h),actx=composed.getContext('2d');actx.drawImage(baseCanvas,0,0);actx.drawImage(artworkOutput,0,0);artworkOutput=composed;
      }
      if(protectedTransparent){clearCanvasWithMask(bleed,protectedTransparent);clearCanvasWithMask(artworkOutput,protectedTransparent);}
      const fctx=fullPrint.getContext('2d');if(style==='borderless')fctx.drawImage(bleed,0,0);fctx.drawImage(artworkOutput,0,0);

      let cutPaths=traceContours(combinedSilhouetteMask,w,h).filter(p=>polygonArea(p)>0);
      if(includeHoles&&imageHolePaths.length){
        if(style==='borderless')cutPaths.push(...imageHolePaths);
        else{const cutHoles=erodeMask(imageHoleMask,w,h,borderPx);cutPaths.push(...traceContours(cutHoles,w,h).filter(p=>Math.abs(polygonArea(p))>3));}
      }
      if(holePosition)cutPaths.push(circlePath(holePosition.x,holePosition.y,holeSpec.innerR,true));
      cutPaths=simplifyCutPaths(cutPaths,ppm);
      let whiteMask=style==='borderless'||(style==='bordered'&&flatBase&&baseGapMode==='fill')?new Uint8Array(printMask):new Uint8Array(objectMask);
      if(protectedTransparent)whiteMask=subtractMask(whiteMask,protectedTransparent);
      const white=whiteCanvasFromMask(whiteMask,w,h),actualWmm=drawW/ppm,actualHmm=drawH/ppm,ppi=Math.min(trim.sw/(actualWmm/25.4),trim.sh/(actualHmm/25.4));
      state.result={mode:'acrylic',finishStyle:style,widthPx:w,heightPx:h,widthMm:w/ppm,heightMm:h/ppm,productWidthMm:widthMm,productHeightMm:heightMm,ppm,pad,coreW,coreH,original:artworkOutput,white,bleed,fullPrint,cutPaths,cutSmooth:getCutSmoothAmount(),outerPaths,imageHolePaths,includeHoles,base,baseGapMode,baseSupportMode:state.baseSupportMode,borderlessBaseLevel:state.borderlessBaseLevel,baseLiftMm:clamp(num(els.baseLiftMm,0),0,15),ppi,actualWmm,actualHmm,constraintMask:baseSilhouetteMask,constraintBounds,insideDistance,boundaryPoints,holeMode:appliedHoleMode,holePosition,holeSpec,combinedSilhouetteMask};
      if(!state.hole.dirty&&state.hole.draftMode===appliedHoleMode&&holePosition){state.hole.draftXmm=state.hole.appliedXmm;state.hole.draftYmm=state.hole.appliedYmm;}
      updateHoleUi();updateQualityAcrylic(ppi,actualWmm,actualHmm);
      const holeLabel=appliedHoleMode==='internal'?' · 내부 타공':appliedHoleMode==='external'?' · 외부 타공':'';
      const baseLabel=flatBase?` · 밑바닥 ${baseGapMode==='transparent'?'빈 공간':'색상 채움'}/${style==='bordered'?(state.baseSupportMode==='color'?'색 덩어리':'전체 폭'):(state.borderlessBaseLevel?'수평 보정':'두 점 연결')}`:'';
      els.geometryMeta.textContent=`${style==='borderless'?'무테':'유테'}${baseLabel}${holeLabel} · 대상 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · 실제 그림 ${actualWmm.toFixed(1)} × ${actualHmm.toFixed(1)} mm · ${Math.round(ppi)} ppi · 칼선 ${cutPaths.length}개`;
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
    const type=state.stickerBackgroundType;
    if (type === 'color') {
      cctx.fillStyle = els.stickerBackgroundColor.value || '#ffffff';
      cctx.fillRect(0, 0, w, h);
      return { canvas, ppi: Infinity };
    }
    cctx.imageSmoothingEnabled = true;cctx.imageSmoothingQuality = 'high';
    const ppm=w/widthMm;
    if(type==='pattern'){
      const record=state.stickerPatternImage;if(!record)return{canvas,ppi:Infinity};
      const scalePct=clamp(num(els.stickerPatternScale,100),10,800)/100;
      const tileW=Math.max(2,w*.25*scalePct),tileH=Math.max(2,tileW*record.naturalHeight/record.naturalWidth);
      const offX=num(els.stickerPatternX,0)*ppm,offY=num(els.stickerPatternY,0)*ppm;
      const startX=((offX%tileW)+tileW)%tileW-tileW,startY=((offY%tileH)+tileH)%tileH-tileH;
      for(let y=startY;y<h;y+=tileH)for(let x=startX;x<w;x+=tileW)cctx.drawImage(record.img,x,y,tileW,tileH);
      const usedWidthMm=tileW/ppm,usedHeightMm=tileH/(h/heightMm);
      return{canvas,ppi:Math.min(record.naturalWidth/(usedWidthMm/25.4),record.naturalHeight/(usedHeightMm/25.4))};
    }
    const record = state.stickerBackgroundImage;if(!record)return{canvas,ppi:Infinity};
    const img = record.img,fitMode = els.stickerBackgroundFit.value || 'cover';
    if (fitMode === 'stretch') {
      cctx.drawImage(img, 0, 0, w, h);
      return { canvas, ppi: Math.min(record.naturalWidth/(widthMm/25.4), record.naturalHeight/(heightMm/25.4)) };
    }
    let scale;
    if(fitMode==='custom')scale=Math.min(w/record.naturalWidth,h/record.naturalHeight)*clamp(num(els.stickerBackgroundScale,100),10,800)/100;
    else scale = fitMode === 'contain' ? Math.min(w/record.naturalWidth, h/record.naturalHeight) : Math.max(w/record.naturalWidth, h/record.naturalHeight);
    const dw = record.naturalWidth*scale, dh = record.naturalHeight*scale;
    const ox=fitMode==='custom'?num(els.stickerBackgroundX,0)*ppm:0,oy=fitMode==='custom'?num(els.stickerBackgroundY,0)*(h/heightMm):0;
    cctx.drawImage(img, (w-dw)/2+ox, (h-dh)/2+oy, dw, dh);
    const usedWidthMm = dw / ppm, usedHeightMm = dh / (h/heightMm);
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
    if(r.mode==='acrylic'&&state.hole.draftMode!=='none')drawHoleGuide(t);
    ctx.save();ctx.strokeStyle='rgba(60,58,54,.25)';ctx.lineWidth=1;ctx.strokeRect(t.x+.5,t.y+.5,t.boardW-1,t.boardH-1);ctx.restore();els.zoomLabel.textContent=`${Math.round(state.zoom*100)}%`;
  }

  function drawHoleGuide(t){
    const r=state.result,pos=draftHolePixel(r);if(!r||!pos)return;const spec=getHoleSpec(r.ppm),cx=t.x+pos.x*t.scale,cy=t.y+pos.y*t.scale,inner=spec.innerR*t.scale,outer=(state.hole.draftMode==='external'?spec.outerR:spec.innerR)*t.scale,dpr=window.devicePixelRatio||1;
    ctx.save();ctx.lineWidth=Math.max(1.5,1.4*dpr);ctx.setLineDash([7*dpr,5*dpr]);ctx.strokeStyle=state.hole.dirty?'#70b7d7':'#5799b7';ctx.fillStyle='rgba(54,143,255,.10)';
    if(state.hole.draftMode==='external'){ctx.beginPath();ctx.arc(cx,cy,outer,0,Math.PI*2);ctx.fill();ctx.stroke();}
    ctx.beginPath();ctx.arc(cx,cy,inner,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#fff';ctx.strokeStyle='#70b7d7';ctx.lineWidth=Math.max(1.5,1.2*dpr);ctx.beginPath();ctx.arc(cx,cy,4.5*dpr,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.font=`${11*dpr}px system-ui`;ctx.textAlign='center';ctx.textBaseline='bottom';ctx.fillStyle='#4f8196';ctx.fillText(state.hole.dirty?'드래그 위치 · 미적용':'적용 위치',cx,cy-outer-7*dpr);ctx.restore();
  }
  function drawSelection(t) {
    const s = state.stickers.find(v => v.id === state.selectedId); if (!s || !state.result) return;
    const ppm = state.result.ppm, w = s.widthMm * ppm * t.scale, h = w * s.naturalHeight / s.naturalWidth;
    const cx = t.x + s.xMm * ppm * t.scale, cy = t.y + s.yMm * ppm * t.scale;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(s.rotation * Math.PI / 180); ctx.strokeStyle = '#70b7d7'; ctx.lineWidth = 2 * (window.devicePixelRatio || 1); ctx.setLineDash([7, 5]); ctx.strokeRect(-w/2, -h/2, w, h); ctx.setLineDash([]);
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#70b7d7'; ctx.lineWidth = 2; for (const [x,y] of [[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]) { ctx.beginPath(); ctx.arc(x,y,5*(window.devicePixelRatio||1),0,Math.PI*2); ctx.fill(); ctx.stroke(); }
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
    saveWorkspaceNow();
    await generateSticker();
    schedulePersist(0);
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

  function composeSelectedLayers(r,pick){
    const canvas=makeCanvas(r.widthPx,r.heightPx),c=canvas.getContext('2d');
    c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    if(pick.background&&r.background)c.drawImage(r.background,0,0);
    if(pick.white)c.drawImage(r.white,0,0);
    if(pick.bleed)c.drawImage(r.bleed,0,0);
    if(pick.artwork)c.drawImage(r.original,0,0);
    if(pick.cutline){c.save();c.beginPath();for(const p of r.cutPaths)drawPath(c,p,1,1,0,0,r.cutSmooth||0);c.strokeStyle='#ff00b8';c.lineWidth=Math.max(1,r.ppm*.18);c.lineJoin='round';c.lineCap='round';c.stroke();c.restore();}
    return canvas;
  }

  function exportPng(){
    const r=state.result;if(!r)return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');
    const canvas=composeSelectedLayers(r,pick);canvas.toBlob(blob=>{if(blob)downloadBlob(blob,`acrylic-manager-${r.mode}-${r.finishStyle}.png`);},'image/png');
  }

  function exportSvg(){
    const r=state.result;if(!r)return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');
    const groups=[];
    if(pick.background&&r.background)groups.push(`<g id="BACKGROUND" data-layer="background"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.background.toDataURL('image/png')}"/></g>`);
    if(pick.white)groups.push(`<g id="WHITE" data-layer="white"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.white.toDataURL('image/png')}"/></g>`);
    if(pick.bleed)groups.push(`<g id="BLEED_EXTENSION" data-layer="bleed"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.bleed.toDataURL('image/png')}"/></g>`);
    if(pick.artwork)groups.push(`<g id="ARTWORK" data-layer="artwork"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.original.toDataURL('image/png')}"/></g>`);
    if(pick.cutline){const paths=r.cutPaths.map(p=>`<path d="${pathToSvgD(p,r.cutSmooth||0)}" fill="none" stroke="#ff00b8" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`).join('\n');groups.push(`<g id="CUTLINE" data-layer="cutline">${paths}</g>`);}
    const svg=`<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${r.widthMm.toFixed(4)}mm" height="${r.heightMm.toFixed(4)}mm" viewBox="0 0 ${r.widthPx} ${r.heightPx}">\n<title>아크릴 제작 매니저 출력 데이터</title>\n<metadata>finish-style=${r.finishStyle}; cut-smooth=${((r.cutSmooth||0)*100).toFixed(0)}%; layers=${Object.entries(pick).filter(([,v])=>v).map(([k])=>k).join(',')}</metadata>\n${groups.join('\n')}\n</svg>`;
    downloadBlob(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}),`acrylic-manager-${r.mode}-${r.finishStyle}.svg`);
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
  function exportAi(){const r=state.result;if(!r)return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');const bytes=makePdfAi(r,pick);downloadBlob(new Blob([bytes],{type:'application/pdf'}),`acrylic-manager-${r.mode}-${r.finishStyle}.ai`);}

  function resetAll(){
    if(state.mode==='acrylic'){
      state.source=null;state.result=null;state.finishStyle.acrylic='borderless';state.baseGapMode='transparent';state.baseSupportMode='color';state.borderlessBaseLevel=false;state.hole={draftMode:'none',appliedMode:'none',draftXmm:null,draftYmm:null,appliedXmm:null,appliedYmm:null,appliedDiameterMm:3,appliedWallMm:1.5,appliedInsetMm:2.5,dirty:false};
      els.singleFileInput.value='';els.imageStatus.textContent='이미지 필요';els.productWidth.value=70;els.productHeight.value=70;els.bleedMm.value=2;els.acrylicBorderMm.value=2;els.alphaThreshold.value=24;els.alphaThresholdBordered.value=24;els.colorSampleRadius.value=12;els.baseColorTolerance.value=18;els.baseLiftMm.value=0;els.baseSlopeStatus.textContent='이미지를 넣으면 좌·우 돌출부의 높이 차이를 표시합니다.';els.includeHoles.checked=false;els.addFlatBase.checked=true;els.holeDiameter.value=3;els.holeWall.value=1.5;els.holeInset.value=2.5;
      setNotice('info','이미지를 추가해 주세요','투명 PNG를 올리면 그림, 화이트, 칼선, 재단여백 레이어를 생성합니다.');updateFinishStyleUi();drawPreview();
      schedulePersist(0);
    }else{
      state.stickers=[];state.selectedId=null;state.finishStyle.sticker='borderless';state.stickerBorderFill='transparent';state.stickerBackgroundType='color';state.stickerBackgroundImage=null;state.stickerPatternImage=null;
      els.stickerCount.textContent='0개';els.artboardWidth.value=210;els.artboardHeight.value=297;els.stickerBorder.value=2;els.stickerBleed.value=2;els.stickerWhiteBleed.value=1;els.stickerAlphaThreshold.value=24;els.stickerAlphaThresholdBordered.value=24;els.stickerIncludeHoles.checked=false;els.stickerBackgroundEnabled.checked=false;els.stickerBackgroundColor.value='#ffffff';els.stickerBackgroundFit.value='cover';els.stickerBackgroundScale.value=100;els.stickerBackgroundX.value=0;els.stickerBackgroundY.value=0;els.stickerPatternScale.value=100;els.stickerPatternX.value=0;els.stickerPatternY.value=0;els.stickerBackgroundFile.value='';els.stickerPatternFile.value='';els.stickerBackgroundStatus.textContent='선택된 이미지 없음';els.stickerPatternStatus.textContent='선택된 패턴 없음';
      selectSticker(null);updateFinishStyleUi();generateSticker();
      schedulePersist(0);
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
  els.baseAnchorColorBtn.addEventListener('click',()=>setBaseSupportMode('color'));
  els.baseAnchorFullBtn.addEventListener('click',()=>setBaseSupportMode('full'));
  els.baseSlopeKeepBtn.addEventListener('click',()=>setBorderlessBaseLevel(false));
  els.baseSlopeLevelBtn.addEventListener('click',()=>setBorderlessBaseLevel(true));
  els.stickerBorderFillTransparentBtn.addEventListener('click',()=>setStickerBorderFill('transparent'));
  els.stickerBorderFillWhiteBtn.addEventListener('click',()=>setStickerBorderFill('white'));
  els.stickerBackgroundColorBtn.addEventListener('click',()=>setStickerBackgroundType('color'));
  els.stickerBackgroundImageBtn.addEventListener('click',()=>setStickerBackgroundType('image'));
  els.stickerBackgroundPatternBtn.addEventListener('click',()=>setStickerBackgroundType('pattern'));
  els.holeNoneBtn.addEventListener('click',()=>setHoleMode('none'));
  els.holeInternalBtn.addEventListener('click',()=>setHoleMode('internal'));
  els.holeExternalBtn.addEventListener('click',()=>setHoleMode('external'));
  els.resetHolePositionBtn.addEventListener('click',()=>ensureDraftHolePosition(true));

  els.singleFileInput.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;state.source=await fileToImageRecord(file);state.hole.appliedMode='none';state.hole.appliedXmm=state.hole.appliedYmm=null;state.hole.draftXmm=state.hole.draftYmm=null;state.hole.dirty=state.hole.draftMode!=='none';els.imageStatus.textContent=file.name;saveWorkspaceNow();await generateAcrylic();if(state.hole.draftMode!=='none')ensureDraftHolePosition(true);schedulePersist(0);});
  els.multiFileInput.addEventListener('change',async e=>{const files=[...(e.target.files||[])];if(files.length)await addStickerFiles(files);e.target.value='';});
  els.stickerBackgroundFile.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;state.stickerBackgroundImage=await fileToImageRecord(file);els.stickerBackgroundStatus.textContent=file.name;state.stickerBackgroundType='image';updateStickerBackgroundUi();saveWorkspaceNow();await generateSticker();schedulePersist(0);});
  els.stickerPatternFile.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;state.stickerPatternImage=await fileToImageRecord(file);els.stickerPatternStatus.textContent=file.name;state.stickerBackgroundType='pattern';updateStickerBackgroundUi();saveWorkspaceNow();await generateSticker();schedulePersist(0);});

  els.generateBtn.addEventListener('click',applyHoleAndGenerate);
  els.generateStickerBtn.addEventListener('click',generateSticker);
  [els.productWidth,els.productHeight,els.bleedMm,els.acrylicBorderMm,els.alphaThreshold,els.alphaThresholdBordered,els.colorSampleRadius,els.baseColorTolerance,els.baseLiftMm].forEach(el=>el.addEventListener('input',scheduleAcrylicGenerate));
  els.includeHoles.addEventListener('change',generateAcrylic);
  els.addFlatBase.addEventListener('change',()=>{updateFlatBaseUi();generateAcrylic();});
  [els.holeDiameter,els.holeWall,els.holeInset].forEach(el=>el.addEventListener('input',()=>{if(state.hole.draftMode!=='none'&&state.result)ensureDraftHolePosition(false);else markHoleDirty();}));
  [els.artboardWidth,els.artboardHeight,els.stickerBorder,els.stickerBleed,els.stickerWhiteBleed,els.stickerAlphaThreshold,els.stickerAlphaThresholdBordered].forEach(el=>el.addEventListener('input',scheduleStickerGenerate));
  els.stickerIncludeHoles.addEventListener('change',generateSticker);
  els.stickerBackgroundEnabled.addEventListener('change',()=>{updateStickerBackgroundUi();generateSticker();});
  els.stickerBackgroundColor.addEventListener('input',scheduleStickerGenerate);
  els.stickerBackgroundFit.addEventListener('change',()=>{updateStickerBackgroundUi();generateSticker();});
  [els.stickerBackgroundScale,els.stickerBackgroundX,els.stickerBackgroundY,els.stickerPatternScale,els.stickerPatternX,els.stickerPatternY].forEach(el=>el.addEventListener('input',scheduleStickerGenerate));
  [els.selWidth,els.selRotation,els.selX,els.selY].forEach(el=>el.addEventListener('input',updateSelectedFromFields));
  els.bringFrontBtn.addEventListener('click',()=>{const i=state.stickers.findIndex(v=>v.id===state.selectedId);if(i>=0){const[s]=state.stickers.splice(i,1);state.stickers.push(s);drawPreview();scheduleStickerGenerate();}});
  els.deleteStickerBtn.addEventListener('click',()=>{state.stickers=state.stickers.filter(v=>v.id!==state.selectedId);els.stickerCount.textContent=`${state.stickers.length}개`;selectSticker(null);generateSticker();});
  els.exportPngBtn.addEventListener('click',exportPng);
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

  els.canvas.addEventListener('pointerdown',ev=>{
    if(!state.result)return;const p=boardPointFromEvent(ev);if(!p)return;
    if(state.mode==='acrylic'&&state.hole.draftMode!=='none'){
      const pos=draftHolePixel(),spec=getHoleSpec(state.result.ppm),hitR=(state.hole.draftMode==='external'?spec.outerR:spec.innerR)+8;
      if(pos&&Math.hypot(p.xPx-pos.x,p.yPx-pos.y)<=hitR){state.dragging={type:'hole'};els.canvas.classList.add('hole-dragging');els.canvas.setPointerCapture(ev.pointerId);return;}
    }
    if(state.mode!=='sticker')return;const sticker=hitSticker(p);selectSticker(sticker?.id||null);if(sticker){state.dragging={type:'sticker',id:sticker.id,dx:p.xMm-sticker.xMm,dy:p.yMm-sticker.yMm};els.canvas.setPointerCapture(ev.pointerId);}
  });
  els.canvas.addEventListener('pointermove',ev=>{
    if(!state.dragging||!state.result)return;const p=boardPointFromEvent(ev);if(!p)return;
    if(state.dragging.type==='hole'&&state.mode==='acrylic'){
      const r=state.result,spec=getHoleSpec(r.ppm),mode=state.hole.draftMode;
      const pos=resolveHolePosition(r.constraintMask,r.widthPx,r.heightPx,r.pad,r.ppm,mode,(p.xPx-r.pad)/r.ppm,(p.yPx-r.pad)/r.ppm,spec,r.insideDistance,r.boundaryPoints,r.constraintBounds);
      state.hole.draftXmm=(pos.x-r.pad)/r.ppm;state.hole.draftYmm=(pos.y-r.pad)/r.ppm;state.hole.dirty=true;updateHoleUi();drawPreview();return;
    }
    if(state.dragging.type==='sticker'&&state.mode==='sticker'){
      const sticker=state.stickers.find(v=>v.id===state.dragging.id);if(!sticker)return;sticker.xMm=p.xMm-state.dragging.dx;sticker.yMm=p.yMm-state.dragging.dy;els.selX.value=sticker.xMm.toFixed(1);els.selY.value=sticker.yMm.toFixed(1);drawPreview();
    }
  });
  const endDrag=()=>{if(!state.dragging)return;const wasSticker=state.dragging.type==='sticker';state.dragging=null;els.canvas.classList.remove('hole-dragging');if(wasSticker)scheduleStickerGenerate();schedulePersist(0);};els.canvas.addEventListener('pointerup',endDrag);els.canvas.addEventListener('pointercancel',endDrag);
  for(const dz of document.querySelectorAll('.dropzone')){dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('dragover');});dz.addEventListener('dragleave',()=>dz.classList.remove('dragover'));dz.addEventListener('drop',async e=>{e.preventDefault();dz.classList.remove('dragover');const files=[...e.dataTransfer.files].filter(f=>f.type.startsWith('image/'));if(!files.length)return;if(dz.htmlFor==='singleFileInput'){state.source=await fileToImageRecord(files[0]);state.hole.appliedMode='none';state.hole.appliedXmm=state.hole.appliedYmm=null;state.hole.draftXmm=state.hole.draftYmm=null;state.hole.dirty=state.hole.draftMode!=='none';els.imageStatus.textContent=files[0].name;saveWorkspaceNow();await generateAcrylic();if(state.hole.draftMode!=='none')ensureDraftHolePosition(true);schedulePersist(0);}else await addStickerFiles(files);});}
  document.addEventListener('input', event => {
    if (event.target.matches('input:not([type="file"]), select')) schedulePersist();
  });
  document.addEventListener('change', event => {
    if (event.target.matches('input:not([type="file"]), select')) schedulePersist();
  });
  document.addEventListener('click', event => {
    if (event.target.closest('button')) schedulePersist();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveWorkspaceMetaNow();
  });
  window.addEventListener('pagehide', () => { saveWorkspaceMetaNow(); });

  async function boot() {
    setBusy(true);
    const restored = await restoreWorkspace();
    applyPreviewBackground();
    updateFinishStyleUi();
    updateFlatBaseUi();
    updateStickerBorderFillUi();
    updateStickerBackgroundUi();
    updateHoleUi();
    els.cutSimplifyValue.textContent = `${Number(els.cutSimplify.value).toFixed(2)} mm`;
    els.cutSmoothValue.textContent = `${Math.round(Number(els.cutSmooth.value))}%`;
    setMode(state.mode, { preserveZoom: true, skipGenerate: true });
    selectView(state.view);
    selectSticker(state.selectedId);
    resizePreviewCanvas();

    if (state.mode === 'acrylic') {
      if (state.source) await generateAcrylic();
      else {
        state.result = null;
        setNotice('info','이미지를 추가해 주세요','투명 PNG를 올리면 그림, 화이트, 칼선, 재단여백 레이어를 생성합니다.');
        drawPreview();
        setBusy(false);
      }
    } else {
      await generateSticker();
    }
    if (restored) schedulePersist(900);
  }

  window.addEventListener('resize', resizePreviewCanvas);
  new ResizeObserver(resizePreviewCanvas).observe(els.stage);
  boot();
})();
