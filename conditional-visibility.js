(() => {
  'use strict';

  const byId = id => document.getElementById(id);
  const closestField = id => byId(id)?.closest('.field, label, .choice-block, .nested-options');
  let syncing = false;

  function setVisible(target, visible) {
    const element = typeof target === 'string' ? byId(target) : target;
    if (!element) return;
    const hidden = !visible;
    if (element.hidden !== hidden) element.hidden = hidden;
    element.classList.toggle('hidden', hidden);
    // A few legacy layout selectors are more specific than .hidden.
    // Inline display is used only while hidden and removed again when active.
    if (hidden) element.style.setProperty('display', 'none', 'important');
    else element.style.removeProperty('display');
    element.setAttribute('aria-hidden', String(hidden));
  }

  function activeType(entries, fallback) {
    const selected = entries.find(([id]) => byId(id)?.classList.contains('active'));
    return selected?.[1] || fallback;
  }

  function syncPattern(prefix, enabled) {
    const isSticker = prefix === 'sticker';
    const id = name => `${prefix}${name}`;
    const kind = byId(id('PatternKind'))?.value || 'image';
    const imagePattern = enabled && kind === 'image';
    const linePattern = enabled && ['square-grid', 'diagonal-grid', 'stripes'].includes(kind);
    const particlePattern = enabled && !linePattern;
    const backgroundType = byId(id('PatternBackgroundType'))?.value || 'color';
    const gradientBackground = enabled && backgroundType === 'gradient';
    const sizeMode = byId(id('PatternSizeMode'))?.value || 'fixed';
    const positionMode = byId(id('PatternPositionMode'))?.value || 'aligned';
    const layout = byId(id('PatternLayout'))?.value || 'square';
    const rotationMode = byId(id('PatternRotationMode'))?.value || 'fixed';

    setVisible(id('PatternTemplateColors'), enabled);
    setVisible(id('PatternSolidColorField'), enabled && !gradientBackground);
    setVisible(id('PatternGradientFields'), gradientBackground);
    setVisible(closestField(id('PatternFgColor')), enabled && !imagePattern);

    setVisible(id('PatternFileLabel'), imagePattern);
    setVisible(id('PatternLineFields'), linePattern);
    // Size and spacing are shared by particles and line/grid patterns.
    setVisible(id('PatternParticleFields'), enabled);
    setVisible(id('PatternRandomizationFields'), particlePattern);

    const randomSize = particlePattern && sizeMode === 'random';
    setVisible(id('PatternBaseSizeField'), enabled && (linePattern || !randomSize));
    setVisible(id('PatternRandomSizeFields'), randomSize);

    const randomPosition = particlePattern && (positionMode === 'random' || layout === 'random');
    setVisible(id('PatternRandomPositionFields'), randomPosition);
    setVisible(closestField(id('PatternLayout')), particlePattern);
    setVisible(id('PatternOrderField'), imagePattern);
    setVisible(closestField(id('PatternRotationMode')), particlePattern);
    setVisible(id('PatternFixedRotationFields'), particlePattern && rotationMode !== 'random');
    setVisible(id('PatternRandomRotationFields'), particlePattern && rotationMode === 'random');

    const patternRoot = byId(isSticker ? 'stickerBackgroundPatternFields' : 'makerBgPatternFields');
    const directHelp = patternRoot
      ? [...patternRoot.children].find(node => node.classList?.contains('field-help'))
      : null;
    setVisible(directHelp, imagePattern);
  }

  function syncSticker() {
    const enabled = !!byId('stickerBackgroundEnabled')?.checked;
    const type = activeType([
      ['stickerBackgroundColorBtn', 'color'],
      ['stickerBackgroundGradientBtn', 'gradient'],
      ['stickerBackgroundImageBtn', 'image'],
      ['stickerBackgroundPatternBtn', 'pattern']
    ], 'color');

    setVisible('stickerBackgroundOptions', enabled);
    setVisible('stickerBackgroundColorField', enabled && type === 'color');
    setVisible('stickerBackgroundGradientFields', enabled && type === 'gradient');
    setVisible('stickerBackgroundImageFields', enabled && type === 'image');
    setVisible('stickerBackgroundPatternFields', enabled && type === 'pattern');
    setVisible(
      'stickerBackgroundCustomFields',
      enabled && type === 'image' && byId('stickerBackgroundFit')?.value === 'custom'
    );
    syncPattern('sticker', enabled && type === 'pattern');
  }

  function syncMakerBackground() {
    const type = activeType([
      ['makerBgTransparentBtn', 'transparent'],
      ['makerBgColorBtn', 'color'],
      ['makerBgGradientBtn', 'gradient'],
      ['makerBgImageBtn', 'image'],
      ['makerBgPatternBtn', 'pattern']
    ], 'transparent');

    setVisible('makerBgColorField', type === 'color');
    setVisible('makerBgGradientFields', type === 'gradient');
    setVisible('makerBgImageFields', type === 'image');
    setVisible('makerBgPatternFields', type === 'pattern');
    setVisible(
      'makerBackgroundCustomFields',
      type === 'image' && byId('makerBackgroundFit')?.value === 'custom'
    );
    syncPattern('maker', type === 'pattern');
  }

  // v50.17 — 예전에는 상태 알약의 "2개 선택 · 그룹" 같은 표시 문구를 정규식으로 되읽었다.
  // 그 탓에 문서 전체를 characterData 까지 감시해야 했고, 문구를 손대면 조용히 어긋났다.
  // 이제 app.js 가 selected.length 와 개체 종류를 data-* 로 직접 적어 준다.
  function selectedCount() {
    const editor = byId('makerSelectionEditor');
    const raw = editor?.dataset.selectedCount ?? byId('makerSelectedCount')?.dataset.count;
    const value = Number(raw);
    return Number.isFinite(value) ? value : 0;
  }

  function selectedObjectType() {
    const editor = byId('makerSelectionEditor');
    if (!editor || editor.classList.contains('empty')) return null;
    const value = (editor.dataset.objectType || '').trim().toLowerCase();
    return ['image', 'text', 'shape'].includes(value) ? value : null;
  }

  function syncEffectCards() {
    document.querySelectorAll('#makerEffectList .effect-layer-card').forEach(card => {
      const enabled = card.querySelector('input[data-effect-field="enabled"]');
      const body = card.children[1];
      setVisible(body, !enabled || enabled.checked);
    });
  }

  function syncObjectEditor() {
    const editor = byId('makerSelectionEditor');
    if (!editor) return;

    const count = selectedCount();
    const type = selectedObjectType();
    const hasSelection = count > 0 && !!type;
    const single = count === 1 && hasSelection;
    const isImage = single && type === 'image';
    const isText = single && type === 'text';
    const isShape = single && type === 'shape';

    setVisible(editor.querySelector('.empty-copy'), !hasSelection);
    setVisible(editor.querySelector('.selection-fields'), hasSelection);

    // Individual geometry values are meaningful only for one selected object.
    const selectionFields = editor.querySelector('.selection-fields');
    const directGrids = selectionFields
      ? [...selectionFields.children].filter(node => node.matches?.('.field-grid.two')).slice(0, 3)
      : [];
    directGrids.forEach(grid => setVisible(grid, single));

    setVisible(closestField('makerAspectMode'), isImage);
    setVisible('makerTextFields', isText);
    setVisible('makerShapeFields', isShape);
    setVisible('makerFillFields', isText || isShape);

    // Text-only conditional settings.
    setVisible(
      'makerTextBackgroundFields',
      isText && !!byId('makerTextBackgroundEnabled')?.checked
    );

    // Shape/line-only conditional settings.
    const shapeKind = byId('makerShapeKind')?.value || 'rect';
    const isLine = isShape && shapeKind === 'line';
    setVisible('makerShapeGeometryFields', isShape && !isLine);
    setVisible('makerLineFields', isLine);
    setVisible('makerCornerRadiusField', isShape && shapeKind === 'rect');
    const strokeWidth = Number(byId('makerShapeStrokeWidth')?.value || 0);
    setVisible(closestField('makerShapeStrokeColor'), isShape && !isLine && strokeWidth > 0);

    // Fill-type details are mutually exclusive.
    const hasFill = isText || isShape;
    const fillType = byId('makerObjectFillType')?.value || 'color';
    setVisible('makerObjectFillColorField', hasFill && fillType === 'color');
    setVisible('makerObjectGradientFields', hasFill && fillType === 'gradient');
    setVisible('makerObjectPatternFields', hasFill && fillType === 'pattern');

    // v50.17 — 예전에는 조건이 안 맞으면 이 버튼들을 hidden 으로 없애 버려서,
    // 그룹화 기능이 있다는 사실 자체를 발견할 수 없었고 누를 때마다 줄이 접혔다 펴졌다 했다.
    // 이제는 자리를 지킨 채 비활성으로만 두고, 왜 못 누르는지 툴팁으로 알려 준다.
    const hint = (button, reason) => {
      if (!button) return;
      setVisible(button, true);
      button.title = button.disabled ? reason : '';
    };
    hint(byId('makerGroupBtn'), '개체를 2개 이상 선택하면 그룹으로 묶을 수 있습니다.');
    hint(byId('makerUngroupBtn'), '그룹으로 묶인 개체를 선택하면 해제할 수 있습니다.');
    hint(byId('makerApplyEffectsAllBtn'), '개체가 2개 이상이고 하나를 선택했을 때 사용할 수 있습니다.');

    syncEffectCards();
  }

  // v89 — 배경 투명화 패널의 "고른 것에만 적용".
  //
  // 이 옵션은 대상이 여러 장일 때만 뜻이 있다. 코롯토/아크릴은 원본이 한 장뿐이라
  // (bgTargets 도 아크릴에서는 이 값을 아예 안 본다) 켜도 꺼도 결과가 같다.
  // 그래서 코롯토에서만 체크박스를 접고, 그 자리는 옆의 "투명화 적용" 버튼이 쓴다.
  //
  // 판단은 여기서만 한다 — app.js 는 패널을 어느 모드 블록에 넣었는지만
  // #bgRemovePanel 의 data-bg-mode 로 알려 준다 (이 파일의 규약: 상태는 data-*).
  function syncBgPanel() {
    const panel = byId('bgRemovePanel');
    if (!panel) return;
    const mode = panel.dataset.bgMode || '';
    setVisible('bgRemoveScope', mode !== 'acrylic');
  }

  function syncNow() {
    syncing = false;
    syncSticker();
    syncMakerBackground();
    syncObjectEditor();
    syncBgPanel();
  }

  function scheduleSync() {
    if (syncing) return;
    syncing = true;
    requestAnimationFrame(syncNow);
  }

  const relevantIds = new Set([
    'stickerBackgroundEnabled',
    'stickerBackgroundColorBtn', 'stickerBackgroundGradientBtn', 'stickerBackgroundImageBtn', 'stickerBackgroundPatternBtn',
    'stickerBackgroundFit', 'stickerPatternKind', 'stickerPatternBackgroundType', 'stickerPatternSizeMode',
    'stickerPatternPositionMode', 'stickerPatternLayout', 'stickerPatternRotationMode',
    'makerBgTransparentBtn', 'makerBgColorBtn', 'makerBgGradientBtn', 'makerBgImageBtn', 'makerBgPatternBtn',
    'makerBackgroundFit', 'makerPatternKind', 'makerPatternBackgroundType', 'makerPatternSizeMode',
    'makerPatternPositionMode', 'makerPatternLayout', 'makerPatternRotationMode',
    'makerSelectionEditor', 'makerSelectedCount', 'makerObjectTypeEyebrow',
    'makerTextBackgroundEnabled', 'makerShapeKind', 'makerShapeStrokeWidth', 'makerObjectFillType',
    'makerGroupBtn', 'makerUngroupBtn', 'makerApplyEffectsAllBtn', 'makerEffectList'
  ]);

  function eventTouchesRelevantControl(event) {
    const target = event.target instanceof Element ? event.target.closest('button, label, input, select, textarea') : null;
    if (!target) return false;
    if (relevantIds.has(target.id)) return true;
    return [...target.querySelectorAll?.('[id]') || []].some(node => relevantIds.has(node.id));
  }

  document.addEventListener('click', event => {
    if (eventTouchesRelevantControl(event) || event.target.closest?.('#makerSelectionEditor, #makerEffectList')) {
      scheduleSync();
      setTimeout(scheduleSync, 0);
    }
  });
  document.addEventListener('change', event => {
    if (relevantIds.has(event.target.id) || event.target.closest?.('#makerSelectionEditor, #makerEffectList')) {
      scheduleSync();
    }
  });
  document.addEventListener('input', event => {
    if (relevantIds.has(event.target.id)) scheduleSync();
  });
  window.addEventListener('goods-maker-layout-change', scheduleSync);
  window.addEventListener('load', scheduleSync, { once: true });

  // v50.18 — 조건부 표시의 단일 창구.
  // 예전에는 app.js 가 같은 46 개 요소에 대해 자기 나름의 hidden 토글을 따로 돌렸고,
  // 이 파일이 인라인 !important 로 그 위에 덮어써서 항상 이겼다. 두 규칙이 어긋나는
  // 곳(예: 여러 개 선택 시 글상자 패널)에서는 app.js 의 의도가 조용히 무시됐다.
  // 이제 판단은 여기서만 하고, app.js 는 상태를 바꾼 뒤 sync() 를 부르기만 한다.
  window.GoodsMakerVisibility = { sync: syncNow, schedule: scheduleSync };

  // v50.17 — 예전에는 document.documentElement 를 subtree + characterData 로 통째 감시했다.
  // 개체를 끄는 동안 상태 문구가 갱신될 때마다 콜백이 돌아 모바일에서 값을 치렀다.
  // 상태를 data-* 로 읽게 바꾼 덕분에 관심 영역과 속성만 보면 된다.
  const OBSERVED_ROOTS = [
    '#bgRemovePanel',
    '#stickerBackgroundOptions',
    '#stickerControls',
    '.maker-background-block',
    '#makerSelectionEditor',
    '#makerEffectList',
    '#makerControls'
  ];
  const observer = new MutationObserver(() => scheduleSync());
  const observeOptions = {
    subtree: true,
    attributes: true,
    childList: true,
    attributeFilter: ['class', 'checked', 'hidden', 'disabled', 'aria-pressed', 'data-object-type', 'data-selected-count', 'data-count', 'data-bg-mode']
  };
  const observed = new WeakSet();
  function observeRoots() {
    for (const selector of OBSERVED_ROOTS) {
      for (const node of document.querySelectorAll(selector)) {
        if (observed.has(node)) continue;
        observed.add(node);
        observer.observe(node, observeOptions);
      }
    }
  }

  observeRoots();
  syncNow();
  // layout.js 가 패널을 세부 사이드바로 옮긴 뒤에도 같은 노드를 계속 보게 다시 건다.
  window.addEventListener('goods-maker-layout-change', observeRoots);
  requestAnimationFrame(() => { observeRoots(); scheduleSync(); });
})();
