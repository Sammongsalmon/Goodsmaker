/* GOODSMAKER_BUILD 127-seam */
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
    acrylicCutSmooth: $('acrylicCutSmooth'), stickerCutSmooth: $('stickerCutSmooth'),
    colorSampleRadius: $('colorSampleRadius'), colorSampleField: $('colorSampleField'), acrylicNarrowGapField: $('acrylicNarrowGapField'), acrylicBorderlessNarrowGapField: $('acrylicBorderlessNarrowGapField'),
    includeHoles: $('includeHoles'), acrylicNarrowGapMm: $('acrylicNarrowGapMm'), acrylicBorderlessNarrowGapMm: $('acrylicBorderlessNarrowGapMm'), addFlatBase: $('addFlatBase'), flatBaseOptions: $('flatBaseOptions'),
    baseGapTransparentBtn: $('baseGapTransparentBtn'), baseGapFillBtn: $('baseGapFillBtn'), baseGapHelp: $('baseGapHelp'), generateBtn: $('generateBtn'),
    borderlessBaseOptions: $('borderlessBaseOptions'), baseSlopeKeepBtn: $('baseSlopeKeepBtn'), baseSlopeLevelBtn: $('baseSlopeLevelBtn'),
    baseSlopeHelp: $('baseSlopeHelp'), baseLiftField: $('baseLiftField'), baseLiftMm: $('baseLiftMm'), baseSlopeStatus: $('baseSlopeStatus'),
    baseSlopeManualBtn: $('baseSlopeManualBtn'), manualBaseFields: $('manualBaseFields'), manualBaseWidthMm: $('manualBaseWidthMm'), manualBaseOffsetMm: $('manualBaseOffsetMm'), manualBaseNote: $('manualBaseNote'),
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
    stickerAlphaThreshold: $('stickerAlphaThreshold'), stickerAlphaThresholdBordered: $('stickerAlphaThresholdBordered'), stickerIncludeHoles: $('stickerIncludeHoles'), stickerNarrowGapMm: $('stickerNarrowGapMm'), stickerBorderlessNarrowGapMm: $('stickerBorderlessNarrowGapMm'), stickerNarrowGapField: $('stickerNarrowGapField'), stickerBorderlessNarrowGapField: $('stickerBorderlessNarrowGapField'),
    stickerHoleNoneBtn: $('stickerHoleNoneBtn'), stickerHoleInternalBtn: $('stickerHoleInternalBtn'), stickerHoleExternalBtn: $('stickerHoleExternalBtn'), stickerHoleModeHelp: $('stickerHoleModeHelp'),
    stickerHoleOptions: $('stickerHoleOptions'), stickerHoleDiameter: $('stickerHoleDiameter'), stickerHoleWall: $('stickerHoleWall'), stickerHoleInset: $('stickerHoleInset'), stickerHoleExternalGap: $('stickerHoleExternalGap'), stickerHoleWallField: $('stickerHoleWallField'), stickerHoleInsetField: $('stickerHoleInsetField'), stickerHoleExternalGapField: $('stickerHoleExternalGapField'),
    stickerHolePositionStatus: $('stickerHolePositionStatus'), stickerResetHolePositionBtn: $('stickerResetHolePositionBtn'), stickerCenterHoleBtn: $('stickerCenterHoleBtn'), stickerAddHoleBtn: $('stickerAddHoleBtn'), stickerDeleteHoleBtn: $('stickerDeleteHoleBtn'), stickerApplyHolesBtn: $('stickerApplyHolesBtn'), stickerHoleList: $('stickerHoleList'), stickerHoleCountBadge: $('stickerHoleCountBadge'),
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
    stickerPatternFileLabel: $('stickerPatternFileLabel'), stickerPatternLineFields: $('stickerPatternLineFields'), stickerPatternParticleFields: $('stickerPatternParticleFields'), stickerPatternLineStyle: $('stickerPatternLineStyle'), stickerPatternLineWidth: $('stickerPatternLineWidth'), stickerPatternSize: $('stickerPatternSize'), stickerPatternGap: $('stickerPatternGap'), stickerPatternLayout: $('stickerPatternLayout'), stickerPatternBaseSizeField: $('stickerPatternBaseSizeField'), stickerPatternRandomizationFields: $('stickerPatternRandomizationFields'), stickerPatternSizeMode: $('stickerPatternSizeMode'), stickerPatternRandomSizeFields: $('stickerPatternRandomSizeFields'), stickerPatternSizeMin: $('stickerPatternSizeMin'), stickerPatternSizeMax: $('stickerPatternSizeMax'), stickerPatternPositionMode: $('stickerPatternPositionMode'), stickerPatternRandomPositionFields: $('stickerPatternRandomPositionFields'), stickerPatternDispersion: $('stickerPatternDispersion'), stickerPatternDensity: $('stickerPatternDensity'),
    stickerBackgroundGradientBtn: $('stickerBackgroundGradientBtn'), stickerBackgroundGradientFields: $('stickerBackgroundGradientFields'), stickerGradientColorA: $('stickerGradientColorA'), stickerGradientColorB: $('stickerGradientColorB'), stickerGradientAngle: $('stickerGradientAngle'),
    stickerPatternKind: $('stickerPatternKind'), stickerPatternTemplateColors: $('stickerPatternTemplateColors'), stickerPatternBackgroundType: $('stickerPatternBackgroundType'), stickerPatternSolidColorField: $('stickerPatternSolidColorField'), stickerPatternGradientFields: $('stickerPatternGradientFields'), stickerPatternGradientA: $('stickerPatternGradientA'), stickerPatternGradientB: $('stickerPatternGradientB'), stickerPatternGradientAngle: $('stickerPatternGradientAngle'), stickerPatternBgColor: $('stickerPatternBgColor'), stickerPatternFgColor: $('stickerPatternFgColor'), stickerPatternOrderField: $('stickerPatternOrderField'), stickerPatternOrder: $('stickerPatternOrder'), stickerPatternRotationMode: $('stickerPatternRotationMode'), stickerPatternFixedRotationFields: $('stickerPatternFixedRotationFields'), stickerPatternRandomRotationFields: $('stickerPatternRandomRotationFields'), stickerPatternRotation: $('stickerPatternRotation'), stickerPatternRotationMin: $('stickerPatternRotationMin'), stickerPatternRotationMax: $('stickerPatternRotationMax'),
    splitThresholdRange: $('splitThresholdRange'), splitThreshold: $('splitThreshold'), splitPreviewBtn: $('splitPreviewBtn'), splitApplyBtn: $('splitApplyBtn'), splitPreviewCount: $('splitPreviewCount'),
    multiSelectBtn: $('multiSelectBtn'), mergeObjectsBtn: $('mergeObjectsBtn'), ungroupObjectsBtn: $('ungroupObjectsBtn'), stickerSelectedCount: $('stickerSelectedCount'), mergeLayerPolicy: $('mergeLayerPolicy'), stickerAutoGap: $('stickerAutoGap'), autoArrangeStickerBtn: $('autoArrangeStickerBtn'), autoArrangeStatus: $('autoArrangeStatus'),
    generateStickerBtn: $('generateStickerBtn'), selectionEditor: $('selectionEditor'), selWidth: $('selWidth'), selRotation: $('selRotation'), selX: $('selX'), selY: $('selY'),
    sendBackBtn: $('sendBackBtn'), stepBackBtn: $('stepBackBtn'), stepFrontBtn: $('stepFrontBtn'), bringFrontBtn: $('bringFrontBtn'), copyStickerBtn: $('copyStickerBtn'), deleteStickerBtn: $('deleteStickerBtn'),
    makerFileInput: $('makerFileInput'), makerCount: $('makerCount'), makerWidth: $('makerWidth'), makerHeight: $('makerHeight'), makerCutMargin: $('makerCutMargin'),
    makerBgTransparentBtn: $('makerBgTransparentBtn'), makerBgColorBtn: $('makerBgColorBtn'), makerBgGradientBtn: $('makerBgGradientBtn'), makerBgImageBtn: $('makerBgImageBtn'), makerBgPatternBtn: $('makerBgPatternBtn'),
    makerBgColorField: $('makerBgColorField'), makerBgColor: $('makerBgColor'), makerBgGradientFields: $('makerBgGradientFields'), makerGradientA: $('makerGradientA'), makerGradientB: $('makerGradientB'), makerGradientAngle: $('makerGradientAngle'),
    makerBgImageFields: $('makerBgImageFields'), makerBackgroundFile: $('makerBackgroundFile'), makerBackgroundStatus: $('makerBackgroundStatus'), makerBackgroundFit: $('makerBackgroundFit'), makerBackgroundCustomFields: $('makerBackgroundCustomFields'), makerBackgroundScale: $('makerBackgroundScale'), makerBackgroundX: $('makerBackgroundX'), makerBackgroundY: $('makerBackgroundY'), makerBackgroundRotation: $('makerBackgroundRotation'), makerBackgroundRotateLeft: $('makerBackgroundRotateLeft'), makerBackgroundRotateRight: $('makerBackgroundRotateRight'),
    makerBgPatternFields: $('makerBgPatternFields'), makerPatternKind: $('makerPatternKind'), makerPatternBg: $('makerPatternBg'), makerPatternFg: $('makerPatternFg'), makerPatternFileLabel: $('makerPatternFileLabel'), makerPatternFile: $('makerPatternFile'), makerPatternStatus: $('makerPatternStatus'), makerPatternScale: $('makerPatternScale'), makerPatternX: $('makerPatternX'), makerPatternY: $('makerPatternY'),
    makerPatternLineFields: $('makerPatternLineFields'), makerPatternParticleFields: $('makerPatternParticleFields'), makerPatternLineStyle: $('makerPatternLineStyle'), makerPatternLineWidth: $('makerPatternLineWidth'), makerPatternSize: $('makerPatternSize'), makerPatternGap: $('makerPatternGap'), makerPatternLayout: $('makerPatternLayout'), makerPatternBaseSizeField: $('makerPatternBaseSizeField'), makerPatternRandomizationFields: $('makerPatternRandomizationFields'), makerPatternSizeMode: $('makerPatternSizeMode'), makerPatternRandomSizeFields: $('makerPatternRandomSizeFields'), makerPatternSizeMin: $('makerPatternSizeMin'), makerPatternSizeMax: $('makerPatternSizeMax'), makerPatternPositionMode: $('makerPatternPositionMode'), makerPatternRandomPositionFields: $('makerPatternRandomPositionFields'), makerPatternDispersion: $('makerPatternDispersion'), makerPatternDensity: $('makerPatternDensity'), makerPatternBackgroundType: $('makerPatternBackgroundType'), makerPatternSolidColorField: $('makerPatternSolidColorField'), makerPatternGradientFields: $('makerPatternGradientFields'), makerPatternGradientA: $('makerPatternGradientA'), makerPatternGradientB: $('makerPatternGradientB'), makerPatternGradientAngle: $('makerPatternGradientAngle'), makerPatternOrderField: $('makerPatternOrderField'), makerPatternOrder: $('makerPatternOrder'), makerPatternRotationMode: $('makerPatternRotationMode'), makerPatternFixedRotationFields: $('makerPatternFixedRotationFields'), makerPatternRandomRotationFields: $('makerPatternRandomRotationFields'), makerPatternRotation: $('makerPatternRotation'), makerPatternRotationMin: $('makerPatternRotationMin'), makerPatternRotationMax: $('makerPatternRotationMax'), makerPngBackground: $('makerPngBackground'), makerPngTransparentBtn: $('makerPngTransparentBtn'), makerPngWhiteBtn: $('makerPngWhiteBtn'),
    makerAddTextBtn: $('makerAddTextBtn'), makerAddShapeBtn: $('makerAddShapeBtn'), makerShapeDialog: $('makerShapeDialog'), fontCatalogStatus: $('fontCatalogStatus'), reloadFontsBtn: $('reloadFontsBtn'), runtimeFontInput: $('runtimeFontInput'), uploadRuntimeFontsBtn: $('uploadRuntimeFontsBtn'), clearRuntimeFontsBtn: $('clearRuntimeFontsBtn'), runtimeFontStatus: $('runtimeFontStatus'), runtimeFontList: $('runtimeFontList'),
    makerSelectionEditor: $('makerSelectionEditor'), makerSelWidth: $('makerSelWidth'), makerSelHeight: $('makerSelHeight'), makerSelRotation: $('makerSelRotation'), makerSelX: $('makerSelX'), makerSelY: $('makerSelY'), makerAspectMode: $('makerAspectMode'),
    makerObjectTypeEyebrow: $('makerObjectTypeEyebrow'), makerObjectTypeLabel: $('makerObjectTypeLabel'), makerLockBtn: $('makerLockBtn'),
    makerTextFields: $('makerTextFields'), makerTextContent: $('makerTextContent'), makerTextFont: $('makerTextFont'), makerTextWeight: $('makerTextWeight'), makerTextFontSize: $('makerTextFontSize'), makerTextLineHeight: $('makerTextLineHeight'), makerTextLetterSpacing: $('makerTextLetterSpacing'), makerTextAlign: $('makerTextAlign'), makerTextVerticalAlign: $('makerTextVerticalAlign'), makerTextBackgroundEnabled: $('makerTextBackgroundEnabled'), makerTextBackgroundFields: $('makerTextBackgroundFields'), makerTextBackgroundColor: $('makerTextBackgroundColor'), makerApplyTextBackgroundBtn: $('makerApplyTextBackgroundBtn'), makerApplyTextBackgroundAllBtn: $('makerApplyTextBackgroundAllBtn'), makerClearTextBackgroundBtn: $('makerClearTextBackgroundBtn'), makerTextBackgroundRangeList: $('makerTextBackgroundRangeList'),
    makerShapeFields: $('makerShapeFields'), makerShapeKind: $('makerShapeKind'), makerShapeGeometryFields: $('makerShapeGeometryFields'), makerCornerRadiusField: $('makerCornerRadiusField'), makerCornerRadius: $('makerCornerRadius'), makerShapeStrokeWidth: $('makerShapeStrokeWidth'), makerShapeStrokeColor: $('makerShapeStrokeColor'), makerLineFields: $('makerLineFields'), makerLineStyle: $('makerLineStyle'), makerLineWidth: $('makerLineWidth'), makerLineCap: $('makerLineCap'),
    makerFillFields: $('makerFillFields'), makerObjectFillType: $('makerObjectFillType'), makerObjectFillColorField: $('makerObjectFillColorField'), makerObjectFillColor: $('makerObjectFillColor'), makerObjectGradientFields: $('makerObjectGradientFields'), makerObjectGradientA: $('makerObjectGradientA'), makerObjectGradientB: $('makerObjectGradientB'), makerObjectGradientAngle: $('makerObjectGradientAngle'), makerObjectPatternFields: $('makerObjectPatternFields'), makerObjectPatternKind: $('makerObjectPatternKind'), makerObjectPatternColor: $('makerObjectPatternColor'), makerObjectPatternBackground: $('makerObjectPatternBackground'), makerObjectPatternSize: $('makerObjectPatternSize'), makerObjectPatternGap: $('makerObjectPatternGap'), makerObjectPatternRotation: $('makerObjectPatternRotation'),
    makerEffectAddType: $('makerEffectAddType'), makerAddEffectBtn: $('makerAddEffectBtn'), makerEffectList: $('makerEffectList'),
    makerMultiSelectBtn: $('makerMultiSelectBtn'), makerGroupBtn: $('makerGroupBtn'), makerUngroupBtn: $('makerUngroupBtn'), makerSelectedCount: $('makerSelectedCount'),
    makerSendBackBtn: $('makerSendBackBtn'), makerStepBackBtn: $('makerStepBackBtn'), makerStepFrontBtn: $('makerStepFrontBtn'), makerBringFrontBtn: $('makerBringFrontBtn'), copyMakerBtn: $('copyMakerBtn'), makerDeleteBtn: $('makerDeleteBtn'), makerApplyEffectsAllBtn: $('makerApplyEffectsAllBtn'), generateMakerBtn: $('generateMakerBtn'),
    themeToggleBtn: $('themeToggleBtn'), exportPngBtn: $('exportPngBtn'), exportJpgBtn: $('exportJpgBtn'), exportSvgBtn: $('exportSvgBtn'), exportPdfBtn: $('exportPdfBtn'), exportGuideBtn: $('exportGuideBtn'), exportAiBtn: $('exportAiBtn'),
    guideTemplateBox: $('guideTemplateBox'), guideFileInput: $('guideFileInput'), guideClearBtn: $('guideClearBtn'), guideSummary: $('guideSummary'), guideFields: $('guideFields'), guideLayerList: $('guideLayerList'), guideDropNotes: $('guideDropNotes'), guideDropNotesRow: $('guideDropNotesRow'),
    guidePageSelect: $('guidePageSelect'), guideCutSelect: $('guideCutSelect'), guideWhiteSelect: $('guideWhiteSelect'), guideArtSelect: $('guideArtSelect'), guideFitSelect: $('guideFitSelect'), guideMarginMm: $('guideMarginMm'), guideOffsetX: $('guideOffsetX'), guideOffsetY: $('guideOffsetY'), exportFileName: $('exportFileName'), resetBtn: $('resetBtn'),
    productionOptionsPanel: $('productionOptionsPanel'), cutSimplifyMm: $('cutSimplifyMm'), cutSlitFill: $('cutSlitFill'), autoSealOnLoad: $('autoSealOnLoad'), layerLegend: $('layerLegend'), exportLayerBox: $('exportLayerBox'), viewTabs: $('viewTabs'),
    exportBackground: $('exportBackground'), exportBackgroundRow: $('exportBackgroundRow'),
    exportArtwork: $('exportArtwork'), exportWhiteOpaque: $('exportWhiteOpaque'), exportWhite: $('exportWhite'), exportBleed: $('exportBleed'), exportCutline: $('exportCutline'), exportBleedRow: $('exportBleedRow'),
    exportWhiteOpaqueRow: $('exportWhiteOpaqueRow'), exportWhiteFullRow: $('exportWhiteFullRow'), exportWhiteFullLabel: $('exportWhiteFullLabel'),
    whiteOpaqueViewTab: $('whiteOpaqueViewTab'), whiteFullViewTab: $('whiteFullViewTab'), whiteLegend: $('whiteLegend'), whiteLegendLabel: $('whiteLegendLabel'),
    zoomOutBtn: $('zoomOutBtn'), zoomInBtn: $('zoomInBtn'), fitBtn: $('fitBtn'), oneToOneBtn: $('oneToOneBtn'), exportResBtn: $('exportResBtn'), zoomLabel: $('zoomLabel'), geometryMeta: $('geometryMeta'),
    processingQuality: $('processingQuality'), previewBackground: $('previewBackground'), customBackground: $('customBackground'), customBackgroundField: $('customBackgroundField'),
    bleedViewTab: $('bleedViewTab'), bleedLegend: $('bleedLegend'), backgroundViewTab: $('backgroundViewTab'), backgroundLegend: $('backgroundLegend')
  };

  const ctx = els.canvas.getContext('2d');
  const AUTO_CUT_SIMPLIFY_MM = 0.24;
  const AUTO_CUT_CURVE = 0.72;
  // 칼선을 다듬는 저역통과 창의 물리 크기(mm). 배경을 투명하게 만들면 알파
  // 임계값 때문에 경계가 픽셀 단위로 흔들리는데, 예전 값(0.20mm)은 그 잡음의
  // 두 배밖에 안 돼 걸러지지 않았다. 게다가 radius 상한이 7 이라 해상도가
  // 높을수록 창이 오히려 작아졌다(1200ppi 에서 0.156mm).
  // 0.5mm 는 70mm 대지 기준 0.7% 라 전체 곡률은 그대로 두면서 자잘한
  // 삐뚤빼뚤만 걷어낸다.
  const AUTO_CUT_SMOOTH_MM = 0.5;
  // 사용자가 직접 조정한다. 아크릴·스티커가 각자 값을 가지며, 0 이면 다듬기를 끈다.
  function cutSmoothMm(){
    const el = state.mode==='sticker' ? els.stickerCutSmooth : els.acrylicCutSmooth;
    return clamp(num(el, AUTO_CUT_SMOOTH_MM), 0, 2);
  }
  const AUTO_CUT_RESAMPLE_MM = 0.10;

  const state = {
    mode: 'acrylic',
    finishStyle: { acrylic: 'borderless', sticker: 'borderless' },
    baseGapMode: 'transparent',
    baseSupportMode: 'color',
    borderlessBaseLevel: false,
    // 'keep' 기울기 그대로 · 'level' 잘라서 수평 · 'manual' 직접 지정 (v76)
    // borderlessBaseLevel 은 이 값의 거울이다. 옛 저장본과 기존 코드가 그대로
    // 돌아가도록 남겨 뒀고, 둘은 setBorderlessBaseMode 에서만 같이 바뀐다.
    borderlessBaseMode: 'keep',
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
    makerSelectedIds: [],
    makerMultiSelectMode: false,
    makerBackgroundType: 'transparent',
    makerBackgroundImage: null,
    makerPatternImage: null,
    makerPatternImages: [],
    fontCatalog: [],
    runtimeFonts: [],
    fontsLoaded: false,
    view: 'composite',
    zoom: 1,
    panX: 0,
    panY: 0,
    result: null,
    dragging: null,
    generationToken: 0,
    previewBackground: 'checker',
    holeCreateMode: 'internal',
    holes: [],
    selectedHoleId: null,
    selectedHoleIds: [],
    stickerHoleCreateMode: 'internal',
    stickerHoles: [],
    selectedStickerHoleId: null,
    selectedStickerHoleIds: []
  };

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function num(el, fallback = 0) { const v = Number(el?.value); return Number.isFinite(v) ? v : fallback; }
  function uid() { return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`; }
  function makeHoleRecord(mode = 'internal', overrides = {}) {
    return {
      id: overrides.id || uid(),
      ownerId: overrides.ownerId || null,
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
  async function downloadBlob(blob, name) {
    if (!(blob instanceof Blob) || blob.size <= 0) throw new Error('내보낼 파일 데이터가 비어 있습니다.');
    await validateExportBlob(blob, name);
    let capacitorNative = false;
    try { capacitorNative = !!window.Capacitor?.isNativePlatform?.(); } catch (_) {}
    try {
      if (window.GoodsMakerNative?.saveBlob) {
        const handled = await window.GoodsMakerNative.saveBlob(blob, name);
        if (handled) return;
      }
      // v50.17 — 여기 있던 window.__nativeDownloadBlob 분기는 file:// 셸 전용이었고,
      // 그 브리지(native_bridge.js)는 Capacitor 빌드에서 스스로 즉시 물러나므로
      // 실제로 한 번도 실행되지 않았다. 파일과 함께 걷어냈다.
      if (capacitorNative) throw new Error('Android 저장 플러그인을 찾지 못했습니다. 앱을 다시 빌드해 주세요.');
    } catch (error) {
      if (capacitorNative) throw error;
      console.warn('네이티브 저장을 사용할 수 없어 브라우저 다운로드로 전환합니다.', error);
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 120000);
  }

  function dataUrlToBlob(dataUrl) {
    const match = String(dataUrl || '').match(/^data:([^;,]+)?(?:;base64)?,([\s\S]*)$/);
    if (!match) throw new Error('캔버스 데이터를 변환하지 못했습니다.');
    const mime = match[1] || 'application/octet-stream';
    const encoded = match[2] || '';
    const binary = String(dataUrl).includes(';base64,') ? atob(encoded) : decodeURIComponent(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], {type:mime});
  }

  function canvasToBlobReliable(canvas, type='image/png', quality) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = blob => {
        if (settled) return;
        settled = true;
        if (blob instanceof Blob && blob.size) return resolve(blob);
        try { resolve(dataUrlToBlob(canvas.toDataURL(type, quality))); }
        catch (error) { reject(error); }
      };
      try {
        if (typeof canvas.toBlob === 'function') {
          canvas.toBlob(finish, type, quality);
          setTimeout(() => finish(null), 12000);
        } else finish(null);
      } catch (error) {
        try { finish(null); }
        catch (_) { reject(error); }
      }
    });
  }
  function bytesEqual(bytes, expected) {
    if (bytes.length < expected.length) return false;
    for (let index = 0; index < expected.length; index++) if (bytes[index] !== expected[index]) return false;
    return true;
  }

  async function blobSliceBytes(blob, start, end) {
    return new Uint8Array(await blob.slice(start, end).arrayBuffer());
  }

  async function validateExportBlob(blob, name) {
    const lower = String(name || '').toLowerCase();
    const head = await blobSliceBytes(blob, 0, Math.min(blob.size, 16));
    if (lower.endsWith('.png')) {
      if (!bytesEqual(head, [0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])) throw new Error('PNG 파일 머리글이 올바르지 않습니다.');
      const tail = await blobSliceBytes(blob, Math.max(0, blob.size - 20), blob.size);
      const text = String.fromCharCode(...tail);
      if (!text.includes('IEND')) throw new Error('PNG 파일 끝부분이 완성되지 않았습니다.');
      return true;
    }
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
      if (!bytesEqual(head, [0xff,0xd8,0xff])) throw new Error('JPG 파일 머리글이 올바르지 않습니다.');
      const tail = await blobSliceBytes(blob, Math.max(0, blob.size - 2), blob.size);
      if (tail[0] !== 0xff || tail[1] !== 0xd9) throw new Error('JPG 파일 끝부분이 완성되지 않았습니다.');
      return true;
    }
    if (lower.endsWith('.svg')) {
      const text = await blob.text();
      if (!/^\uFEFF?\s*<\?xml\b/.test(text) || !/<svg\b/.test(text) || !/<\/svg>\s*$/.test(text)) {
        throw new Error('SVG 문서 구조가 완성되지 않았습니다.');
      }
      if (typeof DOMParser === 'function' && text.length <= 48 * 1024 * 1024) {
        const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
        if (doc.querySelector('parsererror')) throw new Error('SVG XML 구문을 확인해 주세요.');
      }
      return true;
    }
    if (lower.endsWith('.ai') || lower.endsWith('.pdf')) {
      const header = new TextDecoder('latin1').decode(head);
      if (!header.startsWith('%PDF-')) throw new Error('AI 호환 PDF 머리글이 올바르지 않습니다.');
      const tailStart = Math.max(0, blob.size - 96 * 1024);
      const tailText = new TextDecoder('latin1').decode(await blobSliceBytes(blob, tailStart, blob.size));
      const match = tailText.match(/startxref\s+(\d+)\s+%%EOF\s*$/);
      if (!match) throw new Error('AI 호환 PDF의 색인 또는 끝 표시가 없습니다.');
      const xrefOffset = Number(match[1]);
      if (!Number.isFinite(xrefOffset) || xrefOffset < 0 || xrefOffset >= blob.size) throw new Error('AI 호환 PDF 색인 위치가 잘못되었습니다.');
      const xref = new TextDecoder('latin1').decode(await blobSliceBytes(blob, xrefOffset, Math.min(blob.size, xrefOffset + 4)));
      if (xref !== 'xref') throw new Error('AI 호환 PDF 색인을 읽지 못했습니다.');
      return true;
    }
    return true;
  }

  function utf8Blob(text, type) {
    return new Blob([new TextEncoder().encode(String(text))], { type });
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


  const SYSTEM_FONT_CATALOG = [
    { family:'system-ui', label:'시스템 기본', weight:'100 900', source:'system' },
    { family:'sans-serif', label:'기본 고딕', weight:'100 900', source:'system' },
    { family:'serif', label:'기본 명조', weight:'100 900', source:'system' },
    { family:'monospace', label:'고정폭', weight:'100 900', source:'system' }
  ];
  function fontFormatHint(url=''){
    const ext=String(url).split('?')[0].split('.').pop().toLowerCase();
    return ({woff2:'woff2',woff:'woff',ttf:'truetype',otf:'opentype'})[ext]||'';
  }
  function renderRuntimeFontList(fonts=state.runtimeFonts){
    if(!els.runtimeFontList)return;
    const installed=fonts.filter(font=>font.source==='runtime');
    const failed=fonts.filter(font=>font.source==='runtime-error');
    if(!installed.length&&!failed.length){
      els.runtimeFontList.innerHTML='<p class="runtime-font-empty">기기에 추가한 폰트가 없습니다. <b>＋ 폰트 추가</b>로 TTF·OTF 파일을 올리면 글상자에서 바로 고를 수 있습니다.</p>';
      return;
    }
    els.runtimeFontList.innerHTML=[...installed,...failed].map(font=>`<div class="runtime-font-item"><div><strong>${escapeXml(font.fullName||font.label||font.family||font.fileName||'사용자 폰트')}</strong><span>${escapeXml(font.fileName||font.family||'')} · ${font.loadError?'로드 실패':font.metadataFallback?'파일명으로 표시':'내부 이름 인식'}</span></div><button type="button" class="text-button danger-text" data-runtime-font-delete="${escapeXml(font.id||'')}">삭제</button></div>`).join('');
  }
  async function loadRepositoryFonts(force=false){
    if(state.fontsLoaded&&!force)return state.fontCatalog;
    const selected=els.makerTextFont?.value||'system-ui';
    const catalog=[...SYSTEM_FONT_CATALOG];
    try{
      const response=await fetch(`assets/fonts/fonts.json${force?`?t=${Date.now()}`:''}`,{cache:force?'no-store':'default'});
      if(response.ok){
        const manifest=await response.json();
        const entries=Array.isArray(manifest)?manifest:(manifest.fonts||[]);
        const repositoryFonts=entries.map(entry=>{
          if(!entry?.url||!entry?.family)return null;
          const source=`url(${JSON.stringify(entry.url)})${fontFormatHint(entry.url)?` format('${fontFormatHint(entry.url)}')`:''}`;
          try{
            const face=new FontFace(entry.family,source,{style:entry.style||'normal',weight:String(entry.weight||'400'),display:'swap'});
            document.fonts.add(face);
            return {family:entry.family,label:entry.fullName||entry.label||entry.family,weight:entry.weight||'400',style:entry.style||'normal',source:'repository',postscriptName:entry.postscriptName||''};
          }catch(error){console.warn(`폰트 등록 실패: ${entry.family}`,error);return null;}
        });
        catalog.push(...repositoryFonts.filter(Boolean));
      }
    }catch(error){console.warn('저장소 폰트 목록을 불러오지 못했습니다.',error);}
    let runtimeFonts=[];
    try{runtimeFonts=await window.GoodsMakerFonts?.loadAll?.()||[];catalog.push(...runtimeFonts.filter(font=>font.source==='runtime'));}
    catch(error){console.warn('기기 폰트 목록을 불러오지 못했습니다.',error);}
    state.runtimeFonts=runtimeFonts;
    renderRuntimeFontList(runtimeFonts);
    const unique=[];const seen=new Set();for(const font of catalog){const key=`${font.family}|${font.style||'normal'}|${font.weight||'400'}`;if(!seen.has(key)){seen.add(key);unique.push(font);}}
    state.fontCatalog=unique;state.fontsLoaded=true;
    if(els.makerTextFont){
      const families=[];const familySeen=new Set();for(const font of unique){if(!familySeen.has(font.family)){familySeen.add(font.family);families.push(font);}}
      els.makerTextFont.innerHTML=families.map(font=>`<option value="${escapeXml(font.family)}">${escapeXml(font.label||font.family)}${font.source==='runtime'?' · 기기':''}</option>`).join('');
      els.makerTextFont.value=families.some(font=>font.family===selected)?selected:'system-ui';
    }
    const repoCount=unique.filter(v=>v.source==='repository').length,runtimeCount=unique.filter(v=>v.source==='runtime').length;
    if(els.fontCatalogStatus)els.fontCatalogStatus.textContent=`저장소 ${repoCount}종 · 기기 ${runtimeCount}종 · 시스템 폰트 사용 가능`;
    if(els.runtimeFontStatus)els.runtimeFontStatus.textContent=runtimeCount?`이 기기에 저장된 폰트 ${runtimeCount}종을 앱과 웹에서 사용할 수 있습니다.`:'TTF·OTF·WOFF·WOFF2를 이 기기에 추가할 수 있습니다.';
    return unique;
  }
  async function ensureMakerFontsLoaded(items=state.makerItems){
    if(!state.fontsLoaded)await loadRepositoryFonts();
    const requests=[];
    for(const item of items){if(makerObjectType(item)!=='text')continue;const style=normalizeTextStyle(item.textStyle);requests.push(document.fonts.load(`${style.fontWeight||400} 32px "${String(style.fontFamily||'system-ui').replaceAll('"','\\"')}"`,style.text||item.text||'가'));}
    if(requests.length)await Promise.allSettled(requests);
  }

  function makerObjectType(item){return item?.type||'image';}
  function defaultFillSpec(){return{type:'color',color:'#263746ff',gradientA:'#58c9edff',gradientB:'#9d7cf4ff',gradientAngle:135,patternKind:'dots',patternColor:'#ffffffff',patternBackground:'#4fb6dbff',patternSizeMm:3,patternGapMm:2,patternRotation:0};}
  function normalizeFillSpec(value){const d=defaultFillSpec(),v=value||{};return{...d,...v,type:['color','gradient','pattern'].includes(v.type)?v.type:d.type};}
  function defaultTextStyle(){return{text:'텍스트',fontFamily:'system-ui',fontWeight:400,fontSizeMm:8,lineHeight:1.2,letterSpacingMm:0,align:'center',verticalAlign:'middle',fill:defaultFillSpec(),background:{enabled:false,color:'#fff3a8dd',ranges:[]}};}
  function normalizeTextStyle(value){const d=defaultTextStyle(),v=value||{},background=v.background||{};return{...d,...v,text:String(v.text??d.text),fontFamily:v.fontFamily||d.fontFamily,fontWeight:clamp(Number(v.fontWeight)||400,100,900),fontSizeMm:clamp(Number(v.fontSizeMm)||d.fontSizeMm,.5,200),lineHeight:clamp(Number(v.lineHeight)||d.lineHeight,.5,4),letterSpacingMm:clamp(Number(v.letterSpacingMm)||0,-5,20),align:['left','center','right'].includes(v.align)?v.align:d.align,verticalAlign:['top','middle','bottom'].includes(v.verticalAlign)?v.verticalAlign:d.verticalAlign,fill:normalizeFillSpec(v.fill),background:{enabled:!!background.enabled,color:background.color||d.background.color,ranges:Array.isArray(background.ranges)?background.ranges.map(r=>({start:Math.max(0,Number(r.start)||0),end:Math.max(0,Number(r.end)||0),color:r.color||background.color||d.background.color})).filter(r=>r.end>r.start):[]}};}
  function defaultShapeStyle(kind='rect'){return{kind,cornerRadius:20,strokeWidthMm:0,strokeColor:'#29343dff',lineStyle:'solid',lineWidthMm:2,lineCap:'round',fill:defaultFillSpec()};}
  function normalizeShapeStyle(value){const d=defaultShapeStyle(value?.kind||'rect'),v=value||{};return{...d,...v,kind:['rect','ellipse','star5','sparkle4','sparkle8','heart','line'].includes(v.kind)?v.kind:d.kind,cornerRadius:clamp(Number(v.cornerRadius)||0,0,100),strokeWidthMm:clamp(Number(v.strokeWidthMm)||0,0,50),lineStyle:['solid','dashed','dotted','dashdot','double'].includes(v.lineStyle)?v.lineStyle:'solid',lineWidthMm:clamp(Number(v.lineWidthMm)||2,.2,50),lineCap:['round','butt','square'].includes(v.lineCap)?v.lineCap:'round',fill:normalizeFillSpec(v.fill)};}
  function makerItemSizeMm(item){
    if(!item)return{width:1,height:1};
    const width=clamp(Number(item.widthMm)||1,.1,2000),type=makerObjectType(item);
    if(type==='image'){
      if(item.aspectMode==='free'&&Number(item.heightMm)>0)return{width,height:clamp(Number(item.heightMm),.1,2000)};
      const nw=Math.max(1,Number(item.naturalWidth)||item.img?.naturalWidth||1),nh=Math.max(1,Number(item.naturalHeight)||item.img?.naturalHeight||1);return{width,height:width*nh/nw};
    }
    return{width,height:clamp(Number(item.heightMm)||width,.1,2000)};
  }
  function makerItemHeightMm(item){return makerItemSizeMm(item).height;}
  function makeMakerImageItem(record,overrides={}){return{...record,id:overrides.id||uid(),type:'image',widthMm:overrides.widthMm||30,heightMm:overrides.heightMm||null,aspectMode:overrides.aspectMode||'locked',rotation:overrides.rotation||0,xMm:overrides.xMm||50,yMm:overrides.yMm||50,groupId:overrides.groupId||null,locked:!!overrides.locked,effects:normalizeMakerEffects(overrides.effects),...overrides};}
  function makeMakerTextItem(overrides={}){return{id:overrides.id||uid(),type:'text',name:overrides.name||'글상자',widthMm:overrides.widthMm||42,heightMm:overrides.heightMm||20,aspectMode:'free',rotation:overrides.rotation||0,xMm:overrides.xMm||50,yMm:overrides.yMm||50,groupId:overrides.groupId||null,locked:!!overrides.locked,textStyle:normalizeTextStyle(overrides.textStyle),effects:normalizeMakerEffects(overrides.effects),...overrides};}
  function makeMakerShapeItem(kind='rect',overrides={}){const line=kind==='line';return{id:overrides.id||uid(),type:'shape',name:overrides.name||(line?'선':'도형'),widthMm:overrides.widthMm||(line?42:28),heightMm:overrides.heightMm||(line?8:28),aspectMode:'free',rotation:overrides.rotation||0,xMm:overrides.xMm||50,yMm:overrides.yMm||50,groupId:overrides.groupId||null,locked:!!overrides.locked,shapeStyle:normalizeShapeStyle({...overrides.shapeStyle,kind}),effects:normalizeMakerEffects(overrides.effects),...overrides};}

  const WORKSPACE_DB_NAME = 'acrylic-production-manager';
  const WORKSPACE_STORE = 'workspace';
  const RUNTIME_FONT_STORE = 'runtimeFonts';
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
      const request = indexedDB.open(WORKSPACE_DB_NAME, 2);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(WORKSPACE_STORE)) db.createObjectStore(WORKSPACE_STORE);
        if (!db.objectStoreNames.contains(RUNTIME_FONT_STORE)) db.createObjectStore(RUNTIME_FONT_STORE, { keyPath: 'id' });
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
  function snapshotMakerItem(item){
    const type=makerObjectType(item),base={id:item.id,type,name:item.name||type,widthMm:Number(item.widthMm)||30,heightMm:Number(item.heightMm)||null,aspectMode:item.aspectMode||'locked',rotation:Number(item.rotation)||0,xMm:Number(item.xMm)||0,yMm:Number(item.yMm)||0,groupId:item.groupId||null,locked:!!item.locked,effects:normalizeMakerEffects(item.effects)};
    if(type==='image')return{...snapshotImageRecord(item),...base};
    if(type==='text')return{...base,textStyle:normalizeTextStyle(item.textStyle)};
    return{...base,shapeStyle:normalizeShapeStyle(item.shapeStyle)};
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
        borderlessBaseMode: state.borderlessBaseMode,
        stickerBorderFill: state.stickerBorderFill,
        stickerBackgroundType: state.stickerBackgroundType,
        selectedId: state.selectedId,
        selectedStickerIds: [...state.selectedStickerIds],
        groupEditIds: [...state.groupEditIds],
        groupEditGroupId: state.groupEditGroupId,
        multiSelectMode: state.multiSelectMode,
        makerSelectedId: state.makerSelectedId,
        makerSelectedIds: [...state.makerSelectedIds],
        makerMultiSelectMode: state.makerMultiSelectMode,
        makerBackgroundType: state.makerBackgroundType,
        view: state.view,
        zoom: state.zoom,
        panX: state.panX,
        panY: state.panY,
        previewBackground: state.previewBackground,
        holeCreateMode: state.holeCreateMode,
        selectedHoleId: state.selectedHoleId,
        selectedHoleIds: [...state.selectedHoleIds],
        holes: state.holes.map(hole => ({ ...hole })),
        stickerHoleCreateMode: state.stickerHoleCreateMode,
        selectedStickerHoleId: state.selectedStickerHoleId,
        selectedStickerHoleIds: [...state.selectedStickerHoleIds],
        stickerHoles: state.stickerHoles.map(hole => ({ ...hole })),
        bgLassos: (state.bgLassos || []).map(l => ({ id: l.id, points: l.points.map(pt => ({ ...pt })) })),
        sealPoints: {
          acrylic: (state.sealPoints?.acrylic || []).map(point => ({ ...point })),
          sticker: (state.sealPoints?.sticker || []).map(point => ({ ...point })),
          bg: (state.sealPoints?.bg || []).map(point => ({ ...point }))
        },
        cutBridges: {
          acrylic: (state.cutBridges?.acrylic || []).map(b => ({ ...b, a: { ...b.a }, b: { ...b.b } })),
          sticker: (state.cutBridges?.sticker || []).map(b => ({ ...b, a: { ...b.a }, b: { ...b.b } }))
        }
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
      makerItems: state.makerItems.map(snapshotMakerItem),
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
      // 옛 저장본에는 mode 가 없다. 그때의 불리언에서 옮겨 온다.
      state.borderlessBaseMode = ['keep', 'level', 'manual'].includes(restoredState.borderlessBaseMode)
        ? restoredState.borderlessBaseMode
        : (restoredState.borderlessBaseLevel ? 'level' : 'keep');
      state.borderlessBaseLevel = state.borderlessBaseMode === 'level';
      state.stickerBorderFill = restoredState.stickerBorderFill === 'white' ? 'white' : 'transparent';
      state.stickerBackgroundType = ['gradient','image','pattern'].includes(restoredState.stickerBackgroundType) ? restoredState.stickerBackgroundType : 'color';
      state.selectedId = restoredState.selectedId || null;
      state.selectedStickerIds = Array.isArray(restoredState.selectedStickerIds) ? restoredState.selectedStickerIds : (state.selectedId?[state.selectedId]:[]);
      state.groupEditIds = Array.isArray(restoredState.groupEditIds) ? restoredState.groupEditIds : [];
      state.groupEditGroupId = restoredState.groupEditGroupId || null;
      state.multiSelectMode = !!restoredState.multiSelectMode;
      state.makerSelectedId = restoredState.makerSelectedId || null;
      state.makerSelectedIds = Array.isArray(restoredState.makerSelectedIds) ? restoredState.makerSelectedIds : (state.makerSelectedId?[state.makerSelectedId]:[]);
      state.makerMultiSelectMode = !!restoredState.makerMultiSelectMode;
      state.makerBackgroundType = ['transparent','color','gradient','image','pattern'].includes(restoredState.makerBackgroundType) ? restoredState.makerBackgroundType : 'transparent';
      const restoredView = restoredState.view === 'white' ? 'white-full' : restoredState.view;
      state.view = ['composite', 'background', 'original', 'white-opaque', 'white-full', 'bleed', 'cutline'].includes(restoredView) ? restoredView : 'composite';
      state.zoom = clamp(Number(restoredState.zoom) || 1, .2, 5);
      state.panX = Number.isFinite(Number(restoredState.panX)) ? Number(restoredState.panX) : 0;
      state.panY = Number.isFinite(Number(restoredState.panY)) ? Number(restoredState.panY) : 0;
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
      state.stickerHoleCreateMode = restoredState.stickerHoleCreateMode === 'external' ? 'external' : 'internal';
      state.stickerHoles = (Array.isArray(restoredState.stickerHoles) ? restoredState.stickerHoles : []).map(normalizeHoleRecord);
      state.bgLassos = (Array.isArray(restoredState.bgLassos) ? restoredState.bgLassos : [])
        .map(l => ({ id: l.id, points: (Array.isArray(l.points) ? l.points : []).map(pt => ({ ...pt })) }))
        .filter(l => l.points.length >= 3);
      state.sealPoints = {
        acrylic: (Array.isArray(restoredState.sealPoints?.acrylic) ? restoredState.sealPoints.acrylic : []).map(point => ({ ...point })),
        sticker: (Array.isArray(restoredState.sealPoints?.sticker) ? restoredState.sealPoints.sticker : []).map(point => ({ ...point })),
        // v76 이전 저장본에는 bg 가 없다. 그때는 아크릴 칼선용 목록을 함께
        // 썼지만, 그 지점들은 칼선을 닫으려고 찍은 것이라 배경 지우기 벽으로는
        // 자리가 맞지 않는다. 비워 두고 새로 찍게 한다.
        bg: (Array.isArray(restoredState.sealPoints?.bg) ? restoredState.sealPoints.bg : []).map(point => ({ ...point }))
      };
      state.cutBridges = {
        acrylic: (Array.isArray(restoredState.cutBridges?.acrylic) ? restoredState.cutBridges.acrylic : []).map(b => ({ ...b, a: { ...b.a }, b: { ...b.b } })),
        sticker: (Array.isArray(restoredState.cutBridges?.sticker) ? restoredState.cutBridges.sticker : []).map(b => ({ ...b, a: { ...b.a }, b: { ...b.b } }))
      };
      const restoredStickerHoleSelection = Array.isArray(restoredState.selectedStickerHoleIds) ? restoredState.selectedStickerHoleIds : [];
      state.selectedStickerHoleIds = restoredStickerHoleSelection.filter(id => state.stickerHoles.some(h => h.id === id));
      state.selectedStickerHoleId = state.selectedStickerHoleIds.includes(restoredState.selectedStickerHoleId) ? restoredState.selectedStickerHoleId : (state.selectedStickerHoleIds.at(-1) || null);

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
          const type=item.type||'image',common={id:item.id||uid(),widthMm:Number(item.widthMm)||30,heightMm:Number(item.heightMm)||null,aspectMode:item.aspectMode||'locked',rotation:Number(item.rotation)||0,xMm:Number(item.xMm)||0,yMm:Number(item.yMm)||0,groupId:item.groupId||null,locked:!!item.locked,effects:normalizeMakerEffects(item.effects)};
          if(type==='text')return makeMakerTextItem({...common,name:item.name||'글상자',textStyle:normalizeTextStyle(item.textStyle)});
          if(type==='shape')return makeMakerShapeItem(item.shapeStyle?.kind||'rect',{...common,name:item.name||'도형',shapeStyle:normalizeShapeStyle(item.shapeStyle)});
          const record=await imageRecordFromSnapshot(item); if(!record)return null;
          return makeMakerImageItem(record,{...common,name:item.name||record.name});
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
      state.makerSelectedIds = state.makerSelectedIds.filter(id=>state.makerItems.some(item=>item.id===id));
      if (!state.makerItems.some(item=>item.id===state.makerSelectedId)) state.makerSelectedId=state.makerSelectedIds.at(-1)||null;
      if(state.makerSelectedId&&!state.makerSelectedIds.includes(state.makerSelectedId))state.makerSelectedIds.push(state.makerSelectedId);

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
    if(item.textStyle)copy.textStyle=normalizeTextStyle(JSON.parse(JSON.stringify(item.textStyle)));
    if(item.shapeStyle)copy.shapeStyle=normalizeShapeStyle(JSON.parse(JSON.stringify(item.shapeStyle)));
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
        mode:state.mode,finishStyle:{...state.finishStyle},baseGapMode:state.baseGapMode,baseSupportMode:state.baseSupportMode,borderlessBaseLevel:state.borderlessBaseLevel,borderlessBaseMode:state.borderlessBaseMode,
        stickerBorderFill:state.stickerBorderFill,stickerBackgroundType:state.stickerBackgroundType,selectedId:state.selectedId,selectedStickerIds:[...state.selectedStickerIds],
        groupEditIds:[...state.groupEditIds],groupEditGroupId:state.groupEditGroupId,multiSelectMode:state.multiSelectMode,splitPreview:cloneHistorySplitPreview(state.splitPreview),
        makerSelectedId:state.makerSelectedId,makerSelectedIds:[...state.makerSelectedIds],makerMultiSelectMode:state.makerMultiSelectMode,makerBackgroundType:state.makerBackgroundType,view:state.view,zoom:state.zoom,panX:state.panX,panY:state.panY,previewBackground:state.previewBackground,
        holeCreateMode:state.holeCreateMode,holes:state.holes.map(v=>({...v})),selectedHoleId:state.selectedHoleId,selectedHoleIds:[...state.selectedHoleIds],stickerHoleCreateMode:state.stickerHoleCreateMode,stickerHoles:state.stickerHoles.map(v=>({...v})),selectedStickerHoleId:state.selectedStickerHoleId,selectedStickerHoleIds:[...state.selectedStickerHoleIds],
        sealPoints:{acrylic:(state.sealPoints?.acrylic||[]).map(v=>({...v})),sticker:(state.sealPoints?.sticker||[]).map(v=>({...v})),bg:(state.sealPoints?.bg||[]).map(v=>({...v}))},
        cutBridges:{acrylic:(state.cutBridges?.acrylic||[]).map(v=>({...v,a:{...v.a},b:{...v.b}})),sticker:(state.cutBridges?.sticker||[]).map(v=>({...v,a:{...v.a},b:{...v.b}}))},
        bgLassos:(state.bgLassos||[]).map(l=>({id:l.id,points:l.points.map(pt=>({...pt}))}))
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
    const simpleItem=item=>item?{id:item.id,type:makerObjectType(item),name:item.name,widthMm:+item.widthMm||0,heightMm:+item.heightMm||0,aspectMode:item.aspectMode||'locked',rotation:+item.rotation||0,xMm:+item.xMm||0,yMm:+item.yMm||0,groupId:item.groupId||null,locked:!!item.locked,splitBridgeMm:+item.splitBridgeMm||0,effects:item.effects||null,textStyle:item.textStyle||null,shapeStyle:item.shapeStyle||null}:null;
    return JSON.stringify({ui,state:{finishStyle:st.finishStyle,baseGapMode:st.baseGapMode,baseSupportMode:st.baseSupportMode,borderlessBaseLevel:st.borderlessBaseLevel,borderlessBaseMode:st.borderlessBaseMode,stickerBorderFill:st.stickerBorderFill,stickerBackgroundType:st.stickerBackgroundType,makerBackgroundType:st.makerBackgroundType,holes:st.holes,stickerHoles:st.stickerHoles,sealPoints:st.sealPoints,cutBridges:st.cutBridges,splitPreview:st.splitPreview?{sourceId:st.splitPreview.sourceId,thresholdMm:st.splitPreview.thresholdMm,items:st.splitPreview.items.map(simpleItem)}:null},source:snapshot.source?.name||null,stickers:snapshot.stickers.map(simpleItem),makerItems:snapshot.makerItems.map(simpleItem),stickerBg:snapshot.stickerBackgroundImage?.name||null,stickerPatterns:snapshot.stickerPatternImages.map(v=>v?.name||''),makerBg:snapshot.makerBackgroundImage?.name||null,makerPatterns:snapshot.makerPatternImages.map(v=>v?.name||'')});
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
      state.mode=st.mode;state.finishStyle={...st.finishStyle};state.baseGapMode=st.baseGapMode;state.baseSupportMode=st.baseSupportMode;state.borderlessBaseMode=['keep','level','manual'].includes(st.borderlessBaseMode)?st.borderlessBaseMode:(st.borderlessBaseLevel?'level':'keep');state.borderlessBaseLevel=state.borderlessBaseMode==='level';
      state.stickerBorderFill=st.stickerBorderFill;state.stickerBackgroundType=st.stickerBackgroundType;state.selectedId=st.selectedId;state.selectedStickerIds=[...(st.selectedStickerIds||[])];
      state.groupEditIds=[...(st.groupEditIds||[])];state.groupEditGroupId=st.groupEditGroupId||null;state.multiSelectMode=!!st.multiSelectMode;state.splitPreview=cloneHistorySplitPreview(st.splitPreview);
      state.makerSelectedId=st.makerSelectedId;state.makerSelectedIds=[...(st.makerSelectedIds||[])];state.makerMultiSelectMode=!!st.makerMultiSelectMode;state.makerBackgroundType=st.makerBackgroundType;state.view=st.view;state.zoom=st.zoom;state.panX=Number(st.panX)||0;state.panY=Number(st.panY)||0;state.previewBackground=st.previewBackground;
      state.sealPoints={acrylic:(st.sealPoints?.acrylic||[]).map(v=>({...v})),sticker:(st.sealPoints?.sticker||[]).map(v=>({...v})),bg:(st.sealPoints?.bg||[]).map(v=>({...v}))};
      state.cutBridges={acrylic:(st.cutBridges?.acrylic||[]).map(v=>({...v,a:{...v.a},b:{...v.b}})),sticker:(st.cutBridges?.sticker||[]).map(v=>({...v,a:{...v.a},b:{...v.b}}))};
      state.holeCreateMode=st.holeCreateMode;state.holes=(st.holes||[]).map(v=>({...v}));state.selectedHoleId=st.selectedHoleId;state.selectedHoleIds=[...(st.selectedHoleIds||[])];state.stickerHoleCreateMode=st.stickerHoleCreateMode||'internal';state.stickerHoles=(st.stickerHoles||[]).map(v=>({...v}));state.selectedStickerHoleId=st.selectedStickerHoleId||null;state.selectedStickerHoleIds=[...(st.selectedStickerHoleIds||[])];
      state.source=snapshot.source;state.stickers=snapshot.stickers.map(cloneHistoryItem);state.makerItems=snapshot.makerItems.map(cloneHistoryItem);
      state.stickerBackgroundImage=snapshot.stickerBackgroundImage;state.stickerPatternImage=snapshot.stickerPatternImage;state.stickerPatternImages=[...snapshot.stickerPatternImages];
      state.makerBackgroundImage=snapshot.makerBackgroundImage;state.makerPatternImage=snapshot.makerPatternImage;state.makerPatternImages=[...snapshot.makerPatternImages];state.result=null;
      els.imageStatus.textContent=state.source?.name||'이미지 필요';els.stickerCount.textContent=`${state.stickers.length}개`;els.makerCount.textContent=`${state.makerItems.length}개`;
      els.stickerBackgroundStatus.textContent=state.stickerBackgroundImage?.name||'선택된 이미지 없음';els.stickerPatternStatus.textContent=state.stickerPatternImages.length?`${state.stickerPatternImages.length}개 이미지`:'선택된 패턴 없음';
      els.makerBackgroundStatus.textContent=state.makerBackgroundImage?.name||'선택된 이미지 없음';els.makerPatternStatus.textContent=state.makerPatternImages.length?`${state.makerPatternImages.length}개 이미지`:'선택된 패턴 없음';
      refreshColorControls();applyPreviewBackground();updateFinishStyleUi();updateStickerBackgroundUi();updateMakerUi();updateHoleUi();updateStickerHoleUi();updateSealUi();updateBridgeUi();refreshBgBlocks();syncStickerSelectionUi();setMode(state.mode,{preserveZoom:true,skipGenerate:true});selectView(state.view);resizePreviewCanvas();
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
    if (!options.preserveZoom) { state.zoom = 1; state.panX = 0; state.panY = 0; }
    for(const [btn,key] of [[els.acrylicModeBtn,'acrylic'],[els.stickerModeBtn,'sticker'],[els.makerModeBtn,'maker']]){
      btn.classList.toggle('active',state.mode===key);btn.setAttribute('aria-selected',String(state.mode===key));
    }
    els.acrylicControls.classList.toggle('hidden', state.mode !== 'acrylic');
    els.stickerControls.classList.toggle('hidden', state.mode !== 'sticker');
    els.makerControls.classList.toggle('hidden', state.mode !== 'maker');
    window.GoodsMakerLayout?.setMode?.(state.mode);
    updateFinishStyleUi();updateMakerUi();updateStickerHoleUi();updateModeSpecificUi();
    if (!options.skipGenerate) {
      if (state.mode === 'acrylic') generateAcrylic(); else if(state.mode==='sticker') generateSticker(); else generateMaker();
    }
    schedulePersist();
  }

  function updateModeSpecificUi(){
    const maker=state.mode==='maker';
    els.exportPngBtn.textContent=maker?'PNG 내보내기':'선택 레이어 PNG';
    els.exportJpgBtn?.classList.toggle('hidden',!maker);
    els.exportSvgBtn.classList.toggle('hidden',maker);els.exportPdfBtn?.classList.toggle('hidden',maker);els.exportGuideBtn?.classList.toggle('hidden',maker);els.exportAiBtn.classList.toggle('hidden',maker);
    els.exportLayerBox?.classList.toggle('hidden',maker);els.layerLegend?.classList.toggle('hidden',maker);
    els.guideTemplateBox?.classList.toggle('hidden',maker);
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

  // 내보낼 때는 withPrintExportResult 가 이 값을 350dpi 로 올려 generateAcrylic
  // 을 통째로 다시 돌린다. 미리보기 쪽 ppm 은 clamp(...,2.2,12) 로 상한이 12 라
  // **정밀 품질로도 내보내기 해상도에 못 닿는다** — 그래서 화면의 칼선과 파일의
  // 칼선이 실제로 달랐다(실측: 같은 단순화 설정에서 미리보기 102개 · 내보내기
  // 92개 고정점). 사용자: "미리보기랑 실제 칼선이 다르다는 거였어."
  //
  // "출력 해상도로 보기" 는 같은 값을 미리보기에도 걸어 두는 것뿐이다. 계산
  // 경로가 하나이므로 화면에 뜬 것이 곧 파일이다.
  let printExportPpmOverride = null;

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

  function setBorderlessBaseMode(mode) {
    state.borderlessBaseMode = ['keep', 'level', 'manual'].includes(mode) ? mode : 'keep';
    state.borderlessBaseLevel = state.borderlessBaseMode === 'level';
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
    if (type !== 'transparent') els.stickerBackgroundEnabled.checked = true;
    revealBackgroundInPreview();
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
      els.holeList.innerHTML='<p class="hole-list-empty">추가된 타공이 없습니다. 위 <b>＋ 타공 하나 추가</b>를 누르면 첫 구멍이 놓입니다.</p>';
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


  function selectedStickerOwnerId(){return state.stickers.some(item=>item.id===state.selectedId)?state.selectedId:null;}
  function stickerHolesForOwner(ownerId=selectedStickerOwnerId()){return ownerId?state.stickerHoles.filter(hole=>hole.ownerId===ownerId):[];}
  function ensureStickerHoleOwners(){
    const fallback=selectedStickerOwnerId()||state.stickers[0]?.id||null;
    for(const hole of state.stickerHoles)if(!hole.ownerId&&fallback)hole.ownerId=fallback;
    const validOwners=new Set(state.stickers.map(item=>item.id));
    state.stickerHoles=state.stickerHoles.filter(hole=>hole.ownerId&&validOwners.has(hole.ownerId));
  }
  function stickerHoleConstraint(hole,r=state.result){
    if(!hole||!r||r.mode!=='sticker')return null;
    const record=(r.stickerCutRecords||[]).find(entry=>entry.ownerId===hole.ownerId);
    if(!record?.constraintMask)return null;
    return record;
  }
  function moveOwnedStickerHoles(ownerIds,dx,dy){
    const ids=new Set(ownerIds||[]);if(!ids.size||(!dx&&!dy))return;
    for(const hole of state.stickerHoles){if(!ids.has(hole.ownerId))continue;for(const prefix of ['draft','applied']){const x=hole[`${prefix}Xmm`],y=hole[`${prefix}Ymm`];if(Number.isFinite(x))hole[`${prefix}Xmm`]=x+dx;if(Number.isFinite(y))hole[`${prefix}Ymm`]=y+dy;}hole.dirty=holeIsDirty(hole);}
  }
  function snapshotOwnedStickerHoles(ownerId){return stickerHolesForOwner(ownerId).map(hole=>({id:hole.id,draftXmm:hole.draftXmm,draftYmm:hole.draftYmm,appliedXmm:hole.appliedXmm,appliedYmm:hole.appliedYmm}));}
  function transformOwnedStickerHoles(drag,item,scale=1,angleDelta=0){
    if(!drag?.holeStarts?.length||!item)return;const ca=Math.cos(angleDelta),sa=Math.sin(angleDelta),cx=drag.ownerStartX,cy=drag.ownerStartY;
    for(const start of drag.holeStarts){const hole=state.stickerHoles.find(h=>h.id===start.id);if(!hole)continue;for(const prefix of ['draft','applied']){const x=start[`${prefix}Xmm`],y=start[`${prefix}Ymm`];if(!Number.isFinite(x)||!Number.isFinite(y))continue;const dx=(x-cx)*scale,dy=(y-cy)*scale;hole[`${prefix}Xmm`]=item.xMm+dx*ca-dy*sa;hole[`${prefix}Ymm`]=item.yMm+dx*sa+dy*ca;}hole.dirty=holeIsDirty(hole);}
  }

  function normalizeStickerHoleSelection() {
    ensureStickerHoleOwners();
    const valid=new Set(stickerHolesForOwner().map(h=>h.id));
    state.selectedStickerHoleIds=[...new Set(Array.isArray(state.selectedStickerHoleIds)?state.selectedStickerHoleIds:[])].filter(id=>valid.has(id));
    if(!valid.has(state.selectedStickerHoleId)||!state.selectedStickerHoleIds.includes(state.selectedStickerHoleId))state.selectedStickerHoleId=state.selectedStickerHoleIds.at(-1)||null;
  }
  function isStickerHoleSelected(id){return !!id&&Array.isArray(state.selectedStickerHoleIds)&&state.selectedStickerHoleIds.includes(id);}
  function getSelectedStickerHole(){normalizeStickerHoleSelection();return stickerHolesForOwner().find(h=>h.id===state.selectedStickerHoleId)||null;}
  function syncStickerHoleFieldsFromSelected(){
    const hole=getSelectedStickerHole();if(!hole)return;
    els.stickerHoleDiameter.value=Number(hole.draftDiameterMm).toFixed(1);
    els.stickerHoleWall.value=Number(hole.draftWallMm).toFixed(1);
    els.stickerHoleInset.value=Number(hole.draftInsetMm).toFixed(1);
    els.stickerHoleExternalGap.value=Number(hole.draftExternalGapMm??.4).toFixed(1);
  }
  function renderStickerHoleList(){
    normalizeStickerHoleSelection();
    const holes=stickerHolesForOwner();
    els.stickerHoleCountBadge.textContent=`${holes.length}개`;
    if(!selectedStickerOwnerId()){els.stickerHoleList.innerHTML='<p class="hole-list-empty">먼저 스티커 개체를 선택하세요.</p>';return;}
    if(!holes.length){els.stickerHoleList.innerHTML='<p class="hole-list-empty">선택한 개체에 추가된 타공이 없습니다. 대지에서 개체를 고른 뒤 <b>＋ 선택 개체에 타공 추가</b>를 눌러 주세요.</p>';return;}
    els.stickerHoleList.innerHTML=holes.map((hole,index)=>{
      const mode=hole.draftMode==='external'?'외부':'내부',status=holeIsDirty(hole)?'미적용':'적용됨',selected=isStickerHoleSelected(hole.id),primary=hole.id===state.selectedStickerHoleId;
      const gapText=hole.draftMode==='external'?` · 간격 ${Number(hole.draftExternalGapMm??.4).toFixed(1)} mm`:'';
      return `<div class="hole-list-item${selected?' active':''}${primary?' primary':''}"><button class="hole-select-button" type="button" data-sticker-hole-id="${hole.id}" aria-pressed="${selected}"><strong>${index+1}. ${mode} 타공 · Ø ${hole.draftDiameterMm.toFixed(1)} mm${gapText}</strong><span>${status} · ${selected?'선택됨 · 다시 클릭하면 해제':'클릭해서 수정 활성화'}</span></button><button class="hole-list-remove" type="button" data-remove-sticker-hole-id="${hole.id}" aria-label="${index+1}번 타공 삭제">×</button></div>`;
    }).join('');
    els.stickerHoleList.querySelectorAll('[data-sticker-hole-id]').forEach(button=>button.addEventListener('click',()=>toggleStickerHoleSelection(button.dataset.stickerHoleId)));
    els.stickerHoleList.querySelectorAll('[data-remove-sticker-hole-id]').forEach(button=>button.addEventListener('click',()=>removeStickerHole(button.dataset.removeStickerHoleId)));
  }
  function setPrimaryStickerHole(id){
    if(!stickerHolesForOwner().some(h=>h.id===id))return null;
    if(!isStickerHoleSelected(id))state.selectedStickerHoleIds.push(id);
    state.selectedStickerHoleId=id;
    const hole=getSelectedStickerHole();state.stickerHoleCreateMode=hole.draftMode;syncStickerHoleFieldsFromSelected();return hole;
  }
  function toggleStickerHoleSelection(id){
    if(!stickerHolesForOwner().some(h=>h.id===id))return;
    if(isStickerHoleSelected(id)){state.selectedStickerHoleIds=state.selectedStickerHoleIds.filter(item=>item!==id);if(state.selectedStickerHoleId===id)state.selectedStickerHoleId=state.selectedStickerHoleIds.at(-1)||null;}
    else setPrimaryStickerHole(id);
    normalizeStickerHoleSelection();if(getSelectedStickerHole())syncStickerHoleFieldsFromSelected();updateStickerHoleUi();drawPreview();schedulePersist(0);
  }
  function clearStickerHoleSelection(){state.selectedStickerHoleIds=[];state.selectedStickerHoleId=null;updateStickerHoleUi();drawPreview();}
  function ensureDraftStickerHolePosition(hole=getSelectedStickerHole(),forceDefault=false,silent=false){
    const r=state.result, constraint=stickerHoleConstraint(hole,r);if(!r||r.mode!=='sticker'||!hole||!constraint)return;
    const spec=getHoleSpec(r.ppm,hole,false),mode=hole.draftMode,b=constraint.constraintBounds;let xMm=forceDefault?null:(hole.draftXmm-constraint.left/r.ppm),yMm=forceDefault?null:(hole.draftYmm-constraint.top/r.ppm);
    if(forceDefault){const peers=stickerHolesForOwner(hole.ownerId).filter(h=>h.draftMode===mode),index=Math.max(0,peers.indexOf(hole)),spacing=Math.max(spec.outerR*2.15,6*r.ppm),slot=index===0?0:(index%2?Math.ceil(index/2):-Math.ceil(index/2)),px=clamp(b.cx+slot*spacing,b.minX,b.maxX),py=mode==='internal'?b.minY+spec.innerR+spec.insetPx:b.minY-spec.innerR-spec.externalGapPx;xMm=px/r.ppm;yMm=py/r.ppm;}
    const pos=resolveHolePosition(constraint.constraintMask,constraint.widthPx,constraint.heightPx,0,r.ppm,mode,xMm,yMm,spec,constraint.insideDistance,constraint.boundaryPoints,b);hole.draftXmm=(pos.x+constraint.left)/r.ppm;hole.draftYmm=(pos.y+constraint.top)/r.ppm;hole.dirty=holeIsDirty(hole);if(!silent){updateStickerHoleUi();drawPreview();}
  }
  function ensureAllDraftStickerHolePositions(){for(const hole of stickerHolesForOwner())if(!Number.isFinite(hole.draftXmm)||!Number.isFinite(hole.draftYmm))ensureDraftStickerHolePosition(hole,true,true);updateStickerHoleUi();}
  function draftStickerHolePixel(hole,r=state.result){if(!r||!hole||!Number.isFinite(hole.draftXmm)||!Number.isFinite(hole.draftYmm))return null;return{x:hole.draftXmm*r.ppm,y:hole.draftYmm*r.ppm};}
  function centerSelectedStickerHoles(){
    const r=state.result;if(!r||r.mode!=='sticker')return;normalizeStickerHoleSelection();const selected=stickerHolesForOwner().filter(h=>isStickerHoleSelected(h.id));if(!selected.length)return;
    const constraint=stickerHoleConstraint(selected[0],r);if(!constraint)return;const positions=selected.map(hole=>({hole,pos:draftStickerHolePixel(hole,r)})).filter(item=>item.pos);if(!positions.length)return;
    const ownerCenterX=(constraint.left+constraint.constraintBounds.cx),groupCenterX=(Math.min(...positions.map(item=>item.pos.x))+Math.max(...positions.map(item=>item.pos.x)))/2,shiftX=ownerCenterX-groupCenterX;
    for(const {hole,pos} of positions){const c=stickerHoleConstraint(hole,r);if(!c)continue;const spec=getHoleSpec(r.ppm,hole,false),snapped=resolveHolePosition(c.constraintMask,c.widthPx,c.heightPx,0,r.ppm,hole.draftMode,(pos.x+shiftX-c.left)/r.ppm,(pos.y-c.top)/r.ppm,spec,c.insideDistance,c.boundaryPoints,c.constraintBounds);hole.draftXmm=(snapped.x+c.left)/r.ppm;hole.draftYmm=(snapped.y+c.top)/r.ppm;hole.dirty=holeIsDirty(hole);}
    updateStickerHoleUi();drawPreview();schedulePersist(0);
  }
  function markStickerHoleDirty(reposition=false){
    const hole=getSelectedStickerHole();if(!hole){updateStickerHoleUi();return;}
    hole.draftDiameterMm=clamp(num(els.stickerHoleDiameter,3),1.5,12);hole.draftWallMm=clamp(num(els.stickerHoleWall,1.5),.6,8);hole.draftInsetMm=clamp(num(els.stickerHoleInset,2.5),.5,15);hole.draftExternalGapMm=clamp(num(els.stickerHoleExternalGap,.4),0,20);hole.dirty=holeIsDirty(hole);
    if(reposition&&state.result?.mode==='sticker')ensureDraftStickerHolePosition(hole,false,true);updateStickerHoleUi();drawPreview();
  }
  function addStickerHole(mode=state.stickerHoleCreateMode){
    const ownerId=selectedStickerOwnerId();if(!ownerId){setNotice('warn','타공을 추가할 스티커 개체를 선택해 주세요','타공은 선택한 개체의 칼선에 귀속됩니다.');return null;}
    const selected=getSelectedStickerHole(),hole=makeHoleRecord(mode,{ownerId,draftDiameterMm:clamp(num(els.stickerHoleDiameter,selected?.draftDiameterMm||3),1.5,12),draftWallMm:clamp(num(els.stickerHoleWall,selected?.draftWallMm||1.5),.6,8),draftInsetMm:clamp(num(els.stickerHoleInset,selected?.draftInsetMm||2.5),.5,15),draftExternalGapMm:clamp(num(els.stickerHoleExternalGap,selected?.draftExternalGapMm??.4),0,20)});
    state.stickerHoles.push(hole);state.selectedStickerHoleIds=[hole.id];state.selectedStickerHoleId=hole.id;state.stickerHoleCreateMode=hole.draftMode;syncStickerHoleFieldsFromSelected();if(state.result?.mode==='sticker')ensureDraftStickerHolePosition(hole,true,true);updateStickerHoleUi();drawPreview();schedulePersist(0);return hole;
  }
  function removeStickerHole(id=state.selectedStickerHoleId){const index=state.stickerHoles.findIndex(h=>h.id===id);if(index<0)return;state.stickerHoles.splice(index,1);state.selectedStickerHoleIds=state.selectedStickerHoleIds.filter(item=>item!==id);if(state.selectedStickerHoleId===id)state.selectedStickerHoleId=state.selectedStickerHoleIds.at(-1)||null;normalizeStickerHoleSelection();if(getSelectedStickerHole())syncStickerHoleFieldsFromSelected();updateStickerHoleUi();drawPreview();schedulePersist(0);}
  function setStickerHoleMode(mode){
    if(mode==='none'){const ownerId=selectedStickerOwnerId();if(ownerId)state.stickerHoles=state.stickerHoles.filter(h=>h.ownerId!==ownerId);state.selectedStickerHoleIds=[];state.selectedStickerHoleId=null;updateStickerHoleUi();generateSticker();schedulePersist(0);return;}
    state.stickerHoleCreateMode=mode;const hole=getSelectedStickerHole();if(!hole){addStickerHole(mode);return;}hole.draftMode=mode;hole.dirty=true;if(state.result?.mode==='sticker')ensureDraftStickerHolePosition(hole,true,true);updateStickerHoleUi();drawPreview();schedulePersist(0);
  }
  function updateStickerHoleUi(){
    normalizeStickerHoleSelection();const ownerId=selectedStickerOwnerId(),ownerHoles=stickerHolesForOwner(ownerId),hole=getSelectedStickerHole(),mode=hole?.draftMode||'none',enabled=!!hole,selectedCount=state.selectedStickerHoleIds.length,hasSticker=!!ownerId;
    els.stickerHoleNoneBtn.classList.toggle('active',!ownerHoles.length);els.stickerHoleInternalBtn.classList.toggle('active',mode==='internal');els.stickerHoleExternalBtn.classList.toggle('active',mode==='external');els.stickerHoleOptions.classList.toggle('hidden',!enabled);els.stickerHoleWallField.classList.toggle('hidden',mode!=='external');els.stickerHoleExternalGapField.classList.toggle('hidden',mode!=='external');els.stickerHoleInsetField.classList.toggle('hidden',mode!=='internal');els.canvas.classList.toggle('hole-editing',selectedCount>0&&state.mode==='sticker');
    els.stickerAddHoleBtn.disabled=!hasSticker;els.stickerDeleteHoleBtn.disabled=!enabled;els.stickerResetHolePositionBtn.disabled=!enabled;els.stickerCenterHoleBtn.disabled=!selectedCount||!state.result;els.stickerApplyHolesBtn.disabled=!hasSticker;
    renderStickerHoleList();
    if(!ownerHoles.length){els.stickerHoleModeHelp.textContent=hasSticker?'선택한 개체에 내부 또는 외부 타공을 추가할 수 있습니다.':'먼저 타공을 추가할 스티커 개체를 선택하세요.';els.stickerHolePositionStatus.textContent='타공 없음';}
    else if(!hole){els.stickerHoleModeHelp.textContent='대지의 타공이나 목록을 클릭하면 수정 가이드가 켜집니다.';els.stickerHolePositionStatus.textContent=`타공 ${ownerHoles.length}개 적용됨 · 수정할 타공을 선택하세요`;}
    else{const index=ownerHoles.indexOf(hole)+1;els.stickerHoleModeHelp.textContent=mode==='internal'?'내부 타공은 스티커 칼선 안쪽에 원형 타공 칼선을 추가합니다.':'외부 타공은 스티커 칼선 바깥에 구멍과 투명 연결부를 만듭니다.';els.stickerHolePositionStatus.textContent=`${index}번 ${mode==='internal'?'내부':'외부'} 타공 · ${selectedCount>1?`${selectedCount}개 선택 중 · `:''}${holeIsDirty(hole)?'미적용 위치':'적용된 위치'}`;syncStickerHoleFieldsFromSelected();}
    const dirtyCount=ownerHoles.filter(holeIsDirty).length;els.stickerApplyHolesBtn.textContent=ownerHoles.length?`${dirtyCount?`${dirtyCount}개 타공 변경 적용 · `:''}칼선 다시 만들기`:'타공 적용 · 칼선 다시 만들기';
  }
  function applyStickerHolesAndGenerate(){
    const ownerId=selectedStickerOwnerId();if(!ownerId){setNotice('warn','스티커 개체를 선택해 주세요','선택한 개체의 타공과 칼선만 다시 만듭니다.');return;}
    for(const hole of stickerHolesForOwner(ownerId)){hole.appliedMode=hole.draftMode;hole.appliedXmm=hole.draftXmm;hole.appliedYmm=hole.draftYmm;hole.appliedDiameterMm=hole.draftDiameterMm;hole.appliedWallMm=hole.draftWallMm;hole.appliedInsetMm=hole.draftInsetMm;hole.appliedExternalGapMm=hole.draftExternalGapMm;hole.dirty=false;}
    state.selectedStickerHoleIds=[];state.selectedStickerHoleId=null;updateStickerHoleUi();generateSticker();schedulePersist(0);checkpointHistory();
  }

  function selectView(view) {
    state.view = view;
    document.querySelectorAll('.view-tab').forEach(b => b.classList.toggle('active', b.dataset.view === view));
    drawPreview();
  }

  function revealBackgroundInPreview() {
    if (state.view !== 'composite') selectView('composite');
    else drawPreview();
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

    const baseMode = state.borderlessBaseMode || (state.borderlessBaseLevel ? 'level' : 'keep');
    els.baseSlopeKeepBtn.classList.toggle('active', baseMode === 'keep');
    els.baseSlopeLevelBtn.classList.toggle('active', baseMode === 'level');
    els.baseSlopeManualBtn?.classList.toggle('active', baseMode === 'manual');
    els.baseLiftField.classList.toggle('hidden', baseMode === 'keep');
    els.manualBaseFields?.classList.toggle('hidden', baseMode !== 'manual');
    els.baseSlopeHelp.textContent = baseMode === 'manual'
      ? '기울기를 재지 않습니다. 바닥선을 수평으로 긋고, 정한 가로 범위 안에서만 그 선까지 채워 밑바탕을 만듭니다. 범위 밖의 칼선은 그대로 둡니다.'
      : baseMode === 'level'
      ? '더 높은 쪽 발끝을 기준으로 아래 이미지를 잘라 밑면을 수평으로 맞춥니다. 추가 올림 값만큼 더 위에서 자를 수 있습니다.'
      : '왼쪽과 오른쪽의 가장 낮은 지점을 그대로 연결합니다. 연결선 양옆에는 불필요한 투명 영역을 만들지 않습니다.';
    if (els.baseLiftField && baseMode === 'manual') {
      const label = els.baseLiftField.querySelector('span');
      if (label) label.textContent = '바닥선 높이 (그림 맨 아래에서)';
    } else if (els.baseLiftField) {
      const label = els.baseLiftField.querySelector('span');
      if (label) label.textContent = '수평선 추가 올림';
    }

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
    els.stickerBackgroundColorBtn.classList.toggle('active', isColor);
    els.stickerBackgroundGradientBtn.classList.toggle('active', isGradient);
    els.stickerBackgroundImageBtn.classList.toggle('active', isImage);
    els.stickerBackgroundPatternBtn.classList.toggle('active', isPattern);
    // v50.18 — 배경지 옵션과 패턴 필드의 표시는 conditional-visibility.js 가 전담한다.
    // 여기서는 어떤 방식이 선택됐는지(.active)만 알리고 판단은 sync() 에 맡긴다.
    window.GoodsMakerVisibility?.sync?.();
    els.backgroundViewTab.classList.toggle('hidden', !enabled && state.mode!=='maker');
    els.backgroundLegend.classList.toggle('hidden', !enabled && state.mode!=='maker');
    els.exportBackgroundRow.classList.toggle('hidden', !enabled && state.mode!=='maker');
    els.exportBackground.disabled = !enabled && state.mode!=='maker';
    if (!enabled && state.mode==='sticker' && state.view === 'background') selectView('composite');
  }

  function makerObjectTypeLabel(item){const type=makerObjectType(item);if(type==='text')return'글상자';if(type==='shape'){const kind=normalizeShapeStyle(item.shapeStyle).kind;return kind==='line'?'선':'도형';}return'이미지';}
  function updateMakerUi(options={}){
    const active=state.mode==='maker',type=state.makerBackgroundType;
    if(!els.makerControls)return;
    els.makerBgTransparentBtn?.classList.toggle('active',type==='transparent');
    els.makerBgColorBtn.classList.toggle('active',type==='color');els.makerBgGradientBtn.classList.toggle('active',type==='gradient');els.makerBgImageBtn.classList.toggle('active',type==='image');els.makerBgPatternBtn.classList.toggle('active',type==='pattern');
    // v50.18 — 배경/패턴 필드의 표시도 conditional-visibility.js 가 전담한다(스티커와 같은 이유).
    els.makerPngTransparentBtn?.classList.toggle('active',els.makerPngBackground?.value!=='white');els.makerPngWhiteBtn?.classList.toggle('active',els.makerPngBackground?.value==='white');

    state.makerSelectedIds=[...new Set((state.makerSelectedIds||[]).filter(id=>state.makerItems.some(v=>v.id===id)))];
    if(state.makerSelectedId&&!state.makerSelectedIds.includes(state.makerSelectedId))state.makerSelectedId=state.makerSelectedIds.at(-1)||null;if(!state.makerSelectedId&&state.makerSelectedIds.length)state.makerSelectedId=state.makerSelectedIds.at(-1);
    const selected=state.makerItems.filter(v=>state.makerSelectedIds.includes(v.id)),item=state.makerItems.find(v=>v.id===state.makerSelectedId)||selected.at(-1)||null,objectType=makerObjectType(item);if(els.copyMakerBtn)els.copyMakerBtn.disabled=!selected.length;
    const groupIds=new Set(selected.map(v=>v.groupId).filter(Boolean)),onlyGroupId=groupIds.size===1?[...groupIds][0]:null,isSingleCompleteGroup=!!onlyGroupId&&selected.length>1&&selected.every(v=>v.groupId===onlyGroupId)&&state.makerItems.filter(v=>v.groupId===onlyGroupId).length===selected.length,structureLocked=selected.some(v=>v.locked);
    if(els.makerSelectedCount){els.makerSelectedCount.textContent=`${selected.length}개 선택${isSingleCompleteGroup?' · 그룹':''}${structureLocked?' · 잠금 포함':''}`;els.makerSelectedCount.dataset.count=String(selected.length);}if(els.makerMultiSelectBtn){els.makerMultiSelectBtn.textContent=state.makerMultiSelectMode?'다중 선택 켬':'다중 선택 끔';els.makerMultiSelectBtn.classList.toggle('active-toggle',state.makerMultiSelectMode);}if(els.makerGroupBtn)els.makerGroupBtn.disabled=selected.length<2||isSingleCompleteGroup||structureLocked;if(els.makerUngroupBtn)els.makerUngroupBtn.disabled=!selected.some(v=>v.groupId)||structureLocked;
    els.makerSelectionEditor.classList.toggle('empty',!item);els.makerSelectionEditor.dataset.objectType=item?objectType:'';els.makerSelectionEditor.dataset.selectedCount=String(selected.length);if(els.makerApplyEffectsAllBtn)els.makerApplyEffectsAllBtn.disabled=!item||state.makerItems.length<2;
    // v50.18 — 글상자/도형/채우기 패널의 표시는 conditional-visibility.js 판단을 따른다.
    // (app.js 는 개체 종류만 봤고 cv.js 는 "1개만 선택" 까지 요구해 서로 어긋나 있었다)
    window.GoodsMakerVisibility?.sync?.();
    if(!item){if(!options.skipEffectRender)renderMakerEffectList(null);if(els.makerAddEffectBtn)els.makerAddEffectBtn.disabled=true;if(els.makerEffectAddType)els.makerEffectAddType.disabled=true;if(els.makerLockBtn)els.makerLockBtn.disabled=true;refreshColorControls();return;}els.makerLockBtn.disabled=false;
    const single=selected.length===1,size=makerItemSizeMm(item),locked=!!item.locked,allLocked=selected.length>0&&selected.every(v=>v.locked);
    els.makerObjectTypeLabel.textContent=makerObjectTypeLabel(item);els.makerObjectTypeEyebrow.textContent=objectType.toUpperCase();els.makerLockBtn.textContent=allLocked?'🔒 잠금 해제':'🔓 잠그기';els.makerLockBtn.setAttribute('aria-pressed',String(allLocked));els.makerLockBtn.classList.toggle('active-toggle',allLocked);
    els.makerSelWidth.value=size.width.toFixed(1);els.makerSelHeight.value=size.height.toFixed(1);els.makerSelRotation.value=(Number(item.rotation)||0).toFixed(0);els.makerSelX.value=(Number(item.xMm)||0).toFixed(1);els.makerSelY.value=(Number(item.yMm)||0).toFixed(1);els.makerAspectMode.value=objectType==='image'&&item.aspectMode==='free'?'free':'locked';els.makerAspectMode.disabled=objectType!=='image'||!single||locked;
    const transformDisabled=!single||locked;for(const field of [els.makerSelWidth,els.makerSelHeight,els.makerSelRotation,els.makerSelX,els.makerSelY])if(field)field.disabled=transformDisabled;els.makerSelHeight.disabled=transformDisabled||(objectType==='image'&&item.aspectMode!=='free');
    if(objectType==='text'){
      const t=normalizeTextStyle(item.textStyle);item.textStyle=t;els.makerTextContent.value=t.text;els.makerTextFont.value=[...els.makerTextFont.options].some(o=>o.value===t.fontFamily)?t.fontFamily:'system-ui';els.makerTextWeight.value=String(t.fontWeight);els.makerTextFontSize.value=t.fontSizeMm;els.makerTextLineHeight.value=t.lineHeight;els.makerTextLetterSpacing.value=t.letterSpacingMm;els.makerTextAlign.value=t.align;els.makerTextVerticalAlign.value=t.verticalAlign;els.makerTextBackgroundEnabled.checked=t.background.enabled;els.makerTextBackgroundColor.value=t.background.color;writeMakerFillFields(t.fill);renderTextBackgroundRanges(item);
    }
    if(objectType==='shape'){
      const sh=normalizeShapeStyle(item.shapeStyle);item.shapeStyle=sh;els.makerShapeKind.value=sh.kind;els.makerCornerRadius.value=sh.cornerRadius;els.makerShapeStrokeWidth.value=sh.strokeWidthMm;els.makerShapeStrokeColor.value=sh.strokeColor;els.makerLineStyle.value=sh.lineStyle;els.makerLineWidth.value=sh.lineWidthMm;els.makerLineCap.value=sh.lineCap;writeMakerFillFields(sh.fill);
    }
    const objectControls=[...els.makerTextFields.querySelectorAll('input,select,textarea,button'),...els.makerShapeFields.querySelectorAll('input,select,textarea,button'),...els.makerFillFields.querySelectorAll('input,select,textarea,button')];for(const control of objectControls)control.disabled=!single||locked;
    const movableSelected=selected.some(v=>!v.locked);for(const control of els.makerSelectionEditor.querySelectorAll('.maker-align-action'))control.disabled=!movableSelected;
    const effectLocked=!!item&&makerEffectTargets(item).some(v=>v.locked);
    els.makerDeleteBtn.disabled=!selected.length||selected.every(v=>v.locked);els.makerSendBackBtn.disabled=!item||structureLocked;els.makerStepBackBtn.disabled=!item||structureLocked;els.makerStepFrontBtn.disabled=!item||structureLocked;els.makerBringFrontBtn.disabled=!item||structureLocked;
    if(!options.skipEffectRender)renderMakerEffectList(item);for(const control of els.makerEffectList.querySelectorAll('input,select,button'))control.disabled=effectLocked;els.makerAddEffectBtn.disabled=!item||effectLocked;els.makerEffectAddType.disabled=!item||effectLocked;els.makerApplyEffectsAllBtn.disabled=!item||effectLocked||!state.makerItems.some(v=>v.id!==item.id&&!v.locked);
    if(active)els.backgroundViewTab.classList.remove('hidden');updateMakerObjectFillUi();refreshColorControls();
  }

  function updateFinishStyleUi() {
    const acrylicBorderless = state.finishStyle.acrylic === 'borderless';
    els.acrylicBorderlessBtn.classList.toggle('active', acrylicBorderless);
    els.acrylicBorderedBtn.classList.toggle('active', !acrylicBorderless);
    els.acrylicBorderlessFields.classList.toggle('hidden', !acrylicBorderless);
    els.acrylicBorderedFields.classList.toggle('hidden', acrylicBorderless);
    els.colorSampleField.classList.toggle('hidden', !acrylicBorderless);
    els.acrylicNarrowGapField.classList.toggle('hidden', acrylicBorderless);
    els.acrylicBorderlessNarrowGapField.classList.toggle('hidden', !acrylicBorderless);
    els.acrylicStyleHelp.textContent = acrylicBorderless
      ? '칼선은 그림 외곽을 따르고, 밖으로 인접 색을 확장해 재단여백을 만듭니다.'
      : '입력한 투명 테두리만큼 그림 밖으로 칼선을 이동합니다. 아래 기준보다 좁아지는 깊은 홈은 입구에서 자연스럽게 연결해 재단하기 쉬운 형태로 만듭니다.';

    const stickerBorderless = state.finishStyle.sticker === 'borderless';
    els.stickerBorderlessBtn.classList.toggle('active', stickerBorderless);
    els.stickerBorderedBtn.classList.toggle('active', !stickerBorderless);
    els.stickerBorderlessFields.classList.toggle('hidden', !stickerBorderless);
    els.stickerBorderedFields.classList.toggle('hidden', stickerBorderless);
    els.stickerNarrowGapField.classList.toggle('hidden', stickerBorderless);
    els.stickerBorderlessNarrowGapField.classList.toggle('hidden', !stickerBorderless);
    els.stickerStyleHelp.textContent = stickerBorderless
      ? '배치된 각 그림 외곽에 칼선을 만들고 인접 색으로 재단여백을 확장합니다.'
      : '각 그림 밖으로 입력한 테두리 폭을 확보합니다. 아래 기준보다 좁아지는 홈은 입구에서 자동으로 연결합니다.';

    updateFlatBaseUi();
    updateStickerBorderFillUi();
    updateStickerBackgroundUi();
    updateMakerUi();
    updateHoleUi();
    updateStickerHoleUi();
    // 입구 잠금 목록과 배경 지우기 버튼도 같은 자리에서 맞춘다. 여기를 빼먹으면
    // 새로고침·실행취소 뒤에 칼선은 잠긴 채인데 목록만 비어 보인다(실측으로 확인).
    updateSealUi();
    refreshBgBlocks();
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

  // ══════════════════════════════════════════════════════════════════
  // 밑바탕 직접 지정 (v76)
  //
  // 자동 밑바탕(analyzeBottomProtrusions)은 좌·우 최저 돌출부를 찾아 잇는다.
  // 그 두 점은 아래 1px 이 바뀌기만 해도 100px 씩 건너뛴다 — 발끝이 거의
  // 같은 높이일 때 어느 쪽이 "가장 낮은가" 가 뒤집히기 때문이다. 그래서
  // 배경을 조금만 손봐도 밑바탕이 딴 데로 옮겨 간다. 재 봤을 때 실제로
  // 그랬고, 재는 방식을 바꿔도 근본이 그대로라 고쳐지지 않았다.
  //
  // 직접 지정은 그 추측을 아예 없앤다. 바닥선의 **높이**와 **가로 범위**를
  // 사람이 정하고, 그 범위 안에서 그림 아래를 바닥선까지 채운다.
  //   · 기울기는 언제나 0 이다 (한 개의 y 값만 쓴다)
  //   · 범위 밖의 칼선은 손대지 않는다
  //   · 범위 안에서 바닥선보다 아래로 삐져나온 부분은 잘라낸다
  // 그림과 만나는 두 이음새는 기존 roundBaseMask 가 밑바닥 모서리 둥글기로
  // 함께 둥글린다 — 그 함수가 base.x1/x2 지점 둘레만 국소적으로 닫기·열기
  // 연산을 걸기 때문에, 여기서 base 를 같은 모양으로 돌려주면 그대로 먹는다.
  // ══════════════════════════════════════════════════════════════════
  function buildManualBaseMask(mask, w, h, ppm, opts) {
    const bounds = maskBounds(mask, w, h);
    if (bounds.maxX < bounds.minX) return null;
    const liftPx = Math.max(0, opts.liftMm) * ppm;
    const baseY = Math.round(clamp(bounds.maxY - liftPx, bounds.minY + 2, bounds.maxY));
    // 폭 0 = 그림 전체 폭. 그림보다 넓게는 못 만든다 — 그림이 없는 자리에는
    // 채울 것이 없어 어차피 아무 일도 일어나지 않는다.
    const centre = (bounds.minX + bounds.maxX) / 2 + opts.offsetMm * ppm;
    const halfW = opts.widthMm > 0 ? opts.widthMm * ppm / 2 : (bounds.maxX - bounds.minX) / 2 + 1;
    let x1 = Math.round(opts.widthMm > 0 ? centre - halfW : bounds.minX);
    let x2 = Math.round(opts.widthMm > 0 ? centre + halfW : bounds.maxX);
    x1 = clamp(x1, 0, w - 1); x2 = clamp(x2, 0, w - 1);
    if (x2 <= x1) return null;

    const out = new Uint8Array(mask);
    // 밑바탕을 뺀 모양도 따로 든다. 뒤에서 "더해진 부분" 을 차집합으로 뽑을 때
    // 이것을 기준으로 삼아야 잘라낸 자리가 다시 살아나지 않는다.
    const cutOnly = new Uint8Array(mask);
    let added = 0, cut = 0, columns = 0;
    for (let x = x1; x <= x2; x++) {
      // 바닥선 위에서 가장 낮은 그림 픽셀을 찾는다.
      let low = -1;
      for (let y = baseY; y >= bounds.minY; y--) { if (mask[y * w + x]) { low = y; break; } }
      // 바닥선 아래는 범위 안에서만 잘라낸다.
      for (let y = baseY + 1; y < h; y++) { const i = y * w + x; if (out[i]) { out[i] = 0; cutOnly[i] = 0; cut++; } }
      if (low < 0) continue;
      columns++;
      for (let y = low; y <= baseY; y++) { const i = y * w + x; if (!out[i]) { out[i] = 1; added++; } }
    }
    if (!columns) return null;
    return {
      mask: out, cutMask: cutOnly, added, cut,
      base: { x1: Math.min(x1, x2), x2: Math.max(x1, x2), y1: baseY, y2: baseY, deltaY: 0, levelled: true, manual: true },
      baseY, widthMm: (x2 - x1) / ppm
    };
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

  // 거리장 작업 버퍼. 불러오기 한 번에 백 번 넘게 부르는데, 그때마다 1 MB 짜리
  // 배열 두 개를 새로 만들면 쓰레기 수거에만 시간이 든다. 크기가 같으면 다시 쓴다.
  // (`out` 은 돌려주는 값이라 재사용하지 않는다.) (v116)
  function edtScratch(n, maxLen) {
    let s = edtScratch.cache;
    if (!s || s.temp.length < n || s.f.length < maxLen) {
      s = edtScratch.cache = {
        temp: new Float32Array(Math.max(n, s ? s.temp.length : 0)),
        f: new Float64Array(Math.max(maxLen, s ? s.f.length : 0)),
        d: new Float64Array(Math.max(maxLen, s ? s.f.length : 0)),
        v: new Int32Array(Math.max(maxLen, s ? s.f.length : 0)),
        z: new Float64Array(Math.max(maxLen, s ? s.f.length : 0) + 1)
      };
    }
    return s;
  }

  function distanceToMask(mask, w, h, targetValue) {
    const n = w * h, inf = 1e12;
    const maxLen = Math.max(w, h);
    const scratch = edtScratch(n, maxLen);
    const temp = scratch.temp, out = new Float32Array(n);
    const f = scratch.f, d = scratch.d, v = scratch.v, z = scratch.z;
    let anyTarget = false;
    for (let y = 0; y < h; y++) {
      const row = y * w;
      let rowHas = false;
      for (let x = 0; x < w; x++) {
        if (mask[row + x] === targetValue) { f[x] = 0; rowHas = true; } else f[x] = inf;
      }
      if (rowHas) {
        anyTarget = true;
        edt1d(f, w, d, v, z);
        for (let x = 0; x < w; x++) temp[row + x] = d[x];
      } else temp.fill(inf, row, row + w);
    }
    if (!anyTarget) { out.fill(inf); return out; }
    for (let x = 0; x < w; x++) {
      let colHas = false;
      for (let y = 0, i = x; y < h; y++, i += w) { const value = temp[i]; f[y] = value; if (value < inf * .5) colHas = true; }
      if (colHas) {
        edt1d(f, h, d, v, z);
        for (let y = 0, i = x; y < h; y++, i += w) out[i] = d[y];
      } else {
        for (let y = 0, i = x; y < h; y++, i += w) out[i] = inf;
      }
    }
    return out;
  }

  // 팽창·침식은 **그림이 든 사각형에서 반지름+1 보다 멀리 나가지 않는다.**
  // 그 사각형만 잘라 EDT 를 돌리면 결과가 픽셀 하나까지 같고 값이 싸다. (v116)
  //
  // 왜 반지름+1 인가: 팽창은 1 인 픽셀에서 반지름까지만 번지고, 침식이 보는
  // "가장 가까운 0" 도 반지름을 넘으면 어차피 판정이 같다. 한 칸을 더 두어
  // 경계에서 값이 흔들릴 여지를 없앤다. 잘린 바깥은 팽창이면 0, 침식이면
  // 원래 마스크가 0 이므로 그대로 0 이다.
  //
  // 실제 도안에서 그림 사각형은 대지의 51% 였고, 새로 이은 자리만 다시 닫을
  // 때는 훨씬 작았다. 불러오기 한 번에 EDT 가 147번 돌던 것이 여기서 줄었다.
  function morphCropRect(mask, w, h, radius) {
    const box = maskBoundingBox(mask, w, h);
    if (!box) return null;
    const m = radius + 1;
    const x1 = Math.max(0, box.x1 - m), y1 = Math.max(0, box.y1 - m);
    const x2 = Math.min(w - 1, box.x2 + m), y2 = Math.min(h - 1, box.y2 + m);
    if (x1 === 0 && y1 === 0 && x2 === w - 1 && y2 === h - 1) return null;   // 잘라도 그대로
    const sw = x2 - x1 + 1, sh = y2 - y1 + 1, sub = new Uint8Array(sw * sh);
    for (let y = 0; y < sh; y++) { const src = (y + y1) * w + x1; sub.set(mask.subarray(src, src + sw), y * sw); }
    return { sub, x1, y1, sw, sh };
  }
  function spreadCropped(inner, crop, w, h) {
    const out = new Uint8Array(w * h);
    for (let y = 0; y < crop.sh; y++) out.set(inner.subarray(y * crop.sw, (y + 1) * crop.sw), (y + crop.y1) * w + crop.x1);
    return out;
  }

  function dilateMask(mask, w, h, radius) {
    if (radius <= 0) return new Uint8Array(mask);
    const crop = morphCropRect(mask, w, h, radius);
    if (crop) return spreadCropped(dilateCore(crop.sub, crop.sw, crop.sh, radius), crop, w, h);
    return dilateCore(mask, w, h, radius);
  }
  function dilateCore(mask, w, h, radius) {
    const dist = distanceToMask(mask, w, h, 1), out = new Uint8Array(mask.length);
    const limit = (radius + .35) * (radius + .35);
    for (let i = 0; i < out.length; i++) if (dist[i] <= limit) out[i] = 1;
    return out;
  }

  function erodeMask(mask, w, h, radius) {
    if (radius <= 0) return new Uint8Array(mask);
    const crop = morphCropRect(mask, w, h, radius);
    if (crop) return spreadCropped(erodeCore(crop.sub, crop.sw, crop.sh, radius), crop, w, h);
    return erodeCore(mask, w, h, radius);
  }
  function erodeCore(mask, w, h, radius) {
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
  // 같은 마스크에 같은 기준으로 다시 부르는 일이 잦다 (v116).
  // 실제 도안 한 장을 불러올 때 20번 불렸는데, 그중 절반은 앞서 계산한 것과
  // 인자가 완전히 같았다 — 자동 닫기 사다리(1→8 mm)가 후보마다 처음부터 다시
  // 오르기 때문이다. 이 함수 한 번이 EDT 를 네 번 돌리므로(팽창·침식 × 행·열)
  // 불러오기 시간의 절반을 여기서 썼다.
  //
  // 마스크는 이 함수가 고치지 않으므로 결과를 기억해 두어도 된다. 다만 **호출한
  // 쪽이 마스크를 나중에 고칠 수** 있으니 체크섬으로 확인하고, 돌려주는 마스크는
  // 매번 복사해서 준다. 둘 다 EDT 한 번의 백분의 일도 안 든다.
  function narrowBridgeCache(){
    return narrowBridgeCache.map || (narrowBridgeCache.map = new WeakMap());
  }
  function maskChecksum(mask){
    let a=0x811c9dc5;
    for(let i=0;i<mask.length;i++){a^=mask[i];a=Math.imul(a,16777619)>>>0;}
    return a;
  }
  function bridgeNarrowCutInlets(mask,w,h,ppm,maxGapMm=4){
    const key=`${w}|${h}|${ppm}|${maxGapMm}`;
    const sum=maskChecksum(mask);
    const store=narrowBridgeCache();
    let slot=store.get(mask);
    if(!slot||slot.sum!==sum){slot={sum,map:new Map()};store.set(mask,slot);}
    let hit=slot.map.get(key);
    if(!hit){hit=computeNarrowCutInlets(mask,w,h,ppm,maxGapMm);slot.map.set(key,hit);}
    return {mask:new Uint8Array(hit.mask),addedPixels:hit.addedPixels,maxGapMm:hit.maxGapMm};
  }

  // 1 인 픽셀이 든 가장 작은 사각형. 하나도 없으면 null. (v116)
  // maskBounds 는 비어 있을 때 대지 전체를 돌려주므로 여기서는 쓸 수 없다.
  function maskBoundingBox(mask,w,h){
    // 팽창·침식마다 부르므로 전 픽셀을 훑지 않는다. 위·아래에서 첫 줄을 찾고,
    // 그 사이 줄에서만 좌·우 끝을 양쪽에서 좁혀 온다.
    let y1=-1;
    for(let y=0;y<h&&y1<0;y++){const row=y*w;for(let x=0;x<w;x++)if(mask[row+x]){y1=y;break;}}
    if(y1<0)return null;
    let y2=y1;
    for(let y=h-1;y>y1;y--){const row=y*w;let hit=false;for(let x=0;x<w;x++)if(mask[row+x]){hit=true;break;}if(hit){y2=y;break;}}
    let x1=w,x2=-1;
    for(let y=y1;y<=y2;y++){
      const row=y*w;
      for(let x=0;x<x1;x++)if(mask[row+x]){x1=x;break;}
      for(let x=w-1;x>x2;x--)if(mask[row+x]){x2=x;break;}
    }
    return {x1,y1,x2,y2};
  }

  // 새로 이은 자리 언저리만 다시 닫는다 (v116).
  // 예전에는 대지 전체를 닫아 EDT 를 세 번 더 돌렸는데, 쓰는 곳은 새로 채운
  // 픽셀 주변뿐이었다. 닫기가 미치는 거리는 반지름의 두 배이고 zone 이 다시
  // 두 배까지 퍼지므로, 네 배 + 2 만큼 넉넉히 잘라 내면 **결과가 같다.**
  function polishBridgedZone(out,added,w,h,localRadius){
    const box=maskBoundingBox(added,w,h);
    if(!box)return;
    const m=localRadius*4+2;
    const x1=Math.max(0,box.x1-m),y1=Math.max(0,box.y1-m);
    const x2=Math.min(w-1,box.x2+m),y2=Math.min(h-1,box.y2+m);
    const sw=x2-x1+1,sh=y2-y1+1;
    const subOut=new Uint8Array(sw*sh),subAdded=new Uint8Array(sw*sh);
    for(let y=0;y<sh;y++){
      const src=(y+y1)*w+x1,dst=y*sw;
      subOut.set(out.subarray(src,src+sw),dst);
      subAdded.set(added.subarray(src,src+sw),dst);
    }
    const zone=dilateMask(subAdded,sw,sh,Math.max(1,localRadius*2));
    const polished=erodeMask(dilateMask(subOut,sw,sh,localRadius),sw,sh,localRadius);
    for(let y=0;y<sh;y++)for(let x=0;x<sw;x++){
      const j=y*sw+x;
      if(zone[j]&&polished[j])out[(y+y1)*w+(x+x1)]=1;
    }
  }

  function computeNarrowCutInlets(mask,w,h,ppm,maxGapMm=4){
    const radius=Math.max(1,Math.round(maxGapMm*ppm*.5));

    // 캔버스 가장자리에서 바로 closing을 하면 팽창 단계가 대지 경계에 잘리면서
    // 그림과 대지 끝 사이의 빈 공간까지 좁은 홈으로 오인할 수 있습니다.
    // 충분한 투명 여백을 덧댄 마스크에서 closing한 뒤 원래 대지만 잘라 냅니다.
    // 닫기는 그림이 있는 자리에서만 뜻이 있다. 대지 전체를 닫으면 EDT 가
    // 빈 여백까지 훑는다 — 실제 도안에서 그림 테두리 상자는 대지의 절반이었다.
    // 테두리 상자만 잘라 여백을 붙여 닫아도 결과는 **완전히 같다**: 닫기는
    // 반지름 밖으로 번지지 않으므로 상자 바깥은 어차피 0 이다. (v116)
    const box=maskBoundingBox(mask,w,h);
    const closed=new Uint8Array(mask.length);
    if(box){
      const pad=radius+3,bw=box.x2-box.x1+1,bh=box.y2-box.y1+1,pw=bw+pad*2,ph=bh+pad*2;
      const padded=new Uint8Array(pw*ph);
      for(let y=0;y<bh;y++)padded.set(mask.subarray((y+box.y1)*w+box.x1,(y+box.y1)*w+box.x1+bw),(y+pad)*pw+pad);
      const paddedClosed=erodeMask(dilateMask(padded,pw,ph,radius),pw,ph,radius);
      // 상자 밖으로 반지름만큼 번진 부분도 대지 안이면 살려서 옮긴다
      const ox=box.x1-pad,oy=box.y1-pad;
      for(let y=0;y<ph;y++){
        const gy=y+oy; if(gy<0||gy>=h)continue;
        for(let x=0;x<pw;x++){ const gx=x+ox; if(gx<0||gx>=w)continue;
          if(paddedClosed[y*pw+x])closed[gy*w+gx]=1; }
      }
    }

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
      polishBridgedZone(out,added,w,h,Math.max(1,Math.round(.18*ppm)));
    }
    return {mask:out,addedPixels,maxGapMm};
  }


  // ── 입구 잠금 ────────────────────────────────────────────────────
  // bridgeNarrowCutInlets 는 "기준(mm)보다 좁은 입구" 를 한꺼번에 메운다.
  // 기준을 올리면 원하는 입구는 닫히지만 닫고 싶지 않은 홈까지 함께 메워진다.
  // 그래서 지점을 하나 찍으면 그 입구를 닫는 데 필요한 최소 반지름을 찾아
  // 그 자리만 닫는다. 기준과 무관하게 동작한다.
  //
  // 닫기(팽창→침식)는 반지름에 대해 단조롭다 — r 에서 메워진 점은 r 보다 큰
  // 값에서도 메워진다. 그래서 이분 탐색이 성립한다.
  //
  // 전체 이미지에 닫기를 반복하면 EDT 를 2회씩 매번 돌려 느리다. 입구는
  // 국소적이므로 찍은 지점 둘레의 창만 잘라 그 안에서 계산한다.
  // 찍은 자리에서 이만큼(mm) 안에 빈 자리가 있으면 거기로 옮겨 준다 (v103).
  // 손가락으로 폭 몇 px 짜리 홈을 정확히 찍기는 불가능하다.
  // 사용자: "원하는 부분 찍었는데도 정확히 비어 있는 부분 찍는 게 아니면 안 들어가네"
  const SEAL_SNAP_MM = 1.8;
  const SEAL_TRY_POINTS = 12;

  function nearbyEmptyPoints(mask, w, h, px, py, radius, limit) {
    const out = [];
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const d2 = dx * dx + dy * dy;
        if (d2 > radius * radius) continue;
        const x = px + dx, y = py + dy;
        if (x < 0 || y < 0 || x >= w || y >= h) continue;
        if (mask[y * w + x]) continue;
        out.push({ x, y, d2 });
      }
    }
    out.sort((a, b) => a.d2 - b.d2);
    return out.slice(0, limit);
  }

  // bridged 에서 새로 메워진 것 중 (px,py) 와 이어진 덩어리 하나만 가져온다.
  function sealBlobFrom(mask, bridgedMask, w, h, px, py) {
    const seen = new Uint8Array(w * h), queue = new Int32Array(w * h), out = new Uint8Array(mask);
    let head = 0, tail = 0, added = 0;
    const start = py * w + px;
    seen[start] = 1; queue[tail++] = start;
    while (head < tail) {
      const i = queue[head++], x = i % w, y = (i / w) | 0;
      out[i] = 1; added++;
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const ni = ny * w + nx;
        if (seen[ni] || mask[ni] || !bridgedMask[ni]) continue;
        seen[ni] = 1; queue[tail++] = ni;
      }
    }
    return { mask: out, added };
  }

  function sealInletAtPoint(mask, w, h, ppm, px, py, maxGapMm = 24) {
    px = Math.round(px); py = Math.round(py);
    if (px < 0 || py < 0 || px >= w || py >= h) return null;

    // 찍은 자리 그대로가 첫 후보, 그 다음은 가까운 빈 자리들.
    const radius = Math.max(3, Math.round(SEAL_SNAP_MM * (ppm || 1)));
    const near = nearbyEmptyPoints(mask, w, h, px, py, radius, SEAL_TRY_POINTS);
    const tries = mask[py * w + px] ? near : [{ x: px, y: py, d2: 0 }].concat(near.filter(p => p.d2 > 0));
    if (!tries.length) return { mask, gapMm: 0, added: 0, alreadyFilled: true };

    // 가까운 자리를 무턱대고 고르면 **벽 반대쪽**으로 튄다. 벽 위를 찍으면
    // 바깥 배경이 더 가까울 때가 있고, 그러면 1px 짜리 시늉만 닫고 끝난다
    // (실측으로 걸렸다 — 주머니 3,484px 대신 1px). 그래서 후보를 다 재 보고
    // **가장 크게 닫히는 것**을 고르되, 뜻이 있는 크기가 나오면 거기서 멈춘다.
    const minSeal = Math.max(4, Math.round(Math.PI * Math.pow(0.3 * (ppm || 1), 2)));

    // 사다리를 바깥에 두는 것이 중요하다. 후보마다 사다리를 돌리면 무거운
    // bridgeNarrowCutInlets 를 후보 수만큼 더 돌게 된다. 한 칸에서 한 번만
    // 돌리고 후보 전부를 그 결과에 대 본다.
    const ladder = [1, 1.5, 2, 3, 4, 5, 6, 8, 10, 13, 16, 20, 24].filter(v => v <= maxGapMm);
    let best = null;
    for (const gapMm of ladder) {
      const bridged = bridgeNarrowCutInlets(mask, w, h, ppm, gapMm);
      if (!bridged.addedPixels) continue;
      for (const point of tries) {
        if (!bridged.mask[point.y * w + point.x]) continue;
        const blob = sealBlobFrom(mask, bridged.mask, w, h, point.x, point.y);
        if (!best || blob.added > best.added) best = { mask: blob.mask, gapMm, added: blob.added };
      }
      if (best && best.added >= minSeal) return best;
    }
    return best;
  }

  function sealInletsAtPoints(mask, w, h, ppm, points, toLocal, maxGapMm = 24) {
    if (!points?.length) return { mask, addedPixels: 0, applied: [] };
    let current = mask, total = 0; const applied = [];
    for (const point of points) {
      const local = toLocal(point);
      if (!local) continue;
      const result = sealInletAtPoint(current, w, h, ppm, local.x, local.y, maxGapMm);
      if (!result) continue;
      if (result.added) { current = result.mask; total += result.added; }
      applied.push({ id: point.id, gapMm: result.gapMm, added: result.added });
    }
    return { mask: current, addedPixels: total, applied };
  }

  // ══════════════════════════════════════════════════════════════════
  // 자를 수 없는 가는 골짜기 메우기 (v114)
  //
  // 사용자 화면에서 칼선이 머리카락 가닥 사이로 **길게 파고들었다 나왔다.**
  // bridgeNarrowCutInlets 는 "기준(mm)보다 좁으면 메운다" 하나로 판단하는데,
  // 기준을 그 골짜기 폭까지 올리면 일부러 벌려 둔 얕은 홈까지 같이 메워진다.
  //
  // 폭만으로는 못 가른다. 가르는 것은 **폭 대 깊이의 비**다.
  //
  //     1.5mm 폭 × 20mm 깊이   → 칼이 못 들어간다. 메운다.   (비 13)
  //     1.5mm 폭 ×  2mm 깊이   → 일부러 낸 홈이다. 둔다.     (비 1.3)
  //     4mm  폭 × 20mm 깊이   → 가닥을 벌린 것이다. 둔다.   (폭이 상한을 넘음)
  //
  // 깊이는 넓이 ÷ 폭으로 잡는다. 가는 골짜기는 거의 직사각형이라 이것이 잘 맞고,
  // 모양이 굽어 있어도(가닥 사이는 대개 굽어 있다) 값이 무너지지 않는다.
  // ══════════════════════════════════════════════════════════════════
  function bridgeSlitInlets(mask, w, h, ppm, options) {
    const opt = options || {};
    const maxWidthMm = Number.isFinite(opt.maxWidthMm) ? opt.maxWidthMm : 4;
    const minAspect = Number.isFinite(opt.minAspect) ? opt.minAspect : 3;
    if (!(maxWidthMm > 0) || !(minAspect > 0)) return { mask, addedPixels: 0, filled: 0 };
    const radius = Math.max(1, Math.round(maxWidthMm * ppm * .5));

    // bridgeNarrowCutInlets 와 같은 이유로 여백을 덧대고 닫는다 — 대지 경계에서
    // 바로 닫으면 그림과 대지 끝 사이의 빈 곳까지 골짜기로 오인한다.
    const pad = radius + 3, pw = w + pad * 2, ph = h + pad * 2, padded = new Uint8Array(pw * ph);
    for (let y = 0; y < h; y++) padded.set(mask.subarray(y * w, (y + 1) * w), (y + pad) * pw + pad);
    const paddedClosed = erodeMask(dilateMask(padded, pw, ph, radius), pw, ph, radius);
    const closed = new Uint8Array(mask.length);
    for (let y = 0; y < h; y++) closed.set(paddedClosed.subarray((y + pad) * pw + pad, (y + pad) * pw + pad + w), y * w);

    const exterior = exteriorBackgroundMask(mask, w, h);
    const candidate = new Uint8Array(mask.length);
    for (let i = 0; i < candidate.length; i++) if (!mask[i] && closed[i] && exterior[i]) candidate[i] = 1;

    // 배경 픽셀에서 실루엣까지의 거리 — 골짜기의 반폭이다.
    const distSq = distanceToMask(mask, w, h, 1);
    const seen = new Uint8Array(mask.length), queue = new Int32Array(mask.length);
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const out = new Uint8Array(mask);
    let addedPixels = 0, filled = 0;
    for (let start = 0; start < candidate.length; start++) {
      if (!candidate[start] || seen[start]) continue;
      let head = 0, tail = 0, touchesEdge = false, peak = 0;
      const pixels = [];
      seen[start] = 1; queue[tail++] = start;
      while (head < tail) {
        const i = queue[head++], x = i % w, y = (i / w) | 0;
        pixels.push(i);
        if (distSq[i] > peak) peak = distSq[i];
        if (x === 0 || y === 0 || x === w - 1 || y === h - 1) touchesEdge = true;
        for (const [dx, dy] of dirs) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const ni = ny * w + nx;
          if (candidate[ni] && !seen[ni]) { seen[ni] = 1; queue[tail++] = ni; }
        }
      }
      if (touchesEdge) continue;                       // 대지에 닿는 것은 골짜기가 아니다
      const width = 2 * Math.sqrt(peak);               // 가장 굵은 자리의 폭
      if (!(width > 0) || width > maxWidthMm * ppm) continue;
      const depth = pixels.length / Math.max(1, width);
      if (depth < width * minAspect) continue;         // 얕은 홈은 일부러 낸 것이다
      for (const i of pixels) { out[i] = 1; addedPixels++; }
      filled++;
    }
    if (addedPixels) {
      // 메운 자리 둘레의 1px 계단을 한 번 더 다듬는다 (bridgeNarrowCutInlets 와 같다).
      const localRadius = Math.max(1, Math.round(.18 * ppm));
      const added = new Uint8Array(mask.length);
      for (let i = 0; i < out.length; i++) if (out[i] && !mask[i]) added[i] = 1;
      const zone = dilateMask(added, w, h, Math.max(1, localRadius * 2));
      const polished = erodeMask(dilateMask(out, w, h, localRadius), w, h, localRadius);
      for (let i = 0; i < out.length; i++) if (zone[i] && polished[i]) out[i] = 1;
    }
    return { mask: out, addedPixels, filled };
  }

  // ══════════════════════════════════════════════════════════════════
  // 두 지점 닫기 (v76)
  //
  // 입구 잠금(한 점)은 좁은 홈을 원판으로 메우는 방식이라, 입구가 넓으면
  // 기준을 아무리 올려도 안 닫히거나 닫으려다 옆의 다른 홈까지 메운다.
  // 두 지점 닫기는 그 대신 사람이 **입구의 양쪽 입술**을 직접 찍어, 그 사이만
  // 곡선 하나로 잇는다. 기준값이라는 개념이 아예 없다.
  //
  // 이은 자리가 각지면 칼선에서 바로 눈에 띈다. 그래서 3차 베지에를 쓰되
  // 조종점을 칼선의 접선 방향에 놓는다. 그러면 이은 지점에서 기울기가 이어져
  // (접선 연속) 꺾인 곳이 보이지 않는다.
  //
  //     P0 = S                    P3 = E
  //     P1 = S + tIn·k            P2 = E - tOut·k
  //
  //   tIn  = 남길 칼선이 S 에 도착하는 방향
  //   tOut = 남길 칼선이 E 를 떠나는 방향
  //   k    = |SE| / 3   (원호에 가까운 무난한 배부름)
  //
  // 채울 곳은 곡선과 "버릴 호" 가 둘러싼 안쪽이다. 두 호 중 어느 쪽이
  // 주머니인지는 넓이로 고른다 — 입구 안쪽은 도형 전체보다 늘 좁다.
  // ══════════════════════════════════════════════════════════════════
  function nearestContourVertex(contours, x, y) {
    let best = null;
    for (let c = 0; c < contours.length; c++) {
      const path = contours[c];
      for (let i = 0; i < path.length; i++) {
        const dx = path[i].x - x, dy = path[i].y - y, d2 = dx * dx + dy * dy;
        if (!best || d2 < best.d2) best = { contour: c, index: i, d2 };
      }
    }
    return best;
  }

  function sampleCubic(p0, p1, p2, p3, steps) {
    const out = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, u = 1 - t;
      const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
      out.push({ x: a * p0.x + b * p1.x + c * p2.x + d * p3.x, y: a * p0.y + b * p1.y + c * p2.y + d * p3.y });
    }
    return out;
  }

  // 곡선만 따로 얻는다(미리보기에 그대로 그린다 — 계산과 화면이 어긋나지 않게).
  function cutBridgeCurve(contours, ax, ay, bx, by, ppm) {
    const outer = contours.filter(p => polygonArea(p) > 0);
    if (!outer.length) return { error: 'nocontour' };
    const hitA = nearestContourVertex(outer, ax, ay), hitB = nearestContourVertex(outer, bx, by);
    if (!hitA || !hitB) return { error: 'nocontour' };
    const snap = Math.max(4, 4 * ppm);        // 칼선에서 4mm 안쪽이면 그 칼선을 찍은 것으로 본다
    if (hitA.d2 > snap * snap || hitB.d2 > snap * snap) return { error: 'far' };
    if (hitA.contour !== hitB.contour) return { error: 'split' };
    const path = outer[hitA.contour], n = path.length;
    if (hitA.index === hitB.index) return { error: 'same' };

    const arcFrom = (from, to) => {
      const out = [];
      for (let i = from, guard = 0; guard <= n; i = (i + 1) % n, guard++) {
        out.push(path[i]);
        if (i === to) break;
      }
      return out;
    };
    const arc1 = arcFrom(hitA.index, hitB.index);   // A → B
    const arc2 = arcFrom(hitB.index, hitA.index);   // B → A
    if (arc1.length < 3 || arc2.length < 3) return { error: 'same' };

    // 넓이가 작은 쪽이 주머니다. 남는 쪽이 칼선으로 살아남는다.
    const pocketIsArc1 = Math.abs(polygonArea(arc1)) <= Math.abs(polygonArea(arc2));
    const pocket = pocketIsArc1 ? arc1 : arc2;      // S → E
    const keep = pocketIsArc1 ? arc2 : arc1;        // E → S
    const S = pocket[0], E = pocket[pocket.length - 1];

    const unit = (dx, dy) => { const m = Math.hypot(dx, dy) || 1; return { x: dx / m, y: dy / m }; };
    const tIn = unit(S.x - keep[keep.length - 2].x, S.y - keep[keep.length - 2].y);
    const tOut = unit(keep[1].x - E.x, keep[1].y - E.y);
    const span = Math.hypot(E.x - S.x, E.y - S.y);
    const k = span / 3;
    const steps = clamp(Math.round(span / 1.5), 12, 160);
    const curve = sampleCubic(S, { x: S.x + tIn.x * k, y: S.y + tIn.y * k },
                                 { x: E.x - tOut.x * k, y: E.y - tOut.y * k }, E, steps);
    return { curve, pocket, keep, span, spanMm: span / ppm };
  }

  function bridgeCutAtTwoPoints(mask, w, h, ppm, ax, ay, bx, by) {
    const found = cutBridgeCurve(traceContours(mask, w, h), ax, ay, bx, by, ppm);
    if (found.error) return found;
    // 곡선(S→E) 다음에 주머니 호를 거꾸로(E→S) 이어 붙이면 닫힌 다각형이 된다.
    const region = found.curve.concat(found.pocket.slice().reverse().slice(1, -1));
    if (region.length < 3) return { error: 'same' };
    const filled = rasterizePaths([region], w, h);
    const out = new Uint8Array(mask);
    let added = 0;
    for (let i = 0; i < out.length; i++) if (!out[i] && filled[i]) { out[i] = 1; added++; }
    return { mask: out, added, spanMm: found.spanMm };
  }

  function applyCutBridges(mask, w, h, ppm, bridges, toLocal) {
    if (!bridges?.length) return { mask, addedPixels: 0, applied: [] };
    let current = mask, total = 0; const applied = [];
    for (const bridge of bridges) {
      const a = toLocal(bridge.a), b = toLocal(bridge.b);
      if (!a || !b) continue;
      const result = bridgeCutAtTwoPoints(current, w, h, ppm, a.x, a.y, b.x, b.y);
      if (result.error) { applied.push({ id: bridge.id, added: 0, error: result.error }); continue; }
      if (result.added) { current = result.mask; total += result.added; }
      applied.push({ id: bridge.id, added: result.added, spanMm: result.spanMm });
    }
    return { mask: current, addedPixels: total, applied };
  }

  // C 판정 문턱. 안쪽 원이 입구보다 이만큼 굵어야 "주머니" 로 본다.
  // 1.0 이면 곧은 경계도 다 통과하고, 너무 높이면 얕은 주머니를 놓친다.
  const INLET_POCKET_RATIO = 1.35;

  // 열린 배경에서 각 배경 픽셀까지 가는 길 중, **가장 좁은 지점을 최대로**
  // 만드는 값(widest path). 값이 곧 "그 자리까지 굴려 넣을 수 있는 가장 큰
  // 원의 반지름" 이라, 안쪽 원 반지름과 견주면 입구가 병목인지 알 수 있다.
  //
  // 값이 큰 쪽부터 처리하면 확정된다(최대-최소 다익스트라). 우선순위 큐 대신
  // 반지름 0.5 px 단위 버킷을 쓴다 — 판정에 쓰는 값이라 그 정도면 충분하다.
  function widestPathFromOpen(mask, closedMask, freeDist, w, h) {
    const n = w * h, bott = new Float32Array(n);
    let maxR = 0;
    for (let i = 0; i < n; i++) if (!mask[i] && freeDist[i] > maxR && freeDist[i] < 1e11) maxR = freeDist[i];
    const KEY = 2, maxKey = Math.min(20000, Math.ceil(Math.sqrt(maxR) * KEY) + 1);
    const buckets = new Array(maxKey + 1);
    const radius = i => Math.sqrt(freeDist[i]);
    const push = (i, val) => {
      if (val <= bott[i]) return;
      bott[i] = val;
      const k = Math.min(maxKey, Math.max(0, Math.floor(val * KEY)));
      (buckets[k] || (buckets[k] = [])).push(i);
    };
    // 씨앗 = 넓은 기준으로도 안 메워진 곳 = 진짜 열린 배경.
    for (let i = 0; i < n; i++) if (!mask[i] && !closedMask[i]) push(i, radius(i));
    for (let k = maxKey; k >= 0; k--) {
      const b = buckets[k];
      if (!b) continue;
      for (let p = 0; p < b.length; p++) {
        const i = b[p];
        if (Math.min(maxKey, Math.floor(bott[i] * KEY)) !== k) continue;   // 낡은 항목
        const x = i % w, y = (i / w) | 0, cur = bott[i];
        if (x > 0 && !mask[i - 1]) push(i - 1, Math.min(cur, radius(i - 1)));
        if (x < w - 1 && !mask[i + 1]) push(i + 1, Math.min(cur, radius(i + 1)));
        if (y > 0 && !mask[i - w]) push(i - w, Math.min(cur, radius(i - w)));
        if (y < h - 1 && !mask[i + w]) push(i + w, Math.min(cur, radius(i + w)));
      }
      buckets[k] = null;
    }
    return bott;
  }

  // 기준을 넘어서 안 닫히는 입구를 찾아 준다. 사용자가 좁은 입구를 손가락으로
  // 정확히 찍기는 어려우므로, 후보를 먼저 보여 주고 고르게 한다.
  function findOpenInlets(mask, w, h, ppm, currentGapMm, maxGapMm = 24, limit = 12) {
    const wide = bridgeNarrowCutInlets(mask, w, h, ppm, maxGapMm);
    if (!wide.addedPixels) return [];
    const narrow = currentGapMm > 0 ? bridgeNarrowCutInlets(mask, w, h, ppm, currentGapMm).mask : mask;
    const extra = new Uint8Array(w * h);
    for (let i = 0; i < extra.length; i++) if (wide.mask[i] && !narrow[i]) extra[i] = 1;

    const minArea = Math.max(6, Math.round(.25 * ppm * ppm));   // 0.5×0.5 mm 보다 작은 것은 잡티
    // 배경 쪽 거리장과 "가장 넓은 길" 병목장. 둘 다 후보 판정에만 쓴다.
    const freeDist = distanceToMask(mask, w, h, 1);              // 배경에서 오브젝트까지 거리²
    const bottleneck = widestPathFromOpen(mask, wide.mask, freeDist, w, h);
    const seen = new Uint8Array(w * h), queue = new Int32Array(w * h), found = [];
    for (let start = 0; start < extra.length; start++) {
      if (!extra[start] || seen[start]) continue;
      let head = 0, tail = 0, sx = 0, sy = 0, count = 0;
      const pixels = [];
      seen[start] = 1; queue[tail++] = start;
      while (head < tail) {
        const i = queue[head++], x = i % w, y = (i / w) | 0;
        pixels.push(i); sx += x; sy += y; count++;
        for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const ni = ny * w + nx;
          if (extra[ni] && !seen[ni]) { seen[ni] = 1; queue[tail++] = ni; }
        }
      }
      if (count < minArea) continue;
      // ── C 자만 남긴다 (v101) ────────────────────────────────────
      // 여기까지 온 후보에는 두 종류가 섞여 있다.
      //
      //   C  입구는 좁은데 안이 넓다.        ← 닫아야 하는 것
      //   <  밖에서 안으로 좁아지기만 한다.  ← 그냥 경계다. 닫으면 안 된다
      //
      // 넓이·둘레로는 안 갈린다. 갈리는 것은 **폭이 안으로 갈수록 어떻게
      // 되는가** 하나다. 후보 안에 들어가는 가장 큰 원의 반지름 Rin 과, 그
      // 자리에서 열린 배경으로 빠져나가는 길 중 가장 넓은 길의 병목 반지름
      // Rb 를 재면 — C 는 Rin > Rb, < 는 Rin = Rb 다. < 는 가장 굵은
      // 자리가 곧 입구라서 병목이 자기 자신이 되기 때문이다.
      let peak = pixels[0], peakR = -1;
      for (const i of pixels) if (freeDist[i] > peakR) { peakR = freeDist[i]; peak = i; }
      const Rin = Math.sqrt(peakR), Rb = bottleneck[peak];
      // 배수만 보면 Rin 이 1~2px 인 잡티가 쉽게 통과한다. 절대 여유(0.3 mm)도 같이 본다.
      if (!(Rin >= Rb * INLET_POCKET_RATIO && Rin - Rb >= Math.max(1.2, 0.3 * ppm))) continue;
      // 대표점은 무게중심에 가장 가까운 실제 픽셀로 잡는다. 무게중심 자체는
      // ㄷ 자 모양에서 덩어리 밖으로 나갈 수 있다.
      const cx = sx / count, cy = sy / count;
      let bestI = pixels[0], bestD = Infinity;
      for (const i of pixels) {
        const d = (i % w - cx) ** 2 + (((i / w) | 0) - cy) ** 2;
        if (d < bestD) { bestD = d; bestI = i; }
      }
      found.push({ x: bestI % w, y: (bestI / w) | 0, areaPx: count, pocketRatio: Rb > 0 ? Rin / Rb : Infinity });
    }
    found.sort((a, b) => b.areaPx - a.areaPx);
    return found.slice(0, limit).map(item => {
      const sealed = sealInletAtPoint(mask, w, h, ppm, item.x, item.y, maxGapMm);
      return { x: item.x, y: item.y, areaPx: item.areaPx, pocketRatio: item.pocketRatio, gapMm: sealed?.gapMm ?? null };
    });
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

  // 재단여백은 칼이 조금 빗나가도 인쇄물 가장자리에 안 찍힌 자리가 안 보이게
  // **칼선 바깥에** 색을 깔아 두는 것이다. 칼선 **안쪽**에는 그릴 이유가 없다 —
  // 거기 있어야 할 것은 그림 그 자체다 (v120).
  //
  // 사용자: "그냥 칼선 안에다가는 확장도안 자체를 안 그리면 되는데? 확장도안이랑
  //          원본 그림이랑 미세한 틈 있으니까 칼선이랑 닿아 있는 쪽 한두 픽셀
  //          빼서 채우기만 해"
  //
  // 맞는 말이었다. v104~v119 는 "칼선 안쪽의 어디를 비울 것인가" 를 점점 정교하게
  // 깎아 왔는데, 애초에 **안쪽에는 안 그리는 것**이 답이다. 그러면 닫아서 생긴
  // 투명한 자리도, 가닥 사이 홈도 전부 저절로 비고, 경계는 그림 자신의 (부드러운)
  // 가장자리가 된다 — 알고리즘이 그은 금이 아니라.
  //
  // 딱 하나 남기는 것이 이음매다. 그림의 알파 가장자리와 마스크 가장자리가 한두
  // 픽셀 어긋나서, 그냥 끊으면 칼선 바로 안쪽에 **투명한 실선**이 남는다.
  // 그래서 "그림에서 두 픽셀 안 · 칼선에서 두 픽셀 안" 인 자리만 채운다.
  // 칼선 안쪽의 투명한 자리와 맞닿은 가장자리 한 겹에서 확장색 받침을 걷어낸다.
  // 알파만 낮추므로 인쇄 범위가 한 픽셀도 늘지 않는다.
  // v123 — 받침을 걷어내면 printMask 도 같이 내린다.
  //
  // v122 는 알파만 0 으로 만들고 printMask[i]=1 을 그대로 뒀다. 그런데
  // printMask 는 화이트의 `solidMask` 로 넘어가서 "여기는 인쇄된다" 로 읽힌다.
  // 그래서 그림도 확장색도 없는 자리에 **화이트만 남는 흰 점**이 생겼다
  // (실측 21px · 1~3px 짜리 11덩어리). 사용자: "빈 공간 중간에 화이트
  // 채워지는 거는 해결 안 돼?"
  //
  // 받침을 걷어낸 뒤 남는 인쇄 알파가 **사실상 0** 이면 내린다. "0 일 때만"
  // 으로는 모자랐다 — 실측한 흰 점들의 인쇄 알파는 1~8 이었는데 화이트는
  // 최대 255 로 깔려 있었다. 눈에 안 보이는 잉크 위에 흰 점만 남는 것이다.
  const PRINT_VOID_ALPHA = 8;
  function unbackVoidEdge(imageData,printMask,outerMask,originalData,w,h,realVoid=null){
    const n=w*h,d=imageData.data,od=originalData.data;
    const voidMask=new Uint8Array(n);
    let any=false;
    // v127 — 걷어내는 것은 **진짜 투명 덩어리**와 맞닿은 한 겹뿐이다.
    // 여태는 "칼선 안쪽인데 안 찍힌 자리" 를 전부 빈 자리로 봤다. 그런데 그
    // 대부분은 안티앨리어싱·칼선 다듬기가 만든 1~2px 짜리 실이고(실측 50덩어리
    // 중 41개가 두께반 1), 그 실 옆에서 받침을 걷어내는 바람에 그림의 가장자리가
    // 반투명하게 남아 밑의 화이트가 가닥마다 비쳤다.
    for(let i=0;i<n;i++){
      if(!outerMask[i]||printMask[i])continue;
      if(realVoid&&!realVoid[i])continue;   // 실이다 — 빈 자리로 치지 않는다
      voidMask[i]=1;any=true;
    }
    if(!any)return 0;
    let softened=0;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const i=y*w+x;
      if(!outerMask[i]||voidMask[i]||!printMask[i])continue;
      const a=od[i*4+3];
      if(a>=248)continue;                       // 원래 불투명한 그림은 그대로 둔다
      let touchesVoid=false;
      for(let dy=-1;dy<=1&&!touchesVoid;dy++)for(let dx=-1;dx<=1;dx++){
        const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;
        if(voidMask[ny*w+nx]){touchesVoid=true;break;}
      }
      if(!touchesVoid)continue;
      const t=i*4;
      if(d[t+3]===0)continue;
      d[t+3]=0;                                 // 받침을 걷어낸다 — 그림만 남는다
      if(a<=PRINT_VOID_ALPHA)printMask[i]=0;    // 사실상 안 찍히는 자리다 (v123)
      softened++;
    }
    return softened;
  }

  // 칼선이 닫아 만든 자리를 이음매가 **통째로** 삼키면 그 덩어리는 손대지 않는다 (v125).
  //
  // 사용자: "칼선으로는 저기 중간 화이트 들어갈 부분이 안 닫히고 잘 파고드는데
  //          화이트는 저렇게 중간점을 닫아"
  //
  // 화이트 문제가 아니었다. 화이트는 인쇄를 정직하게 따라갈 뿐이고, 그 자리를
  // 막은 것은 **이음매**다. 칼선이 좁은 홈을 닫아 만든 주머니는 폭이 두어 겹뿐이라,
  // 양쪽에서 BLEED_SEAM_PX(2)씩 들어가면 가운데가 남지 않는다. 잘라 낸 뒤
  // 투명하게 보여야 할 자리가 통째로 인쇄된다.
  // 실측(출력 해상도 965px): 닫아 만든 자리 161덩어리 중 **149개(1,394px)가
  // 90% 넘게 인쇄돼 막혀 있었다.** 귀·앞발처럼 좌우 대칭으로 나온다.
  //
  // 가르는 자는 **칼선 밖에서 얼마나 깊은가**다. 실측이 그렇게 갈렸다
  // (출력 해상도 965px · 칼선이 닫아 만든 자리 161덩어리):
  //
  //   | | 개수 | 크기 중앙 | 칼선 밖까지 최대 |
  //   | 가장자리 슬리버 | 149 | 3 px | **2 px** |
  //   | 진짜 주머니     |  12 | 83 px | **109 px** |
  //
  // 슬리버는 칼선에 딱 붙은 한두 겹이고 **채워야 맞는 이음매**다. 주머니는
  // 안쪽으로 깊이 들어간다. 사이가 텅 비어 있어(2px vs 6px 이상) 0.3mm 로
  // 깨끗이 갈린다. mm 이라 해상도가 바뀌어도 같다.
  //
  // "그림까지의 거리" 로는 안 갈린다 — 주머니도 그림에 붙어 있다(최대 3px).
  // 처음에 그 자를 댔다가 149개가 전부 걸러져 아무것도 안 고쳐졌다.
  // "덩어리를 통째로 삼켰는가" 만으로도 안 된다 — 이음매는 2px 고정인데 띠의
  // 폭은 ppm 에 비례하므로 미리보기(ppm 7.43)에서는 띠까지 90% 넘게 덮여,
  // v122 에서 막은 이음매 틈이 73 → 366px 로 되살아났다. 둘을 같이 봐야 한다.
  const SEAM_SWALLOW_RATIO = 0.5;
  function unswallowClosedInlets(seamMask,closedInletMask,outerMask,w,h,ppm){
    if(!seamMask||!closedInletMask)return 0;
    const n=w*h,deepPx=Math.max(3,CUT_INK_BACKING_MM*ppm),reach=deepPx*deepPx;
    // 칼선 밖까지의 거리 — 덩어리가 안쪽으로 얼마나 깊은가
    const outside=new Uint8Array(n);
    for(let i=0;i<n;i++)if(!outerMask[i])outside[i]=1;
    const depth=distanceToMask(outside,w,h,1);
    const seen=new Uint8Array(n),stack=new Int32Array(n),members=new Int32Array(n);
    let freed=0;
    for(let start=0;start<n;start++){
      if(!closedInletMask[start]||seen[start])continue;
      let top=0,count=0,covered=0,deep=false;seen[start]=1;stack[top++]=start;
      while(top>0){
        const i=stack[--top];members[count++]=i;
        if(seamMask[i])covered++;
        if(depth[i]>reach)deep=true;
        const x=i%w,y=(i/w)|0;
        for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
          const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;
          const ni=ny*w+nx;
          if(closedInletMask[ni]&&!seen[ni]){seen[ni]=1;stack[top++]=ni;}
        }
      }
      // ① 칼선에 딱 붙은 한두 겹이면 그것은 이음매다 — 이어 준다
      if(!deep)continue;
      // ② 절반도 안 덮였으면 이음매로서 제 몫을 하고 있다 — 둔다
      if(covered/count < SEAM_SWALLOW_RATIO)continue;
      for(let k=0;k<count;k++){const i=members[k];if(seamMask[i]){seamMask[i]=0;freed++;}}
    }
    return freed;
  }

  // 칼선 안쪽 이음매를 몇 겹까지 채울지. 사용자가 말한 "한두 픽셀" 이다.
  // 0 이면 칼선 바로 안쪽에 투명한 실선이 한 바퀴 남고, 더 키우면 칼선
  // 안쪽 투명한 자리로 색이 번진다.
  // 칼선 안쪽의 투명한 자리를 **두께로** 두 무리로 가른다 (v127).
  //
  // 사용자: "칼선에 붙어 있는 투명 픽셀이 안티에일리어싱/칼선 다듬기 때문에
  //          생긴 작은 틈인지 실제로 투명한 덩어리 픽셀인지 확인을 못 해서
  //          문제가 생기는 것 같은데?"
  //
  // 맞는 말이었다. 실측(사용자 도안 · 350dpi · 칼선 안쪽 빈 자리 50덩어리):
  //
  //   | 두께(최대 내접 반지름) | 덩어리 | 넓이 |
  //   | 1                      |  41개 |   151 px |  ← 안티앨리어싱·칼선 다듬기가 만든 실
  //   | 2~4                    |   7개 |   460 px |  ← 〃
  //   | 18                     |   1개 | 9,695 px |  ← 진짜 투명 덩어리
  //   | 36                     |   1개 | 10,257 px |  ← 진짜 투명 덩어리
  //
  // 4 와 18 사이가 텅 비어 있다. 넓이로는 못 가른다 — 실이 길면 넓이가 커진다.
  // **두께**로 갈라야 하고, 두께는 "빈 자리가 아닌 곳까지의 거리" 의 최대값이다.
  // 기준은 mm 라 해상도가 바뀌어도 같은 자리에서 갈린다.
  //
  // 얇은 것은 메워야 맞다 — 그래야 확장도안이 그림에 빈틈 없이 붙는다.
  // 두꺼운 것만 열어 둔다.
  function thickTransparentMask(originalData,outerMask,w,h,ppm){
    const n=w*h,src=originalData.data,thin=new Uint8Array(n);
    let any=false;
    for(let i=0;i<n;i++) if(outerMask[i]&&src[i*4+3]<=PRINT_VOID_ALPHA){thin[i]=1;any=true;}
    if(!any)return null;
    // 빈 자리가 아닌 곳까지의 8-이웃 거리 = 그 덩어리 두께의 절반
    const dist=new Int32Array(n).fill(-1),q=new Int32Array(n);let head=0,tail=0;
    for(let i=0;i<n;i++) if(!thin[i]){dist[i]=0;q[tail++]=i;}
    while(head<tail){const i=q[head++],x=i%w,y=(i/w)|0;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
        const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;
        const ni=ny*w+nx;if(dist[ni]<0){dist[ni]=dist[i]+1;q[tail++]=ni;}}}
    const limit=Math.max(2,CUT_INK_BACKING_MM*(ppm>0?ppm:0));
    const seen=new Uint8Array(n),stack=new Int32Array(n),members=new Int32Array(n),out=new Uint8Array(n);
    let kept=0;
    for(let start=0;start<n;start++){
      if(!thin[start]||seen[start])continue;
      let top=0,count=0,maxD=0;seen[start]=1;stack[top++]=start;
      while(top>0){const i=stack[--top];members[count++]=i;
        if(dist[i]>maxD)maxD=dist[i];
        const x=i%w,y=(i/w)|0;
        for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
          const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;
          const ni=ny*w+nx;if(thin[ni]&&!seen[ni]){seen[ni]=1;stack[top++]=ni;}}}
      if(maxD<=limit)continue;              // 실이다 — 메운다
      for(let k=0;k<count;k++)out[members[k]]=1;
      kept++;
    }
    return kept?out:null;
  }

  const BLEED_SEAM_PX = 2;
  function makeBleed(originalData, objectMask, outerMask, holeMask, w, h, bleedPx, includeHoles, baseNoBleed, protectedTransparentMask=null, transparentSeedMask=null, transparentCutZone=null, transparentHoleMask=null, outsideOnly=false, insideFillMask=null, closedInletMask=null, ppmForSeam=0) {
    const n=w*h,expandedOuter=dilateMask(outerMask,w,h,bleedPx),expandedObject=dilateMask(objectMask,w,h,bleedPx),allowed=new Uint8Array(n),noWrite=new Uint8Array(n),hardNoWrite=new Uint8Array(n);
    let seamInside=null;
    // 진짜로 열어 둘 투명 덩어리 (v127). null 이면 전부 실이라 다 메운다.
    const realVoid=outsideOnly?thickTransparentMask(originalData,outerMask,w,h,ppmForSeam):null;
    if(outsideOnly){
      // 이음매는 **그림과 확장도안 사이**다 — 그 둘 사이만 메운다.
      //
      // 사용자: "그림이랑 확장 도안 사이를 메꿔야 되는데 칼선 안쪽 빈 픽셀이
      //          메꿔짐 … 칼선 안쪽은 메꾸지 말자는 로직이 안 지켜지고 있잖아"
      //
      // v121 은 이음매를 "칼선에서 안쪽으로 2px" 로 잡았는데 그것이 틀렸다 —
      // 칼선 바깥에 확장도안이 **있든 없든** 무조건 2px 을 채운다. 칼선이 닫아
      // 만든 자리의 둘레에도 칼선은 있으므로, 비어 있어야 할 자리가 메워졌다.
      // 그림 자신의 옅은 가장자리(알파 > 0)를 무조건 채운 것도 같은 잘못이다.
      //
      // 자를 바꾼다: **바로 바깥에 확장도안이 실제로 깔리는 칼선**에서만 안쪽으로
      // 잰다. 주머니 둘레의 칼선은 바깥이 투명하므로 한 겹도 안 채운다.
      // 그러면 "칼선 안쪽은 안 메운다" 가 저절로 지켜진다 — 예외로 남는 것은
      // 바깥의 확장도안과 맞닿은 두 겹뿐이고, 그것이 바로 메워야 할 틈이다.
      const bleedOutside=new Uint8Array(n);
      for(let i=0;i<n;i++){
        if(outerMask[i]||!expandedOuter[i])continue;
        if(baseNoBleed&&baseNoBleed[i])continue;
        if(transparentCutZone&&transparentCutZone[i])continue;
        if(transparentHoleMask&&transparentHoleMask[i])continue;
        bleedOutside[i]=1;
      }
      const seamReach=dilateMask(bleedOutside,w,h,BLEED_SEAM_PX);
      seamInside=new Uint8Array(n);
      for(let i=0;i<n;i++){
        if(!outerMask[i]||!seamReach[i])continue;
        if(transparentCutZone&&transparentCutZone[i])continue;
        if(transparentHoleMask&&transparentHoleMask[i])continue;
        seamInside[i]=1;
      }
      // 닫아 만든 자리를 통째로 삼킨 이음매는 도로 걷는다 (v125)
      unswallowClosedInlets(seamInside,closedInletMask,outerMask,w,h,ppmForSeam);
    }
    for(let i=0;i<n;i++){
      if(objectMask[i])continue;
      // 칼선 **안쪽**인데 그림도 이음매도 밑바닥도 아닌 자리 (v120).
      // 여기는 정말로 아무것도 안 쓴다 — 부드러운 마감조차 안 한다.
      // `allowed` 에서 빼는 것만으로는 모자라다. antialiasBleedEdge 는 active 의
      // 이웃이면 한 겹을 칠하고 extendBleedUnderArtwork 는 그림의 옅은 가장자리를
      // 따라 덧칠하는데, 그 한 겹들이 투명한 자리 둘레에 **얼룩덜룩한 노란 테**로
      // 남는다(v119 에서 실제로 그랬다 — 사용자: "여전히 마감이 부실해").
      // v127 — 가르는 자는 "거기 잉크가 있는가" 다. 알파 문턱이 아니다.
      //
      // 사용자: "확장도안이랑 투명픽셀 제외한 그림 부분은 사이에 빈틈이 없이
      //          붙어 있어야 하고(원래 이게 우리 확장도안 대전제였잖아) 오직
      //          투명 픽셀 있는 부분만 확장도안 색이 칼선을 감싸는 일 없이
      //          밖으로 열려 있어야 해"
      //
      // v120 은 여기를 `objectMask` 로만 갈랐다. objectMask 는 알파 문턱(24)
      // 으로 자른 것이라, 그림의 **안티앨리어싱 띠(알파 9~23)** 가 그물에서
      // 빠져 통째로 hardNoWrite 가 됐다. 그 한 겹 밑에 아무것도 없으니 그림이
      // 반투명한 채로 남고, 밑에 깔린 화이트가 그대로 비쳐 **가닥마다 흰 실선**
      // 이 됐다. 실측(사용자 도안 · 350dpi): 화이트가 꽉 찬 자리 중 인쇄가
      // 흐린 것이 2,260px, 그 전부가 칼선 안쪽이었다.
      //
      // 문턱을 PRINT_VOID_ALPHA(8) 로 낮춘다 — 이 저장소가 v123·v124 에서
      // 이미 "실제로 찍히는가" 의 잣대로 쓰고 있는 값이다. 잉크가 있으면 밑을
      // 받치고(빈틈 없음), 정말로 투명한 자리(알파 <= 8)만 열어 둔다.
      // 거리로 잡으면 안 된다 — v120 에서 "그림 두 겹 · 칼선 두 겹" 으로 재다가
      // 계단 위에서 한 칸씩 켜졌다 꺼져 얼룩졌다. 이것은 거리가 아니라 그 픽셀
      // 자신의 알파다.
      if(outsideOnly&&outerMask[i]&&realVoid&&realVoid[i]
         &&!(seamInside[i]||(insideFillMask&&insideFillMask[i]))){
        noWrite[i]=1;hardNoWrite[i]=1;continue;
      }
      if(transparentHoleMask&&transparentHoleMask[i]){noWrite[i]=1;hardNoWrite[i]=1;continue;}
      // 칼선이 투명한 자리와 맞닿은 구간 (v117). 여백을 안 만들고 그림 밑
      // 덧칠도 안 한다. 다만 **가장자리 한 겹은 부드럽게 마감한다** — 여기서
      // 여백이 0/255 로 딱 끊기면 화면에서 계단으로 보인다(v118).
      if(transparentCutZone&&transparentCutZone[i]){noWrite[i]=1;continue;}
      // v127 — 그림의 '구멍' 중에서도 **진짜 덩어리**만 구멍으로 친다.
      // 가닥과 가닥 사이의 1~2px 짜리 실도 알파로는 구멍이라, `내부 빈 공간
      // 칼선` 이 꺼져 있으면 여기서 통째로 걸러져 한 번도 안 칠해졌다.
      // 그 실이 그대로 남아 가닥마다 투명한 선이 됐다.
      const inHole=holeMask[i]===1&&(!realVoid||realVoid[i]);
      // 칼선 바깥 · 구멍 안(그것도 칼선 바깥이다) · 이음매 두 겹 · 밑바닥 채우기
      const ok=inHole?(includeHoles&&expandedObject[i])
        :(outerMask[i]||expandedOuter[i]);
      if(!ok||(baseNoBleed&&baseNoBleed[i]))continue;
      allowed[i]=1;
      if((protectedTransparentMask&&protectedTransparentMask[i])||(transparentSeedMask&&transparentSeedMask[i])){noWrite[i]=1;hardNoWrite[i]=1;}
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
      // v127 — 잉크가 있는 자리는 **반드시** 불투명하게 받친다.
      //
      // 여태는 `models.valid[i]` 일 때만 받쳤다. 경계 모델을 못 세운 자리
      // (가닥 끝처럼 이웃이 모자란 곳)에서는 받침이 없어, 그림의 안티앨리어싱
      // 가장자리가 반투명한 채로 남고 밑에 깔린 화이트가 그대로 비쳤다.
      // 실측(사용자 도안 · 350dpi): 화이트가 비치는 2,260px 중 96%(2,181px)가
      // 칼선에서 0~1px 안이었고, 인쇄 알파가 100~199 인 것이 1,526px 이었다.
      // 모델이 없으면 **그 픽셀 자신의 색**으로 받친다 — 색을 지어내는 것이
      // 아니라 이미 거기 있는 색이라 테가 생길 수가 없다.
      if(objectMask[i]){printMask[i]=1;
        if(src[t+3]<248){
          if(models.valid[i]){const c=modelColorAt(models,i,x,y,w);od[t]=c[0];od[t+1]=c[1];od[t+2]=c[2];}
          else if(source[i]>=0){const c=propagatedColor(models,source,i,x,y,w,quality);od[t]=c[0];od[t+1]=c[1];od[t+2]=c[2];}
          else {od[t]=src[t];od[t+1]=src[t+1];od[t+2]=src[t+2];}
          od[t+3]=255;
        }
      }
      else if(source[i]>=0&&!noWrite[i]){const c=propagatedColor(models,source,i,x,y,w,quality),meta=modelMetaAt(models,source[i],x,y,w);od[t]=c[0];od[t+1]=c[1];od[t+2]=c[2];od[t+3]=255;printMask[i]=1;active[i]=1;kindMask[i]=meta.kind||2;}
    }
    smoothBleedGradient(out,active,kindMask,w,h,quality==='precise'?4:quality==='balanced'?2:1);
    // 확장색을 원본 쪽으로 2 px 겹쳐 깐 뒤 원본을 다시 올려, 알파 경계에 투명 실선이 남지 않게 합니다.
    extendBleedUnderArtwork(out,active,originalData,w,h,2,noWrite);
    // 확장 도안의 가장 바깥 1 px에 색상 기반 서브픽셀 알파를 추가해
    // 처리 해상도의 계단이 미리보기와 PNG/SVG 래스터에 그대로 보이지 않게 합니다.
    antialiasBleedEdge(out,active,printMask,hardNoWrite,w,h);
    // 칼선 안쪽의 투명한 자리와 맞닿은 가장자리 한 겹은 **그림 자신의 알파**로
    // 끝나게 한다 (v122).
    //
    // 사용자: "여전히 칼선 안쪽 빈 공간 픽셀이 깨지는데"
    //
    // makeBleed 는 그림 픽셀 밑에 불투명한 확장색을 깐다 — 반투명한 면이
    // 인쇄에서 비쳐 보이지 않게 하려는 것이라 대개는 옳다. 그런데 칼선이 닫아
    // 만든 투명한 주머니의 가장자리에서는 그것이 **그림의 안티앨리어싱 경사를
    // 통째로 덮는다.** 알파 24(마스크 문턱) 부터 255 까지 매끄럽게 오르던 것이
    // 0/255 절벽이 되어 확대하면 계단으로 보인다. 실측: 주머니 둘레 1,040px 중
    // 82%가 알파 224~255, 12%가 0 근처 — 중간값이 5% 뿐이었다.
    //
    // 그 한 겹에서만 받침을 걷어낸다. 걷어내면 그 자리에 남는 것은 그림 자신의
    // 가장자리이고, 그것은 이미 부드럽다. **칠하는 것이 아니라 지우는 것**이라
    // v119 처럼 주머니 둘레에 색 테가 생길 수가 없다.
    if(outsideOnly)unbackVoidEdge(out,printMask,outerMask,originalData,w,h,realVoid);
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

  // 칼선이 투명한 자리와 맞닿은 구간에는 재단여백을 만들지 않는다 (v117).
  //
  // 사용자: "칼선 바깥에 투명한 부분이 칼선과 만나는 상태에서도 주변에 노란색이
  //          둘러쳐지네? … 투명 픽셀과 접하는 칼선에는 투명색이 들어가게 해줘"
  //
  // 재단여백은 **그림의 색을 바깥으로 늘려 두는 것**이다. 칼이 조금 빗나가도
  // 인쇄된 그림 옆에 안 찍힌 자리가 안 보이게 하려는 것이다. 그런데 칼선이 닫아
  // 만든 투명 주머니의 입구를 가로지르는 구간에는 늘릴 그림이 없다 — 그 자리는
  // 맑은 아크릴이다. 거기에 색을 깔면 칼이 바깥으로 빗나갔을 때 **투명한 자리에
  // 노란 초승달**이 붙는다. 안쪽으로 빗나가면 투명한 자리가 조금 넓어질 뿐이다.
  //
  // 그래서 규칙은 하나다: **여백은 그림에서 여백 거리보다 멀리 가지 않는다.**
  // 이미 구멍에는 같은 규칙이 걸려 있었다(makeBleed 의 `includeHoles &&
  // expandedObject[i]`). 그것을 구멍 밖으로 넓힌 것뿐이다.
  //
  // 처음에는 "닫아서 생긴 자리(closedInletMask)에 맞닿은 칼선" 으로 잡아 봤는데
  // **외곽 여백이 통째로 사라졌다.** 좁은 홈 자동 연결이 오목한 데를 메우면서
  // 실루엣 둘레에 얇은 띠를 만들고, 그 띠가 전부 "닫아서 생긴 자리" 로 잡히기
  // 때문이다. 거리로 재면 그 띠는 그림에서 몇 px 이라 그대로 살아남는다.
  // 칼선 위의 점이 "그림에서 이만큼 넘게 떨어져 있으면 안쪽이 투명하다".
  // 실측(사용자 도안, ppm 7.43): 칼선 점 1,690개의 **84% 가 0~1px**(좁은 홈
  // 자동 연결이 오목한 데를 메우며 만든 얇은 띠라 사실상 그림에 붙어 있다),
  // **12% 가 9~15px**(주머니 입구를 가로지르는 구간). 사이가 텅 비어 있어
  // 0.3 mm 면 둘을 깨끗이 가른다. mm 로 잡았으므로 해상도가 바뀌어도 같다.
  const CUT_INK_BACKING_MM = 0.3;
  function buildTransparentCutZone(objectMask, silhouetteMask, w, h, bleedPx, ppm) {
    if (!(bleedPx > 0) || !silhouetteMask) return null;
    const n = w * h, backing = Math.max(2, CUT_INK_BACKING_MM * ppm), reach = backing * backing;
    const distanceToArt = distanceToMask(objectMask, w, h, 1);
    // 칼선 위의 점을 둘로 가른다 — 바로 안쪽을 그림이 받쳐 주는가(inkEdge),
    // 아니면 투명한 자리가 이어지는가(openEdge). 좁은 홈 자동 연결이 만든
    // 얇은 띠는 그림에서 몇 px 이라 inkEdge 로 남고, 주머니 입구를 가로지르는
    // 구간만 openEdge 가 된다. 칼선 안쪽의 투명한 속(hole)도 같은 자로 잡는다.
    const openEdge = new Uint8Array(n), inkEdge = new Uint8Array(n), hole = new Uint8Array(n);
    let opens = 0, holes = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (!silhouetteMask[i] || objectMask[i]) continue;
      const open = distanceToArt[i] > reach;
      if (open) { hole[i] = 1; holes++; }
      // 대지 밖도 "바깥" 으로 친다 — 그림이 대지 끝에 닿아 있을 때를 위해서다
      const onCut = (x === 0 || !silhouetteMask[i - 1]) || (x === w - 1 || !silhouetteMask[i + 1])
        || (y === 0 || !silhouetteMask[i - w]) || (y === h - 1 || !silhouetteMask[i + w]);
      if (!onCut) continue;
      if (open) openEdge[i] = 1; else inkEdge[i] = 1;
    }
    // 그림에 붙은 칼선도 칼선 위에 있다 — 위 반복문은 그림 픽셀을 건너뛰므로 따로 모은다
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (!silhouetteMask[i] || !objectMask[i]) continue;
      const onCut = (x === 0 || !silhouetteMask[i - 1]) || (x === w - 1 || !silhouetteMask[i + 1])
        || (y === 0 || !silhouetteMask[i - w]) || (y === h - 1 || !silhouetteMask[i + w]);
      if (onCut) inkEdge[i] = 1;
    }
    if (!opens && !holes) return null;

    // 남길 여백은 **잉크가 받쳐 주는 칼선에서 여백 거리 안**이다. 원들의 합집합이라
    // 경계가 매끄럽고 둥근 마감으로 끝난다. 다만 입구 언저리의 잉크 쪽 칼선까지
    // 원을 그리면 그 원들이 입구 앞을 도로 덮어 버린다(v118 에서 실제로 그랬다 —
    // 사용자: "다시 확장색으로 거의 둘러졌어"). 그래서 **입구에서 여백 거리 안에
    // 있는 잉크 쪽 칼선은 빼고** 원을 그린다. 여백이 입구 쪽으로 갈수록 매끄럽게
    // 잦아들어 없어진다.
    const openReach = dilateMask(openEdge, w, h, bleedPx + 1);
    const inkCore = new Uint8Array(n);
    for (let i = 0; i < n; i++) if (inkEdge[i] && !openReach[i]) inkCore[i] = 1;
    const inkReach = dilateMask(inkCore, w, h, bleedPx + 1);
    const outer = new Uint8Array(n);
    let any = false;
    for (let i = 0; i < n; i++) {
      if (objectMask[i] || hole[i] || inkReach[i] || !openReach[i]) continue;
      outer[i] = 1; any = true;
    }
    return { outer: any ? outer : null, hole: holes ? hole : null };
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

  // 화이트는 마스크가 1 인 곳을 전부 알파 255 로 칠했다. 그런데 그 마스크는
  // "알파가 0 보다 크면" 전부 포함하므로, 안티앨리어싱의 가장 옅은 픽셀
  // 하나까지 완전 불투명 화이트가 됐다. 그래서 부드럽던 경계 바깥으로 화이트가
  // 계단처럼 삐져나와 지저분해 보였다.
  // solidMask(재단여백 등 원래 꽉 차야 하는 곳)가 아닌 자리는 그림의 알파를
  // 그대로 따라가게 해서, 화이트도 같이 부드럽게 잦아들게 한다.
  //
  // v78: 여기까지 와도 화이트 가장자리는 여전히 계단이었다. 마스크가 0/1
  // 이분법이라 경계에서 알파가 255 → 0 으로 한 칸에 떨어지기 때문이다.
  // 실측(선화 도안, 965px): 그림 레이어의 알파 급변은 72곳인데 화이트는
  // 24,189곳이었고, 그 알파 쌍의 99% 가 (255, 0) — 순수 이분법 경계다.
  // 그래서 마스크 가장자리에 **덮임 비율**을 넣는다. 3×3 이웃에서 마스크가
  // 차지하는 비율이 곧 그 픽셀의 덮임이다. 안쪽은 1 이라 아무것도 안 바뀌고,
  // 가장자리 한 겹만 부드럽게 잦아든다. 화이트가 밖으로 자라지 않도록
  // 마스크 안쪽에만 칠한다 — 커지는 것보다 1px 작아지는 편이 안전하다.
  const WHITE_COVERAGE_RADIUS=2;   // 3×3 은 곧은 가장자리에서 0.67 까지밖에 안 내려가 계단이 남는다
  function maskCoverage(mask,w,h,radius=WHITE_COVERAGE_RADIUS){
    const cov=new Float32Array(mask.length);
    const r=Math.max(1,Math.round(radius));
    for(let y=0;y<h;y++){
      for(let x=0;x<w;x++){
        const i=y*w+x;
        if(!mask[i])continue;
        let hit=0,seen=0;
        for(let dy=-r;dy<=r;dy++){
          const ny=y+dy; if(ny<0||ny>=h)continue;
          for(let dx=-r;dx<=r;dx++){
            const nx=x+dx; if(nx<0||nx>=w)continue;
            seen++; if(mask[ny*w+nx])hit++;
          }
        }
        cov[i]=seen?hit/seen:1;
      }
    }
    return cov;
  }

  // ── 화이트를 마스크가 아니라 **패스**로 만든다 (v82) ─────────────────────
  // v70~v81 의 화이트는 마스크였다. 알파는 인쇄 결과의 픽셀 알파를 그대로
  // 따르고, 가장자리만 5×5 덮임 비율로 눌렀다. 그래서 도안 알파가 부슬부슬한
  // 만큼 화이트도 부슬부슬했고, 몇 픽셀짜리 구멍이 그대로 뚫려 있었다.
  //
  // 이제는 마스크에서 윤곽을 떠서(traceContours) 기하적으로 다듬은 뒤
  // 캔버스에 채운다. 캔버스 fill 은 진짜 안티앨리어싱을 주므로 결과가
  // 곧 "깔끔한 패스"다. 칼선과 같은 리샘플·저역통과를 쓰되 앵커 간격은
  // 훨씬 촘촘하게 잡는다 — 칼선용 0.42mm 간격은 지름 1mm 짜리 점의 둘레가
  // 8 앵커에 못 미쳐 통째로 사라진다.
  const WHITE_FEATURE_MM = 0.2;    // 이보다 작은 섬·구멍은 패스에서 지운다
  const WHITE_SMOOTH_MM  = 0.45;   // 가장자리 저역통과 반경 (v87: 0.18 → 0.45)
  const WHITE_ANCHOR_MM  = 0.22;   // 앵커 간격 (칼선의 0.42mm 보다 촘촘)
  // 화이트는 그림 **밖으로 나가면 안 된다**. 안으로 이만큼 오므린다.
  // 사용자: "1픽셀 정도 안으로 들어가는 건 괜찮은데 나오는 건 안 괜찮거든."
  const WHITE_CHOKE_MM = 0.14;     // ppm 7.4 에서 1px, 300dpi 에서 약 1.7px
  const WHITE_SOLID_ALPHA = 128;   // 이 위는 "단단함" 으로 보고 화이트를 꽉 깐다
  const WHITE_VECTOR_TOLERANCE = 0.002;  // 벡터 패스가 래스터와 이만큼까지 어긋나도 봐준다
  const WHITE_RAMP_MM = 0.7;       // 이보다 얇은 반투명 띠는 진짜 면이 아니라 가장자리 램프다

  // 8-이웃으로 잇는다. 4-이웃이면 대각선으로만 붙은 획이 끊겨 섬으로 세어진다.
  const WHITE_NB8=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  function labelRegions(test,w,h){
    const n=w*h,label=new Int32Array(n).fill(-1),areas=[],edge=[],stack=new Int32Array(n);
    for(let s=0;s<n;s++){
      if(label[s]>=0||!test(s))continue;
      const id=areas.length;let top=0,count=0,touches=false;
      stack[top++]=s;label[s]=id;
      while(top>0){
        const i=stack[--top];count++;
        const x=i%w,y=(i-x)/w;
        if(x===0||y===0||x===w-1||y===h-1)touches=true;
        for(const[dx,dy]of WHITE_NB8){
          const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h)continue;
          const ni=ny*w+nx;if(label[ni]>=0||!test(ni))continue;
          label[ni]=id;stack[top++]=ni;
        }
      }
      areas.push(count);edge.push(touches);
    }
    return{label,areas,edge};
  }

  // 작은 구멍만 메운다 (섬은 건드리지 않는다).
  // 작은 구멍을 메운다 — 다만 **인쇄가 실제로 뚫려 있는 구멍은 건드리지 않는다** (v124).
  //
  // 사용자: "그림에는 투명하게 뚫려 있는데 화이트가 막은 부분이야. 칼선 보면
  //          이런 부분이 정상적으로 뚫리게 되거든"
  //
  // 원래 뜻은 "인쇄소가 못 찍는 좁쌀 구멍은 패스에서 지운다" 였는데, 넓이만
  // 보느라 **그림에도 뚫려 있고 칼선도 뚫는 구멍**까지 같이 메웠다. 화이트만
  // 막히니 잘라 낸 투명한 자리에 흰 판이 남는다.
  //
  // 그래서 구멍마다 그 자리의 인쇄 알파를 본다. 하나라도 실제로 찍히는 픽셀이
  // 있으면 그것은 마스크의 잡티이므로 메우고, 통째로 비어 있으면 진짜 구멍이니
  // 크기와 무관하게 살린다. 판정 문턱은 PRINT_VOID_ALPHA 하나를 같이 쓴다.
  function fillTinyHoles(mask,w,h,minArea,printData=null){
    const out=new Uint8Array(mask),bg=labelRegions(i=>out[i]===0,w,h);
    let openHoles=null;
    if(printData){
      // 구멍마다 "인쇄가 있는가" 를 한 번에 모은다
      const inked=new Uint8Array(bg.areas.length);
      const d=printData.data;
      for(let i=0;i<out.length;i++){
        const id=bg.label[i];
        if(id>=0&&!inked[id]&&d[i*4+3]>PRINT_VOID_ALPHA)inked[id]=1;
      }
      openHoles=inked;
    }
    for(let i=0;i<out.length;i++){
      const id=bg.label[i];
      if(id<0||bg.edge[id]||bg.areas[id]>=minArea)continue;
      if(openHoles&&!openHoles[id])continue;   // 진짜로 뚫린 구멍이다 — 그대로 둔다
      out[i]=1;
    }
    return out;
  }

  // 작은 섬을 지우고 작은 구멍을 메운다. 사용자가 말한 "구멍은 몇 픽셀보다
  // 훨씬 큰" 상태를 여기서 만든다.
  function cleanMaskForPath(mask,w,h,minArea){
    const out=new Uint8Array(mask);
    const fg=labelRegions(i=>out[i]===1,w,h);
    for(let i=0;i<out.length;i++){
      const id=fg.label[i];
      if(id>=0&&fg.areas[id]<minArea)out[i]=0;
    }
    return fillTinyHoles(out,w,h,minArea);
  }

  // 칼선의 conditionCutContour 와 같은 흐름이되, 칼선 다듬기 설정(0 일 수 있다)에
  // 기대지 않고 화이트에는 늘 약한 다듬기를 준다. 화이트가 깔끔해야 하는 이유는
  // 칼선 취향과 무관하기 때문이다.
  function smoothWhiteContour(points,ppm){
    if(!points||points.length<6)return points?points.slice():[];
    const fine=clamp(AUTO_CUT_RESAMPLE_MM*ppm,.5,1.05);
    const reference=resampleClosedPath(points,fine);
    if(reference.length<6)return reference;
    // 상한이 px 로 묶여 있으면 **해상도가 높을수록 다듬기가 약해진다.**
    // 반경 10 · 앵커 3px 에서 saturate 해서, 큰 그림일수록 몇 픽셀짜리
    // 요동이 그대로 남았다. 사용자가 본 "지저분한 선" 이 이것이다.
    // 상한을 물리 단위에 맞게 크게 잡아 비례가 유지되게 한다.
    const radius=clamp(Math.round((WHITE_SMOOTH_MM*ppm)/fine),2,60);
    let out=reference.map(p=>({...p}));
    for(let i=0;i<3;i++)out=circularLowPass(out,radius,i===2?.58:.72);
    out=preserveContourArea(reference,out);
    const anchor=clamp(WHITE_ANCHOR_MM*ppm,1.2,16);
    const anchored=resampleClosedPath(out,anchor);
    return anchored.length>=4?anchored:out;
  }

  // 다듬은 패스를 캔버스에 채우고 알파만 읽어 온다. 이 알파가 화이트의 기하다.
  function maskPathAlpha(mask,w,h,ppm){
    if(!(ppm>0))return null;
    const minArea=Math.max(4,Math.round(Math.PI*(WHITE_FEATURE_MM*ppm)*(WHITE_FEATURE_MM*ppm)));
    const cleaned=cleanMaskForPath(mask,w,h,minArea);
    const contours=traceContours(cleaned,w,h)
      .filter(p=>Math.abs(polygonArea(p))>2)
      .map(p=>smoothWhiteContour(p,ppm))
      .filter(p=>p.length>=4&&Math.abs(polygonArea(p))>1);
    if(!contours.length)return null;
    const c=makeCanvas(w,h),cc=c.getContext('2d',{willReadFrequently:true});
    cc.imageSmoothingEnabled=true;cc.imageSmoothingQuality='high';
    cc.beginPath();
    for(const path of contours)drawPath(cc,path,1,1,0,0,AUTO_CUT_CURVE);
    cc.fillStyle='#fff';cc.fill('evenodd');
    const d=cc.getImageData(0,0,w,h).data,out=new Uint8ClampedArray(w*h);
    for(let i=0;i<out.length;i++)out[i]=d[i*4+3];
    // 윤곽도 함께 돌려준다 (v99). 여태 이 자리에서 만들고 버렸는데,
    // v98 에서 화이트가 0/1 이 된 지금은 이것이 곧 **화이트의 모양**이라
    // PDF·AI·SVG 에 벡터 패스로 그대로 실을 수 있다.
    return {alpha:out,contours};
  }


  // 화이트의 기하 마스크를 만든다 — 안쪽으로 오므리되 **얇은 것은 지키면서**.
  //
  // v87 은 그냥 침식했다. 그러면 폭이 2×반경보다 얇은 것은 통째로 사라진다.
  // 사용자 v87 내보내기 실측: 그림은 진한데 화이트가 없는 자리 1,202px
  // (262 덩어리, 큰 것 46px) — 가는 머리카락 밑의 화이트가 통째로 없어졌다.
  // 안쪽 구멍도 반경만큼 넓어져(8,866px, 그중 1,322px 에 그림이 있었다)
  // 메우기 문턱을 넘어 그대로 뚫렸다.
  //
  //   ① 작은 구멍을 **먼저** 메운다 (뒤에 메우면 침식이 이미 넓혀 놓는다)
  //   ② 열기(opening) = 팽창(침식(mask)) — 침식이 살려 낼 수 있는 부분
  //   ③ 얇아서 잃는 것(lost) = mask − opening
  //   ④ 기하 = 침식 ∪ 잃는 것
  //
  // 두꺼운 곳은 lost 가 비어 침식만 남아 오므라들고, 얇은 곳은 침식이 비어
  // lost 가 통째로 살아나 폭을 지킨다.
  function chokeMaskForWhite(mask,w,h,ppm,printData=null){
    if(!(ppm>0))return mask;
    const minArea=Math.max(4,Math.round(Math.PI*(WHITE_FEATURE_MM*ppm)*(WHITE_FEATURE_MM*ppm)));
    const base=fillTinyHoles(mask,w,h,minArea,printData);
    const chokePx=Math.max(1,Math.round(WHITE_CHOKE_MM*ppm));
    const eroded=erodeMask(base,w,h,chokePx);
    const opening=dilateMask(eroded,w,h,chokePx);
    const out=new Uint8Array(base.length);
    for(let i=0;i<base.length;i++) out[i]=(eroded[i]||(base[i]&&!opening[i]))?1:0;
    return out;
  }

  // ── 벡터 패스가 실제 화이트와 같은지 대조한다 (v99) ────────────────
  //
  // 화이트를 벡터로 내보내려면 "패스를 채운 것 = 래스터 화이트" 가 참이어야
  // 한다. 코롯토는 화이트가 곧 그 패스를 채운 것이라 참이지만, **스티커
  // 대지**는 낱장을 겹쳐 붙이면서 destination-out 으로 앞 장의 화이트를
  // 파내기도 한다(겹칠 때). 그러면 패스 합집합이 결과와 달라진다.
  //
  // 그래서 만들 때 한 번 그려 보고 대조한다. 어긋나면 그 레이어는 벡터를
  // 포기하고 이미지로 내보낸다 — 조용히 틀리게 나가는 것보다 낫다.
  // 실측값은 결과에 whiteVectorMismatch 로 실어 둔다.
  function whitePathsMatch(paths,canvas,w,h,report=null){
    if(!paths||!paths.length||!canvas)return false;
    const probe=makeCanvas(w,h),pc=probe.getContext('2d',{willReadFrequently:true});
    pc.imageSmoothingEnabled=true;pc.imageSmoothingQuality='high';
    pc.beginPath();
    for(const path of paths)drawPath(pc,path,1,1,0,0,AUTO_CUT_CURVE);
    pc.fillStyle='#fff';pc.fill('evenodd');
    const a=pc.getImageData(0,0,w,h).data;
    const b=canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,w,h).data;
    let diff=0,on=0;
    for(let i=0;i<w*h;i++){
      const va=a[i*4+3],vb=b[i*4+3];
      if(va>=128||vb>=128)on++;
      if(Math.abs(va-vb)>64)diff++;      // 알파 4분의 1 넘게 어긋난 픽셀
    }
    const ratio=on?diff/on:1;
    if(report){report.on=on;report.diff=diff;report.ratio=ratio;}
    return on>0&&ratio<=WHITE_VECTOR_TOLERANCE;
  }

  // out 을 주면 out.paths 에 화이트의 윤곽(벡터 패스)을 담아 준다 (v99).
  function whiteCanvasFromMask(mask,w,h,artworkData=null,solidMask=null,ppm=0,out=null){
    const c=makeCanvas(w,h),ctx=c.getContext('2d'),id=ctx.createImageData(w,h);
    const src=artworkData?artworkData.data:null;
    // v82~v86 은 기하를 **알파가 0 보다 큰 모든 픽셀**에서 땄다. 그래서 그림
    // 가장자리의 부슬부슬한 프린지가 통째로 화이트에 들어갔고, 거기에 반경 2
    // 최대필터(천장)까지 곱해 바깥으로 2px 더 번졌다.
    // 이제는 마스크를 먼저 **안쪽으로 오므려** 그 위에서 패스를 딴다.
    // v87 은 그냥 침식했다. 그러면 **폭이 2×침식반경보다 얇은 것은 통째로
    // 사라진다** — 가는 머리카락 밑의 화이트가 없어지고, 안쪽 구멍은 반경만큼
    // 넓어져 메우기 문턱을 넘어 그대로 뚫렸다.
    // 실측(사용자 v87 내보내기): 그림은 진한데 화이트가 없는 자리 1,202px
    // (262 덩어리), 화이트 안쪽 구멍 8,866px 중 1,322px 에 그림이 있었다.
    //
    // 그래서 **두꺼운 곳만 오므리고 얇은 곳은 그대로 둔다.**
    //   열기(opening) = 팽창(침식(mask))  — 침식이 살려 낼 수 있는 부분
    //   잃는 것(lost)  = mask − opening    — 얇아서 침식이 지워 버리는 부분
    //   기하 = 침식 ∪ 잃는 것
    // 두꺼운 곳에서는 lost 가 비어 침식만 남고(오므라들고), 얇은 곳에서는
    // 침식이 비어 lost 가 통째로 살아난다(폭을 지킨다).
    const geoMask=chokeMaskForWhite(mask,w,h,ppm,artworkData);
    const traced=maskPathAlpha(geoMask,w,h,ppm);
    const pathAlpha=traced?traced.alpha:null;
    if(out)out.paths=traced?traced.contours:null;
    // ppm 을 못 받았거나 패스가 안 나오면 v81 의 덮임 비율로 물러선다.
    const cov=pathAlpha?null:maskCoverage(mask,w,h);
    for(let i=0;i<mask.length;i++){
      // 하드 게이트 — 원래 마스크 밖으로는 한 픽셀도 안 나간다.
      if(!mask[i])continue;
      const geo=pathAlpha?pathAlpha[i]:Math.round(255*cov[i]);
      if(geo<=0)continue;
      let a=geo;
      if(src){
        // 화이트는 **깔거나 안 깔거나** 둘 중 하나다 (v98).
        //
        // v70~v97 은 진짜 반투명 면 밑에 알파를 **비례로** 깔았다. 그런데
        // 이 앱의 화이트는 애초에 그 선택을 두 장으로 나눠 두고 있다 —
        // "화이트" 와 "화이트 · 반투명 면 제외". 사용자: "반투명 면 밑에는
        // 화이트가 아예 없거나 있어야 하는데? 그 두 옵션이 그거야."
        // 비례로 까는 계산은 그 위에 얹힌 세 번째 답이라, 어느 쪽도 아닌
        // 어정쩡한 결과를 냈다.
        //
        // 그래서 걷어냈다. 이제 화이트는 패스가 정한 모양 그대로 0 아니면
        // 꽉 참이고, 반투명 면을 뺄지는 **어느 마스크로 부르느냐**로만
        // 정해진다(full / opaque). 덤으로 화이트가 순수한 0/1 모양이 되어
        // 벡터 패스로 내보낼 수 있게 됐다.
        // 문턱이 0 이면 알파 1~8 짜리 "안 보이는 잉크" 위에도 화이트가 꽉
        // 찬다 (v123 실측: 21px). 인쇄가 사실상 없는 자리에는 화이트도 없다.
        const av=src[i*4+3];
        if(av<=PRINT_VOID_ALPHA&&!(solidMask&&solidMask[i])) a=0;
      }
      if(a<=0)continue;
      const t=i*4;
      id.data[t]=255;id.data[t+1]=255;id.data[t+2]=255;id.data[t+3]=a;
    }
    ctx.putImageData(id,0,0);return c;
  }

  function alphaLayerMasks(imageData,ppm=0) {
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
    // "이건 그냥 가장자리 램프인가" 를 가르는 두께 (v97).
    //
    // 여태 이 판정이 coreRadius(2~4px)에 묶여 있었다. 또렷한 선화의 램프는
    // 1~3px 이라 그걸로 충분했지만, **부들부들한 선**은 램프가 8~15px 이다.
    // 그러면 램프 한복판이 "투명에서도 불투명에서도 멀다" 로 읽혀 통째로
    // 진짜 반투명 면으로 인정되고, 그 위에 화이트를 비례로 깔면 그림의
    // 잡음이 그대로 화이트에 옮겨 붙는다 — 사용자가 본 안쪽 구멍 둘레의
    // 지저분한 회색 띠가 이것이다.
    //   실측(합성 · 구멍 램프 7px + 잡음 3px): 안쪽 구멍이 4개여야 하는데
    //   49개로 쪼개졌고, 구멍 둘레의 거친 곳이 22.1%(바깥은 0.06%)였다.
    //   비례 적용을 빼면 구멍 4개 · 거친 곳 0.00% 로 바깥과 같아진다.
    //
    // 그래서 이 두께를 화이트의 다른 값들처럼 **물리 단위**로 잡는다.
    // 이보다 얇은 반투명 띠는 램프로 보고, 두꺼운 것만 진짜 면으로 본다.
    const rampPx=ppm>0?Math.max(coreRadius,Math.round(WHITE_RAMP_MM*ppm)):coreRadius;
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
          const nearBoth=distToTransparent[i]<=Math.pow(rampPx+.35,2)&&distToOpaque[i]<=Math.pow(rampPx+1.15,2);
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
        const nearBoth=distToTransparent[i]<=Math.pow(rampPx+.35,2)&&distToOpaque[i]<=Math.pow(rampPx+1.15,2);
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

  function buildWhiteLayerMasks(baseMask,imageData,excludedMask=null,ppm=0){
    const alpha=alphaLayerMasks(imageData,ppm);
    let full=unionMask(baseMask,alpha.visible),opaque=subtractMask(full,alpha.semi);
    if(excludedMask){full=subtractMask(full,excludedMask);opaque=subtractMask(opaque,excludedMask);}
    return {full,opaque,semiMask:alpha.semi,semiCount:alpha.semiCount,semiRegionCount:alpha.regionCount,hasSemiTransparent:alpha.regionCount>0};
  }

  function extendBleedUnderArtwork(imageData,activeMask,originalData,w,h,radius=2,noWrite=null){
    const r=Math.max(1,Math.round(radius));
    if(!activeMask.some(Boolean))return 0;
    const target=dilateMask(activeMask,w,h,r),d=imageData.data,src=new Uint8ClampedArray(d),od=originalData.data;let painted=0;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      // noWrite 는 "여기엔 아무것도 쓰지 마라" 다. 그림의 옅은 가장자리라도
      // 투명해야 하는 자리면 건너뛴다 (v117).
      const i=y*w+x,t=i*4;if(!target[i]||od[t+3]===0||activeMask[i]||(noWrite&&noWrite[i]))continue;
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





  function normalizedVector(x,y,fallback={x:1,y:0}){const l=Math.hypot(x,y);return l>1e-7?{x:x/l,y:y/l}:{...fallback};}







  // RDP가 줄인 꼭짓점을 그대로 직선으로 잇지 않고, 원본 외곽에 맞춘 cubic Bézier의 오차가
  // 커지는 구간에만 제어용 앵커를 되돌려 넣습니다. 따라서 점 수는 줄면서도 곡선 추세는 유지됩니다.



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
    const smoothMm=cutSmoothMm();
    if(smoothMm<=0)return reference;            // 0 이면 다듬지 않는다
    const radius=clamp(Math.round((smoothMm*ppm)/fineSpacing),2,24);
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

  // ══════════════════════════════════════════════════════════════════
  // 칼선 고정점 줄이기 (v110)
  //
  // 사용자: "칼선 레이어 지금 너무 고정점이 많은데 이거 베지에로 원본 곡률이랑
  //          거의 동일하게 단순화 못하나?"
  //
  // 칼선은 픽셀 윤곽에서 나오므로 점이 픽셀 수만큼 있었다(400px 시험 도안에서
  // 675개). curve-fit.js 가 허용 오차 안에서 3차 베지에로 다시 맞춘 결과를
  // 여기에 붙여 두면, **미리보기·PNG·SVG·PDF·AI·가이드가 전부 같은 것을 쓴다.**
  // 한 군데서만 바꾸면 화면과 파일이 어긋난다 — v99 에서 겪은 일이다.
  const CUT_SIMPLIFY_DEFAULT_MM = 0.05;
  function attachSimplifiedCurves(paths, ppm, mm) {
    const api = typeof window !== 'undefined' ? window.GoodsMakerCurveFit : null;
    if (!api || !paths?.length) return { fitted: 0, before: 0, after: 0, maxErrorMm: 0 };
    const tolerance = Number(mm);
    let before = 0, after = 0, fitted = 0, worst = 0;
    for (const path of paths) {
      try { Object.defineProperty(path, '_fitSegments', { value: null, writable: true, configurable: true, enumerable: false }); }
      catch (_) { path._fitSegments = null; }
      before += path.length;
      if (!(tolerance > 0) || path.length < 8) { after += path.length; continue; }
      const beziers = api.fitClosedPath(path, { maxError: tolerance * ppm });
      if (!beziers || beziers.length >= path.length) { after += path.length; continue; }
      const deviation = api.measureDeviation(path, beziers, 0.25);
      // 실제로 얼마나 벗어났는지 재서, 넘으면 그 칼선은 원래대로 둔다.
      // 모양이 먼저다. 픽셀 눈금 한 칸(1px)은 원래 윤곽에도 있는 오차라 얹어 준다.
      if (!(deviation.max <= tolerance * ppm + 1)) { after += path.length; continue; }
      path._fitSegments = beziers.map(b => ({ p0: b[0], c1: b[1], c2: b[2], p1: b[3], linear: false }));
      after += beziers.length;
      fitted++;
      worst = Math.max(worst, deviation.max / ppm);
    }
    return { fitted, before, after, maxErrorMm: worst };
  }
  // 자를 수 없는 가는 골짜기 메우기 (v114). 화면의 스위치 하나로 켜고 끈다.
  // 수치는 인쇄 현장 기준으로 고정한다 — 폭 4mm 아래이면서 깊이가 폭의 3배를
  // 넘는 골짜기는 칼이 들어갈 수 없다. 스티커·코롯토가 같은 값을 쓴다.
  const CUT_SLIT_MAX_WIDTH_MM = 4;
  const CUT_SLIT_MIN_ASPECT = 3;
  function cutSlitFillOn() { return els.cutSlitFill ? !!els.cutSlitFill.checked : true; }
  function cutSlitOptions() { return { maxWidthMm: CUT_SLIT_MAX_WIDTH_MM, minAspect: CUT_SLIT_MIN_ASPECT }; }

  function cutSimplifyMm() {
    const value = Number(els.cutSimplifyMm?.value);
    return Number.isFinite(value) ? clamp(value, 0, 0.5) : CUT_SIMPLIFY_DEFAULT_MM;
  }

  function curveSegments(path, smoothAmount = AUTO_CUT_CURVE) {
    if (path && path._fitSegments) return path._fitSegments;
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
      const targetMaxPx=getProcessingMaxDimension(),ppm=Number.isFinite(printExportPpmOverride)?printExportPpmOverride:clamp(targetMaxPx/Math.max(boardWidthMm,boardHeightMm),2.2,12),coreW=Math.max(24,Math.round(boardWidthMm*ppm)),coreH=Math.max(24,Math.round(boardHeightMm*ppm));
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
      // 대지 좌표를 원본 이미지 좌표로 되돌리려면 이 배치가 필요하다(배경 지우기의 입구 잠금).
      const artworkPlacement={dx,dy,drawW,drawH,sx:trim.sx,sy:trim.sy,sw:trim.sw,sh:trim.sh};
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

      const baseMode=state.borderlessBaseMode||(state.borderlessBaseLevel?'level':'keep');
      let manualBase=null;
      // 직접 지정: 좌·우 최저점을 찾지 않는다. 바닥선 높이와 가로 범위만 쓴다.
      if(style==='borderless'&&flatBase&&baseMode==='manual'&&outerPaths.length){
        manualBase=buildManualBaseMask(rawObjectMask,w,h,ppm,{
          liftMm:clamp(num(els.baseLiftMm,0),0,15),
          widthMm:clamp(num(els.manualBaseWidthMm,0),0,300),
          offsetMm:clamp(num(els.manualBaseOffsetMm,0),-150,150)
        });
        if(manualBase){
          const based=traceContours(manualBase.mask,w,h);
          const basedOuter=based.filter(p=>polygonArea(p)>0);
          if(basedOuter.length){
            outerPaths=basedOuter;imageHolePaths=based.filter(p=>polygonArea(p)<0);
            const cutContours=traceContours(manualBase.cutMask,w,h).filter(p=>polygonArea(p)>0);
            unbasedOuterPaths.length=0;
            for(const path of cutContours)unbasedOuterPaths.push(path.map(q=>({...q})));
            base=manualBase.base;
          }else manualBase=null;
        }
      }
      // 무테 밑바닥은 가장 아래로 돌출된 좌·우 부분만 연결하며, 직선 양옆에는 새 투명 영역을 만들지 않습니다.
      else if(style==='borderless'&&flatBase&&outerPaths.length&&bottomAnalysis){
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
      if(style==='borderless'&&flatBase&&baseMode==='manual'){
        els.baseSlopeStatus.textContent=manualBase
          ? `밑바탕 가로 ${manualBase.widthMm.toFixed(1)} mm · 채운 픽셀 ${manualBase.added.toLocaleString()}개`
            +`${manualBase.cut?` · 바닥선 아래 ${manualBase.cut.toLocaleString()}개 잘라냄`:''}`
            +`${clamp(num(els.baseLiftMm,0),0,15)<=0?' · 바닥선 높이가 0 이라 그림 맨 아래에 붙어 있습니다':''}`
          : '밑바탕을 만들 자리를 찾지 못했습니다. 가로 폭·위치를 그림 안쪽으로 옮겨 보세요.';
      }else if(style==='borderless'&&flatBase){
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
      // 칼선을 닫기 **전**의 실루엣. 아래 세 단계(좁은 홈 자동 연결 · 입구 잠금 ·
      // 두 지점 닫기)가 늘린 몫이 곧 "칼선이 닫아서 갇힌 투명 영역" 이다 (v104).
      const silhouetteBeforeClose=new Uint8Array(baseSilhouetteMask);
      let narrowInletPixels=0;
      // 유테는 기존처럼 기본 4 mm(사용자가 조정 가능). 무테는 원래 이 보정이
      // 없었으므로 기본값 0(끔)으로 두어, 값을 직접 올리기 전까지는 그림 외곽을
      // 그대로 따르는 예전 동작과 똑같이 나옵니다.
      // v113: 무테 기본값을 0 → 1.2mm. 0 은 "칼선이 실루엣에 딱 붙는다" 를 지키려던
      // 것이었지만, 그 탓에 머리카락 가닥 사이의 **실 같은 홈**이 그대로 남아
      // 칼선이 길게 튀어 들어갔다 나온다(자를 수도 없는 모양이다).
      // 1.2mm 는 1mm 아래 실만 메우고 4mm 짜리 일부러 벌린 홈은 건드리지 않는다.
      const acrylicNarrowGapMm=clamp(num(style==='bordered'?els.acrylicNarrowGapMm:els.acrylicBorderlessNarrowGapMm,style==='bordered'?4:1.2),0,20);
      if(acrylicNarrowGapMm>0){
        // 재단이 어려운 좁은 홈은 도안 자체의 유테 외곽에서 먼저 정리합니다.
        // 밑받침을 합친 뒤 실행하면 `빈 공간 유지`로 만든 받침 위의 통로까지
        // 좁은 홈으로 오인해 메우므로, 받침과 칼선이 달라붙어 보이게 됩니다.
        // (무테는 밑바닥이 이 시점 이전에 이미 외곽에 합쳐져 있어 같은 문제가 없습니다.)
        const bridged=bridgeNarrowCutInlets(baseSilhouetteMask,w,h,ppm,acrylicNarrowGapMm);
        baseSilhouetteMask=bridged.mask;narrowInletPixels=bridged.addedPixels;
      }
      // 기준(mm)만으로는 못 거르는 것이 남는다 — 기준보다 조금 넓지만 아주 깊은
      // 골짜기다. 폭이 아니라 **폭 대 깊이의 비**로 한 번 더 거른다 (v114).
      const acrylicSlit=cutSlitFillOn()
        ? bridgeSlitInlets(baseSilhouetteMask,w,h,ppm,cutSlitOptions())
        : {mask:baseSilhouetteMask,addedPixels:0,filled:0};
      baseSilhouetteMask=acrylicSlit.mask;narrowInletPixels+=acrylicSlit.addedPixels;
      // 사용자가 찍은 입구 잠금 지점은 기준(mm)과 무관하게 그 자리만 닫는다.
      // 좁은 홈 보정 뒤에 두는 이유: 이미 메워진 입구를 다시 계산할 필요가 없고,
      // 기준을 넘어 남아 있는 입구만 대상이 되기 때문이다.
      const acrylicSeal=sealInletsAtPoints(baseSilhouetteMask,w,h,ppm,sealPointsFor('acrylic'),
        point=>({x:point.xMm*ppm+pad,y:point.yMm*ppm+pad}));
      baseSilhouetteMask=acrylicSeal.mask;
      // 두 지점 닫기는 입구 잠금 다음이다. 잠금이 이미 메운 자리는 곡선을 그려도
      // 더 채울 것이 없어 added 0 으로 조용히 지나간다.
      const acrylicBridge=applyCutBridges(baseSilhouetteMask,w,h,ppm,cutBridgesFor('acrylic'),
        point=>({x:point.xMm*ppm+pad,y:point.yMm*ppm+pad}));
      baseSilhouetteMask=acrylicBridge.mask;
      const sealedInletPixels=acrylicSeal.addedPixels+acrylicBridge.addedPixels;
      // 칼선이 닫아서 갇힌 투명 영역 (v104).
      //
      // 사용자: "칼선 입구 닫기로 칼선 닫았으면 내부 빈 공간 칼선 해제 상태일
      // 경우 자동 칼선 따졌을 때랑 마찬가지로 닫힌 투명부분은 색 확장 안
      // 채워지게 해줘"
      //
      // 그림 자체의 구멍(imageHoleMask)은 `내부 빈 공간 칼선` 이 꺼져 있으면
      // 확장색을 안 깐다 — makeBleed 의 `includeHoles && ...` 가 그것이다.
      // 그런데 입구를 닫아 새로 갇힌 자리는 그 목록에 없다. 그림의 알파에서
      // 뜬 것이 아니라 **칼선이 만들어 낸** 구멍이기 때문이다. 그래서 같은
      // 자리인데도 한쪽은 비고 한쪽은 색이 차 있었다.
      //
      // 셋(좁은 홈 자동 연결 · 입구 잠금 · 두 지점 닫기)을 다 같이 본다.
      // 무엇이 닫았든 결과는 "칼선 안쪽의 갇힌 투명 영역" 으로 똑같다.
      const closedInletMask=new Uint8Array(w*h);
      let closedInletPixels=0;
      for(let i=0;i<w*h;i++){
        if(!baseSilhouetteMask[i]||silhouetteBeforeClose[i]||rawObjectMask[i])continue;
        closedInletMask[i]=1;closedInletPixels++;
      }
      recordSealFeedback('acrylic',acrylicSeal.applied);
      recordBridgeFeedback('acrylic',acrylicBridge.applied);
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

      // `내부 빈 공간 칼선` 이 켜져 있으면 그 구멍들은 실제로 잘리므로 예전대로
      // 둔다(잘린 자리 둘레에 재단여백이 있어야 한다). 꺼져 있을 때만 칼선이
      // 닫아 만든 구멍도 그림 구멍과 똑같이 취급해 확장색을 안 깐다.
      const bleedHoleMask=includeHoles||!closedInletPixels
        ?imageHoleMask:unionMask(imageHoleMask,closedInletMask);

      // 칼선이 투명한 자리와 맞닿은 구간에는 재단여백을 안 만든다 (v117).
      // `내부 빈 공간 칼선` 이 켜져 있으면 그 구멍은 실제로 잘리므로 예전대로
      // 둘레에 여백이 있어야 한다 — bleedHoleMask 와 같은 조건을 쓴다.
      const cutTransparency=style==='borderless'?buildTransparentCutZone(objectMask,combinedSilhouetteMask,w,h,bleedPx,ppm):null;
      const transparentCutZone=cutTransparency?.outer||null,transparentHoleMask=cutTransparency?.hole||null;

      const bleed=makeCanvas(w,h),fullPrint=makeCanvas(w,h);let printMask=objectMask;
      if(style==='borderless'){
        const baseNoBleed=flatBase&&baseGapMode==='transparent'?buildBaseNoBleed(baseAddedMask,objectMask,w,h,bleedPx):null;
        // 밑바닥은 칼선 안쪽이지만 **채워야 하는** 자리다 — 그것이 받침의 목적이다.
        // (`밑바닥과 도안 사이 · 비우기` 일 때는 baseNoBleed 가 따로 비운다.)
        const baseInsideFill=flatBase&&baseGapMode!=='transparent'?baseAddedMask:null;
        const result=makeBleed(originalData,objectMask,combinedSilhouetteMask,bleedHoleMask,w,h,bleedPx,includeHoles,baseNoBleed,protectedTransparent,transparentPropagation,transparentCutZone,transparentHoleMask,true,baseInsideFill,closedInletMask,ppm);
        bleed.getContext('2d').putImageData(result.imageData,0,0);printMask=result.printMask;
      }else if(flatBase&&baseGapMode==='fill'&&supportInterior){
        const fillTarget=unionMask(artOuterMask,supportInterior);
        const baseFill=makeBleed(originalData,objectMask,fillTarget,bleedHoleMask,w,h,0,false,null,protectedTransparent,transparentPropagation,transparentCutZone,transparentHoleMask),baseCanvas=makeCanvas(w,h);
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
      const acrylicSimplify=attachSimplifiedCurves(cutPaths,ppm,cutSimplifyMm());
      let whiteBaseMask=style==='borderless'||(style==='bordered'&&flatBase&&baseGapMode==='fill')?new Uint8Array(printMask):new Uint8Array(objectMask);
      // 화이트의 알파 근거는 **실제로 인쇄되는 그림**(fullPrint = 재단여백 + 도안)이다.
      // 원본 도안을 근거로 삼으면 외곽선마다 화이트에 도랑이 파인다: 바깥으로
      // 나가면서 안쪽 255 → 안티앨리어싱 램프에서 1~54 로 뚝 떨어졌다가 →
      // 재단여백에서 다시 255 로 되살아난다. 램프 자리는 뒤에 재단여백 색이
      // 꽉 차 있어 인쇄 결과가 불투명한데도 화이트만 비어 있던 것이다.
      // (실측 965px 선화: 그런 자리가 11,484곳)
      // fullPrint 를 보면 램프는 불투명, 진짜 반투명 면은 반투명 그대로라
      // v70 의 "반투명한 만큼만 화이트를 깐다" 도 그대로 지켜진다.
      const printData=fullPrint.getContext('2d').getImageData(0,0,w,h);
      const whiteLayers=buildWhiteLayerMasks(whiteBaseMask,originalData,transparentNoWrite,ppm);
      const whiteOpaqueOut={},whiteFullOut={};
      const whiteOpaque=whiteCanvasFromMask(whiteLayers.opaque,w,h,printData,whiteBaseMask,ppm,whiteOpaqueOut),
            white=whiteCanvasFromMask(whiteLayers.full,w,h,printData,whiteBaseMask,ppm,whiteFullOut);
      // 벡터로 내보낼 수 있는지 여기서 한 번 대조해 둔다 (v99).
      const whiteFullReport={},whiteOpaqueReport={};
      const whitePaths=whitePathsMatch(whiteFullOut.paths,white,w,h,whiteFullReport)?whiteFullOut.paths:null;
      const whiteOpaquePaths=whitePathsMatch(whiteOpaqueOut.paths,whiteOpaque,w,h,whiteOpaqueReport)?whiteOpaqueOut.paths:null;
      const actualWmm=drawW/ppm,actualHmm=drawH/ppm,ppi=Math.min(trim.sw/(actualWmm/25.4),trim.sh/(actualHmm/25.4));
      const contentBounds=maskBounds(unionMask(combinedSilhouetteMask,printMask),w,h),edgeLimit=Math.max(2,Math.round(.45*ppm));
      const touchesArtboardEdge=contentBounds.minX<=edgeLimit||contentBounds.minY<=edgeLimit||contentBounds.maxX>=w-1-edgeLimit||contentBounds.maxY>=h-1-edgeLimit
        ||holeResults.some(item=>item.mode==='external'&&(item.position.x-item.spec.outerR<0||item.position.y-item.spec.outerR<0||item.position.x+item.spec.outerR>w||item.position.y+item.spec.outerR>h));
      state.result={mode:'acrylic',finishStyle:style,widthPx:w,heightPx:h,widthMm:boardWidthMm,heightMm:boardHeightMm,productWidthMm:boardWidthMm,productHeightMm:boardHeightMm,artworkBoxWidthMm,artworkBoxHeightMm,lockArtworkAspect:lockAspect,ppm,pad,coreW,coreH,original:artworkOutput,white,whiteOpaque,whitePaths,whiteOpaquePaths,whiteVectorMismatch:{full:whiteFullReport.ratio??1,opaque:whiteOpaqueReport.ratio??1},hasSemiTransparent:whiteLayers.hasSemiTransparent,semiTransparentPixelCount:whiteLayers.semiCount,semiTransparentRegionCount:whiteLayers.semiRegionCount,bleed,fullPrint,cutPaths,cutCurve:AUTO_CUT_CURVE,cutSimplify:acrylicSimplify,outerPaths,imageHolePaths,includeHoles,base,baseGapMode,baseSupportMode:state.baseSupportMode,borderlessBaseLevel:state.borderlessBaseLevel,baseLiftMm:clamp(num(els.baseLiftMm,0),0,15),baseCornerRadius:Math.round(baseRoundRatio*100),ppi,actualWmm,actualHmm,touchesArtboardEdge,constraintMask:baseSilhouetteMask,constraintBounds,insideDistance,boundaryPoints,holes:holeResults,combinedSilhouetteMask,transparentPropagation,narrowInletPixels,narrowInletGapMm:acrylicNarrowGapMm,sealedInletPixels,closedInletPixels,closedInletMask,transparentCutZone,sealPointCount:sealPointsFor('acrylic').length,artworkPlacement};
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
      const baseLabel=flatBase?` · 밑바닥 ${baseGapMode==='transparent'?'빈 공간':'색상 채움'}/${style==='bordered'?(state.baseSupportMode==='color'?'색 덩어리':'전체 폭'):(baseMode==='manual'?'직접 지정':baseMode==='level'?'수평 보정':'두 점 연결')}`:'';
      const semiLabel=whiteLayers.hasSemiTransparent?` · 실제 반투명 면 ${whiteLayers.semiRegionCount}개 감지`:'';
      const edgeLabel=touchesArtboardEdge?' · 대지 가장자리 주의':'';
      const inletLabel=narrowInletPixels?` · ${acrylicNarrowGapMm} mm 이하 좁은 홈 자동 연결`:'';
      const sealLabel=(acrylicSeal.applied.filter(v=>v.added).length?` · 입구 잠금 ${acrylicSeal.applied.filter(v=>v.added).length}곳`:'')+bridgeFeedbackLabel('acrylic');
      els.geometryMeta.textContent=`${style==='borderless'?'무테':'유테'}${baseLabel}${holeLabel} · 대지 ${boardWidthMm.toFixed(1)} × ${boardHeightMm.toFixed(1)} mm · 실제 그림 ${actualWmm.toFixed(1)} × ${actualHmm.toFixed(1)} mm · ${Math.round(ppi)} ppi · 칼선 ${cutPaths.length}개${inletLabel}${sealLabel}${semiLabel}${edgeLabel}`;
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
    const r=size/2;
    cctx.beginPath();
    if(kind==='dots'){
      cctx.arc(x,y,r,0,Math.PI*2);
    } else if(kind==='hearts'){
      cctx.moveTo(x,y+r*.72);
      cctx.bezierCurveTo(x-r*1.2,y-r*.08,x-r*.82,y-r,x,y-r*.34);
      cctx.bezierCurveTo(x+r*.82,y-r,x+r*1.2,y-r*.08,x,y+r*.72);
    } else if(kind==='sparkle4'){
      for(let i=0;i<8;i++){
        const a=-Math.PI/2+i*Math.PI/4,rr=i%2?r*.20:r;
        const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;
        i?cctx.lineTo(px,py):cctx.moveTo(px,py);
      }
      cctx.closePath();
    } else if(kind==='sparkle8'){
      for(let i=0;i<16;i++){
        const a=-Math.PI/2+i*Math.PI/8;
        let rr;
        if(i%2)rr=r*.23;
        else rr=(i%4===0)?r:r*.56;
        const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;
        i?cctx.lineTo(px,py):cctx.moveTo(px,py);
      }
      cctx.closePath();
    } else {
      for(let i=0;i<10;i++){
        const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.43:r,px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;
        i?cctx.lineTo(px,py):cctx.moveTo(px,py);
      }
      cctx.closePath();
    }
    cctx.fill();
  }
  function greatestCommonDivisor(a,b){a=Math.abs(Math.round(a));b=Math.abs(Math.round(b));while(b){const t=a%b;a=b;b=t;}return a||1;}
  function smallestCoprimeRowStep(count){
    count=Math.max(1,Math.round(count));if(count<=1)return 1;
    for(let step=2;step<count*2+3;step++)if(greatestCommonDivisor(step,count)===1)return step;
    return 1;
  }
  function drawTemplatePattern(cctx,w,h,opts={}){
    const kind=opts.kind||'dots',bg=opts.bg||'#ffffff',fg=opts.fg||'#9ed7ec';
    const baseSize=Math.max(2,Number(opts.sizePx)||24),gap=Math.max(0,Number(opts.gapPx)||12);
    const sizeMode=opts.sizeMode==='random'?'random':'fixed';
    const sizeMin=Math.max(1,Math.min(Number(opts.sizeMinPx)||baseSize,Number(opts.sizeMaxPx)||baseSize));
    const sizeMax=Math.max(sizeMin,Math.max(Number(opts.sizeMinPx)||baseSize,Number(opts.sizeMaxPx)||baseSize));
    const maxParticleSize=sizeMode==='random'?sizeMax:baseSize;
    const positionMode=opts.positionMode==='random'||opts.layout==='random'?'random':'aligned';
    const dispersion=clamp(Number(opts.dispersion)||0,0,100)/100;
    const density=clamp(Number(opts.density)||100,20,300)/100;
    const nominalUnit=Math.max(3,maxParticleSize+gap),unit=positionMode==='random'?Math.max(3,nominalUnit/Math.sqrt(density)):nominalUnit;
    const offX=Number(opts.offX)||0,offY=Number(opts.offY)||0,layout=opts.layout||'square',order=opts.order||'balanced';
    const rotationMode=opts.rotationMode||'fixed',fixedRotation=(Number(opts.rotation)||0)*Math.PI/180,rotationMin=(Number(opts.rotationMin)||0)*Math.PI/180,rotationMax=(Number(opts.rotationMax)||0)*Math.PI/180;
    cctx.save();
    if(opts.bgType==='gradient')drawGradientBackground(cctx,w,h,opts.bgA||bg,opts.bgB||bg,opts.bgAngle||0);
    else {cctx.fillStyle=bg;cctx.fillRect(0,0,w,h);}
    cctx.strokeStyle=fg;cctx.fillStyle=fg;cctx.lineWidth=Math.max(.5,opts.lineWidthPx||1);cctx.lineCap='round';
    cctx.setLineDash(opts.lineStyle==='dashed'?[Math.max(2,cctx.lineWidth*3),Math.max(2,cctx.lineWidth*2)]:[]);
    const ox=((offX%unit)+unit)%unit-unit,oy=((offY%unit)+unit)%unit-unit;
    if(['square-grid','diagonal-grid','stripes'].includes(kind)){
      if(kind==='square-grid'){
        for(let x=ox;x<w+unit;x+=unit){cctx.beginPath();cctx.moveTo(x,0);cctx.lineTo(x,h);cctx.stroke();}
        for(let y=oy;y<h+unit;y+=unit){cctx.beginPath();cctx.moveTo(0,y);cctx.lineTo(w,y);cctx.stroke();}
      } else {
        for(let k=-h+ox;k<w+h;k+=unit){
          cctx.beginPath();cctx.moveTo(k,0);cctx.lineTo(k+h,h);cctx.stroke();
          if(kind==='diagonal-grid'){cctx.beginPath();cctx.moveTo(k+h,0);cctx.lineTo(k,h);cctx.stroke();}
        }
      }
      cctx.restore();return;
    }
    const images=Array.isArray(opts.images)?opts.images.filter(Boolean):[],rowStep=smallestCoprimeRowStep(images.length),previousRow=[];
    let row=0;
    for(let y=oy+unit/2;y<h+unit;y+=unit,row++){
      const stagger=layout==='diagonal'?(row%2)*unit/2:0,currentRow=[];let col=0;
      for(let x=ox+unit/2+stagger;x<w+unit;x+=unit,col++){
        let px=x,py=y,index=images.length?((col+row*rowStep)%images.length):0;
        const rr=seededRandom(col,row,211),lo=Math.min(rotationMin,rotationMax),hi=Math.max(rotationMin,rotationMax);
        const rot=rotationMode==='random'?lo+(hi-lo)*rr:fixedRotation;
        const particleSize=sizeMode==='random'?sizeMin+(sizeMax-sizeMin)*seededRandom(col,row,313):baseSize;
        if(order==='random'&&images.length){
          index=Math.floor(seededRandom(col,row,79)*images.length);
          if(images.length>1&&previousRow[col]===index){const jump=1+Math.floor(seededRandom(col,row,101)*(images.length-1));index=(index+jump)%images.length;}
        }
        currentRow[col]=index;
        if(positionMode==='random'){
          const jitter=unit*.48*dispersion;
          px+=(seededRandom(col,row,17)*2-1)*jitter;
          py+=(seededRandom(col,row,31)*2-1)*jitter;
        }
        if(kind==='image'&&images.length){
          const rec=images[index],ratio=rec.naturalWidth/rec.naturalHeight;let dw=particleSize,dh=particleSize;
          if(ratio>1)dh=dw/ratio;else dw=dh*ratio;
          cctx.save();cctx.translate(px,py);cctx.rotate(rot);cctx.imageSmoothingEnabled=true;cctx.imageSmoothingQuality='high';cctx.drawImage(rec.img,-dw/2,-dh/2,dw,dh);cctx.restore();
        } else {
          cctx.save();cctx.translate(px,py);cctx.rotate(rot);drawShapeParticle(cctx,kind,0,0,particleSize);cctx.restore();
        }
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
      drawTemplatePattern(cctx,w,h,{kind:opts.patternKind||'image',bgType:opts.patternBackgroundType||'color',bg:opts.patternBg||'#fff',bgA:opts.patternGradientA||opts.patternBg||'#fff',bgB:opts.patternGradientB||opts.patternBg||'#fff',bgAngle:opts.patternGradientAngle||0,fg:opts.patternFg||'#9ed7ec',sizePx:sizeMm*ppm,gapPx:gapMm*ppm,sizeMode:opts.patternSizeMode||'fixed',sizeMinPx:clamp(Number(opts.patternSizeMin)||sizeMm,.5,200)*ppm,sizeMaxPx:clamp(Number(opts.patternSizeMax)||sizeMm,.5,200)*ppm,positionMode:opts.patternPositionMode||'aligned',dispersion:opts.patternDispersion||0,density:opts.patternDensity||100,lineWidthPx:clamp(Number(opts.patternLineWidth)||1.2,.1,20)*ppm,lineStyle:opts.patternLineStyle||'solid',layout:opts.patternLayout||'square',order:opts.patternOrder||'balanced',rotationMode:opts.patternRotationMode||'fixed',rotation:opts.patternRotation||0,rotationMin:opts.patternRotationMin||0,rotationMax:opts.patternRotationMax||0,images,offX:(Number(opts.patternX)||0)*ppm,offY:(Number(opts.patternY)||0)*(h/heightMm)});
      if(!images.length)return{canvas,ppi:Infinity};const qualitySizeMm=(opts.patternSizeMode==='random'?Math.max(clamp(Number(opts.patternSizeMin)||sizeMm,.5,200),clamp(Number(opts.patternSizeMax)||sizeMm,.5,200)):sizeMm);const minPpi=Math.min(...images.map(record=>Math.min(record.naturalWidth,record.naturalHeight)/(qualitySizeMm/25.4)));return{canvas,ppi:minPpi};
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
    return renderFlexibleBackground(w,h,widthMm,heightMm,{type:state.stickerBackgroundType,color:els.stickerBackgroundColor.value,gradientA:els.stickerGradientColorA.value,gradientB:els.stickerGradientColorB.value,gradientAngle:num(els.stickerGradientAngle,135),image:state.stickerBackgroundImage,fit:els.stickerBackgroundFit.value,scale:num(els.stickerBackgroundScale,100),x:num(els.stickerBackgroundX,0),y:num(els.stickerBackgroundY,0),rotation:num(els.stickerBackgroundRotation,0),patternKind:els.stickerPatternKind.value,patternBackgroundType:els.stickerPatternBackgroundType?.value||'color',patternBg:els.stickerPatternBgColor.value,patternGradientA:els.stickerPatternGradientA?.value||els.stickerPatternBgColor.value,patternGradientB:els.stickerPatternGradientB?.value||els.stickerPatternBgColor.value,patternGradientAngle:num(els.stickerPatternGradientAngle,135),patternFg:els.stickerPatternFgColor.value,patternImage:state.stickerPatternImage,patternImages:state.stickerPatternImages,patternSize:num(els.stickerPatternSize,16),patternGap:num(els.stickerPatternGap,8),patternSizeMode:els.stickerPatternSizeMode?.value||'fixed',patternSizeMin:num(els.stickerPatternSizeMin,10),patternSizeMax:num(els.stickerPatternSizeMax,20),patternPositionMode:els.stickerPatternPositionMode?.value||'aligned',patternDispersion:num(els.stickerPatternDispersion,70),patternDensity:num(els.stickerPatternDensity,100),patternLayout:els.stickerPatternLayout.value,patternOrder:els.stickerPatternOrder?.value||'balanced',patternRotationMode:els.stickerPatternRotationMode?.value||'fixed',patternRotation:num(els.stickerPatternRotation,0),patternRotationMin:num(els.stickerPatternRotationMin,-15),patternRotationMax:num(els.stickerPatternRotationMax,15),patternLineStyle:els.stickerPatternLineStyle.value,patternLineWidth:num(els.stickerPatternLineWidth,1.2),patternScale:num(els.stickerPatternScale,100),patternX:num(els.stickerPatternX,0),patternY:num(els.stickerPatternY,0)});
  }

  async function generateSticker() {
    if(state.mode!=='sticker')return;const token=++state.generationToken;setBusy(true);await nextFrame();
    try{
      const style=currentFinishStyle('sticker'),widthMm=clamp(num(els.artboardWidth,210),20,1000),heightMm=clamp(num(els.artboardHeight,297),20,1000),bleedMm=style==='borderless'?clamp(num(els.stickerBleed,2),0,20):0,borderMm=style==='bordered'?clamp(num(els.stickerBorder,2),0,20):0;
      const whiteFill=style==='bordered'&&state.stickerBorderFill==='white',whiteBleedMm=whiteFill?clamp(num(els.stickerWhiteBleed,1),0,10):0;
      const threshold=clamp(num(style==='borderless'?els.stickerAlphaThreshold:els.stickerAlphaThresholdBordered,24),1,254),includeHoles=els.stickerIncludeHoles.checked,stickerNarrowGapMm=clamp(num(style==='bordered'?els.stickerNarrowGapMm:els.stickerBorderlessNarrowGapMm,style==='bordered'?4:1.2),0,20),targetMaxPx=getProcessingMaxDimension(),ppm=Number.isFinite(printExportPpmOverride)?printExportPpmOverride:clamp(targetMaxPx/Math.max(widthMm,heightMm),1.5,8),w=Math.round(widthMm*ppm),h=Math.round(heightMm*ppm),bleedPx=Math.round(bleedMm*ppm),borderPx=Math.round(borderMm*ppm),whiteBleedPx=Math.round(whiteBleedMm*ppm),padPx=Math.max(8,Math.max(bleedPx,borderPx+whiteBleedPx)+8);
      const original=makeCanvas(w,h),white=makeCanvas(w,h),whiteOpaque=makeCanvas(w,h),bleed=makeCanvas(w,h),fullPrint=makeCanvas(w,h),octx=original.getContext('2d'),wctx=white.getContext('2d'),woctx=whiteOpaque.getContext('2d'),bctx=bleed.getContext('2d'),fctx=fullPrint.getContext('2d'),cutPaths=[],cutRecords=[],whiteFullPaths=[],whiteOpaquePathsAll=[];
      const backgroundResult=renderStickerBackground(w,h,widthMm,heightMm),background=backgroundResult.canvas,hasBackground=els.stickerBackgroundEnabled.checked;
      if(hasBackground)fctx.drawImage(background,0,0);
      const ppis=[];let semiTransparentPixelCount=0,semiTransparentRegionCount=0,narrowInletPixels=0;if(Number.isFinite(backgroundResult.ppi))ppis.push(backgroundResult.ppi);
      // 낱장을 먼저 다 읽어 둔다 (v117). 재단여백을 어디에 안 깔지는 **닫기까지
      // 끝난 무리 칼선**을 봐야 정해지는데, 그 칼선은 낱장을 다 모아야 나온다.
      // 그래서 읽기(1차)와 여백·화이트 그리기(2차)를 나눴다.
      const stickerPrepared=[];
      for(const sticker of state.stickers){
        const local=renderStickerLocal(sticker,ppm,w,h,padPx),lw=local.canvas.width,lh=local.canvas.height,ldata=local.canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,lw,lh),objectMask=suppressNeedleProtrusions(stabilizeAlphaMask(ldata,threshold,getBoundarySamplingConfig()),lw,lh,ppm),contours=traceContours(objectMask,lw,lh);
        if(!contours.length)continue;
        const cutRecord={sticker,ownerId:sticker.id,mask:objectMask,left:local.left,top:local.top,lw,lh};cutRecords.push(cutRecord);
        stickerPrepared.push({sticker,local,lw,lh,ldata,objectMask,contours,cutRecord});
      }
      const stickerGroupCuts=buildStickerGroupCutMasks(cutRecords,w,h,ppm,style,borderPx,stickerNarrowGapMm);
      // 대지 좌표에서 "그림" 과 "최종 칼선" 을 모아 투명 구간을 가른다.
      const stickerCutZone=(()=>{
        if(style!=='borderless'||!stickerGroupCuts.masks.length)return null;
        const artBoard=new Uint8Array(w*h),cutBoard=new Uint8Array(w*h);
        for(const item of stickerPrepared){
          for(let y=0;y<item.lh;y++){const gy=y+item.local.top;if(gy<0||gy>=h)continue;
            for(let x=0;x<item.lw;x++){if(!item.objectMask[y*item.lw+x])continue;const gx=x+item.local.left;if(gx>=0&&gx<w)artBoard[gy*w+gx]=1;}}
        }
        for(const mask of stickerGroupCuts.masks)for(let i=0;i<cutBoard.length;i++)if(mask[i])cutBoard[i]=1;
        return buildTransparentCutZone(artBoard,cutBoard,w,h,bleedPx,ppm);
      })();
      const stickerCutOuter=stickerCutZone?.outer||null,stickerCutHole=stickerCutZone?.hole||null;
      for(const {sticker,local,lw,lh,ldata,objectMask,contours,cutRecord} of stickerPrepared){
        // 대지 좌표의 투명 구간을 이 낱장 좌표로 잘라 온다
        const slice=board=>{
          if(!board)return null;
          const out=new Uint8Array(lw*lh);
          for(let y=0;y<lh;y++){const gy=y+local.top;if(gy<0||gy>=h)continue;
            for(let x=0;x<lw;x++){const gx=x+local.left;if(gx<0||gx>=w)continue;if(board[gy*w+gx])out[y*lw+x]=1;}}
          return out;
        };
        const localCutZone=slice(stickerCutOuter),localCutHole=slice(stickerCutHole);
        const outerPaths=contours.filter(p=>polygonArea(p)>0),holePaths=contours.filter(p=>polygonArea(p)<0),outerMask=rasterizePaths(outerPaths,lw,lh),holeMask=holePaths.length?rasterizePaths(holePaths,lw,lh):new Uint8Array(lw*lh);
        let localBleed=makeCanvas(lw,lh),printMask=objectMask,whiteMask=objectMask,localCuts;
        if(style==='borderless'){
          const result=makeBleed(ldata,objectMask,outerMask,holeMask,lw,lh,bleedPx,includeHoles,null,null,null,localCutZone,localCutHole,true,null);localBleed.getContext('2d').putImageData(result.imageData,0,0);printMask=result.printMask;whiteMask=printMask;
          if(stickerNarrowGapMm>0){
            // 무테는 원래 이 보정이 없었습니다. 값을 올린 경우에만 그림 자체의
            // 외곽선을 마스크로 만들어 좁은 틈을 이어 붙이고 다시 윤곽을 뽑습니다.
            const bridged=bridgeNarrowCutInlets(outerMask,lw,lh,ppm,stickerNarrowGapMm);narrowInletPixels+=bridged.addedPixels;
            localCuts=traceContours(bridged.mask,lw,lh).filter(p=>polygonArea(p)>0).concat(includeHoles?holePaths:[]);
          }else{
            localCuts=outerPaths.concat(includeHoles?holePaths:[]);
          }
        }else{
          let cutOuter=dilateMask(outerMask,lw,lh,borderPx);
          if(stickerNarrowGapMm>0){const bridged=bridgeNarrowCutInlets(cutOuter,lw,lh,ppm,stickerNarrowGapMm);cutOuter=bridged.mask;narrowInletPixels+=bridged.addedPixels;}
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
        localCuts=prepareCutPaths(localCuts,ppm);cutRecord.constraintMask=rasterizePaths(localCuts.filter(path=>polygonArea(path)>0),lw,lh);cutRecord.constraintBounds=maskBounds(cutRecord.constraintMask,lw,lh);cutRecord.insideDistance=distanceToMask(cutRecord.constraintMask,lw,lh,0);cutRecord.boundaryPoints=boundaryPointList(cutRecord.constraintMask,lw,lh,2);cutRecord.widthPx=lw;cutRecord.heightPx=lh;cutPaths.push(...translatePaths(localCuts,local.left,local.top));
        const localWhiteLayers=buildWhiteLayerMasks(whiteMask,ldata,null,ppm);
        const localFullOut={},localOpaqueOut={};
        const localWhite=whiteCanvasFromMask(localWhiteLayers.full,lw,lh,ldata,whiteMask,ppm,localFullOut),localWhiteOpaque=whiteCanvasFromMask(localWhiteLayers.opaque,lw,lh,ldata,whiteMask,ppm,localOpaqueOut),localSemi=whiteCanvasFromMask(localWhiteLayers.semiMask,lw,lh);
        // 낱장을 대지에 옮겨 붙이므로 윤곽도 같은 만큼 옮긴다 (v99).
        const shiftWhite=paths=>(paths||[]).map(pp=>pp.map(pt=>({x:pt.x+local.left,y:pt.y+local.top})));
        whiteFullPaths.push(...shiftWhite(localFullOut.paths));
        whiteOpaquePathsAll.push(...shiftWhite(localOpaqueOut.paths));
        semiTransparentPixelCount+=localWhiteLayers.semiCount;semiTransparentRegionCount+=localWhiteLayers.semiRegionCount;
        if(style==='borderless'){bctx.drawImage(localBleed,local.left,local.top);fctx.drawImage(localBleed,local.left,local.top);}
        wctx.drawImage(localWhite,local.left,local.top);
        // 위에 놓인 반투명 픽셀 아래에서는 이전 스티커의 화이트도 제거합니다.
        woctx.save();woctx.globalCompositeOperation='destination-out';woctx.drawImage(localSemi,local.left,local.top);woctx.restore();woctx.drawImage(localWhiteOpaque,local.left,local.top);
        octx.drawImage(local.canvas,local.left,local.top);fctx.drawImage(local.canvas,local.left,local.top);
        ppis.push(sticker.naturalWidth/(sticker.widthMm/25.4));
      }
      const baseCutPaths=buildStickerGroupCutPaths(cutRecords,w,h,ppm,style,borderPx,includeHoles,stickerNarrowGapMm,stickerGroupCuts),baseOuterPaths=baseCutPaths.filter(path=>polygonArea(path)>0),baseInnerPaths=baseCutPaths.filter(path=>polygonArea(path)<0);
      const stickerConstraintMask=baseOuterPaths.length?rasterizePaths(baseOuterPaths,w,h):new Uint8Array(w*h),constraintBounds=maskBounds(stickerConstraintMask,w,h),insideDistance=distanceToMask(stickerConstraintMask,w,h,0),boundaryPoints=boundaryPointList(stickerConstraintMask,w,h,2);
      const cleanAppliedStickerHoleIds=new Set(state.stickerHoles.filter(hole=>!holeIsDirty(hole)).map(hole=>hole.id)),appliedStickerHoleEntries=state.stickerHoles.filter(h=>['internal','external'].includes(h.appliedMode)).map(hole=>({hole,spec:getHoleSpec(ppm,hole,true)}));
      let combinedStickerMask=stickerConstraintMask,stickerTransparentMask=null;const stickerHoleResults=[];
      for(const {hole,spec} of appliedStickerHoleEntries){
        const c=cutRecords.find(record=>record.ownerId===hole.ownerId);if(!c?.constraintMask)continue;const mode=hole.appliedMode,localPosition=resolveHolePosition(c.constraintMask,c.widthPx,c.heightPx,0,ppm,mode,(hole.appliedXmm-c.left/ppm),(hole.appliedYmm-c.top/ppm),spec,c.insideDistance,c.boundaryPoints,c.constraintBounds),position={x:localPosition.x+c.left,y:localPosition.y+c.top};hole.appliedXmm=position.x/ppm;hole.appliedYmm=position.y/ppm;const holeDisk=makeCircleMask(w,h,position.x,position.y,spec.innerR);let outerDisk=null,connector=null,carrier=null;
        if(mode==='external'){outerDisk=makeCircleMask(w,h,position.x,position.y,spec.outerR);const edgeLocal=nearestPoint(c.boundaryPoints,localPosition.x,localPosition.y)||{x:c.constraintBounds.cx,y:c.constraintBounds.minY},edge={x:edgeLocal.x+c.left,y:edgeLocal.y+c.top},dir=normalizedVector(position.x-edge.x,position.y-edge.y,{x:0,y:-1}),connectorRadius=Math.max(spec.wallPx*.82,.55*ppm),connectorEndX=position.x-dir.x*Math.max(0,spec.outerR-connectorRadius*.55),connectorEndY=position.y-dir.y*Math.max(0,spec.outerR-connectorRadius*.55),connectorStartX=edge.x-dir.x*Math.min(spec.wallPx*.35,.45*ppm),connectorStartY=edge.y-dir.y*Math.min(spec.wallPx*.35,.45*ppm);connector=makeCapsuleMask(w,h,connectorStartX,connectorStartY,connectorEndX,connectorEndY,connectorRadius);const externalShape=unionMask(outerDisk,connector);combinedStickerMask=unionMask(combinedStickerMask,externalShape);carrier=unionMask(subtractMask(externalShape,stickerConstraintMask),holeDisk);stickerTransparentMask=stickerTransparentMask?unionMask(stickerTransparentMask,carrier):carrier;}
        stickerHoleResults.push({id:hole.id,mode,position,spec,holeDisk,outerDisk,connector,carrier});
      }
      if(stickerTransparentMask)for(const canvas of [background,original,white,whiteOpaque,bleed,fullPrint])clearCanvasWithMask(canvas,stickerTransparentMask);
      const finalOuterPaths=appliedStickerHoleEntries.some(entry=>entry.hole.appliedMode==='external')?traceContours(combinedStickerMask,w,h).filter(path=>polygonArea(path)>0):baseOuterPaths;
      cutPaths.length=0;cutPaths.push(...prepareCutPaths([...finalOuterPaths,...baseInnerPaths],ppm));for(const resultHole of stickerHoleResults)cutPaths.push(...prepareCutPaths([circlePath(resultHole.position.x,resultHole.position.y,resultHole.spec.innerR,true)],ppm));
      const stickerSimplify=attachSimplifiedCurves(cutPaths,ppm,cutSimplifyMm());
      const minPpi=ppis.length?Math.min(...ppis):Infinity;
      // 벡터로 내보낼 수 있는지 대조한다 (v99). 스티커 대지는 낱장을 겹쳐
      // 붙이면서 앞 장의 화이트를 파내기도 하므로, 어긋나면 이미지로 물러선다.
      const stickerFullReport={},stickerOpaqueReport={};
      const whitePaths=whitePathsMatch(whiteFullPaths,white,w,h,stickerFullReport)?whiteFullPaths:null;
      const whiteOpaquePaths=whitePathsMatch(whiteOpaquePathsAll,whiteOpaque,w,h,stickerOpaqueReport)?whiteOpaquePathsAll:null;
      state.result={mode:'sticker',finishStyle:style,cutSimplify:stickerSimplify,widthPx:w,heightPx:h,widthMm,heightMm,ppm,pad:0,background,hasBackground,original,white,whiteOpaque,whitePaths,whiteOpaquePaths,whiteVectorMismatch:{full:stickerFullReport.ratio??1,opaque:stickerOpaqueReport.ratio??1},hasSemiTransparent:semiTransparentRegionCount>0,semiTransparentPixelCount,semiTransparentRegionCount,bleed,fullPrint,cutPaths,cutCurve:AUTO_CUT_CURVE,ppi:minPpi,stickerBorderFill:state.stickerBorderFill,whiteBleedMm,constraintMask:stickerConstraintMask,constraintBounds,insideDistance,boundaryPoints,holes:stickerHoleResults,combinedSilhouetteMask:combinedStickerMask,stickerCutRecords:cutRecords,narrowInletGapMm:stickerNarrowGapMm,transparentCutZone:stickerCutOuter};
      for(const resultHole of stickerHoleResults){const hole=state.stickerHoles.find(item=>item.id===resultHole.id);if(hole&&cleanAppliedStickerHoleIds.has(hole.id)){hole.draftMode=hole.appliedMode;hole.draftXmm=hole.appliedXmm;hole.draftYmm=hole.appliedYmm;hole.draftDiameterMm=hole.appliedDiameterMm;hole.draftWallMm=hole.appliedWallMm;hole.draftInsetMm=hole.appliedInsetMm;hole.draftExternalGapMm=hole.appliedExternalGapMm;hole.dirty=false;}}
      ensureAllDraftStickerHolePositions();updateWhiteLayerUi();
      updateQualitySticker(minPpi);const semiLabel=semiTransparentRegionCount?` · 실제 반투명 면 ${semiTransparentRegionCount}개 감지`:'';const inletLabel=narrowInletPixels?` · ${stickerNarrowGapMm} mm 이하 좁은 홈 자동 연결`:'';const punchLabel=stickerHoleResults.length?` · 타공 ${stickerHoleResults.length}개`:'';const sealLabel=sealFeedbackLabel('sticker')+bridgeFeedbackLabel('sticker');els.geometryMeta.textContent=`${style==='borderless'?'무테':`유테 · ${whiteFill?'화이트':'투명'}`} · 대지 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · 이미지 ${state.stickers.length}개${hasBackground?' · 배경지':''} · 칼선 ${cutPaths.length}개${punchLabel}${inletLabel}${sealLabel}${Number.isFinite(minPpi)?` · 최저 ${Math.round(minPpi)} ppi`:''}${semiLabel}`;
      if(token===state.generationToken)drawPreview();
    }catch(err){console.error(err);setNotice('bad','스티커 대지를 만들 수 없습니다',err.message||'처리 중 오류가 발생했습니다.');}finally{if(token===state.generationToken)setBusy(false);}
  }


  function renderMakerBackground(w,h,widthMm,heightMm){return renderFlexibleBackground(w,h,widthMm,heightMm,{type:state.makerBackgroundType,color:els.makerBgColor.value,gradientA:els.makerGradientA.value,gradientB:els.makerGradientB.value,gradientAngle:num(els.makerGradientAngle,135),image:state.makerBackgroundImage,fit:els.makerBackgroundFit.value,scale:num(els.makerBackgroundScale,100),x:num(els.makerBackgroundX,0),y:num(els.makerBackgroundY,0),rotation:num(els.makerBackgroundRotation,0),patternKind:els.makerPatternKind.value,patternBackgroundType:els.makerPatternBackgroundType?.value||'color',patternBg:els.makerPatternBg.value,patternGradientA:els.makerPatternGradientA?.value||els.makerPatternBg.value,patternGradientB:els.makerPatternGradientB?.value||els.makerPatternBg.value,patternGradientAngle:num(els.makerPatternGradientAngle,135),patternFg:els.makerPatternFg.value,patternImage:state.makerPatternImage,patternImages:state.makerPatternImages,patternSize:num(els.makerPatternSize,16),patternGap:num(els.makerPatternGap,8),patternSizeMode:els.makerPatternSizeMode?.value||'fixed',patternSizeMin:num(els.makerPatternSizeMin,10),patternSizeMax:num(els.makerPatternSizeMax,20),patternPositionMode:els.makerPatternPositionMode?.value||'aligned',patternDispersion:num(els.makerPatternDispersion,70),patternDensity:num(els.makerPatternDensity,100),patternLayout:els.makerPatternLayout.value,patternOrder:els.makerPatternOrder?.value||'balanced',patternRotationMode:els.makerPatternRotationMode?.value||'fixed',patternRotation:num(els.makerPatternRotation,0),patternRotationMin:num(els.makerPatternRotationMin,-15),patternRotationMax:num(els.makerPatternRotationMax,15),patternLineStyle:els.makerPatternLineStyle.value,patternLineWidth:num(els.makerPatternLineWidth,1.2),patternScale:num(els.makerPatternScale,100),patternX:num(els.makerPatternX,0),patternY:num(els.makerPatternY,0)});}
  function colorCanvasFromMask(mask,w,h,color,alpha=1){const c=makeCanvas(w,h),cc=c.getContext('2d'),id=cc.createImageData(w,h),parsed=parseColorValue(color),a=Math.round(clamp(alpha*parsed.a,0,1)*255);for(let i=0;i<mask.length;i++)if(mask[i]){const k=i*4;id.data[k]=parsed.r;id.data[k+1]=parsed.g;id.data[k+2]=parsed.b;id.data[k+3]=a;}cc.putImageData(id,0,0);return c;}
  function smoothOutlineCanvasFromMask(mask,w,h,ppm,widthPx,color){
    const canvas=makeCanvas(w,h),cctx=canvas.getContext('2d');cctx.imageSmoothingEnabled=true;cctx.imageSmoothingQuality='high';const contours=prepareCutPaths(traceContours(mask,w,h).filter(path=>Math.abs(polygonArea(path))>2),ppm);if(!contours.length)return canvas;
    cctx.beginPath();for(const path of contours)drawPath(cctx,path,1,1,0,0,AUTO_CUT_CURVE);cctx.fillStyle=color;cctx.fill('evenodd');if(widthPx>0){cctx.strokeStyle=color;cctx.lineWidth=Math.max(.5,widthPx*2);cctx.lineJoin='round';cctx.lineCap='round';cctx.stroke();}return canvas;
  }
  function createObjectFillCanvas(w,h,fillValue,ppm){
    const fill=normalizeFillSpec(fillValue),canvas=makeCanvas(w,h),c=canvas.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    if(fill.type==='gradient'){drawGradientBackground(c,w,h,colorToCss(fill.gradientA),colorToCss(fill.gradientB),fill.gradientAngle);return canvas;}
    if(fill.type==='pattern'){
      drawTemplatePattern(c,w,h,{kind:fill.patternKind,bg:colorToCss(fill.patternBackground),fg:colorToCss(fill.patternColor),sizePx:Math.max(1,fill.patternSizeMm*ppm),gapPx:Math.max(0,fill.patternGapMm*ppm),layout:'square',rotationMode:'fixed',rotation:fill.patternRotation,sizeMode:'fixed',positionMode:'aligned',density:100,dispersion:0,lineStyle:'solid',lineWidthPx:Math.max(.6,fill.patternSizeMm*ppm*.16)});return canvas;
    }
    c.fillStyle=colorToCss(fill.color);c.fillRect(0,0,w,h);return canvas;
  }
  function pathRoundedRect(c,x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));if(c.roundRect){c.roundRect(x,y,w,h,r);return;}c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);}
  function drawObjectShapePath(c,kind,w,h,cornerRadius=0){
    c.beginPath();
    if(kind==='rect'){pathRoundedRect(c,-w/2,-h/2,w,h,Math.min(w,h)*clamp(cornerRadius,0,100)/200);return;}
    if(kind==='ellipse'){c.ellipse(0,0,w/2,h/2,0,0,Math.PI*2);return;}
    if(kind==='heart'){const sx=w/2,sy=h/2;c.moveTo(0,sy*.88);c.bezierCurveTo(-sx*1.1,sy*.2,-sx*.92,-sy*.82,-sx*.38,-sy*.62);c.bezierCurveTo(-sx*.12,-sy*.95,0,-sy*.68,0,-sy*.44);c.bezierCurveTo(0,-sy*.68,sx*.12,-sy*.95,sx*.38,-sy*.62);c.bezierCurveTo(sx*.92,-sy*.82,sx*1.1,sy*.2,0,sy*.88);c.closePath();return;}
    const points=kind==='star5'?10:(kind==='sparkle4'?8:16),outer=1,inner=kind==='star5'?.45:(kind==='sparkle4'?.18:.42);for(let i=0;i<points;i++){const a=-Math.PI/2+i*Math.PI*2/points,r=i%2?inner:outer,x=Math.cos(a)*w/2*r,y=Math.sin(a)*h/2*r;i?c.lineTo(x,y):c.moveTo(x,y);}c.closePath();
  }
  function renderShapeObjectCanvas(item,ppm){
    const size=makerItemSizeMm(item),w=Math.max(2,Math.ceil(size.width*ppm)),h=Math.max(2,Math.ceil(size.height*ppm)),style=normalizeShapeStyle(item.shapeStyle),canvas=makeCanvas(w,h),c=canvas.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    const fill=createObjectFillCanvas(w,h,style.fill,ppm),mask=makeCanvas(w,h),mc=mask.getContext('2d');mc.save();mc.translate(w/2,h/2);
    if(style.kind==='line'){
      mc.strokeStyle='#fff';mc.lineWidth=Math.max(.6,style.lineWidthMm*ppm);mc.lineCap=style.lineCap;const length=Math.max(1,w-style.lineWidthMm*ppm*1.5),x1=-length/2,x2=length/2;mc.setLineDash(style.lineStyle==='dashed'?[mc.lineWidth*3,mc.lineWidth*2]:style.lineStyle==='dotted'?[.01,mc.lineWidth*2.2]:style.lineStyle==='dashdot'?[mc.lineWidth*3,mc.lineWidth*1.5,.01,mc.lineWidth*1.5]:[]);
      if(style.lineStyle==='double'){const gap=mc.lineWidth*1.3;mc.beginPath();mc.moveTo(x1,-gap);mc.lineTo(x2,-gap);mc.moveTo(x1,gap);mc.lineTo(x2,gap);mc.stroke();}else{mc.beginPath();mc.moveTo(x1,0);mc.lineTo(x2,0);mc.stroke();}
    }else{drawObjectShapePath(mc,style.kind,w-style.strokeWidthMm*ppm,h-style.strokeWidthMm*ppm,style.cornerRadius);mc.fillStyle='#fff';mc.fill();if(style.strokeWidthMm>0){mc.strokeStyle='#fff';mc.lineWidth=Math.max(.5,style.strokeWidthMm*ppm*2);mc.lineJoin='round';mc.stroke();}}
    mc.restore();c.drawImage(fill,0,0);c.globalCompositeOperation='destination-in';c.drawImage(mask,0,0);c.globalCompositeOperation='source-over';
    if(style.kind!=='line'&&style.strokeWidthMm>0){c.save();c.translate(w/2,h/2);drawObjectShapePath(c,style.kind,w-style.strokeWidthMm*ppm,h-style.strokeWidthMm*ppm,style.cornerRadius);c.strokeStyle=colorToCss(style.strokeColor);c.lineWidth=Math.max(.5,style.strokeWidthMm*ppm);c.lineJoin='round';c.stroke();c.restore();}
    return canvas;
  }
  function segmentText(text){const out=[];let index=0;if(typeof Intl!=='undefined'&&Intl.Segmenter){for(const part of new Intl.Segmenter('ko',{granularity:'grapheme'}).segment(text)){out.push({char:part.segment,index:part.index});index=part.index+part.segment.length;}return out;}for(const char of String(text)){out.push({char,index});index+=char.length;}return out;}
  function layoutTextObject(c,text,boxW,boxH,style,ppm){
    const fontPx=Math.max(1,style.fontSizeMm*ppm),letter=style.letterSpacingMm*ppm,lineHeight=fontPx*style.lineHeight,pad=Math.max(2,fontPx*.08),maxW=Math.max(1,boxW-pad*2),glyphs=[],lines=[];c.font=`normal ${style.fontWeight} ${fontPx}px "${String(style.fontFamily).replaceAll('"','\\"')}", sans-serif`;c.textBaseline='alphabetic';
    let line=[],lineWidth=0,lineIndex=0;const pushLine=()=>{lines.push({glyphs:line,width:Math.max(0,lineWidth-letter),index:lineIndex++});line=[];lineWidth=0;};
    for(const part of segmentText(style.text||text||'')){if(part.char==='\n'){pushLine();continue;}const gw=Math.max(0,c.measureText(part.char).width),advance=gw+letter;if(line.length&&lineWidth+advance>maxW)pushLine();line.push({char:part.char,index:part.index,width:gw,advance});lineWidth+=advance;}pushLine();
    const totalH=Math.max(lineHeight,lines.length*lineHeight),baseY=style.verticalAlign==='bottom'?boxH-pad-totalH:(style.verticalAlign==='middle'?(boxH-totalH)/2:pad);for(let li=0;li<lines.length;li++){const lineInfo=lines[li],startX=style.align==='right'?boxW-pad-lineInfo.width:(style.align==='center'?(boxW-lineInfo.width)/2:pad),baseline=baseY+li*lineHeight+fontPx*.82;let x=startX;for(const g of lineInfo.glyphs){glyphs.push({...g,x,y:baseline,line:li,height:fontPx});x+=g.advance;}}
    return{glyphs,lines,fontPx,lineHeight};
  }
  function renderTextObjectCanvas(item,ppm){
    const size=makerItemSizeMm(item),w=Math.max(2,Math.ceil(size.width*ppm)),h=Math.max(2,Math.ceil(size.height*ppm)),style=normalizeTextStyle(item.textStyle),canvas=makeCanvas(w,h),c=canvas.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';const layout=layoutTextObject(c,style.text,w,h,style,ppm);
    c.font=`normal ${style.fontWeight} ${layout.fontPx}px "${String(style.fontFamily).replaceAll('"','\\"')}", sans-serif`;c.textBaseline='alphabetic';
    if(style.background.enabled&&style.background.ranges.length){for(const range of style.background.ranges){const hits=layout.glyphs.filter(g=>g.index<range.end&&g.index+g.char.length>range.start),byLine=new Map();for(const g of hits){if(!byLine.has(g.line))byLine.set(g.line,[]);byLine.get(g.line).push(g);}c.fillStyle=colorToCss(range.color||style.background.color);for(const lineGlyphs of byLine.values()){const minX=Math.min(...lineGlyphs.map(g=>g.x)),maxX=Math.max(...lineGlyphs.map(g=>g.x+g.width)),baseline=lineGlyphs[0].y,top=baseline-layout.fontPx*.9;c.beginPath();pathRoundedRect(c,minX-layout.fontPx*.08,top,maxX-minX+layout.fontPx*.16,layout.fontPx*1.12,layout.fontPx*.12);c.fill();}}}
    const mask=makeCanvas(w,h),mc=mask.getContext('2d');mc.font=c.font;mc.textBaseline='alphabetic';mc.fillStyle='#fff';for(const g of layout.glyphs)mc.fillText(g.char,g.x,g.y);
    const fill=createObjectFillCanvas(w,h,style.fill,ppm),textLayer=makeCanvas(w,h),tc=textLayer.getContext('2d');tc.drawImage(fill,0,0);tc.globalCompositeOperation='destination-in';tc.drawImage(mask,0,0);tc.globalCompositeOperation='source-over';c.drawImage(textLayer,0,0);return canvas;
  }
  function renderMakerItemRaw(item,ppm){
    const type=makerObjectType(item),size=makerItemSizeMm(item),w=Math.max(2,Math.ceil(size.width*ppm)),h=Math.max(2,Math.ceil(size.height*ppm));if(type==='text')return renderTextObjectCanvas(item,ppm);if(type==='shape')return renderShapeObjectCanvas(item,ppm);const canvas=makeCanvas(w,h),c=canvas.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';if(item.img)c.drawImage(item.img,0,0,w,h);return canvas;
  }
  function renderMakerUnit(items,ppm,boardW,boardH){
    const members=(items||[]).filter(Boolean);if(!members.length)return null;const effects=normalizeMakerEffects(members[0].effects),effectMm=makerEffectPaddingMm(effects),padPx=Math.ceil(effectMm*ppm+14);let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    for(const item of members){const size=makerItemSizeMm(item),w=size.width*ppm,h=size.height*ppm,a=(Number(item.rotation)||0)*Math.PI/180,ca=Math.abs(Math.cos(a)),sa=Math.abs(Math.sin(a)),bw=w*ca+h*sa,bh=w*sa+h*ca,cx=item.xMm*ppm,cy=item.yMm*ppm;minX=Math.min(minX,cx-bw/2);maxX=Math.max(maxX,cx+bw/2);minY=Math.min(minY,cy-bh/2);maxY=Math.max(maxY,cy+bh/2);}
    const left=clamp(Math.floor(minX-padPx),0,Math.max(0,boardW-1)),top=clamp(Math.floor(minY-padPx),0,Math.max(0,boardH-1)),right=clamp(Math.ceil(maxX+padPx),left+1,boardW),bottom=clamp(Math.ceil(maxY+padPx),top+1,boardH),lw=Math.max(1,right-left),lh=Math.max(1,bottom-top),raw=makeCanvas(lw,lh),rc=raw.getContext('2d');rc.imageSmoothingEnabled=true;rc.imageSmoothingQuality='high';
    for(const item of members){const local=renderMakerItemRaw(item,ppm),size=makerItemSizeMm(item),w=size.width*ppm,h=size.height*ppm;rc.save();rc.translate(item.xMm*ppm-left,item.yMm*ppm-top);rc.rotate((Number(item.rotation)||0)*Math.PI/180);rc.drawImage(local,-w/2,-h/2,w,h);rc.restore();}
    const data=rc.getImageData(0,0,lw,lh),mask=stabilizeAlphaMask(data,6,getBoundarySamplingConfig()),out=makeCanvas(lw,lh),oc=out.getContext('2d');oc.imageSmoothingEnabled=true;oc.imageSmoothingQuality='high';const layers=makerEffectLayers(effects),inner=[];
    for(const e of layers){
      if(e.type==='innerGlow'){inner.push(e);continue;}
      if(e.type==='extrusion'&&e.depthMm>0){const depth=Math.max(1,Math.round(e.depthMm*ppm)),angle=(Number(e.angle)||0)*Math.PI/180,col=colorCanvasFromMask(mask,lw,lh,e.color,e.opacity/100);for(let step=depth;step>=1;step--){oc.drawImage(col,Math.cos(angle)*step,Math.sin(angle)*step);}continue;}
      if(e.type==='shadow'){const spread=Math.max(0,Math.round(e.sizeMm*ppm*(e.spread/100))),shadowMask=spread?dilateMask(mask,lw,lh,spread):mask,shadow=colorCanvasFromMask(shadowMask,lw,lh,e.color,e.opacity/100);oc.save();oc.shadowColor=hexToRgba(e.color,e.opacity/100);oc.shadowBlur=Math.max(0,e.sizeMm*ppm*1.6);oc.shadowOffsetX=e.xMm*ppm;oc.shadowOffsetY=e.yMm*ppm;oc.drawImage(shadow,0,0);oc.restore();continue;}
      if(e.type==='outerGlow'){const spread=Math.max(0,Math.round(e.sizeMm*ppm*(e.spread/100))),glowMask=spread?dilateMask(mask,lw,lh,spread):mask,glow=colorCanvasFromMask(glowMask,lw,lh,e.color,e.opacity/100);oc.save();oc.shadowColor=hexToRgba(e.color,e.opacity/100);oc.shadowBlur=Math.max(0,e.sizeMm*ppm*2);oc.drawImage(glow,0,0);oc.restore();continue;}
      if(e.type==='outline'&&e.widthMm>0){oc.drawImage(smoothOutlineCanvasFromMask(mask,lw,lh,ppm,e.widthMm*ppm,colorToCss(e.color)),0,0);}
    }
    oc.drawImage(raw,0,0);
    for(const e of inner){const edge=differenceMask(mask,erodeMask(mask,lw,lh,Math.max(1,Math.round(e.sizeMm*ppm)))),glow=colorCanvasFromMask(edge,lw,lh,e.color,e.opacity/100);oc.save();oc.filter=`blur(${Math.max(0,e.sizeMm*ppm*(.4+e.spread/160))}px)`;oc.globalCompositeOperation='source-atop';oc.drawImage(glow,0,0);oc.restore();}
    return{canvas:out,left,top,lw,lh};
  }
  async function generateMaker(){
    if(state.mode!=='maker')return;const token=++state.generationToken;setBusy(true);await nextFrame();
    try{
      await ensureMakerFontsLoaded();
      const widthMm=clamp(num(els.makerWidth,100),20,1000),heightMm=clamp(num(els.makerHeight,100),20,1000),targetMaxPx=getProcessingMaxDimension(),ppm=clamp(targetMaxPx/Math.max(widthMm,heightMm),1.5,8),w=Math.round(widthMm*ppm),h=Math.round(heightMm*ppm),backgroundResult=renderMakerBackground(w,h,widthMm,heightMm),background=backgroundResult.canvas,original=makeCanvas(w,h),octx=original.getContext('2d'),ppis=[];
      const renderedGroups=new Set();for(const item of state.makerItems){let members;if(item.groupId){if(renderedGroups.has(item.groupId))continue;renderedGroups.add(item.groupId);members=state.makerItems.filter(v=>v.groupId===item.groupId);}else members=[item];const r=renderMakerUnit(members,ppm,w,h);if(r)octx.drawImage(r.canvas,r.left,r.top);for(const member of members)if(makerObjectType(member)==='image')ppis.push(member.naturalWidth/(makerItemSizeMm(member).width/25.4));}
      const empty=makeCanvas(w,h),fullPrint=makeCanvas(w,h),fc=fullPrint.getContext('2d');fc.drawImage(background,0,0);fc.drawImage(original,0,0);const minPpi=ppis.length?Math.min(...ppis):Infinity,hasBackground=state.makerBackgroundType!=='transparent',counts=state.makerItems.reduce((a,v)=>(a[makerObjectType(v)]=(a[makerObjectType(v)]||0)+1,a),{});
      state.result={mode:'maker',finishStyle:'image',widthPx:w,heightPx:h,widthMm,heightMm,ppm,background,hasBackground,original,white:empty,whiteOpaque:empty,hasSemiTransparent:false,bleed:empty,fullPrint,cutPaths:[],cutCurve:AUTO_CUT_CURVE,ppi:minPpi};
      updateWhiteLayerUi();updateModeSpecificUi();els.geometryMeta.textContent=`이미지 작업 · 캔버스 ${widthMm.toFixed(1)} × ${heightMm.toFixed(1)} mm · 이미지 ${counts.image||0} · 글 ${counts.text||0} · 도형/선 ${counts.shape||0}${hasBackground?' · 배경 적용':' · 투명 배경'}${Number.isFinite(minPpi)?` · 최저 ${Math.round(minPpi)} ppi`:''}`;
      if(ppis.length){if(minPpi>=300)setNotice('good','이미지 해상도 양호',`가장 낮은 비트맵 이미지도 ${Math.round(minPpi)} ppi입니다.`);else if(minPpi>=180)setNotice('warn','일부 이미지 확대 주의',`가장 낮은 이미지가 ${Math.round(minPpi)} ppi입니다.`);else setNotice('bad','일부 이미지 화질 깨짐 위험',`가장 낮은 이미지가 ${Math.round(minPpi)} ppi입니다.`);}else if(state.makerItems.length)setNotice('good','벡터형 개체 준비됨','글상자와 도형은 현재 출력 크기에 맞춰 다시 렌더링됩니다.');else setNotice('info','이미지·글상자·도형을 추가해 주세요','이 탭은 칼선과 화이트 없이 PNG/JPG 이미지를 만듭니다.');if(token===state.generationToken)drawPreview();
    }catch(err){console.error(err);setNotice('bad','이미지 작업 결과를 만들 수 없습니다',err.message||'처리 중 오류가 발생했습니다.');}finally{if(token===state.generationToken)setBusy(false);}
  }
  let makerTimer=null;function scheduleMakerGenerate(){clearTimeout(makerTimer);makerTimer=setTimeout(generateMaker,220);}
  async function addMakerFiles(files){const widthMm=clamp(num(els.makerWidth,100),20,1000),heightMm=clamp(num(els.makerHeight,100),20,1000);for(const file of files){const raw=await fileToImageRecord(file),rec=await cropImageRecordToAlpha(raw,1),width=Math.min(45,widthMm*.38),n=state.makerItems.length;state.makerItems.push(makeMakerImageItem(rec,{widthMm:width,rotation:0,xMm:widthMm/2+(n%3-1)*8,yMm:heightMm/2+(Math.floor(n/3)%3-1)*8,effects:defaultMakerEffects()}));}els.makerCount.textContent=`${state.makerItems.length}개`;selectMaker(state.makerItems.at(-1)?.id||null);await generateMaker();saveWorkspaceNow();checkpointHistory();}
  async function addMakerTextObject(){
    const widthMm=clamp(num(els.makerWidth,100),20,1000),heightMm=clamp(num(els.makerHeight,100),20,1000),n=state.makerItems.length;
    const item=makeMakerTextItem({xMm:widthMm/2+(n%3-1)*4,yMm:heightMm/2+(Math.floor(n/3)%3-1)*4,widthMm:Math.min(52,widthMm*.55),heightMm:Math.min(24,heightMm*.28),effects:defaultMakerEffects()});
    state.makerItems.push(item);els.makerCount.textContent=`${state.makerItems.length}개`;selectMaker(item.id);await ensureMakerFontsLoaded([item]);await generateMaker();saveWorkspaceNow();checkpointHistory();setTimeout(()=>{els.makerTextContent?.focus();els.makerTextContent?.select();},30);
  }
  async function addMakerShapeObject(kind='rect'){
    const widthMm=clamp(num(els.makerWidth,100),20,1000),heightMm=clamp(num(els.makerHeight,100),20,1000),n=state.makerItems.length,line=kind==='line';
    const item=makeMakerShapeItem(kind,{xMm:widthMm/2+(n%3-1)*4,yMm:heightMm/2+(Math.floor(n/3)%3-1)*4,widthMm:Math.min(line?52:32,widthMm*.5),heightMm:Math.min(line?10:32,heightMm*.45),effects:defaultMakerEffects()});
    state.makerItems.push(item);els.makerCount.textContent=`${state.makerItems.length}개`;selectMaker(item.id);await generateMaker();saveWorkspaceNow();checkpointHistory();
  }
  function makerPrimaryItem(){return state.makerItems.find(v=>v.id===state.makerSelectedId)||makerSelectedItems().at(-1)||null;}
  function refreshMakerAfterObjectEdit({rerenderEffects=false,notice=null}={}){updateMakerUi({skipEffectRender:!rerenderEffects});drawPreview();scheduleMakerGenerate();schedulePersist(0);queueHistoryCheckpoint();if(notice)setNotice('good',notice.title,notice.body);}
  function toggleMakerObjectLock(){
    const targets=makerSelectedItems();if(!targets.length)return;const shouldLock=!targets.every(v=>v.locked);for(const item of targets)item.locked=shouldLock;updateMakerUi();drawPreview();schedulePersist(0);checkpointHistory();setNotice('good',shouldLock?'개체를 잠갔습니다':'개체 잠금을 해제했습니다',shouldLock?'잠긴 개체는 선택할 수 있지만 이동·크기·회전·효과 편집이 되지 않습니다.':'다시 이동하고 편집할 수 있습니다.');
  }
  function addMakerEffectLayer(){
    const item=makerPrimaryItem();if(!item||item.locked)return;const effects=normalizeMakerEffects(item.effects);effects.layers.push(makerEffectDefaults(els.makerEffectAddType?.value||'outline'));setMakerEffectsOnTargets(item,effects);refreshMakerAfterObjectEdit({rerenderEffects:true});
  }
  function mutateMakerEffectControl(control){
    const item=makerPrimaryItem();if(!item||item.locked)return;const card=control.closest('[data-effect-id]'),id=card?.dataset.effectId,field=control.dataset.effectField;if(!id||!field)return;const effects=normalizeMakerEffects(item.effects),layer=effects.layers.find(v=>v.id===id);if(!layer)return;
    layer[field]=control.type==='checkbox'?control.checked:(control.classList.contains('color-source')||control.type==='color'?control.value:Number(control.value));setMakerEffectsOnTargets(item,effects);if(field==='enabled')renderMakerEffectList(item);drawPreview();scheduleMakerGenerate();schedulePersist(0);queueHistoryCheckpoint();
  }
  function handleMakerEffectAction(button){
    const item=makerPrimaryItem();if(!item||item.locked)return;const card=button.closest('[data-effect-id]'),id=card?.dataset.effectId,action=button.dataset.effectAction,effects=normalizeMakerEffects(item.effects),index=effects.layers.findIndex(v=>v.id===id);if(index<0)return;
    if(action==='delete')effects.layers.splice(index,1);else if(action==='up'&&index>0)[effects.layers[index-1],effects.layers[index]]=[effects.layers[index],effects.layers[index-1]];else if(action==='down'&&index<effects.layers.length-1)[effects.layers[index+1],effects.layers[index]]=[effects.layers[index],effects.layers[index+1]];setMakerEffectsOnTargets(item,effects);refreshMakerAfterObjectEdit({rerenderEffects:true});
  }
  function replaceOverlappingTextRanges(ranges,start,end,color){
    const next=[];for(const r of ranges){if(r.end<=start||r.start>=end){next.push(r);continue;}if(r.start<start)next.push({...r,end:start});if(r.end>end)next.push({...r,start:end});}next.push({start,end,color});return next.filter(r=>r.end>r.start).sort((a,b)=>a.start-b.start);
  }
  function applySelectedTextBackground(){
    const item=makerPrimaryItem();if(makerObjectType(item)!=='text'||item.locked)return;const start=els.makerTextContent.selectionStart??0,end=els.makerTextContent.selectionEnd??0;if(end<=start){setNotice('warn','글자를 먼저 선택해 주세요','내용 입력창에서 배경색을 넣을 글자 범위를 드래그한 뒤 다시 눌러 주세요.');return;}
    const style=normalizeTextStyle(item.textStyle),max=style.text.length,s=clamp(start,0,max),e=clamp(end,0,max);style.background.enabled=true;style.background.color=els.makerTextBackgroundColor.value;style.background.ranges=replaceOverlappingTextRanges(style.background.ranges,s,e,style.background.color);item.textStyle=style;els.makerTextBackgroundEnabled.checked=true;refreshMakerAfterObjectEdit({rerenderEffects:false});
  }
  function applyAllTextBackground(){
    const item=makerPrimaryItem();if(makerObjectType(item)!=='text'||item.locked)return;const style=normalizeTextStyle(item.textStyle);if(!style.text.length){setNotice('warn','글자를 먼저 입력해 주세요','내용이 있는 글상자에서 전체 배경을 적용할 수 있습니다.');return;}style.background.enabled=true;style.background.color=els.makerTextBackgroundColor.value;style.background.ranges=[{start:0,end:style.text.length,color:style.background.color}];item.textStyle=style;els.makerTextBackgroundEnabled.checked=true;refreshMakerAfterObjectEdit({rerenderEffects:false});
  }
  function clearSelectedTextBackground(){const item=makerPrimaryItem();if(makerObjectType(item)!=='text'||item.locked)return;const style=normalizeTextStyle(item.textStyle);style.background.ranges=[];item.textStyle=style;refreshMakerAfterObjectEdit({rerenderEffects:false});}
  function deleteSelectedTextBackground(index){const item=makerPrimaryItem();if(makerObjectType(item)!=='text'||item.locked)return;const style=normalizeTextStyle(item.textStyle);style.background.ranges.splice(index,1);item.textStyle=style;refreshMakerAfterObjectEdit({rerenderEffects:false});}

  function deleteSelectedMakerItems(){
    const selectedIds=state.makerSelectedIds.length?state.makerSelectedIds:(state.makerSelectedId?[state.makerSelectedId]:[]),selectedSet=new Set(selectedIds),lockedCount=state.makerItems.filter(v=>selectedSet.has(v.id)&&v.locked).length,deletable=new Set(state.makerItems.filter(v=>selectedSet.has(v.id)&&!v.locked).map(v=>v.id));if(!deletable.size){setNotice('warn','잠긴 개체는 삭제할 수 없습니다','잠금을 해제한 뒤 삭제해 주세요.');return;}state.makerItems=state.makerItems.filter(v=>!deletable.has(v.id));els.makerCount.textContent=`${state.makerItems.length}개`;selectMaker(null);generateMaker();checkpointHistory();schedulePersist(0);if(lockedCount)setNotice('good','선택 개체를 삭제했습니다',`${deletable.size}개를 삭제하고 잠긴 ${lockedCount}개는 유지했습니다.`);
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

  function getViewTransformForResult(result = state.result, zoom = state.zoom) {
    const cw = els.canvas.width, ch = els.canvas.height;
    if (!result) return { scale: 1, x: 0, y: 0, baseX: 0, baseY: 0, boardW: 0, boardH: 0 };
    const fit = Math.min((cw - 100) / result.widthPx, (ch - 100) / result.heightPx);
    const scale = Math.max(0.05, fit * zoom);
    const boardW = result.widthPx * scale, boardH = result.heightPx * scale;
    const baseX = (cw - boardW) / 2, baseY = (ch - boardH) / 2;
    return { scale, x: baseX + state.panX, y: baseY + state.panY, baseX, baseY, boardW, boardH };
  }

  function getViewTransform() { return getViewTransformForResult(state.result, state.zoom); }

  function previewMessageColor() {
    try {
      const wrap = document.querySelector('.stage-wrap');
      const parts = wrap ? getComputedStyle(wrap).backgroundColor.match(/[\d.]+/g) : null;
      if (parts && parts.length >= 3) {
        const [r, g, b] = parts.slice(0, 3).map(Number);
        const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
        const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
        return luminance > 0.42 ? 'rgba(31,36,41,.78)' : 'rgba(240,244,247,.82)';
      }
    } catch (e) { /* 배경을 못 읽으면 밝은 배경 기준으로 둔다 */ }
    return 'rgba(31,36,41,.78)';
  }

  function drawPreviewMessage(text, centerX, centerY, maxWidth, dpr) {
    const fontSize = 12 * dpr;
    ctx.save();
    // 안내 글은 '테마'가 아니라 '지금 깔려 있는 미리보기 배경' 위에 얹힌다.
    // 배경은 사용자가 흰·회·검·투명격자·직접선택 중에서 고르므로, 테마 색을
    // 그대로 쓰면 어두운 배경에서 글이 사라진다. 실제 배경 밝기를 재서 고른다.
    ctx.fillStyle = previewMessageColor();
    ctx.font = `${fontSize}px system-ui, -apple-system, Roboto, "Noto Sans KR", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const words = String(text || '').split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(candidate).width > maxWidth) { lines.push(line); line = word; }
      else line = candidate;
    }
    if (line) lines.push(line);
    // 3줄에서 잘라내며 아무 표시도 남기지 않아, 좁은 화면에서는 안내문의
    // 마지막 마디('나타납니다.')가 소리 없이 사라졌다. 4줄까지 허용하고
    // 그래도 넘치면 말줄임표로 잘렸다는 것을 알린다.
    const MAX_LINES = 4;
    const visible = lines.slice(0, MAX_LINES);
    if (lines.length > MAX_LINES && visible.length) visible[visible.length - 1] += '…';
    const lineHeight = fontSize * 1.35;
    visible.forEach((value, index) => ctx.fillText(value, centerX, centerY + (index - (visible.length - 1) / 2) * lineHeight));
    ctx.restore();
  }

  function getDraftViewTransform(zoom = state.zoom) {
    const cw=els.canvas.width,ch=els.canvas.height,dpr=window.devicePixelRatio||1;
    const boardWmm=state.mode==='acrylic'?clamp(num(els.productWidth,70),5,1000):(state.mode==='maker'?clamp(num(els.makerWidth,100),20,1000):clamp(num(els.artboardWidth,210),20,1000));
    const boardHmm=state.mode==='acrylic'?clamp(num(els.productHeight,70),5,1000):(state.mode==='maker'?clamp(num(els.makerHeight,100),20,1000):clamp(num(els.artboardHeight,297),20,1000));
    const fit=Math.min((cw-72*dpr)/(boardWmm||1),(ch-72*dpr)/(boardHmm||1));
    const scale=Math.max(.05,fit*Math.max(.2,zoom||1));
    const boardW=boardWmm*scale,boardH=boardHmm*scale,baseX=(cw-boardW)/2,baseY=(ch-boardH)/2;
    return {scale,x:baseX+state.panX,y:baseY+state.panY,baseX,baseY,boardW,boardH,boardWmm,boardHmm};
  }

  function drawDraftArtboard(cw,ch){
    const dpr=window.devicePixelRatio||1;
    const draft=getDraftViewTransform(state.zoom),boardWmm=draft.boardWmm,boardHmm=draft.boardHmm,scale=draft.scale,bw=draft.boardW,bh=draft.boardH,bx=draft.x,by=draft.y;
    ctx.save();ctx.fillStyle='rgba(255,255,255,.10)';ctx.fillRect(bx,by,bw,bh);ctx.strokeStyle='rgba(77,91,99,.30)';ctx.lineWidth=Math.max(1,dpr);ctx.strokeRect(bx+.5,by+.5,bw-1,bh-1);
    if(state.mode==='acrylic'&&state.source?.img){
      try{
        const trim=getCachedTrimBounds(state.source,currentAcrylicThreshold()),actual=artworkActualSizeMm(),dw=bw*actual.width/boardWmm,dh=bh*actual.height/boardHmm;
        ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(state.source.img,trim.sx,trim.sy,trim.sw,trim.sh,bx+(bw-dw)/2,by+(bh-dh)/2,dw,dh);
        ctx.fillStyle='rgba(42,79,96,.82)';ctx.font=`${9*dpr}px system-ui`;ctx.textAlign='center';ctx.fillText('이미지를 불러왔습니다 · 칼선 계산 중',cw/2,Math.min(ch-12*dpr,by+bh+17*dpr));
      }catch(error){console.warn('임시 이미지 미리보기를 그리지 못했습니다.',error);}
    }else{
      drawPreviewMessage(state.mode==='acrylic'?'이미지를 추가하면 이 대지 안에 미리보기가 나타납니다.':(state.mode==='maker'?'꾸밀 개체 이미지를 추가해 주세요.':'스티커 이미지를 추가해 주세요.'),cw/2,ch/2,Math.max(80*dpr,bw-24*dpr),dpr);
    }
    ctx.restore();updateZoomLabel(getViewTransform());
  }

  function drawPreview() {
    const cw=els.canvas.width,ch=els.canvas.height;ctx.clearRect(0,0,cw,ch);const r=state.result;
    if(!r){drawDraftArtboard(cw,ch);return;}
    const t=getViewTransform();ctx.save();ctx.shadowColor='rgba(25,22,18,.20)';ctx.shadowBlur=30;ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(t.x,t.y,t.boardW,t.boardH);ctx.restore();
    // 확대할 때(1:1 이상)는 **보간을 끈다** — 미리보기와 실제 칼선이 달라
    // 보이던 원인이다(v123). 처리 해상도 1px 이 화면 1px 보다 작을 때는
    // 브라우저가 부드럽게 섞어 그려서, 폭 2px 짜리 홈이 이웃 색에 묻혀
    // 사라진다. 1:1 을 넘어가면 픽셀을 그대로 보여 줘야 눈으로 확인이 된다.
    ctx.save();ctx.imageSmoothingEnabled=t.scale<1;ctx.imageSmoothingQuality='high';
    if(state.view==='background'&&r.hasBackground)ctx.drawImage(r.background,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='original')ctx.drawImage(r.original,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='white-opaque')ctx.drawImage(r.whiteOpaque||r.white,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='white-full')ctx.drawImage(r.white,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='bleed')ctx.drawImage(r.fullPrint,t.x,t.y,t.boardW,t.boardH);
    else if(state.view==='composite'){if(r.hasBackground)ctx.drawImage(r.background,t.x,t.y,t.boardW,t.boardH);ctx.drawImage(r.white,t.x,t.y,t.boardW,t.boardH);if(r.finishStyle==='borderless')ctx.drawImage(r.bleed,t.x,t.y,t.boardW,t.boardH);ctx.drawImage(r.original,t.x,t.y,t.boardW,t.boardH);}
    ctx.restore();
    if(state.view==='cutline'||state.view==='composite'){ctx.save();ctx.beginPath();for(const p of r.cutPaths)drawPath(ctx,p,t.scale,t.scale,t.x,t.y,r.cutCurve??AUTO_CUT_CURVE);ctx.strokeStyle='#ff24b9';ctx.lineWidth=Math.max(1.4,1.2*(window.devicePixelRatio||1));ctx.stroke();ctx.restore();}
    if((r.mode==='sticker'&&!state.splitPreview&&state.selectedStickerIds.length||r.mode==='maker'&&state.makerSelectedIds.length)&&state.view!=='cutline')drawSelection(t);
    if(r.mode==='sticker'&&state.splitPreview)drawSplitPreview(t);
    if(r.mode==='acrylic'&&state.selectedHoleIds.length)drawHoleGuides(t);
    drawSealPoints(t);
    drawCutBridges(t);
    drawBgLassos(t);
    if(r.mode==='sticker'&&state.selectedStickerHoleIds.length)drawStickerHoleGuides(t);
    ctx.save();ctx.strokeStyle='rgba(60,58,54,.25)';ctx.lineWidth=1;ctx.strokeRect(t.x+.5,t.y+.5,t.boardW-1,t.boardH-1);ctx.restore();updateZoomLabel(t);
  }

  // 줌 표시는 "맞춤 대비 몇 %" 였는데, 그것만으로는 지금 보는 그림이 실제
  // 처리 해상도보다 작게 그려지고 있는지 알 길이 없었다. 1:1 밑에서는
  // 칼선의 가는 홈이 화면에 나타날 수가 없으므로 그것을 표시로 알린다 (v123).
  function updateZoomLabel(t){
    const pct=Math.round((state.zoom||1)*100);
    if(!t||!(t.scale>0))return void(els.zoomLabel.textContent=`${pct}%`);
    const ratio=t.scale/(window.devicePixelRatio||1);
    els.zoomLabel.textContent=ratio<1?`${pct}% · 축소`:`${pct}%`;
    els.zoomLabel.title=ratio<1
      ?`처리 해상도의 ${(ratio*100).toFixed(0)}% 로 그려집니다 — 가는 홈은 화면에서 안 보일 수 있습니다. "1:1" 을 눌러 실제 픽셀로 보세요.`
      :`처리 해상도의 ${(ratio*100).toFixed(0)}% — 실제 픽셀 그대로입니다.`;
    els.zoomLabel.classList.toggle('zoom-shrunk',ratio<1);
  }

  // 처리 해상도 1px = 화면 1px 이 되는 배율. 칼선을 눈으로 확인할 때 쓴다.
  function oneToOneZoom(){
    const r=state.result;if(!r)return 1;
    const cw=els.canvas.width,ch=els.canvas.height;
    const fit=Math.min((cw-100)/r.widthPx,(ch-100)/r.heightPx);
    if(!(fit>0))return 1;
    return clamp((window.devicePixelRatio||1)/fit,.05,40);
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
  function drawStickerHoleGuides(t){
    const r=state.result;if(!r||r.mode!=='sticker')return;const dpr=window.devicePixelRatio||1,selected=new Set(state.selectedStickerHoleIds||[]);
    stickerHolesForOwner().forEach((hole,index)=>{if(!selected.has(hole.id))return;const pos=draftStickerHolePixel(hole,r);if(!pos)return;const spec=getHoleSpec(r.ppm,hole,false),cx=t.x+pos.x*t.scale,cy=t.y+pos.y*t.scale,inner=spec.innerR*t.scale,outer=(hole.draftMode==='external'?spec.outerR:spec.innerR)*t.scale,primary=hole.id===state.selectedStickerHoleId;ctx.save();ctx.lineWidth=Math.max(primary?2:1.45,(primary?1.6:1.2)*dpr);ctx.setLineDash([7*dpr,5*dpr]);ctx.strokeStyle=primary?'#4f9fbe':'rgba(83,142,166,.82)';ctx.fillStyle=primary?'rgba(91,180,215,.13)':'rgba(91,180,215,.08)';if(hole.draftMode==='external'){ctx.beginPath();ctx.arc(cx,cy,outer,0,Math.PI*2);ctx.fill();ctx.stroke();}ctx.beginPath();ctx.arc(cx,cy,inner,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=primary?'#fff':'rgba(255,255,255,.88)';ctx.strokeStyle=primary?'#4f9fbe':'#7caec1';ctx.lineWidth=Math.max(1.3,1.1*dpr);ctx.beginPath();ctx.arc(cx,cy,(primary?5:4.1)*dpr,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.font=`${primary?11:10}px system-ui`;ctx.textAlign='center';ctx.textBaseline='bottom';ctx.fillStyle=primary?'#3f7e97':'#6c8d9a';ctx.fillText(`${index+1}. ${hole.draftMode==='internal'?'내부':'외부'}${holeIsDirty(hole)?' · 미적용':''}`,cx,cy-outer-7*dpr);ctx.restore();});
  }
  function itemHeightMm(item){return makerItemHeightMm(item);}
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
    els.stickerSelectedCount.textContent=`${valid.length}개 선택`;els.mergeObjectsBtn.disabled=valid.length<2;if(els.copyStickerBtn)els.copyStickerBtn.disabled=!valid.length;
    els.ungroupObjectsBtn.disabled=!valid.some(id=>state.stickers.find(v=>v.id===id)?.groupId);
    els.multiSelectBtn.textContent=state.multiSelectMode?'다중 선택 켬':'다중 선택 끔';els.multiSelectBtn.classList.toggle('active-toggle',state.multiSelectMode);
    if(state.groupEditIds.length)els.stickerSelectedCount.textContent=`${state.groupEditIds.length}개 개별 이동 선택`;
    normalizeStickerHoleSelection();updateStickerHoleUi();
  }
  function drawItemSelection(t,item,primary=false){
    if(!state.result)return;const ppm=state.result.ppm,size=makerItemSizeMm(item),w=size.width*ppm*t.scale,h=size.height*ppm*t.scale,cx=t.x+item.xMm*ppm*t.scale,cy=t.y+item.yMm*ppm*t.scale,dpr=window.devicePixelRatio||1,locked=state.mode==='maker'&&item.locked;
    ctx.save();ctx.translate(cx,cy);ctx.rotate((Number(item.rotation)||0)*Math.PI/180);ctx.strokeStyle=locked?'#7b8991':(primary?'#4ba8d1':'rgba(82,154,186,.78)');ctx.lineWidth=(primary?2.2:1.5)*dpr;ctx.setLineDash(primary?[7*dpr,5*dpr]:[4*dpr,4*dpr]);ctx.strokeRect(-w/2,-h/2,w,h);ctx.setLineDash([]);
    const coarse=window.matchMedia?.('(pointer: coarse)').matches,r=(primary?(coarse?10:6):(coarse?7:4.5))*dpr;ctx.fillStyle='#fff';ctx.strokeStyle=primary?'#4ba8d1':'#7fb6ca';ctx.lineWidth=2*dpr;
    if(primary&&!locked){for(const [x,y] of [[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]]){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.stroke();}const rotateY=-h/2-24*dpr;ctx.beginPath();ctx.moveTo(0,-h/2);ctx.lineTo(0,rotateY+r);ctx.stroke();ctx.beginPath();ctx.arc(0,rotateY,r+1*dpr,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#4ba8d1';ctx.font=`${11*dpr}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('↻',0,rotateY+.5*dpr);}
    if(locked){ctx.fillStyle='rgba(45,58,66,.9)';ctx.font=`${Math.max(12,14*dpr)}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🔒',0,0);}
    ctx.restore();
  }
  function drawMakerSelectionBounds(t,ids){
    const selected=state.makerItems.filter(v=>ids.includes(v.id));if(selected.length<2||!state.result)return;
    const bounds=selected.map(v=>itemCutBoundsMm(v,'maker')),box={minX:Math.min(...bounds.map(v=>v.minX)),maxX:Math.max(...bounds.map(v=>v.maxX)),minY:Math.min(...bounds.map(v=>v.minY)),maxY:Math.max(...bounds.map(v=>v.maxY))},dpr=window.devicePixelRatio||1;
    ctx.save();ctx.strokeStyle='#287fa8';ctx.fillStyle='rgba(75,168,209,.055)';ctx.lineWidth=2.2*dpr;ctx.setLineDash([8*dpr,5*dpr]);const x=t.x+box.minX*state.result.ppm*t.scale,y=t.y+box.minY*state.result.ppm*t.scale,w=(box.maxX-box.minX)*state.result.ppm*t.scale,h=(box.maxY-box.minY)*state.result.ppm*t.scale;ctx.fillRect(x,y,w,h);ctx.strokeRect(x,y,w,h);ctx.restore();
  }
  function drawSelection(t){
    const items=state.mode==='maker'?state.makerItems:state.stickers,ids=state.mode==='maker'?state.makerSelectedIds:state.selectedStickerIds,showPrimary=ids.length===1;
    for(const id of ids){const item=items.find(v=>v.id===id);if(item)drawItemSelection(t,item,showPrimary&&id===(state.mode==='maker'?state.makerSelectedId:state.selectedId));}
    if(state.mode==='maker')drawMakerSelectionBounds(t,ids);
    if(['marquee','maker-marquee'].includes(state.dragging?.type)&&state.dragging.current){const a=state.dragging.start,b=state.dragging.current;ctx.save();ctx.strokeStyle='#4ba8d1';ctx.fillStyle='rgba(75,168,209,.12)';ctx.setLineDash([6,4]);const x1=t.x+Math.min(a.xPx,b.xPx)*t.scale,y1=t.y+Math.min(a.yPx,b.yPx)*t.scale,x2=t.x+Math.max(a.xPx,b.xPx)*t.scale,y2=t.y+Math.max(a.yPx,b.yPx)*t.scale;ctx.fillRect(x1,y1,x2-x1,y2-y1);ctx.strokeRect(x1,y1,x2-x1,y2-y1);ctx.restore();}
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
    if(!item||!state.result||(state.mode==='maker'&&item.locked))return null;const t=getViewTransform(),hitCss=window.matchMedia?.('(pointer: coarse)').matches?30:16,hitMm=hitCss/(state.result.ppm*t.scale),dx=point.xMm-item.xMm,dy=point.yMm-item.yMm,a=-item.rotation*Math.PI/180,lx=dx*Math.cos(a)-dy*Math.sin(a),ly=dx*Math.sin(a)+dy*Math.cos(a),w=makerItemSizeMm(item).width,h=itemHeightMm(item),rotateY=-h/2-24*(window.devicePixelRatio||1)/(state.result.ppm*t.scale);
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
  function makerGroupIds(item){return item?.groupId?state.makerItems.filter(v=>v.groupId===item.groupId).map(v=>v.id):(item?[item.id]:[]);}
  function makerSelectedItems(){const set=new Set(state.makerSelectedIds||[]);return state.makerItems.filter(v=>set.has(v.id));}
  function selectMaker(id,options={}){
    if(!id){state.makerSelectedIds=[];state.makerSelectedId=null;updateMakerUi();drawPreview();return;}
    const item=state.makerItems.find(v=>v.id===id);if(!item)return;
    const ids=makerGroupIds(item),additive=!!options.additive||state.makerMultiSelectMode,set=new Set(state.makerSelectedIds||[]);
    if(additive)for(const memberId of ids)set.add(memberId);else{set.clear();for(const memberId of ids)set.add(memberId);}
    state.makerSelectedIds=[...set];state.makerSelectedId=id;updateMakerUi();drawPreview();
  }
  function movementIdsForMaker(hit){
    if(state.makerSelectedIds.includes(hit.id)&&state.makerSelectedIds.length>1)return [...state.makerSelectedIds];
    if(hit.groupId)return makerGroupIds(hit);
    return [hit.id];
  }
  function groupSelectedMakerItems(){
    const selectedSet=new Set(state.makerSelectedIds||[]);for(const item of state.makerItems)if(selectedSet.has(item.id)&&item.groupId)for(const id of makerGroupIds(item))selectedSet.add(id);
    const block=state.makerItems.filter(v=>selectedSet.has(v.id));if(block.length<2)return;if(block.some(v=>v.locked)){setNotice('warn','잠긴 개체는 그룹화할 수 없습니다','잠금을 해제한 뒤 다시 그룹화해 주세요.');return;}
    const source=state.makerItems.find(v=>v.id===state.makerSelectedId)||block.at(-1),effects=normalizeMakerEffects(JSON.parse(JSON.stringify(source.effects||defaultMakerEffects()))),groupId=uid();
    const indexed=state.makerItems.map((v,i)=>({v,i})),topIndex=Math.max(...indexed.filter(o=>selectedSet.has(o.v.id)).map(o=>o.i)),remaining=indexed.filter(o=>!selectedSet.has(o.v.id)),target=remaining.filter(o=>o.i<=topIndex).length;
    for(const item of block){item.groupId=groupId;item.effects=normalizeMakerEffects(JSON.parse(JSON.stringify(effects)));}
    const next=remaining.map(o=>o.v);next.splice(target,0,...block);state.makerItems.splice(0,state.makerItems.length,...next);
    state.makerSelectedIds=block.map(v=>v.id);state.makerSelectedId=source.id;updateMakerUi();drawPreview();scheduleMakerGenerate();schedulePersist(0);checkpointHistory();
    setNotice('good','개체를 그룹화했습니다',`${block.length}개 개체를 하나의 합성 이미지처럼 처리합니다. 외곽선·광선·그림자는 겹친 내부 경계 없이 그룹 바깥에만 적용됩니다.`);
  }
  function ungroupSelectedMakerItems(){
    const selected=makerSelectedItems(),groupIds=new Set(selected.map(v=>v.groupId).filter(Boolean));if(!groupIds.size)return;
    const affected=state.makerItems.filter(v=>groupIds.has(v.groupId));if(affected.some(v=>v.locked)){setNotice('warn','잠긴 그룹은 해제할 수 없습니다','그룹 개체의 잠금을 해제한 뒤 다시 시도해 주세요.');return;}for(const item of affected)item.groupId=null;
    state.makerSelectedIds=affected.map(v=>v.id);state.makerSelectedId=state.makerSelectedIds.at(-1)||null;updateMakerUi();drawPreview();scheduleMakerGenerate();schedulePersist(0);checkpointHistory();
    setNotice('good','그룹을 해제했습니다',`${affected.length}개 개체가 다시 개별 개체로 분리되었습니다.`);
  }

  function updateSelectedFromFields(){const s=state.stickers.find(v=>v.id===state.selectedId);if(!s)return;s.widthMm=clamp(num(els.selWidth,s.widthMm),2,500);s.rotation=num(els.selRotation,s.rotation);s.xMm=num(els.selX,s.xMm);s.yMm=num(els.selY,s.yMm);drawPreview();scheduleStickerGenerate();}

  function itemCutBoundsMm(item,mode='sticker'){
    const fullW=makerItemSizeMm(item).width,fullH=makerItemSizeMm(item).height,type=makerObjectType(item);let left=-fullW/2,right=fullW/2,top=-fullH/2,bottom=fullH/2;
    if((mode==='sticker'||type==='image')&&item.img&&item.naturalWidth&&item.naturalHeight){const threshold=mode==='sticker'?clamp(num(currentFinishStyle('sticker')==='borderless'?els.stickerAlphaThreshold:els.stickerAlphaThresholdBordered,24),1,254):2,trim=getCachedTrimBounds(item,threshold);left=(trim.sx/item.naturalWidth-.5)*fullW;right=((trim.sx+trim.sw)/item.naturalWidth-.5)*fullW;top=(trim.sy/item.naturalHeight-.5)*fullH;bottom=((trim.sy+trim.sh)/item.naturalHeight-.5)*fullH;}
    const a=(Number(item.rotation)||0)*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),points=[[left,top],[right,top],[right,bottom],[left,bottom]].map(([x,y])=>({x:item.xMm+x*ca-y*sa,y:item.yMm+x*sa+y*ca}));let margin=0;if(mode==='sticker'&&currentFinishStyle('sticker')==='bordered')margin=clamp(num(els.stickerBorder,2),0,20);if(mode==='maker')margin=makerEffectPaddingMm(item.effects);
    return{minX:Math.min(...points.map(p=>p.x))-margin,maxX:Math.max(...points.map(p=>p.x))+margin,minY:Math.min(...points.map(p=>p.y))-margin,maxY:Math.max(...points.map(p=>p.y))+margin};
  }
  function alignItemsToBoard(mode,action){
    const items=mode==='maker'?state.makerItems:state.stickers,ids=mode==='maker'?(state.makerSelectedIds.length?state.makerSelectedIds:(state.makerSelectedId?[state.makerSelectedId]:[])):(state.selectedStickerIds.length?state.selectedStickerIds:(state.selectedId?[state.selectedId]:[]));if(!ids.length)return;
    const selected=items.filter(v=>ids.includes(v.id)),bounds=selected.map(v=>itemCutBoundsMm(v,mode)),box={minX:Math.min(...bounds.map(b=>b.minX)),maxX:Math.max(...bounds.map(b=>b.maxX)),minY:Math.min(...bounds.map(b=>b.minY)),maxY:Math.max(...bounds.map(b=>b.maxY))},boardW=mode==='maker'?clamp(num(els.makerWidth,100),20,1000):clamp(num(els.artboardWidth,210),20,1000),boardH=mode==='maker'?clamp(num(els.makerHeight,100),20,1000):clamp(num(els.artboardHeight,297),20,1000);let dx=0,dy=0;
    if(action==='center-x'||action==='center-both')dx=boardW/2-(box.minX+box.maxX)/2;if(action==='center-y'||action==='center-both')dy=boardH/2-(box.minY+box.maxY)/2;if(action==='left')dx=-box.minX;if(action==='right')dx=boardW-box.maxX;if(action==='top')dy=-box.minY;if(action==='bottom')dy=boardH-box.maxY;
    const movable=mode==='maker'?selected.filter(v=>!v.locked):selected;if(!movable.length){if(mode==='maker')setNotice('warn','잠긴 개체는 정렬할 수 없습니다','잠금을 해제한 뒤 다시 시도해 주세요.');return;}movable.forEach(v=>{v.xMm+=dx;v.yMm+=dy;});mode==='maker'?updateMakerUi():syncStickerSelectionUi();drawPreview();mode==='maker'?scheduleMakerGenerate():scheduleStickerGenerate();schedulePersist(0);queueHistoryCheckpoint();
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

  function makerEffectDefaults(type='outline'){
    const base={id:uid(),type,enabled:true};
    if(type==='outline')return{...base,color:'#ffffffff',widthMm:3};
    if(type==='outerGlow')return{...base,color:'#7bdcffff',opacity:70,sizeMm:4,spread:35};
    if(type==='innerGlow')return{...base,color:'#ffffffff',opacity:55,sizeMm:3,spread:25};
    if(type==='shadow')return{...base,color:'#203044ff',opacity:45,sizeMm:3,spread:20,xMm:2,yMm:2};
    return{...base,type:'extrusion',color:'#31516bff',opacity:100,depthMm:4,angle:135};
  }
  function normalizeMakerEffectLayer(layer={}){
    const type=['outline','outerGlow','innerGlow','shadow','extrusion'].includes(layer.type)?layer.type:'outline',d=makerEffectDefaults(type),v={...d,...layer,id:layer.id||uid(),type,enabled:layer.enabled!==false};
    if(type==='outline')v.widthMm=clamp(Number(v.widthMm)||0,0,50);
    if(type==='outerGlow'||type==='innerGlow'){v.opacity=clamp(Number(v.opacity)||0,0,100);v.sizeMm=clamp(Number(v.sizeMm)||0,0,50);v.spread=clamp(Number(v.spread)||0,0,100);}
    if(type==='shadow'){v.opacity=clamp(Number(v.opacity)||0,0,100);v.sizeMm=clamp(Number(v.sizeMm)||0,0,50);v.spread=clamp(Number(v.spread)||0,0,100);v.xMm=clamp(Number(v.xMm)||0,-100,100);v.yMm=clamp(Number(v.yMm)||0,-100,100);}
    if(type==='extrusion'){v.opacity=clamp(Number(v.opacity)||100,0,100);v.depthMm=clamp(Number(v.depthMm)||0,0,100);v.angle=Number(v.angle)||0;}
    return v;
  }
  function defaultMakerEffects(){return{layers:[]};}
  function normalizeMakerEffects(value){
    if(Array.isArray(value))return{layers:value.map(normalizeMakerEffectLayer)};
    if(Array.isArray(value?.layers))return{layers:value.layers.map(normalizeMakerEffectLayer)};
    const layers=[];const legacy=value||{};
    for(const type of ['shadow','extrusion','outerGlow','outline','innerGlow'])if(legacy[type]?.enabled)layers.push(normalizeMakerEffectLayer({type,...legacy[type]}));
    return{layers};
  }
  function makerEffectLayers(value){return normalizeMakerEffects(value).layers.filter(v=>v.enabled!==false);}
  function makerEffectPaddingMm(value){let pad=0;for(const e of makerEffectLayers(value)){if(e.type==='outline')pad=Math.max(pad,e.widthMm);if(e.type==='outerGlow')pad=Math.max(pad,e.sizeMm*2.5);if(e.type==='shadow')pad=Math.max(pad,e.sizeMm*2.5+Math.abs(e.xMm)+Math.abs(e.yMm));if(e.type==='extrusion')pad=Math.max(pad,e.depthMm+2);}return pad;}
  function makerEffectTargets(item){const selected=makerSelectedItems();return item?.groupId?state.makerItems.filter(v=>v.groupId===item.groupId):(selected.length>1?selected:(item?[item]:[]));}
  function setMakerEffectsOnTargets(item,effects){for(const target of makerEffectTargets(item))target.effects=normalizeMakerEffects(JSON.parse(JSON.stringify(effects)));}
  function effectTypeLabel(type){return({outline:'외곽선',outerGlow:'외부광선',innerGlow:'내부광선',shadow:'그림자',extrusion:'입체'})[type]||'효과';}
  function effectFieldsHtml(layer){
    const effectColor=colorToHex8(parseColorValue(layer.color||'#000000ff')),color=`<label class="field color-field"><span>색</span><input type="color" data-effect-field="color" value="${escapeXml(effectColor.slice(0,7))}" data-initial-color="${escapeXml(effectColor)}"></label>`;
    if(layer.type==='outline')return`<div class="field-grid two">${color}<label class="field"><span>두께</span><div class="input-with-unit"><input type="number" data-effect-field="widthMm" min="0" max="50" step="0.1" value="${layer.widthMm}"><em>mm</em></div></label></div>`;
    if(layer.type==='outerGlow'||layer.type==='innerGlow')return`<div class="effect-grid">${color}<label class="field"><span>정도</span><div class="input-with-unit"><input type="number" data-effect-field="opacity" min="0" max="100" step="1" value="${layer.opacity}"><em>%</em></div></label><label class="field"><span>크기</span><div class="input-with-unit"><input type="number" data-effect-field="sizeMm" min="0" max="50" step="0.1" value="${layer.sizeMm}"><em>mm</em></div></label><label class="field"><span>번짐</span><div class="input-with-unit"><input type="number" data-effect-field="spread" min="0" max="100" step="1" value="${layer.spread}"><em>%</em></div></label></div>`;
    if(layer.type==='shadow')return`<div class="effect-grid">${color}<label class="field"><span>정도</span><div class="input-with-unit"><input type="number" data-effect-field="opacity" min="0" max="100" step="1" value="${layer.opacity}"><em>%</em></div></label><label class="field"><span>블러</span><div class="input-with-unit"><input type="number" data-effect-field="sizeMm" min="0" max="50" step="0.1" value="${layer.sizeMm}"><em>mm</em></div></label><label class="field"><span>번짐</span><div class="input-with-unit"><input type="number" data-effect-field="spread" min="0" max="100" step="1" value="${layer.spread}"><em>%</em></div></label><label class="field"><span>가로</span><div class="input-with-unit"><input type="number" data-effect-field="xMm" min="-100" max="100" step="0.1" value="${layer.xMm}"><em>mm</em></div></label><label class="field"><span>세로</span><div class="input-with-unit"><input type="number" data-effect-field="yMm" min="-100" max="100" step="0.1" value="${layer.yMm}"><em>mm</em></div></label></div>`;
    return`<div class="effect-grid">${color}<label class="field"><span>정도</span><div class="input-with-unit"><input type="number" data-effect-field="opacity" min="0" max="100" step="1" value="${layer.opacity}"><em>%</em></div></label><label class="field"><span>깊이</span><div class="input-with-unit"><input type="number" data-effect-field="depthMm" min="0" max="100" step="0.1" value="${layer.depthMm}"><em>mm</em></div></label><label class="field"><span>방향</span><div class="input-with-unit"><input type="number" data-effect-field="angle" min="-360" max="360" step="1" value="${layer.angle}"><em>°</em></div></label></div><small class="field-help">블러 없이 개체와 끝 지점 사이를 색으로 채워 도톰한 입체 면을 만듭니다.</small>`;
  }
  function renderMakerEffectList(item){
    if(!els.makerEffectList)return;const effects=normalizeMakerEffects(item?.effects);if(item)item.effects=effects;
    if(!item||!effects.layers.length){els.makerEffectList.innerHTML='<p class="effect-list-empty">추가된 효과가 없습니다. <b>＋ 효과 추가</b>로 그림자나 테두리를 얹어 보세요.</p>';return;}
    els.makerEffectList.innerHTML=effects.layers.map((layer,index)=>`<article class="effect-layer-card" data-effect-id="${layer.id}"><div class="effect-layer-heading"><label class="effect-enable"><input type="checkbox" data-effect-field="enabled" ${layer.enabled!==false?'checked':''}><strong>${effectTypeLabel(layer.type)}</strong></label><div class="effect-layer-actions"><button type="button" data-effect-action="up" title="위로">↑</button><button type="button" data-effect-action="down" title="아래로">↓</button><button type="button" data-effect-action="delete" title="삭제">×</button></div></div><div class="${layer.enabled===false?'effect-disabled':''}">${effectFieldsHtml(layer)}</div></article>`).join('');
    upgradeColorInputs();upgradeNumericInputs();refreshColorControls();
  }
  function readMakerFillFields(){return normalizeFillSpec({type:els.makerObjectFillType.value,color:els.makerObjectFillColor.value,gradientA:els.makerObjectGradientA.value,gradientB:els.makerObjectGradientB.value,gradientAngle:num(els.makerObjectGradientAngle,135),patternKind:els.makerObjectPatternKind.value,patternColor:els.makerObjectPatternColor.value,patternBackground:els.makerObjectPatternBackground.value,patternSizeMm:num(els.makerObjectPatternSize,3),patternGapMm:num(els.makerObjectPatternGap,2),patternRotation:num(els.makerObjectPatternRotation,0)});}
  function writeMakerFillFields(fillValue){const f=normalizeFillSpec(fillValue);els.makerObjectFillType.value=f.type;els.makerObjectFillColor.value=f.color;els.makerObjectGradientA.value=f.gradientA;els.makerObjectGradientB.value=f.gradientB;els.makerObjectGradientAngle.value=f.gradientAngle;els.makerObjectPatternKind.value=f.patternKind;els.makerObjectPatternColor.value=f.patternColor;els.makerObjectPatternBackground.value=f.patternBackground;els.makerObjectPatternSize.value=f.patternSizeMm;els.makerObjectPatternGap.value=f.patternGapMm;els.makerObjectPatternRotation.value=f.patternRotation;updateMakerObjectFillUi();}
  // v50.18 — 단색/그라데이션/패턴 필드의 표시는 conditional-visibility.js 가 판단한다.
  // 이 함수는 호출 지점을 유지하기 위해 남겨 두고, 판단만 그쪽으로 넘긴다.
  function updateMakerObjectFillUi(){window.GoodsMakerVisibility?.sync?.();}
  function renderTextBackgroundRanges(item){if(!els.makerTextBackgroundRangeList)return;const style=normalizeTextStyle(item?.textStyle),ranges=style.background.ranges||[];els.makerTextBackgroundRangeList.innerHTML=ranges.length?ranges.map((r,i)=>`<div class="text-range-chip"><span>${r.start+1}–${r.end}</span><span class="range-color" style="background:${colorToCss(r.color)}"></span><button type="button" data-text-range-delete="${i}" aria-label="삭제">×</button></div>`).join(''):'<small class="field-help">지정된 부분 배경이 없습니다.</small>';}
  function updateMakerSelectedFromFields(){
    const item=state.makerItems.find(v=>v.id===state.makerSelectedId);if(!item||item.locked)return;const selected=makerSelectedItems(),active=document.activeElement,selStart=active===els.makerTextContent?els.makerTextContent.selectionStart:null,selEnd=active===els.makerTextContent?els.makerTextContent.selectionEnd:null;
    if(selected.length===1){item.widthMm=clamp(num(els.makerSelWidth,item.widthMm),.5,1000);item.rotation=num(els.makerSelRotation,item.rotation);item.xMm=num(els.makerSelX,item.xMm);item.yMm=num(els.makerSelY,item.yMm);if(makerObjectType(item)==='image'){item.aspectMode=els.makerAspectMode.value==='free'?'free':'locked';if(item.aspectMode==='free')item.heightMm=clamp(num(els.makerSelHeight,makerItemHeightMm(item)),.5,1000);else item.heightMm=null;}else item.heightMm=clamp(num(els.makerSelHeight,makerItemHeightMm(item)),.5,1000);}
    if(makerObjectType(item)==='text'){
      const old=normalizeTextStyle(item.textStyle),text=els.makerTextContent.value,background={...old.background,enabled:els.makerTextBackgroundEnabled.checked,color:els.makerTextBackgroundColor.value,ranges:old.background.ranges.map(r=>({...r,start:clamp(r.start,0,text.length),end:clamp(r.start===0&&r.end===old.text.length?text.length:r.end,0,text.length)})).filter(r=>r.end>r.start)};item.textStyle=normalizeTextStyle({...old,text,fontFamily:els.makerTextFont.value,fontWeight:num(els.makerTextWeight,400),fontSizeMm:num(els.makerTextFontSize,8),lineHeight:num(els.makerTextLineHeight,1.2),letterSpacingMm:num(els.makerTextLetterSpacing,0),align:els.makerTextAlign.value,verticalAlign:els.makerTextVerticalAlign.value,fill:readMakerFillFields(),background});
    }else if(makerObjectType(item)==='shape'){
      item.shapeStyle=normalizeShapeStyle({kind:els.makerShapeKind.value,cornerRadius:num(els.makerCornerRadius,20),strokeWidthMm:num(els.makerShapeStrokeWidth,0),strokeColor:els.makerShapeStrokeColor.value,lineStyle:els.makerLineStyle.value,lineWidthMm:num(els.makerLineWidth,2),lineCap:els.makerLineCap.value,fill:readMakerFillFields()});
    }
    updateMakerUi({skipEffectRender:true});if(active===els.makerTextContent&&selStart!==null){els.makerTextContent.focus({preventScroll:true});els.makerTextContent.setSelectionRange(selStart,selEnd);}drawPreview();scheduleMakerGenerate();schedulePersist(0);queueHistoryCheckpoint();
  }
  function applySelectedMakerEffectsToAll(){
    const selected=state.makerItems.find(v=>v.id===state.makerSelectedId);if(!selected||selected.locked)return;const effects=normalizeMakerEffects(selected.effects),targets=state.makerItems.filter(v=>!v.locked);for(const item of targets)item.effects=normalizeMakerEffects(JSON.parse(JSON.stringify(effects)));
    updateMakerUi();drawPreview();scheduleMakerGenerate();schedulePersist(0);setNotice('good','효과를 전체 개체에 적용했습니다',`${targets.length}개 개체에 효과 레이어를 동일하게 적용했습니다.${state.makerItems.length-targets.length?` 잠긴 ${state.makerItems.length-targets.length}개는 유지했습니다.`:''}`);
  }



  async function duplicateStickerObjects(){
    const sources=clipboardSelection(state.stickers,state.selectedStickerIds,state.selectedId,item=>stickerGroupIds(item));if(!sources.length)return;
    const widthMm=clamp(num(els.artboardWidth,210),20,1000),heightMm=clamp(num(els.artboardHeight,297),20,1000),groupMap=new Map(),idMap=new Map(),deltaMap=new Map(),offset=6;
    const pasted=sources.map(source=>{const item=cloneHistoryItem(source),oldId=item.id,oldX=Number(item.xMm)||0,oldY=Number(item.yMm)||0;item.id=uid();idMap.set(oldId,item.id);if(item.groupId){if(!groupMap.has(item.groupId))groupMap.set(item.groupId,uid());item.groupId=groupMap.get(item.groupId);}item.xMm=clamp(oldX+offset,0,widthMm);item.yMm=clamp(oldY+offset,0,heightMm);deltaMap.set(oldId,{dx:item.xMm-oldX,dy:item.yMm-oldY});return item;});
    const sourceIds=new Set(sources.map(item=>item.id)),newHoles=state.stickerHoles.filter(hole=>sourceIds.has(hole.ownerId)).map(source=>{const hole=normalizeHoleRecord(JSON.parse(JSON.stringify(source))),delta=deltaMap.get(source.ownerId)||{dx:0,dy:0};hole.id=uid();hole.ownerId=idMap.get(source.ownerId);for(const prefix of ['draft','applied']){if(Number.isFinite(hole[`${prefix}Xmm`]))hole[`${prefix}Xmm`]+=delta.dx;if(Number.isFinite(hole[`${prefix}Ymm`]))hole[`${prefix}Ymm`]+=delta.dy;}return hole;});
    state.stickers.push(...pasted);state.stickerHoles.push(...newHoles);state.selectedStickerIds=pasted.map(item=>item.id);state.selectedId=pasted.at(-1)?.id||null;state.selectedStickerHoleIds=[];state.selectedStickerHoleId=null;clearGroupMemberEdit();els.stickerCount.textContent=`${state.stickers.length}개`;syncStickerSelectionUi();await generateSticker();schedulePersist(0,true);checkpointHistory();setNotice('good','스티커 개체를 복제했습니다',`${pasted.length}개 개체와 귀속 칼선·화이트·타공을 함께 복제했습니다.`);
  }
  async function duplicateMakerObjects(){
    const sources=clipboardSelection(state.makerItems,state.makerSelectedIds,state.makerSelectedId,item=>makerGroupIds(item));if(!sources.length)return;const widthMm=clamp(num(els.makerWidth,100),20,1000),heightMm=clamp(num(els.makerHeight,100),20,1000),groupMap=new Map(),offset=6;
    const pasted=sources.map(source=>{const item=cloneHistoryItem(source);item.id=uid();if(item.groupId){if(!groupMap.has(item.groupId))groupMap.set(item.groupId,uid());item.groupId=groupMap.get(item.groupId);}item.xMm=clamp((Number(item.xMm)||0)+offset,0,widthMm);item.yMm=clamp((Number(item.yMm)||0)+offset,0,heightMm);item.locked=false;return item;});
    state.makerItems.push(...pasted);state.makerSelectedIds=pasted.map(item=>item.id);state.makerSelectedId=pasted.at(-1)?.id||null;els.makerCount.textContent=`${state.makerItems.length}개`;updateMakerUi();await generateMaker();schedulePersist(0,true);checkpointHistory();setNotice('good','개체를 복제했습니다',`${pasted.length}개 개체와 모든 효과를 함께 복제했습니다.`);
  }
  function clipboardSelection(items,ids,primaryId,groupIds){const validIds=(ids||[]).filter(id=>items.some(item=>item.id===id));if(validIds.length)return items.filter(item=>validIds.includes(item.id));const primary=items.find(item=>item.id===primaryId);if(!primary)return[];const expanded=groupIds(primary);return items.filter(item=>expanded.includes(item.id));}
  function isEditableTextTarget(target){return !!target?.closest?.('input,textarea,[contenteditable="true"]');}
  document.addEventListener('keydown',event=>{if(isEditableTextTarget(event.target)||!(event.ctrlKey||event.metaKey)||event.key.toLowerCase()!=='d')return;event.preventDefault();if(state.mode==='sticker')duplicateStickerObjects();else if(state.mode==='maker')duplicateMakerObjects();});

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
    // 스티커도 코롯토와 같게 — 새 그림을 넣으면 C 자 주머니를 자동으로 닫는다.
    // 사용자: "칼선, 레이어 관련 수정은 스티커, 코롯토 탭에 둘 다 들어가야 해."
    const autoSealed = await autoCloseInletsOnLoad('sticker');
    if (autoSealed) {
      setNotice('good', `칼선 입구 ${autoSealed}곳을 자동으로 닫았습니다`,
        '입구보다 안이 넓은 <b>C 자 주머니</b>만 골랐습니다. 원치 않으면 입구 잠금 목록에서 빼고 <b>칼선 다시 계산</b>을 누르세요.');
    }
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
    const i=items.findIndex(v=>v.id===id);if(i<0)return;const selected=items[i],moveStickerGroup=items===state.stickers&&selected.groupId&&!state.groupEditIds.length,moveMakerGroup=items===state.makerItems&&selected.groupId,moveMakerSelection=items===state.makerItems&&!selected.groupId&&state.makerSelectedIds.includes(id)&&state.makerSelectedIds.length>1,block=moveStickerGroup?items.filter(v=>v.groupId===selected.groupId):(moveMakerGroup?items.filter(v=>v.groupId===selected.groupId):(moveMakerSelection?items.filter(v=>state.makerSelectedIds.includes(v.id)):[selected])),blockIds=new Set(block.map(v=>v.id)),remaining=items.filter(v=>!blockIds.has(v.id)),firstIndex=Math.min(...block.map(v=>items.findIndex(q=>q.id===v.id)));let target=firstIndex;
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
  // 무리별 최종 칼선 마스크. 스티커의 칼선은 여전히 여기 한 곳에서만 나온다 —
  // 재단여백을 어디에 안 깔지 정하려면 낱장 여백을 만들기 **전에** 이 마스크가
  // 필요해서 윤곽 뽑기와 나눠 둔 것뿐이다 (v117).
  function buildStickerGroupCutMasks(records,w,h,ppm,style,borderPx,narrowGapMm){
    const groups=new Map();for(const rec of records){const key=rec.sticker.groupId||rec.sticker.id;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(rec);}const masks=[],sealApplied=[],bridgeApplied=[];
    for(const group of groups.values()){
      let mask=new Uint8Array(w*h);
      for(const rec of group){let localMask=rec.mask;const bridgeMm=Number(rec.sticker.splitBridgeMm)||0;if(bridgeMm>0){const radius=Math.max(1,Math.round(bridgeMm*ppm/2));localMask=erodeMask(dilateMask(localMask,rec.lw,rec.lh,radius),rec.lw,rec.lh,radius);}for(let y=0;y<rec.lh;y++){const gy=y+rec.top;if(gy<0||gy>=h)continue;for(let x=0;x<rec.lw;x++){if(!localMask[y*rec.lw+x])continue;const gx=x+rec.left;if(gx>=0&&gx<w)mask[gy*w+gx]=1;}}}
      if(group.length>1){const radius=Math.max(2,Math.round(Math.max(borderPx+.7*ppm,1.4*ppm)));for(const [a,b] of minimumSpanningItemPairs(group)){const capsule=makeCapsuleMask(w,h,a.xMm*ppm,a.yMm*ppm,b.xMm*ppm,b.yMm*ppm,radius);mask=unionMask(mask,capsule);}}
      let cutMask=style==='bordered'?dilateMask(mask,w,h,borderPx):mask;
      if(narrowGapMm>0)cutMask=bridgeNarrowCutInlets(cutMask,w,h,ppm,narrowGapMm).mask;
      // 코롯토와 같게 — 자를 수 없는 가는 골짜기를 폭 대 깊이 비로 메운다 (v114).
      if(cutSlitFillOn())cutMask=bridgeSlitInlets(cutMask,w,h,ppm,cutSlitOptions()).mask;
      // 스티커의 최종 칼선은 여기서만 만들어진다(위 반복문이 모은 cutPaths 는
      // 아래에서 length=0 으로 버려진다). 그래서 잠금도 여기 한 곳이면 된다.
      // 대지 좌표계라 pad 가 없다 — mm×ppm 이 곧 픽셀 위치다.
      const sealed=sealInletsAtPoints(cutMask,w,h,ppm,sealPointsFor('sticker'),point=>({x:point.xMm*ppm,y:point.yMm*ppm}));
      cutMask=sealed.mask;sealApplied.push(...sealed.applied);
      const bridged2=applyCutBridges(cutMask,w,h,ppm,cutBridgesFor('sticker'),point=>({x:point.xMm*ppm,y:point.yMm*ppm}));
      cutMask=bridged2.mask;bridgeApplied.push(...bridged2.applied);
      masks.push(cutMask);
    }
    return {masks,sealApplied,bridgeApplied};
  }

  function buildStickerGroupCutPaths(records,w,h,ppm,style,borderPx,includeHoles,narrowGapMm,precomputed=null){
    const built=precomputed||buildStickerGroupCutMasks(records,w,h,ppm,style,borderPx,narrowGapMm);
    const out=[];
    for(const cutMask of built.masks){
      const contours=traceContours(cutMask,w,h),outer=contours.filter(p=>polygonArea(p)>0);out.push(...outer);
      if(includeHoles){const holes=contours.filter(p=>polygonArea(p)<0);out.push(...holes);}
    }
    recordSealFeedback('sticker',built.sealApplied);
    recordBridgeFeedback('sticker',built.bridgeApplied);
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

  const MAKER_EXPORT_DPI=350;
  const MAKER_EXPORT_PPM=MAKER_EXPORT_DPI/25.4;
  const MAKER_EXPORT_MAX_EDGE=16384;
  const MAKER_EXPORT_MAX_PIXELS=120000000;
  const PRINT_EXPORT_DPI=350;
  const PRINT_EXPORT_PPM=PRINT_EXPORT_DPI/25.4;
  const PRINT_EXPORT_MAX_EDGE=16384;
  const PRINT_EXPORT_MAX_PIXELS=120000000;

  async function composeMakerExportAtDpi(forceWhite=false,dpi=MAKER_EXPORT_DPI){
    await ensureMakerFontsLoaded();
    const widthMm=clamp(num(els.makerWidth,100),20,1000),heightMm=clamp(num(els.makerHeight,100),20,1000),ppm=dpi/25.4,w=Math.max(1,Math.round(widthMm*ppm)),h=Math.max(1,Math.round(heightMm*ppm));
    if(w>MAKER_EXPORT_MAX_EDGE||h>MAKER_EXPORT_MAX_EDGE||w*h>MAKER_EXPORT_MAX_PIXELS){
      throw new Error(`350 dpi 출력 크기(${w.toLocaleString()} × ${h.toLocaleString()} px)가 기기 메모리 한도를 넘습니다. 대지 크기를 줄여 주세요.`);
    }
    const backgroundResult=renderMakerBackground(w,h,widthMm,heightMm),background=backgroundResult.canvas,original=makeCanvas(w,h),octx=original.getContext('2d');
    octx.imageSmoothingEnabled=true;octx.imageSmoothingQuality='high';
    const renderedGroups=new Set();
    for(const item of state.makerItems){
      let members;
      if(item.groupId){if(renderedGroups.has(item.groupId))continue;renderedGroups.add(item.groupId);members=state.makerItems.filter(v=>v.groupId===item.groupId);}else members=[item];
      const rendered=renderMakerUnit(members,ppm,w,h);if(rendered)octx.drawImage(rendered.canvas,rendered.left,rendered.top);
    }
    const canvas=makeCanvas(w,h),c=canvas.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    if(forceWhite||els.makerPngBackground?.value==='white'){c.fillStyle='#ffffff';c.fillRect(0,0,w,h);}
    if(background)c.drawImage(background,0,0);c.drawImage(original,0,0);
    return canvas;
  }

  function releaseExportCanvas(canvas){
    if(!canvas)return;
    try{canvas.width=1;canvas.height=1;}catch(_){ }
  }

  async function composeMakerPngExportAtDpi(dpi=MAKER_EXPORT_DPI){
    await ensureMakerFontsLoaded();
    const widthMm=clamp(num(els.makerWidth,100),20,1000),heightMm=clamp(num(els.makerHeight,100),20,1000),ppm=dpi/25.4,w=Math.max(1,Math.round(widthMm*ppm)),h=Math.max(1,Math.round(heightMm*ppm));
    if(w>MAKER_EXPORT_MAX_EDGE||h>MAKER_EXPORT_MAX_EDGE||w*h>MAKER_EXPORT_MAX_PIXELS){
      throw new Error(`350 dpi 출력 크기(${w.toLocaleString()} × ${h.toLocaleString()} px)가 기기 메모리 한도를 넘습니다. 대지 크기를 줄여 주세요.`);
    }
    const canvas=makeCanvas(w,h),c=canvas.getContext('2d');
    c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    if(els.makerPngBackground?.value==='white'){c.fillStyle='#ffffff';c.fillRect(0,0,w,h);}
    let backgroundCanvas=null;
    try{
      const backgroundResult=renderMakerBackground(w,h,widthMm,heightMm);
      backgroundCanvas=backgroundResult?.canvas||null;
      if(backgroundCanvas)c.drawImage(backgroundCanvas,0,0);
      releaseExportCanvas(backgroundCanvas);backgroundCanvas=null;
      const renderedGroups=new Set();let renderedCount=0;
      for(const item of state.makerItems){
        let members;
        if(item.groupId){if(renderedGroups.has(item.groupId))continue;renderedGroups.add(item.groupId);members=state.makerItems.filter(v=>v.groupId===item.groupId);}else members=[item];
        const rendered=renderMakerUnit(members,ppm,w,h);
        if(rendered){c.drawImage(rendered.canvas,rendered.left,rendered.top);releaseExportCanvas(rendered.canvas);}
        renderedCount++;
        if(renderedCount%2===0)await nextFrame();
      }
      return canvas;
    }catch(error){
      releaseExportCanvas(backgroundCanvas);releaseExportCanvas(canvas);throw error;
    }
  }

  async function canvasToMakerPngBlob(canvas,dpi=MAKER_EXPORT_DPI){
    const pixels=canvas.width*canvas.height;
    let rawBlob=null;
    if(typeof canvas.toBlob==='function'){
      try{
        rawBlob=await new Promise((resolve,reject)=>{
          let settled=false;
          const finish=(fn,value)=>{if(settled)return;settled=true;clearTimeout(timer);fn(value);};
          const timer=setTimeout(()=>finish(reject,new Error('PNG 인코딩 시간이 초과되었습니다. 앱의 다른 작업을 닫고 다시 시도해 주세요.')),90000);
          try{canvas.toBlob(blob=>blob?.size?finish(resolve,blob):finish(reject,new Error('PNG 데이터를 만들지 못했습니다.')),'image/png');}
          catch(error){finish(reject,error);}
        });
      }catch(error){
        if(pixels>16000000)throw error;
        rawBlob=await canvasToBlobReliable(canvas,'image/png');
      }
    }else rawBlob=await canvasToBlobReliable(canvas,'image/png');
    const blob=await applyPngDpi(rawBlob,dpi);
    await validateExportBlob(blob,'outline-background-maker.png');
    return blob;
  }

  function pngCrc32(bytes){
    if(!pngCrc32.table){const table=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);table[n]=c>>>0;}pngCrc32.table=table;}
    let crc=0xffffffff;for(const byte of bytes)crc=pngCrc32.table[(crc^byte)&255]^(crc>>>8);return(crc^0xffffffff)>>>0;
  }
  function writeU32Be(target,offset,value){target[offset]=(value>>>24)&255;target[offset+1]=(value>>>16)&255;target[offset+2]=(value>>>8)&255;target[offset+3]=value&255;}
  function pngPhysChunk(dpi){
    const type=new TextEncoder().encode('pHYs'),data=new Uint8Array(9),ppm=Math.max(1,Math.round(dpi/0.0254));writeU32Be(data,0,ppm);writeU32Be(data,4,ppm);data[8]=1;
    const out=new Uint8Array(4+4+9+4);writeU32Be(out,0,9);out.set(type,4);out.set(data,8);const crcInput=new Uint8Array(type.length+data.length);crcInput.set(type);crcInput.set(data,type.length);writeU32Be(out,17,pngCrc32(crcInput));return out;
  }
  async function applyPngDpi(blob,dpi){
    const bytes=new Uint8Array(await blob.arrayBuffer()),sig=[137,80,78,71,13,10,26,10];if(!bytesEqual(bytes,sig))return blob;
    const parts=[bytes.slice(0,8)];let offset=8,inserted=false;
    while(offset+12<=bytes.length){const length=((bytes[offset]<<24)|(bytes[offset+1]<<16)|(bytes[offset+2]<<8)|bytes[offset+3])>>>0,end=offset+12+length;if(end>bytes.length)break;const type=String.fromCharCode(bytes[offset+4],bytes[offset+5],bytes[offset+6],bytes[offset+7]);if(type!=='pHYs')parts.push(bytes.slice(offset,end));if(type==='IHDR'&&!inserted){parts.push(pngPhysChunk(dpi));inserted=true;}offset=end;if(type==='IEND')break;}
    if(!inserted)return blob;return new Blob(parts,{type:'image/png'});
  }
  async function applyJpegDpi(blob,dpi){
    const source=new Uint8Array(await blob.arrayBuffer());if(source.length<4||source[0]!==255||source[1]!==216)return blob;const density=Math.max(1,Math.min(65535,Math.round(dpi))),bytes=source.slice();let offset=2;
    while(offset+4<=bytes.length&&bytes[offset]===255){const marker=bytes[offset+1];if(marker===218||marker===217)break;if(marker===0||marker===216||(marker>=208&&marker<=215)){offset+=2;continue;}const length=(bytes[offset+2]<<8)|bytes[offset+3];if(length<2||offset+2+length>bytes.length)break;if(marker===224&&length>=16&&String.fromCharCode(...bytes.slice(offset+4,offset+9))==='JFIF\0'){bytes[offset+11]=1;bytes[offset+12]=(density>>>8)&255;bytes[offset+13]=density&255;bytes[offset+14]=(density>>>8)&255;bytes[offset+15]=density&255;return new Blob([bytes],{type:'image/jpeg'});}offset+=2+length;}
    const app0=Uint8Array.from([255,224,0,16,74,70,73,70,0,1,1,1,(density>>>8)&255,density&255,(density>>>8)&255,density&255,0,0]);return new Blob([bytes.slice(0,2),app0,bytes.slice(2)],{type:'image/jpeg'});
  }
  async function canvasToDpiBlob(canvas,type,quality,dpi){const blob=await canvasToBlobReliable(canvas,type,quality);return type==='image/png'?applyPngDpi(blob,dpi):type==='image/jpeg'?applyJpegDpi(blob,dpi):blob;}

  function assertPrintExportSize(r,dpi=PRINT_EXPORT_DPI){
    const width=Math.max(1,Math.round(r.widthMm*dpi/25.4)),height=Math.max(1,Math.round(r.heightMm*dpi/25.4));
    if(width>PRINT_EXPORT_MAX_EDGE||height>PRINT_EXPORT_MAX_EDGE||width*height>PRINT_EXPORT_MAX_PIXELS){
      throw new Error(`350 dpi 출력 크기(${width.toLocaleString()} × ${height.toLocaleString()} px)가 기기 메모리 한도를 넘습니다. 대지 크기를 줄여 주세요.`);
    }
    return{width,height};
  }

  async function withPrintExportResult(baseResult,worker,dpi=PRINT_EXPORT_DPI){
    if(!baseResult||baseResult.mode==='maker')return worker(baseResult);
    assertPrintExportSize(baseResult,dpi);
    const previousResult=state.result,previousView=state.view,previousOverride=printExportPpmOverride;
    printExportPpmOverride=dpi/25.4;
    try{
      if(baseResult.mode==='acrylic')await generateAcrylic();
      else if(baseResult.mode==='sticker')await generateSticker();
      const rendered=state.result;
      if(!rendered||rendered.mode!==baseResult.mode)throw new Error('고해상도 출력 레이어를 만들지 못했습니다.');
      const expected=assertPrintExportSize(rendered,dpi);
      if(Math.abs(rendered.widthPx-expected.width)>1||Math.abs(rendered.heightPx-expected.height)>1){
        throw new Error(`출력 해상도가 올바르지 않습니다. (${rendered.widthPx} × ${rendered.heightPx} px)`);
      }
      return await worker(rendered);
    }finally{
      printExportPpmOverride=previousOverride;state.result=previousResult;state.view=previousView;
      updateWhiteLayerUi();updateModeSpecificUi();drawPreview();
    }
  }

  async function blobToDataUrlReliable(blob){
    if(!(blob instanceof Blob)||!blob.size)throw new Error('SVG에 넣을 이미지 레이어가 비어 있습니다.');
    return await new Promise((resolve,reject)=>{
      const reader=new FileReader();let settled=false;
      const done=(fn,value)=>{if(settled)return;settled=true;clearTimeout(timer);fn(value);};
      const timer=setTimeout(()=>done(reject,new Error('이미지 레이어 변환 시간이 초과되었습니다.')),30000);
      reader.onload=()=>done(resolve,String(reader.result||''));
      reader.onerror=()=>done(reject,reader.error||new Error('이미지 레이어를 읽지 못했습니다.'));
      try{reader.readAsDataURL(blob);}catch(error){done(reject,error);}
    });
  }

  let lastDefaultExportTimestamp=0;
  function defaultExportTimestampBase(){
    const now=Math.max(Date.now(),lastDefaultExportTimestamp+1000);
    lastDefaultExportTimestamp=now;
    const date=new Date(now),pad=value=>String(value).padStart(2,'0');
    return `goodsmaker_${String(date.getFullYear()).slice(-2)}${pad(date.getMonth()+1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  }
  function safeExportBase(defaultBase){
    const raw=(els.exportFileName?.value||'').trim().replace(/\.(png|jpe?g|svg|ai|pdf)$/i,'').replace(/[\/:*?"<>|]+/g,'-').replace(/\s+/g,' ').trim();
    return raw||defaultExportTimestampBase();
  }
  function exportFileName(ext,defaultBase){return `${safeExportBase(defaultBase)}.${ext}`;}

  async function exportPng(){
    const r=state.result;if(!r)return alert('먼저 출력 이미지를 만들어 주세요.');
    try{
      const maker=r.mode==='maker';
      const pick=maker?null:selectedLayers();
      if(!maker&&!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');
      if(maker){
        let canvas=null;
        try{
          setNotice('info','350 dpi PNG를 만드는 중입니다','복잡한 효과나 큰 대지는 인코딩에 시간이 걸릴 수 있습니다.');
          await nextFrame();
          canvas=await composeMakerPngExportAtDpi(MAKER_EXPORT_DPI);
          const blob=await canvasToMakerPngBlob(canvas,MAKER_EXPORT_DPI);
          releaseExportCanvas(canvas);canvas=null;
          await downloadBlob(blob,exportFileName('png','outline-background-maker'));
          setNotice('good','PNG 내보내기 완료',`${Math.round(MAKER_EXPORT_DPI)} dpi PNG를 goodsmaker 폴더에 저장했습니다.`);
        }finally{releaseExportCanvas(canvas);}
        return;
      }
      await withPrintExportResult(r,async rendered=>{
        const canvas=composeSelectedLayers(rendered,pick);
        const blob=await canvasToDpiBlob(canvas,'image/png',undefined,PRINT_EXPORT_DPI);
        await downloadBlob(blob,exportFileName('png',`acrylic-manager-${rendered.mode}-${rendered.finishStyle}`));
      });
    }catch(error){console.error(error);setNotice('bad','PNG 내보내기에 실패했습니다',error?.message||'다시 시도해 주세요.');}
  }
  async function exportJpg(){
    const r=state.result;if(!r||r.mode!=='maker')return;
    try{
      const canvas=await composeMakerExportAtDpi(true,MAKER_EXPORT_DPI);
      const blob=await canvasToDpiBlob(canvas,'image/jpeg',.96,MAKER_EXPORT_DPI);
      await downloadBlob(blob,exportFileName('jpg','outline-background-maker'));
    }catch(error){console.error(error);setNotice('bad','JPG 내보내기에 실패했습니다',error?.message||'다시 시도해 주세요.');}
  }


  async function svgEmbeddedImage(canvas,width,height){
    const png=await canvasToDpiBlob(canvas,'image/png',undefined,PRINT_EXPORT_DPI);
    await validateExportBlob(png,'embedded-layer.png');
    const dataUrl=await blobToDataUrlReliable(png);
    if(!/^data:image\/png;base64,/i.test(dataUrl))throw new Error('SVG 이미지 레이어를 완성하지 못했습니다.');
    return `<image x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="none" href="${dataUrl}" xlink:href="${dataUrl}"/>`;
  }

  async function buildSvgBlob(r,pick){
    const groups=[];
    if(pick.background&&r.background)groups.push(`<g id="BACKGROUND" data-layer="background">${await svgEmbeddedImage(r.background,r.widthPx,r.heightPx)}</g>`);
    // 화이트는 **벡터 패스**로 내보낸다 (v99). 대조에 실패한 레이어만 이미지로
    // 물러선다(스티커 대지에서 낱장이 겹칠 때 등 — whitePathsMatch 참고).
    // 윤곽을 **한 <path> 에 몰아서** 쓴다. evenodd 는 하나의 패스 안에서만
    // 도니, 윤곽마다 <path> 를 따로 내면 구멍이 안 뚫리고 그냥 덧칠된다.
    // 실측으로 걸렸다 — 반투명 면을 뺀 화이트에서 그 자리가 도로 꽉 찼다.
    const whiteVector=(paths,curve)=>`<path d="${paths.map(p=>pathToSvgD(p,curve)).join(' ')}"/>`;
    const whiteGroup=async(id,layer,canvas,paths)=>{
      if(paths&&paths.length)
        return `<g id="${id}" data-layer="${layer}" data-shape="vector" fill="#ffffff" fill-rule="evenodd" stroke="none">${whiteVector(paths,AUTO_CUT_CURVE)}</g>`;
      return `<g id="${id}" data-layer="${layer}" data-shape="raster">${await svgEmbeddedImage(canvas,r.widthPx,r.heightPx)}</g>`;
    };
    if(pick.whiteOpaque)groups.push(await whiteGroup('WHITE_OPAQUE_ONLY','white-opaque',r.whiteOpaque||r.white,r.whiteOpaquePaths));
    if(pick.whiteFull)groups.push(await whiteGroup('WHITE_FULL','white-full',r.white,r.whitePaths));
    if(pick.bleed)groups.push(`<g id="BLEED_EXTENSION" data-layer="bleed">${await svgEmbeddedImage(r.bleed,r.widthPx,r.heightPx)}</g>`);
    if(pick.artwork)groups.push(`<g id="ARTWORK" data-layer="artwork">${await svgEmbeddedImage(r.original,r.widthPx,r.heightPx)}</g>`);
    if(pick.cutline){const paths=r.cutPaths.map(p=>`<path d="${pathToSvgD(p,r.cutCurve??AUTO_CUT_CURVE)}" fill="none" stroke="#ff00b8" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`).join('\n');groups.push(`<g id="CUTLINE" data-layer="cutline">${paths}</g>`);}
    const svg=`<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="${r.widthMm.toFixed(4)}mm" height="${r.heightMm.toFixed(4)}mm" viewBox="0 0 ${r.widthPx} ${r.heightPx}" overflow="visible">\n<title>Goods Maker export</title>\n<desc>Self-contained 350 dpi SVG. White layers are vector paths (evenodd); cutlines are vector; artwork and bleed are embedded PNG.</desc>\n<metadata>dpi=${PRINT_EXPORT_DPI}; finish-style=${escapeXml(r.finishStyle)}; cut-curve=automatic; white-shape=${r.whitePaths?'vector':'raster'}; layers=${Object.entries(pick).filter(([,v])=>v).map(([k])=>escapeXml(k)).join(',')}</metadata>\n<defs/>\n${groups.join('\n')}\n</svg>`;
    return utf8Blob(svg,'image/svg+xml');
  }

  async function exportSvg(){
    const r=state.result;if(!r)return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');
    try{
      await withPrintExportResult(r,async rendered=>{
        const blob=await buildSvgBlob(rendered,pick);
        await downloadBlob(blob,exportFileName('svg',`acrylic-manager-${rendered.mode}-${rendered.finishStyle}`));
      });
    }catch(error){console.error(error);setNotice('bad','SVG 내보내기에 실패했습니다',error?.message||'다시 시도해 주세요.');}
  }

  function asciiBytes(str){const out=new Uint8Array(str.length);for(let i=0;i<str.length;i++)out[i]=str.charCodeAt(i)&255;return out;}
  function concatBytes(parts){const len=parts.reduce((s,p)=>s+p.length,0),out=new Uint8Array(len);let o=0;for(const p of parts){out.set(p,o);o+=p.length;}return out;}
  function canvasRgbAlpha(canvas){const d=canvas.getContext('2d',{willReadFrequently:true}).getImageData(0,0,canvas.width,canvas.height).data,n=canvas.width*canvas.height,rgb=new Uint8Array(n*3),alpha=new Uint8Array(n);for(let i=0;i<n;i++){rgb[i*3]=d[i*4];rgb[i*3+1]=d[i*4+1];rgb[i*3+2]=d[i*4+2];alpha[i]=d[i*4+3];}return{rgb,alpha};}
  function pdfEscapeString(value){return String(value).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/[\r\n]+/g,' ');}
  function pdfDate(date=new Date()){
    const part=value=>String(value).padStart(2,'0');
    return `D:${date.getUTCFullYear()}${part(date.getUTCMonth()+1)}${part(date.getUTCDate())}${part(date.getUTCHours())}${part(date.getUTCMinutes())}${part(date.getUTCSeconds())}Z`;
  }
  async function pdfFlateStream(bytes){
    if (typeof CompressionStream !== 'function' || bytes.length < 1024) return {bytes, filter:''};
    try {
      const compressed = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate'))).arrayBuffer());
      if (compressed.length + 32 < bytes.length) return {bytes:compressed, filter:' /Filter /FlateDecode'};
    } catch (error) {
      console.warn('PDF stream compression unavailable; using an uncompressed stream.', error);
    }
    return {bytes, filter:''};
  }
  // 화이트 윤곽을 PDF 패스 연산자로 옮긴다 (v99). 칼선과 같은 변환을 쓴다 —
  // PDF 는 좌표계가 아래에서 위로 올라가므로 y 를 뒤집는다.
  function pdfWhitePathOps(paths,sx,sy,pageH,curve){
    let out='';
    for(const p of paths){
      if(!p.length)continue;
      out+=`${(p[0].x*sx).toFixed(4)} ${(pageH-p[0].y*sy).toFixed(4)} m\n`;
      for(const seg of curveSegments(p,curve)){
        if(seg.linear)out+=`${(seg.p1.x*sx).toFixed(4)} ${(pageH-seg.p1.y*sy).toFixed(4)} l\n`;
        else out+=`${(seg.c1.x*sx).toFixed(4)} ${(pageH-seg.c1.y*sy).toFixed(4)} ${(seg.c2.x*sx).toFixed(4)} ${(pageH-seg.c2.y*sy).toFixed(4)} ${(seg.p1.x*sx).toFixed(4)} ${(pageH-seg.p1.y*sy).toFixed(4)} c\n`;
      }
      out+='h\n';
    }
    return out;
  }

  // 레이어 목록을 내용 스트림으로 옮긴다. 벡터 패스가 있는 화이트는 채우기로,
  // 나머지는 이미지 XObject 로 나간다. 이미지 번호는 **실제로 이미지로 나가는
  // 것만** 세어야 하므로 여기서 함께 돌려준다.
  // curve 는 **화이트를 래스터화할 때 쓴 값(AUTO_CUT_CURVE)** 이어야 한다.
  // 칼선 곡선값을 넘기면 언젠가 그것이 바뀌었을 때 화이트가 제 그림자와
  // 어긋난다.
  function pdfLayerContent(layers,pageW,pageH,sx,sy,curve){
    let content='';const images=[];
    for(const layer of layers){
      const canvas=layer[1],paths=layer[2];
      if(paths&&paths.length){
        content+=`q\n1 1 1 rg\n${pdfWhitePathOps(paths,sx,sy,pageH,curve)}f*\nQ\n`;
        continue;
      }
      content+=`q\n${pageW.toFixed(5)} 0 0 ${pageH.toFixed(5)} 0 0 cm\n/Im${images.length} Do\nQ\n`;
      images.push(canvas);
    }
    return {content,images};
  }

  async function makePdfAi(r,pick){
    const pageW=r.widthMm*72/25.4,pageH=r.heightMm*72/25.4,sx=pageW/r.widthPx,sy=pageH/r.heightPx,layers=[];
    if(pick.background&&r.background)layers.push(['Background',r.background]);
    if(pick.whiteOpaque)layers.push(['White - Opaque only',r.whiteOpaque||r.white,r.whiteOpaquePaths]);
    if(pick.whiteFull)layers.push(['White - Full',r.white,r.whitePaths]);
    if(pick.bleed)layers.push(['Bleed',r.bleed]);
    if(pick.artwork)layers.push(['Artwork',r.original]);
    const laid=pdfLayerContent(layers,pageW,pageH,sx,sy,AUTO_CUT_CURVE);
    const images=laid.images;
    let content=laid.content;
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

    const objects=[];
    const metadataObject=5;
    const imageStart=6;
    const resourceEntries=[];
    for(let i=0;i<images.length;i++)resourceEntries.push(`/Im${i} ${imageStart+i*2} 0 R`);
    objects[1]=asciiBytes(`<< /Type /Catalog /Pages 2 0 R /Metadata ${metadataObject} 0 R /ViewerPreferences << /DisplayDocTitle true >> >>`);
    objects[2]=asciiBytes('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    objects[3]=asciiBytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW.toFixed(5)} ${pageH.toFixed(5)}] /Group << /Type /Group /S /Transparency /CS /DeviceRGB >> /Resources << /ProcSet [/PDF /ImageC] /XObject << ${resourceEntries.join(' ')} >> >> /Contents 4 0 R >>`);
    const contentBytes=asciiBytes(content);
    objects[4]=concatBytes([asciiBytes(`<< /Length ${contentBytes.length} >>\nstream\n`),contentBytes,asciiBytes('\nendstream')]);
    const xmp=`<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>\n<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" pdf:Producer="Goods Maker" xmp:CreatorTool="Goods Maker Illustrator-compatible PDF"><dc:format>application/pdf</dc:format><dc:title><rdf:Alt><rdf:li xml:lang="x-default">Goods Maker AI export</rdf:li></rdf:Alt></dc:title></rdf:Description></rdf:RDF></x:xmpmeta>\n<?xpacket end="w"?>`;
    const xmpBytes=asciiBytes(xmp);
    objects[metadataObject]=concatBytes([asciiBytes(`<< /Type /Metadata /Subtype /XML /Length ${xmpBytes.length} >>\nstream\n`),xmpBytes,asciiBytes('\nendstream')]);

    let objNo=imageStart;
    for(const canvas of images){
      const{rgb,alpha}=canvasRgbAlpha(canvas),maskObj=objNo+1;
      const rgbStream=await pdfFlateStream(rgb);
      const alphaStream=await pdfFlateStream(alpha);
      objects[objNo]=concatBytes([asciiBytes(`<< /Type /XObject /Subtype /Image /Width ${r.widthPx} /Height ${r.heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Interpolate true /SMask ${maskObj} 0 R${rgbStream.filter} /Length ${rgbStream.bytes.length} >>\nstream\n`),rgbStream.bytes,asciiBytes('\nendstream')]);
      objects[maskObj]=concatBytes([asciiBytes(`<< /Type /XObject /Subtype /Image /Width ${r.widthPx} /Height ${r.heightPx} /ColorSpace /DeviceGray /BitsPerComponent 8 /Interpolate true${alphaStream.filter} /Length ${alphaStream.bytes.length} >>\nstream\n`),alphaStream.bytes,asciiBytes('\nendstream')]);
      objNo+=2;
    }
    const infoObject=objNo;
    const now=pdfDate();
    objects[infoObject]=asciiBytes(`<< /Title (${pdfEscapeString('Goods Maker AI export')}) /Creator (${pdfEscapeString('Goods Maker')}) /Producer (${pdfEscapeString('Goods Maker Illustrator-compatible PDF')}) /CreationDate (${now}) /ModDate (${now}) >>`);
    const count=infoObject;
    const chunks=[asciiBytes('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n% Illustrator-compatible PDF generated by Goods Maker\n')],offsets=[0];
    let pos=chunks[0].length;
    for(let i=1;i<=count;i++){
      if(!objects[i])throw new Error(`PDF object ${i} is missing.`);
      offsets[i]=pos;
      const head=asciiBytes(`${i} 0 obj\n`),tail=asciiBytes('\nendobj\n');
      chunks.push(head,objects[i],tail);pos+=head.length+objects[i].length+tail.length;
    }
    const xrefPos=pos;
    let xref=`xref\n0 ${count+1}\n0000000000 65535 f \n`;
    for(let i=1;i<=count;i++)xref+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;
    const idSeed=String(Date.now().toString(16)).padStart(32,'0').slice(-32);
    xref+=`trailer\n<< /Size ${count+1} /Root 1 0 R /Info ${infoObject} 0 R /ID [<${idSeed}><${idSeed}>] >>\nstartxref\n${xrefPos}\n%%EOF\n`;
    chunks.push(asciiBytes(xref));
    return concatBytes(chunks);
  }

  async function makeEditableCutlinePdf(r,pick){
    if(!r.cutPaths?.length)throw new Error('편집 가능한 칼선이 없습니다. 칼선을 먼저 생성해 주세요.');
    const pageW=r.widthMm*72/25.4,pageH=r.heightMm*72/25.4,sx=pageW/r.widthPx,sy=pageH/r.heightPx,layers=[];
    if(pick.background&&r.background)layers.push(['Background',r.background]);
    if(pick.whiteOpaque)layers.push(['White - Opaque only',r.whiteOpaque||r.white,r.whiteOpaquePaths]);
    if(pick.whiteFull)layers.push(['White - Full',r.white,r.whitePaths]);
    if(pick.bleed)layers.push(['Bleed',r.bleed]);
    if(pick.artwork)layers.push(['Artwork',r.original]);

    const laid=pdfLayerContent(layers,pageW,pageH,sx,sy,AUTO_CUT_CURVE);
    const images=laid.images;
    const imageStart=6;
    const cutLayerObject=imageStart+images.length*2;
    const cutTintFunctionObject=cutLayerObject+1;
    const cutGraphicsStateObject=cutLayerObject+2;
    const infoObject=cutLayerObject+3;
    const resourceEntries=[];
    for(let i=0;i<images.length;i++)resourceEntries.push(`/Im${i} ${imageStart+i*2} 0 R`);

    let content=laid.content;
    content+='/OC /OC_CUT BDC\nq\n/GS_CUT gs\n/CS_CUT CS\n1 SCN\n0.25 w\n1 J\n1 j\n';
    for(const p of r.cutPaths){
      if(!p.length)continue;
      content+=`${(p[0].x*sx).toFixed(4)} ${(pageH-p[0].y*sy).toFixed(4)} m\n`;
      for(const seg of curveSegments(p,r.cutCurve??AUTO_CUT_CURVE)){
        if(seg.linear)content+=`${(seg.p1.x*sx).toFixed(4)} ${(pageH-seg.p1.y*sy).toFixed(4)} l\n`;
        else content+=`${(seg.c1.x*sx).toFixed(4)} ${(pageH-seg.c1.y*sy).toFixed(4)} ${(seg.c2.x*sx).toFixed(4)} ${(pageH-seg.c2.y*sy).toFixed(4)} ${(seg.p1.x*sx).toFixed(4)} ${(pageH-seg.p1.y*sy).toFixed(4)} c\n`;
      }
      content+='h S\n';
    }
    content+='Q\nEMC\n';

    const objects=[];
    const metadataObject=5;
    objects[1]=asciiBytes(`<< /Type /Catalog /Pages 2 0 R /Metadata ${metadataObject} 0 R /PageMode /UseOC /ViewerPreferences << /DisplayDocTitle true >> /OCProperties << /OCGs [${cutLayerObject} 0 R] /D << /Name (Goods Maker Layers) /Order [${cutLayerObject} 0 R] /ON [${cutLayerObject} 0 R] >> >> >>`);
    objects[2]=asciiBytes('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    objects[3]=asciiBytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW.toFixed(5)} ${pageH.toFixed(5)}] /Group << /Type /Group /S /Transparency /CS /DeviceRGB >> /Resources << /ProcSet [/PDF /ImageC] /XObject << ${resourceEntries.join(' ')} >> /ColorSpace << /CS_CUT [ /Separation /CutContour /DeviceCMYK ${cutTintFunctionObject} 0 R ] >> /ExtGState << /GS_CUT ${cutGraphicsStateObject} 0 R >> /Properties << /OC_CUT ${cutLayerObject} 0 R >> >> /Contents 4 0 R >>`);
    const contentBytes=asciiBytes(content);
    objects[4]=concatBytes([asciiBytes(`<< /Length ${contentBytes.length} >>\nstream\n`),contentBytes,asciiBytes('\nendstream')]);
    const xmp=`<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>\n<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:gm="https://goodsmaker.local/ns/1.0/" pdf:Producer="Goods Maker" xmp:CreatorTool="Goods Maker editable cutline PDF" gm:CutlineLayer="CUTLINE" gm:CutlineSpotColor="CutContour" gm:CutlineEditable="true"><dc:format>application/pdf</dc:format><dc:title><rdf:Alt><rdf:li xml:lang="x-default">Goods Maker editable cutline PDF</rdf:li></rdf:Alt></dc:title><dc:description><rdf:Alt><rdf:li xml:lang="x-default">350 dpi artwork with an editable vector CutContour spot-color cutline layer.</rdf:li></rdf:Alt></dc:description></rdf:Description></rdf:RDF></x:xmpmeta>\n<?xpacket end="w"?>`;
    const xmpBytes=new TextEncoder().encode(xmp);
    objects[metadataObject]=concatBytes([asciiBytes(`<< /Type /Metadata /Subtype /XML /Length ${xmpBytes.length} >>\nstream\n`),xmpBytes,asciiBytes('\nendstream')]);

    let objNo=imageStart;
    for(const canvas of images){
      const{rgb,alpha}=canvasRgbAlpha(canvas),maskObj=objNo+1;
      const rgbStream=await pdfFlateStream(rgb);
      const alphaStream=await pdfFlateStream(alpha);
      objects[objNo]=concatBytes([asciiBytes(`<< /Type /XObject /Subtype /Image /Width ${r.widthPx} /Height ${r.heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Interpolate true /SMask ${maskObj} 0 R${rgbStream.filter} /Length ${rgbStream.bytes.length} >>\nstream\n`),rgbStream.bytes,asciiBytes('\nendstream')]);
      objects[maskObj]=concatBytes([asciiBytes(`<< /Type /XObject /Subtype /Image /Width ${r.widthPx} /Height ${r.heightPx} /ColorSpace /DeviceGray /BitsPerComponent 8 /Interpolate true${alphaStream.filter} /Length ${alphaStream.bytes.length} >>\nstream\n`),alphaStream.bytes,asciiBytes('\nendstream')]);
      objNo+=2;
    }
    objects[cutLayerObject]=asciiBytes('<< /Type /OCG /Name (CUTLINE - CutContour) /Usage << /Print << /PrintState /ON >> /View << /ViewState /ON >> >> >>');
    objects[cutTintFunctionObject]=asciiBytes('<< /FunctionType 2 /Domain [0 1] /C0 [0 0 0 0] /C1 [0 1 0 0] /N 1 >>');
    objects[cutGraphicsStateObject]=asciiBytes('<< /Type /ExtGState /OP true /op true /OPM 1 >>');
    const now=pdfDate();
    objects[infoObject]=asciiBytes(`<< /Title (${pdfEscapeString('Goods Maker editable cutline PDF')}) /Subject (${pdfEscapeString('Editable vector cutline using the CutContour spot color')}) /Creator (${pdfEscapeString('Goods Maker')}) /Producer (${pdfEscapeString('Goods Maker Illustrator-compatible PDF')}) /Keywords (${pdfEscapeString('CUTLINE, CutContour, spot color, vector, 350 dpi')}) /CreationDate (${now}) /ModDate (${now}) >>`);

    const count=infoObject;
    const chunks=[asciiBytes('%PDF-1.6\n%\xE2\xE3\xCF\xD3\n% Illustrator-compatible editable cutline PDF generated by Goods Maker\n')],offsets=[0];
    let pos=chunks[0].length;
    for(let i=1;i<=count;i++){
      if(!objects[i])throw new Error(`PDF object ${i} is missing.`);
      offsets[i]=pos;
      const head=asciiBytes(`${i} 0 obj\n`),tail=asciiBytes('\nendobj\n');
      chunks.push(head,objects[i],tail);pos+=head.length+objects[i].length+tail.length;
    }
    const xrefPos=pos;
    let xref=`xref\n0 ${count+1}\n0000000000 65535 f \n`;
    for(let i=1;i<=count;i++)xref+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;
    const idSeed=String(Date.now().toString(16)).padStart(32,'0').slice(-32);
    xref+=`trailer\n<< /Size ${count+1} /Root 1 0 R /Info ${infoObject} 0 R /ID [<${idSeed}><${idSeed}>] >>\nstartxref\n${xrefPos}\n%%EOF\n`;
    chunks.push(asciiBytes(xref));
    return concatBytes(chunks);
  }


  // ══════════════════════════════════════════════════════════════════
  // 인쇄소 가이드 AI 로 내보내기 (v109)
  //
  // 인쇄소가 주는 "가이드 ai" 는 PDF 다. 그 안에 재단·화이트·컬러 레이어가
  // **이름 그대로** 남아 있고, 각 레이어가 획으로 그렸는지 채우기로 그렸는지,
  // 무슨 색인지까지 읽을 수 있다. guide-template.js 가 그것을 읽고, 여기서는
  // 우리 칼선·화이트·그림을 그 레이어 자리에 끼워 넣는다.
  //
  // 왜 내려받는 .ai 와 .pdf 가 같은 바이트인가 — .ai 파일 형식이 곧 PDF 이고,
  // Illustrator 는 확장자가 아니라 %PDF 머리글을 보고 연다. 레이어(OCG)도
  // 그대로 레이어로 읽힌다. 굳이 두 벌을 다르게 만들 이유가 없다.
  // ══════════════════════════════════════════════════════════════════
  const guideState = { guide: null, page: null, name: '', busy: false };
  const GUIDE_ROLE_LABEL = { cut: '재단', white: '화이트', art: '그림', note: '설명', other: '기타' };

  function guideApi(){ return typeof window !== 'undefined' ? window.GoodsMakerGuide : null; }

  // 가이드가 레이어를 안 살려 저장했거나 이름을 못 알아본 경우가 있다.
  // 그래서 목록에는 **그 쪽의 모든 레이어**를 넣고, 없으면 새로 만들 수도 있게
  // "새 레이어로 만들기" 를 둔다 (v110).
  function guideFillSelect(select, layers, prefer, noneLabel, newLabel){
    if(!select) return;
    const previous = select.value;
    select.innerHTML = '';
    if(noneLabel){ const opt = document.createElement('option'); opt.value = ''; opt.textContent = noneLabel; select.append(opt); }
    for(const layer of layers){
      const opt = document.createElement('option');
      opt.value = String(layer.ocg);
      opt.textContent = `${layer.name} (${GUIDE_ROLE_LABEL[layer.role] || '기타'}${layer.empty ? ' · 비어 있음' : ''})`;
      select.append(opt);
    }
    if(newLabel){ const opt = document.createElement('option'); opt.value = 'new'; opt.textContent = newLabel; select.append(opt); }
    const keep = previous === 'new' || layers.some(l => String(l.ocg) === previous);
    select.value = keep ? previous
      : prefer ? String(prefer.ocg)
      : (layers.length ? '' : 'new');
  }

  function guideRenderLayerList(page){
    const box = els.guideLayerList;
    if(!box) return;
    box.innerHTML = '';
    for(const layer of page.layers){
      const row = document.createElement('div');
      row.className = `guide-layer-row role-${layer.role}`;
      const style = layer.style;
      const how = layer.role === 'cut' ? '획(선)' : layer.role === 'white' ? '채우기' : style && style.paint === 'stroke' ? '획(선)' : style && style.paint === 'fill' ? '채우기' : '—';
      row.innerHTML = `<span class="guide-layer-name"></span><span class="guide-layer-role"></span><span class="guide-layer-how"></span>`;
      row.querySelector('.guide-layer-name').textContent = layer.name;
      row.querySelector('.guide-layer-role').textContent = GUIDE_ROLE_LABEL[layer.role] || '기타';
      row.querySelector('.guide-layer-how').textContent = how;
      box.append(row);
    }
    box.classList.remove('hidden');
  }

  function guideRenderUi(){
    const has = !!guideState.guide;
    els.guideFields?.classList.toggle('hidden', !has);
    els.guideClearBtn?.classList.toggle('hidden', !has);
    els.guideLayerList?.classList.toggle('hidden', !has);
    els.guideDropNotesRow?.classList.toggle('hidden', !has);
    if(!has){
      if(els.guideSummary) els.guideSummary.textContent = '가이드를 넣으면 그 파일의 재단·화이트·컬러 레이어 이름과 색을 그대로 읽어, 칼선은 획으로 화이트는 채우기로 제자리에 넣어 드립니다.';
      return;
    }
    const guide = guideState.guide;
    if(els.guidePageSelect && els.guidePageSelect.options.length !== guide.pages.length){
      els.guidePageSelect.innerHTML = '';
      for(const page of guide.pages){
        const opt = document.createElement('option');
        opt.value = String(page.index);
        opt.textContent = `${page.index + 1}쪽 · ${page.widthMm.toFixed(1)} × ${page.heightMm.toFixed(1)} mm`;
        els.guidePageSelect.append(opt);
      }
      els.guidePageSelect.value = String(guideState.page.index);
    }
    const page = guideState.page;
    guideFillSelect(els.guideCutSelect, page.layers, page.layers.find(l => l.role === 'cut'), '넣지 않음 (가이드 재단선 그대로)', '새 레이어로 만들기 — 재단');
    guideFillSelect(els.guideWhiteSelect, page.layers, page.layers.find(l => l.role === 'white'), '넣지 않음', '새 레이어로 만들기 — 화이트');
    guideFillSelect(els.guideArtSelect, page.layers, page.layers.find(l => l.role === 'art' && l.side !== 'back') || page.layers.find(l => l.role === 'art'), '넣지 않음', '새 레이어로 만들기 — 컬러');
    guideRenderLayerList(page);
    if(!page.layers.length && els.guideLayerList){
      els.guideLayerList.textContent = '이 가이드에는 레이어가 없습니다. 아래에서 “새 레이어로 만들기”를 고르면 재단·화이트·컬러 레이어를 만들어 넣습니다.';
    }
    const roles = page.layers.reduce((acc, l) => { acc[l.role] = (acc[l.role] || 0) + 1; return acc; }, {});
    if(els.guideSummary){
      els.guideSummary.textContent = `${guideState.name} · ${guide.pages.length}쪽 · ${page.widthMm.toFixed(1)} × ${page.heightMm.toFixed(1)} mm · 레이어 ${page.layers.length}개 (재단 ${roles.cut || 0} · 화이트 ${roles.white || 0} · 그림 ${roles.art || 0})`;
    }
  }

  function guideClear(){
    guideState.guide = null; guideState.page = null; guideState.name = '';
    if(els.guideFileInput) els.guideFileInput.value = '';
    if(els.guidePageSelect) els.guidePageSelect.innerHTML = '';
    guideRenderUi();
  }

  async function guideLoadFile(file){
    const api = guideApi();
    if(!api) return setNotice('bad', '가이드를 읽지 못했습니다', 'guide-template.js 가 실려 있지 않습니다.');
    if(!file) return;
    guideState.busy = true;
    try{
      const bytes = new Uint8Array(await file.arrayBuffer());
      const guide = await api.parseGuide(bytes);
      guideState.guide = guide;
      guideState.page = api.pickBestPage(guide);
      guideState.name = file.name || '가이드';
      if(els.guidePageSelect) els.guidePageSelect.innerHTML = '';
      guideRenderUi();
      const missing = guide.warnings;
      if(missing.length) setNotice('warn', '가이드를 읽었습니다', missing.join(' '));
      else setNotice('good', '가이드를 읽었습니다', `${guideState.page.widthMm.toFixed(1)} × ${guideState.page.heightMm.toFixed(1)} mm · 레이어 ${guideState.page.layers.length}개를 찾았습니다.`);
    }catch(error){
      console.error(error);
      guideClear();
      setNotice('bad', '가이드를 읽지 못했습니다', error?.message || '가이드 ai(또는 pdf) 파일인지 확인해 주세요.');
    }finally{ guideState.busy = false; }
  }

  // 패스를 **가이드 페이지 좌표**로 옮긴다. 화이트와 칼선은 같은 변환을 써야
  // 서로 어긋나지 않는다 — v99 에서 곡선값을 따로 줬다가 겪은 일이다.
  function guidePathOps(paths, curve, map){
    let out = '';
    for(const p of paths || []){
      if(!p.length) continue;
      out += `${map.x(p[0].x).toFixed(4)} ${map.y(p[0].y).toFixed(4)} m\n`;
      for(const seg of curveSegments(p, curve)){
        if(seg.linear) out += `${map.x(seg.p1.x).toFixed(4)} ${map.y(seg.p1.y).toFixed(4)} l\n`;
        else out += `${map.x(seg.c1.x).toFixed(4)} ${map.y(seg.c1.y).toFixed(4)} ${map.x(seg.c2.x).toFixed(4)} ${map.y(seg.c2.y).toFixed(4)} ${map.x(seg.p1.x).toFixed(4)} ${map.y(seg.p1.y).toFixed(4)} c\n`;
      }
      out += 'h\n';
    }
    return out;
  }

  function guideCompositeArtwork(r, pick){
    const list = [];
    if(pick.background && r.background) list.push(r.background);
    if(pick.bleed && r.bleed) list.push(r.bleed);
    if(pick.artwork && r.original) list.push(r.original);
    if(!list.length) return null;
    const canvas = makeCanvas(r.widthPx, r.heightPx), ctx = canvas.getContext('2d');
    for(const src of list) ctx.drawImage(src, 0, 0, r.widthPx, r.heightPx);
    return canvas;
  }

  async function guideBuildBytes(r, pick){
    const api = guideApi();
    if(!api) throw new Error('guide-template.js 가 실려 있지 않습니다.');
    const guide = guideState.guide;
    if(!guide) throw new Error('먼저 인쇄소 가이드 ai 를 불러와 주세요.');
    const page = guideState.page;
    const place = api.computePlacement(page, r.widthMm, r.heightMm, {
      fit: els.guideFitSelect?.value === 'fill' ? 'fill' : 'actual',
      marginMm: Number(els.guideMarginMm?.value) || 0,
      offsetXMm: Number(els.guideOffsetX?.value) || 0,
      offsetYMm: Number(els.guideOffsetY?.value) || 0,
      box: 'trim'
    });
    const map = place.mapper(r.widthPx, r.heightPx);
    const pickOcg = select => {
      const raw = select?.value;
      if(raw === 'new') return 'new';
      const v = Number(raw);
      return raw !== '' && Number.isFinite(v) ? v : -1;
    };
    const roles = { cut: pickOcg(els.guideCutSelect), white: pickOcg(els.guideWhiteSelect), art: pickOcg(els.guideArtSelect) };

    const whitePaths = pick.whiteOpaque ? (r.whiteOpaquePaths || r.whitePaths) : (pick.whiteFull ? r.whitePaths : null);
    const cutOps = pick.cutline && r.cutPaths?.length ? guidePathOps(r.cutPaths, r.cutCurve ?? AUTO_CUT_CURVE, map) : '';
    const whiteOps = whitePaths?.length ? guidePathOps(whitePaths, AUTO_CUT_CURVE, map) : '';

    const images = [];
    if(roles.art === 'new' || roles.art >= 0){
      const canvas = guideCompositeArtwork(r, pick);
      if(canvas){
        const { rgb, alpha } = canvasRgbAlpha(canvas);
        images.push({
          ocg: roles.art, width: r.widthPx, height: r.heightPx,
          rgb: await pdfFlateStream(rgb), alpha: await pdfFlateStream(alpha)
        });
      }
    }
    const built = api.buildFromGuide(guide, {
      page, place, roles, cutOps, whiteOps, images,
      whiteRule: 'evenodd',
      dropNotes: !!els.guideDropNotes?.checked,
      title: `굿즈 메이커 · ${guideState.name}`
    });
    return { built, place };
  }

  async function exportGuideFiles(){
    const r = state.result;
    if(!r) return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');
    if(!guideState.guide) return alert('먼저 인쇄소 가이드 ai 파일을 불러와 주세요.');
    const pick = selectedLayers();
    if(!Object.values(pick).some(Boolean)) return alert('파일에 포함할 레이어를 하나 이상 선택해 주세요.');
    try{
      await withPrintExportResult(r, async rendered => {
        const { built, place } = await guideBuildBytes(rendered, pick);
        const base = exportFileName('ai', `goodsmaker-guide-${rendered.mode}-${rendered.finishStyle}`).replace(/\.ai$/i, '');
        const blobAi = new Blob([built.bytes], { type: 'application/postscript' });
        const blobPdf = new Blob([built.bytes], { type: 'application/pdf' });
        await downloadBlob(blobAi, `${base}.ai`);
        await downloadBlob(blobPdf, `${base}.pdf`);
        const size = `${place.widthMm.toFixed(1)} × ${place.heightMm.toFixed(1)} mm`;
        const extra = [];
        if(place.fitted) extra.push(`도안이 판형보다 커서 ${(place.scale * 100).toFixed(1)}% 로 줄였습니다.`);
        if(place.offsetXMm || place.offsetYMm) extra.push(`가운데에서 가로 ${place.offsetXMm.toFixed(1)}mm · 세로 ${place.offsetYMm.toFixed(1)}mm 옮겼습니다.`);
        extra.push(...built.notes);
        setNotice(extra.length ? 'warn' : 'good', '가이드 AI/PDF 내보내기 완료',
          `${guideState.name} 의 레이어에 맞춰 ${size} 로 넣었습니다. ${extra.join(' ')}`.trim());
      });
    }catch(error){
      console.error(error);
      setNotice('bad', '가이드 AI/PDF 내보내기에 실패했습니다', error?.message || '다시 시도해 주세요.');
    }
  }

  async function exportEditablePdf(){
    const r=state.result;
    if(!r||r.mode==='maker')return alert('칼선이 있는 코롯토/아크릴 또는 스티커 도안을 먼저 만들어 주세요.');
    if(!r.cutPaths?.length)return alert('편집 가능한 칼선이 없습니다. 칼선을 먼저 생성해 주세요.');
    const pick={...selectedLayers(),cutline:true};
    if(!pick.background&&!pick.artwork&&!pick.whiteOpaque&&!pick.whiteFull&&!pick.bleed)pick.artwork=true;
    try{
      await withPrintExportResult(r,async rendered=>{
        const bytes=await makeEditableCutlinePdf(rendered,pick);
        const blob=new Blob([bytes],{type:'application/pdf'});
        await validateExportBlob(blob,'editable-cutline.pdf');
        await downloadBlob(blob,exportFileName('pdf',`goodsmaker-${rendered.mode}-${rendered.finishStyle}-cutline`));
        setNotice('good','편집용 PDF 내보내기 완료','Illustrator에서 선택 가능한 CutContour 스폿 컬러 벡터 칼선을 포함했습니다.');
      });
    }catch(error){console.error(error);setNotice('bad','편집용 PDF 내보내기에 실패했습니다',error?.message||'다시 시도해 주세요.');}
  }

  async function exportAi(){
    const r=state.result;if(!r)return alert('먼저 칼선과 출력 레이어를 만들어 주세요.');const pick=selectedLayers();if(!Object.values(pick).some(Boolean))return alert('다운로드에 포함할 레이어를 하나 이상 선택해 주세요.');
    try{
      await withPrintExportResult(r,async rendered=>{
        const bytes=await makePdfAi(rendered,pick);
        const blob=new Blob([bytes],{type:'application/pdf'});
        await downloadBlob(blob,exportFileName('ai',`acrylic-manager-${rendered.mode}-${rendered.finishStyle}`));
      });
    }catch(error){console.error(error);setNotice('bad','AI 내보내기에 실패했습니다',error?.message||'다시 시도해 주세요.');}
  }

  function resetAll(){
    if(els.exportFileName)els.exportFileName.value='';
    if(state.mode==='acrylic'){
      state.source=null;state.result=null;state.finishStyle.acrylic='borderless';state.baseGapMode='transparent';state.baseSupportMode='color';state.borderlessBaseLevel=false;state.borderlessBaseMode='keep';state.holeCreateMode='internal';state.holes=[];state.selectedHoleIds=[];state.selectedHoleId=null;
      els.singleFileInput.value='';els.imageStatus.textContent='이미지 필요';els.productWidth.value=70;els.productHeight.value=70;els.artworkWidth.value=60;els.artworkHeight.value=60;els.lockArtworkAspect.checked=true;els.bleedMm.value=2;els.acrylicBorderMm.value=2;els.alphaThreshold.value=24;els.alphaThresholdBordered.value=24;if(els.acrylicCutSmooth)els.acrylicCutSmooth.value=0.5;if(els.stickerCutSmooth)els.stickerCutSmooth.value=0.5;els.colorSampleRadius.value=12;els.baseColorTolerance.value=18;els.baseLiftMm.value=0;els.baseCornerRadius.value=55;if(els.manualBaseWidthMm)els.manualBaseWidthMm.value=0;if(els.manualBaseOffsetMm)els.manualBaseOffsetMm.value=0;els.baseSlopeStatus.textContent='이미지를 넣으면 좌·우 돌출부의 높이 차이를 표시합니다.';els.includeHoles.checked=false;state.sealPoints.acrylic=[];state.sealPoints.bg=[];state.cutBridges.acrylic=[];state.bridgePlaceMode=false;state.bridgePending=null;updateBridgeUi();state.sealPlaceMode=false;state.sealPlaceChannel=null;state.bgLassos=[];state.bgLassoMode=false;bgLassoSelectedId=null;bgLassoDirty=false;updateBgLassoUi();updateSealUi();els.acrylicNarrowGapMm.value=4;els.acrylicBorderlessNarrowGapMm.value=1.2;els.addFlatBase.checked=true;els.holeDiameter.value=3;els.holeWall.value=1.5;els.holeInset.value=2.5;els.holeExternalGap.value=.4;updateAcrylicSizeSummary();setNotice('info','이미지를 추가해 주세요','투명 PNG를 올리면 그림, 화이트, 칼선, 재단여백 레이어를 생성합니다.');updateFinishStyleUi();drawPreview();
    }else if(state.mode==='sticker'){
      state.stickers=[];state.selectedId=null;state.selectedStickerIds=[];clearGroupMemberEdit();state.splitPreview=null;state.stickerHoleCreateMode='internal';state.stickerHoles=[];state.selectedStickerHoleIds=[];state.selectedStickerHoleId=null;state.finishStyle.sticker='borderless';state.stickerBorderFill='transparent';state.stickerBackgroundType='color';state.stickerBackgroundImage=null;state.stickerPatternImage=null;state.stickerPatternImages=[];els.stickerCount.textContent='0개';els.artboardWidth.value=210;els.artboardHeight.value=297;els.stickerBorder.value=2;els.stickerBleed.value=2;els.stickerWhiteBleed.value=1;els.stickerAlphaThreshold.value=24;els.stickerAlphaThresholdBordered.value=24;if(els.stickerCutSmooth)els.stickerCutSmooth.value=0.5;els.stickerIncludeHoles.checked=false;state.sealPoints.sticker=[];state.cutBridges.sticker=[];state.bridgePlaceMode=false;state.bridgePending=null;updateBridgeUi();state.sealPlaceMode=false;state.sealPlaceChannel=null;updateSealUi();els.stickerNarrowGapMm.value=4;els.stickerBorderlessNarrowGapMm.value=1.2;els.stickerHoleDiameter.value=3;els.stickerHoleWall.value=1.5;els.stickerHoleInset.value=2.5;els.stickerHoleExternalGap.value=.4;els.stickerBackgroundEnabled.checked=false;els.stickerBackgroundColor.value='#ffffff';els.stickerBackgroundFit.value='cover';els.stickerBackgroundScale.value=100;els.stickerBackgroundX.value=0;els.stickerBackgroundY.value=0;els.stickerBackgroundRotation.value=0;els.stickerPatternScale.value=100;els.stickerPatternX.value=0;els.stickerPatternY.value=0;els.stickerPatternBackgroundType.value='color';els.stickerPatternGradientA.value='#ffffffff';els.stickerPatternGradientB.value='#dff3ffff';els.stickerPatternGradientAngle.value=135;els.stickerPatternOrder.value='balanced';els.stickerPatternRotationMode.value='fixed';els.stickerPatternRotation.value=0;els.stickerPatternRotationMin.value=-15;els.stickerPatternRotationMax.value=15;els.stickerAutoGap.value=3;els.autoArrangeStatus.textContent='대기';els.stickerBackgroundFile.value='';els.stickerPatternFile.value='';els.stickerBackgroundStatus.textContent='선택된 이미지 없음';els.stickerPatternStatus.textContent='선택된 패턴 없음';syncStickerSelectionUi();updateFinishStyleUi();updateStickerBackgroundUi();updateStickerHoleUi();generateSticker();
    }else{
      state.makerItems=[];state.makerSelectedId=null;state.makerSelectedIds=[];state.makerMultiSelectMode=false;state.makerBackgroundType='transparent';state.makerBackgroundImage=null;state.makerPatternImage=null;state.makerPatternImages=[];els.makerCount.textContent='0개';els.makerWidth.value=100;els.makerHeight.value=100;els.makerCutMargin.value=0;els.makerBgColor.value='#ffffff00';els.makerPatternBackgroundType.value='color';els.makerPatternGradientA.value='#ffffff00';els.makerPatternGradientB.value='#dff3ffff';els.makerPatternGradientAngle.value=135;els.makerPatternOrder.value='balanced';els.makerPatternRotationMode.value='fixed';els.makerPatternRotation.value=0;els.makerPatternRotationMin.value=-15;els.makerPatternRotationMax.value=15;els.makerBackgroundRotation.value=0;els.makerBackgroundStatus.textContent='선택된 이미지 없음';els.makerPatternStatus.textContent='선택된 패턴 없음';updateMakerUi();generateMaker();
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
  els.baseSlopeKeepBtn.addEventListener('click',()=>setBorderlessBaseMode('keep'));
  els.baseSlopeLevelBtn.addEventListener('click',()=>setBorderlessBaseMode('level'));
  els.baseSlopeManualBtn?.addEventListener('click',()=>setBorderlessBaseMode('manual'));
  els.stickerBorderFillTransparentBtn.addEventListener('click',()=>setStickerBorderFill('transparent'));
  els.stickerBorderFillWhiteBtn.addEventListener('click',()=>setStickerBorderFill('white'));
  els.stickerBackgroundColorBtn.addEventListener('click',()=>setStickerBackgroundType('color'));
  els.stickerBackgroundGradientBtn.addEventListener('click',()=>setStickerBackgroundType('gradient'));
  els.stickerBackgroundImageBtn.addEventListener('click',()=>setStickerBackgroundType('image'));
  els.stickerBackgroundPatternBtn.addEventListener('click',()=>setStickerBackgroundType('pattern'));
  els.holeNoneBtn.addEventListener('click',()=>setHoleMode('none'));
  els.holeInternalBtn.addEventListener('click',()=>setHoleMode('internal'));
  els.holeExternalBtn.addEventListener('click',()=>setHoleMode('external'));
  els.stickerHoleNoneBtn.addEventListener('click',()=>setStickerHoleMode('none'));
  els.stickerHoleInternalBtn.addEventListener('click',()=>setStickerHoleMode('internal'));
  els.stickerHoleExternalBtn.addEventListener('click',()=>setStickerHoleMode('external'));
  els.stickerAddHoleBtn.addEventListener('click',()=>addStickerHole());
  els.stickerDeleteHoleBtn.addEventListener('click',()=>removeStickerHole());
  els.stickerResetHolePositionBtn.addEventListener('click',()=>{const hole=getSelectedStickerHole();if(!hole)return;hole.draftXmm=hole.draftYmm=null;ensureDraftStickerHolePosition(hole,true);schedulePersist(0);});
  els.stickerCenterHoleBtn.addEventListener('click',centerSelectedStickerHoles);
  els.stickerApplyHolesBtn.addEventListener('click',applyStickerHolesAndGenerate);
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
      // 새 그림을 넣으면 올가미와 입구 잠금 지점은 전부 지운다 (v103).
      // 둘 다 **그 그림의 좌표**에 매인 것이라, 다른 그림에 그대로 얹으면
      // 엉뚱한 자리를 지우거나 막는다. 사용자: "파일 새로 불러오면
      // 올가미/입구 막기 지정된 부분 리셋되게"
      resetPerImageMarks();
      for(const hole of state.holes){hole.appliedMode='none';hole.appliedXmm=hole.appliedYmm=null;hole.draftXmm=hole.draftYmm=null;hole.dirty=true;}
      els.imageStatus.textContent=file.name;
      fitArtworkToBoard({skipGenerate:true});
      updateArtworkScaleFromSize('width');
      drawPreview();
      setNotice('info','이미지를 불러왔습니다','대지에 원본을 먼저 표시하고 칼선과 확장 도안을 계산합니다.');
      await generateAcrylic();
      const autoSealed = await autoCloseInletsOnLoad('acrylic');
      if (autoSealed) {
        setNotice('good', `칼선 입구 ${autoSealed}곳을 자동으로 닫았습니다`,
          '입구보다 안이 넓은 <b>C 자 주머니</b>만 골랐습니다. 원치 않으면 입구 잠금 목록에서 빼고 <b>칼선 다시 계산</b>을 누르세요.');
      }
      ensureAllDraftHolePositions();
      await saveWorkspaceNow();
      schedulePersist(0);checkpointHistory();
    }catch(error){
      console.error(error);state.result=null;updateWhiteLayerUi();drawPreview();setBusy(false);
      setNotice('bad','이미지를 불러오지 못했습니다',error?.message||'지원되는 PNG, WebP 또는 JPG 파일인지 확인해 주세요.');
    }finally{
      setBusy(false);
    }
  }


  els.singleFileInput.addEventListener('change',async e=>{const input=e.currentTarget;try{await handleAcrylicFile(input.files?.[0]);}finally{input.value='';}});
  els.multiFileInput.addEventListener('change',async e=>{const input=e.currentTarget;const files=[...(input.files||[])];try{if(files.length)await addStickerFiles(files);}catch(error){console.error(error);setNotice('bad','스티커 이미지를 불러오지 못했습니다',error?.message||'PNG, JPG 또는 WebP 파일인지 확인해 주세요.');}finally{input.value='';}});
  els.makerFileInput.addEventListener('change',async e=>{const input=e.currentTarget;const files=[...(input.files||[])];try{if(files.length)await addMakerFiles(files);}catch(error){console.error(error);setNotice('bad','개체 이미지를 불러오지 못했습니다',error?.message||'PNG, JPG 또는 WebP 파일인지 확인해 주세요.');}finally{input.value='';}});
  els.stickerBackgroundFile.addEventListener('change',async e=>{const input=e.currentTarget,file=input.files?.[0];if(!file)return;try{setBusy(true);state.stickerBackgroundImage=await fileToImageRecord(file);els.stickerBackgroundStatus.textContent=file.name;state.stickerBackgroundType='image';els.stickerBackgroundEnabled.checked=true;revealBackgroundInPreview();updateStickerBackgroundUi();await generateSticker();await saveWorkspaceNow();schedulePersist(0);checkpointHistory();}catch(error){console.error(error);setNotice('bad','배경 이미지를 불러오지 못했습니다',error?.message||'이미지 파일을 확인해 주세요.');}finally{input.value='';setBusy(false);}});
  els.stickerPatternFile.addEventListener('change',async e=>{const input=e.currentTarget,files=[...(input.files||[])];if(!files.length)return;setBusy(true);try{state.stickerPatternImages=(await Promise.all(files.map(async file=>cropImageRecordToAlpha(await fileToImageRecord(file),1)))).filter(Boolean);state.stickerPatternImage=state.stickerPatternImages[0]||null;els.stickerPatternStatus.textContent=`${state.stickerPatternImages.length}개 이미지 · 투명 여백 자동 제거`;state.stickerBackgroundType='pattern';els.stickerBackgroundEnabled.checked=true;els.stickerPatternKind.value='image';revealBackgroundInPreview();updateStickerBackgroundUi();await generateSticker();await saveWorkspaceNow();checkpointHistory();}catch(error){console.error(error);setNotice('bad','패턴 이미지를 불러오지 못했습니다',error?.message||'이미지 파일을 확인해 주세요.');}finally{input.value='';setBusy(false);}schedulePersist(0);});
  els.makerBackgroundFile.addEventListener('change',async e=>{const input=e.currentTarget,file=input.files?.[0];if(!file)return;try{setBusy(true);state.makerBackgroundImage=await fileToImageRecord(file);els.makerBackgroundStatus.textContent=file.name;state.makerBackgroundType='image';revealBackgroundInPreview();updateMakerUi();await generateMaker();await saveWorkspaceNow();checkpointHistory();}catch(error){console.error(error);setNotice('bad','배경 이미지를 불러오지 못했습니다',error?.message||'이미지 파일을 확인해 주세요.');}finally{input.value='';setBusy(false);}});
  els.makerPatternFile.addEventListener('change',async e=>{const input=e.currentTarget,files=[...(input.files||[])];if(!files.length)return;setBusy(true);try{state.makerPatternImages=(await Promise.all(files.map(async file=>cropImageRecordToAlpha(await fileToImageRecord(file),1)))).filter(Boolean);state.makerPatternImage=state.makerPatternImages[0]||null;els.makerPatternStatus.textContent=`${state.makerPatternImages.length}개 이미지 · 투명 여백 자동 제거`;state.makerBackgroundType='pattern';els.makerPatternKind.value='image';revealBackgroundInPreview();updateMakerUi();await generateMaker();await saveWorkspaceNow();checkpointHistory();}catch(error){console.error(error);setNotice('bad','패턴 이미지를 불러오지 못했습니다',error?.message||'이미지 파일을 확인해 주세요.');}finally{input.value='';setBusy(false);}});

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
  [els.productWidth,els.productHeight,els.bleedMm,els.acrylicBorderMm,els.alphaThreshold,els.alphaThresholdBordered,els.acrylicCutSmooth,els.colorSampleRadius,els.baseColorTolerance,els.baseLiftMm,els.baseCornerRadius,els.manualBaseWidthMm,els.manualBaseOffsetMm].filter(Boolean).forEach(el=>el.addEventListener('input',()=>{updateAcrylicSizeSummary();scheduleAcrylicGenerate();}));
  // 좁은 홈 자동 연결 기준은 여태 이 목록에 없었다 (v126).
  //
  // 사용자: "화이트가 빈 공간 중간 메꾸는 문제"
  //
  // 값을 0 으로 두면 칼선이 머리카락 가닥 사이의 실 같은 홈마다 깊이 파고들고,
  // 그 홈이 통째로 재단여백으로 찬다. 화이트는 재단여백을 정직하게 따라가므로
  // 화이트 탭에서 "빈 공간이 메워진" 것으로 보인다. 실측(사용자 도안 · 350dpi):
  // 그림 없는 화이트가 칼선 **안쪽**은 36px 뿐이고 **바깥**이 22,962px 이었다 —
  // 메운 것이 아니라 잘려 나갈 자리다.
  //
  // 그런데 그 기준을 되돌려도 화면이 안 바뀐다. 이 칸에만 리스너가 없어서
  // 다른 칸을 건드려 계산이 돌기 전까지 옛 값으로 남아 있었다. 코롯토·스티커
  // 각각 무테/유테 네 칸이 전부 그랬다. CLAUDE.md 의 "눌리는데 안 움직인다"
  // 그대로다 — 자바스크립트는 값을 읽을 준비가 돼 있는데 아무도 안 부른다.
  [els.acrylicNarrowGapMm,els.acrylicBorderlessNarrowGapMm].filter(Boolean)
    .forEach(el=>el.addEventListener('input',scheduleAcrylicGenerate));
  [els.stickerNarrowGapMm,els.stickerBorderlessNarrowGapMm].filter(Boolean)
    .forEach(el=>el.addEventListener('input',scheduleStickerGenerate));
  els.artworkWidth.addEventListener('input',()=>{syncArtworkAspect('width');scheduleAcrylicGenerate();});
  els.artworkHeight.addEventListener('input',()=>{syncArtworkAspect('height');scheduleAcrylicGenerate();});
  els.artworkScale.addEventListener('input',()=>{syncArtworkSizeFromScale();scheduleAcrylicGenerate();});
  els.artworkScale.addEventListener('change',()=>{syncArtworkSizeFromScale();generateAcrylic();});
  els.lockArtworkAspect.addEventListener('change',()=>{if(els.lockArtworkAspect.checked)syncArtworkAspect('width');else updateAcrylicSizeSummary();generateAcrylic();});
  els.fitArtworkToBoardBtn.addEventListener('click',()=>fitArtworkToBoard());
  els.includeHoles.addEventListener('change',generateAcrylic);
  els.addFlatBase.addEventListener('change',()=>{updateFlatBaseUi();generateAcrylic();});
  [els.holeDiameter,els.holeWall,els.holeInset,els.holeExternalGap].forEach(el=>el.addEventListener('input',()=>markHoleDirty(true)));
  [els.stickerHoleDiameter,els.stickerHoleWall,els.stickerHoleInset,els.stickerHoleExternalGap].forEach(el=>el.addEventListener('input',()=>markStickerHoleDirty(true)));
  [els.artboardWidth,els.artboardHeight,els.stickerBorder,els.stickerBleed,els.stickerWhiteBleed,els.stickerAlphaThreshold,els.stickerAlphaThresholdBordered,els.stickerCutSmooth].forEach(el=>el&&el.addEventListener('input',scheduleStickerGenerate));
  els.stickerIncludeHoles.addEventListener('change',generateSticker);
  els.stickerBackgroundEnabled.addEventListener('change',()=>{revealBackgroundInPreview();updateStickerBackgroundUi();generateSticker();});
  const scheduleVisibleStickerBackground=()=>{revealBackgroundInPreview();scheduleStickerGenerate();};
  [els.stickerBackgroundColor,els.stickerGradientColorA,els.stickerGradientColorB,els.stickerGradientAngle,els.stickerBackgroundRotation,els.stickerPatternBgColor,els.stickerPatternGradientA,els.stickerPatternGradientB,els.stickerPatternGradientAngle,els.stickerPatternFgColor,els.stickerPatternLineWidth,els.stickerPatternSize,els.stickerPatternGap,els.stickerPatternSizeMin,els.stickerPatternSizeMax,els.stickerPatternDispersion,els.stickerPatternDensity,els.stickerPatternRotation,els.stickerPatternRotationMin,els.stickerPatternRotationMax].filter(Boolean).forEach(el=>{el.addEventListener('input',scheduleVisibleStickerBackground);el.addEventListener('change',scheduleVisibleStickerBackground);});
  els.stickerBackgroundFit.addEventListener('change',()=>{revealBackgroundInPreview();updateStickerBackgroundUi();generateSticker();});[els.stickerPatternKind,els.stickerPatternBackgroundType,els.stickerPatternLineStyle,els.stickerPatternLayout,els.stickerPatternOrder,els.stickerPatternRotationMode,els.stickerPatternSizeMode,els.stickerPatternPositionMode].filter(Boolean).forEach(el=>el.addEventListener('change',()=>{revealBackgroundInPreview();updateStickerBackgroundUi();generateSticker();}));
  [els.stickerBackgroundScale,els.stickerBackgroundX,els.stickerBackgroundY,els.stickerPatternScale,els.stickerPatternX,els.stickerPatternY].forEach(el=>{el.addEventListener('input',scheduleVisibleStickerBackground);el.addEventListener('change',scheduleVisibleStickerBackground);});
  [els.selWidth,els.selRotation,els.selX,els.selY].forEach(el=>el.addEventListener('input',updateSelectedFromFields));
  els.sendBackBtn.addEventListener('click',()=>moveItemLayer(state.stickers,state.selectedId,'back'));els.stepBackBtn.addEventListener('click',()=>moveItemLayer(state.stickers,state.selectedId,'step-back'));els.stepFrontBtn.addEventListener('click',()=>moveItemLayer(state.stickers,state.selectedId,'step-front'));els.bringFrontBtn.addEventListener('click',()=>moveItemLayer(state.stickers,state.selectedId,'front'));els.copyStickerBtn?.addEventListener('click',duplicateStickerObjects);
  els.deleteStickerBtn.addEventListener('click',()=>{const ids=new Set(state.selectedStickerIds);state.stickers=state.stickers.filter(v=>!ids.has(v.id));state.stickerHoles=state.stickerHoles.filter(hole=>!ids.has(hole.ownerId));els.stickerCount.textContent=`${state.stickers.length}개`;selectSticker(null);generateSticker();});
  document.querySelectorAll('.sticker-size-template').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.sticker-size-template').forEach(v=>v.classList.toggle('active',v===btn));const r=btn.dataset.ratio;if(r==='square'){els.artboardWidth.value=100;els.artboardHeight.value=100;}else if(r==='portrait'){els.artboardWidth.value=100;els.artboardHeight.value=125;}else if(r==='story'){els.artboardWidth.value=90;els.artboardHeight.value=160;}else{els.artboardWidth.value=210;els.artboardHeight.value=297;}generateSticker();}));
  document.querySelectorAll('.maker-size-template').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.maker-size-template').forEach(v=>v.classList.toggle('active',v===btn));const r=btn.dataset.ratio;if(r==='square'){els.makerWidth.value=100;els.makerHeight.value=100;}else if(r==='portrait'){els.makerWidth.value=100;els.makerHeight.value=125;}else if(r==='story'){els.makerWidth.value=90;els.makerHeight.value=160;}else{els.makerWidth.value=210;els.makerHeight.value=297;}generateMaker();}));
  const setMakerBg=type=>{state.makerBackgroundType=type;revealBackgroundInPreview();updateMakerUi();generateMaker();};els.makerBgTransparentBtn.addEventListener('click',()=>setMakerBg('transparent'));els.makerBgColorBtn.addEventListener('click',()=>setMakerBg('color'));els.makerBgGradientBtn.addEventListener('click',()=>setMakerBg('gradient'));els.makerBgImageBtn.addEventListener('click',()=>setMakerBg('image'));els.makerBgPatternBtn.addEventListener('click',()=>setMakerBg('pattern'));
  const makerBackgroundInputs=[els.makerBgColor,els.makerGradientA,els.makerGradientB,els.makerGradientAngle,els.makerBackgroundScale,els.makerBackgroundX,els.makerBackgroundY,els.makerBackgroundRotation,els.makerPatternBg,els.makerPatternGradientA,els.makerPatternGradientB,els.makerPatternGradientAngle,els.makerPatternFg,els.makerPatternScale,els.makerPatternX,els.makerPatternY,els.makerPatternLineWidth,els.makerPatternSize,els.makerPatternGap,els.makerPatternSizeMin,els.makerPatternSizeMax,els.makerPatternDispersion,els.makerPatternDensity,els.makerPatternRotation,els.makerPatternRotationMin,els.makerPatternRotationMax].filter(Boolean);
  [els.makerWidth,els.makerHeight,els.makerCutMargin].filter(Boolean).forEach(el=>el.addEventListener('input',scheduleMakerGenerate));
  makerBackgroundInputs.forEach(el=>{const preview=()=>{revealBackgroundInPreview();scheduleMakerGenerate();};const commit=()=>{revealBackgroundInPreview();generateMaker();};el.addEventListener('input',preview);el.addEventListener('change',commit);});
  els.makerBackgroundFit.addEventListener('change',()=>{revealBackgroundInPreview();updateMakerUi();generateMaker();});[els.makerPatternKind,els.makerPatternBackgroundType,els.makerPatternLineStyle,els.makerPatternLayout,els.makerPatternOrder,els.makerPatternRotationMode,els.makerPatternSizeMode,els.makerPatternPositionMode].filter(Boolean).forEach(el=>el.addEventListener('change',()=>{revealBackgroundInPreview();updateMakerUi();generateMaker();}));
  const makerObjectInputControls=[els.makerSelWidth,els.makerSelHeight,els.makerSelRotation,els.makerSelX,els.makerSelY,els.makerTextContent,els.makerTextFontSize,els.makerTextLineHeight,els.makerTextLetterSpacing,els.makerTextBackgroundColor,els.makerCornerRadius,els.makerShapeStrokeWidth,els.makerShapeStrokeColor,els.makerLineWidth,els.makerObjectFillColor,els.makerObjectGradientA,els.makerObjectGradientB,els.makerObjectGradientAngle,els.makerObjectPatternColor,els.makerObjectPatternBackground,els.makerObjectPatternSize,els.makerObjectPatternGap,els.makerObjectPatternRotation].filter(Boolean);
  makerObjectInputControls.forEach(el=>el.addEventListener('input',updateMakerSelectedFromFields));
  [els.makerAspectMode,els.makerTextFont,els.makerTextWeight,els.makerTextAlign,els.makerTextVerticalAlign,els.makerTextBackgroundEnabled,els.makerShapeKind,els.makerLineStyle,els.makerLineCap,els.makerObjectFillType,els.makerObjectPatternKind].filter(Boolean).forEach(el=>el.addEventListener('change',()=>{updateMakerSelectedFromFields();updateMakerUi({skipEffectRender:true});}));
  els.makerAddTextBtn?.addEventListener('click',addMakerTextObject);els.makerAddShapeBtn?.addEventListener('click',()=>{if(typeof els.makerShapeDialog?.showModal==='function')els.makerShapeDialog.showModal();else els.makerShapeDialog?.setAttribute('open','');});
  els.makerShapeDialog?.querySelectorAll('[data-maker-shape]').forEach(btn=>btn.addEventListener('click',async()=>{els.makerShapeDialog.close?.();await addMakerShapeObject(btn.dataset.makerShape);}));
  els.reloadFontsBtn?.addEventListener('click',async()=>{state.fontsLoaded=false;await loadRepositoryFonts(true);updateMakerUi();await generateMaker();});
  els.uploadRuntimeFontsBtn?.addEventListener('click',()=>els.runtimeFontInput?.click());
  els.runtimeFontInput?.addEventListener('change',async event=>{const files=[...(event.target.files||[])];event.target.value='';if(!files.length)return;els.runtimeFontStatus.textContent=`폰트 ${files.length}개를 확인하는 중…`;let added=0;const errors=[];for(const file of files){try{await window.GoodsMakerFonts.installFile(file);added++;}catch(error){errors.push(error.message||String(error));}}state.fontsLoaded=false;await loadRepositoryFonts(true);updateMakerUi();await generateMaker();els.runtimeFontStatus.textContent=errors.length?`${added}개 추가 · ${errors.join(' / ')}`:`${added}개 폰트를 기기에 저장했습니다.`;});
  els.runtimeFontList?.addEventListener('click',async event=>{const button=event.target.closest('[data-runtime-font-delete]');if(!button)return;await window.GoodsMakerFonts.remove(button.dataset.runtimeFontDelete);state.fontsLoaded=false;await loadRepositoryFonts(true);updateMakerUi();await generateMaker();});
  els.clearRuntimeFontsBtn?.addEventListener('click',async()=>{if(!state.runtimeFonts.some(font=>font.source==='runtime'||font.source==='runtime-error'))return;if(!confirm('이 기기에 추가한 폰트를 모두 삭제할까요?'))return;await window.GoodsMakerFonts.clear();state.fontsLoaded=false;await loadRepositoryFonts(true);updateMakerUi();await generateMaker();});
  els.makerLockBtn?.addEventListener('click',toggleMakerObjectLock);els.makerApplyTextBackgroundBtn?.addEventListener('click',applySelectedTextBackground);els.makerApplyTextBackgroundAllBtn?.addEventListener('click',applyAllTextBackground);els.makerClearTextBackgroundBtn?.addEventListener('click',clearSelectedTextBackground);
  els.makerTextBackgroundRangeList?.addEventListener('click',event=>{const button=event.target.closest('[data-text-range-delete]');if(button)deleteSelectedTextBackground(Number(button.dataset.textRangeDelete));});
  els.makerAddEffectBtn?.addEventListener('click',addMakerEffectLayer);
  els.makerEffectList?.addEventListener('input',event=>{const control=event.target.closest('[data-effect-field]');if(control)mutateMakerEffectControl(control);});
  els.makerEffectList?.addEventListener('change',event=>{const control=event.target.closest('[data-effect-field]');if(control)mutateMakerEffectControl(control);});
  els.makerEffectList?.addEventListener('click',event=>{const button=event.target.closest('[data-effect-action]');if(button)handleMakerEffectAction(button);});
  els.makerPngTransparentBtn.addEventListener('click',()=>{els.makerPngBackground.value='transparent';updateMakerUi();schedulePersist(0);});els.makerPngWhiteBtn.addEventListener('click',()=>{els.makerPngBackground.value='white';updateMakerUi();schedulePersist(0);});
  els.makerMultiSelectBtn?.addEventListener('click',()=>{state.makerMultiSelectMode=!state.makerMultiSelectMode;updateMakerUi();drawPreview();schedulePersist(0);checkpointHistory();});els.makerGroupBtn?.addEventListener('click',groupSelectedMakerItems);els.makerUngroupBtn?.addEventListener('click',ungroupSelectedMakerItems);
  els.makerSendBackBtn.addEventListener('click',()=>moveItemLayer(state.makerItems,state.makerSelectedId,'back'));els.makerStepBackBtn.addEventListener('click',()=>moveItemLayer(state.makerItems,state.makerSelectedId,'step-back'));els.makerStepFrontBtn.addEventListener('click',()=>moveItemLayer(state.makerItems,state.makerSelectedId,'step-front'));els.makerBringFrontBtn.addEventListener('click',()=>moveItemLayer(state.makerItems,state.makerSelectedId,'front'));els.copyMakerBtn?.addEventListener('click',duplicateMakerObjects);els.makerApplyEffectsAllBtn?.addEventListener('click',applySelectedMakerEffectsToAll);els.makerDeleteBtn.addEventListener('click',deleteSelectedMakerItems);
  document.querySelectorAll('.align-action').forEach(btn=>btn.addEventListener('click',()=>alignItemsToBoard('sticker',btn.dataset.align)));
  document.querySelectorAll('.maker-align-action').forEach(btn=>btn.addEventListener('click',()=>alignItemsToBoard('maker',btn.dataset.align)));
  els.exportPngBtn.addEventListener('click',exportPng);
  els.exportJpgBtn.addEventListener('click',exportJpg);
  els.exportSvgBtn.addEventListener('click',exportSvg);
  els.exportPdfBtn?.addEventListener('click',exportEditablePdf);
  els.cutSlitFill?.addEventListener('change',()=>{if(state.mode==='acrylic')generateAcrylic();else if(state.mode==='sticker')generateSticker();});
  els.cutSimplifyMm?.addEventListener('change',()=>{if(state.mode==='acrylic')generateAcrylic();else if(state.mode==='sticker')generateSticker();});
  els.exportGuideBtn?.addEventListener('click',exportGuideFiles);
  els.guideFileInput?.addEventListener('change',event=>{const file=event.target.files&&event.target.files[0];if(file)guideLoadFile(file);});
  els.guideClearBtn?.addEventListener('click',guideClear);
  els.guidePageSelect?.addEventListener('change',()=>{const index=Number(els.guidePageSelect.value);const page=guideState.guide?.pages[index];if(page){guideState.page=page;guideRenderUi();}});
  guideRenderUi();
  els.exportAiBtn.addEventListener('click',exportAi);
  window.__goodsMakerDiagnostics = Object.freeze({
    get stickerCount(){return state.stickers.length;},
    get makerImageCount(){return state.makerItems.filter(item=>makerObjectType(item)==='image').length;},
    get mode(){return state.mode;},
    get hasResult(){return !!state.result;},
    // v89 — 올가미 조작을 밖에서 볼 수 있게. 읽기 전용이라 앱 동작에는 영향이 없고,
    // 브라우저 자동 검사가 "고른 것 · 아직 적용 안 된 변경" 을 확인하는 데 쓴다.
    get bgLassoCount(){return state.bgLassos.length;},
    get bgLassoSelected(){return bgLassoSelectedId;},
    get bgLassoPending(){return bgLassoDirty;},
    get bgLassoDrawing(){return !!state.bgLassoMode;},
    // v98 — 화이트/반투명 면 상태를 밖에서 볼 수 있게. 읽기 전용이다.
    // "반투명 면 제외" 옵션이 왜 안 뜨는지 같은 것을 눈이 아니라 수치로 본다.
    get hasSemiTransparent(){return !!state.result?.hasSemiTransparent;},
    get semiTransparentPixelCount(){return state.result?.semiTransparentPixelCount||0;},
    get semiTransparentRegionCount(){return state.result?.semiTransparentRegionCount||0;},
    // v99 — 화이트를 벡터 패스로 내보낼 수 있는지, 래스터와 얼마나 어긋나는지.
    get whiteVector(){return {
      full:!!state.result?.whitePaths, opaque:!!state.result?.whiteOpaquePaths,
      fullPathCount:state.result?.whitePaths?.length||0,
      opaquePathCount:state.result?.whiteOpaquePaths?.length||0,
      mismatch:state.result?.whiteVectorMismatch||null };}
    ,
    // v110 — 칼선 자체의 통계. 내보내기가 화면과 같은 칼선을 쓰는지
    // (입구 닫기가 고해상도 다시 그리기에서도 살아 있는지) 수치로 본다.
    get cutStats(){
      const r=state.result;
      if(!r||!r.cutPaths)return {paths:0,points:0,length:0,sealed:0,sealPoints:0,bridges:0};
      let points=0,length=0;
      for(const path of r.cutPaths){
        points+=path.length;
        for(let i=0;i<path.length;i++){
          const a=path[i],b=path[(i+1)%path.length];
          length+=Math.hypot(b.x-a.x,b.y-a.y);
        }
      }
      const fitted=r.cutPaths.filter(p=>p._fitSegments).length;
      let anchors=0;for(const p of r.cutPaths)anchors+=p._fitSegments?p._fitSegments.length:p.length;
      return {paths:r.cutPaths.length,points,anchors,fitted,simplify:r.cutSimplify||null,length:Math.round(length),
        narrow:r.narrowInletPixels||0,narrowGapMm:r.narrowInletGapMm??null,style:r.finishStyle,
        sealed:r.sealedInletPixels||0,sealPoints:r.sealPointCount||0,
        bridges:(state.cutBridges?.[r.mode]||[]).length,ppm:r.ppm};
    },
    // v104 — 칼선이 닫아서 갇힌 투명 영역. 그 자리에 확장색이 깔렸는지를
    // 눈이 아니라 픽셀로 확인하려고 열어 둔다. 읽기 전용이다.
    // v117 — 칼선이 투명한 자리와 맞닿아 재단여백을 안 깐 구간. 눈이 아니라
    // 픽셀로 본다. zone 이 그 구간의 넓이, edge 는 가장자리 한 겹에 일부러
    // 남긴 부드러운 마감(v118), deep 이 정말로 새어 든 확장색이다 —
    // **deep 이 0 이어야 한다.**
    get openCutBleed(){
      const r=state.result;
      if(!r||!r.transparentCutZone)return {zone:0,edge:0,deep:0};
      const w=r.widthPx,h=r.heightPx,z=r.transparentCutZone;
      let zone=0,edge=0,deep=0;
      try{
        const d=r.bleed.getContext('2d').getImageData(0,0,w,h).data;
        const inner=erodeMask(z,w,h,2);
        for(let i=0;i<w*h;i++){
          if(!z[i])continue;
          zone++;
          if(d[i*4+3]<=8)continue;
          if(inner[i])deep++;else edge++;
        }
      }catch(e){/* 미리보기가 아직 없으면 0 */}
      return {zone,edge,deep};
    },
    get closedInlet(){
      const r=state.result;
      if(!r||!r.closedInletMask)return {pixels:0,filled:0,includeHoles:!!r?.includeHoles};
      const w=r.widthPx,h=r.heightPx,m=r.closedInletMask;
      let filled=0,deep=0;
      try{
        const d=r.bleed.getContext('2d').getImageData(0,0,w,h).data;
        // 닫힌 영역의 가장자리(밖과 맞닿은 자리)에서 3px 넘게 들어온 것만
        // "진짜로 색이 찼다" 로 센다. 가장자리 2~3px 은 재단선 둘레에 일부러
        // 남기는 여백이라(extendBleedUnderArtwork · antialiasBleedEdge) 있어야 한다.
        const edge=new Uint8Array(w*h);
        for(let y=0;y<h;y++)for(let x=0;x<w;x++){
          const i=y*w+x;if(!m[i])continue;
          if((x>0&&!m[i-1])||(x<w-1&&!m[i+1])||(y>0&&!m[i-w])||(y<h-1&&!m[i+w]))edge[i]=1;
        }
        const inner=erodeMask(m,w,h,3);
        for(let i=0;i<w*h;i++){
          if(!m[i]||d[i*4+3]<=8)continue;
          filled++;if(inner[i])deep++;
        }
        void edge;
      }catch(e){/* 미리보기가 아직 없으면 0 */}
      return {pixels:r.closedInletPixels||0,filled,deep,includeHoles:!!r.includeHoles};
    }
  });
    // ── 테마 ────────────────────────────────────────────────────────
  // <head> 의 인라인 스크립트가 이미 data-theme 을 정해 두었다.
  // 여기서는 그 값을 버튼에 반영하고, 누를 때 뒤집는 일만 한다.
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme',theme);
    const dark=theme==='dark';
    if(els.themeToggleBtn){
      els.themeToggleBtn.setAttribute('aria-pressed',String(dark));
      // v62: 이 버튼은 이제 '화면 설정'(밝기·글꼴·글자 크기)을 연다.
      // 아이콘은 지금 상태를 계속 알리고, 설명은 누르면 무슨 일이 생기는지 적는다.
      els.themeToggleBtn.setAttribute('aria-label','화면 설정 (지금 '+(dark?'어두운':'밝은')+' 화면)');
      els.themeToggleBtn.setAttribute('title','화면 설정 — 밝기 · 글꼴 · 글자 크기');
      const icon=els.themeToggleBtn.querySelector('.unicode-icon');
      if(icon)icon.textContent=dark?'☀':'☾';
    }
    // 안드로이드 상태표시줄 색까지 맞춘다. 안 맞추면 상단만 밝게 남는다.
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.setAttribute('content',dark?'#16181b':'#f4f5f7');
  }
  function currentTheme(){return document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';}
  applyTheme(currentTheme());
  els.themeToggleBtn?.addEventListener('click',()=>{
    if(window.GoodsMakerDisplay?.open){window.GoodsMakerDisplay.open();return;}
    const next=currentTheme()==='dark'?'light':'dark';
    try{localStorage.setItem('goodsmaker.theme',next);}catch(e){}
    applyTheme(next);
  });
  // 화면 설정 시트가 밝기를 바꿀 때 아이콘·상태표시줄까지 함께 맞추도록 내보낸다.
  window.GoodsMakerTheme={apply:applyTheme,current:currentTheme};

  // 배경 지우기는 이미지 안 좌표가 필요하다. 잠금 지점은 대지 좌표(mm)로
  // 모여 있으므로, 그림이 대지에 놓인 배치를 거꾸로 풀어 되돌린다.
  //
  //   대지 px = mm × ppm      (아크릴은 pad 가 0)
  //   이미지 px = trim.sx + (대지 px - dx) × (trim.sw / drawW)
  //
  // 스티커·개체는 각자 회전과 배치를 따로 갖고 있어 같은 변환이 성립하지
  // 않는다. 그쪽은 시트의 '틈 닫기' 를 쓰면 된다 — 아래 안내도 그렇게 적는다.
  function sealPointsForRecord(record){
    if(state.mode!=='acrylic'||record!==state.source)return [];
    const r=state.result,place=r?.artworkPlacement;
    if(!place||!r.ppm)return [];
    const scaleX=place.sw/place.drawW,scaleY=place.sh/place.drawH;
    const pxPerMm=r.ppm*scaleX;
    const out=[];
    for(const point of sealPointsFor('bg')){
      const bx=point.xMm*r.ppm,by=point.yMm*r.ppm;
      const ix=place.sx+(bx-place.dx)*scaleX,iy=place.sy+(by-place.dy)*scaleY;
      if(ix<0||iy<0||ix>=record.naturalWidth||iy>=record.naturalHeight)continue;
      const gapMm=Number.isFinite(point.gapMm)&&point.gapMm>0?point.gapMm:3;
      out.push({x:ix,y:iy,radius:Math.max(2,Math.round(gapMm/2*pxPerMm))});
    }
    return out;
  }


  // ══════════════════════════════════════════════════════════════════
  // 입구 잠금 — 상태 · 목록 · 미리보기에서 찍기
  //
  // 지점은 대지 좌표(mm)로 모은다. 타공과 같은 좌표계라 미리보기 탭 처리
  // (boardPointFromEvent)를 그대로 쓸 수 있고, 아크릴은 mm×ppm+pad,
  // 스티커는 mm×ppm 으로 각자 마스크 좌표로 옮기면 된다.
  // ══════════════════════════════════════════════════════════════════
  // 채널이 셋이다. acrylic·sticker 는 칼선용, bg 는 배경 지우기 전용이다.
  // v76 이전에는 아크릴 칼선용 목록을 배경 지우기가 그대로 가져다 썼는데,
  // 두 작업은 막아야 할 자리가 서로 다르다 — 칼선은 재단선이 안 닫히는 홈을,
  // 배경 지우기는 물감통이 새 들어오는 입구를 막는다. 그래서 분리했다.
  if (!state.sealPoints) state.sealPoints = { acrylic: [], sticker: [], bg: [] };
  if (!Array.isArray(state.sealPoints.bg)) state.sealPoints.bg = [];
  state.sealPlaceMode = false;
  state.sealPlaceChannel = null;   // 'acrylic' | 'sticker' | 'bg'
  const sealFeedback = { acrylic: [], sticker: [], bg: [] };
  // 칼선을 닫는 손질(입구 잠금 · 두 지점 닫기)은 **적용을 눌렀을 때** 계산한다 (v105).
  //
  // 사용자: "칼선 입구 닫는 것도 올가미처럼 적용 눌러야 적용됐으면 좋겠어.
  // 이거 미리보기 실시간이 생각보다 너무 느리네"
  //
  // 지점 하나를 찍을 때마다 칼선을 통째로 다시 만들었다. 큰 도안에서는 그것이
  // 몇 초씩 걸리고, 입구는 보통 여러 곳을 잇달아 찍는다 — 자동으로 찾기는 한
  // 번에 열 곳까지 넣는다. 올가미와 같은 규칙으로 바꿨다.
  //
  // 둘은 한 번의 generateAcrylic 으로 함께 반영되므로 **깃발도 하나**다.
  // 어느 블록에서 눌러도 둘 다 적용된다.
  const cutCloseDirty = { acrylic: false, sticker: false };
  function markCutCloseDirty() {
    const mode = sealModeForCurrent();
    if (!mode) return;
    cutCloseDirty[mode] = true;
    updateSealUi();
    updateBridgeUi();
    drawPreview();
    schedulePersist(0);
  }
  function cutCloseIsDirty() {
    const mode = sealModeForCurrent();
    return !!(mode && cutCloseDirty[mode]);
  }
  async function applyCutClose() {
    if (!cutCloseIsDirty()) return;
    await regenerateForSeal();
  }

  function sealPointsFor(mode) {
    if (!state.sealPoints[mode]) state.sealPoints[mode] = [];
    return state.sealPoints[mode];
  }
  function recordSealFeedback(mode, applied) {
    sealFeedback[mode] = applied || [];
    for (const point of sealPointsFor(mode)) {
      const hit = sealFeedback[mode].find(v => v.id === point.id);
      point.gapMm = hit ? hit.gapMm : null;
      point.applied = !!(hit && hit.added);
      point.pending = false;   // 이제 계산을 지났다
    }
  }
  function sealFeedbackLabel(mode) {
    const count = (sealFeedback[mode] || []).filter(v => v.added).length;
    return count ? ` · 입구 잠금 ${count}곳` : '';
  }
  // 입구 잠금 블록이 지금 화면에 떠 있는가 (v102).
  // 올가미와 같은 규칙이다 — 설정을 접거나 다른 탭으로 옮기면 찍기 모드도
  // 같이 풀고 미리보기의 표시도 지운다. 도구가 눈앞에 없는데 미리보기에만
  // 동그라미가 남아 있으면 지금 무엇을 만지는 중인지 알 수 없다.
  function sealBlockOnScreen(prefix) {
    if (prefix === 'bg') return bgPanelOnScreen();
    const block = $(`${prefix}SealBlock`);
    if (!block || block.classList.contains('hidden')) return false;
    return block.getClientRects().length > 0;
  }

  // 레이아웃이 바뀌거나 블록이 접히면 찍기 모드를 접는다.
  // 보이는지 여부가 **바뀐 때만** 다시 그린다 — 이 함수는 문서의 모든
  // details 토글마다 불리므로, 매번 미리보기를 다시 그리면 그만큼 느려진다.
  let sealBlockWasVisible = null;
  function syncSealPlaceVisibility() {
    const mode = sealModeForCurrent();
    const visible = mode ? sealBlockOnScreen(mode) : false;
    const channel = sealPlaceChannel();
    let changed = visible !== sealBlockWasVisible;
    sealBlockWasVisible = visible;
    if (channel && !sealBlockOnScreen(channel)) {
      state.sealPlaceMode = false;
      state.sealPlaceChannel = null;
      els.canvas.style.cursor = '';
      updateSealUi();
      changed = true;
    }
    if (changed) drawPreview();
  }

  function sealModeForCurrent() {
    return state.mode === 'acrylic' ? 'acrylic' : state.mode === 'sticker' ? 'sticker' : null;
  }
  // 지금 미리보기 탭이 어느 목록으로 들어가는가. 'bg' 는 코롯토/아크릴에서만
  // 쓸 수 있다(원본 한 장에 대한 좌표 변환이 그때만 성립한다).
  function sealPlaceChannel() {
    if (!state.sealPlaceMode) return null;
    if (state.sealPlaceChannel === 'bg') return state.mode === 'acrylic' ? 'bg' : null;
    return sealModeForCurrent();
  }

  function addSealPoint(xMm, yMm, meta = {}) {
    const channel = meta.channel || sealPlaceChannel() || sealModeForCurrent();
    if (!channel) return null;
    // pending: 아직 계산을 안 지난 지점. 이 표시가 없으면 목록이 "닫을 입구를
    // 못 찾음" 이라고 거짓말을 한다 — 아직 찾아본 적조차 없는데.
    const point = { id: uid(), xMm: +xMm.toFixed(2), yMm: +yMm.toFixed(2),
                    gapMm: meta.gapMm ?? null, applied: false, pending: channel !== 'bg' };
    sealPointsFor(channel).push(point);
    return point;
  }
  function removeSealPoint(id, channel) {
    const target = channel || sealModeForCurrent();
    if (!target) return;
    state.sealPoints[target] = sealPointsFor(target).filter(point => point.id !== id);
  }

  // 그림 한 장에 매인 표시(올가미 · 입구 잠금 · 두 지점 닫기)를 모두 지운다.
  // 코롯토/아크릴은 원본 한 장을 다루므로 그 한 장이 바뀌면 전부 뜻을 잃는다.
  function resetPerImageMarks() {
    state.sealPoints.acrylic = [];
    state.sealPoints.bg = [];
    state.cutBridges.acrylic = [];
    state.bridgePlaceMode = false;
    state.bridgePending = null;
    state.sealPlaceMode = false;
    state.sealPlaceChannel = null;
    cutCloseDirty.acrylic = false;
    cutCloseDirty.sticker = false;
    state.bgLassos = [];
    state.bgLassoMode = false;
    bgLassoSelectedId = null;
    bgLassoDirty = false;
    if (els.canvas) els.canvas.style.cursor = '';
    updateBridgeUi();
    updateSealUi();
    updateBgLassoUi();
  }

  async function regenerateForSeal() {
    const mode = sealModeForCurrent();
    if (mode) cutCloseDirty[mode] = false;
    if (state.mode === 'acrylic') await generateAcrylic();
    else if (state.mode === 'sticker') await generateSticker();
    // 한 번의 계산이 입구 잠금과 두 지점 닫기를 **함께** 반영한다.
    // (v105 이전에는 regenerateForBridge 가 따로 있었다. 같은 일을 하면서
    //  갱신하는 목록만 달라 둘 중 하나는 늘 낡은 채로 남았다.)
    updateSealUi();
    updateBridgeUi();
    drawPreview();
    schedulePersist(0);
    checkpointHistory();
  }

  function sealUiPrefix() {
    const mode = sealModeForCurrent();
    return mode === 'acrylic' ? 'acrylic' : mode === 'sticker' ? 'sticker' : null;
  }

  // 입구 잠금 블록과 두 지점 닫기 블록에 같은 버튼을 하나씩 둔다. 둘 다 같은
  // 계산(칼선 다시 만들기) 한 번을 부르므로, 어느 쪽에서 눌러도 둘 다 반영된다.
  // 누를 것이 없을 때 살려 두면 몇 초짜리 계산을 헛돌린다 — 올가미와 같은 규칙.
  function syncCutCloseApplyBtn(btn, prefix) {
    if (!btn) return;
    const pending = sealModeForCurrent() === prefix && cutCloseDirty[prefix];
    btn.disabled = !pending;
    btn.classList.toggle('primary', !!pending);
    btn.classList.toggle('secondary', !pending);
  }

  function updateSealUi() {
    for (const prefix of ['acrylic', 'sticker', 'bg']) {
      const list = $(`${prefix}SealList`), count = $(`${prefix}SealCount`), pick = $(`${prefix}SealPickBtn`);
      const points = sealPointsFor(prefix);
      if (count) count.textContent = `${points.length}개`;
      const clear = $(`${prefix}SealClearBtn`);
      if (clear) clear.disabled = !points.length;
      syncCutCloseApplyBtn($(`${prefix}SealApplyBtn`), prefix);
      if (pick) {
        const active = state.sealPlaceMode && sealPlaceChannel() === prefix;
        pick.classList.toggle('active-toggle', active);
        pick.setAttribute('aria-pressed', String(active));
        pick.textContent = active ? '찍기 끄기' : '미리보기에서 찍기';
        if (prefix === 'bg') {
          // v50.17 규약 — 조건이 안 맞아도 없애지 않고 비활성으로 두고 이유를 붙인다.
          pick.disabled = state.mode !== 'acrylic';
          pick.title = pick.disabled
            ? '입구 잠금은 코롯토/아크릴에서만 쓸 수 있습니다. 스티커·개체는 각자 회전과 배치를 따로 가져 같은 좌표 변환이 성립하지 않습니다.'
            : '';
        }
      }
      if (!list) continue;
      if (!points.length) {
        list.innerHTML = prefix === 'bg'
          ? '<p class="hole-list-empty">배경 지우기용 잠금 지점이 없습니다. <b>미리보기에서 찍기</b>로 배경이 새 들어오는 입구를 찍으세요.</p>'
          : '<p class="hole-list-empty">잠근 입구가 없습니다. <b>자동으로 찾기</b>로 후보를 보거나, <b>미리보기에서 찍기</b>로 직접 찍으세요.</p>';
        continue;
      }
      list.innerHTML = points.map((point, index) => {
        // bg 채널은 칼선을 만들지 않으므로 '닫았다/못 닫았다' 라는 되먹임이 없다.
        // 그림 안에 들어오는 지점만 벽으로 쓰인다는 사실만 알려 준다.
        const state1 = prefix === 'bg'
          ? '배경 지우기에서 벽으로 씀'
          : point.pending
          ? '적용 대기 — 칼선 다시 계산을 누르세요'
          : point.applied
          ? `약 ${point.gapMm} mm 입구를 닫음`
          : (point.gapMm === 0 ? '이미 메워진 자리' : '이 자리에서는 닫을 입구를 못 찾음');
        return `<div class="hole-list-item${point.applied ? ' active' : ''}">`
          + `<button type="button" class="hole-select-button" data-seal-focus="${point.id}">`
          + `<strong>${index + 1}. ${point.xMm.toFixed(1)}, ${point.yMm.toFixed(1)} mm</strong>`
          + `<span>${state1}</span></button>`
          + `<button type="button" class="hole-list-remove" data-seal-remove="${point.id}" aria-label="이 잠금 지점 지우기">×</button></div>`;
      }).join('');
    }
  }

  // 미리보기에 올가미를 그린다. 어디를 지웠는지 보이지 않으면 지운 자리를
  // 다시 찾을 수 없다. 그리는 중인 것은 점선, 적용된 것은 실선.
  function drawBgLassos(t) {
    if (state.mode !== 'acrylic') return;
    // 설정을 접거나 다른 탭으로 옮기면 올가미도 같이 사라진다. 그리기 도구가
    // 눈앞에 없는데 빨간 테두리만 미리보기에 남아 있으면 지금 뭘 만지는
    // 중인지 알 수 없다. 지운 자리는 상태 문구의 개수로 알려 준다.
    if (!bgPanelOnScreen()) return;
    const r = state.result; if (!r || !r.ppm) return;
    const list = state.bgLassos.map(l => ({ points: l.points, id: l.id }));
    if (bgLassoDraft) list.push({ points: bgLassoDraft.points, id: null });
    if (!list.length) return;
    const ctx = els.canvas.getContext('2d');
    ctx.save();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    for (let i = 0; i < list.length; i++) {
      const pts = list[i].points; if (pts.length < 2) continue;
      const drafting = !!bgLassoDraft && i === list.length - 1;
      // 고른 올가미는 굵고 진하게. 어느 것을 옮기거나 지우는지 보이지 않으면
      // 겹쳐 그린 올가미 중 무엇이 잡혔는지 알 길이 없다.
      const picked = !drafting && list[i].id && list[i].id === bgLassoSelectedId;
      ctx.lineWidth = Math.max(1, (picked ? 2.6 : 1.4) * dpr);
      ctx.setLineDash(drafting ? [6, 4] : []);
      ctx.strokeStyle = drafting ? 'rgba(220,80,60,.95)' : (picked ? 'rgba(220,60,40,1)' : 'rgba(220,80,60,.65)');
      ctx.fillStyle = picked ? 'rgba(220,80,60,.26)' : 'rgba(220,80,60,.12)';
      ctx.beginPath();
      for (let k = 0; k < pts.length; k++) {
        const x = t.x + pts[k].xMm * r.ppm * t.scale, y = t.y + pts[k].yMm * r.ppm * t.scale;
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      if (!drafting) { ctx.closePath(); ctx.fill(); }
      ctx.stroke();
    }
    ctx.restore();
  }

  // 미리보기에 잠금 지점을 그린다. 목록의 좌표만으로는 어디인지 알 수 없다.
  function drawSealPoints(t) {
    const mode = sealModeForCurrent();
    // 그 블록이 화면에 없으면 표시도 지운다 (v102 · 올가미와 같은 규칙).
    if (mode && sealBlockOnScreen(mode)) drawSealChannel(t, sealPointsFor(mode), false);
    // 배경 지우기 전용 지점은 그 설정이 화면에 떠 있는 동안에만 보여 준다.
    // 칼선용과 색을 달리해 어느 목록의 지점인지 한눈에 구분되게 한다.
    if (state.mode === 'acrylic' && bgPanelOnScreen()) drawSealChannel(t, sealPointsFor('bg'), true);
  }

  function drawSealChannel(t, points, isBg) {
    const r = state.result;
    if (!points.length || !r) return;
    const dpr = window.devicePixelRatio || 1;
    points.forEach((point, index) => {
      const px = point.xMm * r.ppm + (r.pad || 0), py = point.yMm * r.ppm + (r.pad || 0);
      const cx = t.x + px * t.scale, cy = t.y + py * t.scale, radius = 7 * dpr;
      ctx.save();
      ctx.lineWidth = Math.max(1.6, 1.4 * dpr);
      // 아직 계산을 안 지난 지점은 **점선**으로 그린다 (v105). 실선 주황은
      // "닫을 입구를 못 찾았다" 는 뜻이라, 아직 찾아본 적도 없는 지점에 그
      // 색을 쓰면 거짓말이 된다. 올가미의 "그리는 중" 과 같은 언어다.
      const waiting = !isBg && point.pending;
      ctx.setLineDash(waiting ? [4 * dpr, 3 * dpr] : []);
      ctx.strokeStyle = isBg ? '#3f6fd8' : waiting ? '#7a6a55' : point.applied ? '#1f9d63' : '#c2542b';
      ctx.fillStyle = isBg ? 'rgba(63,111,216,.16)' : waiting ? 'rgba(122,106,85,.14)'
        : point.applied ? 'rgba(31,157,99,.18)' : 'rgba(194,84,43,.16)';
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.setLineDash([]);
      // 자물쇠 대신 가로줄 하나 — 작은 크기에서 글리프보다 잘 읽힌다.
      ctx.beginPath(); ctx.moveTo(cx - radius * .5, cy); ctx.lineTo(cx + radius * .5, cy); ctx.stroke();
      ctx.font = `${11 * (dpr > 1 ? 1 : 1)}px system-ui`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillStyle = isBg ? '#2c53a8' : waiting ? '#6b5c48' : point.applied ? '#177a4d' : '#a3441f';
      ctx.fillText(`${index + 1}`, cx, cy - radius - 3 * dpr);
      ctx.restore();
    });
  }

  // 기준을 넘어 남아 있는 입구를 찾아 그대로 잠금 목록에 넣는다.
  // 지금 칼선에서 C 자 주머니를 찾아 잠금 목록에 넣는다. 넣은 개수를 돌려주고,
  // 찾은 것이 아예 없으면 null 을 준다. 버튼과 자동 닫기가 같이 쓴다.
  function collectOpenInlets(mode, gapMm) {
    const r = state.result;
    if (!r || !r.constraintMask) return null;
    const found = findOpenInlets(r.constraintMask, r.widthPx, r.heightPx, r.ppm, gapMm);
    if (!found.length) return null;
    const pad = r.pad || 0;
    let added = 0;
    for (const item of found) {
      const xMm = (item.x - pad) / r.ppm, yMm = (item.y - pad) / r.ppm;
      // 이미 가까이에 찍어 둔 지점이 있으면 겹쳐 넣지 않는다.
      if (sealPointsFor(mode).some(point => Math.hypot(point.xMm - xMm, point.yMm - yMm) < 1.2)) continue;
      addSealPoint(xMm, yMm, { gapMm: item.gapMm, channel: mode });
      added++;
    }
    return added;
  }

  // 불러올 때 칼선 입구를 자동으로 닫는다 (v111).
  //
  // 사용자: "기본적으로 자동 닫힘이 들어가 있기는 했으면 좋겠어 우리가 따로
  //          설정해서 넣지 않더라도."
  //
  // 여태 자동으로 닫아 주던 것은 "좁은 홈 자동 연결"(기준 mm) 하나였는데,
  // **무테에서는 그 기본값이 0** 이다 — 무테는 칼선이 실루엣에 딱 붙어서
  // 기준을 올리면 일부러 벌려 둔 홈까지 메워지기 때문이다. 그래서 무테에서는
  // 아무것도 안 닫혔고, 미리보기가 축소돼 보이는 탓에 닫힌 것처럼 보였다.
  //
  // 대신 v101 의 C 자 주머니 찾기를 쓴다. 입구보다 안이 넓은 주머니만 고르고,
  // 안으로 갈수록 좁아지기만 하는 홈(<)은 건드리지 않는다. 느린 계산이라
  // **그림을 새로 불러올 때 한 번만** 돈다.
  async function autoCloseInletsOnLoad(mode) {
    if (!els.autoSealOnLoad || !els.autoSealOnLoad.checked) return 0;
    const r = state.result;
    if (!r || !r.constraintMask) return 0;
    const gapMm = mode === 'acrylic'
      ? clamp(num(state.finishStyle.acrylic === 'bordered' ? els.acrylicNarrowGapMm : els.acrylicBorderlessNarrowGapMm, 0), 0, 20)
      : clamp(num(state.finishStyle.sticker === 'bordered' ? els.stickerNarrowGapMm : els.stickerBorderlessNarrowGapMm, 0), 0, 20);
    let added = 0;
    try { added = collectOpenInlets(mode, gapMm) || 0; }
    catch (error) { console.warn('입구 자동 닫기를 건너뜁니다.', error); return 0; }
    if (!added) return 0;
    await regenerateForSeal();
    return added;
  }

  async function scanOpenInlets() {
    const mode = sealModeForCurrent();
    const r = state.result;
    if (!mode || !r) { setNotice('warn', '먼저 칼선을 만들어 주세요', '이미지를 넣고 칼선이 계산된 뒤에 입구를 찾을 수 있습니다.'); return; }
    const mask = r.constraintMask;
    if (!mask) { setNotice('warn', '칼선 정보를 찾지 못했습니다', '칼선을 다시 만든 뒤 시도해 주세요.'); return; }
    try {
      setBusy(true);
      await new Promise(resolve => requestAnimationFrame(resolve));
      const gapMm = mode === 'acrylic'
        ? clamp(num(state.finishStyle.acrylic === 'bordered' ? els.acrylicNarrowGapMm : els.acrylicBorderlessNarrowGapMm, 0), 0, 20)
        : clamp(num(state.finishStyle.sticker === 'bordered' ? els.stickerNarrowGapMm : els.stickerBorderlessNarrowGapMm, 0), 0, 20);
      const added = collectOpenInlets(mode, gapMm);
      if (added === null) {
        setNotice('good', '닫을 입구가 없습니다', `지금 설정(${gapMm} mm)으로 이미 다 닫혀 있거나, 입구가 좁고 안이 넓은 C 자 주머니가 없습니다. 안으로 갈수록 좁아지기만 하는 홈은 입구가 아니라 모양이라 건너뜁니다.`);
        return;
      }
      setNotice('info', `입구 ${added}곳을 잠금 목록에 넣었습니다`,
        'C 자 주머니만 골랐습니다. 필요 없는 곳은 × 로 빼고, <b>칼선 다시 계산</b>을 눌러 반영하세요.');
      markCutCloseDirty();
    } catch (error) {
      console.error(error);
      setNotice('bad', '입구를 찾지 못했습니다', error?.message || '');
    } finally {
      setBusy(false);
    }
  }

  function toggleSealPlaceMode(channel) {
    const target = channel === 'bg' ? 'bg' : sealModeForCurrent();
    if (!target) return;
    if (target === 'bg' && state.mode !== 'acrylic') return;
    // 다른 채널이 켜져 있었으면 그쪽을 끄고 이쪽으로 넘긴다. 둘 다 켜 두면
    // 미리보기를 눌렀을 때 어느 목록으로 들어가는지 알 수 없다.
    const switching = state.sealPlaceMode && state.sealPlaceChannel !== target;
    state.sealPlaceMode = switching ? true : !state.sealPlaceMode;
    state.sealPlaceChannel = state.sealPlaceMode ? target : null;
    if (state.sealPlaceMode && state.bgLassoMode) { state.bgLassoMode = false; updateBgLassoUi(); }
    els.canvas.style.cursor = state.sealPlaceMode ? 'crosshair' : '';
    updateSealUi();
    drawPreview();
    if (state.sealPlaceMode) {
      setNotice('info', '미리보기를 눌러 입구를 찍으세요', target === 'bg'
        ? '배경이 안쪽으로 새 들어오는 입구를 누르면 그 자리를 벽으로 막습니다. 이 지점은 배경 지우기에만 쓰입니다.'
        : '닫고 싶은 홈의 입구 쪽을 누르면 그 자리에 필요한 만큼만 칼선을 이어 붙입니다.');
    }
  }

  for (const prefix of ['acrylic', 'sticker']) {
    $(`${prefix}SealApplyBtn`)?.addEventListener('click', applyCutClose);
    $(`${prefix}BridgeApplyBtn`)?.addEventListener('click', applyCutClose);
  }
  for (const prefix of ['acrylic', 'sticker', 'bg']) {
    $(`${prefix}SealScanBtn`)?.addEventListener('click', scanOpenInlets);
    $(`${prefix}SealPickBtn`)?.addEventListener('click', () => toggleSealPlaceMode(prefix));
    $(`${prefix}SealList`)?.addEventListener('click', async event => {
      const channel = prefix === 'bg' ? 'bg' : sealModeForCurrent();
      const remove = event.target.closest('[data-seal-remove]');
      if (remove) {
        removeSealPoint(remove.dataset.sealRemove, channel);
        if (channel === 'bg') { updateSealUi(); syncBgSheet(); await runBgPreview(); }
        else markCutCloseDirty();
        return;
      }
      const focus = event.target.closest('[data-seal-focus]');
      if (focus) {
        const point = sealPointsFor(channel).find(v => v.id === focus.dataset.sealFocus);
        if (!point) return;
        if (channel === 'bg') {
          setNotice('info', `${point.xMm.toFixed(1)}, ${point.yMm.toFixed(1)} mm`,
            '배경 지우기에서 벽으로 쓰는 지점입니다. 칼선에는 영향을 주지 않습니다.');
        } else {
          setNotice('info', `${point.xMm.toFixed(1)}, ${point.yMm.toFixed(1)} mm`,
            point.applied ? `약 ${point.gapMm} mm 짜리 입구를 닫고 있습니다.` : '이 자리에서는 닫을 입구를 찾지 못했습니다. 입구 쪽으로 조금 옮겨 다시 찍어 보세요.');
        }
      }
    });
  }
  // 칼선 채널 모두 지우기. 자동으로 찾기가 한 번에 여러 곳을 넣으므로
  // 하나씩 × 를 누르게 두면 되돌리기가 고역이다. 실행취소로도 되돌아간다
  // (regenerateForSeal 이 checkpointHistory 를 남긴다).
  for (const prefix of ['acrylic', 'sticker']) {
    $(`${prefix}SealClearBtn`)?.addEventListener('click', async () => {
      const channel = sealModeForCurrent();
      if (!channel || !sealPointsFor(channel).length) return;
      const gone = sealPointsFor(channel).length;
      state.sealPoints[channel] = [];
      setNotice('info', `잠금 지점 ${gone}곳을 지웠습니다`, '<b>칼선 다시 계산</b>을 눌러야 화면에 반영됩니다.');
      markCutCloseDirty();
    });
  }
  $('bgSealClearBtn')?.addEventListener('click', async () => {
    if (!sealPointsFor('bg').length) return;
    state.sealPoints.bg = [];
    updateSealUi(); syncBgSheet();
    await runBgPreview();
  });
  updateSealUi();

  // ══════════════════════════════════════════════════════════════════
  // 두 지점 닫기 — 상태 · 목록 · 미리보기에서 두 번 찍기 (v76)
  //
  // 입구 잠금과 좌표계·저장 방식은 같다(대지 mm). 다른 점은 지점을 둘씩
  // 짝지어 쓴다는 것뿐이라, 찍는 중인 첫 점을 따로 들고 있는다.
  // ══════════════════════════════════════════════════════════════════
  if (!state.cutBridges) state.cutBridges = { acrylic: [], sticker: [] };
  state.bridgePlaceMode = false;
  state.bridgePending = null;
  const bridgeFeedback = { acrylic: [], sticker: [] };

  function cutBridgesFor(mode) {
    if (!state.cutBridges[mode]) state.cutBridges[mode] = [];
    return state.cutBridges[mode];
  }
  function recordBridgeFeedback(mode, applied) {
    bridgeFeedback[mode] = applied || [];
    for (const bridge of cutBridgesFor(mode)) {
      const hit = bridgeFeedback[mode].find(v => v.id === bridge.id);
      bridge.added = hit ? hit.added : 0;
      bridge.spanMm = hit && hit.spanMm != null ? hit.spanMm : null;
      bridge.error = hit ? hit.error || null : null;
      bridge.pending = false;
    }
  }
  function bridgeFeedbackLabel(mode) {
    const count = (bridgeFeedback[mode] || []).filter(v => v.added > 0).length;
    return count ? ` · 두 지점 닫기 ${count}곳` : '';
  }
  const BRIDGE_ERRORS = {
    far: '칼선에서 너무 멀리 찍었습니다 (4mm 안쪽을 눌러 주세요)',
    split: '두 점이 서로 다른 칼선 위에 있습니다',
    same: '두 점이 너무 가깝습니다',
    nocontour: '칼선을 찾지 못했습니다'
  };

  function removeCutBridge(id, mode) {
    const target = mode || sealModeForCurrent();
    if (!target) return;
    state.cutBridges[target] = cutBridgesFor(target).filter(b => b.id !== id);
  }

  function updateBridgeUi() {
    for (const prefix of ['acrylic', 'sticker']) {
      const list = $(`${prefix}BridgeList`), count = $(`${prefix}BridgeCount`), pick = $(`${prefix}BridgePickBtn`);
      const bridges = cutBridgesFor(prefix);
      if (count) count.textContent = `${bridges.length}개`;
      if (pick) {
        const active = state.bridgePlaceMode && sealModeForCurrent() === prefix;
        pick.classList.toggle('active-toggle', active);
        pick.setAttribute('aria-pressed', String(active));
        pick.textContent = active
          ? (state.bridgePending ? '두 번째 점을 찍으세요 (취소하려면 다시 누르기)' : '찍기 끄기')
          : '미리보기에서 두 점 찍기';
      }
      syncCutCloseApplyBtn($(`${prefix}BridgeApplyBtn`), prefix);
      if (!list) continue;
      if (!bridges.length) {
        list.innerHTML = '<p class="hole-list-empty">닫은 곳이 없습니다. <b>미리보기에서 두 점 찍기</b>로 입구의 양쪽 입술을 차례로 누르세요.</p>';
        continue;
      }
      list.innerHTML = bridges.map((bridge, index) => {
        const detail = bridge.pending
          ? '적용 대기 — 칼선 다시 계산을 누르세요'
          : bridge.error
          ? (BRIDGE_ERRORS[bridge.error] || '닫지 못했습니다')
          : bridge.added
          ? `약 ${(bridge.spanMm ?? 0).toFixed(1)} mm 를 곡선으로 이음`
          : '이미 메워져 있는 자리';
        return `<div class="hole-list-item${bridge.added ? ' active' : ''}">`
          + `<button type="button" class="hole-select-button" data-bridge-focus="${bridge.id}">`
          + `<strong>${index + 1}. ${bridge.a.xMm.toFixed(1)}, ${bridge.a.yMm.toFixed(1)} → ${bridge.b.xMm.toFixed(1)}, ${bridge.b.yMm.toFixed(1)} mm</strong>`
          + `<span>${detail}</span></button>`
          + `<button type="button" class="hole-list-remove" data-bridge-remove="${bridge.id}" aria-label="이 연결 지우기">×</button></div>`;
      }).join('');
    }
  }

  // 미리보기에는 이은 두 점과 그 사이를 점선으로 그린다. 실제 곡선은 칼선
  // 자체가 바뀌어 그대로 보이므로, 여기서는 "이 둘이 짝" 이라는 것만 알린다.
  function drawCutBridges(t) {
    const mode = sealModeForCurrent();
    if (!mode) return;
    const r = state.result;
    if (!r) return;
    const dpr = window.devicePixelRatio || 1;
    const toCanvas = pt => ({
      x: t.x + (pt.xMm * r.ppm + (r.pad || 0)) * t.scale,
      y: t.y + (pt.yMm * r.ppm + (r.pad || 0)) * t.scale
    });
    const list = cutBridgesFor(mode).slice();
    ctx.save();
    list.forEach((bridge, index) => {
      const A = toCanvas(bridge.a), B = toCanvas(bridge.b);
      const good = bridge.added > 0;
      ctx.lineWidth = Math.max(1.6, 1.4 * dpr);
      ctx.setLineDash([5 * dpr, 4 * dpr]);
      ctx.strokeStyle = good ? '#7a49c9' : '#c2542b';
      ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
      ctx.setLineDash([]);
      for (const P of [A, B]) {
        ctx.fillStyle = good ? 'rgba(122,73,201,.18)' : 'rgba(194,84,43,.16)';
        ctx.beginPath(); ctx.arc(P.x, P.y, 6 * dpr, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      ctx.font = `${11}px system-ui`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillStyle = good ? '#5c34a0' : '#a3441f';
      ctx.fillText(`${index + 1}`, (A.x + B.x) / 2, (A.y + B.y) / 2 - 8 * dpr);
    });
    if (state.bridgePending) {
      const P = toCanvas(state.bridgePending);
      ctx.setLineDash([3 * dpr, 3 * dpr]);
      ctx.strokeStyle = '#7a49c9';
      ctx.fillStyle = 'rgba(122,73,201,.25)';
      ctx.beginPath(); ctx.arc(P.x, P.y, 7 * dpr, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  }

  function toggleBridgePlaceMode() {
    if (!sealModeForCurrent()) return;
    state.bridgePlaceMode = !state.bridgePlaceMode;
    state.bridgePending = null;
    // 두 찍기 모드가 같이 켜져 있으면 미리보기 탭이 어디로 가는지 알 수 없다.
    if (state.bridgePlaceMode && state.sealPlaceMode) {
      state.sealPlaceMode = false; state.sealPlaceChannel = null; updateSealUi();
    }
    if (state.bridgePlaceMode && state.bgLassoMode) { state.bgLassoMode = false; updateBgLassoUi(); }
    els.canvas.style.cursor = state.bridgePlaceMode ? 'crosshair' : '';
    updateBridgeUi();
    drawPreview();
    if (state.bridgePlaceMode) {
      setNotice('info', '입구의 양쪽 입술을 차례로 누르세요',
        '첫 점을 누르고 두 번째 점을 누르면 그 사이가 곡선으로 이어집니다. 칼선에서 4mm 안쪽을 눌러 주세요.');
    }
  }

  function addCutBridgePoint(xMm, yMm) {
    const mode = sealModeForCurrent();
    if (!mode) return;
    if (!state.bridgePending) {
      state.bridgePending = { xMm: +xMm.toFixed(2), yMm: +yMm.toFixed(2) };
      updateBridgeUi();
      drawPreview();
      setNotice('info', '첫 점을 찍었습니다', '이어 붙일 반대쪽 입술을 눌러 주세요.');
      return;
    }
    const a = state.bridgePending;
    state.bridgePending = null;
    cutBridgesFor(mode).push({ id: uid(), a, b: { xMm: +xMm.toFixed(2), yMm: +yMm.toFixed(2) },
                               added: 0, spanMm: null, error: null, pending: true });
    markCutCloseDirty();   // 입구 잠금과 같은 깃발을 쓴다 — 한 번에 같이 반영된다
  }

  for (const prefix of ['acrylic', 'sticker']) {
    $(`${prefix}BridgePickBtn`)?.addEventListener('click', toggleBridgePlaceMode);
    $(`${prefix}BridgeList`)?.addEventListener('click', async event => {
      const remove = event.target.closest('[data-bridge-remove]');
      if (remove) { removeCutBridge(remove.dataset.bridgeRemove, prefix); markCutCloseDirty(); return; }
      const focus = event.target.closest('[data-bridge-focus]');
      if (focus) {
        const bridge = cutBridgesFor(prefix).find(v => v.id === focus.dataset.bridgeFocus);
        if (!bridge) return;
        setNotice('info', `${bridge.a.xMm.toFixed(1)}, ${bridge.a.yMm.toFixed(1)} → ${bridge.b.xMm.toFixed(1)}, ${bridge.b.yMm.toFixed(1)} mm`,
          bridge.error ? (BRIDGE_ERRORS[bridge.error] || '닫지 못했습니다')
            : bridge.added ? `약 ${(bridge.spanMm ?? 0).toFixed(1)} mm 를 곡선으로 이었습니다.`
            : '이 자리는 이미 메워져 있습니다.');
      }
    });
  }
  updateBridgeUi();

  // ══════════════════════════════════════════════════════════════════
  // 사진 배경 자동 투명화 (v63)
  //
  // 계산은 background-removal.js 가 전부 한다(DOM 없는 순수 함수라
  // Node 에서 수치로 검사한다). 여기서는 그 함수에 넣을 픽셀을 꺼내고,
  // 결과를 다시 이미지 레코드에 돌려놓고, 원본을 보관하는 일만 한다.
  //
  // 세 모드가 모두 같은 모양의 레코드(img · dataUrl · naturalWidth ·
  // naturalHeight · trimCache)를 쓰기 때문에 한 함수로 셋 다 처리된다.
  // 스티커와 개체는 그 레코드를 그대로 펼쳐 담고 있고, 아크릴은
  // state.source 가 곧 레코드다.
  // ══════════════════════════════════════════════════════════════════
  const BG_SETTINGS_KEY = 'goodsmaker.bgRemove';
  const BG_MAX_PIXELS = 24e6;   // 이보다 큰 사진은 계산이 폰에서 너무 오래 걸린다
  const bgUi = {
    panel: $('bgRemovePanel'), doneBtn: $('bgRemoveDoneBtn'),
    target: $('bgRemoveTarget'), detected: $('bgRemoveDetected'), sealNote: $('bgRemoveSealNote'),
    edge: $('bgRemoveEdgePercent'), tol: $('bgRemoveTolerance'), gap: $('bgRemoveGapClose'),
    unmix: $('bgRemoveUnmix'), feather: $('bgRemoveFeather'),
    lassoTol: $('bgLassoTolerance'), lassoInsideOnly: $('bgLassoInsideOnly'),
    edgeTrim: $('bgRemoveEdgeTrim'), silhouettePx: $('bgRemoveSilhouettePx'),
    haloTrim: $('bgRemoveHaloTrim'), protectInside: $('bgRemoveProtectInside'),
    detectBtn: $('bgRemoveDetectBtn'), restoreBtn: $('bgRemoveRestoreSheetBtn'),
    result: $('bgRemoveResult')
  };
  // 배경 투명 모드: 어느 블록에서 열렸는지, 그리고 값이 바뀐 뒤 0.5초를 세는 타이머.
  let bgModePrefix = null;
  let bgPreviewTimer = 0;
  let bgPreviewRunning = false;
  let bgPreviewQueued = false;
  let bgTouchedInMode = false;
  const BG_PREVIEW_DELAY = 500;
  const BG_DEFAULTS = { edgePercent: 6, tolerance: 24, gapClosePx: 0, unmix: true, featherPx: 2, lassoTolerance: 24, lassoInsideOnly: false, edgeTrim: 30, silhouetteMinPx: 6, haloTrimPx: 1, protectInsidePx: 3 };

  function readBgSettings() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(BG_SETTINGS_KEY) || 'null'); } catch (e) { /* 무시 */ }
    return Object.assign({}, BG_DEFAULTS, saved && typeof saved === 'object' ? saved : {});
  }
  function currentBgSettings() {
    return {
      edgePercent: clamp(num(bgUi.edge, 6), 1, 25),
      tolerance: clamp(num(bgUi.tol, 24), 0, 100),
      gapClosePx: clamp(num(bgUi.gap, 0), 0, 40),
      unmix: !!bgUi.unmix?.checked,
      featherPx: clamp(num(bgUi.feather, 2), 1, 16),
      // 올가미는 사람이 이미 범위를 좁혀 준 자리라 배경 찾기와 같은 값을 쓸 이유가
      // 없다. 배경색 검출에는 안 쓰이고 eraseWithLassos 로만 간다.
      lassoTolerance: clamp(num(bgUi.lassoTol, 24), 0, 100),
      // 자동 판정을 건너뛰고 올가미 선 안쪽을 전부 지운다 (v103).
      lassoInsideOnly: !!bgUi.lassoInsideOnly?.checked,
      edgeTrim: clamp(num(bgUi.edgeTrim, 30), 0, 100),
      silhouetteMinPx: clamp(num(bgUi.silhouettePx, 6), 0, 40),
      // 0 이면 끄기. 숫자는 "본체에서 이만큼까지는 번짐을 남긴다" 는 뜻이라
      // 작을수록 바짝 자른다. 사진처럼 진짜로 부드러운 가장자리는 크게.
      haloTrimPx: clamp(num(bgUi.haloTrim, 1), 0, 6),
      // 외곽선의 틈을 이 반경으로 막아, 그 안쪽으로 새 들어간 배경을 되돌린다.
      // 키우면 가까이 붙은 두 획 사이가 막혀 그 사이까지 안쪽으로 본다.
      protectInsidePx: clamp(num(bgUi.protectInside, 3), 0, 12)
    };
  }
  function persistBgSettings() {
    try { localStorage.setItem(BG_SETTINGS_KEY, JSON.stringify(currentBgSettings())); } catch (e) { /* 무시 */ }
  }

  // 어떤 이미지에 적용할지. 고른 것이 있으면 그것만, 없으면 전부.
  // 이미지를 넣으면 마지막 것이 자동으로 선택되므로, "고른 것만" 을 기본으로
  // 두면 다섯 장을 넣어도 한 장만 처리된다. 기본은 전체, 필요하면 켜서 좁힌다.
  function bgSelectedOnly() { return !!$('bgRemoveSelectedOnly')?.checked; }
  function bgTargets() {
    if (state.mode === 'acrylic') return state.source ? [state.source] : [];
    if (state.mode === 'sticker') {
      if (!bgSelectedOnly()) return state.stickers.slice();
      const ids = new Set(state.selectedStickerIds?.length ? state.selectedStickerIds : (state.selectedId ? [state.selectedId] : []));
      return ids.size ? state.stickers.filter(s => ids.has(s.id)) : state.stickers.slice();
    }
    const images = state.makerItems.filter(item => makerObjectType(item) === 'image');
    if (!bgSelectedOnly()) return images;
    const ids = new Set(state.makerSelectedIds?.length ? state.makerSelectedIds : (state.makerSelectedId ? [state.makerSelectedId] : []));
    return ids.size ? images.filter(item => ids.has(item.id)) : images;
  }
  function bgTargetLabel() {
    const list = bgTargets();
    if (!list.length) return '대상 이미지가 없습니다';
    if (state.mode === 'acrylic') return `코롯토 / 아크릴 원본 이미지 1장`;
    return `${state.mode === 'sticker' ? '스티커' : '개체 이미지'} ${list.length}장${bgSelectedOnly() ? ' (고른 것만)' : ' (전체)'}`;
  }

  function recordPixels(record) {
    const w = Math.max(1, record.naturalWidth || record.img?.naturalWidth || 0);
    const h = Math.max(1, record.naturalHeight || record.img?.naturalHeight || 0);
    const canvas = makeCanvas(w, h), ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(record.img, 0, 0, w, h);
    return { canvas, ctx, w, h, imageData: ctx.getImageData(0, 0, w, h) };
  }

  async function writeBackRecord(record, data, w, h) {
    const canvas = makeCanvas(w, h), ctx = canvas.getContext('2d');
    const out = ctx.createImageData(w, h);
    out.data.set(data);
    ctx.putImageData(out, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    const img = await loadImage(dataUrl);
    // 원본은 딱 한 번만 챙겨 둔다. 두 번째 적용에서 덮어쓰면 되돌릴 곳이 사라진다.
    if (!record.bgOriginal) {
      record.bgOriginal = { dataUrl: record.dataUrl, naturalWidth: record.naturalWidth, naturalHeight: record.naturalHeight };
    }
    record.img = img;
    record.dataUrl = dataUrl;
    record.naturalWidth = w;
    record.naturalHeight = h;
    record.trimCache = Object.create(null);   // 알파가 바뀌었으니 잘라내기 캐시는 버린다
  }

  async function restoreRecord(record) {
    if (!record.bgOriginal) return false;
    const img = await loadImage(record.bgOriginal.dataUrl);
    record.img = img;
    record.dataUrl = record.bgOriginal.dataUrl;
    record.naturalWidth = record.bgOriginal.naturalWidth;
    record.naturalHeight = record.bgOriginal.naturalHeight;
    record.trimCache = Object.create(null);
    delete record.bgOriginal;
    return true;
  }

  // 실시간 미리보기는 값이 바뀔 때마다 다시 계산한다. 그런데 recordPixels 는
  // "지금" 이미지를 읽으므로, 이미 한 번 지운 그림 위에 또 지우게 되어 결과가
  // 누적된다(관용도를 낮춰도 되돌아오지 않는다). 원본이 보관돼 있으면 언제나
  // 그것을 바닥으로 삼는다.
  async function recordBasePixels(record) {
    if (!record.bgOriginal) return recordPixels(record);
    const w = Math.max(1, record.bgOriginal.naturalWidth || 0);
    const h = Math.max(1, record.bgOriginal.naturalHeight || 0);
    const img = await loadImage(record.bgOriginal.dataUrl);
    const canvas = makeCanvas(w, h), ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    return { canvas, ctx, w, h, imageData: ctx.getImageData(0, 0, w, h) };
  }

  // ══════════════════════════════════════════════════════════════════
  // 올가미로 남은 배경 지우기
  //
  // 틈 닫기를 넓게 잡으면 바깥과 이어지지 않은 자리까지 "안쪽" 으로 판정돼
  // 배경색이 남는다. 그 자리를 올가미로 감싸면 안에서 배경색과 비슷한 픽셀만
  // 지운다(그림은 건드리지 않는다).
  //
  // 올가미는 대지 좌표(mm)로 모은다. 입구 잠금 지점과 같은 좌표계라
  // boardPointFromEvent 와 artworkPlacement 변환을 그대로 쓸 수 있고,
  // 배경 지우기를 다시 돌려도 살아남는다 — 지운 결과를 이미지에 굽는 것이
  // 아니라, 배경 제거 파이프라인의 마지막 단계로 매번 다시 적용하기 때문이다.
  // ══════════════════════════════════════════════════════════════════
  if (!Array.isArray(state.bgLassos)) state.bgLassos = [];
  state.bgLassoMode = false;
  let bgLassoDraft = null;
  // v89 — 그리기를 끈 상태에서 고른 올가미. 옮기거나 지울 수 있다.
  // 화면에서만 쓰는 값이라 저장·되돌리기에는 넣지 않는다(모드를 접으면 사라진다).
  let bgLassoSelectedId = null;
  // 올가미는 만들자마자 적용하지 않는다. 큰 그림에서는 한 획마다 몇 초가 걸려
  // "그리는 중" 이라는 개념이 성립하지 않았다. 바뀐 것이 있으면 여기에 표시해
  // 두고, "올가미 적용" 을 눌렀을 때 한 번에 계산한다.
  let bgLassoDirty = false;
  function bgLassoById(id) { return state.bgLassos.find(l => l.id === id) || null; }
  // 미리보기 좌표(mm)로 올가미를 찍는다. 나중에 그린 것이 위에 있으므로 뒤에서부터.
  function hitBgLasso(xMm, yMm) {
    for (let i = state.bgLassos.length - 1; i >= 0; i--) {
      const pts = state.bgLassos[i].points;
      if (!pts || pts.length < 3) continue;
      let inside = false;
      for (let a = 0, b = pts.length - 1; a < pts.length; b = a++) {
        const xi = pts[a].xMm, yi = pts[a].yMm, xj = pts[b].xMm, yj = pts[b].yMm;
        if ((yi > yMm) !== (yj > yMm) && xMm < (xj - xi) * (yMm - yi) / (yj - yi) + xi) inside = !inside;
      }
      if (inside) return state.bgLassos[i];
    }
    return null;
  }

  function bgLassoPolygonsForRecord(record) {
    // 지금은 코롯토/아크릴 원본 한 장만 다룬다. 입구 잠금과 같은 제약이다
    // (artworkPlacement 가 그 한 장에 대해서만 있다).
    if (state.mode !== 'acrylic' || record !== state.source) return [];
    const r = state.result, place = r?.artworkPlacement;
    if (!place || !r.ppm) return [];
    const scaleX = place.sw / place.drawW, scaleY = place.sh / place.drawH;
    const out = [];
    for (const lasso of state.bgLassos) {
      if (!lasso?.points || lasso.points.length < 3) continue;
      out.push(lasso.points.map(pt => ({
        x: place.sx + (pt.xMm * r.ppm - place.dx) * scaleX,
        y: place.sy + (pt.yMm * r.ppm - place.dy) * scaleY
      })));
    }
    return out;
  }

  // 원본 이미지에서 1mm 가 몇 픽셀인가. 목 끊기 상한을 해상도와 무관하게
  // mm 로 정하려면 이 값이 필요하다 (498ppi 도안은 1mm 가 20px 쯤 된다).
  function lassoPxPerMm(record) {
    if (state.mode !== 'acrylic' || record !== state.source) return 0;
    const r = state.result, place = r?.artworkPlacement;
    if (!place || !r.ppm || !place.drawW) return 0;
    return r.ppm * (place.sw / place.drawW);
  }

  function pointInPolygon(x, y, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  // ══════════════════════════════════════════════════════════════════
  // 올가미로 남은 배경 지우기 (v73 → v76 에서 덩어리 단위로)
  //
  // v73 은 올가미 안에 든 픽셀 하나하나를 배경색과 견줘 지웠다. 그러면 올가미
  // 선에 걸친 배경 덩어리가 선을 따라 **싹둑 잘린다** — 남은 조각의 경계가
  // 올가미 모양 그대로라 티가 난다. 손으로 그린 선이 그림의 경계와 맞을 리가
  // 없으니 당연한 결과다.
  //
  // 그래서 픽셀이 아니라 **덩어리**를 본다. 배경색과 비슷한 픽셀을 이어 붙여
  // 덩어리로 묶고, 올가미에 걸친 덩어리마다 이렇게 판단한다.
  //
  //   ① 올가미 안쪽은 무조건 지운다.
  //   ② 올가미 밖으로 삐져나온 부분은 **돌출부마다 따로** 본다.
  //      (여러 갈래로 삐져나왔으면 갈래마다 각각 판단한다. 갈래끼리는
  //       올가미 안쪽을 통해서만 이어져 있으므로 밖에서는 서로 남남이다.)
  //   ③ 그 돌출부가 안쪽 몫의 절반 이하로 작으면 — 즉 그 덩어리가
  //      "대부분 올가미 안에 있다" 면 — 돌출부까지 통째로 지운다.
  //      절반보다 크면 안쪽만 지우고 돌출부는 둔다. 그건 사용자가 감싸려 한
  //      것이 아니라 올가미가 스친 다른 영역으로 본다.
  //
  //   판정 기준을 절반으로 잡은 이유: "대부분이 안에 있다" 를 글자 그대로
  //   옮기면 안쪽 > 바깥이고, 돌출부가 여럿일 때 각 갈래에 같은 잣대를
  //   적용하려면 갈래마다 안쪽 몫과 견주는 것이 자연스럽다.
  // ══════════════════════════════════════════════════════════════════
  const LASSO_SPILL_RATIO = 0.5;

  // 올가미 안쪽 픽셀 마스크. 기준색을 올가미 안에서 뽑을 때 쓴다.
  function lassoMask(w, h, polygons) {
    const mask = new Uint8Array(w * h);
    for (const poly of polygons) {
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const pt of poly) {
        if (pt.x < minX) minX = pt.x; if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y; if (pt.y > maxY) maxY = pt.y;
      }
      const x0 = Math.max(0, Math.floor(minX)), x1 = Math.min(w - 1, Math.ceil(maxX));
      const y0 = Math.max(0, Math.floor(minY)), y1 = Math.min(h - 1, Math.ceil(maxY));
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        const i = y * w + x;
        if (mask[i]) continue;
        if (pointInPolygon(x + .5, y + .5, poly)) mask[i] = 1;
      }
    }
    return mask;
  }

  // 올가미로 배경 걷어내기 (v90 — 기본 투명화와 **같은 파이프라인**으로)
  //
  // v89 까지 여기는 파이프라인이 아니라 문턱값 하나였다.
  //
  //     if (diff <= tol) data[i * 4 + 3] = 0;      // 끝
  //
  // 언믹싱도, 잡티 정리도, 구멍 되돌리기도 없었다. 그래서 흰 종이 위 흰
  // 채움처럼 색이 아슬아슬한 자리에서 어떤 픽셀은 문턱을 넘고 어떤 픽셀은
  // 안 넘어, 그림 속살에 **소금·후추 같은 구멍**이 흩뿌려졌다. 사용자가
  // 내보낸 그림·화이트 두 장에서 그대로 보였다.
  //
  // 사용자 지시: "배경색 찾기를 제외하고 배경색 걷어내는 프로세스는 기본
  // 투명화 로직과 똑같이 진행하면 돼. 안티앨리어스 보존/부슬부슬한 픽셀
  // 걷어내기/따로 떨어진 픽셀 정리가 모두 이루어져야 한다는 뜻이야."
  //
  // 그대로 한다. 이제 이 함수는 removeBackground 를 **씨앗 모드**로 한 번 더
  // 부르는 얇은 껍데기다. 다른 것은 물감통이 어디서 시작하느냐 하나뿐이다 —
  // 테두리가 아니라 올가미 안쪽. 언믹싱·잡티 정리·덩어리/구멍 정리·번짐
  // 잘라내기는 전부 같은 코드를 지난다.
  //
  // 딱 하나 끄는 것이 있다: 외곽선 안쪽 보호. 그 보호는 "그린 선이 감싼
  // 안쪽으로 새 들어간 것" 을 되돌리는데, 올가미는 애초에 그 안쪽에 손으로
  // 씨앗을 놓는 도구라 켜 두면 방금 지운 것을 그대로 되살린다(v88 의 사고).
  // removeBackground 가 씨앗 모드에서 알아서 끈다.
  function eraseWithLassos(data, w, h, polygons, color, tolerance, settings = {}) {
    const stat = { removed: 0, inside: 0, spill: 0, blobs: 0, keptSpills: 0,
                   unmixed: 0, trimmed: 0, holes: 0, neckCut: 0,
                   spillNeed: 0, spillNeedInside: 0 };
    if (!polygons.length || !color) return stat;
    const seedMask = lassoMask(w, h, polygons);
    let seeded = 0;
    for (let i = 0; i < seedMask.length; i++) if (seedMask[i]) seeded++;
    if (!seeded) return stat;

    const res = window.GoodsMakerBackground.removeBackground(data, w, h, {
      ...settings,
      backgroundColor: color,     // 기준색은 밖에서 정해 준다(자동 검출을 안 쓴다)
      tolerance,                  // 올가미 전용 관용도
      seedMask,
      spillRatio: LASSO_SPILL_RATIO,
      spillMaxPx: settings.lassoSpillMaxPx || 0,
      seedInsideOnly: !!settings.seedInsideOnly
    });
    // 지울 것이 하나도 안 남았어도 **왜** 그런지는 넘겨야 한다. 덩어리를 통째로
    // 놔둔 경우가 그렇다 — 잠자코 0 을 돌려주면 도구가 고장 난 것처럼 보인다.
    stat.keptSpills = res.spilledLobes || 0;
    stat.neckCut = res.neckCut || 0;
    stat.spillNeed = res.spillNeed || 0;
    stat.spillNeedInside = res.spillNeedInside || 0;
    if (!res.ok) return stat;

    let before = 0, after = 0;
    for (let i = 0; i < w * h; i++) {
      if (data[i * 4 + 3] > 0) before++;
      if (res.data[i * 4 + 3] > 0) after++;
    }
    data.set(res.data);
    stat.removed = Math.max(0, before - after);
    stat.inside = res.removedPixels;
    stat.unmixed = res.unmixedPixels || 0;
    stat.trimmed = (res.trimmedPixels || 0) + (res.silhouetteBlobPixels || 0) + (res.haloCleared || 0);
    stat.holes = res.silhouetteHolePixels || 0;
    return stat;
  }

  // 주머니를 그림 몸통에 이어 붙이는 "좁은 목" 을 끊을 최대 반경.
  // 0.35mm 까지 본다 — 사람이 그린 선이 끝나면서 생기는 틈은 그보다 작다.
  // 해상도를 모르면 4px 로 둔다(background-removal.js 의 기본값과 같다).
  // 올가미 밖으로 **조금만** 삐져나온 것은 비율과 무관하게 같이 지운다.
  // 지름 1.6mm 짜리 원 넓이를 "조금" 으로 본다 — 가닥 사이 자락은 이보다 작고,
  // 그림 채움은 훨씬 크다. 해상도를 모르면 0(끄기)으로 둔다.
  function lassoSpillMaxPx(record) {
    const pxPerMm = lassoPxPerMm(record);
    if (!(pxPerMm > 0)) return 0;
    const r = 0.8 * pxPerMm;
    return Math.round(Math.PI * r * r);
  }

  function lassoNeckMaxPx(record) {
    const pxPerMm = lassoPxPerMm(record);
    return pxPerMm > 0 ? Math.max(4, Math.round(0.35 * pxPerMm)) : 4;
  }

  function bgSealPointsFor(record) {
    const points = sealPointsForRecord(record);
    return points;
  }

  function setBgResult(kind, title, detail) {
    if (!bgUi.result) return;
    bgUi.result.className = `notice ${kind}`;
    bgUi.result.innerHTML = `<strong></strong><span></span>`;
    bgUi.result.querySelector('strong').textContent = title;
    bgUi.result.querySelector('span').textContent = detail || '';
  }

  function refreshBgBlocks() {
    const targets = bgTargets();
    const restorable = targets.some(record => !!record.bgOriginal);
    for (const prefix of ['acrylic', 'sticker', 'maker']) {
      const restore = $(`${prefix}BgRestoreBtn`), status = $(`${prefix}BgStatus`);
      if (restore) restore.disabled = !restorable;
      if (!status) continue;
      if (!targets.length) {
        status.textContent = state.mode === 'acrylic'
          ? '이미지를 먼저 넣어 주세요.'
          : '이미지를 먼저 넣어 주세요. 고른 것이 있으면 그것만 처리합니다.';
      } else if (restorable) {
        status.textContent = `배경을 지운 상태입니다. 원본으로 되돌릴 수 있습니다.`;
      } else {
        status.textContent = state.mode === 'acrylic'
          ? '단색 배경 사진이면 바깥 배경만 지워 투명하게 만듭니다.'
          : `${bgTargetLabel()} 에 적용합니다.`;
      }
    }
  }

  function syncBgSheet() {
    if (!bgUi.panel) return;
    const settings = readBgSettings();
    if (bgUi.edge) bgUi.edge.value = settings.edgePercent;
    if (bgUi.tol) bgUi.tol.value = settings.tolerance;
    if (bgUi.gap) bgUi.gap.value = settings.gapClosePx;
    if (bgUi.unmix) bgUi.unmix.checked = settings.unmix !== false;
    if (bgUi.feather) bgUi.feather.value = settings.featherPx;
    if (bgUi.lassoTol) bgUi.lassoTol.value = settings.lassoTolerance;
    if (bgUi.lassoInsideOnly) bgUi.lassoInsideOnly.checked = !!settings.lassoInsideOnly;
    if (bgUi.edgeTrim) bgUi.edgeTrim.value = settings.edgeTrim;
    if (bgUi.silhouettePx) bgUi.silhouettePx.value = settings.silhouetteMinPx;
    if (bgUi.haloTrim) bgUi.haloTrim.value = settings.haloTrimPx;
    if (bgUi.protectInside) bgUi.protectInside.value = settings.protectInsidePx;
    if (bgUi.target) bgUi.target.textContent = bgTargetLabel();
    if (bgUi.sealNote) {
      if (state.mode !== 'acrylic') {
        bgUi.sealNote.textContent = '입구 잠금은 코롯토/아크릴에서만 쓸 수 있습니다(원본 한 장에 대한 좌표 변환이 그때만 성립합니다). 여기서는 틈 닫기로 막아 주세요.';
      } else {
        const usable = sealPointsForRecord(state.source).length;
        const total = sealPointsFor('bg').length;
        bgUi.sealNote.textContent = total
          ? `${total}개 중 ${usable}개가 이 그림 안에 있어 벽으로 쓰입니다.`
          : '아직 없습니다. 배경이 새 들어오는 입구를 찍어 주세요.';
      }
    }
    const restorable = bgTargets().some(record => !!record.bgOriginal);
    if (bgUi.restoreBtn) bgUi.restoreBtn.disabled = !restorable;
  }

  // 설정은 별도 창이 아니라, 배경 투명 모드로 들어간 블록 안에 붙는다.
  // 패널은 하나뿐이라 모드마다 새로 만들지 않고 그 블록으로 옮겨 준다.
  function setBgModeButtons() {
    for (const prefix of ['acrylic', 'sticker', 'maker']) {
      const btn = $(`${prefix}BgRemoveBtn`);
      if (!btn) continue;
      const on = bgModePrefix === prefix;
      btn.textContent = on ? '배경 투명 설정 접기' : '배경 투명 설정';
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      btn.classList.toggle('active', on);
    }
  }

  function enterBgMode(prefix) {
    if (!bgUi.panel) return;
    const block = $(`${prefix}BgRemoveBlock`);
    if (!block) return;
    bgModePrefix = prefix;
    bgTouchedInMode = false;
    block.append(bgUi.panel);          // 이 블록 안으로 옮긴다
    bgUi.panel.classList.remove('hidden');
    // 어느 모드에서 열렸는지만 알린다. "고른 것에만 적용" 을 접을지 말지는
    // conditional-visibility.js 가 판단한다 (표시/숨김 단일 창구).
    bgUi.panel.dataset.bgMode = prefix;
    window.GoodsMakerVisibility?.sync();
    syncBgSheet();
    setBgResult('info', '값을 바꾸면 바로 미리보기에 나타납니다', '입력을 멈추고 0.5초가 지나면 다시 계산합니다.');
    setBgModeButtons();
    updateBgLassoUi();
    drawPreview();   // 접는 동안 감춰 뒀던 올가미 외곽선을 다시 그린다
  }

  async function exitBgMode() {
    if (!bgModePrefix || !bgUi.panel) return;
    clearTimeout(bgPreviewTimer);
    bgPreviewTimer = 0;
    bgUi.panel.classList.add('hidden');
    bgUi.panel.dataset.bgMode = '';
    window.GoodsMakerVisibility?.sync();
    bgModePrefix = null;
    if (state.bgLassoMode) { state.bgLassoMode = false; els.canvas.style.cursor = ''; }
    bgLassoSelectedId = null;
    bgLassoDirty = false;
    setBgModeButtons();
    updateBgLassoUi();
    drawPreview();   // 올가미 외곽선을 지운다
    // 모드에 있는 동안의 미리보기는 기록을 남기지 않았다. 접을 때 한 번만 남긴다.
    if (bgTouchedInMode) {
      bgTouchedInMode = false;
      await saveWorkspaceNow();
      schedulePersist(0);
      checkpointHistory();
    }
  }

  function updateBgLassoUi() {
    const btn = $('bgLassoBtn'), clear = $('bgLassoClearBtn'), status = $('bgLassoStatus');
    const applyBtn = $('bgLassoApplyBtn'), delBtn = $('bgLassoDeleteBtn');
    const usable = state.mode === 'acrylic';
    if (!usable) { bgLassoSelectedId = null; }
    else if (bgLassoSelectedId && !bgLassoById(bgLassoSelectedId)) bgLassoSelectedId = null;
    if (btn) {
      btn.disabled = !usable;
      btn.textContent = state.bgLassoMode ? '그리기 끝내기' : '올가미 그리기';
      btn.setAttribute('aria-pressed', state.bgLassoMode ? 'true' : 'false');
      btn.classList.toggle('active', state.bgLassoMode);
    }
    // 적용 버튼은 "아직 계산 안 한 변경" 이 있을 때만 산다. 눌러 봐야 같은 값이
    // 다시 나오는 버튼을 살려 두면 몇 초짜리 계산을 헛돌린다.
    if (applyBtn) {
      const pending = usable && bgLassoDirty;
      applyBtn.disabled = !pending;
      applyBtn.classList.toggle('primary', pending);
      applyBtn.classList.toggle('secondary', !pending);
    }
    if (delBtn) delBtn.disabled = !usable || !bgLassoSelectedId;
    if (clear) clear.disabled = !usable || !state.bgLassos.length;
    if (status) {
      const n = state.bgLassos.length;
      if (!usable) status.textContent = '올가미는 코롯토/아크릴에서만 쓸 수 있습니다. 다른 탭에서는 틈 닫기 값을 조절해 주세요.';
      else if (state.bgLassoMode) status.textContent = '미리보기에서 지우고 싶은 배경을 감싸듯 끌어 주세요. 손을 떼면 올가미가 하나 생깁니다 (아직 지우지는 않습니다).';
      else if (bgLassoDirty) status.textContent = `올가미 ${n}개 — 아직 적용하지 않았습니다. 올가미 적용을 눌러 주세요.`;
      else if (bgLassoSelectedId) status.textContent = `올가미 ${n}개 중 하나를 골랐습니다. 끌어서 옮기거나 Delete 키로 지울 수 있습니다.`;
      else if (n) status.textContent = `올가미 ${n}개가 적용 중입니다. 배경 지우기를 다시 계산해도 그대로 남습니다. 올가미 안을 누르면 골라서 옮길 수 있습니다.`;
      else status.textContent = '틈 닫기를 넓게 잡으면 바깥과 안 이어진 자리까지 배경이 남습니다. 남은 배경을 올가미로 감싸면 그 안의 배경색 덩어리를 지웁니다.';
    }
  }

  function toggleBgLassoMode() {
    if (state.mode !== 'acrylic') return;
    state.bgLassoMode = !state.bgLassoMode;
    bgLassoDraft = null;
    if (state.bgLassoMode) bgLassoSelectedId = null;   // 그리는 중에는 고른 것이 없다
    els.canvas.style.cursor = state.bgLassoMode ? 'crosshair' : '';
    updateBgLassoUi();
    drawPreview();
  }

  // 고른 올가미 하나만 지운다. 지우는 것도 적용이 아니라 "바뀐 것" 이다.
  function deleteSelectedBgLasso() {
    if (!bgLassoSelectedId) return;
    const before = state.bgLassos.length;
    state.bgLassos = state.bgLassos.filter(l => l.id !== bgLassoSelectedId);
    if (state.bgLassos.length === before) return;
    bgLassoSelectedId = null;
    bgLassoDirty = true;
    updateBgLassoUi();
    drawPreview();
  }

  // 올가미를 실제로 계산해 넣는다. 배경 지우기는 늘 원본에서 다시 계산하므로
  // 올가미를 지웠을 때도 이 한 번으로 원래대로 돌아온다.
  async function applyBgLassos() {
    if (state.mode !== 'acrylic') return;
    clearTimeout(bgPreviewTimer);
    bgPreviewTimer = 0;
    await applyBackgroundRemoval({ live: true });
    drawPreview();
  }

  function clearBgLassos() {
    if (!state.bgLassos.length) return;
    state.bgLassos = [];
    bgLassoSelectedId = null;
    bgLassoDirty = true;   // 지운 것도 "올가미 적용" 을 눌러야 화면에 반영된다
    updateBgLassoUi();
    drawPreview();
  }

  // 화면에 실제로 떠 있는가. hidden 클래스만 보면 부모(빠른 작업 패널·세부 설정
  // 분류·접힌 <details>)가 숨겼을 때를 놓친다. getClientRects().length 는 그
  // 모든 경우를 한 번에 잡는다.
  function bgPanelOnScreen() {
    if (!bgModePrefix || !bgUi.panel) return false;
    if (bgUi.panel.classList.contains('hidden')) return false;
    return bgUi.panel.getClientRects().length > 0;
  }

  // 레이아웃이 바뀌어 패널이 화면에서 사라졌으면 모드도 같이 접는다.
  // 그러지 않으면 버튼은 '접기' 인데 패널은 안 보이고, 올가미만 남는다.
  function syncBgModeVisibility() {
    if (!bgModePrefix) return;
    if (bgPanelOnScreen()) return;
    exitBgMode();
  }

  function toggleBgMode(prefix) {
    if (bgModePrefix === prefix) { exitBgMode(); return; }
    enterBgMode(prefix);
  }

  // 값이 바뀌는 중에는 그대로 두고, 0.5초 동안 더 바뀌지 않으면 그때 다시 계산한다.
  // 계산이 도는 중에 또 바뀌면 끝난 뒤 한 번만 더 돈다(중간 값은 건너뛴다).
  function scheduleBgPreview() {
    if (!bgModePrefix) return;
    clearTimeout(bgPreviewTimer);
    bgPreviewTimer = setTimeout(runBgPreview, BG_PREVIEW_DELAY);
  }
  async function runBgPreview() {
    if (!bgModePrefix) return;
    if (bgPreviewRunning) { bgPreviewQueued = true; return; }
    bgPreviewRunning = true;
    try {
      do {
        bgPreviewQueued = false;
        await applyBackgroundRemoval({ live: true });
      } while (bgPreviewQueued && bgModePrefix);
    } finally {
      bgPreviewRunning = false;
    }
  }

  function describeDetection(detection) {
    const c = detection.color;
    return `배경색 rgb(${c.r}, ${c.g}, ${c.b}) · 테두리 표본의 ${Math.round(detection.coverage * 100)}% 가 이 색 · 네 변 중 ${detection.sidesCovered}변을 감쌈`;
  }

  async function previewBackgroundColor() {
    const targets = bgTargets();
    if (!targets.length) { setBgResult('warn', '대상 이미지가 없습니다', '먼저 이미지를 넣어 주세요.'); return; }
    persistBgSettings();
    const settings = currentBgSettings();
    try {
      setBusy(true);
      await new Promise(resolve => requestAnimationFrame(resolve));
      const record = targets[0];
      const { imageData, w, h } = await recordBasePixels(record);
      const detection = window.GoodsMakerBackground.detectBackgroundColor(imageData.data, w, h, settings);
      if (bgUi.detected) bgUi.detected.textContent = detection.color ? describeDetection(detection) : detection.reason;
      if (detection.ok) setBgResult('good', '단색 배경을 찾았습니다', describeDetection(detection));
      else setBgResult('warn', '단색 배경으로 보기 어렵습니다', detection.reason);
    } catch (error) {
      console.error(error);
      setBgResult('bad', '배경색을 확인하지 못했습니다', error?.message || '');
    } finally {
      setBusy(false);
    }
  }

  // live=true 는 값이 바뀐 뒤 0.5초가 지나 자동으로 도는 미리보기다. 사람이 누른
  // 것이 아니므로 실행취소 기록을 남기지 않는다 — 남기면 슬라이더를 몇 번
  // 움직인 것만으로 기록이 가득 차 되돌리기가 쓸모없어진다.
  async function applyBackgroundRemoval({ live = false } = {}) {
    const targets = bgTargets();
    if (!targets.length) {
      if (!live) setBgResult('warn', '대상 이미지가 없습니다', '먼저 이미지를 넣어 주세요.');
      return;
    }
    persistBgSettings();
    const settings = currentBgSettings();
    let done = 0, skipped = [], lastDetection = null, totalRemoved = 0, totalUnmixed = 0, totalLasso = 0, totalTrimmed = 0, totalBlobs = 0
    let lassoInside = 0, lassoKept = 0, lassoOnly = [];
    let lassoNeed = 0, lassoNeedInside = 0;
    let lassoUnmixed = 0, lassoTrimmed = 0, lassoHoles = 0, lassoNeck = 0;
    let shapeBlobs = 0, shapeBlobPx = 0, shapeHoles = 0, shapeHolePx = 0, totalProtected = 0;
    let maxPieces = 0;
    try {
      setBusy(true);
      await new Promise(resolve => requestAnimationFrame(resolve));
      for (const record of targets) {
        const { imageData, w, h } = await recordBasePixels(record);
        if (w * h > BG_MAX_PIXELS) {
          skipped.push(`${record.name || '이미지'}: ${w}×${h} 은 너무 큽니다`);
          continue;
        }
        const result = window.GoodsMakerBackground.removeBackground(imageData.data, w, h, {
          ...settings,
          sealPoints: bgSealPointsFor(record)
        });
        // 배경 자동 검출이 실패해도 **올가미는 살린다.** 올가미는 사람이 직접
        // "여기 지워라" 라고 그린 것이라 자동 검출에 묶여 있을 이유가 없다.
        // v85 까지는 여기서 continue 해 버려 올가미가 통째로 무시됐다 —
        // 배경이 여러 색이거나 그러데이션이면 검출이 실패한다.
        const polys = bgLassoPolygonsForRecord(record);
        if (!result.ok && !polys.length) {
          skipped.push(`${record.name || '이미지'}: ${result.reason}`);
          continue;
        }
        const pixels = result.ok ? result.data : new Uint8ClampedArray(imageData.data);
        // 검출이 됐으면 그 배경색을, 아니면 **올가미 안쪽의 우세한 색**을 기준으로 쓴다.
        let lassoColor = result.ok ? result.detection?.color : null;
        if (!lassoColor && polys.length) {
          const inside = lassoMask(w, h, polys);
          const dom = window.GoodsMakerBackground.detectDominantColor(pixels, w, h, inside);
          if (dom.ok) lassoColor = dom.color;
        }
        // 올가미는 배경을 지운 뒤 마지막에 적용한다. 이미지에 굽지 않고 매번
        // 다시 적용하므로, 설정을 바꿔 다시 계산해도 그대로 살아 있다.
        //
        // 나머지 파라미터(경계 처리·외곽 정리·번짐)는 **위 배경 지우기와 같은
        // 것을 그대로** 넘긴다. 사용자 지시대로 "이 기준은 기본 배투 파라미터를
        // 참고" 한다 — 올가미만 따로 노는 값은 관용도 하나뿐이다.
        const lasso = eraseWithLassos(pixels, w, h, polys,
                                      lassoColor, settings.lassoTolerance,
                                      { ...settings, sealPoints: bgSealPointsFor(record),
                                        seedNeckMaxPx: lassoNeckMaxPx(record),
                                        seedInsideOnly: !!settings.lassoInsideOnly,
                                        lassoSpillMaxPx: lassoSpillMaxPx(record) });
        if (!result.ok) {
          // 자동 배경 지우기는 실패했지만 올가미로는 지웠다 — 그 사실을 알린다.
          lassoOnly.push(`${record.name || '이미지'}: ${result.reason}`);
        }
        totalLasso += lasso.removed;
        if (lasso.neckCut > lassoNeck) lassoNeck = lasso.neckCut;
        lassoInside += lasso.inside;
        lassoKept += lasso.keptSpills;
        if (lasso.spillNeed && (!lassoNeed || lasso.spillNeed < lassoNeed)) {
          lassoNeed = lasso.spillNeed; lassoNeedInside = lasso.spillNeedInside;
        }
        lassoUnmixed += lasso.unmixed;
        lassoTrimmed += lasso.trimmed;
        lassoHoles += lasso.holes;
        await writeBackRecord(record, pixels, w, h);
        if (!result.ok) { done++; continue; }
        lastDetection = result.detection;
        totalRemoved += result.removedPixels;
        totalUnmixed += result.unmixedPixels;
        totalTrimmed += result.trimmedPixels || 0;
        totalProtected += result.protectedRestored || 0;
        totalBlobs += result.trimmedBlobs || 0;
        shapeBlobs += result.silhouetteBlobs || 0; shapeBlobPx += result.silhouetteBlobPixels || 0;
        shapeHoles += result.silhouetteHoles || 0; shapeHolePx += result.silhouetteHolePixels || 0;
        if ((result.pieces || 0) > maxPieces) maxPieces = result.pieces || 0;
        done++;
      }
      if (!done) {
        setBgResult('bad', '지우지 못했습니다', skipped[0] || '조건에 맞는 배경을 찾지 못했습니다.');
        return;
      }
      const detail = `${lastDetection ? describeDetection(lastDetection) + ' · ' : ''}지운 픽셀 ${totalRemoved.toLocaleString()}개 · 경계 되살림 ${totalUnmixed.toLocaleString()}개`
        + (totalTrimmed ? ` · 외곽 정리 ${totalTrimmed.toLocaleString()}개${totalBlobs ? ` (외톨이 덩어리 ${totalBlobs}개 포함)` : ''}` : '')
        + (shapeBlobs ? ` · 잡티 덩어리 ${shapeBlobs}개(${shapeBlobPx.toLocaleString()}px) 지움` : '')
        + (shapeHoles ? ` · 파인 구멍 ${shapeHoles}개(${shapeHolePx.toLocaleString()}px) 되돌림` : '')
        + (totalProtected ? ` · 외곽선 안쪽 ${totalProtected.toLocaleString()}px 되돌림` : '')
        + (totalLasso ? ` · 올가미로 ${totalLasso.toLocaleString()}개 더(배경 ${lassoInside.toLocaleString()}`
            + `${lassoUnmixed ? ` · 경계 되살림 ${lassoUnmixed.toLocaleString()}` : ''}`
            + `${lassoTrimmed ? ` · 잡티 정리 ${lassoTrimmed.toLocaleString()}` : ''}`
            + `${lassoHoles ? ` · 파인 구멍 ${lassoHoles.toLocaleString()} 되돌림` : ''}`
            + `${lassoNeck ? ` · 그림과 이어져 있던 좁은 목 ${lassoNeck}px 을 끊고 셈` : ''}`
            + `${lassoKept ? ` · 올가미 밖으로 크게 뻗은 덩어리 ${lassoKept}개는 그림으로 보고 그대로 둠` : ''})` : '')
        + (lassoOnly.length ? ` · ${lassoOnly.length}장은 배경 검출에 실패해 올가미로만 지웠습니다` : '')
        + (skipped.length ? ` · 건너뜀 ${skipped.length}장` : '');
      // 그림이 여러 조각으로 끊겼는데 틈 닫기가 꺼져 있으면, 배경이 외곽선의
      // 틈으로 새 들어가 가는 가닥을 갉아먹었을 가능성이 크다. 도구는 이미
      // 있는데 기본값이 0 이라 아무도 켜지 않는다 — 그래서 알려 준다.
      // 올가미를 두었는데 한 픽셀도 안 지워졌다면 이유를 알려 준다. 덩어리가
      // 올가미 밖으로 크게 뻗어 "그림" 으로 판정된 경우다 — 잠자코 아무 일도
      // 안 일어나면 사용자는 도구가 고장 난 줄 안다.
      if (state.bgLassos.length && !totalLasso && lassoKept) {
        setBgResult('warn', `${done}장의 배경을 지웠지만 올가미는 아무것도 못 지웠습니다`,
          `${detail} · 두른 배경이 올가미 밖으로 크게 뻗어 있어 그림으로 보고 그대로 두었습니다. `
          + `그림과 이어 주는 좁은 목을 끊어 보기까지 했고, 올가미 선을 가늘게만 넘어가는 자락인지도 봤지만 둘 다 아니었습니다. `
          + (lassoNeed ? `가장 아까운 덩어리는 지금 올가미 안에 ${lassoNeedInside.toLocaleString()}px 이 들어와 있고, ${lassoNeed.toLocaleString()}px 쯤 더 감싸면 지워집니다. ` : '')
          + `지우려는 자리를 **더 넓게** 감싸 주세요(덩어리의 3분의 2 이상이 올가미 안에 들어와야 합니다). `
          + `그래도 안 되면 위의 <b>틈 닫기</b>를 4~8 로 올려 보세요 — 그림과 이어진 통로를 그만큼 막습니다.`);
      } else if (maxPieces > 1 && settings.gapClosePx <= 0) {
        setBgResult('warn', `${done}장의 배경을 지웠지만 그림이 ${maxPieces}조각으로 끊겼습니다`,
          `${detail} · 배경이 외곽선의 틈으로 새 들어가 가는 가닥을 갉아먹었을 수 있습니다. `
          + `위의 틈 닫기를 4~6 정도로 올려 보세요. 원래 떨어져 있는 그림(눈동자 하이라이트 등)이면 그대로 두어도 됩니다.`);
      } else {
        setBgResult('good', `${done}장의 배경을 지웠습니다`, detail + (maxPieces > 1 ? ` · 조각 ${maxPieces}개` : ''));
      }
      if (live) bgTouchedInMode = true;
      // 올가미는 이 계산 안에서 함께 적용된다. 값을 만져 다시 계산해도
      // 마찬가지이므로, "아직 적용 안 됨" 표시는 여기 한 곳에서만 내린다.
      bgLassoDirty = false;
      updateBgLassoUi();
      await regenerateAfterBgChange({ commit: !live });
      refreshBgBlocks();
      syncBgSheet();
    } catch (error) {
      console.error(error);
      setBgResult('bad', '배경을 지우지 못했습니다', error?.message || '');
    } finally {
      setBusy(false);
    }
  }

  async function restoreBackgroundOriginals() {
    const targets = bgTargets();
    let done = 0;
    try {
      setBusy(true);
      for (const record of targets) if (await restoreRecord(record)) done++;
      if (!done) { setBgResult('info', '되돌릴 것이 없습니다', '이 이미지들은 아직 배경을 지우지 않았습니다.'); return; }
      setBgResult('good', `${done}장을 원본으로 되돌렸습니다`, '설정을 바꿔 다시 시도할 수 있습니다.');
      await regenerateAfterBgChange({ commit: true });
      refreshBgBlocks();
      syncBgSheet();
    } catch (error) {
      console.error(error);
      setBgResult('bad', '되돌리지 못했습니다', error?.message || '');
    } finally {
      setBusy(false);
    }
  }

  // commit=false 는 실시간 미리보기. 화면만 다시 그리고, 저장과 실행취소 기록은
  // 모드를 접을 때 한 번에 남긴다.
  async function regenerateAfterBgChange({ commit = true } = {}) {
    if (state.mode === 'acrylic') { state.result = null; await generateAcrylic(); }
    else if (state.mode === 'sticker') await generateSticker();
    else await generateMaker();
    drawPreview();
    if (!commit) return;
    await saveWorkspaceNow();
    schedulePersist(0);
    checkpointHistory();
  }

  for (const prefix of ['acrylic', 'sticker', 'maker']) {
    $(`${prefix}BgRemoveBtn`)?.addEventListener('click', () => toggleBgMode(prefix));
    $(`${prefix}BgRestoreBtn`)?.addEventListener('click', restoreBackgroundOriginals);
  }
  bgUi.doneBtn?.addEventListener('click', exitBgMode);
  $('bgLassoBtn')?.addEventListener('click', toggleBgLassoMode);
  $('bgLassoApplyBtn')?.addEventListener('click', applyBgLassos);
  $('bgLassoDeleteBtn')?.addEventListener('click', deleteSelectedBgLasso);
  $('bgLassoClearBtn')?.addEventListener('click', clearBgLassos);
  // "투명화 적용" — 값을 그대로 두고 다시 계산하고 싶을 때. v88 까지는
  // "고른 것에만 적용" 을 켰다 껐다 해야만 다시 돌았다(사용자 지적).
  $('bgApplyNowBtn')?.addEventListener('click', async () => {
    clearTimeout(bgPreviewTimer); bgPreviewTimer = 0;
    await applyBackgroundRemoval({ live: !!bgModePrefix });
  });
  bgUi.detectBtn?.addEventListener('click', previewBackgroundColor);
  bgUi.restoreBtn?.addEventListener('click', restoreBackgroundOriginals);
  // input 까지 듣는다. change 만 들으면 숫자칸은 포커스를 뺄 때에야 반응하고
  // 슬라이더는 손을 뗄 때에야 반응해, "바꾸는 중" 이라는 개념이 성립하지 않는다.
  for (const input of [bgUi.edge, bgUi.tol, bgUi.gap, bgUi.feather, bgUi.lassoTol, bgUi.edgeTrim, bgUi.silhouettePx, bgUi.haloTrim, bgUi.protectInside]) {
    input?.addEventListener('input', () => { persistBgSettings(); scheduleBgPreview(); });
    input?.addEventListener('change', persistBgSettings);
  }
  // 체크박스는 중간 값이 없으니 기다릴 이유가 없다. 바로 반영한다.
  bgUi.unmix?.addEventListener('change', () => { persistBgSettings(); runBgPreview(); });
  // 올가미 안쪽만 지우기는 올가미를 다시 계산해야 뜻이 생긴다.
  bgUi.lassoInsideOnly?.addEventListener('change', () => {
    persistBgSettings();
    if (state.bgLassos.length) { bgLassoDirty = true; updateBgLassoUi(); }
    runBgPreview();
  });
  $('bgRemoveSelectedOnly')?.addEventListener('change', () => {
    syncBgSheet(); refreshBgBlocks();
    if (bgModePrefix) runBgPreview();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && bgModePrefix) { event.preventDefault(); exitBgMode(); }
    // 글자를 치는 중이면 건드리지 않는다.
    if (event.key !== 'Delete' && event.key !== 'Backspace') return;
    if (!bgLassoSelectedId || !bgPanelOnScreen()) return;
    const el = document.activeElement;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
    event.preventDefault();
    deleteSelectedBgLasso();
  });
  // layout.js 가 빠른 작업↔세부 설정, 세부 설정 분류, 모드 전환마다 이 이벤트를
  // 쏜다. <details> 접기는 이벤트가 따로라 toggle 도 함께 듣는다(버블링하지
  // 않으므로 캡처 단계에서).
  window.addEventListener('goods-maker-layout-change', syncBgModeVisibility);
  document.addEventListener('toggle', syncBgModeVisibility, true);
  window.addEventListener('goods-maker-layout-change', syncSealPlaceVisibility);
  document.addEventListener('toggle', syncSealPlaceVisibility, true);
  refreshBgBlocks();
  setBgModeButtons();

  // 직접 고른 적이 없으면 기기 설정을 따라간다.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',ev=>{
    let saved=null; try{saved=localStorage.getItem('goodsmaker.theme');}catch(e){}
    if(saved!=='dark'&&saved!=='light')applyTheme(ev.matches?'dark':'light');
  });

  els.resetBtn.addEventListener('click',()=>{const label={acrylic:'코롯토 / 아크릴',sticker:'스티커 대지',maker:'외곽선 / 배경'}[state.mode]||'현재';if(!confirm(`${label} 모드의 이미지와 설정을 모두 초기화할까요?\n\n실행취소(Ctrl+Z)로 되돌릴 수 있습니다.`))return;resetAll();});
  document.querySelectorAll('.view-tab').forEach(btn=>btn.addEventListener('click',()=>{if(btn.classList.contains('hidden'))return;selectView(btn.dataset.view);drawPreview();}));
  function setPreviewZoomAround(nextZoom, canvasX = els.canvas.width / 2, canvasY = els.canvas.height / 2) {
    const before = state.result ? getViewTransformForResult(state.result, state.zoom) : getDraftViewTransform(state.zoom);
    const anchorX = (canvasX - before.x) / before.scale;
    const anchorY = (canvasY - before.y) / before.scale;
    state.zoom = clamp(nextZoom, .2, 5);
    const after = state.result ? getViewTransformForResult(state.result, state.zoom) : getDraftViewTransform(state.zoom);
    state.panX = canvasX - anchorX * after.scale - after.baseX;
    state.panY = canvasY - anchorY * after.scale - after.baseY;
    drawPreview();
    schedulePersist(0);
  }
  els.zoomInBtn.addEventListener('click',()=>setPreviewZoomAround(state.zoom*1.2));
  els.zoomOutBtn.addEventListener('click',()=>setPreviewZoomAround(state.zoom/1.2));
  els.fitBtn.addEventListener('click',()=>{state.zoom=1;state.panX=0;state.panY=0;drawPreview();schedulePersist(0);});
  // 출력 해상도로 보기 (v124) — 미리보기를 내보내기와 같은 350dpi 로 다시 계산한다.
  // 되돌리기·저장에는 넣지 않는다. 보기 방식이지 작업 내용이 아니고, 무거운
  // 계산이라 복원할 때 되살리면 새로고침이 그만큼 느려진다.
  function setExportResPreview(on){
    const r=state.result;
    if(on){
      if(!r||r.mode==='maker')return;
      try{assertPrintExportSize(r,PRINT_EXPORT_DPI);}
      catch(error){setNotice('bad','출력 해상도로 볼 수 없습니다',error?.message||'대지 크기를 줄여 주세요.');return;}
    }
    printExportPpmOverride=on?PRINT_EXPORT_DPI/25.4:null;
    syncExportResUi();
    if(!r)return;
    if(r.mode==='acrylic')generateAcrylic();
    else if(r.mode==='sticker')generateSticker();
  }
  function exportResPreviewOn(){return Number.isFinite(printExportPpmOverride);}
  function syncExportResUi(){
    const on=exportResPreviewOn();
    els.exportResBtn?.classList.toggle('active-toggle',on);
    if(els.exportResBtn)els.exportResBtn.title=on
      ?'지금 화면은 내보내기와 같은 350dpi 계산 결과입니다. 다시 누르면 빠른 미리보기로 돌아갑니다.'
      :'미리보기를 내보내기와 같은 350dpi 로 다시 계산합니다. 화면의 칼선이 곧 파일의 칼선이 됩니다. (느립니다)';
  }
  els.exportResBtn?.addEventListener('click',()=>setExportResPreview(!exportResPreviewOn()));
  // 처리 해상도 그대로 보기 — 미리보기와 실제 칼선이 달라 보이던 것을 눈으로 맞춘다 (v123)
  els.oneToOneBtn?.addEventListener('click',()=>{if(!state.result)return;setPreviewZoomAround(oneToOneZoom());});
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
  function hitStickerHole(point){
    if(!state.result||state.result.mode!=='sticker')return null;
    const ownerHoles=stickerHolesForOwner();for(let i=ownerHoles.length-1;i>=0;i--){const hole=ownerHoles[i],pos=draftStickerHolePixel(hole),spec=getHoleSpec(state.result.ppm,hole,false),hitR=(hole.draftMode==='external'?spec.outerR:spec.innerR)+8;if(pos&&Math.hypot(point.xPx-pos.x,point.yPx-pos.y)<=hitR)return hole;}
    return null;
  }

  const previewTouchPointers = new Map();
  const previewGesture = { active:false, consumed:false, startDistance:1, startZoom:1, anchorX:0, anchorY:0 };
  function previewCanvasPoint(ev) {
    const rect=els.canvas.getBoundingClientRect(),sx=els.canvas.width/Math.max(1,rect.width),sy=els.canvas.height/Math.max(1,rect.height);
    return {x:(ev.clientX-rect.left)*sx,y:(ev.clientY-rect.top)*sy};
  }
  function previewPointerPair() { return [...previewTouchPointers.values()].slice(0,2); }
  function previewPairGeometry() {
    const pair=previewPointerPair();if(pair.length<2)return null;
    const [a,b]=pair,center={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
    return {center,distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y))};
  }
  function beginPreviewGesture() {
    const geometry=previewPairGeometry();if(!geometry)return;
    state.dragging=null;els.canvas.classList.remove('hole-dragging');
    const transform=state.result?getViewTransformForResult(state.result,state.zoom):getDraftViewTransform(state.zoom);
    previewGesture.active=true;previewGesture.consumed=true;previewGesture.startDistance=geometry.distance;previewGesture.startZoom=state.zoom;
    previewGesture.anchorX=(geometry.center.x-transform.x)/transform.scale;
    previewGesture.anchorY=(geometry.center.y-transform.y)/transform.scale;
    els.canvas.classList.add('preview-gesturing');
  }
  function updatePreviewGesture() {
    if(!previewGesture.active)return;
    const geometry=previewPairGeometry();if(!geometry)return;
    state.zoom=clamp(previewGesture.startZoom*(geometry.distance/previewGesture.startDistance),.2,5);
    const transform=state.result?getViewTransformForResult(state.result,state.zoom):getDraftViewTransform(state.zoom);
    state.panX=geometry.center.x-previewGesture.anchorX*transform.scale-transform.baseX;
    state.panY=geometry.center.y-previewGesture.anchorY*transform.scale-transform.baseY;
    drawPreview();
  }
  function finishPreviewPointer(ev) {
    previewTouchPointers.delete(ev.pointerId);
    if(previewGesture.active&&previewTouchPointers.size<2){previewGesture.active=false;els.canvas.classList.remove('preview-gesturing');schedulePersist(0);}
    if(previewGesture.consumed&&previewTouchPointers.size===0)previewGesture.consumed=false;
  }
  els.canvas.addEventListener('pointerdown',ev=>{
    if(ev.pointerType!=='touch')return;
    previewTouchPointers.set(ev.pointerId,previewCanvasPoint(ev));
    try{els.canvas.setPointerCapture(ev.pointerId);}catch(_){ }
    if(previewTouchPointers.size>=2){beginPreviewGesture();ev.preventDefault();ev.stopImmediatePropagation();}
    else if(previewGesture.consumed){ev.preventDefault();ev.stopImmediatePropagation();}
  },true);
  els.canvas.addEventListener('pointermove',ev=>{
    if(ev.pointerType!=='touch'||!previewTouchPointers.has(ev.pointerId))return;
    previewTouchPointers.set(ev.pointerId,previewCanvasPoint(ev));
    if(previewGesture.active){updatePreviewGesture();ev.preventDefault();ev.stopImmediatePropagation();}
    else if(previewGesture.consumed){ev.preventDefault();ev.stopImmediatePropagation();}
  },true);
  for(const eventName of ['pointerup','pointercancel'])els.canvas.addEventListener(eventName,ev=>{
    if(ev.pointerType!=='touch'||!previewTouchPointers.has(ev.pointerId))return;
    const block=previewGesture.active||previewGesture.consumed;finishPreviewPointer(ev);
    if(block){ev.preventDefault();ev.stopImmediatePropagation();}
  },true);
  els.canvas.addEventListener('lostpointercapture',ev=>{
    if(previewTouchPointers.has(ev.pointerId))finishPreviewPointer(ev);
  },true);

  els.canvas.addEventListener('pointerdown',ev=>{
    if(ev.cancelable)ev.preventDefault();if(!state.result)return;const p=boardPointFromEvent(ev);if(!p)return;
    // 올가미 그리기 모드가 가장 먼저다. 끌기 시작점을 잡고 나머지 조작을 막는다.
    if(state.bgLassoMode&&state.mode==='acrylic'){
      bgLassoDraft={points:[{xMm:p.xMm,yMm:p.yMm}],pointerId:ev.pointerId};
      try{els.canvas.setPointerCapture(ev.pointerId);}catch(_){ }
      return;
    }
    // 두 지점 닫기 찍기 모드. 입구 잠금과 마찬가지로 다른 조작보다 먼저 가로챈다.
    if(state.bridgePlaceMode&&sealModeForCurrent()){
      const rr=state.result;
      if(p.xMm<0||p.yMm<0||p.xMm>rr.widthMm||p.yMm>rr.heightMm){
        setNotice('warn','대지 안쪽을 눌러 주세요','대지 바깥에는 이을 칼선이 없습니다.');
        return;
      }
      addCutBridgePoint(p.xMm,p.yMm);
      return;
    }
    // 입구 잠금 찍기 모드일 때는 다른 조작(타공 끌기·개체 선택)보다 먼저 가로챈다.
    if(state.sealPlaceMode&&sealPlaceChannel()){
      // 미리보기 캔버스는 대지보다 넓다(레터박스). 대지 밖을 누르면 아무 입구도
      // 못 찾는 지점만 쌓이므로 그냥 무시한다.
      const rr=state.result;
      if(p.xMm<0||p.yMm<0||p.xMm>rr.widthMm||p.yMm>rr.heightMm){
        setNotice('warn','대지 안쪽을 눌러 주세요','대지 바깥은 잠글 입구가 없습니다.');
        return;
      }
      const channel=sealPlaceChannel();
      addSealPoint(p.xMm,p.yMm,{channel});
      if(channel==='bg'){updateSealUi();syncBgSheet();runBgPreview();}
      else markCutCloseDirty();   // 칼선은 "적용" 을 눌렀을 때 계산한다 (v105)
      return;
    }
    if(state.mode==='acrylic'){const hole=hitHole(p);if(hole){state.dragging={type:'hole-pending',id:hole.id,startClientX:ev.clientX,startClientY:ev.clientY,pointerId:ev.pointerId};els.canvas.setPointerCapture(ev.pointerId);return;}
      // 올가미 고르기. 타공보다 뒤에 본다 — 타공은 작고 올가미는 넓어서,
      // 올가미를 먼저 보면 그 안에 든 타공을 영영 못 잡는다.
      if(bgPanelOnScreen()&&state.bgLassos.length){
        const lasso=hitBgLasso(p.xMm,p.yMm);
        if(lasso){
          bgLassoSelectedId=lasso.id;
          state.dragging={type:'bg-lasso-move',id:lasso.id,start:p,startPoints:lasso.points.map(pt=>({...pt})),pointerId:ev.pointerId,moved:false};
          els.canvas.setPointerCapture(ev.pointerId);
          updateBgLassoUi();drawPreview();return;
        }
        if(bgLassoSelectedId){bgLassoSelectedId=null;updateBgLassoUi();drawPreview();}
      }
      if(state.selectedHoleIds.length)clearHoleSelection();return;}
    if(state.mode==='sticker'&&!state.splitPreview){const stickerHole=hitStickerHole(p);if(stickerHole){state.dragging={type:'sticker-hole-pending',id:stickerHole.id,startClientX:ev.clientX,startClientY:ev.clientY,pointerId:ev.pointerId};els.canvas.setPointerCapture(ev.pointerId);return;}if(state.selectedStickerHoleIds.length)clearStickerHoleSelection();}
    if(state.mode==='sticker'&&state.splitPreview){const hit=hitSplitPreviewItem(p);if(hit){selectSplitPreviewItem(hit.id,{additive:true});return;}state.dragging={type:'split-marquee-pending',start:p,current:p,startClientX:ev.clientX,startClientY:ev.clientY,pointerId:ev.pointerId,additive:ev.shiftKey||ev.ctrlKey||ev.metaKey||state.multiSelectMode};els.canvas.setPointerCapture(ev.pointerId);return;}
    const items=state.mode==='maker'?state.makerItems:state.stickers,primary=items.find(v=>v.id===(state.mode==='maker'?state.makerSelectedId:state.selectedId)),allowHandle=state.mode!=='maker'||state.makerSelectedIds.length===1,handle=allowHandle?hitTransformHandle(p,primary):null;
    if(handle&&primary){const dist=Math.hypot(p.xMm-primary.xMm,p.yMm-primary.yMm),angle=Math.atan2(p.yMm-primary.yMm,p.xMm-primary.xMm),size=makerItemSizeMm(primary);state.dragging={type:handle.type,id:primary.id,corner:handle.corner,startWidth:size.width,startHeight:size.height,startRotation:primary.rotation,startDist:Math.max(.001,dist),startAngle:angle,pointerId:ev.pointerId,ownerStartX:primary.xMm,ownerStartY:primary.yMm,holeStarts:state.mode==='sticker'?snapshotOwnedStickerHoles(primary.id):[]};els.canvas.setPointerCapture(ev.pointerId);return;}
    const hit=hitItem(p,items);
    if(hit){
      let ids,pendingIndividualDeselect=null;
      if(state.mode==='maker'){selectMaker(hit.id,{additive:ev.shiftKey||ev.ctrlKey||ev.metaKey||state.makerMultiSelectMode});ids=movementIdsForMaker(hit);if(ids.some(id=>state.makerItems.find(v=>v.id===id)?.locked)){drawPreview();return;}}
      else if(state.groupEditIds.includes(hit.id)){ids=movementIdsForSticker(hit);pendingIndividualDeselect=hit.id;}
      else if(state.groupEditIds.length&&hit.groupId===state.groupEditGroupId){state.dragging={type:'group-edit-candidate',id:hit.id,pointerId:ev.pointerId};els.canvas.setPointerCapture(ev.pointerId);return;}
      else{selectSticker(hit.id,{additive:ev.shiftKey||ev.ctrlKey||ev.metaKey});ids=movementIdsForSticker(hit);}
      const starts=ids.map(id=>{const v=items.find(q=>q.id===id);return v?{id,x:v.xMm,y:v.yMm}:null;}).filter(Boolean);
      state.dragging={type:'item-move',mode:state.mode,start:p,starts,pointerId:ev.pointerId,pendingIndividualDeselect,moved:false};els.canvas.setPointerCapture(ev.pointerId);return;
    }
    if(state.mode==='sticker'){state.dragging={type:'marquee-pending',start:p,current:p,startClientX:ev.clientX,startClientY:ev.clientY,pointerId:ev.pointerId,additive:ev.shiftKey||ev.ctrlKey||ev.metaKey||state.multiSelectMode};els.canvas.setPointerCapture(ev.pointerId);}else if(state.makerMultiSelectMode||ev.shiftKey||ev.ctrlKey||ev.metaKey){state.dragging={type:'maker-marquee-pending',start:p,current:p,startClientX:ev.clientX,startClientY:ev.clientY,pointerId:ev.pointerId,additive:true};els.canvas.setPointerCapture(ev.pointerId);}else selectMaker(null);
  });
  els.canvas.addEventListener('dblclick',ev=>{
    if(state.mode!=='sticker'||state.splitPreview||!state.result)return;const p=boardPointFromEvent(ev);if(!p)return;const hit=hitSticker(p);if(!hit?.groupId)return;ev.preventDefault();state.dragging=null;toggleGroupMemberEdit(hit.id);queueHistoryCheckpoint(0);
  });
  let lastTouchTap={time:0,id:null};
  els.canvas.addEventListener('pointerup',ev=>{
    if(ev.pointerType!=='touch'||state.mode!=='sticker'||state.splitPreview||!state.result)return;const p=boardPointFromEvent(ev),hit=p?hitSticker(p):null,now=Date.now();
    if(hit?.groupId&&lastTouchTap.id===hit.id&&now-lastTouchTap.time<360){toggleGroupMemberEdit(hit.id);lastTouchTap={time:0,id:null};}else lastTouchTap={time:now,id:hit?.id||null};
  });
  // 올가미: 끄는 동안 점을 모으고, 손을 떼면 닫아서 적용한다.
  els.canvas.addEventListener('pointermove',ev=>{
    if(!bgLassoDraft||ev.pointerId!==bgLassoDraft.pointerId)return;
    if(ev.cancelable)ev.preventDefault();
    const p=boardPointFromEvent(ev);if(!p)return;
    const last=bgLassoDraft.points[bgLassoDraft.points.length-1];
    // 너무 촘촘한 점은 버린다(0.3mm 이하). 다각형 판정이 느려질 뿐이다.
    if(Math.hypot(p.xMm-last.xMm,p.yMm-last.yMm)<.3)return;
    bgLassoDraft.points.push({xMm:p.xMm,yMm:p.yMm});
    drawPreview();
    ev.stopImmediatePropagation();
  },true);
  for(const name of ['pointerup','pointercancel'])els.canvas.addEventListener(name,async ev=>{
    if(!bgLassoDraft||ev.pointerId!==bgLassoDraft.pointerId)return;
    const draft=bgLassoDraft;bgLassoDraft=null;
    try{els.canvas.releasePointerCapture(ev.pointerId);}catch(_){ }
    ev.stopImmediatePropagation();
    if(name==='pointercancel'||draft.points.length<3){drawPreview();return;}
    // 여기서 바로 계산하지 않는다. 큰 그림에서는 한 획마다 몇 초가 걸려
    // "여러 개를 그린 뒤 한 번에 본다" 가 불가능했다. "올가미 적용" 이 계산한다.
    state.bgLassos.push({id:`lasso-${Date.now()}-${Math.round(Math.random()*1e6)}`,points:draft.points});
    bgLassoDirty=true;
    updateBgLassoUi();
    drawPreview();
  },true);

  els.canvas.addEventListener('pointermove',ev=>{
    if(ev.cancelable)ev.preventDefault();if(!state.dragging||!state.result)return;const p=boardPointFromEvent(ev);if(!p)return;
    if(state.dragging.type==='bg-lasso-move'){
      const lasso=bgLassoById(state.dragging.id);
      if(!lasso){state.dragging=null;return;}
      const dx=p.xMm-state.dragging.start.xMm,dy=p.yMm-state.dragging.start.yMm;
      if(Math.hypot(dx,dy)>.12)state.dragging.moved=true;
      for(let i=0;i<lasso.points.length;i++){
        lasso.points[i].xMm=state.dragging.startPoints[i].xMm+dx;
        lasso.points[i].yMm=state.dragging.startPoints[i].yMm+dy;
      }
      drawPreview();return;
    }
    if(state.dragging.type==='hole-pending'&&state.mode==='acrylic'){if(Math.hypot(ev.clientX-state.dragging.startClientX,ev.clientY-state.dragging.startClientY)<4)return;setPrimaryHole(state.dragging.id);state.dragging.type='hole';els.canvas.classList.add('hole-dragging');updateHoleUi();drawPreview();}
    if(state.dragging.type==='hole'&&state.mode==='acrylic'){const r=state.result,hole=state.holes.find(item=>item.id===state.dragging.id);if(!hole)return;const spec=getHoleSpec(r.ppm,hole,false),pos=resolveHolePosition(r.constraintMask,r.widthPx,r.heightPx,r.pad,r.ppm,hole.draftMode,(p.xPx-r.pad)/r.ppm,(p.yPx-r.pad)/r.ppm,spec,r.insideDistance,r.boundaryPoints,r.constraintBounds);hole.draftXmm=(pos.x-r.pad)/r.ppm;hole.draftYmm=(pos.y-r.pad)/r.ppm;updateHoleDirtyFlag(hole);updateHoleUi();drawPreview();return;}
    if(state.dragging.type==='sticker-hole-pending'&&state.mode==='sticker'){if(Math.hypot(ev.clientX-state.dragging.startClientX,ev.clientY-state.dragging.startClientY)<4)return;setPrimaryStickerHole(state.dragging.id);state.dragging.type='sticker-hole';els.canvas.classList.add('hole-dragging');updateStickerHoleUi();drawPreview();}
    if(state.dragging.type==='sticker-hole'&&state.mode==='sticker'){const r=state.result,hole=state.stickerHoles.find(item=>item.id===state.dragging.id),c=stickerHoleConstraint(hole,r);if(!hole||!c)return;const spec=getHoleSpec(r.ppm,hole,false),pos=resolveHolePosition(c.constraintMask,c.widthPx,c.heightPx,0,r.ppm,hole.draftMode,(p.xPx-c.left)/r.ppm,(p.yPx-c.top)/r.ppm,spec,c.insideDistance,c.boundaryPoints,c.constraintBounds);hole.draftXmm=(pos.x+c.left)/r.ppm;hole.draftYmm=(pos.y+c.top)/r.ppm;hole.dirty=holeIsDirty(hole);updateStickerHoleUi();drawPreview();return;}
    if(state.dragging.type==='split-marquee-pending'){if(Math.hypot(ev.clientX-state.dragging.startClientX,ev.clientY-state.dragging.startClientY)>5)state.dragging.type='split-marquee';state.dragging.current=p;drawPreview();return;}
    if(state.dragging.type==='split-marquee'){state.dragging.current=p;drawPreview();return;}
    const items=state.mode==='maker'?state.makerItems:state.stickers,item=items.find(v=>v.id===state.dragging.id);
    if(state.dragging.type==='item-move'){const dx=p.xMm-state.dragging.start.xMm,dy=p.yMm-state.dragging.start.yMm;if(Math.hypot(dx,dy)>.12)state.dragging.moved=true;for(const st of state.dragging.starts){const v=items.find(q=>q.id===st.id);if(v){v.xMm=st.x+dx;v.yMm=st.y+dy;}}if(state.mode==='sticker'){const previousDx=state.dragging.holeDx||0,previousDy=state.dragging.holeDy||0;moveOwnedStickerHoles(state.dragging.starts.map(st=>st.id),dx-previousDx,dy-previousDy);state.dragging.holeDx=dx;state.dragging.holeDy=dy;}if(state.mode==='maker')updateMakerUi();else syncStickerSelectionUi();drawPreview();return;}
    if(state.dragging.type==='resize'&&item){if(state.mode==='maker'&&item.locked)return;const free=state.mode==='maker'&&(makerObjectType(item)!=='image'||item.aspectMode==='free');if(free){const dx=p.xMm-item.xMm,dy=p.yMm-item.yMm,a=-(Number(item.rotation)||0)*Math.PI/180,lx=dx*Math.cos(a)-dy*Math.sin(a),ly=dx*Math.sin(a)+dy*Math.cos(a);item.widthMm=clamp(Math.abs(lx)*2,.5,1000);item.heightMm=clamp(Math.abs(ly)*2,.5,1000);}else{const dist=Math.hypot(p.xMm-item.xMm,p.yMm-item.yMm);item.widthMm=clamp(state.dragging.startWidth*dist/state.dragging.startDist,2,500);}if(state.mode==='sticker')transformOwnedStickerHoles(state.dragging,item,item.widthMm/state.dragging.startWidth,0);state.mode==='maker'?updateMakerUi({skipEffectRender:true}):syncStickerSelectionUi();drawPreview();return;}
    if(state.dragging.type==='rotate'&&item){if(state.mode==='maker'&&item.locked)return;const angle=Math.atan2(p.yMm-item.yMm,p.xMm-item.xMm);item.rotation=state.dragging.startRotation+(angle-state.dragging.startAngle)*180/Math.PI;if(state.mode==='sticker')transformOwnedStickerHoles(state.dragging,item,1,(item.rotation-state.dragging.startRotation)*Math.PI/180);state.mode==='maker'?updateMakerUi({skipEffectRender:true}):syncStickerSelectionUi();drawPreview();return;}
    if(state.dragging.type==='maker-marquee-pending'){if(Math.hypot(ev.clientX-state.dragging.startClientX,ev.clientY-state.dragging.startClientY)>5)state.dragging.type='maker-marquee';state.dragging.current=p;drawPreview();return;}
    if(state.dragging.type==='maker-marquee'){state.dragging.current=p;drawPreview();return;}
    if(state.dragging.type==='marquee-pending'){if(Math.hypot(ev.clientX-state.dragging.startClientX,ev.clientY-state.dragging.startClientY)>5)state.dragging.type='marquee';state.dragging.current=p;drawPreview();return;}
    if(state.dragging.type==='marquee'){state.dragging.current=p;drawPreview();}
  });
  const endDrag=()=>{if(!state.dragging)return;const ended=state.dragging;state.dragging=null;els.canvas.classList.remove('hole-dragging');
    if(ended.type==='hole-pending')toggleHoleSelection(ended.id);
    if(ended.type==='sticker-hole-pending')toggleStickerHoleSelection(ended.id);
    if(ended.type==='split-marquee-pending')selectSplitPreviewItem(null);
    if(ended.type==='split-marquee'&&state.splitPreview){const x1=Math.min(ended.start.xMm,ended.current.xMm),x2=Math.max(ended.start.xMm,ended.current.xMm),y1=Math.min(ended.start.yMm,ended.current.yMm),y2=Math.max(ended.start.yMm,ended.current.yMm),ids=state.splitPreview.items.filter(v=>{const b=itemCutBoundsMm(v,'sticker');return b.maxX>=x1&&b.minX<=x2&&b.maxY>=y1&&b.minY<=y2;}).map(v=>v.id),base=ended.additive?new Set(state.splitPreview.selectedIds||[]):new Set();ids.forEach(id=>base.add(id));state.splitPreview.selectedIds=[...base];syncStickerSelectionUi();drawPreview();}
    if(ended.type==='maker-marquee-pending')selectMaker(null);
    if(ended.type==='maker-marquee'){const x1=Math.min(ended.start.xMm,ended.current.xMm),x2=Math.max(ended.start.xMm,ended.current.xMm),y1=Math.min(ended.start.yMm,ended.current.yMm),y2=Math.max(ended.start.yMm,ended.current.yMm),hitItems=state.makerItems.filter(v=>{const b=itemCutBoundsMm(v,'maker');return b.maxX>=x1&&b.minX<=x2&&b.maxY>=y1&&b.minY<=y2;}),base=ended.additive?new Set(state.makerSelectedIds):new Set();for(const item of hitItems)for(const id of makerGroupIds(item))base.add(id);state.makerSelectedIds=[...base];state.makerSelectedId=state.makerSelectedIds.at(-1)||null;updateMakerUi();drawPreview();}
    if(ended.type==='marquee-pending')selectSticker(null);
    if(ended.type==='marquee'){const x1=Math.min(ended.start.xMm,ended.current.xMm),x2=Math.max(ended.start.xMm,ended.current.xMm),y1=Math.min(ended.start.yMm,ended.current.yMm),y2=Math.max(ended.start.yMm,ended.current.yMm),ids=state.stickers.filter(v=>{const b=itemCutBoundsMm(v,'sticker');return b.maxX>=x1&&b.minX<=x2&&b.maxY>=y1&&b.minY<=y2;}).flatMap(v=>stickerGroupIds(v)),base=ended.additive?new Set(state.selectedStickerIds):new Set();ids.forEach(id=>base.add(id));clearGroupMemberEdit();state.selectedStickerIds=[...base];state.selectedId=state.selectedStickerIds.at(-1)||null;syncStickerSelectionUi();drawPreview();}
    if(ended.type==='item-move'&&ended.pendingIndividualDeselect&&!ended.moved)deselectGroupMember(ended.pendingIndividualDeselect);
    // 올가미를 옮겼으면 아직 적용 안 된 변경으로 표시한다(눌러야 계산한다).
    if(ended.type==='bg-lasso-move'){if(ended.moved)bgLassoDirty=true;updateBgLassoUi();drawPreview();}
    if(ended.type==='hole'||ended.type==='sticker-hole')checkpointHistory();
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
  // 떠 있는 창을 화면 안에 앉힌다 (v108).
  //
  // 예전에는 크기를 **300×300 으로 적어 두고** 그것으로 잘랐다.
  //
  //     const pw=300, ph=300;
  //     top = clamp(r.bottom+8, 8, window.innerHeight - ph - 8);
  //
  // 색 고르개의 실제 높이는 **342px** 이다. 42px 을 모르고 자르니 아래가 그만큼
  // 삐져나갔고, 안드로이드 내비게이션 바가 그 아래를 또 덮어 hex 입력칸과
  // 버튼이 통째로 가렸다. 사용자가 보낸 화면이 그것이다.
  //
  // 그래서 **띄운 뒤에 실제로 재서** 앉힌다. 아래가 모자라면 위로 뒤집고,
  // 위아래 어디에도 안 들어가면 화면에 맞춰 붙인 뒤 스스로 스크롤하게 둔다
  // (CSS 에 max-height + overflow:auto 가 이미 있다).
  const FLOAT_PAD = 8;
  function safeInset(side){
    const v = getComputedStyle(document.documentElement).getPropertyValue(`--safe-${side}`);
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  }
  function placeFloating(pop, anchor, gap = 8){
    // 재기 전에 왼쪽 위로 보내 둔다. 오른쪽 끝에 걸린 채로 재면 줄바꿈이
    // 일어나 높이가 실제보다 크게 나온다.
    pop.style.left = '0px';
    pop.style.top = '0px';
    const box = pop.getBoundingClientRect();
    const w = box.width, h = box.height;
    const vw = window.innerWidth, vh = window.innerHeight;
    const top0 = FLOAT_PAD + safeInset('top');
    const bottom0 = vh - FLOAT_PAD - safeInset('bottom');

    const left = clamp(anchor.left, FLOAT_PAD, Math.max(FLOAT_PAD, vw - w - FLOAT_PAD));
    const below = bottom0 - (anchor.bottom + gap);
    const above = (anchor.top - gap) - top0;
    let top;
    if (h <= below) top = anchor.bottom + gap;              // 아래에 들어간다
    else if (h <= above) top = anchor.top - gap - h;        // 위로 뒤집는다
    else top = Math.max(top0, bottom0 - h);                 // 둘 다 모자라면 붙인다
    pop.style.left = `${Math.round(left)}px`;
    pop.style.top = `${Math.round(top)}px`;
  }

  function openColorPicker(input,button){const st=buildColorPicker(),col=parseColorValue(input.value||input.getAttribute('value')),hsv=rgbToHsv(col.r,col.g,col.b);Object.assign(st,hsv,{a:col.a,target:input});st.draw();st.pop.classList.remove('hidden');placeFloating(st.pop,button.getBoundingClientRect());}
  function upgradeColorInputs(){document.querySelectorAll('input[type="color"]').forEach(input=>{const raw=input.dataset.initialColor||input.getAttribute('value')||input.value||'#000000';input.type='text';input.value=colorToHex8(parseColorValue(raw));input.classList.add('color-source');input.hidden=true;const control=document.createElement('button');control.type='button';control.className='color-control';control.innerHTML='<span class="color-swatch"></span><span class="color-value"></span><span class="color-drop">⌄</span>';input.insertAdjacentElement('afterend',control);input._colorControl=control;control.addEventListener('click',()=>openColorPicker(input,control));});refreshColorControls();}
  function refreshColorControls(){document.querySelectorAll('.color-source').forEach(input=>{const col=parseColorValue(input.value),value=colorToHex8(col);input.value=value;const ctl=input._colorControl||input.nextElementSibling;if(ctl?.classList.contains('color-control')){ctl.querySelector('.color-swatch').style.backgroundColor=colorToCss(value);ctl.querySelector('.color-value').textContent=`${value.slice(0,7)} · ${Math.round(col.a*100)}%`;}});}
  function numericRangeFor(input){let min=Number(input.min),max=Number(input.max),v=Number(input.value)||0;if(!Number.isFinite(min)){if(/rotation/i.test(input.id))min=-360;else if(/(^|Sel)[XY]$|Shadow[XY]|Pattern[XY]|Background[XY]/i.test(input.id))min=-1000;else min=Math.min(0,v*2-100);}if(!Number.isFinite(max)){if(/rotation/i.test(input.id))max=360;else if(/(^|Sel)[XY]$|Shadow[XY]|Pattern[XY]|Background[XY]/i.test(input.id))max=1000;else max=Math.max(500,v*2+100);}return{min,max};}
  // ── 숫자칸 슬라이더 (v108 에서 눈금을 다시 잡았다) ────────────────
  //
  // 사용자: "슬라이더 범위가 실제 값에 비해 너무 넓은 경우들이 있는 것 같아"
  //
  // 실측했다. 93칸 중 **16칸**이 트랙 끝 5% 안에 값이 몰려 있었다.
  //
  //     makerTextFontSize     8 mm   / 0.5~200  →  3.8%
  //     makerPatternGap       8      / 0~200    →  4.0%
  //     makerObjectPatternSize 3     / 0.2~100  →  2.8%
  //     holeExternalGap       0.4    / 0~20     →  2.0%
  //
  // 최대값이 틀린 게 아니다 — 글자를 200mm 로 키울 수도 있어야 한다. 문제는
  // 트랙을 **선형**으로 나눈 것이다. 실제로 만지는 값은 죄다 아래쪽에 있는데
  // 트랙의 96%를 평생 안 쓸 구간에 내주고 있었다.
  //
  // 그래서 위치 t 를 값으로 옮길 때 제곱을 쓴다.
  //
  //     v = min + (max-min) · t²          (t 는 0~1)
  //
  // 8mm/200mm 짜리가 3.8% → 19.4% 로 온다. 끝값은 그대로다(t=0 → min,
  // t=1 → max) — 눈금만 아래쪽으로 촘촘해진다. 0 을 사이에 둔 범위(회전·좌표)는
  // 0 을 기준으로 양쪽에 따로 건다. 안 그러면 0 근처가 뭉개진다.
  const SLIDER_TRACK = 1000;   // range 는 0~1000 정수 트랙을 쓴다
  const SLIDER_GAMMA = 2;

  function sliderValueAt(t, min, max){
    if (min < 0 && max > 0){
      // 0 이 트랙에서 차지하는 자리를 넓이 비율로 잡고, 양쪽을 따로 편다.
      const share = -min / (max - min);
      if (t <= share) return share ? min * Math.pow(1 - t / share, SLIDER_GAMMA) : min;
      return max * Math.pow((t - share) / (1 - share), SLIDER_GAMMA);
    }
    return min + (max - min) * Math.pow(t, SLIDER_GAMMA);
  }
  function sliderPosOf(v, min, max){
    if (min < 0 && max > 0){
      const share = -min / (max - min);
      if (v <= 0) return share ? share * (1 - Math.pow(v / min, 1 / SLIDER_GAMMA)) : 0;
      return share + (1 - share) * Math.pow(v / max, 1 / SLIDER_GAMMA);
    }
    if (!(max > min)) return 0;
    return Math.pow((v - min) / (max - min), 1 / SLIDER_GAMMA);
  }
  function snapToStep(v, input, min, max){
    const step = Number(input.step) > 0 ? Number(input.step) : 0.1;
    const snapped = Math.round(v / step) * step;
    const digits = (String(step).split('.')[1] || '').length;
    return clamp(Number(snapped.toFixed(digits)), min, max);
  }

  function upgradeNumericInputs(){document.querySelectorAll('input[type="number"]').forEach(input=>{
    if(input.dataset.sliderUpgraded||input.closest('.dual-control-row')?.querySelector('input[type="range"]'))return;
    input.dataset.sliderUpgraded='1';
    const field=input.closest('.field')||input.parentElement;
    if(!field)return;
    field.classList.add('numeric-slider-host');
    const range=document.createElement('input'),wrap=document.createElement('div');
    wrap.className='numeric-slider-popover';
    range.type='range';range.min='0';range.max=String(SLIDER_TRACK);range.step='1';
    // 이름과 읽어 줄 값. 이것이 없으면 화면 낭독기가 "슬라이더" 라고만 읽는다.
    const label=(field.querySelector('span')?.textContent||input.id||'값').trim();
    const unit=(input.closest('.input-with-unit')?.querySelector('em')?.textContent||'').trim();
    range.setAttribute('aria-label',label);
    const describe=()=>range.setAttribute('aria-valuetext',`${input.value}${unit?' '+unit:''}`);
    wrap.appendChild(range);
    const target=input.closest('.input-with-unit')||input;
    target.insertAdjacentElement('afterend',wrap);
    let dragging=false;
    const syncRange=()=>{
      // 끄는 중에는 손잡이를 다시 놓지 않는다. 슬라이더가 숫자칸을 고치고
      // 그 input 이 다시 여기로 돌아오므로, 안 막으면 손끝에서 튄다.
      if(dragging)return;
      const b=numericRangeFor(input);
      range.value=String(Math.round(sliderPosOf(clamp(Number(input.value)||0,b.min,b.max),b.min,b.max)*SLIDER_TRACK));
      describe();
    };
    input.addEventListener('focus',syncRange);
    input.addEventListener('input',syncRange);
    range.addEventListener('pointerdown',()=>{dragging=true;});
    const stop=()=>{dragging=false;syncRange();};
    range.addEventListener('pointerup',stop);
    range.addEventListener('pointercancel',stop);
    range.addEventListener('change',stop);
    range.addEventListener('input',()=>{
      const b=numericRangeFor(input);
      input.value=snapToStep(sliderValueAt(Number(range.value)/SLIDER_TRACK,b.min,b.max),input,b.min,b.max);
      describe();
      input.dispatchEvent(new Event('input',{bubbles:true}));
    });
    syncRange();
  });}

  async function boot() {
    upgradeColorInputs();upgradeNumericInputs();
    setBusy(true);
    try{await loadRepositoryFonts();}catch(error){console.warn('폰트 목록 초기화를 건너뜁니다.',error);}
    let restored=false;
    try{restored=await restoreWorkspace();}catch(error){console.warn('작업 복원을 건너뜁니다.',error);restored=false;}
    applyPreviewBackground();
    updateFinishStyleUi();
    updateFlatBaseUi();
    updateStickerBorderFillUi();
    updateStickerBackgroundUi();
    updateMakerUi();
    updateHoleUi();
    updateStickerHoleUi();
    updateAcrylicSizeSummary();
    setMode(state.mode, { preserveZoom: true, skipGenerate: true });
    selectView(state.view);
    syncStickerSelectionUi();updateMakerUi();drawPreview();
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
  window.addEventListener('goods-maker-layout-change', resizePreviewCanvas);
  new ResizeObserver(resizePreviewCanvas).observe(els.stage);
  boot();
})();
