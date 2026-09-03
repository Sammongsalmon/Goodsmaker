(() => {
  'use strict';

  // v50.17 — 패널 자식을 "하드코딩 숫자 인덱스"로 분류하던 방식을 폐기했다.
  // 인덱스 방식은 index.html 에 요소가 하나 삽입될 때마다 전부 밀리는데, 어긋나도
  // children[n] 이 undefined 라 조용히 통과했다(스티커 quick 의 15 번이 그 사례).
  // 이제는 각 블록 안의 고유 id(없으면 클래스)를 앵커로 삼아 실제 위치를 찾아낸다.
  // CSS 는 [data-detail-node="N"] 을 34 곳에서 쓰므로 N 은 "실제 자식 인덱스"로 계속 내보낸다.
  const MODE_CONFIGS = {
    acrylic: {
      controlId: 'acrylicControls',
      quick: ['#imageStatus', '#singleFileInput', '#acrylicBorderlessBtn', '#acrylicBgRemoveBlock', '#acrylicGuideSlot', '#generateBtn'],
      groups: [
        { id: 'canvas', label: '대지와 그림 크기', nodes: ['#productWidth'] },
        { id: 'cut', label: '재단선과 경계', nodes: ['#acrylicBorderlessFields', '#acrylicBorderedFields', '#colorSampleField', '#includeHoles', '#acrylicNarrowGapField', '#acrylicSealBlock', '#acrylicSeamField', '#acrylicVoidFillBlock', '#acrylicVoidAutoBlock', '#acrylicBleedLassoBlock', '#acrylicBridgeBlock', '#acrylicBorderlessNarrowGapField'] },
        { id: 'base', label: '밑바닥', nodes: ['#addFlatBase', '#flatBaseOptions'] },
        { id: 'holes', label: '타공', nodes: ['#holeList'] }
      ]
    },
    sticker: {
      controlId: 'stickerControls',
      quick: ['#stickerCount', '#multiFileInput', '#stickerBorderlessBtn', '#stickerBorderFillOptions', '#stickerBgRemoveBlock', '#stickerGuideSlot', '#generateStickerBtn'],
      groups: [
        { id: 'canvas', label: '대지 크기', nodes: ['#artboardWidth', '.ratio-template-row'] },
        { id: 'arrange', label: '분리와 자동 배치', nodes: ['#splitThreshold', '#stickerAutoGap'] },
        { id: 'cut', label: '재단선/경계/타공', nodes: ['#stickerBorderlessFields', '#stickerBorderedFields', '#stickerSealBlock', '#stickerBridgeBlock', '#stickerHoleList'] },
        { id: 'background', label: '배경지', nodes: ['#stickerBackgroundEnabled', '#stickerBackgroundOptions'] },
        { id: 'object', label: '선택 개체 편집', nodes: ['#selectionEditor'] }
      ]
    },
    maker: {
      controlId: 'makerControls',
      quick: ['#makerCount', '.maker-purpose-note', '#makerFileInput', '#makerBgRemoveBlock', '#makerAddTextBtn', '#makerPngBackground', '#generateMakerBtn'],
      groups: [
        { id: 'canvas', label: '캔버스와 배경', nodes: ['#makerWidth', '#makerBgColor'] },
        { id: 'object', label: '개체 선택과 편집', nodes: ['#makerSelectedCount', '#makerSelectionEditor'] },
        { id: 'fonts', label: '폰트 관리', nodes: ['#fontCatalogStatus', '#runtimeFontList'] }
      ]
    }
  };

  // 앵커 하나가 정확히 자식 하나로 풀리는지 확인하며 해석한다.
  // 0 개(요소가 사라짐)나 2 개 이상(앵커가 모호함)이면 소리 내어 실패시킨다.
  function resolveAnchor(children, anchor) {
    const matched = children.filter(child => child.matches?.(anchor) || !!child.querySelector?.(anchor));
    if (matched.length === 1) return matched[0];
    console.error(`[layout] 앵커 "${anchor}" 가 자식 ${matched.length} 개에 대응합니다. 분류를 건너뜁니다.`, matched);
    return null;
  }

  const APK_SETTINGS_KEY = 'goods-maker-apk-settings-tab';
  const APK_PREVIEW_HEIGHT_KEY = 'goods-maker-apk-preview-height';
  const APK_LANDSCAPE_WIDTHS_KEY = 'goods-maker-apk-landscape-widths';

  const state = {
    mode: 'acrylic',
    activeGroup: { acrylic: 'canvas', sticker: 'canvas', maker: 'canvas' },
    panels: new Map(),
    appTab: 'quick'
  };

  function element(tag, className, attributes = {}) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    for (const [key, value] of Object.entries(attributes)) {
      if (key === 'text') node.textContent = value;
      else node.setAttribute(key, value);
    }
    return node;
  }

  function createCompactCommandBars(workspace, modePanel, productionPanel) {
    const actions = document.querySelector('.top-actions');
    if (!workspace || !modePanel || !actions) return null;

    const chrome = element('section', 'apk-control-chrome', {
      'aria-label': '제작 모드와 저장 도구'
    });
    const modeBar = element('div', 'apk-mode-bar');
    modePanel.classList.add('apk-mode-toolbar');
    modeBar.append(modePanel);

    const actionBar = element('div', 'apk-action-bar', { 'aria-label': '저장과 실행 기록' });
    const nameField = actions.querySelector('.export-name-field');
    const history = actions.querySelector('.history-actions');
    const reset = actions.querySelector('#resetBtn');
    // v61: 화면(밝게/어둡게) 전환 버튼은 .top-actions 안에 있었는데, 이 함수는
    // 마지막에 .top-actions 를 통째로 지운다. v55 에서 도구줄을 옮길 때 이
    // 버튼만 목록에서 빠져 v54 에 넣은 다크 테마 토글이 화면에서 사라졌다.
    // app.js 는 계속 이 버튼에 이벤트를 걸고 있었으므로, 옮겨 오기만 하면 된다.
    const themeToggle = actions.querySelector('#themeToggleBtn');
    const exportButtons = [
      actions.querySelector('#exportPngBtn'),
      actions.querySelector('#exportJpgBtn'),
      actions.querySelector('#exportSvgBtn'),
      actions.querySelector('#exportPdfBtn'),
      actions.querySelector('#exportGuideBtn'),
      actions.querySelector('#exportAiBtn')
    ].filter(Boolean);

    if (nameField) {
      nameField.classList.add('apk-export-name-field');
      actionBar.append(nameField);
    }
    if (history) {
      history.classList.add('apk-history-actions');
      actionBar.append(history);
    }
    if (reset) {
      reset.classList.add('apk-reset-button');
      reset.title = reset.title || '전체 초기화';
      reset.setAttribute('aria-label', '전체 초기화');
      reset.textContent = '초기화';
      actionBar.append(reset);
    }

    if (themeToggle) {
      themeToggle.classList.add('apk-theme-toggle');
      actionBar.append(themeToggle);
    }

    const saveButton = element('button', 'button primary apk-save-button', {
      id: 'apkSaveMenuBtn',
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': 'false',
      text: '저장'
    });
    actionBar.append(saveButton);
    // 저장·실행기록 줄은 제목이 있던 상단바 자리로 올린다. 폰 화면에서 제목과
    // 설명은 한 줄을 통째로 먹으면서 하는 일이 없다(앱 이름은 런처가 보여 준다).
    // 모드 바만 chrome 에 남는다.
    chrome.append(modeBar);
    workspace.append(chrome);

    const topbar = document.querySelector('.topbar');
    if (topbar) {
      topbar.querySelector('.brand-block')?.remove();
      topbar.classList.add('apk-action-topbar');
      topbar.prepend(actionBar);
    }

    const sheet = element('div', 'apk-export-sheet hidden', {
      id: 'apkExportSheet',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'apkExportSheetTitle',
      'aria-hidden': 'true'
    });
    const backdrop = element('button', 'apk-export-backdrop', {
      type: 'button',
      'aria-label': '저장 창 닫기'
    });
    const card = element('section', 'apk-export-sheet-card');
    const heading = element('div', 'apk-export-sheet-heading');
    heading.append(
      element('div', '', { id: 'apkExportSheetTitle', text: '저장 · 출력' }),
      element('button', 'apk-export-sheet-close', { type: 'button', 'aria-label': '닫기', text: '×' })
    );
    const formats = element('div', 'apk-export-format-grid', { 'aria-label': '저장 형식' });
    for (const button of exportButtons) {
      button.classList.add('apk-export-format-button');
      formats.append(button);
    }
    if (productionPanel) {
      productionPanel.classList.add('apk-export-options');
      card.append(heading, productionPanel, formats);
    } else {
      card.append(heading, formats);
    }
    sheet.append(backdrop, card);
    document.body.append(sheet);

    let lastFocus = null;
    const close = ({ restoreFocus = true } = {}) => {
      if (sheet.classList.contains('hidden')) return;
      sheet.classList.add('hidden');
      sheet.setAttribute('aria-hidden', 'true');
      saveButton.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('apk-export-open');
      if (restoreFocus) lastFocus?.focus?.({ preventScroll: true });
    };
    const open = () => {
      lastFocus = document.activeElement;
      sheet.classList.remove('hidden');
      sheet.setAttribute('aria-hidden', 'false');
      saveButton.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('apk-export-open');
      requestAnimationFrame(() => card.querySelector('button:not([disabled]),input:not([disabled]),select:not([disabled])')?.focus?.({ preventScroll: true }));
    };

    saveButton.addEventListener('click', () => sheet.classList.contains('hidden') ? open() : close());
    backdrop.addEventListener('click', () => close());
    heading.querySelector('.apk-export-sheet-close')?.addEventListener('click', () => close());
    for (const button of exportButtons) button.addEventListener('click', () => setTimeout(() => close({ restoreFocus: false }), 0));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !sheet.classList.contains('hidden')) {
        event.preventDefault();
        close();
      }
    });

    actions.remove();
    return { chrome, sheet, close };
  }

  // ── 데스크톱 웹 전용 ────────────────────────────────────────────────
  // 웹 layout.js 가 쓰던 원래 방식. .top-actions 를 통째로 사이드바 패널로
  // 옮긴다. 앱은 이 자리에 createCompactCommandBars 로 APK 크롬을 세우지만,
  // 넓은 화면에서는 그 크롬이 오히려 읽기 어려워 웹 배치를 그대로 지킨다.
  function createOutputPanel(sidebar) {
    const actions = document.querySelector('.top-actions');
    if (!actions) return;
    const panel = element('section', 'panel compact-panel output-actions-panel');
    const heading = element('div', 'compact-panel-heading');
    heading.append(
      element('strong', '', { text: '저장 · 출력' }),
      element('span', '', { text: '파일 이름, 실행 기록과 내보내기' })
    );
    panel.append(heading, actions);
    sidebar.append(panel);
    document.querySelector('.topbar')?.classList.add('brand-only-topbar');
  }

  function createDetailPanel(mode, config, originalChildren) {
    const panel = element('section', 'detail-mode-panel hidden', { 'data-mode-detail': mode });
    panel.dataset.modeDetail = mode;

    for (const group of config.groups) {
      const details = element('details', 'detail-group');
      details.dataset.detailGroup = group.id;
      details.open = true;
      const summary = element('summary', 'detail-group-summary');
      summary.append(
        element('span', 'detail-group-title', { text: group.label }),
        element('span', 'detail-group-chevron', { text: '⌄' })
      );
      const body = element('div', 'detail-group-body');
      body.dataset.detailLayout = group.id;
      for (const anchor of group.nodes) {
        const node = resolveAnchor(originalChildren, anchor);
        if (!node) continue;
        // CSS 의 [data-detail-node="N"] 규칙과 계속 맞물리도록 원래 자식 순번을 그대로 쓴다.
        node.dataset.detailNode = String(originalChildren.indexOf(node));
        body.append(node);
      }
      details.append(summary, body);
      panel.append(details);
    }

    state.panels.set(mode, panel);
    return panel;
  }

  function splitModePanel(mode, config, detailSidebar) {
    const panel = document.getElementById(config.controlId);
    if (!panel) return;
    const children = [...panel.children];

    panel.classList.add('quick-control-panel', 'apk-quick-section');
    panel.dataset.quickMode = mode;

    const claimed = new Set();
    const quickNodes = [];
    for (const anchor of config.quick) {
      const node = resolveAnchor(children, anchor);
      if (node) { quickNodes.push(node); claimed.add(node); }
    }
    for (const group of config.groups) {
      for (const anchor of group.nodes) {
        const node = resolveAnchor(children, anchor);
        if (node) claimed.add(node);
      }
    }

    // 어디에도 못 들어간 자식은 예전엔 제자리에 남아 패널 "맨 위"로 떠올랐다.
    // (스티커의 '칼선 새로고침' 버튼이 제목 위로 올라가던 원인) 이제 빠른 작업 끝에 붙인다.
    for (const child of children) {
      if (claimed.has(child)) continue;
      console.error(`[layout] ${mode}: 분류되지 않은 블록을 빠른 작업 끝에 붙입니다.`, child);
      quickNodes.push(child);
    }

    // append 는 이동이므로, 이 순서가 곧 빠른 작업 패널의 최종 순서가 된다.
    for (const node of quickNodes) panel.append(node);

    detailSidebar.append(createDetailPanel(mode, config, children));
  }

  function isPortrait() {
    return window.matchMedia('(orientation: portrait)').matches;
  }

  function isCompactAppViewport() {
    return window.matchMedia('(max-width: 900px), (orientation: landscape) and (max-width: 1100px) and (max-height: 700px)').matches;
  }

  function renderTabs() {
    const tabs = document.getElementById('detailModeTabs');
    const panel = state.panels.get(state.mode);
    if (!tabs || !panel) return;
    tabs.replaceChildren();
    const groups = [...panel.querySelectorAll('.detail-group')];
    if (!groups.some(group => group.dataset.detailGroup === state.activeGroup[state.mode])) {
      state.activeGroup[state.mode] = groups[0]?.dataset.detailGroup || '';
    }
    for (const group of groups) {
      const active = group.dataset.detailGroup === state.activeGroup[state.mode];
      const button = element('button', `detail-mode-tab${active ? ' active' : ''}`, {
        type: 'button',
        'data-detail-tab': group.dataset.detailGroup,
        'aria-selected': String(active),
        text: group.querySelector('.detail-group-title')?.textContent || '설정'
      });
      button.addEventListener('click', () => {
        state.activeGroup[state.mode] = group.dataset.detailGroup;
        applyResponsiveGroupState();
        renderTabs();
        requestLayoutRefresh();
      });
      tabs.append(button);
    }
  }

  function applyResponsiveGroupState() {
    const portrait = isPortrait();
    const compact = isCompactAppViewport();
    document.documentElement.classList.toggle('portrait-workspace', portrait);
    document.documentElement.classList.toggle('apk-compact-workspace', compact);
    for (const [mode, panel] of state.panels.entries()) {
      for (const group of panel.querySelectorAll('.detail-group')) {
        const active = group.dataset.detailGroup === state.activeGroup[mode];
        group.classList.toggle('tab-active', !compact || active);
        if (compact) group.open = true;
      }
    }
  }

  function requestLayoutRefresh() {
    window.requestAnimationFrame(() => window.dispatchEvent(new Event('goods-maker-layout-change')));
  }

  function setMode(mode) {
    state.mode = MODE_CONFIGS[mode] ? mode : 'acrylic';
    for (const [key, panel] of state.panels.entries()) {
      panel.classList.toggle('hidden', key !== state.mode);
    }
    const label = document.getElementById('detailPanelModeLabel');
    if (label) {
      label.textContent = ({ acrylic: '코롯토 / 아크릴 세부 설정', sticker: '스티커 대지 세부 설정', maker: '외곽선 / 배경 세부 설정' })[state.mode];
    }
    applyResponsiveGroupState();
    renderTabs();
    requestLayoutRefresh();
  }

  function createAppSettingsTabs(workspace) {
    const nav = element('nav', 'apk-settings-tabs', {
      id: 'apkSettingsTabs',
      role: 'tablist',
      'aria-label': '옵션 영역'
    });
    const tabs = [
      ['quick', '빠른 작업'],
      ['detail', '세부 설정']
    ];
    for (const [value, label] of tabs) {
      const button = element('button', 'apk-settings-tab', {
        type: 'button',
        role: 'tab',
        'data-apk-tab': value,
        'aria-selected': 'false',
        text: label
      });
      button.addEventListener('click', () => setAppSettingsTab(value));
      nav.append(button);
    }
    workspace.append(nav);
    return nav;
  }

  function setAppSettingsTab(tab, persist = true) {
    const value = ['quick', 'detail'].includes(tab) ? tab : 'quick';
    state.appTab = value;
    document.documentElement.dataset.apkSettings = value;
    document.querySelectorAll('[data-apk-tab]').forEach(button => {
      const active = button.dataset.apkTab === value;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    if (persist) {
      try { localStorage.setItem(APK_SETTINGS_KEY, value); } catch (_) {}
    }
    requestLayoutRefresh();
  }

  function setupAppSettingsTabs(workspace) {
    createAppSettingsTabs(workspace);
    let saved = 'quick';
    try { saved = localStorage.getItem(APK_SETTINGS_KEY) || 'quick'; } catch (_) {}
    setAppSettingsTab(saved, false);
  }

  function setupPreviewResize(stage) {
    const handle = element('button', 'apk-preview-resize-handle', {
      type: 'button',
      'aria-label': '미리보기 높이 조절',
      'aria-orientation': 'vertical'
    });
    handle.append(element('span', '', { 'aria-hidden': 'true' }));
    stage.append(handle);

    const portraitMedia = window.matchMedia('(max-width: 900px) and (orientation: portrait)');
    let currentHeight = null;
    try {
      const saved = Number(localStorage.getItem(APK_PREVIEW_HEIGHT_KEY));
      if (Number.isFinite(saved) && saved > 0) currentHeight = saved;
    } catch (_) {}

    const limits = () => {
      const workspace = document.querySelector('.workspace');
      const height = workspace?.getBoundingClientRect().height || window.innerHeight;
      return { min: 190, max: Math.max(230, Math.min(520, Math.round(height * 0.62))) };
    };

    const applyHeight = (height, persist = false) => {
      const { min, max } = limits();
      currentHeight = Math.round(Math.max(min, Math.min(max, Number(height) || min)));
      document.documentElement.style.setProperty('--apk-preview-height', `${currentHeight}px`);
      handle.setAttribute('aria-valuemin', String(min));
      handle.setAttribute('aria-valuemax', String(max));
      handle.setAttribute('aria-valuenow', String(currentHeight));
      if (persist) {
        try { localStorage.setItem(APK_PREVIEW_HEIGHT_KEY, String(currentHeight)); } catch (_) {}
      }
      requestLayoutRefresh();
    };

    if (currentHeight) applyHeight(currentHeight, false);

    handle.addEventListener('pointerdown', event => {
      if (!portraitMedia.matches) return;
      event.preventDefault();
      event.stopPropagation();
      const startY = event.clientY;
      const startHeight = stage.getBoundingClientRect().height;
      handle.classList.add('dragging');
      try { handle.setPointerCapture(event.pointerId); } catch (_) {}

      const move = moveEvent => {
        if (moveEvent.pointerId !== event.pointerId) return;
        moveEvent.preventDefault();
        applyHeight(startHeight + (moveEvent.clientY - startY), false);
      };
      const finish = upEvent => {
        if (upEvent.pointerId !== event.pointerId) return;
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', finish);
        handle.removeEventListener('pointercancel', finish);
        handle.classList.remove('dragging');
        try { handle.releasePointerCapture(event.pointerId); } catch (_) {}
        if (currentHeight) applyHeight(currentHeight, true);
      };
      handle.addEventListener('pointermove', move, { passive: false });
      handle.addEventListener('pointerup', finish, { passive: false });
      handle.addEventListener('pointercancel', finish, { passive: false });
    }, { passive: false });

    handle.addEventListener('keydown', event => {
      if (!portraitMedia.matches || !['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const { min, max } = limits();
      const base = currentHeight || stage.getBoundingClientRect().height;
      const next = event.key === 'Home' ? min : event.key === 'End' ? max : base + (event.key === 'ArrowDown' ? 12 : -12);
      applyHeight(next, true);
    });

    window.addEventListener('resize', () => {
      if (currentHeight && portraitMedia.matches) applyHeight(currentHeight, false);
    }, { passive: true });
  }

  function setupLandscapeWidthResize(workspace, stage, primarySidebar, detailSidebar) {
    const leftHandle = element('button', 'apk-landscape-resize-handle apk-landscape-resize-left', {
      type: 'button',
      'aria-label': '미리보기 왼쪽 경계 조절',
      'aria-orientation': 'vertical'
    });
    const rightHandle = element('button', 'apk-landscape-resize-handle apk-landscape-resize-right', {
      type: 'button',
      'aria-label': '미리보기 오른쪽 경계 조절',
      'aria-orientation': 'vertical'
    });
    leftHandle.append(element('span', '', { 'aria-hidden': 'true' }));
    rightHandle.append(element('span', '', { 'aria-hidden': 'true' }));
    stage.append(leftHandle, rightHandle);

    const landscapeMedia = window.matchMedia('(orientation: landscape)');
    // v112: 좁은 가로의 기준을 "높이 700 이하" 가 아니라 **폭 1100 이하** 로 바꿨다.
    // 1000×900 처럼 폭은 좁고 높이는 큰 가로 화면이 어느 쪽에도 안 걸려,
    // .workspace 가 세 칸을 잡아 놓고 세부 설정은 숨겨진 채 한 칸을 통째로
    // 비워 두고 있었다(세부 설정에 닿을 길도 없었다). CSS 와 조건을 맞춘다.
    const compactLandscapeMedia = window.matchMedia('(max-width: 1100px) and (orientation: landscape)');
    const values = { preview: null, primary: null, detail: null };

    try {
      const saved = JSON.parse(localStorage.getItem(APK_LANDSCAPE_WIDTHS_KEY) || '{}');
      for (const key of Object.keys(values)) {
        const value = Number(saved[key]);
        if (Number.isFinite(value) && value > 0) values[key] = value;
      }
    } catch (_) {}

    const workspaceWidth = () => Math.max(1, workspace.getBoundingClientRect().width || window.innerWidth);
    const compactLimits = () => {
      const width = workspaceWidth();
      const min = Math.max(230, Math.min(320, Math.round(width * 0.34)));
      const settingsMin = Math.max(230, Math.min(310, Math.round(width * 0.32)));
      return { min, max: Math.max(min, width - settingsMin) };
    };
    const wideMinimumStage = () => Math.max(320, Math.min(520, Math.round(workspaceWidth() * 0.32)));
    const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || min));

    const persist = () => {
      try { localStorage.setItem(APK_LANDSCAPE_WIDTHS_KEY, JSON.stringify(values)); } catch (_) {}
    };

    const updateAria = () => {
      const compact = compactLandscapeMedia.matches;
      if (compact) {
        const { min, max } = compactLimits();
        rightHandle.setAttribute('aria-valuemin', String(min));
        rightHandle.setAttribute('aria-valuemax', String(max));
        rightHandle.setAttribute('aria-valuenow', String(Math.round(values.preview || stage.getBoundingClientRect().width)));
        return;
      }
      const width = workspaceWidth();
      const minStage = wideMinimumStage();
      const primary = values.primary || primarySidebar.getBoundingClientRect().width;
      const detail = values.detail || detailSidebar.getBoundingClientRect().width;
      leftHandle.setAttribute('aria-valuemin', '220');
      leftHandle.setAttribute('aria-valuemax', String(Math.max(220, Math.round(width - detail - minStage))));
      leftHandle.setAttribute('aria-valuenow', String(Math.round(primary)));
      rightHandle.setAttribute('aria-valuemin', '240');
      rightHandle.setAttribute('aria-valuemax', String(Math.max(240, Math.round(width - primary - minStage))));
      rightHandle.setAttribute('aria-valuenow', String(Math.round(detail)));
    };

    // v110: 값만 넣어서는 안 먹는다. 뒤에 오는 "넓은 화면" 규칙이 같은 특이성으로
    // .workspace 의 열 너비를 못박아 두고 있어서, 여기서 넣는 변수는 계산에도
    // 안 들어갔다. 클래스를 하나 붙여 특이성을 올린다.
    const markTuned = () => document.documentElement.classList.add('apk-landscape-tuned');

    const applyCompact = (next, save = false) => {
      const { min, max } = compactLimits();
      values.preview = Math.round(clamp(next, min, max));
      markTuned();
      document.documentElement.style.setProperty('--apk-landscape-preview-width', `${values.preview}px`);
      if (save) persist();
      updateAria();
      requestLayoutRefresh();
    };

    const applyWide = (nextPrimary, nextDetail, save = false) => {
      const width = workspaceWidth();
      const maxCombined = Math.max(460, width - wideMinimumStage());
      let primary = clamp(nextPrimary, 220, Math.max(220, maxCombined - 240));
      let detail = clamp(nextDetail, 240, Math.max(240, maxCombined - 220));
      if (primary + detail > maxCombined) {
        const overflow = primary + detail - maxCombined;
        if (nextPrimary !== values.primary) primary = Math.max(220, primary - overflow);
        else detail = Math.max(240, detail - overflow);
      }
      values.primary = Math.round(primary);
      values.detail = Math.round(detail);
      markTuned();
      document.documentElement.style.setProperty('--apk-landscape-primary-width', `${values.primary}px`);
      document.documentElement.style.setProperty('--apk-landscape-detail-width', `${values.detail}px`);
      if (save) persist();
      updateAria();
      requestLayoutRefresh();
    };

    const restoreForViewport = () => {
      if (!landscapeMedia.matches) return;
      if (compactLandscapeMedia.matches) {
        if (values.preview) applyCompact(values.preview, false);
      } else if (values.primary || values.detail) {
        const primary = values.primary || primarySidebar.getBoundingClientRect().width;
        const detail = values.detail || detailSidebar.getBoundingClientRect().width;
        applyWide(primary, detail, false);
      }
      updateAria();
    };

    const beginDrag = (handle, side, event) => {
      if (!landscapeMedia.matches || (event.pointerType === 'mouse' && event.button !== 0)) return;
      if (compactLandscapeMedia.matches && side === 'left') return;
      event.preventDefault();
      event.stopPropagation();
      const compact = compactLandscapeMedia.matches;
      const startX = event.clientX;
      const startPreview = stage.getBoundingClientRect().width;
      const startPrimary = primarySidebar.getBoundingClientRect().width;
      const startDetail = detailSidebar.getBoundingClientRect().width;
      handle.classList.add('dragging');
      document.documentElement.classList.add('apk-landscape-resizing');
      try { handle.setPointerCapture(event.pointerId); } catch (_) {}

      const move = moveEvent => {
        if (moveEvent.pointerId !== event.pointerId) return;
        moveEvent.preventDefault();
        const dx = moveEvent.clientX - startX;
        if (compact) applyCompact(startPreview + dx, false);
        else if (side === 'left') applyWide(startPrimary + dx, startDetail, false);
        else applyWide(startPrimary, startDetail - dx, false);
      };
      const finish = upEvent => {
        if (upEvent.pointerId !== event.pointerId) return;
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', finish);
        handle.removeEventListener('pointercancel', finish);
        handle.classList.remove('dragging');
        document.documentElement.classList.remove('apk-landscape-resizing');
        try { handle.releasePointerCapture(event.pointerId); } catch (_) {}
        persist();
        requestLayoutRefresh();
      };
      handle.addEventListener('pointermove', move, { passive: false });
      handle.addEventListener('pointerup', finish, { passive: false });
      handle.addEventListener('pointercancel', finish, { passive: false });
    };

    leftHandle.addEventListener('pointerdown', event => beginDrag(leftHandle, 'left', event), { passive: false });
    rightHandle.addEventListener('pointerdown', event => beginDrag(rightHandle, 'right', event), { passive: false });

    const keyboardResize = (side, event) => {
      if (!landscapeMedia.matches || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      if (compactLandscapeMedia.matches && side === 'left') return;
      event.preventDefault();
      const dx = event.key === 'ArrowLeft' ? -16 : event.key === 'ArrowRight' ? 16 : 0;
      if (compactLandscapeMedia.matches) {
        const { min, max } = compactLimits();
        const current = values.preview || stage.getBoundingClientRect().width;
        applyCompact(event.key === 'Home' ? min : event.key === 'End' ? max : current + dx, true);
        return;
      }
      const currentPrimary = values.primary || primarySidebar.getBoundingClientRect().width;
      const currentDetail = values.detail || detailSidebar.getBoundingClientRect().width;
      if (side === 'left') {
        const max = workspaceWidth() - currentDetail - wideMinimumStage();
        applyWide(event.key === 'Home' ? 220 : event.key === 'End' ? max : currentPrimary + dx, currentDetail, true);
      } else {
        const max = workspaceWidth() - currentPrimary - wideMinimumStage();
        applyWide(currentPrimary, event.key === 'Home' ? max : event.key === 'End' ? 240 : currentDetail - dx, true);
      }
    };
    leftHandle.addEventListener('keydown', event => keyboardResize('left', event));
    rightHandle.addEventListener('keydown', event => keyboardResize('right', event));

    landscapeMedia.addEventListener?.('change', restoreForViewport);
    compactLandscapeMedia.addEventListener?.('change', restoreForViewport);
    window.addEventListener('resize', restoreForViewport, { passive: true });
    requestAnimationFrame(restoreForViewport);
  }

  function installThumbOnlyRanges() {
    const touchInput = Number(navigator.maxTouchPoints || 0) > 0
      || window.matchMedia('(any-pointer: coarse)').matches
      || 'ontouchstart' in window;
    if (!touchInput) return;

    document.documentElement.classList.add('thumb-drag-only');

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const decimalsForStep = step => {
      const text = String(step);
      if (text.includes('e-')) return Number(text.split('e-')[1]) || 0;
      const decimal = text.indexOf('.');
      return decimal < 0 ? 0 : text.length - decimal - 1;
    };

    const geometry = range => {
      const rect = range.getBoundingClientRect();
      const min = Number(range.min || 0);
      const max = Number(range.max || 100);
      const value = Number(range.value || min);
      const thumbSize = 18;
      const usable = Math.max(1, rect.width - thumbSize);
      const ratio = max === min ? 0 : clamp((value - min) / (max - min), 0, 1);
      return {
        rect,
        min,
        max,
        thumbSize,
        usable,
        centerX: rect.left + thumbSize / 2 + ratio * usable,
        centerY: rect.top + rect.height / 2
      };
    };

    const applyPointerValue = (range, clientX, grabOffset) => {
      const { rect, min, max, thumbSize, usable } = geometry(range);
      const centerX = clientX - grabOffset;
      const ratio = clamp((centerX - rect.left - thumbSize / 2) / usable, 0, 1);
      const stepText = range.getAttribute('step');
      const step = stepText === 'any' ? 0 : Number(stepText || 1);
      let next = min + ratio * (max - min);
      if (Number.isFinite(step) && step > 0) {
        next = min + Math.round((next - min) / step) * step;
        next = Number(next.toFixed(decimalsForStep(step)));
      }
      next = clamp(next, min, max);
      const previous = range.value;
      range.value = String(next);
      if (range.value === previous) return false;
      range.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    };

    const decorate = range => {
      if (!(range instanceof HTMLInputElement) || range.type !== 'range') return;
      if (range.closest('.range-touch-shell')) return;

      const shell = element('span', 'range-touch-shell');
      range.parentNode.insertBefore(shell, range);
      shell.append(range);

      let drag = null;
      let suppressClick = false;

      const finish = (event, cancelled = false) => {
        if (!drag || (event.pointerId != null && event.pointerId !== drag.pointerId)) return;
        event.preventDefault();
        event.stopPropagation();
        const changed = drag.changed;
        const pointerId = drag.pointerId;
        drag = null;
        shell.classList.remove('dragging');
        try { shell.releasePointerCapture(pointerId); } catch (_) {}
        if (changed && !cancelled) range.dispatchEvent(new Event('change', { bubbles: true }));
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 0);
      };

      shell.addEventListener('pointerdown', event => {
        if (range.disabled || (event.pointerType === 'mouse' && event.button !== 0)) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        try { range.focus({ preventScroll: true }); } catch (_) { range.focus(); }

        const { centerX, centerY } = geometry(range);
        const hitX = 22;
        const hitY = 24;
        if (Math.abs(event.clientX - centerX) > hitX || Math.abs(event.clientY - centerY) > hitY) {
          suppressClick = true;
          return;
        }

        drag = {
          pointerId: event.pointerId,
          grabOffset: event.clientX - centerX,
          startX: event.clientX,
          started: false,
          changed: false
        };
        shell.classList.add('dragging');
        try { shell.setPointerCapture(event.pointerId); } catch (_) {}
      }, { passive: false });

      shell.addEventListener('pointermove', event => {
        if (!drag || event.pointerId !== drag.pointerId) return;
        event.preventDefault();
        event.stopPropagation();
        if (!drag.started) {
          if (Math.abs(event.clientX - drag.startX) < 4) return;
          drag.started = true;
        }
        drag.changed = applyPointerValue(range, event.clientX, drag.grabOffset) || drag.changed;
      }, { passive: false });

      shell.addEventListener('pointerup', event => finish(event, false), { passive: false });
      shell.addEventListener('pointercancel', event => finish(event, true), { passive: false });
      shell.addEventListener('lostpointercapture', event => {
        if (drag && event.pointerId === drag.pointerId) finish(event, false);
      }, { passive: false });
      shell.addEventListener('click', event => {
        if (!suppressClick && event.detail === 0) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }, true);
    };

    const scan = (root = document) => {
      if (root instanceof HTMLInputElement && root.type === 'range') decorate(root);
      root.querySelectorAll?.('input[type="range"]').forEach(decorate);
    };

    scan();
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node instanceof Element) scan(node);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    const workspace = document.querySelector('.workspace');
    const sidebar = document.querySelector('.sidebar');
    const stage = document.querySelector('.stage-column');
    if (!workspace || !sidebar || !stage) return;

    // 좁은 화면(폰)에서는 앱과 같은 APK 크롬을, 넓은 화면에서는 웹의 원래
    // 배치를 쓴다. 스타일은 style.css 가 양쪽에 공통으로 적용하므로 여기서
    // 갈라지는 것은 "무엇을 어디에 놓느냐" 뿐이다.
    const compact = isCompactAppViewport();
    if (compact) document.documentElement.classList.add('apk-runtime');
    document.documentElement.classList.toggle('web-desktop-runtime', !compact);
    sidebar.classList.add('primary-sidebar');

    const detailSidebar = element('aside', 'detail-sidebar');
    detailSidebar.id = 'detailSidebar';
    const detailHeader = element('div', 'detail-sidebar-header');
    detailHeader.append(
      element('div', 'detail-sidebar-title', { id: 'detailPanelModeLabel', text: '코롯토 / 아크릴 세부 설정' }),
      element('div', 'detail-mode-tabs', { id: 'detailModeTabs', role: 'tablist', 'aria-label': '세부 설정 분류' })
    );
    const detailBody = element('div', 'detail-sidebar-body');
    detailSidebar.append(detailHeader, detailBody);

    for (const [mode, config] of Object.entries(MODE_CONFIGS)) {
      splitModePanel(mode, config, detailBody);
    }

    workspace.append(detailSidebar);

    const modePanel = document.querySelector('.mode-panel');
    const production = document.getElementById('productionOptionsPanel');
    if (compact) {
      createCompactCommandBars(workspace, modePanel, production);
      // 아래 넷은 전부 APK 크롬에 딸린 것이다. 데스크톱에서는 마우스로 충분하고
      // 웹 배치에 붙일 자리도 없다.
      setupAppSettingsTabs(workspace);
      setupPreviewResize(stage);
      setupLandscapeWidthResize(workspace, stage, sidebar, detailSidebar);
      installThumbOnlyRanges();
    } else {
      // 넓은 화면은 제목 줄을 그대로 두고, 저장·출력만 사이드바 패널로 옮긴다.
      // (앱은 v68 에서 제목 줄을 없앴지만 그 처리는 createCompactCommandBars
      //  안에 있어 이 경로에서는 실행되지 않는다)
      createOutputPanel(sidebar);
      if (production) sidebar.append(production);
    }

    const media = window.matchMedia('(orientation: portrait)');
    const compactMedia = window.matchMedia('(max-width: 900px), (orientation: landscape) and (max-width: 1100px) and (max-height: 700px)');
    const onViewportChange = () => {
      applyResponsiveGroupState();
      renderTabs();
      requestLayoutRefresh();
    };
    media.addEventListener?.('change', onViewportChange);
    compactMedia.addEventListener?.('change', onViewportChange);
    window.addEventListener('resize', onViewportChange, { passive: true });

    // 데스크톱 배치와 APK 크롬은 DOM 구조 자체가 다르다. splitModePanel 이
    // 패널을 파괴적으로 재배치해 그 자리에서 되돌릴 수 없다. 창을 끌어 경계를
    // 넘었을 때만(폰에서는 일어나지 않는다) 한 번 다시 그린다.
    let lastCompact = compact;
    compactMedia.addEventListener?.('change', () => {
      const now = isCompactAppViewport();
      if (now === lastCompact) return;
      lastCompact = now;
      window.location.reload();
    });

    setMode('acrylic');
    window.GoodsMakerLayout = {
      setMode,
      refresh: onViewportChange,
      setAppSettingsTab
    };
  }

  init();
})();
