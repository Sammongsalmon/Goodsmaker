(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const els = {
    canvas: $('previewCanvas'), stage: $('stageWrap'), busy: $('busyOverlay'), undoBtn: $('undoBtn'), redoBtn: $('redoBtn'),
    acrylicModeBtn: $('acrylicModeBtn'), stickerModeBtn: $('stickerModeBtn'), makerModeBtn: $('makerModeBtn'),
    acrylicControls: $('acrylicControls'), stickerControls: $('stickerControls'), makerControls: $('makerControls'),
    singleFileInput: $('singleFileInput'), multiFileInput: $('multiFileInput'),
    imageStatus: $('imageStatus'), stickerCount: $('stickerCount'), qualityNotice: $('qualityNotice'),
    productWidth: $('productWidth'), productHeight: $('productHeight'), artworkWidth: $('artworkWidth'), artworkHeight: $('artworkHeight'), artworkScale: $('artworkScale'), artworkScaleHelp: $('artworkScaleHelp'),
    lockArtworkAspect: $('lockArtworkAspect'), fitArtworkToBoardBtn: $('fitArtworkToBoardBtn'), acrylicSizeSummary: $('acrylicSizeSummary'), bleedMm: $('bleedMm'),
    acrylicBorderMm: $('acrylicBorderMm'), alphaThreshold: $('alphaThreshold'), alphaThresholdBordered: $('alphaThresholdBordered'),
    colorSampleRadius: $('colorSampleRadius'), colorSampleField: $('colorSampleField'),
    includeHoles: $('includeHoles'), addFlatBase: $('addFlatBase'), flatBaseOptions: $('flatBaseOptions'),
    baseGapTransparentBtn: $('baseGapTransparentBtn'), baseGapFillBtn: $('baseGapFillBtn'), baseGapHelp: $('baseGapHelp'), generateBtn: $('generateBtn'),
    borderlessBaseOptions: $('borderlessBaseOptions'), baseSlopeKeepBtn: $('baseSlopeKeepBtn'), baseSlopeLevelBtn: $('baseSlopeLevelBtn'),
    baseSlopeHelp: $('baseSlopeHelp'), baseLiftField: $('baseLiftField'), baseLiftMm: $('baseLiftMm'), baseSlopeStatus: $('baseSlopeStatus'),
    borderedBaseOptions: $('borderedBaseOptions'), baseAnchorColorBtn: $('baseAnchorColorBtn'), baseAnchorFullBtn: $('baseAnchorFullBtn'),
    baseAnchorHelp: $('baseAnchorHelp'), baseColorToleranceField: $('baseColorToleranceField'), baseColorTolerance: $('baseColorTolerance'),
    baseCornerRadiusField: $('baseCornerRadiusField'), baseCornerRadius: $('baseCornerRadius'), baseCornerRadiusValue: $('baseCornerRadiusValue'),
    holeNoneBtn: $('holeNoneBtn'), holeInternalBtn: $('holeInternalBtn'), holeExternalBtn: $('holeExternalBtn'), holeModeHelp: $('holeModeHelp'),
    holeOptions: $('holeOptions'), holeDiameter: $('holeDiameter'), holeWall: $('holeWall'), holeInset: $('holeInset'), holeExternalGap: $('holeExternalGap'), holeWallField: $('holeWallField'), holeInsetField: $('holeInsetField'), holeExternalGapField: $('holeExternalGapField'),
    holePositionStatus: $('holePositionStatus'), resetHolePositionBtn: $('resetHolePositionBtn'), centerHoleBtn: $('centerHoleBtn'), addHoleBtn: $('addHoleBtn'), deleteHoleBtn: $('deleteHoleBtn'),
    holeList: $('holeList'), holeCountBadge: $('holeCountBadge'),
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
    stickerBackgroundCustomFields: $('stickerBackgroundCustomFields'), stickerBackgroundScale: $('stickerBackgroundScale'), stickerBackgroundX: $('stickerBackgroundX'), stickerBackgroundY: $('stickerBackgroundY'), stickerBackgroundRotation: $('stickerBackgroundRotation'), stickerBackgroundRotateLeft: $('stickerBackgroundRotateLeft'), stickerBackgroundRotateRight: $('stickerBackgroundRotateRight'),
    stickerPatternScale: $('stickerPatternScale'), stickerPatternX: $('stickerPatternX'), stickerPatternY: $('stickerPatternY'),
    stickerPatternFileLabel: $('stickerPatternFileLabel'), stickerPatternLineFields: $('stickerPatternLineFields'), stickerPatternParticleFields: $('stickerPatternParticleFields'), stickerPatternLineStyle: $('stickerPatternLineStyle'), stickerPatternLineWidth: $('stickerPatternLineWidth'), stickerPatternSize: $('stickerPatternSize'), stickerPatternGap: $('stickerPatternGap'), stickerPatternLayout: $('stickerPatternLayout'),
    stickerBackgroundGradientBtn: $('stickerBackgroundGradientBtn'), stickerBackgroundGradientFields: $('stickerBackgroundGradientFields'), stickerGradientColorA: $('stickerGradientColorA'), stickerGradientColorB: $('stickerGradientColorB'), stickerGradientAngle: $('stickerGradientAngle'),
    stickerPatternKind: $('stickerPatternKind'), stickerPatternTemplateColors: $('stickerPatternTemplateColors'), stickerPatternBackgroundType: $('stickerPatternBackgroundType'), stickerPatternSolidColorField: $('stickerPatternSolidColorField'), stickerPatternGradientFields: $('stickerPatternGradientFields'), stickerPatternGradientA: $('stickerPatternGradientA'), stickerPatternGradientB: $('stickerPatternGradientB'), stickerPatternGradientAngle: $('stickerPatternGradientAngle'), stickerPatternBgColor: $('stickerPatternBgColor'), stickerPatternFgColor: $('stickerPatternFgColor'), stickerPatternOrderField: $('stickerPatternOrderField'), stickerPatternOrder: $('stickerPatternOrder'), stickerPatternRotationMode: $('stickerPatternRotationMode'), stickerPatternFixedRotationFields: $('stickerPatternFixedRotationFields'), stickerPatternRandomRotationFields: $('stickerPatternRandomRotationFields'), stickerPatternRotation: $('stickerPatternRotation'), stickerPatternRotationMin: $('stickerPatternRotationMin'), stickerPatternRotationMax: $('stickerPatternRotationMax'),
    splitThresholdRange: $('splitThresholdRange'), splitThreshold: $('splitThreshold'), splitPreviewBtn: $('splitPreviewBtn'), splitApplyBtn: $('splitApplyBtn'), splitPreviewCount: $('splitPreviewCount'),
    multiSelectBtn: $('multiSelectBtn'), mergeObjectsBtn: $('mergeObjectsBtn'), ungroupObjectsBtn: $('ungroupObjectsBtn'), stickerSelectedCount: $('stickerSelectedCount'), mergeLayerPolicy: $('mergeLayerPolicy'), stickerAutoGap: $('stickerAutoGap'), autoArrangeStickerBtn: $('autoArrangeStickerBtn'), autoArrangeStatus: $('autoArrangeStatus'),
    generateStickerBtn: $('generateStickerBtn'), selectionEditor: $('selectionEditor'), selWidth: $('selWidth'), selRotation: $('selRotation'), selX: $('selX'), selY: $('selY'),
    sendBackBtn: $('sendBackBtn'), stepBackBtn: $('stepBackBtn'), stepFrontBtn: $('stepFrontBtn'), bringFrontBtn: $('bringFrontBtn'), deleteStickerBtn: $('deleteStickerBtn'),
    makerFileInput: $('makerFileInput'), makerCount: $('makerCount'), makerWidth: $('makerWidth'), makerHeight: $('makerHeight'), makerCutMargin: $('makerCutMargin'),
    makerBgTransparentBtn: $('makerBgTransparentBtn'), makerBgColorBtn: $('makerBgColorBtn'), makerBgGradientBtn: $('makerBgGradientBtn'), makerBgImageBtn: $('makerBgImageBtn'), makerBgPatternBtn: $('makerBgPatternBtn'),
    makerBgColorField: $('makerBgColorField'), makerBgColor: $('makerBgColor'), makerBgGradientFields: $('makerBgGradientFields'), makerGradientA: $('makerGradientA'), makerGradientB: $('makerGradientB'), makerGradientAngle: $('makerGradientAngle'),
    makerBgImageFields: $('makerBgImageFields'), makerBackgroundFile: $('makerBackgroundFile'), makerBackgroundStatus: $('makerBackgroundStatus'), makerBackgroundFit: $('makerBackgroundFit'), makerBackgroundCustomFields: $('makerBackgroundCustomFields'), makerBackgroundScale: $('makerBackgroundScale'), makerBackgroundX: $('makerBackgroundX'), makerBackgroundY: $('makerBackgroundY'), makerBackgroundRotation: $('makerBackgroundRotation'), makerBackgroundRotateLeft: $('makerBackgroundRotateLeft'), makerBackgroundRotateRight: $('makerBackgroundRotateRight'),
    makerBgPatternFields: $('makerBgPatternFields'), makerPatternKind: $('makerPatternKind'), makerPatternBg: $('makerPatternBg'), makerPatternFg: $('makerPatternFg'), makerPatternFileLabel: $('makerPatternFileLabel'), makerPatternFile: $('makerPatternFile'), makerPatternStatus: $('makerPatternStatus'), makerPatternScale: $('makerPatternScale'), makerPatternX: $('makerPatternX'), makerPatternY: $('makerPatternY'),
    makerPatternLineFields: $('makerPatternLineFields'), makerPatternParticleFields: $('makerPatternParticleFields'), makerPatternLineStyle: $('makerPatternLineStyle'), makerPatternLineWidth: $('makerPatternLineWidth'), makerPatternSize: $('makerPatternSize'), makerPatternGap: $('makerPatternGap'), makerPatternLayout: $('makerPatternLayout'), makerPatternBackgroundType: $('makerPatternBackgroundType'), makerPatternSolidColorField: $('makerPatternSolidColorField'), makerPatternGradientFields: $('makerPatternGradientFields'), makerPatternGradientA: $('makerPatternGradientA'), makerPatternGradientB: $('makerPatternGradientB'), makerPatternGradientAngle: $('makerPatternGradientAngle'), makerPatternOrderField: $('makerPatternOrderField'), makerPatternOrder: $('makerPatternOrder'), makerPatternRotationMode: $('makerPatternRotationMode'), makerPatternFixedRotationFields: $('makerPatternFixedRotationFields'), makerPatternRandomRotationFields: $('makerPatternRandomRotationFields'), makerPatternRotation: $('makerPatternRotation'), makerPatternRotationMin: $('makerPatternRotationMin'), makerPatternRotationMax: $('makerPatternRotationMax'), makerPngBackground: $('makerPngBackground'), makerPngTransparentBtn: $('makerPngTransparentBtn'), makerPngWhiteBtn: $('makerPngWhiteBtn'),
    makerSelectionEditor: $('makerSelectionEditor'), makerSelWidth: $('makerSelWidth'), makerSelRotation: $('makerSelRotation'), makerSelX: $('makerSelX'), makerSelY: $('makerSelY'),
    makerOutlineEnabled: $('makerOutlineEnabled'), makerOutlineFields: $('makerOutlineFields'), makerOutlineColor: $('makerOutlineColor'), makerOutlineWidth: $('makerOutlineWidth'),
    makerOuterGlowEnabled: $('makerOuterGlowEnabled'), makerOuterGlowFields: $('makerOuterGlowFields'), makerOuterGlowColor: $('makerOuterGlowColor'), makerOuterGlowOpacity: $('makerOuterGlowOpacity'), makerOuterGlowSize: $('makerOuterGlowSize'), makerOuterGlowSpread: $('makerOuterGlowSpread'),
    makerInnerGlowEnabled: $('makerInnerGlowEnabled'), makerInnerGlowFields: $('makerInnerGlowFields'), makerInnerGlowColor: $('makerInnerGlowColor'), makerInnerGlowOpacity: $('makerInnerGlowOpacity'), makerInnerGlowSize: $('makerInnerGlowSize'), makerInnerGlowSpread: $('makerInnerGlowSpread'),
    makerShadowEnabled: $('makerShadowEnabled'), makerShadowFields: $('makerShadowFields'), makerShadowColor: $('makerShadowColor'), makerShadowOpacity: $('makerShadowOpacity'), makerShadowSize: $('makerShadowSize'), makerShadowSpread: $('makerShadowSpread'), makerShadowX: $('makerShadowX'), makerShadowY: $('makerShadowY'),
    makerSendBackBtn: $('makerSendBackBtn'), makerStepBackBtn: $('makerStepBackBtn'), makerStepFrontBtn: $('makerStepFrontBtn'), makerBringFrontBtn: $('makerBringFrontBtn'), makerDeleteBtn: $('makerDeleteBtn'), makerApplyEffectsAllBtn: $('makerApplyEffectsAllBtn'), generateMakerBtn: $('generateMakerBtn'),
    exportPngBtn: $('exportPngBtn'), exportJpgBtn: $('exportJpgBtn'), exportSvgBtn: $('exportSvgBtn'), exportAiBtn: $('exportAiBtn'), exportFileName: $('exportFileName'), resetBtn: $('resetBtn'),
    productionOptionsPanel: $('productionOptionsPanel'), layerLegend: $('layerLegend'), exportLayerBox: $('exportLayerBox'), viewTabs: $('viewTabs'),
    exportBackground: $('exportBackground'), exportBackgroundRow: $('exportBackgroundRow'),
    exportArtwork: $('exportArtwork'), exportWhiteOpaque: $('exportWhiteOpaque'), exportWhite: $('exportWhite'), exportBleed: $('exportBleed'), exportCutline: $('exportCutline'), exportBleedRow: $('exportBleedRow'),
    exportWhiteOpaqueRow: $('exportWhiteOpaqueRow'), exportWhiteFullRow: $('exportWhiteFullRow'), exportWhiteFullLabel: $('exportWhiteFullLabel'),
    whiteOpaqueViewTab: $('whiteOpaqueViewTab'), whiteFullViewTab: $('whiteFullViewTab'), whiteLegend: $('whiteLegend'), whiteLegendLabel: $('whiteLegendLabel'),
    zoomOutBtn: $('zoomOutBtn'), zoomInBtn: $('zoomInBtn'), fitBtn: $('fitBtn'), zoomLabel: $('zoomLabel'), geometryMeta: $('geometryMeta'),
    processingQuality: $('processingQuality'), previewBackground: $('previewBackground'), customBackground: $('customBackground'), customBackgroundField: $('customBackgroundField'),
    bleedViewTab: $('bleedViewTab'), bleedLegend: $('bleedLegend'), backgroundViewTab: $('backgroundViewTab'), backgroundLegend: $('backgroundLegend')
  };

  const ctx = els.canvas.getContext('2d');
  const AUTO_CUT_SIMPLIFY_MM = 0.24;
  const AUTO_CUT_CURVE = 0.72;
  const AUTO_CUT_RESAMPLE_MM = 0.10;

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
    stickerPatternImages: [],
    source: null,
    stickers: [],
    selectedId: null,
    selectedStickerIds: [],
    groupEditIds: [],
    groupEditGroupId: null,
    multiSelectMode: false,
    splitPreview: null,
    makerItems: [],
    makerSelectedId: null,
    makerBackgroundType: 'transparent',
    makerBackgroundImage: null,
    makerPatternImage: null,
    makerPatternImages: [],
    view: 'composite',
    zoom: 1,
    result: null,
    dragging: null,
    generationToken: 0,
    previewBackground: 'checker',
    holeCreateMode: 'internal',
    holes: [],
    selectedHoleId: null,
    selectedHoleIds: []
  };

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function num(el, fallback = 0) { const v = Number(el?.value); return Number.isFinite(v) ? v : fallback; }
  function uid() { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`; }
  function makeHoleRecord(mode = 'internal', overrides = {}) {
    return {
      id: overrides.id || uid(),
      draftMode: mode === 'external' ? 'external' : 'internal',
      appliedMode: 'none',
      draftXmm: null, draftYmm: null, appliedXmm: null, appliedYmm: null,
      draftDiameterMm: 3, draftWallMm: 1.5, draftInsetMm: 2.5, draftExternalGapMm: 0.4,
      appliedDiameterMm: 3, appliedWallMm: 1.5, appliedInsetMm: 2.5, appliedExternalGapMm: 0.4,
      dirty: true,
      ...overrides
    };
  }
  function normalizeHoleRecord(record = {}) {
    const draftMode = record.draftMode === 'external' ? 'external' : 'internal';
    const appliedMode = ['internal','external'].includes(record.appliedMode) ? record.appliedMode : 'none';
    const diameter = clamp(Number(record.draftDiameterMm ?? record.appliedDiameterMm) || 3, 1.5, 12);
    const wall = clamp(Number(record.draftWallMm ?? record.appliedWallMm) || 1.5, .6, 8);
    const inset = clamp(Number(record.draftInsetMm ?? record.appliedInsetMm) || 2.5, .5, 15);
    const fallbackExternalGap = Math.max(0, wall * .28);
    const externalGap = clamp(Number(record.draftExternalGapMm ?? record.appliedExternalGapMm ?? fallbackExternalGap), 0, 20);
    return makeHoleRecord(draftMode, {
      ...record,
      id: record.id || uid(), draftMode, appliedMode,
      draftDiameterMm: diameter, draftWallMm: wall, draftInsetMm: inset, draftExternalGapMm: externalGap,
      appliedDiameterMm: clamp(Number(record.appliedDiameterMm) || diameter,1.5,12),
      appliedWallMm: clamp(Number(record.appliedWallMm) || wall,.6,8),
      appliedInsetMm: clamp(Number(record.appliedInsetMm) || inset,.5,15),
      appliedExternalGapMm: clamp(Number(record.appliedExternalGapMm ?? externalGap),0,20),
      draftXmm: record.draftXmm !== null && record.draftXmm !== '' && Number.isFinite(Number(record.draftXmm)) ? Number(record.draftXmm) : null,
      draftYmm: record.draftYmm !== null && record.draftYmm !== '' && Number.isFinite(Number(record.draftYmm)) ? Number(record.draftYmm) : null,
      appliedXmm: record.appliedXmm !== null && record.appliedXmm !== '' && Number.isFinite(Number(record.appliedXmm)) ? Number(record.appliedXmm) : null,
      appliedYmm: record.appliedYmm !== null && record.appliedYmm !== '' && Number.isFinite(Number(record.appliedYmm)) ? Number(record.appliedYmm) : null,
      dirty: record.dirty !== undefined ? !!record.dirty : appliedMode === 'none'
    });
  }
  function selectedHoleIdSet() { return new Set(Array.isArray(state.selectedHoleIds) ? state.selectedHoleIds : []); }
  function isHoleSelected(id) { return !!id && Array.isArray(state.selectedHoleIds) && state.selectedHoleIds.includes(id); }
  function normalizeHoleSelection() {
    const valid = new Set(state.holes.map(h => h.id));
    state.selectedHoleIds = [...new Set(Array.isArray(state.selectedHoleIds) ? state.selectedHoleIds : [])].filter(id => valid.has(id));
    if (!valid.has(state.selectedHoleId) || !state.selectedHoleIds.includes(state.selectedHoleId)) {
      state.selectedHoleId = state.selectedHoleIds[state.selectedHoleIds.length - 1] || null;
    }
  }
  function getSelectedHole() { normalizeHoleSelection(); return state.holes.find(h => h.id === state.selectedHoleId) || null; }
  function holeIsDirty(hole) {
    if (!hole) return false;
    return hole.draftMode !== hole.appliedMode
      || hole.draftXmm !== hole.appliedXmm || hole.draftYmm !== hole.appliedYmm
      || Math.abs(hole.draftDiameterMm-hole.appliedDiameterMm)>.0001
      || Math.abs(hole.draftWallMm-hole.appliedWallMm)>.0001
      || Math.abs(hole.draftInsetMm-hole.appliedInsetMm)>.0001
      || Math.abs((hole.draftExternalGapMm||0)-(hole.appliedExternalGapMm||0))>.0001;
  }
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


  async function cropImageRecordToAlpha(record, threshold = 1) {
    if (!record) return null;
    const trim = getTrimBounds(record, threshold);
    const width = Math.max(1, Math.ceil(trim.sw)), height = Math.max(1, Math.ceil(trim.sh));
    const canvas = makeCanvas(width, height), cctx = canvas.getContext('2d');
    cctx.imageSmoothingEnabled = true; cctx.imageSmoothingQuality = 'high';
    cctx.drawImage(record.img, trim.sx, trim.sy, trim.sw, trim.sh, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/png');
    const img = await loadImage(dataUrl);
    return { img, dataUrl, name: record.name, naturalWidth: width, naturalHeight: height, trimCache: Object.create(null) };
  }

  function parseColorValue(value) {
    const text = String(value || '#000000').trim();
    let m;
    if ((m = text.match(/^#([0-9a-f]{3,8})$/i))) {
      let h=m[1];
      if(h.length===3||h.length===4) h=h.split('').map(ch=>ch+ch).join('');
      if(h.length===6) h+='ff';
      return {r:parseInt(h.slice(0,2),16),g:parseInt(h.slice(2,4),16),b:parseInt(h.slice(4,6),16),a:parseInt(h.slice(6,8),16)/255};
    }
    if ((m = text.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i))) {
      const alpha=m[4]?(m[4].endsWith('%')?parseFloat(m[4])/100:parseFloat(m[4])):1;
      return {r:clamp(Math.round(+m[1]),0,255),g:clamp(Math.round(+m[2]),0,255),b:clamp(Math.round(+m[3]),0,255),a:clamp(alpha,0,1)};
    }
    return {r:0,g:0,b:0,a:1};
  }
  function colorToHex8(c) { return `#${[c.r,c.g,c.b,Math.round(clamp(c.a,0,1)*255)].map(v=>clamp(Math.round(v),0,255).toString(16).padStart(2,'0')).join('')}`; }
  function colorToCss(value, alphaMultiplier=1) { const c=parseColorValue(value); return `rgba(${c.r},${c.g},${c.b},${clamp(c.a*alphaMultiplier,0,1)})`; }

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
    const fullMakerItems = new Map((full.makerItems || []).map(item => [item.id, item]));
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
      makerItems: (meta.makerItems || []).map(item => attachImage(item, fullMakerItems.get(item.id))),
      stickerBackgroundImage: attachImage(meta.stickerBackgroundImage, full.stickerBackgroundImage),
      stickerPatternImage: attachImage(meta.stickerPatternImage, full.stickerPatternImage),
      makerBackgroundImage: attachImage(meta.makerBackgroundImage, full.makerBackgroundImage),
      makerPatternImage: attachImage(meta.makerPatternImage, full.makerPatternImage),
      stickerPatternImages: (meta.stickerPatternImages || []).map((item,index)=>attachImage(item,(full.stickerPatternImages||[])[index])),
      makerPatternImages: (meta.makerPatternImages || []).map((item,index)=>attachImage(item,(full.makerPatternImages||[])[index]))
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
        selectedStickerIds: [...state.selectedStickerIds],
        groupEditIds: [...state.groupEditIds],
        groupEditGroupId: state.groupEditGroupId,
        multiSelectMode: state.multiSelectMode,
        makerSelectedId: state.makerSelectedId,
        makerBackgroundType: state.makerBackgroundType,
        view: state.view,
        zoom: state.zoom,
        previewBackground: state.previewBackground,
        holeCreateMode: state.holeCreateMode,
        selectedHoleId: state.selectedHoleId,
        selectedHoleIds: [...state.selectedHoleIds],
        holes: state.holes.map(hole => ({ ...hole }))
      },
      source: snapshotImageRecord(state.source),
      stickers: state.stickers.map(sticker => ({
        ...snapshotImageRecord(sticker),
        id: sticker.id,
        widthMm: sticker.widthMm,
        rotation: sticker.rotation,
        xMm: sticker.xMm,
        yMm: sticker.yMm,
        groupId: sticker.groupId || null,
        splitBridgeMm: Number(sticker.splitBridgeMm)||0
      })),
      makerItems: state.makerItems.map(item => ({
        ...snapshotImageRecord(item), id:item.id, widthMm:item.widthMm, rotation:item.rotation, xMm:item.xMm, yMm:item.yMm, effects:normalizeMakerEffects(item.effects)
      })),
      stickerBackgroundImage: snapshotImageRecord(state.stickerBackgroundImage),
      stickerPatternImage: snapshotImageRecord(state.stickerPatternImage),
      makerBackgroundImage: snapshotImageRecord(state.makerBackgroundImage),
      makerPatternImage: snapshotImageRecord(state.makerPatternImage),
      stickerPatternImages: state.stickerPatternImages.map(snapshotImageRecord),
      makerPatternImages: state.makerPatternImages.map(snapshotImageRecord)
    };
  }

  function saveWorkspaceMetaFallback(snapshot) {
    try {
      const stripImage = record => record ? { ...record, dataUrl: null } : null;
      const meta = {
        ...snapshot,
        source: stripImage(snapshot.source),
        stickers: snapshot.stickers.map(stripImage),
        makerItems: snapshot.makerItems.map(stripImage),
        stickerBackgroundImage: stripImage(snapshot.stickerBackgroundImage),
        stickerPatternImage: stripImage(snapshot.stickerPatternImage),
        makerBackgroundImage: stripImage(snapshot.makerBackgroundImage),
        makerPatternImage: stripImage(snapshot.makerPatternImage),
        stickerPatternImages: (snapshot.stickerPatternImages||[]).map(stripImage),
        makerPatternImages: (snapshot.makerPatternImages||[]).map(stripImage)
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
    try {
      const img = await loadImage(snapshot.dataUrl);
      return {
        img,
        dataUrl: snapshot.dataUrl,
        name: snapshot.name || 'image',
        naturalWidth: snapshot.naturalWidth || img.naturalWidth || img.width,
        naturalHeight: snapshot.naturalHeight || img.naturalHeight || img.height,
        trimCache: Object.create(null)
      };
    } catch (error) {
      console.warn('저장된 이미지 한 개를 복원하지 못했습니다.', error);
      return null;
    }
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
      state.mode = ['sticker','maker'].includes(restoredState.mode) ? restoredState.mode : 'acrylic';
      state.finishStyle = {
        acrylic: restoredState.finishStyle?.acrylic === 'bordered' ? 'bordered' : 'borderless',
        sticker: restoredState.finishStyle?.sticker === 'bordered' ? 'bordered' : 'borderless'
      };
      state.baseGapMode = restoredState.baseGapMode === 'fill' ? 'fill' : 'transparent';
      state.baseSupportMode = restoredState.baseSupportMode === 'full' ? 'full' : 'color';
      state.borderlessBaseLevel = !!restoredState.borderlessBaseLevel;
      state.stickerBorderFill = restoredState.stickerBorderFill === 'white' ? 'white' : 'transparent';
      state.stickerBackgroundType = ['gradient','image','pattern'].includes(restoredState.stickerBackgroundType) ? restoredState.stickerBackgroundType : 'color';
      state.selectedId = restoredState.selectedId || null;
      state.selectedStickerIds = Array.isArray(restoredState.selectedStickerIds) ? restoredState.selectedStickerIds : (state.selectedId?[state.selectedId]:[]);
      state.groupEditIds = Array.isArray(restoredState.groupEditIds) ? restoredState.groupEditIds : [];
      state.groupEditGroupId = restoredState.groupEditGroupId || null;
      state.multiSelectMode = !!restoredState.multiSelectMode;
      state.makerSelectedId = restoredState.makerSelectedId || null;
      state.makerBackgroundType = ['transparent','color','gradient','image','pattern'].includes(restoredState.makerBackgroundType) ? restoredState.makerBackgroundType : 'transparent';
      const restoredView = restoredState.view === 'white' ? 'white-full' : restoredState.view;
      state.view = ['composite', 'background', 'original', 'white-opaque', 'white-full', 'bleed', 'cutline'].includes(restoredView) ? restoredView : 'composite';
      state.zoom = clamp(Number(restoredState.zoom) || 1, .2, 5);
      state.previewBackground = restoredState.previewBackground || 'checker';
      state.holeCreateMode = restoredState.holeCreateMode === 'external' ? 'external' : 'internal';
      const legacyHole = restoredState.hole && restoredState.hole.draftMode !== 'none'
        ? [normalizeHoleRecord({ id: uid(), draftDiameterMm: restoredState.hole.appliedDiameterMm, draftWallMm: restoredState.hole.appliedWallMm, draftInsetMm: restoredState.hole.appliedInsetMm, ...restoredState.hole })]
        : [];
      state.holes = (Array.isArray(restoredState.holes) ? restoredState.holes : legacyHole).map(normalizeHoleRecord);
      const restoredSelection = Array.isArray(restoredState.selectedHoleIds)
        ? restoredState.selectedHoleIds
        : [];
      state.selectedHoleIds = restoredSelection.filter(id => state.holes.some(h => h.id === id));
      state.selectedHoleId = state.selectedHoleIds.includes(restoredState.selectedHoleId)
        ? restoredState.selectedHoleId
        : (state.selectedHoleIds[state.selectedHoleIds.length - 1] || null);

      const [source, background, pattern, makerBackground, makerPattern, stickerPatterns, makerPatterns, stickers, makerItems] = await Promise.all([
        imageRecordFromSnapshot(saved.source),
        imageRecordFromSnapshot(saved.stickerBackgroundImage),
        imageRecordFromSnapshot(saved.stickerPatternImage),
        imageRecordFromSnapshot(saved.makerBackgroundImage),
        imageRecordFromSnapshot(saved.makerPatternImage),
        Promise.all((saved.stickerPatternImages || []).map(imageRecordFromSnapshot)),
        Promise.all((saved.makerPatternImages || []).map(imageRecordFromSnapshot)),
        Promise.all((saved.stickers || []).map(async item => {
          const record = await imageRecordFromSnapshot(item);
          if (!record) return null;
          return {
            ...record,
            id: item.id || uid(),
            widthMm: Number(item.widthMm) || 30,
            rotation: Number(item.rotation) || 0,
            xMm: Number(item.xMm) || 0,
            yMm: Number(item.yMm) || 0, groupId:item.groupId||null, splitBridgeMm:Number(item.splitBridgeMm)||0
          };
        })),
        Promise.all((saved.makerItems || []).map(async item => {
          const record=await imageRecordFromSnapshot(item); if(!record)return null;
          return {...record,id:item.id||uid(),widthMm:Number(item.widthMm)||30,rotation:Number(item.rotation)||0,xMm:Number(item.xMm)||0,yMm:Number(item.yMm)||0,effects:normalizeMakerEffects(item.effects)};
        }))
      ]);
      state.source = source;
      state.stickerBackgroundImage = background;
      state.stickerPatternImage = pattern;
      state.makerBackgroundImage = makerBackground;
      state.makerPatternImage = makerPattern;
      state.stickerPatternImages = (stickerPatterns||[]).filter(Boolean);
      state.makerPatternImages = (makerPatterns||[]).filter(Boolean);
      if(!state.stickerPatternImages.length && pattern) state.stickerPatternImages=[pattern];
      if(!state.makerPatternImages.length && makerPattern) state.makerPatternImages=[makerPattern];
      state.stickerPatternImage = state.stickerPatternImages[0] || pattern || null;
      state.makerPatternImage = state.makerPatternImages[0] || makerPattern || null;
      state.stickers = stickers.filter(Boolean);
      state.makerItems = makerItems.filter(Boolean);
      state.selectedStickerIds = state.selectedStickerIds.filter(id=>state.stickers.some(item=>item.id===id));
      state.groupEditIds = state.groupEditIds.filter(id=>state.stickers.some(item=>item.id===id));
      if(state.groupEditGroupId&&!state.stickers.some(item=>item.groupId===state.groupEditGroupId))state.groupEditGroupId=null;
      if (!state.stickers.some(item => item.id === state.selectedId)) state.selectedId = state.selectedStickerIds.at(-1)||null;
      if (!state.makerItems.some(item=>item.id===state.makerSelectedId)) state.makerSelectedId=null;

      els.imageStatus.textContent = state.source?.name || '이미지 필요';
      els.stickerCount.textContent = `${state.stickers.length}개`;
      els.stickerBackgroundStatus.textContent = state.stickerBackgroundImage?.name || '선택된 이미지 없음';
      els.stickerPatternStatus.textContent = state.stickerPatternImages.length ? `${state.stickerPatternImages.length}개 이미지` : '선택된 패턴 없음';
      els.makerCount.textContent = `${state.makerItems.length}개`;
      els.makerBackgroundStatus.textContent = state.makerBackgroundImage?.name || '선택된 이미지 없음';
      els.makerPatternStatus.textContent = state.makerPatternImages.length ? `${state.makerPatternImages.length}개 이미지` : '선택된 패턴 없음';
      refreshColorControls();
      return true;
    } catch (error) {
      console.warn('저장된 작업 내용을 복원하지 못했습니다.', error);
      return false;
    } finally {
      isRestoringWorkspace = false;
    }
  }


  const historyState = { entries: [], index: -1, timer: null, restoring: false, max: 45 };
  function cloneHistoryItem(item){
    if(!item)return null;
    const copy={...item};
    if(item.effects)copy.effects=normalizeMakerEffects(JSON.parse(JSON.stringify(item.effects)));
    return copy;
  }
  function cloneHistorySplitPreview(preview){
    if(!preview)return null;
    return {...preview,items:(preview.items||[]).map(cloneHistoryItem),selectedIds:[...(preview.selectedIds||[])],cutPaths:[]};
  }
  function captureHistorySnapshot(){
    return {
      ui:snapshotFormValues(),
      state:{
        mode:state.mode,finishStyle:{...state.finishStyle},baseGapMode:state.baseGapMode,baseSupportMode:state.baseSupportMode,borderlessBaseLevel:state.borderlessBaseLevel,
        stickerBorderFill:state.stickerBorderFill,stickerBackgroundType:state.stickerBackgroundType,selectedId:state.selectedId,selectedStickerIds:[...state.selectedStickerIds],
        groupEditIds:[...state.groupEditIds],groupEditGroupId:state.groupEditGroupId,multiSelectMode:state.multiSelectMode,splitPreview:cloneHistorySplitPreview(state.splitPreview),
        makerSelectedId:state.makerSelectedId,makerBackgroundType:state.makerBackgroundType,view:state.view,zoom:state.zoom,previewBackground:state.previewBackground,
        holeCreateMode:state.holeCreateMode,holes:state.holes.map(v=>({...v})),selectedHoleId:state.selectedHoleId,selectedHoleIds:[...state.selectedHoleIds]
      },
      source:state.source,
      stickers:state.stickers.map(cloneHistoryItem),makerItems:state.makerItems.map(cloneHistoryItem),
      stickerBackgroundImage:state.stickerBackgroundImage,stickerPatternImage:state.stickerPatternImage,stickerPatternImages:[...state.stickerPatternImages],
      makerBackgroundImage:state.makerBackgroundImage,makerPatternImage:state.makerPatternImage,makerPatternImages:[...state.makerPatternImages]
    };
  }
  function historySignature(snapshot){
    const st=snapshot.state,ui={...snapshot.ui};
    delete ui.previewBackground;delete ui.processingQuality;delete ui.exportFileName;
    for(const id of ['selWidth','selRotation','selX','selY','makerSelWidth','makerSelRotation','makerSelX','makerSelY','makerOutlineEnabled','makerOutlineColor','makerOutlineWidth','makerOuterGlowEnabled','makerOuterGlowColor','makerOuterGlowOpacity','makerOuterGlowSize','makerOuterGlowSpread','makerInnerGlowEnabled','makerInnerGlowColor','makerInnerGlowOpacity','makerInnerGlowSize','makerInnerGlowSpread','makerShadowEnabled','makerShadowColor','makerShadowOpacity','makerShadowSize','makerShadowSpread','makerShadowX','makerShadowY','holeDiameter','holeWall','holeInset','holeExternalGap'])delete ui[id];
    const simpleItem=item=>item?{id:item.id,name:item.name,widthMm:+item.widthMm||0,rotation:+item.rotation||0,xMm:+item.xMm||0,yMm:+item.yMm||0,groupId:item.groupId||null,splitBridgeMm:+item.splitBridgeMm||0,effects:item.effects||null}:null;
    return JSON.stringify({ui,state:{finishStyle:st.finishStyle,baseGapMode:st.baseGapMode,baseSupportMode:st.baseSupportMode,borderlessBaseLevel:st.borderlessBaseLevel,stickerBorderFill:st.stickerBorderFill,stickerBackgroundType:st.stickerBackgroundType,makerBackgroundType:st.makerBackgroundType,holes:st.holes,splitPreview:st.splitPreview?{sourceId:st.splitPreview.sourceId,thresholdMm:st.splitPreview.thresholdMm,items:st.splitPreview.items.map(simpleItem)}:null},source:snapshot.source?.name||null,stickers:snapshot.stickers.map(simpleItem),makerItems:snapshot.makerItems.map(simpleItem),stickerBg:snapshot.stickerBackgroundImage?.name||null,stickerPatterns:snapshot.stickerPatternImages.map(v=>v?.name||''),makerBg:snapshot.makerBackgroundImage?.name||null,makerPatterns:snapshot.makerPatternImages.map(v=>v?.name||'')});
  }
  function updateHistoryButtons(){
    if(els.undoBtn)els.undoBtn.disabled=historyState.index<=0||historyState.restoring;
    if(els.redoBtn)els.redoBtn.disabled=historyState.index<0||historyState.index>=historyState.entries.length-1||historyState.restoring;
  }
  function checkpointHistory(force=false){
    if(historyState.restoring||isRestoringWorkspace)return;
    clearTimeout(historyState.timer);historyState.timer=null;
    const snapshot=captureHistorySnapshot(),signature=historySignature(snapshot),current=historyState.entries[historyState.index];
    if(!force&&current?.signature===signature){updateHistoryButtons();return;}
    historyState.entries=historyState.entries.slice(0,historyState.index+1);
    historyState.entries.push({snapshot,signature});
    if(historyState.entries.length>historyState.max)historyState.entries.shift();
    historyState.index=historyState.entries.length-1;updateHistoryButtons();
  }
  function queueHistoryCheckpoint(delay=420){
    if(historyState.restoring||isRestoringWorkspace)return;
    clearTimeout(historyState.timer);historyState.timer=setTimeout(()=>checkpointHistory(),delay);
  }
  async function restoreHistorySnapshot(snapshot){
    if(!snapshot)return;
    historyState.restoring=true;updateHistoryButtons();clearTimeout(acrylicTimer);clearTimeout(stickerTimer);state.dragging=null;
    try{
      restoreFormValues(snapshot.ui);const st=snapshot.state;
      state.mode=st.mode;state.finishStyle={...st.finishStyle};state.baseGapMode=st.baseGapMode;state.baseSupportMode=st.baseSupportMode;state.borderlessBaseLevel=!!st.borderlessBaseLevel;
      state.stickerBorderFill=st.stickerBorderFill;state.stickerBackgroundType=st.stickerBackgroundType;state.selectedId=st.selectedId;state.selectedStickerIds=[...(st.selectedStickerIds||[])];
      state.groupEditIds=[...(st.groupEditIds||[])];state.groupEditGroupId=st.groupEditGroupId||null;state.multiSelectMode=!!st.multiSelectMode;state.splitPreview=cloneHistorySplitPreview(st.splitPreview);
      state.makerSelectedId=st.makerSelectedId;state.makerBackgroundType=st.makerBackgroundType;state.view=st.view;state.zoom=st.zoom;state.previewBackground=st.previewBackground;
      state.holeCreateMode=st.holeCreateMode;state.holes=(st.holes||[]).map(v=>({...v}));state.selectedHoleId=st.selectedHoleId;state.selectedHoleIds=[...(st.selectedHoleIds||[])];
      state.source=snapshot.source;state.stickers=snapshot.stickers.map(cloneHistoryItem);state.makerItems=snapshot.makerItems.map(cloneHistoryItem);
      state.stickerBackgroundImage=snapshot.stickerBackgroundImage;state.stickerPatternImage=snapshot.stickerPatternImage;state.stickerPatternImages=[...snapshot.stickerPatternImages];
      state.makerBackgroundImage=snapshot.makerBackgroundImage;state.makerPatternImage=snapshot.makerPatternImage;state.makerPatternImages=[...snapshot.makerPatternImages];state.result=null;
      els.imageStatus.textContent=state.source?.name||'이미지 필요';els.stickerCount.textContent=`${state.stickers.length}개`;els.makerCount.textContent=`${state.makerItems.length}개`;
      els.stickerBackgroundStatus.textContent=state.stickerBackgroundImage?.name||'선택된 이미지 없음';els.stickerPatternStatus.textContent=state.stickerPatternImages.length?`${state.stickerPatternImages.length}개 이미지`:'선택된 패턴 없음';
      els.makerBackgroundStatus.textContent=state.makerBackgroundImage?.name||'선택된 이미지 없음';els.makerPatternStatus.textContent=state.makerPatternImages.length?`${state.makerPatternImages.length}개 이미지`:'선택된 패턴 없음';
      refreshColorControls();applyPreviewBackground();updateFinishStyleUi();updateStickerBackgroundUi();updateMakerUi();updateHoleUi();syncStickerSelectionUi();setMode(state.mode,{preserveZoom:true,skipGenerate:true});selectView(state.view);resizePreviewCanvas();
      if(state.mode==='acrylic'){if(state.source)await generateAcrylic();else{state.result=null;drawPreview();setBusy(false);}}
      else if(state.mode==='sticker')await generateSticker();else await generateMaker();
      saveWorkspaceNow();
    }finally{historyState.restoring=false;updateHistoryButtons();}
  }
  async function stepHistory(direction){
    if(historyState.restoring)return;const next=historyState.index+direction;if(next<0||next>=historyState.entries.length)return;
    historyState.index=next;await restoreHistorySnapshot(historyState.entries[next].snapshot);
  }

  function setMode(mode, options = {}) {
    state.mode = ['acrylic','sticker','maker'].includes(mode) ? mode : 'acrylic';
    state.result = null;
    if (!options.preserveZoom) state.zoom = 1;
    for(const [btn,key] of [[els.acrylicModeBtn,'acrylic'],[els.stickerModeBtn,'sticker'],[els.makerModeBtn,'maker']]){
      btn.classList.toggle('active',state.mode===key);btn.setAttribute('aria-selected',String(state.mode===key));
    }
    els.acrylicControls.classList.toggle('hidden', state.mode !== 'acrylic');
    els.stickerControls.classList.toggle('hidden', state.mode !== 'sticker');
    els.makerControls.classList.toggle('hidden', state.mode !== 'maker');
    updateFinishStyleUi();updateMakerUi();updateModeSpecificUi();
    if (!options.skipGenerate) {
      if (state.mode === 'acrylic') generateAcrylic(); else if(state.mode==='sticker') generateSticker(); else generateMaker();
    }
    schedulePersist();
  }

  function updateModeSpecificUi(){
    const maker=state.mode==='maker';
    els.exportPngBtn.textContent=maker?'PNG 내보내기':'선택 레이어 PNG';
    els.exportJpgBtn?.classList.toggle('hidden',!maker);
    els.exportSvgBtn.classList.toggle('hidden',maker);els.exportAiBtn.classList.toggle('hidden',maker);
    els.exportLayerBox?.classList.toggle('hidden',maker);els.layerLegend?.classList.toggle('hidden',maker);
    const makerHiddenViews=['white-opaque','white-full','bleed','cutline'];
    document.querySelectorAll('.view-tab').forEach(btn=>{if(makerHiddenViews.includes(btn.dataset.view))btn.classList.toggle('hidden',maker);});
    if(maker&&!['composite','background','original'].includes(state.view))selectView('composite');
    els.backgroundViewTab?.classList.toggle('hidden',!maker && !(state.mode==='sticker'&&els.stickerBackgroundEnabled.checked));
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

  function currentAcrylicThreshold() {
    return clamp(num(currentFinishStyle('acrylic') === 'borderless' ? els.alphaThreshold : els.alphaThresholdBordered, 24), 1, 254);
  }

  const ARTWORK_REFERENCE_PPI = 300;
  let syncingArtworkSize = false;

  function currentArtworkAspect() {
    if (!state.source) {
      const w = Math.max(1, num(els.artworkWidth, 60)), h = Math.max(1, num(els.artworkHeight, 60));
      return w / h;
    }
    const trim = getCachedTrimBounds(state.source, currentAcrylicThreshold());
    return Math.max(.001, trim.sw / Math.max(.001, trim.sh));
  }

  function artworkReferenceSizeMm() {
    if (!state.source) return null;
    const trim = getCachedTrimBounds(state.source, currentAcrylicThreshold());
    const mmPerPixel = 25.4 / ARTWORK_REFERENCE_PPI;
    return {
      width: Math.max(.001, trim.sw * mmPerPixel),
      height: Math.max(.001, trim.sh * mmPerPixel),
      pixelWidth: trim.sw,
      pixelHeight: trim.sh
    };
  }

  function artworkActualSizeMm() {
    const boxW = clamp(num(els.artworkWidth, 60), 1, 1000);
    const boxH = clamp(num(els.artworkHeight, 60), 1, 1000);
    let width = boxW, height = boxH;
    if (els.lockArtworkAspect?.checked && state.source) {
      const aspect = currentArtworkAspect();
      if (boxW / boxH > aspect) width = boxH * aspect;
      else height = boxW / aspect;
    }
    return { width, height };
  }

  function scalePercentFromArtworkSize(changed = 'width') {
    const reference = artworkReferenceSizeMm();
    if (!reference) return null;
    const width = clamp(num(els.artworkWidth, reference.width), 1, 1000);
    const height = clamp(num(els.artworkHeight, reference.height), 1, 1000);
    const scale = changed === 'height' ? height / reference.height : width / reference.width;
    return clamp(scale * 100, 1, 5000);
  }

  function updateArtworkScaleFromSize(changed = 'width') {
    if (syncingArtworkSize || !els.artworkScale) return;
    const scale = scalePercentFromArtworkSize(changed);
    els.artworkScale.disabled = !state.source;
    if (scale !== null) {
      syncingArtworkSize = true;
      els.artworkScale.value = scale.toFixed(1);
      syncingArtworkSize = false;
    }
  }

  function syncArtworkSizeFromScale() {
    if (syncingArtworkSize || !state.source) { updateAcrylicSizeSummary(); return; }
    const reference = artworkReferenceSizeMm();
    if (!reference) return;
    const scale = clamp(num(els.artworkScale, 100), 1, 5000) / 100;
    syncingArtworkSize = true;
    els.artworkWidth.value = clamp(reference.width * scale, 1, 1000).toFixed(1);
    els.artworkHeight.value = clamp(reference.height * scale, 1, 1000).toFixed(1);
    if (els.lockArtworkAspect) els.lockArtworkAspect.checked = true;
    syncingArtworkSize = false;
    updateAcrylicSizeSummary();
  }

  function updateAcrylicSizeSummary() {
    if (!els.acrylicSizeSummary) return;
    const boardW = clamp(num(els.productWidth, 70), 5, 1000);
    const boardH = clamp(num(els.productHeight, 70), 5, 1000);
    const actual = artworkActualSizeMm();
    const clipped = actual.width > boardW + .001 || actual.height > boardH + .001;
    const reference = artworkReferenceSizeMm();
    const scale = reference ? actual.width / reference.width * 100 : null;
    els.acrylicSizeSummary.textContent = `대지 ${boardW.toFixed(1)} × ${boardH.toFixed(1)} mm · 그림 ${actual.width.toFixed(1)} × ${actual.height.toFixed(1)} mm${scale !== null ? ` · ${scale.toFixed(1)}%` : ''}${clipped ? ' · 대지 초과' : ''}`;
    els.acrylicSizeSummary.classList.toggle('warning', clipped);
    if (els.artworkScale) els.artworkScale.disabled = !state.source;
    if (els.artworkScaleHelp) {
      els.artworkScaleHelp.textContent = reference
        ? `100% = 원본 ${reference.pixelWidth} × ${reference.pixelHeight}px을 ${ARTWORK_REFERENCE_PPI} ppi로 출력한 ${reference.width.toFixed(1)} × ${reference.height.toFixed(1)} mm입니다.`
        : `이미지를 올리면 원본을 ${ARTWORK_REFERENCE_PPI} ppi로 출력했을 때의 크기를 100%로 계산합니다.`;
    }
  }

  function syncArtworkAspect(changed = 'width') {
    if (syncingArtworkSize) return;
    if (!els.lockArtworkAspect?.checked || !state.source) {
      updateArtworkScaleFromSize(changed);
      updateAcrylicSizeSummary();
      return;
    }
    const aspect = currentArtworkAspect();
    syncingArtworkSize = true;
    if (changed === 'height') els.artworkWidth.value = clamp(num(els.artworkHeight, 60) * aspect, 1, 1000).toFixed(1);
    else els.artworkHeight.value = clamp(num(els.artworkWidth, 60) / aspect, 1, 1000).toFixed(1);
    syncingArtworkSize = false;
    updateArtworkScaleFromSize(changed);
    updateAcrylicSizeSummary();
  }

  function fitArtworkToBoard(options = {}) {
    const boardW = clamp(num(els.productWidth, 70), 5, 1000);
    const boardH = clamp(num(els.productHeight, 70), 5, 1000);
    const style = currentFinishStyle('acrylic');
    const edgeMm = style === 'borderless' ? clamp(num(els.bleedMm, 2), 0, 20) : clamp(num(els.acrylicBorderMm, 2), 0, 20);
    const safeMargin = Math.max(1, edgeMm + 1);
    const availW = Math.max(1, boardW - safeMargin * 2);
    const availH = Math.max(1, boardH - safeMargin * 2);
    const aspect = currentArtworkAspect();
    let width = availW, height = width / aspect;
    if (height > availH) { height = availH; width = height * aspect; }
    syncingArtworkSize = true;
    els.artworkWidth.value = width.toFixed(1);
    els.artworkHeight.value = height.toFixed(1);
    syncingArtworkSize = false;
    updateArtworkScaleFromSize('width');
    updateAcrylicSizeSummary();
    if (!options.skipGenerate) scheduleAcrylicGenerate();
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

  function syncHoleFieldsFromSelected() {
    const hole=getSelectedHole();
    if(!hole)return;
    els.holeDiameter.value=Number(hole.draftDiameterMm).toFixed(1);
    els.holeWall.value=Number(hole.draftWallMm).toFixed(1);
    els.holeInset.value=Number(hole.draftInsetMm).toFixed(1);
    els.holeExternalGap.value=Number(hole.draftExternalGapMm ?? .4).toFixed(1);
  }

  function renderHoleList() {
    normalizeHoleSelection();
    els.holeCountBadge.textContent=`${state.holes.length}개`;
    if(!state.holes.length){
      els.holeList.innerHTML='<p class="hole-list-empty">추가된 타공이 없습니다.</p>';
      return;
    }
    els.holeList.innerHTML=state.holes.map((hole,index)=>{
      const mode=hole.draftMode==='external'?'외부':'내부';
      const status=holeIsDirty(hole)?'미적용':'적용됨';
      const selected=isHoleSelected(hole.id),primary=hole.id===state.selectedHoleId;
      const active=selected?' active':'';
      const primaryClass=primary?' primary':'';
      const gapText=hole.draftMode==='external'?` · 간격 ${Number(hole.draftExternalGapMm??.4).toFixed(1)} mm`:'';
      return `<div class="hole-list-item${active}${primaryClass}"><button class="hole-select-button" type="button" data-hole-id="${hole.id}" aria-pressed="${selected}"><strong>${index+1}. ${mode} 타공 · Ø ${hole.draftDiameterMm.toFixed(1)} mm${gapText}</strong><span>${status} · ${selected?'선택됨 · 다시 클릭하면 해제':'클릭해서 수정 활성화'}</span></button><button class="hole-list-remove" type="button" data-remove-hole-id="${hole.id}" aria-label="${index+1}번 타공 삭제">×</button></div>`;
    }).join('');
    els.holeList.querySelectorAll('[data-hole-id]').forEach(button=>button.addEventListener('click',()=>toggleHoleSelection(button.dataset.holeId)));
    els.holeList.querySelectorAll('[data-remove-hole-id]').forEach(button=>button.addEventListener('click',()=>removeHole(button.dataset.removeHoleId)));
  }

  function setPrimaryHole(id) {
    if(!state.holes.some(h=>h.id===id))return null;
    if(!isHoleSelected(id))state.selectedHoleIds.push(id);
    state.selectedHoleId=id;
    const hole=getSelectedHole();
    state.holeCreateMode=hole.draftMode;
    syncHoleFieldsFromSelected();
    return hole;
  }

  function toggleHoleSelection(id) {
    if(!state.holes.some(h=>h.id===id))return;
    if(isHoleSelected(id)){
      state.selectedHoleIds=state.selectedHoleIds.filter(item=>item!==id);
      if(state.selectedHoleId===id)state.selectedHoleId=state.selectedHoleIds[state.selectedHoleIds.length-1]||null;
    }else setPrimaryHole(id);
    normalizeHoleSelection();
    if(getSelectedHole())syncHoleFieldsFromSelected();
    updateHoleUi();drawPreview();schedulePersist(0);
  }

  function clearHoleSelection() {
    state.selectedHoleIds=[];
    state.selectedHoleId=null;
    updateHoleUi();drawPreview();
  }

  function updateHoleDirtyFlag(hole) { if(hole)hole.dirty=holeIsDirty(hole); }

  function markHoleDirty(reposition=false) {
    const hole=getSelectedHole();
    if(!hole){updateHoleUi();return;}
    hole.draftDiameterMm=clamp(num(els.holeDiameter,3),1.5,12);
    hole.draftWallMm=clamp(num(els.holeWall,1.5),.6,8);
    hole.draftInsetMm=clamp(num(els.holeInset,2.5),.5,15);
    hole.draftExternalGapMm=clamp(num(els.holeExternalGap,.4),0,20);
    updateHoleDirtyFlag(hole);
    if(reposition&&state.result)ensureDraftHolePosition(hole,false,true);
    updateHoleUi();drawPreview();
  }

  function addHole(mode=state.holeCreateMode) {
    const selected=getSelectedHole();
    const hole=makeHoleRecord(mode,{
      draftDiameterMm:clamp(num(els.holeDiameter,selected?.draftDiameterMm||3),1.5,12),
      draftWallMm:clamp(num(els.holeWall,selected?.draftWallMm||1.5),.6,8),
      draftInsetMm:clamp(num(els.holeInset,selected?.draftInsetMm||2.5),.5,15),
      draftExternalGapMm:clamp(num(els.holeExternalGap,selected?.draftExternalGapMm??.4),0,20)
    });
    state.holes.push(hole);state.selectedHoleIds=[hole.id];state.selectedHoleId=hole.id;state.holeCreateMode=hole.draftMode;
    syncHoleFieldsFromSelected();
    if(state.result?.mode==='acrylic')ensureDraftHolePosition(hole,true,true);
    updateHoleUi();drawPreview();schedulePersist(0);
    return hole;
  }

  function removeHole(id=state.selectedHoleId) {
    const index=state.holes.findIndex(h=>h.id===id);if(index<0)return;
    state.holes.splice(index,1);
    state.selectedHoleIds=state.selectedHoleIds.filter(item=>item!==id);
    if(state.selectedHoleId===id)state.selectedHoleId=state.selectedHoleIds[state.selectedHoleIds.length-1]||null;
    normalizeHoleSelection();
    if(getSelectedHole())syncHoleFieldsFromSelected();updateHoleUi();drawPreview();schedulePersist(0);
  }

  function setHoleMode(mode) {
    if(mode==='none'){
      state.holes=[];state.selectedHoleIds=[];state.selectedHoleId=null;updateHoleUi();drawPreview();schedulePersist(0);return;
    }
    state.holeCreateMode=mode;
    const hole=getSelectedHole();
    if(!hole){addHole(mode);return;}
    hole.draftMode=mode;hole.dirty=true;
    if(state.result?.mode==='acrylic')ensureDraftHolePosition(hole,true,true);
    updateHoleUi();drawPreview();schedulePersist(0);
  }

  function updateHoleUi() {
    normalizeHoleSelection();
    const hole=getSelectedHole(),mode=hole?.draftMode||'none',enabled=!!hole,selectedCount=state.selectedHoleIds.length;
    els.holeNoneBtn.classList.toggle('active', !state.holes.length);
    els.holeInternalBtn.classList.toggle('active', mode === 'internal');
    els.holeExternalBtn.classList.toggle('active', mode === 'external');
    els.holeOptions.classList.toggle('hidden', !enabled);
    els.holeWallField.classList.toggle('hidden', mode !== 'external');
    els.holeExternalGapField.classList.toggle('hidden', mode !== 'external');
    els.holeInsetField.classList.toggle('hidden', mode !== 'internal');
    els.canvas.classList.toggle('hole-editing', selectedCount>0 && state.mode === 'acrylic');
    els.deleteHoleBtn.disabled=!enabled;
    els.resetHolePositionBtn.disabled=!enabled;
    els.centerHoleBtn.disabled=!selectedCount||!state.result;
    renderHoleList();
    if(!state.holes.length){
      els.holeModeHelp.textContent='내부 또는 외부 타공을 선택하면 첫 타공이 생성됩니다. 타공 하나 추가로 원하는 만큼 더 만들 수 있습니다.';
      els.holePositionStatus.textContent='타공 없음';
    }else if(!hole){
      els.holeModeHelp.textContent='도안의 타공이나 아래 목록을 클릭하면 수정 가이드가 켜집니다. 여러 개를 차례로 클릭해 동시에 표시할 수 있고, 다시 클릭하면 선택이 꺼집니다.';
      els.holePositionStatus.textContent=`타공 ${state.holes.length}개 적용됨 · 수정할 타공을 선택하세요`;
    }else{
      const index=state.holes.indexOf(hole)+1;
      els.holeModeHelp.textContent=mode==='internal'
        ? '내부 타공은 원본 그림과 화이트를 투명하게 지우지 않고, 칼선에 원형 구멍 패스만 추가합니다.'
        : '외부 타공은 그림과 실제 구멍 사이 거리를 직접 정할 수 있습니다. 간격이 테두리보다 크면 투명 아크릴 연결부를 자동으로 만듭니다.';
      els.holePositionStatus.textContent=`${index}번 ${mode==='internal'?'내부':'외부'} 타공 · ${selectedCount>1?`${selectedCount}개 선택 중 · `:''}${holeIsDirty(hole)?'미적용 위치':'적용된 위치'}`;
      syncHoleFieldsFromSelected();
    }
    const dirtyCount=state.holes.filter(holeIsDirty).length;
    els.generateBtn.textContent=state.holes.length
      ? `${dirtyCount?`${dirtyCount}개 타공 변경 적용 · `:''}칼선 다시 만들기`
      : '칼선 다시 만들기';
  }

  function applyHolesAndGenerate() {
    for(const hole of state.holes){
      hole.appliedMode=hole.draftMode;hole.appliedXmm=hole.draftXmm;hole.appliedYmm=hole.draftYmm;
      hole.appliedDiameterMm=hole.draftDiameterMm;hole.appliedWallMm=hole.draftWallMm;hole.appliedInsetMm=hole.draftInsetMm;hole.appliedExternalGapMm=hole.draftExternalGapMm;hole.dirty=false;
    }
    // 다시 만들기는 타공을 삭제하지 않고 수정 가이드만 닫습니다.
    state.selectedHoleIds=[];state.selectedHoleId=null;
    updateHoleUi();generateAcrylic();schedulePersist(0);
  }

  function selectView(view) {
    state.view = view;
    document.querySelectorAll('.view-tab').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  }

  function updateWhiteLayerUi() {
    const maker=state.mode==='maker'||state.result?.mode==='maker',hasSemi=!maker&&!!state.result?.hasSemiTransparent;
    els.exportWhiteOpaqueRow?.classList.toggle('hidden',maker||!hasSemi);els.whiteOpaqueViewTab?.classList.toggle('hidden',maker||!hasSemi);
    els.exportWhiteFullRow?.classList.toggle('hidden',maker);els.whiteFullViewTab?.classList.toggle('hidden',maker);els.whiteLegend?.classList.toggle('hidden',maker);
    if(els.exportWhiteOpaque)els.exportWhiteOpaque.disabled=!hasSemi;if(!hasSemi&&els.exportWhiteOpaque)els.exportWhiteOpaque.checked=false;
    if(els.exportWhiteFullLabel)els.exportWhiteFullLabel.textContent=hasSemi?'화이트 · 전체':'화이트';if(els.whiteFullViewTab)els.whiteFullViewTab.textContent=hasSemi?'화이트 · 전체':'화이트';if(els.whiteLegendLabel)els.whiteLegendLabel.textContent=hasSemi?'화이트 2종':'화이트';
    if(maker&&(state.view==='white-opaque'||state.view==='white-full'||state.view==='bleed'))selectView('composite');else if(!hasSemi&&state.view==='white-opaque')selectView('white-full');
    els.bleedViewTab.classList.toggle('hidden',maker||currentFinishStyle()==='bordered');els.bleedLegend.classList.toggle('hidden',maker||currentFinishStyle()==='bordered');els.exportBleedRow.classList.toggle('disabled',maker||currentFinishStyle()==='bordered');els.exportBleed.disabled=maker||currentFinishStyle()==='bordered';
  }

  function updateFlatBaseUi() {
    const enabled = !!els.addFlatBase.checked;
    const bordered = state.finishStyle.acrylic === 'bordered';
    els.flatBaseOptions.classList.toggle('hidden', !enabled);
    els.borderlessBaseOptions.classList.toggle('hidden', !enabled || bordered);
    els.borderedBaseOptions.classList.toggle('hidden', !enabled || !bordered);
    els.baseCornerRadiusField?.classList.toggle('hidden', !enabled);
    const transparent = state.baseGapMode === 'transparent';
    els.baseGapTransparentBtn.classList.toggle('active', transparent);
    els.baseGapFillBtn.classList.toggle('active', !transparent);
    els.baseGapHelp.textContent = transparent
      ? '받침과 그림 사이에 새로 생긴 공간을 비워 둡니다. 비워 둔 부분 주변에는 확장색도 만들지 않습니다.'
      : '받침 안쪽의 빈 공간을 주변 그림 색으로 채우고, 무테에서는 그 색을 재단여백까지 이어 줍니다.';

    const level = !!state.borderlessBaseLevel;
    els.baseSlopeKeepBtn.classList.toggle('active', !level);
    els.baseSlopeLevelBtn.classList.toggle('active', level);
    els.baseLiftField.classList.toggle('hidden', !level);
    els.baseSlopeHelp.textContent = level
      ? '더 높은 쪽 발끝을 기준으로 아래 이미지를 잘라 밑면을 수평으로 맞춥니다. 추가 올림 값만큼 더 위에서 자를 수 있습니다.'
      : '왼쪽과 오른쪽의 가장 낮은 지점을 그대로 연결합니다. 연결선 양옆에는 불필요한 투명 영역을 만들지 않습니다.';

    const colorMode = state.baseSupportMode === 'color';
    els.baseAnchorColorBtn.classList.toggle('active', colorMode);
    els.baseAnchorFullBtn.classList.toggle('active', !colorMode);
    els.baseColorToleranceField.classList.toggle('hidden', !colorMode);
    els.baseAnchorHelp.textContent = colorMode
      ? '아래쪽에서 거의 같은 색으로 이어진 부분을 찾아 그 폭만큼 받침을 만듭니다.'
      : '도안 칼선의 가장 왼쪽과 오른쪽 끝에서 수직으로 내려 전체 폭의 받침을 만듭니다.';
    if (els.baseCornerRadius && els.baseCornerRadiusValue) {
      els.baseCornerRadiusValue.textContent = `${Math.round(clamp(num(els.baseCornerRadius,55),0,100))}%`;
    }
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
    const isColor = type === 'color', isGradient=type==='gradient', isImage = type === 'image', isPattern = type === 'pattern';
    els.stickerBackgroundOptions.classList.toggle('hidden', !els.stickerBackgroundEnabled.checked);
    els.stickerBackgroundColorBtn.classList.toggle('active', isColor);
    els.stickerBackgroundGradientBtn.classList.toggle('active', isGradient);
    els.stickerBackgroundImageBtn.classList.toggle('active', isImage);
    els.stickerBackgroundPatternBtn.classList.toggle('active', isPattern);
    els.stickerBackgroundColorField.classList.toggle('hidden', !isColor);
    els.stickerBackgroundGradientFields.classList.toggle('hidden', !isGradient);
    els.stickerBackgroundImageFields.classList.toggle('hidden', !isImage);
    els.stickerBackgroundPatternFields.classList.toggle('hidden', !isPattern);
    els.stickerBackgroundCustomFields.classList.toggle('hidden', !isImage || els.stickerBackgroundFit.value !== 'custom');
    const kind=els.stickerPatternKind.value, imagePattern=isPattern&&kind==='image', linePattern=isPattern&&['square-grid','diagonal-grid','stripes'].includes(kind), patternBgGradient=els.stickerPatternBackgroundType?.value==='gradient';
    els.stickerPatternTemplateColors.classList.toggle('hidden',!isPattern);
    els.stickerPatternSolidColorField?.classList.toggle('hidden',!isPattern||patternBgGradient);
    els.stickerPatternGradientFields?.classList.toggle('hidden',!isPattern||!patternBgGradient);
    els.stickerPatternOrderField?.classList.toggle('hidden',!imagePattern);
    if(els.stickerPatternFileLabel)els.stickerPatternFileLabel.classList.toggle('hidden',!imagePattern);
    if(els.stickerPatternLineFields)els.stickerPatternLineFields.classList.toggle('hidden',!linePattern);
    if(els.stickerPatternParticleFields)els.stickerPatternParticleFields.classList.toggle('hidden',!isPattern);
    const stickerRandomRotation=els.stickerPatternRotationMode?.value==='random';els.stickerPatternFixedRotationFields?.classList.toggle('hidden',!isPattern||stickerRandomRotation);els.stickerPatternRandomRotationFields?.classList.toggle('hidden',!isPattern||!stickerRandomRotation);
    els.backgroundViewTab.classList.toggle('hidden', !enabled && state.mode!=='maker');
    els.backgroundLegend.classList.toggle('hidden', !enabled && state.mode!=='maker');
    els.exportBackgroundRow.classList.toggle('hidden', !enabled && state.mode!=='maker');
    els.exportBackground.disabled = !enabled && state.mode!=='maker';
    if (!enabled && state.mode==='sticker' && state.view === 'background') selectView('composite');
  }

  function updateMakerUi(){
    const active=state.mode==='maker',type=state.makerBackgroundType;
    if(!els.makerControls)return;
    els.makerBgTransparentBtn?.classList.toggle('active',type==='transparent');
    els.makerBgColorBtn.classList.toggle('active',type==='color');
    els.makerBgGradientBtn.classList.toggle('active',type==='gradient');
    els.makerBgImageBtn.classList.toggle('active',type==='image');
    els.makerBgPatternBtn.classList.toggle('active',type==='pattern');
    els.makerBgColorField.classList.toggle('hidden',type!=='color');
    els.makerBgGradientFields.classList.toggle('hidden',type!=='gradient');
    els.makerBgImageFields.classList.toggle('hidden',type!=='image');
    els.makerBgPatternFields.classList.toggle('hidden',type!=='pattern');
    els.makerBackgroundCustomFields.classList.toggle('hidden',type!=='image'||els.makerBackgroundFit.value!=='custom');
    const makerKind=els.makerPatternKind.value, makerImagePattern=type==='pattern'&&makerKind==='image', makerLinePattern=type==='pattern'&&['square-grid','diagonal-grid','stripes'].includes(makerKind), makerPatternBgGradient=els.makerPatternBackgroundType?.value==='gradient';
    els.makerPatternFileLabel.classList.toggle('hidden',!makerImagePattern);
    els.makerPatternLineFields?.classList.toggle('hidden',!makerLinePattern);
    els.makerPatternParticleFields?.classList.toggle('hidden',type!=='pattern');
    els.makerPatternSolidColorField?.classList.toggle('hidden',type!=='pattern'||makerPatternBgGradient);
    els.makerPatternGradientFields?.classList.toggle('hidden',type!=='pattern'||!makerPatternBgGradient);
    els.makerPatternOrderField?.classList.toggle('hidden',!makerImagePattern);
    const makerRandomRotation=els.makerPatternRotationMode?.value==='random';els.makerPatternFixedRotationFields?.classList.toggle('hidden',type!=='pattern'||makerRandomRotation);els.makerPatternRandomRotationFields?.classList.toggle('hidden',type!=='pattern'||!makerRandomRotation);
    els.makerPngTransparentBtn?.classList.toggle('active',els.makerPngBackground?.value!=='white');
    els.makerPngWhiteBtn?.classList.toggle('active',els.makerPngBackground?.value==='white');
    const item=state.makerItems.find(v=>v.id===state.makerSelectedId);
    els.makerSelectionEditor.classList.toggle('empty',!item);if(els.makerApplyEffectsAllBtn)els.makerApplyEffectsAllBtn.disabled=!item||state.makerItems.length<2;
    if(item){
      const e=normalizeMakerEffects(item.effects);item.effects=e;
      els.makerSelWidth.value=item.widthMm.toFixed(1);els.makerSelRotation.value=item.rotation.toFixed(0);els.makerSelX.value=item.xMm.toFixed(1);els.makerSelY.value=item.yMm.toFixed(1);
      const map=[['Outline',e.outline],['OuterGlow',e.outerGlow],['InnerGlow',e.innerGlow],['Shadow',e.shadow]];
      for(const [name,obj] of map){const enabledEl=els[`maker${name}Enabled`],fields=els[`maker${name}Fields`];if(enabledEl)enabledEl.checked=!!obj.enabled;if(fields)fields.classList.toggle('hidden',!obj.enabled);}
      els.makerOutlineColor.value=e.outline.color;els.makerOutlineWidth.value=e.outline.widthMm;
      els.makerOuterGlowColor.value=e.outerGlow.color;els.makerOuterGlowOpacity.value=e.outerGlow.opacity;els.makerOuterGlowSize.value=e.outerGlow.sizeMm;els.makerOuterGlowSpread.value=e.outerGlow.spread;
      els.makerInnerGlowColor.value=e.innerGlow.color;els.makerInnerGlowOpacity.value=e.innerGlow.opacity;els.makerInnerGlowSize.value=e.innerGlow.sizeMm;els.makerInnerGlowSpread.value=e.innerGlow.spread;
      els.makerShadowColor.value=e.shadow.color;els.makerShadowOpacity.value=e.shadow.opacity;els.makerShadowSize.value=e.shadow.sizeMm;els.makerShadowSpread.value=e.shadow.spread;els.makerShadowX.value=e.shadow.xMm;els.makerShadowY.value=e.shadow.yMm;
    }
    if(active){els.backgroundViewTab.classList.remove('hidden');}
    refreshColorControls();
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
      : '입력한 투명 테두리만큼 그림 밖으로 칼선을 이동합니다. 칼선 사이가 4 mm 이하로 좁아지는 깊은 홈은 입구에서 자연스럽게 연결해 재단하기 쉬운 형태로 만듭니다.';

    const stickerBorderless = state.finishStyle.sticker === 'borderless';
    els.stickerBorderlessBtn.classList.toggle('active', stickerBorderless);
    els.stickerBorderedBtn.classList.toggle('active', !stickerBorderless);
    els.stickerBorderlessFields.classList.toggle('hidden', !stickerBorderless);
    els.stickerBorderedFields.classList.toggle('hidden', stickerBorderless);
    els.stickerStyleHelp.textContent = stickerBorderless
      ? '배치된 각 그림 외곽에 칼선을 만들고 인접 색으로 재단여백을 확장합니다.'
      : '각 그림 밖으로 입력한 테두리 폭을 확보합니다. 4 mm 이하로 좁아지는 홈은 입구에서 자동으로 연결합니다.';

    updateFlatBaseUi();
    updateStickerBorderFillUi();
    updateStickerBackgroundUi();
    updateMakerUi();
    updateHoleUi();
    updateAcrylicSizeSummary();

    const showBleed = currentFinishStyle() === 'borderless';
    els.bleedViewTab.classList.toggle('hidden', !showBleed);
    els.bleedLegend.classList.toggle('hidden', !showBleed);
    els.exportBleedRow.classList.toggle('disabled', !showBleed);
    els.exportBleed.disabled = !showBleed;
    if (!showBleed && state.view === 'bleed') selectView('composite');
    updateWhiteLayerUi();
  }
  function getTrimBounds(record, threshold = 1) {
    const w = record.naturalWidth, h = record.naturalHeight;
    const maxDim = 1200;
    const s = Math.min(1, maxDim / Math.max(w, h));
    const c = makeCanvas(Math.round(w * s), Math.round(h * s));
    const cctx = c.getContext('2d', { willReadFrequently: true });
    cctx.drawImage(record.img, 0, 0, c.width, c.height);
    const imageData = cctx.getImageData(0, 0, c.width, c.height);
    // 원본 가장자리의 작은 먼지나 붙은 한두 픽셀이 그림 전체 크기와 중심을
    // 바꾸지 않도록, 실제 칼선에 쓰는 것과 같은 안정화 마스크로 여백을 찾습니다.
    const trimMask = suppressNeedleProtrusions(
      stabilizeAlphaMask(imageData, threshold, { maskPasses: 2, minComponent: 3 }),
      c.width, c.height, 6
    );
    let minX = c.width, minY = c.height, maxX = -1, maxY = -1;
    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        if (trimMask[y * c.width + x]) {
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

  function bottomAtExtreme(mask,w,h,side,band=2){
    const b=maskBounds(mask,w,h),from=side==='left'?b.minX:Math.max(b.minX,b.maxX-band),to=side==='left'?Math.min(b.maxX,b.minX+band):b.maxX;
    let best={x:side==='left'?b.minX:b.maxX,y:b.minY};
    for(let x=from;x<=to;x++)for(let y=b.maxY;y>=b.minY;y--)if(mask[y*w+x]){
      if(y>best.y)best={x,y};break;
    }
    return best;
  }

  function roundBaseMask(mask,base,w,h,radiusPx){
    const r=Math.max(0,Math.round(radiusPx));
    if(!base||r<1)return new Uint8Array(mask);

    // 밑바닥 끝점 주변만 국소적으로 닫기/열기 연산을 적용합니다.
    // 전체 마스크를 연산한 결과를 그대로 쓰지 않으므로 캐릭터의 다른 외곽선은 변하지 않습니다.
    const closeR=Math.max(1,Math.round(r*.52));
    const closed=erodeMask(dilateMask(mask,w,h,closeR),w,h,closeR);
    const openR=Math.max(1,r);
    const rounded=dilateMask(erodeMask(closed,w,h,openR),w,h,openR);
    const out=new Uint8Array(mask);
    const endpoints=[
      {x:base.x1,y:Number.isFinite(base.y1)?base.y1:(base.topY??base.bottomY)},
      {x:base.x2,y:Number.isFinite(base.y2)?base.y2:(base.topY??base.bottomY)}
    ];
    const influence=Math.max(2,r*2.35),limit=influence*influence;
    for(const point of endpoints){
      if(!Number.isFinite(point.x)||!Number.isFinite(point.y))continue;
      const minX=clamp(Math.floor(point.x-influence),0,w-1),maxX=clamp(Math.ceil(point.x+influence),0,w-1);
      const minY=clamp(Math.floor(point.y-influence),0,h-1),maxY=clamp(Math.ceil(point.y+influence),0,h-1);
      for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
        const dx=x+.5-point.x,dy=y+.5-point.y;
        if(dx*dx+dy*dy<=limit)out[y*w+x]=rounded[y*w+x];
      }
    }
    return out;
  }

  function buildBorderedSupport(originalData, objectMask, baseCutMask, w, h, borderPx, mode, tolerance, roundRatio=.55, preserveGap=false) {
    const seeds=bottomSideSeeds(objectMask,w,h),b=seeds.bounds,cutBounds=maskBounds(baseCutMask,w,h);
    let leftX=b.minX,rightX=b.maxX,leftY=seeds.left.y,rightY=seeds.right.y,source='full';
    if(mode==='color'){
      const lc=floodSimilarComponent(originalData,objectMask,w,h,seeds.left.x,seeds.left.y,tolerance);
      const rc=floodSimilarComponent(originalData,objectMask,w,h,seeds.right.x,seeds.right.y,tolerance);
      if(lc&&rc&&lc.count>=5&&rc.count>=5){leftX=lc.leftPoint.x;leftY=lc.leftPoint.y;rightX=rc.rightPoint.x;rightY=rc.rightPoint.y;source='color';}
    }else{
      // 전체 폭은 이미 투명 테두리가 적용된 칼선의 좌우 끝을 그대로 사용합니다.
      const edgeBand=Math.max(2,Math.round(borderPx*.45));
      const leftEdge=bottomAtExtreme(baseCutMask,w,h,'left',edgeBand),rightEdge=bottomAtExtreme(baseCutMask,w,h,'right',edgeBand);
      leftX=cutBounds.minX;rightX=cutBounds.maxX;leftY=leftEdge.y;rightY=rightEdge.y;
    }
    const sidePad=source==='color'?Math.max(1,borderPx):0;
    const x1=clamp(leftX-sidePad,0,w-1),x2=clamp(rightX+sidePad,0,w-1);
    const bottomY=clamp(cutBounds.maxY+Math.max(2,borderPx),0,h-2);
    const overlap=Math.max(1,borderPx*.45);
    let topY=Math.min(leftY,rightY)-overlap;
    topY=clamp(topY,0,bottomY-2);
    const supportHeight=bottomY-topY+1,supportWidth=x2-x1+1;
    const maxRadius=Math.max(0,Math.min(supportHeight*.5,supportWidth*.18));
    const radius=clamp(maxRadius*clamp(roundRatio,0,1),0,maxRadius);
    const supportMask=makeRoundedRectMask(w,h,x1,topY,x2,bottomY,radius);
    let combined=unionMask(baseCutMask,supportMask);

    // 도안과 받침이 만나는 연결부만 국소적으로 둥글립니다. `빈 공간 유지`일 때는
    // 받침 위의 의도적인 투명 통로 전체를 닫지 않고, 좌우 바깥 접합부만 보정합니다.
    // 이 구역을 전체 폭으로 닫으면 4 mm 좁은 홈 보정과 겹쳐 칼선이 받침에 달라붙습니다.
    const joint=Math.round(Math.min(Math.max(0,radius*.52),Math.max(0,borderPx*1.25)));
    if(joint>0){
      const closed=erodeMask(dilateMask(combined,w,h,joint),w,h,joint);
      if(preserveGap){
        const influence=Math.max(2,joint*3.2),limit=influence*influence;
        for(const point of [{x:x1,y:topY},{x:x2,y:topY}]){
          const minX=clamp(Math.floor(point.x-influence),0,w-1),maxX=clamp(Math.ceil(point.x+influence),0,w-1);
          const minY=clamp(Math.floor(point.y-influence),0,h-1),maxY=clamp(Math.ceil(point.y+influence),0,h-1);
          for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
            const dx=x+.5-point.x,dy=y+.5-point.y;
            if(dx*dx+dy*dy<=limit&&closed[y*w+x])combined[y*w+x]=1;
          }
        }
      }else{
        const minX=clamp(Math.floor(x1-joint*2.4),0,w-1),maxX=clamp(Math.ceil(x2+joint*2.4),0,w-1);
        const minY=clamp(Math.floor(topY-joint*2.4),0,h-1),maxY=clamp(Math.ceil(topY+joint*3.2),0,h-1);
        for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++)if(closed[y*w+x])combined[y*w+x]=1;
      }
    }
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

  function pruneTinyBoundarySpikes(mask, w, h, passes = 2) {
    let out = new Uint8Array(mask);
    const rounds = clamp(Math.round(passes), 1, 3);
    for (let pass = 0; pass < rounds; pass++) {
      const next = new Uint8Array(out);
      let changed = false;
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          if (!out[i]) continue;
          const left = out[i - 1], right = out[i + 1], up = out[i - w], down = out[i + w];
          const cardinal = left + right + up + down;
          let neighbors = cardinal + out[i - w - 1] + out[i - w + 1] + out[i + w - 1] + out[i + w + 1];
          // 완전히 불투명한 한두 픽셀이 외곽에 붙어도 작은 가시로 보이지 않도록
          // 끝점과 한 픽셀짜리 돌기만 최대 2~3 px까지 잘라 냅니다. 긴 선과 실제 모서리는 유지됩니다.
          if (neighbors <= 1 || (cardinal <= 1 && neighbors <= 4)) {
            next[i] = 0;
            changed = true;
          }
        }
      }
      out = next;
      if (!changed) break;
    }
    return out;
  }


  // 알파 경계에 붙은 한두 픽셀짜리 돌기나 짧은 바늘 모양 조각은
  // 칼선과 재단여백을 크게 튀게 만들 수 있습니다. 작은 원형 opening으로
  // 후보를 찾되, 전체 실루엣이나 실제로 긴/넓은 돌출부는 보존합니다.
  function suppressNeedleProtrusions(mask, w, h, ppm) {
    if (!mask || !mask.length) return mask;
    const radius = clamp(Math.round(.14 * ppm), 1, 3);
    const eroded = erodeMask(mask, w, h, radius);
    const opened = dilateMask(eroded, w, h, radius);
    let total = 0, openedCount = 0;
    for (let i = 0; i < mask.length; i++) { if (mask[i]) total++; if (opened[i]) openedCount++; }
    // 도안 자체가 처리 해상도에서 매우 얇은 경우에는 opening이 원형을 훼손할 수 있으므로
    // 기존의 가벼운 끝점 정리만 사용합니다.
    if (!total || openedCount < total * .55) return pruneTinyBoundarySpikes(mask, w, h, 3);

    const detail = differenceMask(mask, opened), out = new Uint8Array(mask);
    const seen = new Uint8Array(mask.length), queue = new Int32Array(mask.length);
    const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]];
    const maxSpan = Math.max(4, Math.round(.95 * ppm));
    const maxArea = Math.max(7, Math.round((.50 * ppm) ** 2));
    const maxNeck = Math.max(2, Math.round(.28 * ppm));

    for (let start = 0; start < detail.length; start++) {
      if (!detail[start] || seen[start]) continue;
      let head = 0, tail = 0, minX = w, minY = h, maxX = -1, maxY = -1, neck = 0;
      queue[tail++] = start; seen[start] = 1;
      while (head < tail) {
        const i = queue[head++], x = i % w, y = (i / w) | 0;
        minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
        let touchesOpened = false;
        for (const [dx,dy] of dirs) {
          const nx=x+dx, ny=y+dy; if(nx<0||ny<0||nx>=w||ny>=h) continue;
          const ni=ny*w+nx;
          if (opened[ni]) touchesOpened = true;
          if (detail[ni] && !seen[ni]) { seen[ni]=1; queue[tail++]=ni; }
        }
        if (touchesOpened) neck++;
      }
      const boxW=maxX-minX+1, boxH=maxY-minY+1, span=Math.max(boxW,boxH), thin=Math.min(boxW,boxH)<=radius*2+1;
      const removable = tail <= maxArea && span <= maxSpan && thin && neck <= maxNeck;
      if (removable) for (let q=0;q<tail;q++) out[queue[q]]=0;
    }
    return pruneTinyBoundarySpikes(out, w, h, 3);
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
    mask = pruneTinyBoundarySpikes(mask, w, h, Math.min(3, config.maskPasses + 1));
    return removeSmallComponents(mask, w, h, config.minComponent);
  }

  function clearUnsupportedArtworkPixels(canvas, stableMask, w, h, radius = 2) {
    const keep = dilateMask(stableMask, w, h, Math.max(1, Math.round(radius)));
    const cctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageData = cctx.getImageData(0, 0, w, h), d = imageData.data;
    let removed = 0;
    for (let i = 0; i < keep.length; i++) {
      if (d[i * 4 + 3] && !keep[i]) { d[i * 4 + 3] = 0; removed++; }
    }
    if (removed) cctx.putImageData(imageData, 0, 0);
    return removed;
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

  function constantColorPlane(color){
    return {r0:color[0],g0:color[1],b0:color[2],ru:0,rv:0,gu:0,gv:0,bu:0,bv:0,minR:color[0],maxR:color[0],minG:color[1],maxG:color[1],minB:color[2],maxB:color[2]};
  }

  function planePredictedRange(plane,minU,maxU,minV,maxV){
    const points=[[minU,minV],[minU,maxV],[maxU,minV],[maxU,maxV]];
    const ranges=[];
    for(const channel of [['r0','ru','rv'],['g0','gu','gv'],['b0','bu','bv']]){
      const vals=points.map(([u,v])=>plane[channel[0]]+plane[channel[1]]*u+plane[channel[2]]*v);
      ranges.push(Math.max(...vals)-Math.min(...vals));
    }
    return Math.max(...ranges);
  }

  function planeResidual(plane,samples){
    if(!samples.length)return 0;
    let sum=0,weight=0;
    for(const q of samples){
      const wt=q.weight||1;
      const pr=plane.r0+plane.ru*q.u+plane.rv*q.v,pg=plane.g0+plane.gu*q.u+plane.gv*q.v,pb=plane.b0+plane.bu*q.u+plane.bv*q.v;
      const dr=q.r-pr,dg=q.g-pg,db=q.b-pb;
      sum+=(dr*dr+dg*dg+db*db)/3*wt;weight+=wt;
    }
    return Math.sqrt(sum/Math.max(.001,weight));
  }

  function buildFlatColorRegions(imageData,objectMask,w,h,config){
    const n=w*h,d=imageData.data,candidate=new Uint8Array(n),seen=new Uint8Array(n),labels=new Int32Array(n),queue=new Int32Array(n);
    const minAlpha=Math.max(112,config.minAlpha),localLimit=14;
    for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
      const i=y*w+x;if(!objectMask[i]||d[i*4+3]<minAlpha||!objectMask[i-1]||!objectMask[i+1]||!objectMask[i-w]||!objectMask[i+w])continue;
      let minR=255,maxR=0,minG=255,maxG=0,minB=255,maxB=0,count=0;
      for(let yy=y-1;yy<=y+1;yy++)for(let xx=x-1;xx<=x+1;xx++){
        const j=yy*w+xx,t=j*4;if(!objectMask[j]||d[t+3]<minAlpha)continue;
        minR=Math.min(minR,d[t]);maxR=Math.max(maxR,d[t]);minG=Math.min(minG,d[t+1]);maxG=Math.max(maxG,d[t+1]);minB=Math.min(minB,d[t+2]);maxB=Math.max(maxB,d[t+2]);count++;
      }
      if(count>=5&&Math.max(maxR-minR,maxG-minG,maxB-minB)<=localLimit)candidate[i]=1;
    }
    const colors=[[0,0,0]],sizes=[0],dirs=[-1,1,-w,w],seedLimitSq=22*22*3,stepLimitSq=12*12*3;
    let regionId=0;
    for(let start=0;start<n;start++){
      if(!candidate[start]||seen[start])continue;
      let head=0,tail=0;queue[tail++]=start;seen[start]=1;
      const st=start*4,sr=d[st],sg=d[st+1],sb=d[st+2];
      let minX=start%w,maxX=minX,minY=(start/w)|0,maxY=minY,minR=255,maxR=0,minG=255,maxG=0,minB=255,maxB=0,sumR=0,sumG=0,sumB=0;
      while(head<tail){
        const i=queue[head++],x=i%w,y=(i/w)|0,t=i*4,cr=d[t],cg=d[t+1],cb=d[t+2];
        minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
        minR=Math.min(minR,cr);maxR=Math.max(maxR,cr);minG=Math.min(minG,cg);maxG=Math.max(maxG,cg);minB=Math.min(minB,cb);maxB=Math.max(maxB,cb);sumR+=cr;sumG+=cg;sumB+=cb;
        for(const delta of dirs){
          const ni=i+delta;if(ni<0||ni>=n||seen[ni]||!candidate[ni])continue;
          if((delta===-1&&x===0)||(delta===1&&x===w-1))continue;
          const nt=ni*4,nr=d[nt],ng=d[nt+1],nb=d[nt+2];
          if(colorDistanceSq(nr,ng,nb,sr,sg,sb)>seedLimitSq||colorDistanceSq(nr,ng,nb,cr,cg,cb)>stepLimitSq)continue;
          seen[ni]=1;queue[tail++]=ni;
        }
      }
      const observedRange=Math.max(maxR-minR,maxG-minG,maxB-minB),minSize=Math.max(14,Math.round(Math.sqrt(n)*.018));
      if(tail<minSize||observedRange>24)continue;
      const samples=[],stride=Math.max(1,Math.floor(tail/360));
      for(let q=0;q<tail;q+=stride){const i=queue[q],t=i*4;samples.push({r:d[t],g:d[t+1],b:d[t+2],u:i%w,v:(i/w)|0,weight:1});}
      const mean=[sumR/tail,sumG/tail,sumB/tail],plane=fitColorPlane(samples,mean),predicted=planePredictedRange(plane,minX,maxX,minY,maxY),residual=planeResidual(plane,samples);
      const coherentGradient=predicted>Math.max(4.5,observedRange*.30)&&residual<Math.max(3.2,predicted*.42);
      if((coherentGradient&&observedRange>7)||residual>7.5)continue;
      regionId++;const color=mean.map(Math.round);colors[regionId]=color;sizes[regionId]=tail;
      for(let q=0;q<tail;q++)labels[queue[q]]=regionId;
    }
    // 안쪽에서 찾은 단색 덩어리를 경계의 안티에일리어싱 픽셀까지 조심스럽게 확장합니다.
    const expandLimitSq=21*21*3,neighbors=[-1,1,-w,w,-w-1,-w+1,w-1,w+1];
    for(let pass=0;pass<3;pass++){
      const next=new Int32Array(labels);let changed=0;
      for(let y=0;y<h;y++)for(let x=0;x<w;x++){
        const i=y*w+x;if(!objectMask[i]||labels[i])continue;const t=i*4;if(d[t+3]<72)continue;
        let best=0,bestDist=Infinity;
        for(const delta of neighbors){const ni=i+delta;if(ni<0||ni>=n)continue;if((delta===-1||delta===-w-1||delta===w-1)&&x===0)continue;if((delta===1||delta===-w+1||delta===w+1)&&x===w-1)continue;const id=labels[ni];if(!id)continue;const c=colors[id],dist=colorDistanceSq(d[t],d[t+1],d[t+2],c[0],c[1],c[2]);if(dist<bestDist){bestDist=dist;best=id;}}
        if(best&&bestDist<=expandLimitSq){next[i]=best;changed++;}
      }
      labels.set(next);if(!changed)break;
    }
    return {labels,colors,sizes};
  }

  function fitSurfaceModel(samples,fallback,flatRegions){
    if(!samples.length)return {color:fallback.map(Math.round),plane:constantColorPlane(fallback),kind:1,regionId:0};
    const votes=new Map();let totalWeight=0,minU=Infinity,maxU=-Infinity,minV=Infinity,maxV=-Infinity,minR=255,maxR=0,minG=255,maxG=0,minB=255,maxB=0;
    for(const q of samples){const wt=q.weight||1;totalWeight+=wt;minU=Math.min(minU,q.u);maxU=Math.max(maxU,q.u);minV=Math.min(minV,q.v);maxV=Math.max(maxV,q.v);minR=Math.min(minR,q.r);maxR=Math.max(maxR,q.r);minG=Math.min(minG,q.g);maxG=Math.max(maxG,q.g);minB=Math.min(minB,q.b);maxB=Math.max(maxB,q.b);if(q.regionId)votes.set(q.regionId,(votes.get(q.regionId)||0)+wt);}
    let regionId=0,regionWeight=0;for(const [id,wt] of votes)if(wt>regionWeight){regionId=id;regionWeight=wt;}
    if(regionId&&regionWeight/Math.max(.001,totalWeight)>=.30){
      const color=flatRegions.colors[regionId];
      if(color&&colorDistanceSq(color[0],color[1],color[2],fallback[0],fallback[1],fallback[2])<=34*34*3)return {color:color.slice(),plane:constantColorPlane(color),kind:1,regionId};
    }
    const plane=fitColorPlane(samples,fallback),spread=Math.max(maxR-minR,maxG-minG,maxB-minB),predicted=planePredictedRange(plane,minU,maxU,minV,maxV),residual=planeResidual(plane,samples);
    if(spread<=11&&predicted<=4.2&&residual<=5.2){
      const color=dominantColor(samples,14,fallback);return {color,plane:constantColorPlane(color),kind:1,regionId:0};
    }
    return {color:fallback.map(Math.round),plane,kind:2,regionId:0};
  }

  function evalColorPlane(plane,u,v){
    const pad=18;
    return [
      clamp(plane.r0+plane.ru*u+plane.rv*v,plane.minR-pad,plane.maxR+pad),
      clamp(plane.g0+plane.gu*u+plane.gv*v,plane.minG-pad,plane.maxG+pad),
      clamp(plane.b0+plane.bu*u+plane.bv*v,plane.minB-pad,plane.maxB+pad)
    ].map(v=>Math.round(clamp(v,0,255)));
  }

  function buildBoundaryModel(originalData, objectMask, boundaryMask, w, h, x, y, config, frame, flatRegions) {
    const data=originalData.data, samples=[], near=[];
    const spread=config.tangentSpread;
    const pushSample=(i,r,g,b,u,v,weight,target)=>{const q={r,g,b,u,v,weight,regionId:flatRegions?.labels?.[i]||0};samples.push(q);if(target)near.push(q);};
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
        pushSample(i,r,g,b,lateral,depth,weight,true);
      }
    }
    for(let v=1;v<=config.radius;v++){
      const localSpread=Math.min(config.tangentSpread+3,2+Math.floor(v*.62));
      for(let u=-localSpread;u<=localSpread;u++){
        const sx=Math.round(x+frame.nx*v+frame.tx*u),sy=Math.round(y+frame.ny*v+frame.ty*u);
        if(sx<0||sy<0||sx>=w||sy>=h) continue;
        const i=sy*w+sx,a=data[i*4+3]; if(!objectMask[i]||a<config.minAlpha) continue;
        pushSample(i,data[i*4],data[i*4+1],data[i*4+2],u,v,Math.pow(a/255,2)/(1+v*.38+Math.abs(u)*.18),false);
      }
    }
    const self=(y*w+x)*4;
    const anchor=dominantColor(near,config.colorClusterDistance*.82,[data[self],data[self+1],data[self+2]]);
    if(samples.length<4){const surface=fitSurfaceModel(samples,anchor,flatRegions);return {c1:surface.color,c2:null,u1:0,v1:1,u2:0,v2:1,w1:1,w2:0,plane1:surface.plane,plane2:null,kind1:surface.kind,kind2:0,region1:surface.regionId,region2:0};}
    let far=null,farScore=0;
    for(const q of samples){const dist=colorDistanceSq(q.r,q.g,q.b,anchor[0],anchor[1],anchor[2]);const score=dist*Math.sqrt(q.weight);if(score>farScore){farScore=score;far=q;}}
    if(!far||farScore<Math.pow(config.colorClusterDistance*1.12,2)*.14){
      const surface=fitSurfaceModel(samples,anchor,flatRegions);return {c1:surface.color,c2:null,u1:0,v1:1,u2:0,v2:1,w1:1,w2:0,plane1:surface.plane,plane2:null,kind1:surface.kind,kind2:0,region1:surface.regionId,region2:0};
    }
    let c1=anchor.slice(),c2=[far.r,far.g,far.b],stats=null;
    for(let iter=0;iter<5;iter++){
      const a={r:0,g:0,b:0,u:0,v:0,w:0},b={r:0,g:0,b:0,u:0,v:0,w:0};
      for(const q of samples){const d1=colorDistanceSq(q.r,q.g,q.b,c1[0],c1[1],c1[2]),d2=colorDistanceSq(q.r,q.g,q.b,c2[0],c2[1],c2[2]);const z=d1<=d2?a:b;z.r+=q.r*q.weight;z.g+=q.g*q.weight;z.b+=q.b*q.weight;z.u+=q.u*q.weight;z.v+=q.v*q.weight;z.w+=q.weight;}
      if(a.w)c1=[a.r/a.w,a.g/a.w,a.b/a.w];if(b.w)c2=[b.r/b.w,b.g/b.w,b.b/b.w];stats={a,b};
    }
    if(!stats||!stats.a.w||!stats.b.w){const surface=fitSurfaceModel(samples,anchor,flatRegions);return {c1:surface.color,c2:null,u1:0,v1:1,u2:0,v2:1,w1:1,w2:0,plane1:surface.plane,plane2:null,kind1:surface.kind,kind2:0,region1:surface.regionId,region2:0};}
    const total=stats.a.w+stats.b.w,sep=colorDistanceSq(c1[0],c1[1],c1[2],c2[0],c2[1],c2[2]);
    if(Math.min(stats.a.w,stats.b.w)/total<.10||sep<Math.pow(config.colorClusterDistance*.92,2)){
      const surface=fitSurfaceModel(samples,anchor,flatRegions);return {c1:surface.color,c2:null,u1:stats.a.u/stats.a.w,v1:stats.a.v/stats.a.w,u2:0,v2:1,w1:1,w2:0,plane1:surface.plane,plane2:null,kind1:surface.kind,kind2:0,region1:surface.regionId,region2:0};
    }
    const dAnchor1=colorDistanceSq(c1[0],c1[1],c1[2],anchor[0],anchor[1],anchor[2]),dAnchor2=colorDistanceSq(c2[0],c2[1],c2[2],anchor[0],anchor[1],anchor[2]);
    if(dAnchor2<dAnchor1){[c1,c2]=[c2,c1];stats={a:stats.b,b:stats.a};}
    const group1=[],group2=[];
    for(const q of samples){const d1=colorDistanceSq(q.r,q.g,q.b,c1[0],c1[1],c1[2]),d2=colorDistanceSq(q.r,q.g,q.b,c2[0],c2[1],c2[2]);(d1<=d2?group1:group2).push(q);}
    const surface1=fitSurfaceModel(group1,c1,flatRegions),surface2=fitSurfaceModel(group2,c2,flatRegions);
    return {c1:surface1.color,c2:surface2.color,u1:stats.a.u/stats.a.w,v1:stats.a.v/stats.a.w,u2:stats.b.u/stats.b.w,v2:stats.b.v/stats.b.w,w1:stats.a.w/total,w2:stats.b.w/total,plane1:surface1.plane,plane2:surface2.plane,kind1:surface1.kind,kind2:surface2.kind,region1:surface1.regionId,region2:surface2.regionId};
  }



  function conservativeFlatLockForBoundary(originalData, objectMask, flatRegions, w, h, x, y, frame, config) {
    if(!flatRegions?.labels||!flatRegions?.colors||!flatRegions?.sizes)return null;
    const labels=flatRegions.labels,colors=flatRegions.colors,sizes=flatRegions.sizes,data=originalData.data;
    const maxDepth=Math.min(9,Math.max(4,Math.round(config.radius*.55))),votes=new Map();
    let validSamples=0;
    for(let depth=1;depth<=maxDepth;depth++)for(let lateral=-1;lateral<=1;lateral++){
      const sx=Math.round(x+frame.nx*depth+frame.tx*lateral),sy=Math.round(y+frame.ny*depth+frame.ty*lateral);
      if(sx<0||sy<0||sx>=w||sy>=h)continue;
      const i=sy*w+sx;if(!objectMask[i])continue;const id=labels[i];if(!id)continue;
      const wt=(lateral===0?2.25:1)/(1+depth*.30),entry=votes.get(id)||{id,weight:0,hits:0,centerHits:0,distSum:0,closeHits:0};
      const c=colors[id],t=i*4,dist=Math.sqrt(colorDistanceSq(data[t],data[t+1],data[t+2],c[0],c[1],c[2])/3);
      entry.weight+=wt;entry.hits++;entry.distSum+=dist;if(dist<=18)entry.closeHits++;if(lateral===0)entry.centerHits++;
      votes.set(id,entry);validSamples++;
    }
    if(!votes.size||validSamples<4)return null;
    const ranked=[...votes.values()].sort((a,b)=>b.weight-a.weight),best=ranked[0],totalWeight=ranked.reduce((s,v)=>s+v.weight,0);
    const minRegionSize=Math.max(14,Math.round(Math.sqrt(w*h)*.016));
    if((sizes[best.id]||0)<minRegionSize||best.hits<4||best.centerHits<2||best.weight/Math.max(.001,totalWeight)<.70)return null;
    if(best.closeHits/best.hits<.78||best.distSum/best.hits>13.5)return null;
    return {id:best.id,color:colors[best.id].slice()};
  }

  function applyConservativeFlatLock(model,lock){
    if(!lock||!model?.c1)return model;
    const limit=38*38*3,d1=colorDistanceSq(model.c1[0],model.c1[1],model.c1[2],lock.color[0],lock.color[1],lock.color[2]);
    const d2=model.c2?colorDistanceSq(model.c2[0],model.c2[1],model.c2[2],lock.color[0],lock.color[1],lock.color[2]):Infinity;
    if(Math.min(d1,d2)>limit)return model;
    if(d1<=d2){model.c1=lock.color.slice();model.plane1=constantColorPlane(lock.color);model.kind1=1;model.region1=lock.id;}
    else{model.c2=lock.color.slice();model.plane2=constantColorPlane(lock.color);model.kind2=1;model.region2=lock.id;}
    return model;
  }

  function prepareBoundaryModels(originalData, objectMask, boundaryMask, w, h, config, flatRegions) {
    const n=w*h;
    const valid=new Uint8Array(n),has2=new Uint8Array(n),c1r=new Uint8Array(n),c1g=new Uint8Array(n),c1b=new Uint8Array(n),c2r=new Uint8Array(n),c2g=new Uint8Array(n),c2b=new Uint8Array(n),kind1=new Uint8Array(n),kind2=new Uint8Array(n);
    const region1=new Int32Array(n),region2=new Int32Array(n),nx=new Float32Array(n),ny=new Float32Array(n),tx=new Float32Array(n),ty=new Float32Array(n),u1=new Float32Array(n),v1=new Float32Array(n),u2=new Float32Array(n),v2=new Float32Array(n),w1=new Float32Array(n),w2=new Float32Array(n);
    const plane1=new Array(n),plane2=new Array(n);
    for(let i=0;i<n;i++){
      if(!boundaryMask[i]) continue;
      const x=i%w,y=(i/w)|0,frame=estimateBoundaryFrame(objectMask,boundaryMask,w,h,x,y,config.frameRadius);
      const m=buildBoundaryModel(originalData,objectMask,boundaryMask,w,h,x,y,config,frame,flatRegions);
      applyConservativeFlatLock(m,conservativeFlatLockForBoundary(originalData,objectMask,flatRegions,w,h,x,y,frame,config));
      valid[i]=1;nx[i]=frame.nx;ny[i]=frame.ny;tx[i]=frame.tx;ty[i]=frame.ty;c1r[i]=m.c1[0];c1g[i]=m.c1[1];c1b[i]=m.c1[2];u1[i]=m.u1;v1[i]=m.v1;w1[i]=m.w1;plane1[i]=m.plane1;kind1[i]=m.kind1||2;region1[i]=m.region1||0;
      if(m.c2){has2[i]=1;c2r[i]=m.c2[0];c2g[i]=m.c2[1];c2b[i]=m.c2[2];u2[i]=m.u2;v2[i]=m.v2;w2[i]=m.w2;plane2[i]=m.plane2;kind2[i]=m.kind2||2;region2[i]=m.region2||0;}
    }
    return {valid,has2,c1r,c1g,c1b,c2r,c2g,c2b,kind1,kind2,region1,region2,nx,ny,tx,ty,u1,v1,u2,v2,w1,w2,plane1,plane2};
  }

  function modelBranchAt(models,seed,x,y,w){
    if(!models.has2[seed])return 1;
    const sx=seed%w,sy=(seed/w)|0,dx=x-sx,dy=y-sy,u=dx*models.tx[seed]+dy*models.ty[seed],v=dx*models.nx[seed]+dy*models.ny[seed];
    const d1=(u-models.u1[seed])**2+.72*(v-models.v1[seed])**2-.35*Math.log(.001+models.w1[seed]);
    const d2=(u-models.u2[seed])**2+.72*(v-models.v2[seed])**2-.35*Math.log(.001+models.w2[seed]);
    return d1<=d2?1:2;
  }

  function modelMetaAt(models,seed,x,y,w){
    const branch=modelBranchAt(models,seed,x,y,w);
    return {branch,kind:branch===1?models.kind1[seed]:models.kind2[seed],regionId:branch===1?models.region1[seed]:models.region2[seed]};
  }

  function modelColorAt(models, seed, x, y, w) {
    const sx=seed%w,sy=(seed/w)|0,dx=x-sx,dy=y-sy,u=dx*models.tx[seed]+dy*models.ty[seed],v=dx*models.nx[seed]+dy*models.ny[seed],branch=modelBranchAt(models,seed,x,y,w);
    const plane=branch===1?models.plane1[seed]:models.plane2[seed];
    if(plane)return evalColorPlane(plane,u,v);
    return branch===1?[models.c1r[seed],models.c1g[seed],models.c1b[seed]]:[models.c2r[seed],models.c2g[seed],models.c2b[seed]];
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


  function exteriorBackgroundMask(mask,w,h){
    const out=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
    const push=i=>{if(i<0||i>=out.length||mask[i]||out[i])return;out[i]=1;queue[tail++]=i;};
    for(let x=0;x<w;x++){push(x);push((h-1)*w+x);}
    for(let y=1;y<h-1;y++){push(y*w);push(y*w+w-1);}
    while(head<tail){const i=queue[head++],x=i%w,y=(i/w)|0;if(x>0)push(i-1);if(x<w-1)push(i+1);if(y>0)push(i-w);if(y<h-1)push(i+w);}
    return out;
  }

  // 유테 칼선 사이의 입구가 4 mm 이하로 좁아지는 홈은 칼날이 깊숙이
  // 들어가지 않도록 입구에서 자연스럽게 이어 줍니다. 외부와 연결된 배경만
  // 대상으로 하므로 닫힌 내부 구멍에는 영향을 주지 않습니다.
  function bridgeNarrowCutInlets(mask,w,h,ppm,maxGapMm=4){
    const radius=Math.max(1,Math.round(maxGapMm*ppm*.5));

    // 캔버스 가장자리에서 바로 closing을 하면 팽창 단계가 대지 경계에 잘리면서
    // 그림과 대지 끝 사이의 빈 공간까지 좁은 홈으로 오인할 수 있습니다.
    // 충분한 투명 여백을 덧댄 마스크에서 closing한 뒤 원래 대지만 잘라 냅니다.
    const pad=radius+3,pw=w+pad*2,ph=h+pad*2,padded=new Uint8Array(pw*ph);
    for(let y=0;y<h;y++)padded.set(mask.subarray(y*w,(y+1)*w),(y+pad)*pw+pad);
    const paddedClosed=erodeMask(dilateMask(padded,pw,ph,radius),pw,ph,radius),closed=new Uint8Array(mask.length);
    for(let y=0;y<h;y++)closed.set(paddedClosed.subarray((y+pad)*pw+pad,(y+pad)*pw+pad+w),y*w);

    const exterior=exteriorBackgroundMask(mask,w,h),candidate=new Uint8Array(mask.length);
    for(let i=0;i<candidate.length;i++)if(!mask[i]&&closed[i]&&exterior[i])candidate[i]=1;

    // 그래도 대지 경계에 닿는 후보 덩어리는 칼선을 대지에 붙이는 오검출이므로 버립니다.
    // 실제로 메워야 하는 좁은 입구는 그림 사이에 있고 대지 경계와 연결되지 않습니다.
    const keep=new Uint8Array(mask.length),seen=new Uint8Array(mask.length),queue=new Int32Array(mask.length),dirs=[[1,0],[-1,0],[0,1],[0,-1]];
    let addedPixels=0;
    for(let start=0;start<candidate.length;start++){
      if(!candidate[start]||seen[start])continue;
      let head=0,tail=0,touchesEdge=false;const pixels=[];seen[start]=1;queue[tail++]=start;
      while(head<tail){
        const i=queue[head++],x=i%w,y=(i/w)|0;pixels.push(i);
        if(x===0||y===0||x===w-1||y===h-1)touchesEdge=true;
        for(const[dx,dy]of dirs){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;const ni=ny*w+nx;if(candidate[ni]&&!seen[ni]){seen[ni]=1;queue[tail++]=ni;}}
      }
      if(touchesEdge)continue;
      for(const i of pixels){keep[i]=1;addedPixels++;}
    }

    const out=new Uint8Array(mask),added=keep;
    for(let i=0;i<out.length;i++)if(added[i])out[i]=1;
    if(addedPixels){
      // 입구를 막은 경계에 1 px짜리 홈이 남아 cubic 곡선이 살짝 출렁이지 않도록
      // 새로 연결된 영역 주변만 한 번 더 닫아 줍니다. 기존 외곽은 건드리지 않습니다.
      const localRadius=Math.max(1,Math.round(.18*ppm));
      const zone=dilateMask(added,w,h,Math.max(1,localRadius*2));
      const polished=erodeMask(dilateMask(out,w,h,localRadius),w,h,localRadius);
      for(let i=0;i<out.length;i++)if(zone[i]&&polished[i])out[i]=1;
    }
    return {mask:out,addedPixels,maxGapMm};
  }

  function smoothBleedGradient(imageData, activeMask, kindMask, w, h, passes) {
    if (passes <= 0) return;
    const d=imageData.data,dirs=[[-1,0,1],[1,0,1],[0,-1,1],[0,1,1],[-1,-1,.64],[1,-1,.64],[-1,1,.64],[1,1,.64]];
    for(let pass=0;pass<passes;pass++){
      const src=new Uint8ClampedArray(d);
      for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
        const i=y*w+x;if(!activeMask[i]||kindMask[i]!==2)continue;const t=i*4,cr=src[t],cg=src[t+1],cb=src[t+2];
        let rr=cr*3.4,gg=cg*3.4,bb=cb*3.4,sw=3.4;
        for(const[dx,dy,spatial]of dirs){
          const ni=(y+dy)*w+x+dx;if(!activeMask[ni]||kindMask[ni]!==2)continue;const nt=ni*4,dr=src[nt]-cr,dg=src[nt+1]-cg,db=src[nt+2]-cb,cd=dr*dr+dg*dg+db*db;
          // 서로 다른 색 영역은 섞지 않고, 같은 그라데이션 안의 작은 이음새만 정리합니다.
          const edge=cd<625?1:cd<1600?.12:0;if(!edge)continue;const wt=spatial*edge;rr+=src[nt]*wt;gg+=src[nt+1]*wt;bb+=src[nt+2]*wt;sw+=wt;
        }
        d[t]=Math.round(rr/sw);d[t+1]=Math.round(gg/sw);d[t+2]=Math.round(bb/sw);
      }
    }
  }

  function propagatedColor(models, source, i, x, y, w, quality) {
    const seed=source[i];if(seed<0)return[0,0,0];
    const base=modelColorAt(models,seed,x,y,w),meta=modelMetaAt(models,seed,x,y,w);
    // 단색 덩어리로 판정된 영역은 주변 모델과 평균하지 않습니다.
    if(meta.kind===1)return base;
    const radius=quality==='precise'?2:1;let rr=base[0]*3,gg=base[1]*3,bb=base[2]*3,sw=3;
    const seen=new Set([seed]);
    for(let dy=-radius;dy<=radius;dy++)for(let dx=-radius;dx<=radius;dx++){
      if(!dx&&!dy)continue;const nx=x+dx,ny=y+dy;if(nx<0||ny<0)continue;const ni=ny*w+nx;if(ni<0||ni>=source.length)continue;const s2=source[ni];if(s2<0||seen.has(s2))continue;seen.add(s2);
      const meta2=modelMetaAt(models,s2,x,y,w);if(meta2.kind!==2)continue;
      const c=modelColorAt(models,s2,x,y,w),cd=colorDistanceSq(c[0],c[1],c[2],base[0],base[1],base[2]);
      if(cd>2500)continue;const wt=(1/(1+Math.hypot(dx,dy)))*(cd<900?1:.20);rr+=c[0]*wt;gg+=c[1]*wt;bb+=c[2]*wt;sw+=wt;
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
    const config=getBoundarySamplingConfig(),boundaryMask=makeBoundaryMask(objectMask,w,h),flatRegions=buildFlatColorRegions(originalData,objectMask,w,h,config),models=prepareBoundaryModels(originalData,objectMask,boundaryMask,w,h,config,flatRegions);
    const cost=new Float32Array(n),source=new Int32Array(n);cost.fill(Infinity);source.fill(-1);const heap=new MinHeap();
    const dirs=[[-1,0,1],[1,0,1],[0,-1,1],[0,1,1],[-1,-1,1.414],[1,-1,1.414],[-1,1,1.414],[1,1,1.414]];
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=y*w+x;if(!allowed[i]||noWrite[i])continue;
      for(const[dx,dy,step]of dirs){const sx=x+dx,sy=y+dy;if(sx<0||sy<0||sx>=w||sy>=h)continue;const seed=sy*w+sx;if(!models.valid[seed])continue;
        const mx=-dx/step,my=-dy/step,outx=-models.nx[seed],outy=-models.ny[seed],align=mx*outx+my*outy,lateral=Math.abs(mx*models.tx[seed]+my*models.ty[seed]);
        const c=step*(1+Math.max(0,.15-align)*1.7+lateral*.12);if(c<cost[i]){cost[i]=c;source[i]=seed;heap.push(i,c);}
      }
    }
    while(heap.length){const node=heap.pop(),i=node.item;if(node.cost>cost[i]+1e-4)continue;const x=i%w,y=(i/w)|0,seed=source[i];
      for(const[dx,dy,step]of dirs){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;const ni=ny*w+nx;if(!allowed[ni]||noWrite[ni])continue;
        const ux=dx/step,uy=dy/step,outx=-models.nx[seed],outy=-models.ny[seed],align=ux*outx+uy*outy,lateral=Math.abs(ux*models.tx[seed]+uy*models.ty[seed]);
        const nc=node.cost+step*(1+Math.max(0,-.05-align)*1.2+lateral*.08);if(nc+1e-4<cost[ni]){cost[ni]=nc;source[ni]=seed;heap.push(ni,nc);}
      }
    }
    const out=new ImageData(w,h),od=out.data,src=originalData.data,printMask=new Uint8Array(n),active=new Uint8Array(n),kindMask=new Uint8Array(n),quality=els.processingQuality?.value||'fast';
    for(let i=0;i<n;i++){const t=i*4,x=i%w,y=(i/w)|0;
      if(objectMask[i]){printMask[i]=1;if(models.valid[i]&&src[t+3]<248){const c=modelColorAt(models,i,x,y,w);od[t]=c[0];od[t+1]=c[1];od[t+2]=c[2];od[t+3]=255;}}
      else if(source[i]>=0&&!noWrite[i]){const c=propagatedColor(models,source,i,x,y,w,quality),meta=modelMetaAt(models,source[i],x,y,w);od[t]=c[0];od[t+1]=c[1];od[t+2]=c[2];od[t+3]=255;printMask[i]=1;active[i]=1;kindMask[i]=meta.kind||2;}
    }
    smoothBleedGradient(out,active,kindMask,w,h,quality==='precise'?4:quality==='balanced'?2:1);
    // 확장색을 원본 쪽으로 2 px 겹쳐 깐 뒤 원본을 다시 올려, 알파 경계에 투명 실선이 남지 않게 합니다.
    extendBleedUnderArtwork(out,active,originalData,w,h,2);
    // 확장 도안의 가장 바깥 1 px에 색상 기반 서브픽셀 알파를 추가해
    // 처리 해상도의 계단이 미리보기와 PNG/SVG 래스터에 그대로 보이지 않게 합니다.
    antialiasBleedEdge(out,active,printMask,noWrite,w,h);
    return {imageData:out,printMask};
  }

  function buildExternalTransparentBleedMask(transparentSeedMask,colorMask,silhouetteMask,w,h,bleedPx){
    if(!transparentSeedMask)return null;
    const radius=Math.max(1,bleedPx+1);
    const domain=dilateMask(silhouetteMask,w,h,Math.max(0,bleedPx));
    const reachable=dilateMask(transparentSeedMask,w,h,radius);
    const transparentDistance=distanceToMask(transparentSeedMask,w,h,1);
    const colorDistance=distanceToMask(colorMask,w,h,1);
    const out=new Uint8Array(w*h);
    const maxDistance=(radius+.35)**2;
    const bias=Math.max(1.25,bleedPx*.42);
    for(let i=0;i<out.length;i++){
      if(colorMask[i])continue;
      if(transparentSeedMask[i]){out[i]=1;continue;}
      if(!domain[i]||!reachable[i])continue;
      const td=Math.sqrt(transparentDistance[i]),cd=Math.sqrt(colorDistance[i]);
      if(transparentDistance[i]<=maxDistance&&td<=cd+bias)out[i]=1;
    }
    // 한 픽셀짜리 틈 때문에 확장색이 투명 고리의 가장자리를 타고 새지 않도록 닫아 준다.
    const closed=unionMask(out,erodeMask(dilateMask(out,w,h,1),w,h,1));
    for(let i=0;i<closed.length;i++)if(colorMask[i])closed[i]=0;
    return closed;
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

  function alphaLayerMasks(imageData) {
    const w=imageData.width,h=imageData.height,n=w*h,d=imageData.data;
    const visible=new Uint8Array(n),candidate=new Uint8Array(n),nearOpaque=new Uint8Array(n);
    for(let i=0;i<n;i++){
      const a=d[i*4+3];
      if(a>0)visible[i]=1;
      if(a>0&&a<255)candidate[i]=1;
      if(a>=248)nearOpaque[i]=1;
    }

    // 안티에일리어싱은 대개 외곽을 따라 1~몇 픽셀 두께로 이어지는 얇은 띠입니다.
    // 후보 영역을 먼저 침식해도 남는 '내부 핵심 면'이 있고, 그 면적이 충분한 연결
    // 성분만 실제 반투명 면으로 인정합니다.
    const coreRadius=clamp(Math.round(Math.min(w,h)/520)+1,2,4);
    const rawCore=erodeMask(candidate,w,h,coreRadius);
    const distToTransparent=distanceToMask(visible,w,h,0);
    const distToOpaque=distanceToMask(nearOpaque,w,h,1);
    const acceptedCore=new Uint8Array(n),seen=new Uint8Array(n),queue=new Int32Array(n);
    const minArea=Math.max(18,Math.round(n*.000025));
    const dirs=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,-1],[-1,1],[1,1]];
    let regionCount=0;

    for(let start=0;start<n;start++){
      if(!candidate[start]||seen[start])continue;
      let head=0,tail=0;queue[tail++]=start;seen[start]=1;
      const pixels=[];let minX=w,minY=h,maxX=-1,maxY=-1,stableCoreCount=0;
      while(head<tail){
        const i=queue[head++],x=i%w,y=(i/w)|0;pixels.push(i);
        minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
        if(rawCore[i]){
          const nearBoth=distToTransparent[i]<=Math.pow(coreRadius+.35,2)&&distToOpaque[i]<=Math.pow(coreRadius+1.15,2);
          if(!nearBoth)stableCoreCount++;
        }
        for(const[dx,dy]of dirs){
          const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;
          const ni=ny*w+nx;if(candidate[ni]&&!seen[ni]){seen[ni]=1;queue[tail++]=ni;}
        }
      }
      const area=pixels.length,boxW=maxX-minX+1,boxH=maxY-minY+1;
      const requiredCore=Math.max(3,Math.round(area*.012));
      const substantial=area>=minArea&&Math.min(boxW,boxH)>=coreRadius*2+1&&stableCoreCount>=requiredCore;
      if(!substantial)continue;
      regionCount++;
      for(const i of pixels){
        if(!rawCore[i])continue;
        const nearBoth=distToTransparent[i]<=Math.pow(coreRadius+.35,2)&&distToOpaque[i]<=Math.pow(coreRadius+1.15,2);
        if(!nearBoth)acceptedCore[i]=1;
      }
    }

    // 인정된 핵심 면에서 후보 영역 안으로만 몇 픽셀 복원합니다. 실제 반투명 면의
    // 가장자리는 되살리되, 멀리 이어진 일반 외곽 안티에일리어싱 띠까지 번지지 않습니다.
    const grown=regionCount?dilateMask(acceptedCore,w,h,coreRadius+2):new Uint8Array(n);
    const semi=new Uint8Array(n),opaque=new Uint8Array(n);let semiCount=0;
    for(let i=0;i<n;i++){
      if(candidate[i]&&grown[i]){semi[i]=1;semiCount++;}
      if(visible[i]&&!semi[i])opaque[i]=1;
    }
    return {visible,semi,opaque,semiCount,regionCount};
  }

  function buildWhiteLayerMasks(baseMask,imageData,excludedMask=null){
    const alpha=alphaLayerMasks(imageData);
    let full=unionMask(baseMask,alpha.visible),opaque=subtractMask(full,alpha.semi);
    if(excludedMask){full=subtractMask(full,excludedMask);opaque=subtractMask(opaque,excludedMask);}
    return {full,opaque,semiMask:alpha.semi,semiCount:alpha.semiCount,semiRegionCount:alpha.regionCount,hasSemiTransparent:alpha.regionCount>0};
  }

  function extendBleedUnderArtwork(imageData,activeMask,originalData,w,h,radius=2){
    const r=Math.max(1,Math.round(radius));
    if(!activeMask.some(Boolean))return 0;
    const target=dilateMask(activeMask,w,h,r),d=imageData.data,src=new Uint8ClampedArray(d),od=originalData.data;let painted=0;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=y*w+x,t=i*4;if(!target[i]||od[t+3]===0||activeMask[i])continue;
      let best=-1,bestD=Infinity;
      for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){
        const d2=dx*dx+dy*dy;if(d2>r*r)continue;const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;const ni=yy*w+xx;if(!activeMask[ni]||d2>=bestD)continue;best=ni;bestD=d2;
      }
      if(best<0)continue;const bt=best*4;d[t]=src[bt];d[t+1]=src[bt+1];d[t+2]=src[bt+2];d[t+3]=255;painted++;
    }
    return painted;
  }

  function antialiasBleedEdge(imageData,activeMask,printMask,noWrite,w,h){
    if(!activeMask||!activeMask.some(Boolean))return 0;
    const d=imageData.data,src=new Uint8ClampedArray(d),weights=[[-1,0,.28],[1,0,.28],[0,-1,.28],[0,1,.28],[-1,-1,.13],[1,-1,.13],[-1,1,.13],[1,1,.13]];
    let painted=0;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=y*w+x,t=i*4;
      if(printMask[i]||(noWrite&&noWrite[i]))continue;
      let coverage=0,rr=0,gg=0,bb=0,colorWeight=0;
      for(const[dx,dy,wt]of weights){
        const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;
        const ni=yy*w+xx;if(!activeMask[ni])continue;
        const nt=ni*4;coverage+=wt;rr+=src[nt]*wt;gg+=src[nt+1]*wt;bb+=src[nt+2]*wt;colorWeight+=wt;
      }
      if(!colorWeight)continue;
      const alpha=Math.round(clamp(coverage,0,.68)*255);
      if(alpha<18)continue;
      d[t]=Math.round(rr/colorWeight);d[t+1]=Math.round(gg/colorWeight);d[t+2]=Math.round(bb/colorWeight);d[t+3]=alpha;painted++;
    }
    return painted;
  }

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
    const errorLimit=clamp(1.05+epsilon*.42,1.35,3.4),maxAnchors=Math.min(raw.length,512);
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
      // 직선 판정을 너무 민감하게 하면 완만한 곡선이 짧은 다각형 조각으로 끊겨 보인다.
      // cubic 제어점이 같은 접선 위에 놓이면 실제 직선도 그대로 표현되므로 자동 칼선은 모두 곡선 세그먼트로 유지한다.
      fit.linear=false;
      segments.push(fit);
    }
    return {nodes,segments,epsilon};
  }

  function attachCurveMetadata(raw, path, epsilon){
    const meta=curveMetadata(raw,path,epsilon);
    try{Object.defineProperty(path,'_curveMeta',{value:meta,writable:true,configurable:true,enumerable:false});}catch(_){path._curveMeta=meta;}
    return path;
  }

  function resampleClosedPath(points, spacing) {
    if (!points || points.length < 3) return points ? points.slice() : [];
    const n = points.length, lengths = new Float64Array(n), cumulative = new Float64Array(n + 1);
    let total = 0;
    for (let i = 0; i < n; i++) {
      const a = points[i], b = points[(i + 1) % n], len = Math.hypot(b.x - a.x, b.y - a.y);
      lengths[i] = len; total += len; cumulative[i + 1] = total;
    }
    if (total < 1e-6) return points.slice();
    const count = clamp(Math.round(total / Math.max(.45, spacing)), 12, 4096);
    const step = total / count, out = [];
    let segment = 0;
    for (let k = 0; k < count; k++) {
      const target = k * step;
      while (segment < n - 1 && cumulative[segment + 1] < target) segment++;
      const a = points[segment], b = points[(segment + 1) % n], len = Math.max(1e-9, lengths[segment]);
      const t = clamp((target - cumulative[segment]) / len, 0, 1);
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
    return out;
  }

  function laplacianClosedStep(points, factor) {
    const n = points.length, out = new Array(n);
    for (let i = 0; i < n; i++) {
      const prev = points[(i - 1 + n) % n], p = points[i], next = points[(i + 1) % n];
      const tx = (prev.x + next.x) * .5, ty = (prev.y + next.y) * .5;
      out[i] = { x: p.x + (tx - p.x) * factor, y: p.y + (ty - p.y) * factor };
    }
    return out;
  }

  function pathCentroid(points) {
    if(!points?.length)return{x:0,y:0};
    let sx=0,sy=0;for(const p of points){sx+=p.x;sy+=p.y;}return{x:sx/points.length,y:sy/points.length};
  }

  function preserveContourArea(reference, points) {
    const a0=Math.abs(polygonArea(reference)),a1=Math.abs(polygonArea(points));
    if(a0<1e-5||a1<1e-5)return points;
    const c0=pathCentroid(reference),c1=pathCentroid(points),scale=clamp(Math.sqrt(a0/a1),.94,1.06);
    return points.map(p=>({x:c0.x+(p.x-c1.x)*scale,y:c0.y+(p.y-c1.y)*scale}));
  }

  function circularLowPass(points, radius, blend=.72) {
    const n=points.length;if(n<5)return points.slice();
    radius=clamp(Math.round(radius),1,Math.max(1,Math.floor(n/12)));
    const sigma=Math.max(1,radius*.58),weights=[];let weightSum=0;
    for(let k=-radius;k<=radius;k++){const w=Math.exp(-(k*k)/(2*sigma*sigma));weights.push(w);weightSum+=w;}
    const out=new Array(n);
    for(let i=0;i<n;i++){
      let x=0,y=0;
      for(let k=-radius;k<=radius;k++){const p=points[(i+k+n)%n],w=weights[k+radius];x+=p.x*w;y+=p.y*w;}
      x/=weightSum;y/=weightSum;
      out[i]={x:points[i].x+(x-points[i].x)*blend,y:points[i].y+(y-points[i].y)*blend};
    }
    return out;
  }

  // 픽셀 외곽의 1~2 px 요철은 실제 칼선 형상이 아니라 알파 임계값과 래스터 격자에서 생긴 잡음입니다.
  // 먼저 촘촘한 등간격 곡선으로 바꾸고 물리 단위(mm) 기준 저역 통과 필터를 적용한 뒤,
  // 면적을 복원해 둥근 외곽이 안쪽으로 줄어드는 현상을 억제합니다.
  function conditionCutContour(points, ppm) {
    if (!points || points.length < 8) return points ? points.slice() : [];
    const fineSpacing=clamp(AUTO_CUT_RESAMPLE_MM*ppm,.5,1.05);
    const reference=resampleClosedPath(points,fineSpacing);
    let out=reference.map(p=>({...p}));
    const radius=clamp(Math.round((.20*ppm)/fineSpacing),2,7);
    const passes=clamp(Math.round(3+ppm*.16),4,7);
    for(let i=0;i<passes;i++)out=circularLowPass(out,radius,i===passes-1?.58:.72);
    return preserveContourArea(reference,out);
  }

  function prepareCutPaths(paths,ppm){
    const anchorSpacing=clamp(.42*ppm,1.8,5.2);
    return paths.map(raw=>{
      const conditioned=conditionCutContour(raw,ppm);
      // 균일한 앵커만 남기고 curveSegments의 cubic Catmull-Rom 보간으로 연결합니다.
      // 작은 오목 노이즈를 강제로 꼭짓점으로 보존하지 않으므로 긴 원호가 찌글찌글해지지 않습니다.
      return resampleClosedPath(conditioned,anchorSpacing);
    }).filter(p=>p.length>=8&&Math.abs(polygonArea(p))>3);
  }

  function blendDirection(a,b,t){return normalizedVector(a.x*(1-t)+b.x*t,a.y*(1-t)+b.y*t,b);}

  function curveSegments(path, smoothAmount = AUTO_CUT_CURVE) {
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
  function makeCapsuleMask(w,h,x1,y1,x2,y2,r){
    const out=new Uint8Array(w*h),dx=x2-x1,dy=y2-y1,len2=dx*dx+dy*dy,rr=r*r;
    const minX=Math.max(0,Math.floor(Math.min(x1,x2)-r-1)),maxX=Math.min(w-1,Math.ceil(Math.max(x1,x2)+r+1));
    const minY=Math.max(0,Math.floor(Math.min(y1,y2)-r-1)),maxY=Math.min(h-1,Math.ceil(Math.max(y1,y2)+r+1));
    for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
      const px=x+.5,py=y+.5,t=len2>1e-8?clamp(((px-x1)*dx+(py-y1)*dy)/len2,0,1):0;
      const qx=x1+t*dx,qy=y1+t*dy,ddx=px-qx,ddy=py-qy;if(ddx*ddx+ddy*ddy<=rr)out[y*w+x]=1;
    }
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
  function getHoleSpec(ppm,hole,applied=false){
    const diameter=clamp(Number(applied?hole.appliedDiameterMm:hole.draftDiameterMm)||3,1.5,12),wall=clamp(Number(applied?hole.appliedWallMm:hole.draftWallMm)||1.5,.6,8),inset=clamp(Number(applied?hole.appliedInsetMm:hole.draftInsetMm)||2.5,.5,15),rawExternalGap=Number(applied?hole.appliedExternalGapMm:hole.draftExternalGapMm),externalGap=clamp(Number.isFinite(rawExternalGap)?rawExternalGap:Math.max(0,wall*.28),0,20);
    return{diameterMm:diameter,wallMm:wall,insetMm:inset,externalGapMm:externalGap,innerR:diameter*ppm/2,wallPx:wall*ppm,outerR:(diameter/2+wall)*ppm,insetPx:inset*ppm,externalGapPx:externalGap*ppm};
  }
  function snapInternal(mask,w,h,x,y,required,insideDistance=null){
    const dist=insideDistance||distanceToMask(mask,w,h,0),ok=(xx,yy)=>xx>=0&&yy>=0&&xx<w&&yy<h&&mask[Math.round(yy)*w+Math.round(xx)]&&dist[Math.round(yy)*w+Math.round(xx)]>required*required;
    x=clamp(x,0,w-1);y=clamp(y,0,h-1);if(ok(x,y))return{x,y};
    const maxR=Math.max(w,h);for(let r=2;r<maxR;r+=2){const samples=Math.max(16,Math.ceil(r*.8));for(let j=0;j<samples;j++){const a=j*Math.PI*2/samples,xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r;if(ok(xx,yy))return{x:xx,y:yy};}}
    const b=maskBounds(mask,w,h);return{x:b.cx,y:b.cy};
  }
  function snapExternal(mask,w,h,x,y,innerR,gapPx,boundaryPoints=null,bounds=null){
    const pts=boundaryPoints||boundaryPointList(mask,w,h,2),b=bounds||maskBounds(mask,w,h),edge=nearestPoint(pts,x,y)||{x:b.cx,y:b.minY};
    let dir=normalizedVector(edge.x-b.cx,edge.y-b.cy,{x:0,y:-1});
    if(Math.abs(dir.y)<.12&&edge.y<=b.minY+3)dir={x:0,y:-1};
    const offset=Math.max(innerR,innerR+Math.max(0,gapPx));
    return{x:edge.x+dir.x*offset,y:edge.y+dir.y*offset};
  }
  function resolveHolePosition(mask,w,h,pad,ppm,mode,xMm,yMm,spec,insideDistance=null,boundaryPoints=null,bounds=null){
    const b=bounds||maskBounds(mask,w,h);let x=Number.isFinite(xMm)?pad+xMm*ppm:b.cx,y=Number.isFinite(yMm)?pad+yMm*ppm:b.minY;
    if(mode==='internal'){
      if(!Number.isFinite(xMm)||!Number.isFinite(yMm)){x=b.cx;y=b.minY+spec.innerR+spec.insetPx;}
      return snapInternal(mask,w,h,x,y,spec.innerR+spec.insetPx,insideDistance);
    }
    if(!Number.isFinite(xMm)||!Number.isFinite(yMm)){x=b.cx;y=b.minY-spec.innerR-spec.externalGapPx;}
    return snapExternal(mask,w,h,x,y,spec.innerR,spec.externalGapPx,boundaryPoints,b);
  }
  function ensureDraftHolePosition(hole=getSelectedHole(),forceDefault=false,silent=false){
    const r=state.result;if(!r||r.mode!=='acrylic'||!hole)return;
    const spec=getHoleSpec(r.ppm,hole,false),mode=hole.draftMode,b=r.constraintBounds||maskBounds(r.constraintMask,r.widthPx,r.heightPx);
    let xMm=forceDefault?null:hole.draftXmm,yMm=forceDefault?null:hole.draftYmm;
    if(forceDefault){
      const peers=state.holes.filter(h=>h.draftMode===mode),index=Math.max(0,peers.indexOf(hole));
      const spacing=Math.max(spec.outerR*2.15,6*r.ppm);
      const slot=index===0?0:(index%2?Math.ceil(index/2):-Math.ceil(index/2));
      const px=clamp(b.cx+slot*spacing,b.minX,b.maxX),py=mode==='internal'?b.minY+spec.innerR+spec.insetPx:b.minY-spec.innerR-spec.externalGapPx;
      xMm=(px-r.pad)/r.ppm;yMm=(py-r.pad)/r.ppm;
    }
    const pos=resolveHolePosition(r.constraintMask,r.widthPx,r.heightPx,r.pad,r.ppm,mode,xMm,yMm,spec,r.insideDistance,r.boundaryPoints,r.constraintBounds);
    hole.draftXmm=(pos.x-r.pad)/r.ppm;hole.draftYmm=(pos.y-r.pad)/r.ppm;updateHoleDirtyFlag(hole);
    if(!silent){updateHoleUi();drawPreview();}
  }
  function ensureAllDraftHolePositions(){
    for(const hole of state.holes)if(!Number.isFinite(hole.draftXmm)||!Number.isFinite(hole.draftYmm))ensureDraftHolePosition(hole,true,true);
    updateHoleUi();
  }
  function centerSelectedHoles(){
    const r=state.result;if(!r||r.mode!=='acrylic')return;
    normalizeHoleSelection();
    const selected=state.holes.filter(hole=>isHoleSelected(hole.id));if(!selected.length)return;
    const b=r.constraintBounds||maskBounds(r.constraintMask,r.widthPx,r.heightPx);
    const positions=selected.map(hole=>({hole,pos:draftHolePixel(hole,r)})).filter(item=>item.pos);
    if(!positions.length)return;
    const groupMinX=Math.min(...positions.map(item=>item.pos.x)),groupMaxX=Math.max(...positions.map(item=>item.pos.x));
    const groupCenterX=(groupMinX+groupMaxX)/2,designCenterX=(b.minX+b.maxX)/2;
    const shiftX=designCenterX-groupCenterX;
    for(const {hole,pos} of positions){
      const spec=getHoleSpec(r.ppm,hole,false);
      const targetX=pos.x+shiftX,targetY=pos.y;
      const snapped=resolveHolePosition(r.constraintMask,r.widthPx,r.heightPx,r.pad,r.ppm,hole.draftMode,(targetX-r.pad)/r.ppm,(targetY-r.pad)/r.ppm,spec,r.insideDistance,r.boundaryPoints,r.constraintBounds);
      hole.draftXmm=(snapped.x-r.pad)/r.ppm;hole.draftYmm=(snapped.y-r.pad)/r.ppm;updateHoleDirtyFlag(hole);
    }
    updateHoleUi();drawPreview();schedulePersist(0);
  }
  function draftHolePixel(hole,r=state.result){if(!r||!hole||!Number.isFinite(hole.draftXmm)||!Number.isFinite(hole.draftYmm))return null;return{x:r.pad+hole.draftXmm*r.ppm,y:r.pad+hole.draftYmm*r.ppm};}

  async function generateAcrylic() {
    if (state.mode !== 'acrylic' || !state.source) { drawPreview(); return; }
    const token=++state.generationToken;setBusy(true);await nextFrame();
    try{
      const style=currentFinishStyle('acrylic'),boardWidthMm=clamp(num(els.productWidth,70),5,1000),boardHeightMm=clamp(num(els.productHeight,70),5,1000);
      const artworkBoxWidthMm=clamp(num(els.artworkWidth,60),1,1000),artworkBoxHeightMm=clamp(num(els.artworkHeight,60),1,1000),lockAspect=els.lockArtworkAspect?.checked!==false;
      const bleedMm=style==='borderless'?clamp(num(els.bleedMm,2),0,20):0,borderMm=style==='bordered'?clamp(num(els.acrylicBorderMm,2),0,20):0;
      const threshold=clamp(num(style==='borderless'?els.alphaThreshold:els.alphaThresholdBordered,24),1,254),includeHoles=els.includeHoles.checked,flatBase=els.addFlatBase.checked,baseGapMode=state.baseGapMode,baseRoundRatio=clamp(num(els.baseCornerRadius,55),0,100)/100;
      const targetMaxPx=getProcessingMaxDimension(),ppm=clamp(targetMaxPx/Math.max(boardWidthMm,boardHeightMm),2.2,12),coreW=Math.max(24,Math.round(boardWidthMm*ppm)),coreH=Math.max(24,Math.round(boardHeightMm*ppm));
      const bleedPx=Math.round(bleedMm*ppm),borderPx=Math.round(borderMm*ppm);
      const cleanAppliedHoleIds=new Set(state.holes.filter(hole=>!holeIsDirty(hole)).map(hole=>hole.id));
      const appliedHoleEntries=state.holes.filter(h=>['internal','external'].includes(h.appliedMode)).map(hole=>({hole,spec:getHoleSpec(ppm,hole,true)}));
      // 아크릴 대지는 출력 파일의 정확한 크기이고, 그림은 그 안에서 별도 크기로 가운데 배치됩니다.
      const pad=0,w=coreW,h=coreH;
      const original=makeCanvas(w,h),octx=original.getContext('2d',{willReadFrequently:true}),trim=getCachedTrimBounds(state.source,threshold);
      const targetDrawW=Math.max(1,artworkBoxWidthMm*ppm),targetDrawH=Math.max(1,artworkBoxHeightMm*ppm);
      const fit=lockAspect?Math.min(targetDrawW/trim.sw,targetDrawH/trim.sh):null;
      const drawW=lockAspect?trim.sw*fit:targetDrawW,drawH=lockAspect?trim.sh*fit:targetDrawH,dx=(w-drawW)/2,dy=(h-drawH)/2;
      octx.imageSmoothingEnabled=true;octx.imageSmoothingQuality='high';octx.drawImage(state.source.img,trim.sx,trim.sy,trim.sw,trim.sh,dx,dy,drawW,drawH);
      let originalData=octx.getImageData(0,0,w,h),rawObjectMask=suppressNeedleProtrusions(stabilizeAlphaMask(originalData,threshold,getBoundarySamplingConfig()),w,h,ppm);
      clearUnsupportedArtworkPixels(original,rawObjectMask,w,h,2);
      originalData=octx.getImageData(0,0,w,h);
      let bottomAnalysis=style==='borderless'&&flatBase?analyzeBottomProtrusions(rawObjectMask,w,h):null;
      const originalBottomAnalysis=bottomAnalysis;
      let levelY=null;
      if(style==='borderless'&&flatBase&&state.borderlessBaseLevel&&bottomAnalysis){
        const liftPx=clamp(num(els.baseLiftMm,0),0,15)*ppm;
        levelY=clamp(Math.min(bottomAnalysis.left.y,bottomAnalysis.right.y)+1-liftPx,pad+2,h-pad-2);
        cropCanvasBelow(original,levelY);
        originalData=octx.getImageData(0,0,w,h);
        rawObjectMask=suppressNeedleProtrusions(stabilizeAlphaMask(originalData,threshold,getBoundarySamplingConfig()),w,h,ppm);
        clearUnsupportedArtworkPixels(original,rawObjectMask,w,h,2);
        originalData=octx.getImageData(0,0,w,h);
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
        if(base&&baseRoundRatio>0){
          const maxRoundPx=Math.min(4*ppm,Math.max(1,(base.x2-base.x1)*.075));
          artOuterMask=roundBaseMask(artOuterMask,base,w,h,maxRoundPx*baseRoundRatio);
          baseAddedMask=clipBaseAddedMask(differenceMask(artOuterMask,unbasedOuterMask),base,w,h);
          artOuterMask=unionMask(unbasedOuterMask,baseAddedMask);
        }
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
      let narrowInletPixels=0;
      if(style==='bordered'){
        // 재단이 어려운 좁은 홈은 도안 자체의 유테 외곽에서 먼저 정리합니다.
        // 밑받침을 합친 뒤 실행하면 `빈 공간 유지`로 만든 받침 위의 통로까지
        // 4 mm 이하 홈으로 오인해 메우므로, 받침과 칼선이 달라붙어 보이게 됩니다.
        const bridged=bridgeNarrowCutInlets(baseSilhouetteMask,w,h,ppm,4);
        baseSilhouetteMask=bridged.mask;narrowInletPixels=bridged.addedPixels;
      }
      if(style==='bordered'&&flatBase){
        const tolerance=clamp(num(els.baseColorTolerance,18),4,60);
        const support=buildBorderedSupport(
          originalData,rawObjectMask,baseSilhouetteMask,w,h,borderPx,
          state.baseSupportMode,tolerance,baseRoundRatio,baseGapMode==='transparent'
        );
        baseSilhouetteMask=support.mask;base=support.base;baseAddedMask=support.supportOnly;supportInterior=support.supportInterior;
      }

      const constraintBounds=maskBounds(baseSilhouetteMask,w,h),insideDistance=distanceToMask(baseSilhouetteMask,w,h,0),boundaryPoints=boundaryPointList(baseSilhouetteMask,w,h,2);
      let protectedTransparent=null,transparentCarrier=null,combinedSilhouetteMask=baseSilhouetteMask,maxJointRoundPx=0;
      let objectMask=new Uint8Array(rawObjectMask),artworkOutput=makeCanvas(w,h);artworkOutput.getContext('2d').drawImage(original,0,0);
      const holeResults=[];
      for(const entry of appliedHoleEntries){
        const {hole,spec}=entry,mode=hole.appliedMode;
        const position=resolveHolePosition(baseSilhouetteMask,w,h,pad,ppm,mode,hole.appliedXmm,hole.appliedYmm,spec,insideDistance,boundaryPoints,constraintBounds);
        hole.appliedXmm=(position.x-pad)/ppm;hole.appliedYmm=(position.y-pad)/ppm;
        const holeDisk=makeCircleMask(w,h,position.x,position.y,spec.innerR);
        let outerDisk=null,carrier=null;
        if(mode==='external'){
          objectMask=subtractMask(objectMask,holeDisk);
          outerDisk=makeCircleMask(w,h,position.x,position.y,spec.outerR);
          const edge=nearestPoint(boundaryPoints,position.x,position.y)||{x:constraintBounds.cx,y:constraintBounds.minY};
          const dir=normalizedVector(position.x-edge.x,position.y-edge.y,{x:0,y:-1});
          const connectorRadius=Math.max(spec.wallPx*.82,.55*ppm);
          const connectorEndX=position.x-dir.x*Math.max(0,spec.outerR-connectorRadius*.55);
          const connectorEndY=position.y-dir.y*Math.max(0,spec.outerR-connectorRadius*.55);
          const connectorStartX=edge.x-dir.x*Math.min(spec.wallPx*.35,.45*ppm);
          const connectorStartY=edge.y-dir.y*Math.min(spec.wallPx*.35,.45*ppm);
          const connector=makeCapsuleMask(w,h,connectorStartX,connectorStartY,connectorEndX,connectorEndY,connectorRadius);
          const externalAcrylic=unionMask(outerDisk,connector);
          combinedSilhouetteMask=unionMask(combinedSilhouetteMask,externalAcrylic);
          maxJointRoundPx=Math.max(maxJointRoundPx,clamp(Math.round(Math.min(spec.wallPx*.42,.65*ppm)),1,Math.max(1,Math.round(spec.wallPx*.6))));
          const ringTransparent=subtractMask(externalAcrylic,rawObjectMask);
          carrier=unionMask(ringTransparent,holeDisk);
          protectedTransparent=protectedTransparent?unionMask(protectedTransparent,carrier):carrier;
          transparentCarrier=transparentCarrier?unionMask(transparentCarrier,carrier):carrier;
          holeResults.push({id:hole.id,mode,position,spec,holeDisk,outerDisk,connector,carrier});
          continue;
        }
        holeResults.push({id:hole.id,mode,position,spec,holeDisk,outerDisk,carrier});
      }
      if(maxJointRoundPx>0)combinedSilhouetteMask=erodeMask(dilateMask(combinedSilhouetteMask,w,h,maxJointRoundPx),w,h,maxJointRoundPx);
      if(protectedTransparent)clearCanvasWithMask(artworkOutput,protectedTransparent);
      const transparentPropagation=style==='borderless'&&transparentCarrier
        ?buildExternalTransparentBleedMask(transparentCarrier,objectMask,combinedSilhouetteMask,w,h,bleedPx)
        :null;
      const transparentNoWrite=protectedTransparent&&transparentPropagation?unionMask(protectedTransparent,transparentPropagation):(protectedTransparent||transparentPropagation);

      const bleed=makeCanvas(w,h),fullPrint=makeCanvas(w,h);let printMask=objectMask;
      if(style==='borderless'){
        const baseNoBleed=flatBase&&baseGapMode==='transparent'?buildBaseNoBleed(baseAddedMask,objectMask,w,h,bleedPx):null;
        const result=makeBleed(originalData,objectMask,combinedSilhouetteMask,imageHoleMask,w,h,bleedPx,includeHoles,baseNoBleed,protectedTransparent,transparentPropagation);
        bleed.getContext('2d').putImageData(result.imageData,0,0);printMask=result.printMask;
      }else if(flatBase&&baseGapMode==='fill'&&supportInterior){
        const fillTarget=unionMask(artOuterMask,supportInterior);
        const baseFill=makeBleed(originalData,objectMask,fillTarget,imageHoleMask,w,h,0,false,null,protectedTransparent,transparentPropagation),baseCanvas=makeCanvas(w,h);
        baseCanvas.getContext('2d').putImageData(baseFill.imageData,0,0);printMask=baseFill.printMask;
        const composed=makeCanvas(w,h),actx=composed.getContext('2d');actx.drawImage(baseCanvas,0,0);actx.drawImage(artworkOutput,0,0);artworkOutput=composed;
      }
      if(transparentNoWrite)clearCanvasWithMask(bleed,transparentNoWrite);
      if(protectedTransparent)clearCanvasWithMask(artworkOutput,protectedTransparent);
      const fctx=fullPrint.getContext('2d');if(style==='borderless')fctx.drawImage(bleed,0,0);fctx.drawImage(artworkOutput,0,0);

      let cutPaths=traceContours(combinedSilhouetteMask,w,h).filter(p=>polygonArea(p)>0);
      if(includeHoles&&imageHolePaths.length){
        if(style==='borderless')cutPaths.push(...imageHolePaths);
        else{const cutHoles=erodeMask(imageHoleMask,w,h,borderPx);cutPaths.push(...traceContours(cutHoles,w,h).filter(p=>Math.abs(polygonArea(p))>3));}
      }
      for(const holeResult of holeResults)cutPaths.push(circlePath(holeResult.position.x,holeResult.position.y,holeResult.spec.innerR,true));
      cutPaths=prepareCutPaths(cutPaths,ppm);
      let whiteBaseMask=style==='borderless'||(style==='bordered'&&flatBase&&baseGapMode==='fill')?new Uint8Array(printMask):new Uint8Array(objectMask);
      const whiteLayers=buildWhiteLayerMasks(whiteBaseMask,originalData,transparentNoWrite),whiteOpaque=whiteCanvasFromMask(whiteLayers.opaque,w,h),white=whiteCanvasFromMask(whiteLayers.full,w,h);
      const actualWmm=drawW/ppm,actualHmm=drawH/ppm,ppi=Math.min(trim.sw/(actualWmm/25.4),trim.sh/(actualHmm/25.4));
      const contentBounds=maskBounds(unionMask(combinedSilhouetteMask,printMask),w,h),edgeLimit=Math.max(2,Math.round(.45*ppm));
      const touchesArtboardEdge=contentBounds.minX<=edgeLimit||contentBounds.minY<=edgeLimit||contentBounds.maxX>=w-1-edgeLimit||contentBounds.maxY>=h-1-edgeLimit
        ||holeResults.some(item=>item.mode==='external'&&(item.position.x-item.spec.outerR<0||item.position.y-item.spec.outerR<0||item.position.x+item.spec.outerR>w||item.position.y+item.spec.outerR>h));
      state.result={mode:'acrylic',finishStyle:style,widthPx:w,heightPx:h,widthMm:boardWidthMm,heightMm:boardHeightMm,productWidthMm:boardWidthMm,productHeightMm:boardHeightMm,artworkBoxWidthMm,artworkBoxHeightMm,lockArtworkAspect:lockAspect,ppm,pad,coreW,coreH,original:artworkOutput,white,whiteOpaque,hasSemiTransparent:whiteLayers.hasSemiTransparent,semiTransparentPixelCount:whiteLayers.semiCount,semiTransparentRegionCount:whiteLayers.semiRegionCount,bleed,fullPrint,cutPaths,cutCurve:AUTO_CUT_CURVE,outerPaths,imageHolePaths,includeHoles,base,baseGapMode,baseSupportMode:state.baseSupportMode,borderlessBaseLevel:state.borderlessBaseLevel,baseLiftMm:clamp(num(els.baseLiftMm,0),0,15),baseCornerRadius:Math.round(baseRoundRatio*100),ppi,actualWmm,actualHmm,touchesArtboardEdge,constraintMask:baseSilhouetteMask,constraintBounds,insideDistance,boundaryPoints,holes:holeResults,combinedSilhouetteMask,transparentPropagation,narrowInletPixels,narrowInletGapMm:4};
      updateWhiteLayerUi();
      for(const resultHole of holeResults){
        const hole=state.holes.find(item=>item.id===resultHole.id);
        if(hole&&cleanAppliedHoleIds.has(hole.id)){
          hole.draftMode=hole.appliedMode;hole.draftXmm=hole.appliedXmm;hole.draftYmm=hole.appliedYmm;
          hole.draftDiameterMm=hole.appliedDiameterMm;hole.draftWallMm=hole.appliedWallMm;hole.draftInsetMm=hole.appliedInsetMm;hole.draftExternalGapMm=hole.appliedExternalGapMm;hole.dirty=false;
        }
      }
      ensureAllDraftHolePositions();updateQualityAcrylic(ppi,actualWmm,actualHmm,touchesArtboardEdge);
      const internalCount=holeResults.filter(h=>h.mode==='internal').length,externalCount=holeResults.filter(h=>h.mode==='external').length;
      const holeLabel=holeResults.length?` · 타공 ${holeResults.length}개${internalCount?`(내부 ${internalCount}`:'('}${internalCount&&externalCount?' / ':''}${externalCount?`외부 ${externalCount}`:''})`:'';
      const baseLabel=flatBase?` · 밑바닥 ${baseGapMode==='transparent'?'빈 공간':'색상 채움'}/${style==='bordered'?(state.baseSupportMode==='color'?'색 덩어리':'전체 폭'):(state.borderlessBaseLevel?'수평 보정':'두 점 연결')}`:'';
      const semiLabel=whiteLayers.hasSemiTransparent?` · 실제 반투명 면 ${whiteLayers.semiRegionCount}개 감지`:'';
      const edgeLabel=touchesArtboardEdge?' · 대지 가장자리 주의':'';
      const inletLabel=style==='bordered'&&narrowInletPixels?` · 4 mm 이하 좁은 홈 자동 연결`:'';
      els.geometryMeta.textContent=`${style==='borderless'?'무테':'유테'}${baseLabel}${holeLabel} · 대지 ${boardWidthMm.toFixed(1)} × ${boardHeightMm.toFixed(1)} mm · 실제 그림 ${actualWmm.toFixed(1)} × ${actualHmm.toFixed(1)} mm · ${Math.round(ppi)} ppi · 칼선 ${cutPaths.length}개${inletLabel}${semiLabel}${edgeLabel}`;
      updateAcrylicSizeSummary();
      if(token===state.generationToken){drawPreview();schedulePersist(260);}
    }catch(err){console.error(err);setNotice('bad','생성할 수 없습니다',err.message||'이미지 처리 중 오류가 발생했습니다.');}finally{if(token===state.generationToken)setBusy(false);}
  }


  function updateQualityAcrylic(ppi,wMm,hMm,touchesArtboardEdge=false){
    if(touchesArtboardEdge){
      setNotice('warn','대지 가장자리와 너무 가깝습니다',`그림·재단여백 또는 외부 타공이 대지 끝에 닿아 일부가 잘릴 수 있습니다. 대지를 키우거나 그림 크기를 줄여 주세요. 현재 그림 ${wMm.toFixed(1)} × ${hMm.toFixed(1)} mm · ${Math.round(ppi)} ppi`);
      return;
    }
    if(ppi>=300)setNotice('good',`인쇄 해상도 양호 · ${Math.round(ppi)} ppi`,`현재 그림 크기 ${wMm.toFixed(1)} × ${hMm.toFixed(1)} mm에서 300 ppi 이상입니다.`);
    else if(ppi>=180)setNotice('warn',`확대 시 주의 · ${Math.round(ppi)} ppi`,'가까이서 보면 가장자리나 세부가 다소 흐려질 수 있습니다. 300 ppi 이상을 권장합니다.');
    else setNotice('bad',`화질 깨짐 위험 · ${Math.round(ppi)} ppi`,'입력 크기에 비해 원본 픽셀이 부족합니다. 더 큰 이미지를 쓰거나 그림 크기를 줄여 주세요.');
  }

  function renderStickerLocal(sticker, ppm, boardW, boardH, padPx) {
    const w=sticker.widthMm*ppm,h=w*sticker.naturalHeight/sticker.naturalWidth,a=sticker.rotation*Math.PI/180,ca=Math.abs(Math.cos(a)),sa=Math.abs(Math.sin(a));
    const bboxW=w*ca+h*sa,bboxH=w*sa+h*ca,cx=sticker.xMm*ppm,cy=sticker.yMm*ppm;
    const left=clamp(Math.floor(cx-bboxW/2-padPx),0,boardW-1),top=clamp(Math.floor(cy-bboxH/2-padPx),0,boardH-1),right=clamp(Math.ceil(cx+bboxW/2+padPx),left+1,boardW),bottom=clamp(Math.ceil(cy+bboxH/2+padPx),top+1,boardH);
    const canvas=makeCanvas(right-left,bottom-top),cctx=canvas.getContext('2d',{willReadFrequently:true});
    cctx.save();cctx.translate(cx-left,cy-top);cctx.rotate(a);cctx.imageSmoothingEnabled=true;cctx.imageSmoothingQuality='high';cctx.drawImage(sticker.img,-w/2,-h/2,w,h);cctx.restore();
    return {canvas,left,top,widthPx:w,heightPx:h};
  }

  function hexToRgba(color,opacity=1){ return colorToCss(color,opacity); }
  function seededRandom(x,y,seed=0){let n=(x*374761393+y*668265263+seed*1442695041)|0;n=(n^(n>>>13))*1274126177;return ((n^(n>>>16))>>>0)/4294967296;}
  function drawShapeParticle(cctx,kind,x,y,size){
    cctx.beginPath();
    if(kind==='dots'){cctx.arc(x,y,size/2,0,Math.PI*2);}
    else if(kind==='hearts'){const r=size/2;cctx.moveTo(x,y+r*.72);cctx.bezierCurveTo(x-r*1.2,y-r*.08,x-r*.82,y-r,x,y-r*.34);cctx.bezierCurveTo(x+r*.82,y-r,x+r*1.2,y-r*.08,x,y+r*.72);}
    else {const r=size/2;for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.43:r,px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;i?cctx.lineTo(px,py):cctx.moveTo(px,py);}cctx.closePath();}
    cctx.fill();
  }
  function greatestCommonDivisor(a,b){a=Math.abs(Math.round(a));b=Math.abs(Math.round(b));while(b){const t=a%b;a=b;b=t;}return a||1;}
  function smallestCoprimeRowStep(count){
    count=Math.max(1,Math.round(count));if(count<=1)return 1;
    for(let step=2;step<count*2+3;step++)if(greatestCommonDivisor(step,count)===1)return step;
    return 1;
  }
  function drawTemplatePattern(cctx,w,h,opts={}){
    const kind=opts.kind||'dots',bg=opts.bg||'#ffffff',fg=opts.fg||'#9ed7ec',size=Math.max(2,opts.sizePx||24),gap=Math.max(0,opts.gapPx||12),unit=Math.max(3,size+gap),offX=Number(opts.offX)||0,offY=Number(opts.offY)||0,layout=opts.layout||'square',order=opts.order||'balanced',rotationMode=opts.rotationMode||'fixed',fixedRotation=(Number(opts.rotation)||0)*Math.PI/180,rotationMin=(Number(opts.rotationMin)||0)*Math.PI/180,rotationMax=(Number(opts.rotationMax)||0)*Math.PI/180;
    cctx.save();
    if(opts.bgType==='gradient')drawGradientBackground(cctx,w,h,opts.bgA||bg,opts.bgB||bg,opts.bgAngle||0);
    else {cctx.fillStyle=bg;cctx.fillRect(0,0,w,h);}
    cctx.strokeStyle=fg;cctx.fillStyle=fg;cctx.lineWidth=Math.max(.5,opts.lineWidthPx||1);cctx.lineCap='round';
    cctx.setLineDash(opts.lineStyle==='dashed'?[Math.max(2,cctx.lineWidth*3),Math.max(2,cctx.lineWidth*2)]:[]);
    const ox=((offX%unit)+unit)%unit-unit,oy=((offY%unit)+unit)%unit-unit;
    if(['square-grid','diagonal-grid','stripes'].includes(kind)){
      if(kind==='square-grid'){for(let x=ox;x<w+unit;x+=unit){cctx.beginPath();cctx.moveTo(x,0);cctx.lineTo(x,h);cctx.stroke();}for(let y=oy;y<h+unit;y+=unit){cctx.beginPath();cctx.moveTo(0,y);cctx.lineTo(w,y);cctx.stroke();}}
      else {for(let k=-h+ox;k<w+h;k+=unit){cctx.beginPath();cctx.moveTo(k,0);cctx.lineTo(k+h,h);cctx.stroke();if(kind==='diagonal-grid'){cctx.beginPath();cctx.moveTo(k+h,0);cctx.lineTo(k,h);cctx.stroke();}}}
      cctx.restore();return;
    }
    const images=Array.isArray(opts.images)?opts.images.filter(Boolean):[],rowStep=smallestCoprimeRowStep(images.length),previousRow=[];
    let row=0;
    for(let y=oy+unit/2;y<h+unit;y+=unit,row++){
      const stagger=layout==='diagonal'?(row%2)*unit/2:0,currentRow=[];let col=0;
      for(let x=ox+unit/2+stagger;x<w+unit;x+=unit,col++){
        let px=x,py=y,index=images.length?((col+row*rowStep)%images.length):0;const rr=seededRandom(col,row,211),lo=Math.min(rotationMin,rotationMax),hi=Math.max(rotationMin,rotationMax);let rot=rotationMode==='random'?lo+(hi-lo)*rr:fixedRotation;
        if(order==='random'&&images.length){
          index=Math.floor(seededRandom(col,row,79)*images.length);
          if(images.length>1&&previousRow[col]===index){const jump=1+Math.floor(seededRandom(col,row,101)*(images.length-1));index=(index+jump)%images.length;}
        }
        currentRow[col]=index;
        if(layout==='random'){const a=seededRandom(col,row,17),b=seededRandom(col,row,31);px+=(a-.5)*gap*.9;py+=(b-.5)*gap*.9;}
        if(kind==='image'&&images.length){const rec=images[index],ratio=rec.naturalWidth/rec.naturalHeight;let dw=size,dh=size;if(ratio>1)dh=dw/ratio;else dw=dh*ratio;cctx.save();cctx.translate(px,py);cctx.rotate(rot);cctx.imageSmoothingEnabled=true;cctx.imageSmoothingQuality='high';cctx.drawImage(rec.img,-dw/2,-dh/2,dw,dh);cctx.restore();}
        else {cctx.save();cctx.translate(px,py);cctx.rotate(rot);drawShapeParticle(cctx,kind,0,0,size);cctx.restore();}
      }
      previousRow.length=0;for(let i=0;i<currentRow.length;i++)previousRow[i]=currentRow[i];
    }
    cctx.restore();
  }
  function drawGradientBackground(cctx,w,h,a,b,angleDeg){
    const aRad=(Number(angleDeg)||0)*Math.PI/180,cx=w/2,cy=h/2,len=Math.abs(w*Math.cos(aRad))+Math.abs(h*Math.sin(aRad));
    const dx=Math.cos(aRad)*len/2,dy=Math.sin(aRad)*len/2,g=cctx.createLinearGradient(cx-dx,cy-dy,cx+dx,cy+dy);g.addColorStop(0,a);g.addColorStop(1,b);cctx.fillStyle=g;cctx.fillRect(0,0,w,h);
  }
  function renderFlexibleBackground(w,h,widthMm,heightMm,opts){
    const canvas=makeCanvas(w,h),cctx=canvas.getContext('2d');cctx.imageSmoothingEnabled=true;cctx.imageSmoothingQuality='high';const ppm=w/widthMm,type=opts.type||'color';
    if(type==='transparent')return{canvas,ppi:Infinity};
    if(type==='color'){cctx.fillStyle=opts.color||'#fff';cctx.fillRect(0,0,w,h);return{canvas,ppi:Infinity};}
    if(type==='gradient'){drawGradientBackground(cctx,w,h,opts.gradientA||'#fff',opts.gradientB||'#ddd',opts.gradientAngle||0);return{canvas,ppi:Infinity};}
    if(type==='pattern'){
      const sizeMm=clamp(Number(opts.patternSize)||16,.5,200),gapMm=clamp(Number(opts.patternGap)||8,0,200),images=(opts.patternImages&&opts.patternImages.length?opts.patternImages:(opts.patternImage?[opts.patternImage]:[]));
      drawTemplatePattern(cctx,w,h,{kind:opts.patternKind||'image',bgType:opts.patternBackgroundType||'color',bg:opts.patternBg||'#fff',bgA:opts.patternGradientA||opts.patternBg||'#fff',bgB:opts.patternGradientB||opts.patternBg||'#fff',bgAngle:opts.patternGradientAngle||0,fg:opts.patternFg||'#9ed7ec',sizePx:sizeMm*ppm,gapPx:gapMm*ppm,lineWidthPx:clamp(Number(opts.patternLineWidth)||1.2,.1,20)*ppm,lineStyle:opts.patternLineStyle||'solid',layout:opts.patternLayout||'square',order:opts.patternOrder||'balanced',rotationMode:opts.patternRotationMode||'fixed',rotation:opts.patternRotation||0,rotationMin:opts.patternRotationMin||0,rotationMax:opts.patternRotationMax||0,images,offX:(Number(opts.patternX)||0)*ppm,offY:(Number(opts.patternY)||0)*(h/heightMm)});
      if(!images.length)return{canvas,ppi:Infinity};const minPpi=Math.min(...images.map(record=>record.naturalWidth/(sizeMm/25.4)));return{canvas,ppi:minPpi};
    }
    const record=opts.image;if(!record)return{canvas,ppi:Infinity};const fitMode=opts.fit||'cover',img=record.img,rotation=(Number(opts.rotation)||0)*Math.PI/180,ca=Math.abs(Math.cos(rotation)),sa=Math.abs(Math.sin(rotation));
    let dw,dh;
    if(fitMode==='stretch'){dw=w;dh=h;}
    else{const rotatedW=record.naturalWidth*ca+record.naturalHeight*sa,rotatedH=record.naturalWidth*sa+record.naturalHeight*ca,base=fitMode==='custom'?Math.min(w/rotatedW,h/rotatedH)*clamp(Number(opts.scale)||100,10,800)/100:(fitMode==='contain'?Math.min(w/rotatedW,h/rotatedH):Math.max(w/rotatedW,h/rotatedH));dw=record.naturalWidth*base;dh=record.naturalHeight*base;}
    const ox=fitMode==='custom'?(Number(opts.x)||0)*ppm:0,oy=fitMode==='custom'?(Number(opts.y)||0)*(h/heightMm):0;cctx.save();cctx.translate(w/2+ox,h/2+oy);cctx.rotate(rotation);cctx.drawImage(img,-dw/2,-dh/2,dw,dh);cctx.restore();
    return{canvas,ppi:Math.min(record.naturalWidth/((dw/ppm)/25.4),record.naturalHeight/((dh/(h/heightMm))/25.4))};
  }
  function renderStickerBackground(w,h,widthMm,heightMm){
    if(!els.stickerBackgroundEnabled.checked)return{canvas:makeCanvas(w,h),ppi:Infinity};
    return renderFlexibleBackground(w,h,widthMm,heightMm,{type:state.stickerBackgroundType,color:els.stickerBackgroundColor.value,gradientA:els.stickerGradientColorA.value,gradientB:els.stickerGradientColorB.value,gradientAngle:num(els.stickerGradientAngle,135),image:state.stickerBackgroundImage,fit:els.stickerBackgroundFit.value,scale:num(els.stickerBackgroundScale,100),x:num(els.stickerBackgroundX,0),y:num(els.stickerBackgroundY,0),rotation:num(els.stickerBackgroundRotation,0),patternKind:els.stickerPatternKind.value,patternBackgroundType:els.stickerPatternBackgroundType?.value||'color',patternBg:els.stickerPatternBgColor.value,patternGradientA:els.stickerPatternGradientA?.value||els.stickerPatternBgColor.value,patternGradientB:els.stickerPatternGradientB?.value||els.stickerPatternBgColor.value,patternGradientAngle:num(els.stickerPatternGradientAngle,135),patternFg:els.stickerPatternFgColor.value,patternImage:state.stickerPatternImage,patternImages:state.stickerPatternImages,patternSize:num(els.stickerPatternSize,16),patternGap:num(els.stickerPatternGap,8),patternLayout:els.stickerPatternLayout.value,patternOrder:els.stickerPatternOrder?.value||'balanced',patternRotationMode:els.stickerPatternRotationMode?.value||'fixed',patternRotation:num(els.stickerPatternRotation,0),patternRotationMin:num(els.stickerPatternRotationMin,-15),patternRotationMax:num(els.stickerPatternRotationMax,15),patternLineStyle:els.stickerPatternLineStyle.value,patternLineWidth:num(els.stickerPatternLineWidth,1.2),patternScale:num(els.stickerPatternScale,100),patternX:num(els.stickerPatternX,0),patternY:num(els.stickerPatternY,0)});
  }

  async function generateSticker() {
    if(state.mode!=='sticker')return;const token=++state.generationToken;setBusy(true);await nextFrame();
    try{
      const style=currentFinishStyle('sticker'),widthMm=clamp(num(els.artboardWidth,210),20,1000),heightMm=clamp(num(els.artboardHeight,297),20,1000),bleedMm=style==='borderless'?clamp(num(els.stickerBleed,2),0,20):0,borderMm=style==='bordered'?clamp(num(els.stickerBorder,2),0,20):0;
      const whiteFill=style==='bordered'&&state.stickerBorderFill==='white',whiteBleedMm=whiteFill?clamp(num(els.stickerWhiteBleed,1),0,10):0;
      const threshold=clamp(num(style==='borderless'?els.stickerAlphaThreshold:els.stickerAlphaThresholdBordered,24),1,254),includeHoles=els.stickerIncludeHoles.checked,targetMaxPx=getProcessingMaxDimension(),ppm=clamp(targetMaxPx/Math.max(widthMm,heightMm),1.5,8),w=Math.round(widthMm*ppm),h=Math.round(heightMm*ppm),bleedPx=Math.round(bleedMm*ppm),borderPx=Math.round(borderMm*ppm),whiteBleedPx=Math.round(whiteBleedMm*ppm),padPx=Math.max(8,Math.max(bleedPx,borderPx+whiteBleedPx)+8);
      const original=makeCanvas(w,h),white=makeCanvas(w,h),whiteOpaque=makeCanvas(w,h),bleed=makeCanvas(w,h),fullPrint=makeCanvas(w,h),octx=original.getContext('2d'),wctx=white.getContext('2d'),woctx=whiteOpaque.getContext('2d'),bctx=bleed.getContext('2d'),fctx=fullPrint.getContext('2d'),cutPaths=[],cutRecords=[];
      const backgroundResult=renderStickerBackground(w,h,widthMm,heightMm),background=backgroundResult.canvas,hasBackground=els.stickerBackgroundEnabled.checked;
      if(hasBackground)fctx.drawImage(background,0,0);
      const ppis=[];let semiTransparentPixelCount=0,semiTransparentRegionCount=0,narrowInletPixels=0;if(Number.isFinite(backgroundResult.ppi))ppis.push(backgroundResult.ppi);
      for(const sticker of state.stickers){
        const local=renderStickerLocal(sticker,ppm,w,h,padPx),lw=local.canvas.width,lh=local.canvas.height,ldata=local.canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,lw,lh),objectMask=suppressNeedleProtrusions(stabilizeAlphaMask(ldata,threshold,getBoundarySamplingConfig()),lw,lh,ppm),contours=traceContours(objectMask,lw,lh);
        if(!contours.length)continue;cutRecords.push({sticker,mask:objectMask,left:local.left,top:local.top,lw,lh});const outerPaths=contours.filter(p=>polygonArea(p)>0),holePaths=contours.filter(p=>polygonArea(p)<0),outerMask=rasterizePaths(outerPaths,lw,lh),holeMask=holePaths.length?rasterizePaths(holePaths,lw,lh):new Uint8Array(lw*lh);
        let localBleed=makeCanvas(lw,lh),printMask=objectMask,whiteMask=objectMask,localCuts;
        if(style==='borderless'){
          const result=makeBleed(ldata,objectMask,outerMask,holeMask,lw,lh,bleedPx,includeHoles,null);localBleed.getContext('2d').putImageData(result.imageData,0,0);printMask=result.printMask;whiteMask=printMask;localCuts=outerPaths.concat(includeHoles?holePaths:[]);
        }else{
          let cutOuter=dilateMask(outerMask,lw,lh,borderPx);
          const bridged=bridgeNarrowCutInlets(cutOuter,lw,lh,ppm,4);cutOuter=bridged.mask;narrowInletPixels+=bridged.addedPixels;
          localCuts=traceContours(cutOuter,lw,lh).filter(p=>polygonArea(p)>0);
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
        localCuts=prepareCutPaths(localCuts,ppm);cutPaths.push(...translatePaths(localCuts,local.left,local.top));
        const localWhiteLayers=buildWhiteLayerMasks(whiteMask,ldata),localWhite=whiteCanvasFromMask(localWhiteLayers.full,lw,lh),localWhiteOpaque=whiteCanvasFromMask(localWhiteLayers.opaque,lw,lh),localSemi=whiteCanvasFromMask(localWhiteLayers.semiMask,lw,lh);
        semiTransparentPixelCount+=localWhiteLayers.semiCount;semiTransparentRegionCount+=localWhiteLayers.semiRegionCount;
        if(style==='borderless'){bctx.drawImage(localBleed,local.left,local.top);fctx.drawImage(localBleed,local.left,local.top);}
        wctx.drawImage(localWhite,local.left,local.top);
        // 위에 놓인 반투명 픽셀 아래에서는 이전 스티커의 화이트도 제거합니다.
        woctx.save();woctx.globalCompositeOperation='destination-out';woctx.drawImage(localSemi,local.left,local.top);woctx.restore();woctx.drawImage(localWhiteOpaque,local.left,local.top);
        octx.drawImage(local.canvas,local.left,local.top);fctx.drawImage(local.canvas,local.left,local.top);
        ppis.push(sticker.naturalWidth/(sticker.widthMm/25.4));
      }
      cutPaths.length=0;cutPaths.push(...buildStickerGroupCutPaths(cutRecords,w,h,ppm,style,borderPx,includeHoles));
      const minPpi=ppis.length?Math.min(...ppis):Infinity;
      state.result={mode:'sticker',finishStyle:style,widthPx:w,heightPx:h,widthMm,heightMm,ppm,background,hasBackground,original,white,whiteOpaque,hasSemiTransparent:semiTransparentRegionCount>0,semiTransparentPixelCount,semiTransparentRegionCount,bleed,fullPrint,cutPaths,cutCurve:AUTO_CUT_CURVE,ppi:minPpi,stickerBorderFill:state.stickerBorderFill,whiteBleedMm};
      updateWhiteLayerUi();
      updateQualitySticker(minPpi);const semiLabel=semiTransparentRegionCount?` · 실제 반투명 면 ${semiTransparentRegionCount}개 감지`:'';const inletLabel=style==='bordered'&&narrowInletPixels?' · 4 mm 이하 좁은 홈 자동 연결':'';els.geometryMeta.textContent=`${style==='borderless'?'무테':`유테 · ${whiteFill?'화이트':'투명'}`} · 대지 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · 이미지 ${state.stickers.length}개${hasBackground?' · 배경지':''} · 칼선 ${cutPaths.length}개${inletLabel}${Number.isFinite(minPpi)?` · 최저 ${Math.round(minPpi)} ppi`:''}${semiLabel}`;
      if(token===state.generationToken)drawPreview();
    }catch(err){console.error(err);setNotice('bad','스티커 대지를 만들 수 없습니다',err.message||'처리 중 오류가 발생했습니다.');}finally{if(token===state.generationToken)setBusy(false);}
  }


  function renderMakerBackground(w,h,widthMm,heightMm){return renderFlexibleBackground(w,h,widthMm,heightMm,{type:state.makerBackgroundType,color:els.makerBgColor.value,gradientA:els.makerGradientA.value,gradientB:els.makerGradientB.value,gradientAngle:num(els.makerGradientAngle,135),image:state.makerBackgroundImage,fit:els.makerBackgroundFit.value,scale:num(els.makerBackgroundScale,100),x:num(els.makerBackgroundX,0),y:num(els.makerBackgroundY,0),rotation:num(els.makerBackgroundRotation,0),patternKind:els.makerPatternKind.value,patternBackgroundType:els.makerPatternBackgroundType?.value||'color',patternBg:els.makerPatternBg.value,patternGradientA:els.makerPatternGradientA?.value||els.makerPatternBg.value,patternGradientB:els.makerPatternGradientB?.value||els.makerPatternBg.value,patternGradientAngle:num(els.makerPatternGradientAngle,135),patternFg:els.makerPatternFg.value,patternImage:state.makerPatternImage,patternImages:state.makerPatternImages,patternSize:num(els.makerPatternSize,16),patternGap:num(els.makerPatternGap,8),patternLayout:els.makerPatternLayout.value,patternOrder:els.makerPatternOrder?.value||'balanced',patternRotationMode:els.makerPatternRotationMode?.value||'fixed',patternRotation:num(els.makerPatternRotation,0),patternRotationMin:num(els.makerPatternRotationMin,-15),patternRotationMax:num(els.makerPatternRotationMax,15),patternLineStyle:els.makerPatternLineStyle.value,patternLineWidth:num(els.makerPatternLineWidth,1.2),patternScale:num(els.makerPatternScale,100),patternX:num(els.makerPatternX,0),patternY:num(els.makerPatternY,0)});}
  function colorCanvasFromMask(mask,w,h,color,alpha=1){const c=makeCanvas(w,h),cc=c.getContext('2d'),id=cc.createImageData(w,h),parsed=parseColorValue(color),a=Math.round(clamp(alpha*parsed.a,0,1)*255);for(let i=0;i<mask.length;i++)if(mask[i]){const k=i*4;id.data[k]=parsed.r;id.data[k+1]=parsed.g;id.data[k+2]=parsed.b;id.data[k+3]=a;}cc.putImageData(id,0,0);return c;}
  function smoothOutlineCanvasFromMask(mask,w,h,ppm,widthPx,color){
    const canvas=makeCanvas(w,h),cctx=canvas.getContext('2d');cctx.imageSmoothingEnabled=true;cctx.imageSmoothingQuality='high';
    const contours=prepareCutPaths(traceContours(mask,w,h).filter(path=>Math.abs(polygonArea(path))>2),ppm);
    if(!contours.length)return canvas;
    cctx.beginPath();for(const path of contours)drawPath(cctx,path,1,1,0,0,AUTO_CUT_CURVE);
    cctx.fillStyle=color;cctx.fill('evenodd');
    if(widthPx>0){cctx.strokeStyle=color;cctx.lineWidth=Math.max(.5,widthPx*2);cctx.lineJoin='round';cctx.lineCap='round';cctx.stroke();}
    return canvas;
  }
  function renderMakerItem(item,ppm,boardW,boardH){
    const e=normalizeMakerEffects(item.effects),effectMm=Math.max(e.outline.enabled?e.outline.widthMm:0,e.outerGlow.enabled?e.outerGlow.sizeMm*2:0,e.shadow.enabled?e.shadow.sizeMm*2+Math.abs(e.shadow.xMm)+Math.abs(e.shadow.yMm):0,4),local=renderStickerLocal(item,ppm,boardW,boardH,Math.ceil(effectMm*ppm+12)),lw=local.canvas.width,lh=local.canvas.height,data=local.canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,lw,lh),mask=stabilizeAlphaMask(data,12,getBoundarySamplingConfig()),out=makeCanvas(lw,lh),oc=out.getContext('2d');oc.imageSmoothingEnabled=true;oc.imageSmoothingQuality='high';
    if(e.shadow.enabled){const spread=Math.max(0,Math.round(e.shadow.sizeMm*ppm*(e.shadow.spread/100))),shadowMask=spread?dilateMask(mask,lw,lh,spread):mask,shadow=colorCanvasFromMask(shadowMask,lw,lh,e.shadow.color,e.shadow.opacity/100);oc.save();oc.shadowColor=hexToRgba(e.shadow.color,e.shadow.opacity/100);oc.shadowBlur=Math.max(0,e.shadow.sizeMm*ppm*1.6);oc.shadowOffsetX=e.shadow.xMm*ppm;oc.shadowOffsetY=e.shadow.yMm*ppm;oc.drawImage(shadow,0,0);oc.restore();}
    if(e.outerGlow.enabled){const spread=Math.max(0,Math.round(e.outerGlow.sizeMm*ppm*(e.outerGlow.spread/100))),glowMask=spread?dilateMask(mask,lw,lh,spread):mask,glow=colorCanvasFromMask(glowMask,lw,lh,e.outerGlow.color,e.outerGlow.opacity/100);oc.save();oc.shadowColor=hexToRgba(e.outerGlow.color,e.outerGlow.opacity/100);oc.shadowBlur=Math.max(0,e.outerGlow.sizeMm*ppm*2);oc.drawImage(glow,0,0);oc.restore();}
    let cutMask=mask;if(e.outline.enabled&&e.outline.widthMm>0){const outlinePx=e.outline.widthMm*ppm;cutMask=dilateMask(mask,lw,lh,Math.round(outlinePx));oc.drawImage(smoothOutlineCanvasFromMask(mask,lw,lh,ppm,outlinePx,colorToCss(e.outline.color)),0,0);}
    oc.drawImage(local.canvas,0,0);
    if(e.innerGlow.enabled){const edge=differenceMask(mask,erodeMask(mask,lw,lh,Math.max(1,Math.round(e.innerGlow.sizeMm*ppm)))),glow=colorCanvasFromMask(edge,lw,lh,e.innerGlow.color,e.innerGlow.opacity/100);oc.save();oc.filter=`blur(${Math.max(0,e.innerGlow.sizeMm*ppm*(.4+e.innerGlow.spread/160))}px)`;oc.globalCompositeOperation='source-atop';oc.drawImage(glow,0,0);oc.restore();}
    return{canvas:out,left:local.left,top:local.top,cutMask,lw,lh};
  }
  async function generateMaker(){
    if(state.mode!=='maker')return;const token=++state.generationToken;setBusy(true);await nextFrame();
    try{
      const widthMm=clamp(num(els.makerWidth,100),20,1000),heightMm=clamp(num(els.makerHeight,100),20,1000),targetMaxPx=getProcessingMaxDimension(),ppm=clamp(targetMaxPx/Math.max(widthMm,heightMm),1.5,8),w=Math.round(widthMm*ppm),h=Math.round(heightMm*ppm),backgroundResult=renderMakerBackground(w,h,widthMm,heightMm),background=backgroundResult.canvas,original=makeCanvas(w,h),octx=original.getContext('2d'),ppis=[];
      for(const item of state.makerItems){const r=renderMakerItem(item,ppm,w,h);octx.drawImage(r.canvas,r.left,r.top);ppis.push(item.naturalWidth/(item.widthMm/25.4));}
      const empty=makeCanvas(w,h),fullPrint=makeCanvas(w,h),fc=fullPrint.getContext('2d');fc.drawImage(background,0,0);fc.drawImage(original,0,0);const minPpi=ppis.length?Math.min(...ppis):Infinity,hasBackground=state.makerBackgroundType!=='transparent';
      state.result={mode:'maker',finishStyle:'image',widthPx:w,heightPx:h,widthMm,heightMm,ppm,background,hasBackground,original,white:empty,whiteOpaque:empty,hasSemiTransparent:false,bleed:empty,fullPrint,cutPaths:[],cutCurve:AUTO_CUT_CURVE,ppi:minPpi};
      updateWhiteLayerUi();updateModeSpecificUi();els.geometryMeta.textContent=`외곽선 / 배경 · 캔버스 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · 개체 ${state.makerItems.length}개${hasBackground?' · 배경 적용':' · 투명 배경'}${Number.isFinite(minPpi)?` · 최저 ${Math.round(minPpi)} ppi`:''}`;
      if(state.makerItems.length){if(minPpi>=300)setNotice('good','개체 이미지 해상도 양호',`가장 낮은 이미지도 ${Math.round(minPpi)} ppi입니다.`);else if(minPpi>=180)setNotice('warn','일부 개체 확대 주의',`가장 낮은 이미지가 ${Math.round(minPpi)} ppi입니다.`);else setNotice('bad','일부 개체 화질 깨짐 위험',`가장 낮은 이미지가 ${Math.round(minPpi)} ppi입니다.`);}else setNotice('info','이미지 또는 배경을 추가해 주세요','이 탭은 칼선과 화이트를 만들지 않고 PNG/JPG 이미지만 저장합니다.');if(token===state.generationToken)drawPreview();
    }catch(err){console.error(err);setNotice('bad','외곽선/배경 이미지를 만들 수 없습니다',err.message||'처리 중 오류가 발생했습니다.');}finally{if(token===state.generationToken)setBusy(false);}
  }
  let makerTimer=null;function scheduleMakerGenerate(){clearTimeout(makerTimer);makerTimer=setTimeout(generateMaker,260);}
  async function addMakerFiles(files){const widthMm=clamp(num(els.makerWidth,100),20,1000),heightMm=clamp(num(els.makerHeight,100),20,1000);for(const file of files){const raw=await fileToImageRecord(file),rec=await cropImageRecordToAlpha(raw,1),width=Math.min(45,widthMm*.38),n=state.makerItems.length;state.makerItems.push({...rec,id:uid(),widthMm:width,rotation:0,xMm:widthMm/2+(n%3-1)*8,yMm:heightMm/2+(Math.floor(n/3)%3-1)*8,effects:defaultMakerEffects()});}els.makerCount.textContent=`${state.makerItems.length}개`;selectMaker(state.makerItems.at(-1)?.id||null);await generateMaker();saveWorkspaceNow();checkpointHistory();}

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


  function drawDraftArtboard(cw,ch){
    const dpr=window.devicePixelRatio||1;
    const boardWmm=state.mode==='acrylic'?clamp(num(els.productWidth,70),5,1000):(state.mode==='maker'?clamp(num(els.makerWidth,100),20,1000):clamp(num(els.artboardWidth,210),20,1000));
    const boardHmm=state.mode==='acrylic'?clamp(num(els.productHeight,70),5,1000):(state.mode==='maker'?clamp(num(els.makerHeight,100),20,1000):clamp(num(els.artboardHeight,297),20,1000));
    const fit=Math.min((cw-72*dpr)/(boardWmm||1),(ch-72*dpr)/(boardHmm||1)),scale=Math.max(.05,fit*Math.max(.2,state.zoom||1));
    const bw=boardWmm*scale,bh=boardHmm*scale,bx=(cw-bw)/2,by=(ch-bh)/2;
    ctx.save();ctx.fillStyle='rgba(255,255,255,.10)';ctx.fillRect(bx,by,bw,bh);ctx.strokeStyle='rgba(77,91,99,.30)';ctx.lineWidth=Math.max(1,dpr);ctx.strokeRect(bx+.5,by+.5,bw-1,bh-1);
    if(state.mode==='acrylic'&&state.source?.img){
      try{
        const trim=getCachedTrimBounds(state.source,currentAcrylicThreshold()),actual=artworkActualSizeMm(),dw=bw*actual.width/boardWmm,dh=bh*actual.height/boardHmm;
        ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(state.source.img,trim.sx,trim.sy,trim.sw,trim.sh,bx+(bw-dw)/2,by+(bh-dh)/2,dw,dh);
        ctx.fillStyle='rgba(42,79,96,.82)';ctx.font=`${12*dpr}px system-ui`;ctx.textAlign='center';ctx.fillText('이미지를 불러왔습니다 · 칼선 계산 중',cw/2,Math.min(ch-18*dpr,by+bh+24*dpr));
      }catch(error){console.warn('임시 이미지 미리보기를 그리지 못했습니다.',error);}
    }else{
      ctx.fillStyle='rgba(74,82,87,.72)';ctx.font=`${14*dpr}px system-ui`;ctx.textAlign='center';ctx.fillText(state.mode==='acrylic'?'이미지를 추가하면 이 대지 안에 미리보기가 나타납니다.':(state.mode==='maker'?'꾸밀 개체 이미지를 추가해 주세요.':'스티커 이미지를 추가해 주세요.'),cw/2,ch/2);
    }
    ctx.restore();els.zoomLabel.textContent=`${Math.round((state.zoom||1)*100)}%`;
  }

  function drawPreview() {
    const cw=els.canvas.width,ch=els.canvas.height;ctx.clearRect(0,0,cw,ch);const r=state.result;
    if(!r){drawDraftArtboard(cw,ch);return;}
    const t=getViewTransform();ctx.save();ctx.shadowColor='rgba(25,22,18,.20)';ctx.shadowBlur=30;ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(t.x,t.y,t.boardW,t.boardH);ctx.restore();
    ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
    if(state.view==='background'&&r.hasBackground)ctx.drawImage(r.background,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='original')ctx.drawImage(r.original,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='white-opaque')ctx.drawImage(r.whiteOpaque||r.white,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='white-full')ctx.drawImage(r.white,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='bleed')ctx.drawImage(r.fullPrint,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='composite'){if(r.hasBackground)ctx.drawImage(r.background,t.x,t.y,t.boardW,t.boardH);ctx.drawImage(r.white,t.x,t.y,t.boardW,t.boardH);if(r.finishStyle==='borderless')ctx.drawImage(r.bleed,t.x,t.y,t.boardW,t.boardH);ctx.drawImage(r.original,t.x,t.y,t.boardW,t.boardH);}
    ctx.restore();
    if(state.view==='cutline'||state.view==='composite'){ctx.save();ctx.beginPath();for(const p of r.cutPaths)drawPath(ctx,p,t.scale,t.scale,t.x,t.y,r.cutCurve??AUTO_CUT_CURVE);ctx.strokeStyle='#ff24b9';ctx.lineWidth=Math.max(1.4,1.2*(window.devicePixelRatio||1));ctx.stroke();ctx.restore();}
    if((r.mode==='sticker'&&!state.splitPreview&&state.selectedStickerIds.length||r.mode==='maker'&&state.makerSelectedId)&&state.view!=='cutline')drawSelection(t);
    if(r.mode==='sticker'&&state.splitPreview)drawSplitPreview(t);
    if(r.mode==='acrylic'&&state.selectedHoleIds.length)drawHoleGuides(t);
    ctx.save();ctx.strokeStyle='rgba(60,58,54,.25)';ctx.lineWidth=1;ctx.strokeRect(t.x+.5,t.y+.5,t.boardW-1,t.boardH-1);ctx.restore();els.zoomLabel.textContent=`${Math.round(state.zoom*100)}%`;
  }

  function drawHoleGuides(t){
    const r=state.result;if(!r)return;const dpr=window.devicePixelRatio||1,selected=selectedHoleIdSet();
    state.holes.forEach((hole,index)=>{
      if(!selected.has(hole.id))return;
      const pos=draftHolePixel(hole,r);if(!pos)return;const spec=getHoleSpec(r.ppm,hole,false),cx=t.x+pos.x*t.scale,cy=t.y+pos.y*t.scale,inner=spec.innerR*t.scale,outer=(hole.draftMode==='external'?spec.outerR:spec.innerR)*t.scale,primary=hole.id===state.selectedHoleId;
      ctx.save();ctx.lineWidth=Math.max(primary?2:1.45,(primary?1.6:1.2)*dpr);ctx.setLineDash([7*dpr,5*dpr]);ctx.strokeStyle=primary?'#4f9fbe':'rgba(83,142,166,.82)';ctx.fillStyle=primary?'rgba(91,180,215,.13)':'rgba(91,180,215,.08)';
      if(hole.draftMode==='external'){ctx.beginPath();ctx.arc(cx,cy,outer,0,Math.PI*2);ctx.fill();ctx.stroke();}
      ctx.beginPath();ctx.arc(cx,cy,inner,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=primary?'#fff':'rgba(255,255,255,.88)';ctx.strokeStyle=primary?'#4f9fbe':'#7caec1';ctx.lineWidth=Math.max(1.3,1.1*dpr);ctx.beginPath();ctx.arc(cx,cy,(primary?5:4.1)*dpr,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.font=`${primary?11:10}px system-ui`;ctx.textAlign='center';ctx.textBaseline='bottom';ctx.fillStyle=primary?'#3f7e97':'#6c8d9a';ctx.fillText(`${index+1}. ${hole.draftMode==='internal'?'내부':'외부'}${holeIsDirty(hole)?' · 미적용':''}`,cx,cy-outer-7*dpr);ctx.restore();
    });
  }
  function itemHeightMm(item){return item.widthMm*item.naturalHeight/item.naturalWidth;}
  function selectedStickerSet(){return new Set(state.selectedStickerIds||[]);}
  function syncStickerSelectionUi(){
    const preview=state.splitPreview;
    if(preview){
      const valid=(preview.selectedIds||[]).filter(id=>preview.items.some(v=>v.id===id));preview.selectedIds=valid;els.selectionEditor.classList.add('empty');
      els.stickerSelectedCount.textContent=`${valid.length}개 미리보기 선택`;els.mergeObjectsBtn.disabled=valid.length<2;
      els.ungroupObjectsBtn.disabled=!valid.some(id=>preview.items.find(v=>v.id===id)?.groupId);
      els.multiSelectBtn.textContent=state.multiSelectMode?'다중 선택 켬':'다중 선택 끔';els.multiSelectBtn.classList.toggle('active-toggle',state.multiSelectMode);
      els.splitPreviewCount.textContent=`${splitPreviewCutlineCount(preview)}개 칼선 · ${valid.length}개 선택`;return;
    }
    const valid=(state.selectedStickerIds||[]).filter(id=>state.stickers.some(v=>v.id===id));state.selectedStickerIds=valid;
    if(!valid.includes(state.selectedId))state.selectedId=valid.at(-1)||null;
    const s=state.stickers.find(v=>v.id===state.selectedId);els.selectionEditor.classList.toggle('empty',!s);
    if(s){els.selWidth.value=s.widthMm.toFixed(1);els.selRotation.value=s.rotation.toFixed(0);els.selX.value=s.xMm.toFixed(1);els.selY.value=s.yMm.toFixed(1);}
    els.stickerSelectedCount.textContent=`${valid.length}개 선택`;els.mergeObjectsBtn.disabled=valid.length<2;
    els.ungroupObjectsBtn.disabled=!valid.some(id=>state.stickers.find(v=>v.id===id)?.groupId);
    els.multiSelectBtn.textContent=state.multiSelectMode?'다중 선택 켬':'다중 선택 끔';els.multiSelectBtn.classList.toggle('active-toggle',state.multiSelectMode);
    if(state.groupEditIds.length)els.stickerSelectedCount.textContent=`${state.groupEditIds.length}개 개별 이동 선택`;
  }
  function drawItemSelection(t,item,primary=false){
    if(!state.result)return;const ppm=state.result.ppm,w=item.widthMm*ppm*t.scale,h=itemHeightMm(item)*ppm*t.scale,cx=t.x+item.xMm*ppm*t.scale,cy=t.y+item.yMm*ppm*t.scale,dpr=window.devicePixelRatio||1;
    ctx.save();ctx.translate(cx,cy);ctx.rotate(item.rotation*Math.PI/180);ctx.strokeStyle=primary?'#4ba8d1':'rgba(82,154,186,.78)';ctx.lineWidth=(primary?2.2:1.5)*dpr;ctx.setLineDash(primary?[7*dpr,5*dpr]:[4*dpr,4*dpr]);ctx.strokeRect(-w/2,-h/2,w,h);ctx.setLineDash([]);
    const coarse=window.matchMedia?.('(pointer: coarse)').matches,r=(primary?(coarse?10:6):(coarse?7:4.5))*dpr;ctx.fillStyle='#fff';ctx.strokeStyle=primary?'#4ba8d1':'#7fb6ca';ctx.lineWidth=2*dpr;
    if(primary){for(const [x,y] of [[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.stroke();}
      const rotateY=-h/2-24*dpr;ctx.beginPath();ctx.moveTo(0,-h/2);ctx.lineTo(0,rotateY+r);ctx.stroke();ctx.beginPath();ctx.arc(0,rotateY,r+1*dpr,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#4ba8d1';ctx.font=`${11*dpr}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('↻',0,rotateY+.5*dpr);
    }
    ctx.restore();
  }
  function drawSelection(t){
    const items=state.mode==='maker'?state.makerItems:state.stickers,ids=state.mode==='maker'?(state.makerSelectedId?[state.makerSelectedId]:[]):state.selectedStickerIds;
    for(const id of ids){const item=items.find(v=>v.id===id);if(item)drawItemSelection(t,item,id===(state.mode==='maker'?state.makerSelectedId:state.selectedId));}
    if(state.dragging?.type==='marquee'&&state.dragging.current){const a=state.dragging.start,b=state.dragging.current;ctx.save();ctx.strokeStyle='#4ba8d1';ctx.fillStyle='rgba(75,168,209,.12)';ctx.setLineDash([6,4]);const x1=t.x+Math.min(a.xPx,b.xPx)*t.scale,y1=t.y+Math.min(a.yPx,b.yPx)*t.scale,x2=t.x+Math.max(a.xPx,b.xPx)*t.scale,y2=t.y+Math.max(a.yPx,b.yPx)*t.scale;ctx.fillRect(x1,y1,x2-x1,y2-y1);ctx.strokeRect(x1,y1,x2-x1,y2-y1);ctx.restore();}
  }

  function boardPointFromEvent(ev) {
    if (!state.result) return null;
    const rect = els.canvas.getBoundingClientRect(); const sx = els.canvas.width / rect.width, sy = els.canvas.height / rect.height;
    const px = (ev.clientX - rect.left) * sx, py = (ev.clientY - rect.top) * sy;
    const t = getViewTransform();
    return { clientX:ev.clientX,clientY:ev.clientY,xPx: (px - t.x) / t.scale, yPx: (py - t.y) / t.scale, xMm: (px - t.x) / t.scale / state.result.ppm, yMm: (py - t.y) / t.scale / state.result.ppm };
  }

  function hitItem(point,items){
    for(let i=items.length-1;i>=0;i--){const s=items[i],dx=point.xMm-s.xMm,dy=point.yMm-s.yMm,a=-s.rotation*Math.PI/180,lx=dx*Math.cos(a)-dy*Math.sin(a),ly=dx*Math.sin(a)+dy*Math.cos(a),h=itemHeightMm(s);if(Math.abs(lx)<=s.widthMm/2&&Math.abs(ly)<=h/2)return s;}return null;
  }
  function hitSticker(point){return hitItem(point,state.stickers);}
  function hitSplitPreviewItem(point){
    const p=state.splitPreview;if(!p)return null;const margin=Math.max(1.2,currentFinishStyle('sticker')==='bordered'?num(els.stickerBorder,2)+.8:1.4);
    for(let i=p.items.length-1;i>=0;i--){const item=p.items[i],b=itemCutBoundsMm(item,'sticker');if(point.xMm>=b.minX-margin&&point.xMm<=b.maxX+margin&&point.yMm>=b.minY-margin&&point.yMm<=b.maxY+margin)return item;}
    return null;
  }
  function hitTransformHandle(point,item){
    if(!item||!state.result)return null;const t=getViewTransform(),hitCss=window.matchMedia?.('(pointer: coarse)').matches?30:16,hitMm=hitCss/(state.result.ppm*t.scale),dx=point.xMm-item.xMm,dy=point.yMm-item.yMm,a=-item.rotation*Math.PI/180,lx=dx*Math.cos(a)-dy*Math.sin(a),ly=dx*Math.sin(a)+dy*Math.cos(a),w=item.widthMm,h=itemHeightMm(item),rotateY=-h/2-24*(window.devicePixelRatio||1)/(state.result.ppm*t.scale);
    if(Math.hypot(lx,ly-rotateY)<=hitMm*1.3)return{type:'rotate'};
    const corners=[[-w/2,-h/2,'nw'],[w/2,-h/2,'ne'],[w/2,h/2,'se'],[-w/2,h/2,'sw']];for(const [x,y,name] of corners)if(Math.hypot(lx-x,ly-y)<=hitMm)return{type:'resize',corner:name};return null;
  }
  function stickerGroupIds(item,items=state.stickers){
    if(!item)return[];return item.groupId?items.filter(v=>v.groupId===item.groupId).map(v=>v.id):[item.id];
  }
  function clearGroupMemberEdit(){state.groupEditIds=[];state.groupEditGroupId=null;els.canvas.classList.remove('group-member-editing');}
  function toggleGroupMemberEdit(id){
    const item=state.stickers.find(v=>v.id===id);if(!item?.groupId)return;
    if(state.groupEditGroupId!==item.groupId){state.groupEditGroupId=item.groupId;state.groupEditIds=[];}
    const set=new Set(state.groupEditIds);if(set.has(id))set.delete(id);else set.add(id);state.groupEditIds=[...set];
    if(!state.groupEditIds.length){clearGroupMemberEdit();state.selectedStickerIds=stickerGroupIds(item);state.selectedId=item.id;}
    else{state.selectedStickerIds=[...state.groupEditIds];state.selectedId=state.groupEditIds.at(-1)||null;els.canvas.classList.add('group-member-editing');}
    syncStickerSelectionUi();drawPreview();
  }
  function deselectGroupMember(id){
    if(!state.groupEditIds.includes(id))return;state.groupEditIds=state.groupEditIds.filter(v=>v!==id);
    if(!state.groupEditIds.length){clearGroupMemberEdit();state.selectedStickerIds=[];state.selectedId=null;}else{state.selectedStickerIds=[...state.groupEditIds];state.selectedId=state.groupEditIds.at(-1)||null;}
    syncStickerSelectionUi();drawPreview();
  }
  function selectSticker(id,options={}){
    if(!id){state.selectedStickerIds=[];state.selectedId=null;clearGroupMemberEdit();syncStickerSelectionUi();drawPreview();return;}
    const item=state.stickers.find(v=>v.id===id);if(!item)return;
    if(options.individualToggle){toggleGroupMemberEdit(id);return;}
    if(state.groupEditIds.length)clearGroupMemberEdit();
    const ids=stickerGroupIds(item),additive=!!options.additive||state.multiSelectMode,set=selectedStickerSet();
    if(additive){const allSelected=ids.every(v=>set.has(v));for(const memberId of ids){if(allSelected)set.delete(memberId);else set.add(memberId);}state.selectedStickerIds=[...set];state.selectedId=allSelected?(state.selectedStickerIds.at(-1)||null):id;}
    else{state.selectedStickerIds=ids;state.selectedId=id;}
    syncStickerSelectionUi();drawPreview();
  }
  function movementIdsForSticker(hit){
    if(state.groupEditIds.length&&state.groupEditIds.includes(hit.id))return [...state.groupEditIds];
    if(hit.groupId)return stickerGroupIds(hit);
    if(state.selectedStickerIds.includes(hit.id)&&state.selectedStickerIds.length>1)return [...state.selectedStickerIds];
    return [hit.id];
  }
  function selectMaker(id){state.makerSelectedId=id||null;updateMakerUi();drawPreview();}

  function updateSelectedFromFields(){const s=state.stickers.find(v=>v.id===state.selectedId);if(!s)return;s.widthMm=clamp(num(els.selWidth,s.widthMm),2,500);s.rotation=num(els.selRotation,s.rotation);s.xMm=num(els.selX,s.xMm);s.yMm=num(els.selY,s.yMm);drawPreview();scheduleStickerGenerate();}

  function itemCutBoundsMm(item,mode='sticker'){
    const threshold=mode==='sticker'?clamp(num(currentFinishStyle('sticker')==='borderless'?els.stickerAlphaThreshold:els.stickerAlphaThresholdBordered,24),1,254):12,trim=getCachedTrimBounds(item,threshold),fullW=item.widthMm,fullH=itemHeightMm(item),left=(trim.sx/item.naturalWidth-.5)*fullW,right=((trim.sx+trim.sw)/item.naturalWidth-.5)*fullW,top=(trim.sy/item.naturalHeight-.5)*fullH,bottom=((trim.sy+trim.sh)/item.naturalHeight-.5)*fullH,a=item.rotation*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),points=[[left,top],[right,top],[right,bottom],[left,bottom]].map(([x,y])=>({x:item.xMm+x*ca-y*sa,y:item.yMm+x*sa+y*ca}));
    let margin=0;if(mode==='sticker'&&currentFinishStyle('sticker')==='bordered')margin=clamp(num(els.stickerBorder,2),0,20);if(mode==='maker'){const e=normalizeMakerEffects(item.effects);margin=e.outline.enabled?e.outline.widthMm:0;}
    return{minX:Math.min(...points.map(p=>p.x))-margin,maxX:Math.max(...points.map(p=>p.x))+margin,minY:Math.min(...points.map(p=>p.y))-margin,maxY:Math.max(...points.map(p=>p.y))+margin};
  }
  function alignItemsToBoard(mode,action){
    const items=mode==='maker'?state.makerItems:state.stickers,ids=mode==='maker'?(state.makerSelectedId?[state.makerSelectedId]:[]):(state.selectedStickerIds.length?state.selectedStickerIds:(state.selectedId?[state.selectedId]:[]));if(!ids.length)return;
    const selected=items.filter(v=>ids.includes(v.id)),bounds=selected.map(v=>itemCutBoundsMm(v,mode)),box={minX:Math.min(...bounds.map(b=>b.minX)),maxX:Math.max(...bounds.map(b=>b.maxX)),minY:Math.min(...bounds.map(b=>b.minY)),maxY:Math.max(...bounds.map(b=>b.maxY))},boardW=mode==='maker'?clamp(num(els.makerWidth,100),20,1000):clamp(num(els.artboardWidth,210),20,1000),boardH=mode==='maker'?clamp(num(els.makerHeight,100),20,1000):clamp(num(els.artboardHeight,297),20,1000);let dx=0,dy=0;
    if(action==='center-x'||action==='center-both')dx=boardW/2-(box.minX+box.maxX)/2;if(action==='center-y'||action==='center-both')dy=boardH/2-(box.minY+box.maxY)/2;if(action==='left')dx=-box.minX;if(action==='right')dx=boardW-box.maxX;if(action==='top')dy=-box.minY;if(action==='bottom')dy=boardH-box.maxY;
    selected.forEach(v=>{v.xMm+=dx;v.yMm+=dy;});mode==='maker'?updateMakerUi():syncStickerSelectionUi();drawPreview();mode==='maker'?scheduleMakerGenerate():scheduleStickerGenerate();schedulePersist(0);
  }

  function stickerLayoutNodes(){
    const groups=new Map();for(const item of state.stickers){const key=item.groupId||item.id;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(item);}
    return [...groups.entries()].map(([key,items])=>({key,items,dx:0,dy:0}));
  }
  function nodeBounds(node){
    const bounds=node.items.map(v=>itemCutBoundsMm(v,'sticker')),bridgeMargin=node.items.length>1?Math.max(1.4,currentFinishStyle('sticker')==='bordered'?num(els.stickerBorder,2)+.7:1.4):0;return{minX:Math.min(...bounds.map(v=>v.minX))-bridgeMargin+node.dx,maxX:Math.max(...bounds.map(v=>v.maxX))+bridgeMargin+node.dx,minY:Math.min(...bounds.map(v=>v.minY))-bridgeMargin+node.dy,maxY:Math.max(...bounds.map(v=>v.maxY))+bridgeMargin+node.dy};
  }
  function clampLayoutNodeToBoard(node,boardW,boardH){
    const b=nodeBounds(node);let dx=0,dy=0;if(b.minX<0)dx=-b.minX;if(b.maxX+dx>boardW)dx+=boardW-(b.maxX+dx);if(b.minY<0)dy=-b.minY;if(b.maxY+dy>boardH)dy+=boardH-(b.maxY+dy);node.dx+=dx;node.dy+=dy;
  }
  function autoArrangeStickers(){
    if(state.stickers.length<2){setNotice('info','자동 배치할 개체가 부족합니다','스티커 이미지를 두 개 이상 배치한 뒤 실행해 주세요.');return;}
    const gap=clamp(num(els.stickerAutoGap,3),0,50),boardW=clamp(num(els.artboardWidth,210),20,1000),boardH=clamp(num(els.artboardHeight,297),20,1000),nodes=stickerLayoutNodes();
    const originalCenter={x:nodes.reduce((a,n)=>a+(nodeBounds(n).minX+nodeBounds(n).maxX)/2,0)/nodes.length,y:nodes.reduce((a,n)=>a+(nodeBounds(n).minY+nodeBounds(n).maxY)/2,0)/nodes.length};
    let unresolved=0;
    for(let iter=0;iter<140;iter++){
      let changed=false;unresolved=0;
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const a=nodeBounds(nodes[i]),b=nodeBounds(nodes[j]),overlapX=Math.min(a.maxX,b.maxX)-Math.max(a.minX,b.minX)+gap,overlapY=Math.min(a.maxY,b.maxY)-Math.max(a.minY,b.minY)+gap;
        if(overlapX>0&&overlapY>0){unresolved++;changed=true;const acx=(a.minX+a.maxX)/2,bcx=(b.minX+b.maxX)/2,acy=(a.minY+a.maxY)/2,bcy=(b.minY+b.maxY)/2;
          if(overlapX<=overlapY){const direction=acx<=bcx?-1:1,push=(overlapX+.02)/2;nodes[i].dx+=direction*push;nodes[j].dx-=direction*push;}
          else{const direction=acy<=bcy?-1:1,push=(overlapY+.02)/2;nodes[i].dy+=direction*push;nodes[j].dy-=direction*push;}
          clampLayoutNodeToBoard(nodes[i],boardW,boardH);clampLayoutNodeToBoard(nodes[j],boardW,boardH);
        }
      }
      if(!changed)break;
    }
    const newCenter={x:nodes.reduce((a,n)=>a+(nodeBounds(n).minX+nodeBounds(n).maxX)/2,0)/nodes.length,y:nodes.reduce((a,n)=>a+(nodeBounds(n).minY+nodeBounds(n).maxY)/2,0)/nodes.length},recenterX=originalCenter.x-newCenter.x,recenterY=originalCenter.y-newCenter.y;
    for(const node of nodes){node.dx+=recenterX;node.dy+=recenterY;clampLayoutNodeToBoard(node,boardW,boardH);for(const item of node.items){item.xMm+=node.dx;item.yMm+=node.dy;}}
    clearGroupMemberEdit();syncStickerSelectionUi();drawPreview();generateSticker();checkpointHistory();schedulePersist(0);
    if(unresolved){els.autoArrangeStatus.textContent='공간 부족';setNotice('warn','대지 공간이 부족합니다',`${gap.toFixed(1)} mm 간격을 모두 확보하지 못했습니다. 대지를 키우거나 간격을 줄여 주세요.`);}
    else{els.autoArrangeStatus.textContent=`${gap.toFixed(1)} mm 완료`;setNotice('good','스티커 여백 자동 배치 완료',`합친 칼선을 한 묶음으로 유지하면서 칼선 사이를 최소 ${gap.toFixed(1)} mm 이상 확보했습니다.`);}
  }

  function defaultMakerEffects(){return{outline:{enabled:false,color:'#ffffff',widthMm:3},outerGlow:{enabled:false,color:'#7bdcff',opacity:70,sizeMm:4,spread:35},innerGlow:{enabled:false,color:'#ffffff',opacity:55,sizeMm:3,spread:25},shadow:{enabled:false,color:'#203044',opacity:45,sizeMm:3,spread:20,xMm:2,yMm:2}};}
  function normalizeMakerEffects(value){const d=defaultMakerEffects(),v=value||{};return{outline:{...d.outline,...(v.outline||{})},outerGlow:{...d.outerGlow,...(v.outerGlow||{})},innerGlow:{...d.innerGlow,...(v.innerGlow||{})},shadow:{...d.shadow,...(v.shadow||{})}};}
  function updateMakerSelectedFromFields(){const item=state.makerItems.find(v=>v.id===state.makerSelectedId);if(!item)return;item.widthMm=clamp(num(els.makerSelWidth,item.widthMm),2,500);item.rotation=num(els.makerSelRotation,item.rotation);item.xMm=num(els.makerSelX,item.xMm);item.yMm=num(els.makerSelY,item.yMm);const e=normalizeMakerEffects(item.effects);e.outline={enabled:els.makerOutlineEnabled.checked,color:els.makerOutlineColor.value,widthMm:clamp(num(els.makerOutlineWidth,3),0,30)};e.outerGlow={enabled:els.makerOuterGlowEnabled.checked,color:els.makerOuterGlowColor.value,opacity:clamp(num(els.makerOuterGlowOpacity,70),0,100),sizeMm:clamp(num(els.makerOuterGlowSize,4),0,30),spread:clamp(num(els.makerOuterGlowSpread,35),0,100)};e.innerGlow={enabled:els.makerInnerGlowEnabled.checked,color:els.makerInnerGlowColor.value,opacity:clamp(num(els.makerInnerGlowOpacity,55),0,100),sizeMm:clamp(num(els.makerInnerGlowSize,3),0,30),spread:clamp(num(els.makerInnerGlowSpread,25),0,100)};e.shadow={enabled:els.makerShadowEnabled.checked,color:els.makerShadowColor.value,opacity:clamp(num(els.makerShadowOpacity,45),0,100),sizeMm:clamp(num(els.makerShadowSize,3),0,30),spread:clamp(num(els.makerShadowSpread,20),0,100),xMm:num(els.makerShadowX,2),yMm:num(els.makerShadowY,2)};item.effects=e;updateMakerUi();drawPreview();scheduleMakerGenerate();}
  function applySelectedMakerEffectsToAll(){
    const selected=state.makerItems.find(v=>v.id===state.makerSelectedId);if(!selected)return;
    const effects=normalizeMakerEffects(selected.effects);for(const item of state.makerItems)item.effects=normalizeMakerEffects(JSON.parse(JSON.stringify(effects)));
    updateMakerUi();drawPreview();scheduleMakerGenerate();schedulePersist(0);
    setNotice('good','효과를 전체 이미지에 적용했습니다',`${state.makerItems.length}개 개체에 외곽선·광선·그림자 설정을 동일하게 적용했습니다.`);
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
    schedulePersist(0);checkpointHistory();
  }


  function componentLabelMask(mask,w,h){
    const seen=new Uint8Array(mask.length),components=[],q=new Int32Array(mask.length);
    for(let start=0;start<mask.length;start++){
      if(!mask[start]||seen[start])continue;
      let head=0,tail=0,area=0,minX=w,minY=h,maxX=0,maxY=0;seen[start]=1;q[tail++]=start;const pixels=[];
      while(head<tail){const i=q[head++],x=i%w,y=(i/w)|0;pixels.push(i);area++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
        for(let yy=Math.max(0,y-1);yy<=Math.min(h-1,y+1);yy++)for(let xx=Math.max(0,x-1);xx<=Math.min(w-1,x+1);xx++){const ni=yy*w+xx;if(mask[ni]&&!seen[ni]){seen[ni]=1;q[tail++]=ni;}}
      }
      components.push({area,minX,minY,maxX,maxY,pixels,boundary:null});
    }
    return components;
  }
  function bboxDistance(a,b){const dx=Math.max(0,Math.max(a.minX,b.minX)-Math.min(a.maxX,b.maxX)-1),dy=Math.max(0,Math.max(a.minY,b.minY)-Math.min(a.maxY,b.maxY)-1);return Math.hypot(dx,dy);}
  function componentBoundary(comp,mask,w,h){
    if(comp.boundary)return comp.boundary;const out=[];
    for(const i of comp.pixels){const x=i%w,y=(i/w)|0;if(x===0||y===0||x===w-1||y===h-1||!mask[i-1]||!mask[i+1]||!mask[i-w]||!mask[i+w])out.push({x,y});}
    comp.boundary=out;return out;
  }
  function componentsWithinGap(a,b,maxGap,mask,w,h){
    if(maxGap<=0||bboxDistance(a,b)>maxGap)return false;
    let pa=componentBoundary(a,mask,w,h),pb=componentBoundary(b,mask,w,h);if(pa.length>pb.length)[pa,pb]=[pb,pa];
    const reach=maxGap+1.05,cell=Math.max(2,Math.ceil(reach)),grid=new Map(),key=(x,y)=>`${x},${y}`;
    for(const p of pb){const gx=Math.floor(p.x/cell),gy=Math.floor(p.y/cell),k=key(gx,gy);if(!grid.has(k))grid.set(k,[]);grid.get(k).push(p);}
    const r2=reach*reach;
    for(const p of pa){const gx=Math.floor(p.x/cell),gy=Math.floor(p.y/cell);for(let yy=gy-1;yy<=gy+1;yy++)for(let xx=gx-1;xx<=gx+1;xx++){const list=grid.get(key(xx,yy));if(!list)continue;for(const q of list){const dx=p.x-q.x,dy=p.y-q.y;if(dx*dx+dy*dy<=r2)return true;}}}
    return false;
  }
  async function clusterImageRecord(source,comps,analysisMask,w,h,scale){
    const minX=Math.max(0,Math.min(...comps.map(v=>v.minX))-2),minY=Math.max(0,Math.min(...comps.map(v=>v.minY))-2),maxX=Math.min(w-1,Math.max(...comps.map(v=>v.maxX))+2),maxY=Math.min(h-1,Math.max(...comps.map(v=>v.maxY))+2);
    const smallW=maxX-minX+1,smallH=maxY-minY+1,cluster=new Uint8Array(smallW*smallH);
    for(const comp of comps)for(const i of comp.pixels){const x=i%w,y=(i/w)|0;if(x>=minX&&x<=maxX&&y>=minY&&y<=maxY)cluster[(y-minY)*smallW+(x-minX)]=1;}
    const expanded=dilateMask(cluster,smallW,smallH,1),maskCanvas=makeCanvas(smallW,smallH),mc=maskCanvas.getContext('2d'),mid=mc.createImageData(smallW,smallH);
    for(let i=0;i<expanded.length;i++)if(expanded[i])mid.data[i*4+3]=255;mc.putImageData(mid,0,0);
    const sx=minX/scale,sy=minY/scale,sw=smallW/scale,sh=smallH/scale,crop=makeCanvas(Math.ceil(sw),Math.ceil(sh)),cropCtx=crop.getContext('2d');
    cropCtx.imageSmoothingEnabled=true;cropCtx.imageSmoothingQuality='high';cropCtx.drawImage(source.img,sx,sy,sw,sh,0,0,crop.width,crop.height);
    const maskHi=makeCanvas(crop.width,crop.height),mh=maskHi.getContext('2d');mh.imageSmoothingEnabled=true;mh.imageSmoothingQuality='high';mh.drawImage(maskCanvas,0,0,smallW,smallH,0,0,crop.width,crop.height);
    cropCtx.globalCompositeOperation='destination-in';cropCtx.drawImage(maskHi,0,0);cropCtx.globalCompositeOperation='source-over';
    const dataUrl=crop.toDataURL('image/png'),img=await loadImage(dataUrl);
    return {img,dataUrl,name:`${source.name}-분리`,naturalWidth:crop.width,naturalHeight:crop.height,trimCache:Object.create(null),sx,sy,sw,sh};
  }
  function splitPreviewCutlineCount(preview){
    if(!preview)return 0;return new Set(preview.items.map(item=>item.groupId||item.id)).size;
  }
  function buildSplitPreviewCutPaths(preview){
    if(!preview||!state.result)return[];
    const ppm=state.result.ppm,w=state.result.widthPx,h=state.result.heightPx,style=currentFinishStyle('sticker'),borderPx=style==='bordered'?Math.round(num(els.stickerBorder,2)*ppm):0,threshold=clamp(num(style==='borderless'?els.stickerAlphaThreshold:els.stickerAlphaThresholdBordered,24),1,254),records=[];
    for(const sticker of preview.items){
      const local=renderStickerLocal(sticker,ppm,w,h,Math.max(8,borderPx+8)),data=local.canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,local.canvas.width,local.canvas.height),mask=suppressNeedleProtrusions(stabilizeAlphaMask(data,threshold,getBoundarySamplingConfig()),local.canvas.width,local.canvas.height,ppm);
      records.push({sticker,mask,left:local.left,top:local.top,lw:local.canvas.width,lh:local.canvas.height});
    }
    return buildStickerGroupCutPaths(records,w,h,ppm,style,borderPx,false);
  }
  async function buildSplitPreview(){
    const source=state.stickers.find(v=>v.id===state.selectedId);if(!source){setNotice('warn','쪼갤 이미지를 선택해 주세요','대지에서 한 이미지 안에 여러 개체가 들어 있는 파일을 먼저 선택하세요.');return;}
    setBusy(true);await nextFrame();try{
      const maxDim=1500,scale=Math.min(1,maxDim/Math.max(source.naturalWidth,source.naturalHeight)),w=Math.max(1,Math.round(source.naturalWidth*scale)),h=Math.max(1,Math.round(source.naturalHeight*scale)),c=makeCanvas(w,h),cc=c.getContext('2d',{willReadFrequently:true});cc.drawImage(source.img,0,0,w,h);const data=cc.getImageData(0,0,w,h),threshold=clamp(num(els.stickerAlphaThreshold,24),1,254);let hasTransparentBackground=false;for(let i=3;i<data.data.length;i+=4){if(data.data[i]<=threshold){hasTransparentBackground=true;break;}}
      if(!hasTransparentBackground){state.splitPreview=null;els.splitApplyBtn.disabled=true;els.splitPreviewCount.textContent='투명 배경 필요';syncStickerSelectionUi();drawPreview();setNotice('warn','투명 배경 이미지를 사용해 주세요','현재 파일은 배경까지 불투명해서 개체 사이를 구분할 수 없습니다. 배경을 지운 PNG 또는 WebP로 다시 올리면 떨어진 그림 덩어리를 자동으로 나눌 수 있습니다.');return;}
      const rawMask=imageDataToMask(data,threshold),raw=componentLabelMask(rawMask,w,h),minArea=Math.max(3,Math.round(w*h*.000006)),components=raw.filter(v=>v.area>=minArea);
      if(components.length<2){state.splitPreview=null;els.splitApplyBtn.disabled=true;els.splitPreviewCount.textContent='분리 개체 없음';syncStickerSelectionUi();drawPreview();setNotice('info','분리할 개체를 찾지 못했습니다','이미지가 한 덩어리로 연결되어 있거나 아주 작은 점만 떨어져 있습니다.');return;}
      // 연결 거리 판정은 칼선/테두리를 만들기 전, 원본 알파 픽셀 덩어리의 실제 빈 간격에만 적용합니다.
      const thresholdMm=clamp(num(els.splitThreshold,3),0,20),sourcePxPerMm=w/Math.max(.001,source.widthMm),thresholdPx=thresholdMm*sourcePxPerMm,parent=components.map((_,i)=>i),find=x=>parent[x]===x?x:(parent[x]=find(parent[x])),join=(a,b)=>{a=find(a);b=find(b);if(a!==b)parent[b]=a;};
      if(thresholdPx>0)for(let i=0;i<components.length;i++)for(let j=i+1;j<components.length;j++)if(componentsWithinGap(components[i],components[j],thresholdPx,rawMask,w,h))join(i,j);
      const clusters=new Map();components.forEach((comp,i)=>{const r=find(i);if(!clusters.has(r))clusters.set(r,[]);clusters.get(r).push(comp);});const items=[];
      for(const comps of clusters.values()){
        const rec=await clusterImageRecord(source,comps,rawMask,w,h,scale),localX=((rec.sx+rec.sw/2)-source.naturalWidth/2)/source.naturalWidth*source.widthMm,localY=((rec.sy+rec.sh/2)-source.naturalHeight/2)/source.naturalWidth*source.widthMm,a=source.rotation*Math.PI/180,ox=localX*Math.cos(a)-localY*Math.sin(a),oy=localX*Math.sin(a)+localY*Math.cos(a);
        items.push({...rec,id:uid(),widthMm:source.widthMm*(rec.sw/source.naturalWidth),rotation:source.rotation,xMm:source.xMm+ox,yMm:source.yMm+oy,groupId:null,splitBridgeMm:comps.length>1?thresholdMm:0,splitComponentCount:comps.length});
      }
      const preview={sourceId:source.id,items,thresholdMm,rawCount:components.length,selectedIds:[],cutPaths:[]};state.splitPreview=preview;preview.cutPaths=buildSplitPreviewCutPaths(preview);els.splitApplyBtn.disabled=false;syncStickerSelectionUi();drawPreview();setNotice('good',`${components.length}개 원본 덩어리 → ${items.length}개 미리보기 칼선`,`0 mm에서는 떨어진 원본 픽셀 덩어리를 전부 나눕니다. 멀리 떨어진 칼선도 미리보기에서 직접 선택해 합칠 수 있습니다.`);
    }finally{setBusy(false);}
  }
  function applySplitPreview(){const p=state.splitPreview;if(!p)return;const idx=state.stickers.findIndex(v=>v.id===p.sourceId);if(idx<0)return;state.stickers.splice(idx,1,...p.items);state.selectedStickerIds=p.items.map(v=>v.id);state.selectedId=state.selectedStickerIds.at(-1)||null;clearGroupMemberEdit();state.splitPreview=null;els.splitApplyBtn.disabled=true;els.splitPreviewCount.textContent='미리보기 없음';els.stickerCount.textContent=`${state.stickers.length}개`;syncStickerSelectionUi();generateSticker();saveWorkspaceNow();checkpointHistory();}
  function previewSelectedIds(){return state.splitPreview?.selectedIds||[];}
  function selectSplitPreviewItem(id,options={}){
    const p=state.splitPreview;if(!p)return;const set=new Set(p.selectedIds||[]);
    if(!id)p.selectedIds=[];
    else{
      const hit=p.items.find(v=>v.id===id),ids=hit?.groupId?p.items.filter(v=>v.groupId===hit.groupId).map(v=>v.id):[id],additive=options.additive!==false;
      if(additive){const allSelected=ids.every(v=>set.has(v));for(const memberId of ids){if(allSelected)set.delete(memberId);else set.add(memberId);}p.selectedIds=[...set];}
      else p.selectedIds=ids;
    }
    syncStickerSelectionUi();drawPreview();
  }
  function applyMergeLayerPolicy(items,selectedIds){
    const policy=els.mergeLayerPolicy?.value||'keep';if(policy==='keep'||selectedIds.length<2)return;
    const topId=policy==='first-top'?selectedIds[0]:selectedIds[selectedIds.length-1],index=items.findIndex(v=>v.id===topId);if(index<0)return;const [item]=items.splice(index,1);items.push(item);
  }
  function mergeSelectedObjects(){
    const p=state.splitPreview;
    if(p){const selected=new Set(previewSelectedIds());if(selected.size<2)return;const selectedGroupIds=new Set(p.items.filter(v=>selected.has(v.id)&&v.groupId).map(v=>v.groupId));for(const item of p.items)if(item.groupId&&selectedGroupIds.has(item.groupId))selected.add(item.id);const ordered=[...selected];applyMergeLayerPolicy(p.items,ordered);const groupId=uid();for(const item of p.items)if(selected.has(item.id))item.groupId=groupId;p.selectedIds=ordered;p.cutPaths=buildSplitPreviewCutPaths(p);syncStickerSelectionUi();drawPreview();checkpointHistory();return;}
    const ids=[...state.selectedStickerIds];if(ids.length<2)return;applyMergeLayerPolicy(state.stickers,ids);const groupId=uid();for(const item of state.stickers)if(ids.includes(item.id))item.groupId=groupId;clearGroupMemberEdit();state.selectedStickerIds=ids;state.selectedId=ids.at(-1)||null;syncStickerSelectionUi();generateSticker();checkpointHistory();
  }
  function ungroupSelectedObjects(){
    const p=state.splitPreview;
    if(p){const ids=new Set(previewSelectedIds()),groups=new Set(p.items.filter(v=>ids.has(v.id)&&v.groupId).map(v=>v.groupId));for(const item of p.items)if(groups.has(item.groupId))item.groupId=null;p.cutPaths=buildSplitPreviewCutPaths(p);syncStickerSelectionUi();drawPreview();checkpointHistory();return;}
    for(const item of state.stickers)if(state.selectedStickerIds.includes(item.id))item.groupId=null;clearGroupMemberEdit();syncStickerSelectionUi();generateSticker();checkpointHistory();
  }
  function moveItemLayer(items,id,action){
    const i=items.findIndex(v=>v.id===id);if(i<0)return;const selected=items[i],moveAsGroup=items===state.stickers&&selected.groupId&&!state.groupEditIds.length,block=moveAsGroup?items.filter(v=>v.groupId===selected.groupId):[selected],blockIds=new Set(block.map(v=>v.id)),remaining=items.filter(v=>!blockIds.has(v.id)),firstIndex=Math.min(...block.map(v=>items.findIndex(q=>q.id===v.id)));let target=firstIndex;
    if(action==='front')target=remaining.length;else if(action==='back')target=0;else if(action==='step-front')target=Math.min(remaining.length,firstIndex+1);else if(action==='step-back')target=Math.max(0,firstIndex-1);remaining.splice(target,0,...block);items.splice(0,items.length,...remaining);drawPreview();state.mode==='maker'?scheduleMakerGenerate():scheduleStickerGenerate();checkpointHistory();
  }
  function drawSplitPreview(t){
    const p=state.splitPreview;if(!p||state.mode!=='sticker'||!state.result)return;const dpr=window.devicePixelRatio||1;
    if(!p.cutPaths?.length)p.cutPaths=buildSplitPreviewCutPaths(p);
    ctx.save();ctx.beginPath();for(const path of p.cutPaths)drawPath(ctx,path,t.scale,t.scale,t.x,t.y,AUTO_CUT_CURVE);ctx.strokeStyle='#21a9c8';ctx.lineWidth=Math.max(1.6,1.45*dpr);ctx.setLineDash([7*dpr,5*dpr]);ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke();ctx.restore();
    const selected=new Set(p.selectedIds||[]);for(const item of p.items){if(!selected.has(item.id))continue;const ppm=state.result.ppm,w=item.widthMm*ppm*t.scale,h=itemHeightMm(item)*ppm*t.scale,cx=t.x+item.xMm*ppm*t.scale,cy=t.y+item.yMm*ppm*t.scale;ctx.save();ctx.translate(cx,cy);ctx.rotate(item.rotation*Math.PI/180);ctx.strokeStyle='#ff8b20';ctx.fillStyle='rgba(255,139,32,.09)';ctx.lineWidth=2.2*dpr;ctx.setLineDash([5*dpr,4*dpr]);ctx.fillRect(-w/2,-h/2,w,h);ctx.strokeRect(-w/2,-h/2,w,h);ctx.restore();}
    if(['split-marquee','split-marquee-pending'].includes(state.dragging?.type)&&state.dragging.current){const a=state.dragging.start,b=state.dragging.current;ctx.save();ctx.strokeStyle='#ff8b20';ctx.fillStyle='rgba(255,139,32,.10)';ctx.setLineDash([6*dpr,4*dpr]);const x1=t.x+Math.min(a.xPx,b.xPx)*t.scale,y1=t.y+Math.min(a.yPx,b.yPx)*t.scale,x2=t.x+Math.max(a.xPx,b.xPx)*t.scale,y2=t.y+Math.max(a.yPx,b.yPx)*t.scale;ctx.fillRect(x1,y1,x2-x1,y2-y1);ctx.strokeRect(x1,y1,x2-x1,y2-y1);ctx.restore();}
  }
  function minimumSpanningItemPairs(group){
    if(group.length<2)return[];const connected=new Set([0]),pairs=[];
    while(connected.size<group.length){let best=null;for(const i of connected)for(let j=0;j<group.length;j++){if(connected.has(j))continue;const a=group[i].sticker,b=group[j].sticker,d=(a.xMm-b.xMm)**2+(a.yMm-b.yMm)**2;if(!best||d<best.d)best={i,j,d};}if(!best)break;connected.add(best.j);pairs.push([group[best.i].sticker,group[best.j].sticker]);}
    return pairs;
  }
  function buildStickerGroupCutPaths(records,w,h,ppm,style,borderPx,includeHoles){
    const groups=new Map();for(const rec of records){const key=rec.sticker.groupId||rec.sticker.id;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(rec);}const out=[];
    for(const group of groups.values()){
      let mask=new Uint8Array(w*h);
      for(const rec of group){let localMask=rec.mask;const bridgeMm=Number(rec.sticker.splitBridgeMm)||0;if(bridgeMm>0){const radius=Math.max(1,Math.round(bridgeMm*ppm/2));localMask=erodeMask(dilateMask(localMask,rec.lw,rec.lh,radius),rec.lw,rec.lh,radius);}for(let y=0;y<rec.lh;y++){const gy=y+rec.top;if(gy<0||gy>=h)continue;for(let x=0;x<rec.lw;x++){if(!localMask[y*rec.lw+x])continue;const gx=x+rec.left;if(gx>=0&&gx<w)mask[gy*w+gx]=1;}}}
      if(group.length>1){const radius=Math.max(2,Math.round(Math.max(borderPx+.7*ppm,1.4*ppm)));for(const [a,b] of minimumSpanningItemPairs(group)){const capsule=makeCapsuleMask(w,h,a.xMm*ppm,a.yMm*ppm,b.xMm*ppm,b.yMm*ppm,radius);mask=unionMask(mask,capsule);}}
      let cutMask=style==='bordered'?dilateMask(mask,w,h,borderPx):mask;if(style==='bordered')cutMask=bridgeNarrowCutInlets(cutMask,w,h,ppm,4).mask;const contours=traceContours(cutMask,w,h),outer=contours.filter(p=>polygonArea(p)>0);out.push(...outer);if(includeHoles){const holes=contours.filter(p=>polygonArea(p)<0);out.push(...holes);}
    }
    return prepareCutPaths(out,ppm);
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
  function selectedLayers(){const hasSemi=!!state.result?.hasSemiTransparent;return{background:!!els.exportBackground.checked&&!els.exportBackground.disabled,artwork:els.exportArtwork.checked,whiteOpaque:hasSemi&&!!els.exportWhiteOpaque.checked&&!els.exportWhiteOpaque.disabled,whiteFull:els.exportWhite.checked,bleed:els.exportBleed.checked&&!els.exportBleed.disabled,cutline:els.exportCutline.checked};}

  function composeSelectedLayers(r,pick){
    const canvas=makeCanvas(r.widthPx,r.heightPx),c=canvas.getContext('2d');
    c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    if(pick.background&&r.background)c.drawImage(r.background,0,0);
    if(pick.whiteOpaque)c.drawImage(r.whiteOpaque||r.white,0,0);
    if(pick.whiteFull)c.drawImage(r.white,0,0);
    if(pick.bleed)c.drawImage(r.bleed,0,0);
    if(pick.artwork)c.drawImage(r.original,0,0);
    if(pick.cutline){c.save();c.beginPath();for(const p of r.cutPaths)drawPath(c,p,1,1,0,0,r.cutCurve??AUTO_CUT_CURVE);c.strokeStyle='#ff00b8';c.lineWidth=Math.max(1,r.ppm*.18);c.lineJoin='round';c.lineCap='round';c.stroke();c.restore();}
    return canvas;
  }

  function composeMakerExport(r,forceWhite=false){const canvas=makeCanvas(r.widthPx,r.heightPx),c=canvas.getContext('2d');if(forceWhite||els.makerPngBackground?.value==='white'){c.fillStyle='#ffffff';c.fillRect(0,0,canvas.width,canvas.height);}if(r.background)c.drawImage(r.background,0,0);c.drawImage(r.original,0,0);return canvas;}
  function safeExportBase(defaultBase){
    const raw=(els.exportFileName?.value||'').trim().replace(/\.(png|jpe?g|svg|ai|pdf)$/i,'').replace(/[\/:*?"<>|]+/g,'-').replace(/\s+/g,' ').trim();
    return raw||defaultBase;
  }
  function exportFileName(ext,defaultBase){return `${safeExportBase(defaultBase)}.${ext}`;}

  function exportPng(){
    const r=state.result;if(!r)return alert('먼저 출력 이미지를 만들어 주세요.');
    if(r.mode==='maker'){const canvas=composeMakerExport(r,false);return canvas.toBlob(blob=>{if(blob)downloadBlob(blob,exportFileName('png','outline-background-maker'));},'image/png');}
    const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');const canvas=composeSelectedLayers(r,pick);canvas.toBlob(blob=>{if(blob)downloadBlob(blob,exportFileName('png',`acrylic-manager-${r.mode}-${r.finishStyle}`));},'image/png');
  }
  function exportJpg(){const r=state.result;if(!r||r.mode!=='maker')return;const canvas=composeMakerExport(r,true);canvas.toBlob(blob=>{if(blob)downloadBlob(blob,exportFileName('jpg','outline-background-maker'));},'image/jpeg',.94);}

  function exportSvg(){
    const r=state.result;if(!r)return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');
    const groups=[];
    if(pick.background&&r.background)groups.push(`<g id="BACKGROUND" data-layer="background"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.background.toDataURL('image/png')}"/></g>`);
    if(pick.whiteOpaque)groups.push(`<g id="WHITE_OPAQUE_ONLY" data-layer="white-opaque"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${(r.whiteOpaque||r.white).toDataURL('image/png')}"/></g>`);
    if(pick.whiteFull)groups.push(`<g id="WHITE_FULL" data-layer="white-full"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.white.toDataURL('image/png')}"/></g>`);
    if(pick.bleed)groups.push(`<g id="BLEED_EXTENSION" data-layer="bleed"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.bleed.toDataURL('image/png')}"/></g>`);
    if(pick.artwork)groups.push(`<g id="ARTWORK" data-layer="artwork"><image x="0" y="0" width="${r.widthPx}" height="${r.heightPx}" href="${r.original.toDataURL('image/png')}"/></g>`);
    if(pick.cutline){const paths=r.cutPaths.map(p=>`<path d="${pathToSvgD(p,r.cutCurve??AUTO_CUT_CURVE)}" fill="none" stroke="#ff00b8" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`).join('\n');groups.push(`<g id="CUTLINE" data-layer="cutline">${paths}</g>`);}
    const svg=`<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${r.widthMm.toFixed(4)}mm" height="${r.heightMm.toFixed(4)}mm" viewBox="0 0 ${r.widthPx} ${r.heightPx}">\n<title>아크릴 제작 매니저 출력 데이터</title>\n<metadata>finish-style=${r.finishStyle}; cut-curve=automatic; layers=${Object.entries(pick).filter(([,v])=>v).map(([k])=>k).join(',')}</metadata>\n${groups.join('\n')}\n</svg>`;
    downloadBlob(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}),exportFileName('svg',`acrylic-manager-${r.mode}-${r.finishStyle}`));
  }

  function asciiBytes(str){const out=new Uint8Array(str.length);for(let i=0;i<str.length;i++)out[i]=str.charCodeAt(i)&255;return out;}
  function concatBytes(parts){const len=parts.reduce((s,p)=>s+p.length,0),out=new Uint8Array(len);let o=0;for(const p of parts){out.set(p,o);o+=p.length;}return out;}
  function canvasRgbAlpha(canvas){const d=canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,canvas.width,canvas.height).data,n=canvas.width*canvas.height,rgb=new Uint8Array(n*3),alpha=new Uint8Array(n);for(let i=0;i<n;i++){rgb[i*3]=d[i*4];rgb[i*3+1]=d[i*4+1];rgb[i*3+2]=d[i*4+2];alpha[i]=d[i*4+3];}return{rgb,alpha};}
  function makePdfAi(r,pick){
    const pageW=r.widthMm*72/25.4,pageH=r.heightMm*72/25.4,sx=pageW/r.widthPx,sy=pageH/r.heightPx,layers=[];
    if(pick.background&&r.background)layers.push(['Background',r.background]);
    if(pick.whiteOpaque)layers.push(['White - Opaque only',r.whiteOpaque||r.white]);
    if(pick.whiteFull)layers.push(['White - Full',r.white]);
    if(pick.bleed)layers.push(['Bleed',r.bleed]);
    if(pick.artwork)layers.push(['Artwork',r.original]);
    let content='';for(let i=0;i<layers.length;i++)content+=`q\n${pageW.toFixed(5)} 0 0 ${pageH.toFixed(5)} 0 0 cm\n/Im${i} Do\nQ\n`;
    if(pick.cutline){
      content+='1 0 0.72 RG\n0.25 w\n1 J\n1 j\n';
      for(const p of r.cutPaths){
        if(!p.length)continue;
        content+=`${(p[0].x*sx).toFixed(4)} ${(pageH-p[0].y*sy).toFixed(4)} m\n`;
        for(const seg of curveSegments(p,r.cutCurve??AUTO_CUT_CURVE)){
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
  function exportAi(){const r=state.result;if(!r)return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');const bytes=makePdfAi(r,pick);downloadBlob(new Blob([bytes],{type:'application/pdf'}),exportFileName('ai',`acrylic-manager-${r.mode}-${r.finishStyle}`));}

  function resetAll(){
    if(els.exportFileName)els.exportFileName.value='';
    if(state.mode==='acrylic'){
      state.source=null;state.result=null;state.finishStyle.acrylic='borderless';state.baseGapMode='transparent';state.baseSupportMode='color';state.borderlessBaseLevel=false;state.holeCreateMode='internal';state.holes=[];state.selectedHoleIds=[];state.selectedHoleId=null;
      els.singleFileInput.value='';els.imageStatus.textContent='이미지 필요';els.productWidth.value=70;els.productHeight.value=70;els.artworkWidth.value=60;els.artworkHeight.value=60;els.lockArtworkAspect.checked=true;els.bleedMm.value=2;els.acrylicBorderMm.value=2;els.alphaThreshold.value=24;els.alphaThresholdBordered.value=24;els.colorSampleRadius.value=12;els.baseColorTolerance.value=18;els.baseLiftMm.value=0;els.baseCornerRadius.value=55;els.baseSlopeStatus.textContent='이미지를 넣으면 좌·우 돌출부의 높이 차이를 표시합니다.';els.includeHoles.checked=false;els.addFlatBase.checked=true;els.holeDiameter.value=3;els.holeWall.value=1.5;els.holeInset.value=2.5;els.holeExternalGap.value=.4;updateAcrylicSizeSummary();setNotice('info','이미지를 추가해 주세요','투명 PNG를 올리면 그림, 화이트, 칼선, 재단여백 레이어를 생성합니다.');updateFinishStyleUi();drawPreview();
    }else if(state.mode==='sticker'){
      state.stickers=[];state.selectedId=null;state.selectedStickerIds=[];clearGroupMemberEdit();state.splitPreview=null;state.finishStyle.sticker='borderless';state.stickerBorderFill='transparent';state.stickerBackgroundType='color';state.stickerBackgroundImage=null;state.stickerPatternImage=null;state.stickerPatternImages=[];els.stickerCount.textContent='0개';els.artboardWidth.value=210;els.artboardHeight.value=297;els.stickerBorder.value=2;els.stickerBleed.value=2;els.stickerWhiteBleed.value=1;els.stickerAlphaThreshold.value=24;els.stickerAlphaThresholdBordered.value=24;els.stickerIncludeHoles.checked=false;els.stickerBackgroundEnabled.checked=false;els.stickerBackgroundColor.value='#ffffff';els.stickerBackgroundFit.value='cover';els.stickerBackgroundScale.value=100;els.stickerBackgroundX.value=0;els.stickerBackgroundY.value=0;els.stickerBackgroundRotation.value=0;els.stickerPatternScale.value=100;els.stickerPatternX.value=0;els.stickerPatternY.value=0;els.stickerPatternBackgroundType.value='color';els.stickerPatternGradientA.value='#ffffffff';els.stickerPatternGradientB.value='#dff3ffff';els.stickerPatternGradientAngle.value=135;els.stickerPatternOrder.value='balanced';els.stickerPatternRotationMode.value='fixed';els.stickerPatternRotation.value=0;els.stickerPatternRotationMin.value=-15;els.stickerPatternRotationMax.value=15;els.stickerAutoGap.value=3;els.autoArrangeStatus.textContent='대기';els.stickerBackgroundFile.value='';els.stickerPatternFile.value='';els.stickerBackgroundStatus.textContent='선택된 이미지 없음';els.stickerPatternStatus.textContent='선택된 패턴 없음';syncStickerSelectionUi();updateFinishStyleUi();updateStickerBackgroundUi();generateSticker();
    }else{
      state.makerItems=[];state.makerSelectedId=null;state.makerBackgroundType='transparent';state.makerBackgroundImage=null;state.makerPatternImage=null;state.makerPatternImages=[];els.makerCount.textContent='0개';els.makerWidth.value=100;els.makerHeight.value=100;els.makerCutMargin.value=0;els.makerBgColor.value='#ffffff00';els.makerPatternBackgroundType.value='color';els.makerPatternGradientA.value='#ffffff00';els.makerPatternGradientB.value='#dff3ffff';els.makerPatternGradientAngle.value=135;els.makerPatternOrder.value='balanced';els.makerPatternRotationMode.value='fixed';els.makerPatternRotation.value=0;els.makerPatternRotationMin.value=-15;els.makerPatternRotationMax.value=15;els.makerBackgroundRotation.value=0;els.makerBackgroundStatus.textContent='선택된 이미지 없음';els.makerPatternStatus.textContent='선택된 패턴 없음';updateMakerUi();generateMaker();
    }refreshColorControls();schedulePersist(0);checkpointHistory();
  }


  els.undoBtn?.addEventListener('click',()=>stepHistory(-1));
  els.redoBtn?.addEventListener('click',()=>stepHistory(1));
  document.addEventListener('keydown',event=>{
    const mod=event.ctrlKey||event.metaKey;if(!mod||event.altKey)return;const key=event.key.toLowerCase();
    if(key==='z'){event.preventDefault();stepHistory(event.shiftKey?1:-1);}else if(key==='y'){event.preventDefault();stepHistory(1);}
  });
  els.acrylicModeBtn.addEventListener('click',()=>setMode('acrylic'));
  els.stickerModeBtn.addEventListener('click',()=>setMode('sticker'));
  els.makerModeBtn.addEventListener('click',()=>setMode('maker'));
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
  els.stickerBackgroundGradientBtn.addEventListener('click',()=>setStickerBackgroundType('gradient'));
  els.stickerBackgroundImageBtn.addEventListener('click',()=>setStickerBackgroundType('image'));
  els.stickerBackgroundPatternBtn.addEventListener('click',()=>setStickerBackgroundType('pattern'));
  els.holeNoneBtn.addEventListener('click',()=>setHoleMode('none'));
  els.holeInternalBtn.addEventListener('click',()=>setHoleMode('internal'));
  els.holeExternalBtn.addEventListener('click',()=>setHoleMode('external'));
  els.addHoleBtn.addEventListener('click',()=>addHole(state.holeCreateMode));
  els.deleteHoleBtn.addEventListener('click',()=>removeHole());
  els.resetHolePositionBtn.addEventListener('click',()=>ensureDraftHolePosition(getSelectedHole(),true));
  els.centerHoleBtn.addEventListener('click',centerSelectedHoles);

  async function handleAcrylicFile(file){
    if(!file)return;
    try{
      setBusy(true);
      const record=await fileToImageRecord(file);
      state.source=record;state.result=null;updateWhiteLayerUi();
      for(const hole of state.holes){hole.appliedMode='none';hole.appliedXmm=hole.appliedYmm=null;hole.draftXmm=hole.draftYmm=null;hole.dirty=true;}
      els.imageStatus.textContent=file.name;
      fitArtworkToBoard({skipGenerate:true});
      updateArtworkScaleFromSize('width');
      drawPreview();
      setNotice('info','이미지를 불러왔습니다','대지에 원본을 먼저 표시하고 칼선과 확장 도안을 계산합니다.');
      await generateAcrylic();
      ensureAllDraftHolePositions();
      await saveWorkspaceNow();
      schedulePersist(0);checkpointHistory();
    }catch(error){
      console.error(error);state.result=null;updateWhiteLayerUi();drawPreview();setBusy(false);
      setNotice('bad','이미지를 불러오지 못했습니다',error?.message||'지원되는 PNG, WebP 또는 JPG 파일인지 확인해 주세요.');
    }finally{
      els.singleFileInput.value='';
    }
  }

  els.singleFileInput.addEventListener('change',async e=>{await handleAcrylicFile(e.target.files?.[0]);});
  els.multiFileInput.addEventListener('change',async e=>{const files=[...(e.target.files||[])];if(files.length)await addStickerFiles(files);e.target.value='';});
  els.makerFileInput.addEventListener('change',async e=>{const files=[...(e.target.files||[])];if(files.length)await addMakerFiles(files);e.target.value='';});
  els.stickerBackgroundFile.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;state.stickerBackgroundImage=await fileToImageRecord(file);els.stickerBackgroundStatus.textContent=file.name;state.stickerBackgroundType='image';updateStickerBackgroundUi();saveWorkspaceNow();await generateSticker();schedulePersist(0);checkpointHistory();});
  els.stickerPatternFile.addEventListener('change',async e=>{const files=[...(e.target.files||[])];if(!files.length)return;setBusy(true);try{state.stickerPatternImages=(await Promise.all(files.map(async file=>cropImageRecordToAlpha(await fileToImageRecord(file),1)))).filter(Boolean);state.stickerPatternImage=state.stickerPatternImages[0]||null;els.stickerPatternStatus.textContent=`${state.stickerPatternImages.length}개 이미지 · 투명 여백 자동 제거`;state.stickerBackgroundType='pattern';els.stickerPatternKind.value='image';updateStickerBackgroundUi();await generateSticker();await saveWorkspaceNow();checkpointHistory();}finally{setBusy(false);}schedulePersist(0);});
  els.makerBackgroundFile.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;state.makerBackgroundImage=await fileToImageRecord(file);els.makerBackgroundStatus.textContent=file.name;state.makerBackgroundType='image';updateMakerUi();await generateMaker();saveWorkspaceNow();checkpointHistory();});
  els.makerPatternFile.addEventListener('change',async e=>{const files=[...(e.target.files||[])];if(!files.length)return;setBusy(true);try{state.makerPatternImages=(await Promise.all(files.map(async file=>cropImageRecordToAlpha(await fileToImageRecord(file),1)))).filter(Boolean);state.makerPatternImage=state.makerPatternImages[0]||null;els.makerPatternStatus.textContent=`${state.makerPatternImages.length}개 이미지 · 투명 여백 자동 제거`;state.makerBackgroundType='pattern';els.makerPatternKind.value='image';updateMakerUi();await generateMaker();await saveWorkspaceNow();checkpointHistory();}finally{setBusy(false);}});

  els.generateBtn.addEventListener('click',applyHolesAndGenerate);
  els.generateStickerBtn.addEventListener('click',()=>{state.splitPreview=null;els.splitApplyBtn.disabled=true;els.splitPreviewCount.textContent='미리보기 없음';syncStickerSelectionUi();generateSticker();});
  els.splitPreviewBtn.addEventListener('click',buildSplitPreview);els.splitApplyBtn.addEventListener('click',applySplitPreview);
  const syncSplit=(fromRange)=>{const v=fromRange?els.splitThresholdRange.value:els.splitThreshold.value;els.splitThresholdRange.value=v;els.splitThreshold.value=v;if(state.splitPreview)buildSplitPreview();};els.splitThresholdRange.addEventListener('input',()=>syncSplit(true));els.splitThreshold.addEventListener('input',()=>syncSplit(false));
  els.multiSelectBtn.addEventListener('click',()=>{state.multiSelectMode=!state.multiSelectMode;syncStickerSelectionUi();});els.mergeObjectsBtn.addEventListener('click',mergeSelectedObjects);els.ungroupObjectsBtn.addEventListener('click',ungroupSelectedObjects);els.autoArrangeStickerBtn.addEventListener('click',autoArrangeStickers);
  const rotateBackground=(input,delta,generate)=>{input.value=((num(input,0)+delta+540)%360)-180;input.dispatchEvent(new Event('input',{bubbles:true}));generate();checkpointHistory();};
  els.stickerBackgroundRotateLeft.addEventListener('click',()=>rotateBackground(els.stickerBackgroundRotation,-90,generateSticker));
  els.stickerBackgroundRotateRight.addEventListener('click',()=>rotateBackground(els.stickerBackgroundRotation,90,generateSticker));
  els.makerBackgroundRotateLeft.addEventListener('click',()=>rotateBackground(els.makerBackgroundRotation,-90,generateMaker));
  els.makerBackgroundRotateRight.addEventListener('click',()=>rotateBackground(els.makerBackgroundRotation,90,generateMaker));
  els.generateMakerBtn.addEventListener('click',generateMaker);
  [els.productWidth,els.productHeight,els.bleedMm,els.acrylicBorderMm,els.alphaThreshold,els.alphaThresholdBordered,els.colorSampleRadius,els.baseColorTolerance,els.baseLiftMm,els.baseCornerRadius].forEach(el=>el.addEventListener('input',()=>{updateAcrylicSizeSummary();scheduleAcrylicGenerate();}));
  els.artworkWidth.addEventListener('input',()=>{syncArtworkAspect('width');scheduleAcrylicGenerate();});
  els.artworkHeight.addEventListener('input',()=>{syncArtworkAspect('height');scheduleAcrylicGenerate();});
  els.artworkScale.addEventListener('input',()=>{syncArtworkSizeFromScale();scheduleAcrylicGenerate();});
  els.artworkScale.addEventListener('change',()=>{syncArtworkSizeFromScale();generateAcrylic();});
  els.lockArtworkAspect.addEventListener('change',()=>{if(els.lockArtworkAspect.checked)syncArtworkAspect('width');else updateAcrylicSizeSummary();generateAcrylic();});
  els.fitArtworkToBoardBtn.addEventListener('click',()=>fitArtworkToBoard());
  els.includeHoles.addEventListener('change',generateAcrylic);
  els.addFlatBase.addEventListener('change',()=>{updateFlatBaseUi();generateAcrylic();});
  [els.holeDiameter,els.holeWall,els.holeInset,els.holeExternalGap].forEach(el=>el.addEventListener('input',()=>markHoleDirty(true)));
  [els.artboardWidth,els.artboardHeight,els.stickerBorder,els.stickerBleed,els.stickerWhiteBleed,els.stickerAlphaThreshold,els.stickerAlphaThresholdBordered].forEach(el=>el.addEventListener('input',scheduleStickerGenerate));
  els.stickerIncludeHoles.addEventListener('change',generateSticker);
  els.stickerBackgroundEnabled.addEventListener('change',()=>{updateStickerBackgroundUi();generateSticker();});
  [els.stickerBackgroundColor,els.stickerGradientColorA,els.stickerGradientColorB,els.stickerGradientAngle,els.stickerBackgroundRotation,els.stickerPatternBgColor,els.stickerPatternGradientA,els.stickerPatternGradientB,els.stickerPatternGradientAngle,els.stickerPatternFgColor,els.stickerPatternLineWidth,els.stickerPatternSize,els.stickerPatternGap,els.stickerPatternRotation,els.stickerPatternRotationMin,els.stickerPatternRotationMax].filter(Boolean).forEach(el=>el.addEventListener('input',scheduleStickerGenerate));
  els.stickerBackgroundFit.addEventListener('change',()=>{updateStickerBackgroundUi();generateSticker();});[els.stickerPatternKind,els.stickerPatternBackgroundType,els.stickerPatternLineStyle,els.stickerPatternLayout,els.stickerPatternOrder,els.stickerPatternRotationMode].filter(Boolean).forEach(el=>el.addEventListener('change',()=>{updateStickerBackgroundUi();generateSticker();}));
  [els.stickerBackgroundScale,els.stickerBackgroundX,els.stickerBackgroundY,els.stickerPatternScale,els.stickerPatternX,els.stickerPatternY].forEach(el=>el.addEventListener('input',scheduleStickerGenerate));
  [els.selWidth,els.selRotation,els.selX,els.selY].forEach(el=>el.addEventListener('input',updateSelectedFromFields));
  els.sendBackBtn.addEventListener('click',()=>moveItemLayer(state.stickers,state.selectedId,'back'));els.stepBackBtn.addEventListener('click',()=>moveItemLayer(state.stickers,state.selectedId,'step-back'));els.stepFrontBtn.addEventListener('click',()=>moveItemLayer(state.stickers,state.selectedId,'step-front'));els.bringFrontBtn.addEventListener('click',()=>moveItemLayer(state.stickers,state.selectedId,'front'));
  els.deleteStickerBtn.addEventListener('click',()=>{const ids=new Set(state.selectedStickerIds);state.stickers=state.stickers.filter(v=>!ids.has(v.id));els.stickerCount.textContent=`${state.stickers.length}개`;selectSticker(null);generateSticker();});
  document.querySelectorAll('.sticker-size-template').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.sticker-size-template').forEach(v=>v.classList.toggle('active',v===btn));const r=btn.dataset.ratio;if(r==='square'){els.artboardWidth.value=100;els.artboardHeight.value=100;}else if(r==='portrait'){els.artboardWidth.value=100;els.artboardHeight.value=125;}else if(r==='story'){els.artboardWidth.value=90;els.artboardHeight.value=160;}else{els.artboardWidth.value=210;els.artboardHeight.value=297;}generateSticker();}));
  document.querySelectorAll('.maker-size-template').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.maker-size-template').forEach(v=>v.classList.toggle('active',v===btn));const r=btn.dataset.ratio;if(r==='square'){els.makerWidth.value=100;els.makerHeight.value=100;}else if(r==='portrait'){els.makerWidth.value=100;els.makerHeight.value=125;}else if(r==='story'){els.makerWidth.value=90;els.makerHeight.value=160;}else{els.makerWidth.value=210;els.makerHeight.value=297;}generateMaker();}));
  const setMakerBg=type=>{state.makerBackgroundType=type;updateMakerUi();generateMaker();};els.makerBgTransparentBtn.addEventListener('click',()=>setMakerBg('transparent'));els.makerBgColorBtn.addEventListener('click',()=>setMakerBg('color'));els.makerBgGradientBtn.addEventListener('click',()=>setMakerBg('gradient'));els.makerBgImageBtn.addEventListener('click',()=>setMakerBg('image'));els.makerBgPatternBtn.addEventListener('click',()=>setMakerBg('pattern'));
  [els.makerWidth,els.makerHeight,els.makerCutMargin,els.makerBgColor,els.makerGradientA,els.makerGradientB,els.makerGradientAngle,els.makerBackgroundScale,els.makerBackgroundX,els.makerBackgroundY,els.makerBackgroundRotation,els.makerPatternBg,els.makerPatternGradientA,els.makerPatternGradientB,els.makerPatternGradientAngle,els.makerPatternFg,els.makerPatternScale,els.makerPatternX,els.makerPatternY,els.makerPatternLineWidth,els.makerPatternSize,els.makerPatternGap,els.makerPatternRotation,els.makerPatternRotationMin,els.makerPatternRotationMax].filter(Boolean).forEach(el=>el.addEventListener('input',scheduleMakerGenerate));els.makerBackgroundFit.addEventListener('change',()=>{updateMakerUi();generateMaker();});[els.makerPatternKind,els.makerPatternBackgroundType,els.makerPatternLineStyle,els.makerPatternLayout,els.makerPatternOrder,els.makerPatternRotationMode].filter(Boolean).forEach(el=>el.addEventListener('change',()=>{updateMakerUi();generateMaker();}));
  [els.makerSelWidth,els.makerSelRotation,els.makerSelX,els.makerSelY,els.makerOutlineColor,els.makerOutlineWidth,els.makerOuterGlowColor,els.makerOuterGlowOpacity,els.makerOuterGlowSize,els.makerOuterGlowSpread,els.makerInnerGlowColor,els.makerInnerGlowOpacity,els.makerInnerGlowSize,els.makerInnerGlowSpread,els.makerShadowColor,els.makerShadowOpacity,els.makerShadowSize,els.makerShadowSpread,els.makerShadowX,els.makerShadowY].forEach(el=>el.addEventListener('input',updateMakerSelectedFromFields));
  [els.makerOutlineEnabled,els.makerOuterGlowEnabled,els.makerInnerGlowEnabled,els.makerShadowEnabled].forEach(el=>el.addEventListener('change',()=>{updateMakerSelectedFromFields();updateMakerUi();}));
  els.makerPngTransparentBtn.addEventListener('click',()=>{els.makerPngBackground.value='transparent';updateMakerUi();schedulePersist(0);});els.makerPngWhiteBtn.addEventListener('click',()=>{els.makerPngBackground.value='white';updateMakerUi();schedulePersist(0);});
  els.makerSendBackBtn.addEventListener('click',()=>moveItemLayer(state.makerItems,state.makerSelectedId,'back'));els.makerStepBackBtn.addEventListener('click',()=>moveItemLayer(state.makerItems,state.makerSelectedId,'step-back'));els.makerStepFrontBtn.addEventListener('click',()=>moveItemLayer(state.makerItems,state.makerSelectedId,'step-front'));els.makerBringFrontBtn.addEventListener('click',()=>moveItemLayer(state.makerItems,state.makerSelectedId,'front'));els.makerApplyEffectsAllBtn?.addEventListener('click',applySelectedMakerEffectsToAll);els.makerDeleteBtn.addEventListener('click',()=>{state.makerItems=state.makerItems.filter(v=>v.id!==state.makerSelectedId);els.makerCount.textContent=`${state.makerItems.length}개`;selectMaker(null);generateMaker();});
  document.querySelectorAll('.align-action').forEach(btn=>btn.addEventListener('click',()=>alignItemsToBoard('sticker',btn.dataset.align)));
  document.querySelectorAll('.maker-align-action').forEach(btn=>btn.addEventListener('click',()=>alignItemsToBoard('maker',btn.dataset.align)));
  els.exportPngBtn.addEventListener('click',exportPng);
  els.exportJpgBtn.addEventListener('click',exportJpg);
  els.exportSvgBtn.addEventListener('click',exportSvg);
  els.exportAiBtn.addEventListener('click',exportAi);
  els.resetBtn.addEventListener('click',resetAll);
  document.querySelectorAll('.view-tab').forEach(btn=>btn.addEventListener('click',()=>{if(btn.classList.contains('hidden'))return;selectView(btn.dataset.view);drawPreview();}));
  els.zoomInBtn.addEventListener('click',()=>{state.zoom=clamp(state.zoom*1.2,.2,5);drawPreview();});
  els.zoomOutBtn.addEventListener('click',()=>{state.zoom=clamp(state.zoom/1.2,.2,5);drawPreview();});
  els.fitBtn.addEventListener('click',()=>{state.zoom=1;drawPreview();});
  els.previewBackground.addEventListener('change',()=>{applyPreviewBackground();drawPreview();});
  els.customBackground.addEventListener('input',()=>{applyPreviewBackground();drawPreview();});
  els.processingQuality.addEventListener('change',()=>{if(state.mode==='acrylic')generateAcrylic();else if(state.mode==='sticker')generateSticker();else generateMaker();});

  function hitHole(point){
    if(!state.result)return null;
    for(let i=state.holes.length-1;i>=0;i--){
      const hole=state.holes[i],pos=draftHolePixel(hole),spec=getHoleSpec(state.result.ppm,hole,false),hitR=(hole.draftMode==='external'?spec.outerR:spec.innerR)+8;
      if(pos&&Math.hypot(point.xPx-pos.x,point.yPx-pos.y)<=hitR)return hole;
    }
    return null;
  }

  els.canvas.addEventListener('pointerdown',ev=>{
    if(ev.cancelable)ev.preventDefault();if(!state.result)return;const p=boardPointFromEvent(ev);if(!p)return;
    if(state.mode==='acrylic'){const hole=hitHole(p);if(hole){state.dragging={type:'hole-pending',id:hole.id,startClientX:ev.clientX,startClientY:ev.clientY,pointerId:ev.pointerId};els.canvas.setPointerCapture(ev.pointerId);return;}if(state.selectedHoleIds.length)clearHoleSelection();return;}
    if(state.mode==='sticker'&&state.splitPreview){const hit=hitSplitPreviewItem(p);if(hit){selectSplitPreviewItem(hit.id,{additive:true});return;}state.dragging={type:'split-marquee-pending',start:p,current:p,startClientX:ev.clientX,startClientY:ev.clientY,pointerId:ev.pointerId,additive:ev.shiftKey||ev.ctrlKey||ev.metaKey||state.multiSelectMode};els.canvas.setPointerCapture(ev.pointerId);return;}
    const items=state.mode==='maker'?state.makerItems:state.stickers,primary=items.find(v=>v.id===(state.mode==='maker'?state.makerSelectedId:state.selectedId)),handle=hitTransformHandle(p,primary);
    if(handle&&primary){const dist=Math.hypot(p.xMm-primary.xMm,p.yMm-primary.yMm),angle=Math.atan2(p.yMm-primary.yMm,p.xMm-primary.xMm);state.dragging={type:handle.type,id:primary.id,startWidth:primary.widthMm,startRotation:primary.rotation,startDist:Math.max(.001,dist),startAngle:angle,pointerId:ev.pointerId};els.canvas.setPointerCapture(ev.pointerId);return;}
    const hit=hitItem(p,items);
    if(hit){
      let ids,pendingIndividualDeselect=null;
      if(state.mode==='maker'){selectMaker(hit.id);ids=[hit.id];}
      else if(state.groupEditIds.includes(hit.id)){ids=movementIdsForSticker(hit);pendingIndividualDeselect=hit.id;}
      else if(state.groupEditIds.length&&hit.groupId===state.groupEditGroupId){state.dragging={type:'group-edit-candidate',id:hit.id,pointerId:ev.pointerId};els.canvas.setPointerCapture(ev.pointerId);return;}
      else{selectSticker(hit.id,{additive:ev.shiftKey||ev.ctrlKey||ev.metaKey});ids=movementIdsForSticker(hit);}
      const starts=ids.map(id=>{const v=items.find(q=>q.id===id);return v?{id,x:v.xMm,y:v.yMm}:null;}).filter(Boolean);
      state.dragging={type:'item-move',mode:state.mode,start:p,starts,pointerId:ev.pointerId,pendingIndividualDeselect,moved:false};els.canvas.setPointerCapture(ev.pointerId);return;
    }
    if(state.mode==='sticker'){state.dragging={type:'marquee-pending',start:p,current:p,startClientX:ev.clientX,startClientY:ev.clientY,pointerId:ev.pointerId,additive:ev.shiftKey||ev.ctrlKey||ev.metaKey||state.multiSelectMode};els.canvas.setPointerCapture(ev.pointerId);}else selectMaker(null);
  });
  els.canvas.addEventListener('dblclick',ev=>{
    if(state.mode!=='sticker'||state.splitPreview||!state.result)return;const p=boardPointFromEvent(ev);if(!p)return;const hit=hitSticker(p);if(!hit?.groupId)return;ev.preventDefault();state.dragging=null;toggleGroupMemberEdit(hit.id);queueHistoryCheckpoint(0);
  });
  let lastTouchTap={time:0,id:null};
  els.canvas.addEventListener('pointerup',ev=>{
    if(ev.pointerType!=='touch'||state.mode!=='sticker'||state.splitPreview||!state.result)return;const p=boardPointFromEvent(ev),hit=p?hitSticker(p):null,now=Date.now();
    if(hit?.groupId&&lastTouchTap.id===hit.id&&now-lastTouchTap.time<360){toggleGroupMemberEdit(hit.id);lastTouchTap={time:0,id:null};}else lastTouchTap={time:now,id:hit?.id||null};
  });
  els.canvas.addEventListener('pointermove',ev=>{
    if(ev.cancelable)ev.preventDefault();if(!state.dragging||!state.result)return;const p=boardPointFromEvent(ev);if(!p)return;
    if(state.dragging.type==='hole-pending'&&state.mode==='acrylic'){if(Math.hypot(ev.clientX-state.dragging.startClientX,ev.clientY-state.dragging.startClientY)<4)return;setPrimaryHole(state.dragging.id);state.dragging.type='hole';els.canvas.classList.add('hole-dragging');updateHoleUi();drawPreview();}
    if(state.dragging.type==='hole'&&state.mode==='acrylic'){const r=state.result,hole=state.holes.find(item=>item.id===state.dragging.id);if(!hole)return;const spec=getHoleSpec(r.ppm,hole,false),pos=resolveHolePosition(r.constraintMask,r.widthPx,r.heightPx,r.pad,r.ppm,hole.draftMode,(p.xPx-r.pad)/r.ppm,(p.yPx-r.pad)/r.ppm,spec,r.insideDistance,r.boundaryPoints,r.constraintBounds);hole.draftXmm=(pos.x-r.pad)/r.ppm;hole.draftYmm=(pos.y-r.pad)/r.ppm;updateHoleDirtyFlag(hole);updateHoleUi();drawPreview();return;}
    if(state.dragging.type==='split-marquee-pending'){if(Math.hypot(ev.clientX-state.dragging.startClientX,ev.clientY-state.dragging.startClientY)>5)state.dragging.type='split-marquee';state.dragging.current=p;drawPreview();return;}
    if(state.dragging.type==='split-marquee'){state.dragging.current=p;drawPreview();return;}
    const items=state.mode==='maker'?state.makerItems:state.stickers,item=items.find(v=>v.id===state.dragging.id);
    if(state.dragging.type==='item-move'){const dx=p.xMm-state.dragging.start.xMm,dy=p.yMm-state.dragging.start.yMm;if(Math.hypot(dx,dy)>.12)state.dragging.moved=true;for(const st of state.dragging.starts){const v=items.find(q=>q.id===st.id);if(v){v.xMm=st.x+dx;v.yMm=st.y+dy;}}if(state.mode==='maker')updateMakerUi();else syncStickerSelectionUi();drawPreview();return;}
    if(state.dragging.type==='resize'&&item){const dist=Math.hypot(p.xMm-item.xMm,p.yMm-item.yMm);item.widthMm=clamp(state.dragging.startWidth*dist/state.dragging.startDist,2,500);state.mode==='maker'?updateMakerUi():syncStickerSelectionUi();drawPreview();return;}
    if(state.dragging.type==='rotate'&&item){const angle=Math.atan2(p.yMm-item.yMm,p.xMm-item.xMm);item.rotation=state.dragging.startRotation+(angle-state.dragging.startAngle)*180/Math.PI;state.mode==='maker'?updateMakerUi():syncStickerSelectionUi();drawPreview();return;}
    if(state.dragging.type==='marquee-pending'){if(Math.hypot(ev.clientX-state.dragging.startClientX,ev.clientY-state.dragging.startClientY)>5)state.dragging.type='marquee';state.dragging.current=p;drawPreview();return;}
    if(state.dragging.type==='marquee'){state.dragging.current=p;drawPreview();}
  });
  const endDrag=()=>{if(!state.dragging)return;const ended=state.dragging;state.dragging=null;els.canvas.classList.remove('hole-dragging');
    if(ended.type==='hole-pending')toggleHoleSelection(ended.id);
    if(ended.type==='split-marquee-pending')selectSplitPreviewItem(null);
    if(ended.type==='split-marquee'&&state.splitPreview){const x1=Math.min(ended.start.xMm,ended.current.xMm),x2=Math.max(ended.start.xMm,ended.current.xMm),y1=Math.min(ended.start.yMm,ended.current.yMm),y2=Math.max(ended.start.yMm,ended.current.yMm),ids=state.splitPreview.items.filter(v=>{const b=itemCutBoundsMm(v,'sticker');return b.maxX>=x1&&b.minX<=x2&&b.maxY>=y1&&b.minY<=y2;}).map(v=>v.id),base=ended.additive?new Set(state.splitPreview.selectedIds||[]):new Set();ids.forEach(id=>base.add(id));state.splitPreview.selectedIds=[...base];syncStickerSelectionUi();drawPreview();}
    if(ended.type==='marquee-pending')selectSticker(null);
    if(ended.type==='marquee'){const x1=Math.min(ended.start.xMm,ended.current.xMm),x2=Math.max(ended.start.xMm,ended.current.xMm),y1=Math.min(ended.start.yMm,ended.current.yMm),y2=Math.max(ended.start.yMm,ended.current.yMm),ids=state.stickers.filter(v=>{const b=itemCutBoundsMm(v,'sticker');return b.maxX>=x1&&b.minX<=x2&&b.maxY>=y1&&b.minY<=y2;}).flatMap(v=>stickerGroupIds(v)),base=ended.additive?new Set(state.selectedStickerIds):new Set();ids.forEach(id=>base.add(id));clearGroupMemberEdit();state.selectedStickerIds=[...base];state.selectedId=state.selectedStickerIds.at(-1)||null;syncStickerSelectionUi();drawPreview();}
    if(ended.type==='item-move'&&ended.pendingIndividualDeselect&&!ended.moved)deselectGroupMember(ended.pendingIndividualDeselect);
    if(ended.type==='hole')checkpointHistory();
    if(['item-move','resize','rotate'].includes(ended.type)){state.mode==='maker'?scheduleMakerGenerate():scheduleStickerGenerate();if(ended.moved||ended.type!=='item-move')checkpointHistory();}schedulePersist(0);};
  els.canvas.addEventListener('pointerup',endDrag);els.canvas.addEventListener('pointercancel',()=>{state.dragging=null;els.canvas.classList.remove('hole-dragging');});
  for(const dz of document.querySelectorAll('.dropzone')){dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('dragover');});dz.addEventListener('dragleave',()=>dz.classList.remove('dragover'));dz.addEventListener('drop',async e=>{e.preventDefault();dz.classList.remove('dragover');const files=[...e.dataTransfer.files].filter(f=>f.type.startsWith('image/'));if(!files.length)return;if(dz.htmlFor==='singleFileInput')await handleAcrylicFile(files[0]);else if(dz.htmlFor==='makerFileInput')await addMakerFiles(files);else await addStickerFiles(files);});}
  document.addEventListener('input', event => {
    if (event.target.matches('input:not([type="file"]), select')) { schedulePersist(); queueHistoryCheckpoint(); }
  });
  document.addEventListener('change', event => {
    if (event.target.matches('input:not([type="file"]), select')) { schedulePersist(); queueHistoryCheckpoint(120); }
  });
  document.addEventListener('click', event => {
    const button=event.target.closest('button');if(button){schedulePersist();if(!['undoBtn','redoBtn'].includes(button.id))queueHistoryCheckpoint(180);}
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveWorkspaceMetaNow();
  });
  window.addEventListener('pagehide', () => { saveWorkspaceMetaNow(); });

  function rgbToHsv(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;let h=0;if(d){if(max===r)h=((g-b)/d)%6;else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60;if(h<0)h+=360;}return{h,s:max?d/max:0,v:max};}
  function hsvToRgb(h,s,v){const c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c;let a=[0,0,0];if(h<60)a=[c,x,0];else if(h<120)a=[x,c,0];else if(h<180)a=[0,c,x];else if(h<240)a=[0,x,c];else if(h<300)a=[x,0,c];else a=[c,0,x];return{r:Math.round((a[0]+m)*255),g:Math.round((a[1]+m)*255),b:Math.round((a[2]+m)*255)};}
  let colorPickerState=null;
  function buildColorPicker(){
    if(colorPickerState)return colorPickerState;const pop=document.createElement('div');pop.className='color-picker-popover hidden';pop.innerHTML=`<canvas class="color-sv" width="260" height="170" aria-label="채도와 밝기"></canvas><div class="color-slider-label"><span>색상</span><input class="color-hue" type="range" min="0" max="360" step="1"></div><div class="color-slider-label"><span>투명도</span><input class="color-alpha" type="range" min="0" max="100" step="1"></div><div class="color-picker-footer"><span class="color-preview"></span><input class="color-hex" type="text" maxlength="9" spellcheck="false"><button type="button" class="button secondary small color-close">완료</button></div>`;document.body.appendChild(pop);
    const canvas=pop.querySelector('.color-sv'),c=canvas.getContext('2d'),hue=pop.querySelector('.color-hue'),alpha=pop.querySelector('.color-alpha'),hex=pop.querySelector('.color-hex'),preview=pop.querySelector('.color-preview');const st={pop,canvas,c,hue,alpha,hex,preview,target:null,h:200,s:.5,v:.8,a:1};
    const draw=()=>{const rgb=hsvToRgb(st.h,1,1),base=`rgb(${rgb.r},${rgb.g},${rgb.b})`,g1=c.createLinearGradient(0,0,canvas.width,0);g1.addColorStop(0,'#fff');g1.addColorStop(1,base);c.fillStyle=g1;c.fillRect(0,0,canvas.width,canvas.height);const g2=c.createLinearGradient(0,0,0,canvas.height);g2.addColorStop(0,'rgba(0,0,0,0)');g2.addColorStop(1,'#000');c.fillStyle=g2;c.fillRect(0,0,canvas.width,canvas.height);c.strokeStyle=st.v>.55?'#1d2930':'#fff';c.lineWidth=3;c.beginPath();c.arc(st.s*canvas.width,(1-st.v)*canvas.height,7,0,Math.PI*2);c.stroke();const col={...hsvToRgb(st.h,st.s,st.v),a:st.a},opaque=`rgb(${col.r},${col.g},${col.b})`,value=colorToHex8(col);preview.style.backgroundColor=colorToCss(value);hex.value=value;hue.value=st.h;alpha.value=Math.round(st.a*100);alpha.style.backgroundImage=`linear-gradient(90deg,rgba(${col.r},${col.g},${col.b},0),${opaque}),linear-gradient(45deg,#d9d9d9 25%,transparent 25%),linear-gradient(-45deg,#d9d9d9 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#d9d9d9 75%),linear-gradient(-45deg,transparent 75%,#d9d9d9 75%)`;alpha.style.backgroundPosition='0 0,0 0,0 6px,6px -6px,-6px 0';alpha.style.backgroundSize='100% 100%,12px 12px,12px 12px,12px 12px,12px 12px';};
    const commit=()=>{if(!st.target)return;const value=colorToHex8({...hsvToRgb(st.h,st.s,st.v),a:st.a});st.target.value=value;const control=st.target._colorControl;if(control){control.querySelector('.color-swatch').style.backgroundColor=colorToCss(value);control.querySelector('.color-value').textContent=`${value.slice(0,7)} · ${Math.round(st.a*100)}%`;control.title=value;}st.target.dispatchEvent(new Event('input',{bubbles:true}));draw();};
    const pick=e=>{const rect=canvas.getBoundingClientRect(),x=clamp((e.clientX-rect.left)/rect.width,0,1),y=clamp((e.clientY-rect.top)/rect.height,0,1);st.s=x;st.v=1-y;commit();};
    canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);pick(e);});canvas.addEventListener('pointermove',e=>{if(canvas.hasPointerCapture(e.pointerId))pick(e);});hue.addEventListener('input',()=>{st.h=+hue.value;commit();});alpha.addEventListener('input',()=>{st.a=+alpha.value/100;commit();});hex.addEventListener('change',()=>{const col=parseColorValue(hex.value),hsv=rgbToHsv(col.r,col.g,col.b);Object.assign(st,hsv,{a:col.a});commit();});pop.querySelector('.color-close').addEventListener('click',()=>pop.classList.add('hidden'));document.addEventListener('pointerdown',e=>{if(!pop.classList.contains('hidden')&&!pop.contains(e.target)&&!e.target.closest('.color-control'))pop.classList.add('hidden');});st.draw=draw;colorPickerState=st;return st;
  }
  function openColorPicker(input,button){const st=buildColorPicker(),col=parseColorValue(input.value||input.getAttribute('value')),hsv=rgbToHsv(col.r,col.g,col.b);Object.assign(st,hsv,{a:col.a,target:input});st.draw();st.pop.classList.remove('hidden');const r=button.getBoundingClientRect(),pw=300,ph=300;st.pop.style.left=`${clamp(r.left,8,window.innerWidth-pw-8)}px`;st.pop.style.top=`${clamp(r.bottom+8,8,window.innerHeight-ph-8)}px`;}
  function upgradeColorInputs(){document.querySelectorAll('input[type="color"]').forEach(input=>{const raw=input.dataset.initialColor||input.getAttribute('value')||input.value||'#000000';input.type='text';input.value=colorToHex8(parseColorValue(raw));input.classList.add('color-source');input.hidden=true;const control=document.createElement('button');control.type='button';control.className='color-control';control.innerHTML='<span class="color-swatch"></span><span class="color-value"></span><span class="color-drop">⌄</span>';input.insertAdjacentElement('afterend',control);input._colorControl=control;control.addEventListener('click',()=>openColorPicker(input,control));});refreshColorControls();}
  function refreshColorControls(){document.querySelectorAll('.color-source').forEach(input=>{const col=parseColorValue(input.value),value=colorToHex8(col);input.value=value;const ctl=input._colorControl||input.nextElementSibling;if(ctl?.classList.contains('color-control')){ctl.querySelector('.color-swatch').style.backgroundColor=colorToCss(value);ctl.querySelector('.color-value').textContent=`${value.slice(0,7)} · ${Math.round(col.a*100)}%`;}});}
  function numericRangeFor(input){let min=Number(input.min),max=Number(input.max),v=Number(input.value)||0;if(!Number.isFinite(min)){if(/rotation/i.test(input.id))min=-360;else if(/(^|Sel)[XY]$|Shadow[XY]|Pattern[XY]|Background[XY]/i.test(input.id))min=-1000;else min=Math.min(0,v*2-100);}if(!Number.isFinite(max)){if(/rotation/i.test(input.id))max=360;else if(/(^|Sel)[XY]$|Shadow[XY]|Pattern[XY]|Background[XY]/i.test(input.id))max=1000;else max=Math.max(500,v*2+100);}return{min,max};}
  function upgradeNumericInputs(){document.querySelectorAll('input[type="number"]').forEach(input=>{if(input.dataset.sliderUpgraded)return;input.dataset.sliderUpgraded='1';const field=input.closest('.field')||input.parentElement;if(!field)return;field.classList.add('numeric-slider-host');const range=document.createElement('input'),wrap=document.createElement('div');wrap.className='numeric-slider-popover';range.type='range';const bounds=numericRangeFor(input);range.min=bounds.min;range.max=bounds.max;range.step=input.step&&input.step!=='any'?input.step:'0.1';range.value=clamp(Number(input.value)||0,bounds.min,bounds.max);wrap.appendChild(range);const target=input.closest('.input-with-unit')||input;target.insertAdjacentElement('afterend',wrap);const syncRange=()=>{const b=numericRangeFor(input);range.min=b.min;range.max=b.max;range.value=clamp(Number(input.value)||0,b.min,b.max);};input.addEventListener('focus',syncRange);input.addEventListener('input',syncRange);range.addEventListener('input',()=>{input.value=range.value;input.dispatchEvent(new Event('input',{bubbles:true}));});});}

  async function boot() {
    upgradeColorInputs();upgradeNumericInputs();
    setBusy(true);
    let restored=false;
    try{restored=await restoreWorkspace();}catch(error){console.warn('작업 복원을 건너뜁니다.',error);restored=false;}
    applyPreviewBackground();
    updateFinishStyleUi();
    updateFlatBaseUi();
    updateStickerBorderFillUi();
    updateStickerBackgroundUi();
    updateMakerUi();
    updateHoleUi();
    updateAcrylicSizeSummary();
    setMode(state.mode, { preserveZoom: true, skipGenerate: true });
    selectView(state.view);
    syncStickerSelectionUi();selectMaker(state.makerSelectedId);
    resizePreviewCanvas();

    if (state.mode === 'acrylic') {
      if (state.source) await generateAcrylic();
      else {
        state.result = null;
        setNotice('info','이미지를 추가해 주세요','투명 PNG를 올리면 그림, 화이트, 칼선, 재단여백 레이어를 생성합니다.');
        drawPreview();
        setBusy(false);
      }
    } else if(state.mode==='sticker') {
      await generateSticker();
    } else {
      await generateMaker();
    }
    if (restored) schedulePersist(900);
    checkpointHistory(true);
  }

  window.addEventListener('resize', resizePreviewCanvas);
  new ResizeObserver(resizePreviewCanvas).observe(els.stage);
  boot();
})();
