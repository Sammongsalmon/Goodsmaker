(() => {
  'use strict';

  const MODE_CONFIGS = {
    acrylic: {
      controlId: 'acrylicControls',
      quick: [0, 1, 3, 11],
      groups: [
        { id: 'canvas', label: '대지와 그림 크기', nodes: [2] },
        { id: 'cut', label: '재단선과 경계', nodes: [4, 5, 6, 7] },
        { id: 'base', label: '밑바닥', nodes: [8, 9] },
        { id: 'holes', label: '타공', nodes: [10] }
      ]
    },
    sticker: {
      controlId: 'stickerControls',
      quick: [0, 1, 6, 9, 14],
      groups: [
        { id: 'canvas', label: '대지 크기', nodes: [2, 3] },
        { id: 'arrange', label: '분리와 자동 배치', nodes: [4, 5] },
        { id: 'cut', label: '재단선과 경계', nodes: [7, 8, 10] },
        { id: 'background', label: '배경지', nodes: [11, 12] },
        { id: 'object', label: '선택 개체 편집', nodes: [13] }
      ]
    },
    maker: {
      controlId: 'makerControls',
      quick: [0, 1, 2, 3, 8, 11],
      groups: [
        { id: 'canvas', label: '캔버스와 배경', nodes: [6, 7] },
        { id: 'object', label: '개체 선택과 편집', nodes: [9, 10] },
        { id: 'fonts', label: '폰트 관리', nodes: [4, 5] }
      ]
    }
  };

  const state = {
    mode: 'acrylic',
    activeGroup: { acrylic: 'canvas', sticker: 'canvas', maker: 'canvas' },
    panels: new Map()
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
      for (const index of group.nodes) {
        const node = originalChildren[index];
        if (node) body.append(node);
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
    const quickSet = new Set(config.quick);
    const detailSet = new Set(config.groups.flatMap(group => group.nodes));

    for (const [index, child] of children.entries()) {
      if (!quickSet.has(index) && !detailSet.has(index)) {
        console.warn(`레이아웃 분류에서 빠진 요소: ${mode} / ${index}`, child);
      }
    }

    panel.classList.add('quick-control-panel');
    panel.dataset.quickMode = mode;
    for (const index of config.quick) {
      const node = children[index];
      if (node) panel.append(node);
    }

    detailSidebar.append(createDetailPanel(mode, config, children));
  }

  function isPortrait() {
    return window.matchMedia('(orientation: portrait)').matches;
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
      });
      tabs.append(button);
    }
  }

  function applyResponsiveGroupState() {
    const portrait = isPortrait();
    document.documentElement.classList.toggle('portrait-workspace', portrait);
    for (const [mode, panel] of state.panels.entries()) {
      for (const group of panel.querySelectorAll('.detail-group')) {
        const active = group.dataset.detailGroup === state.activeGroup[mode];
        group.classList.toggle('tab-active', !portrait || active);
        if (portrait) group.open = true;
      }
    }
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
  }

  function init() {
    const workspace = document.querySelector('.workspace');
    const sidebar = document.querySelector('.sidebar');
    const stage = document.querySelector('.stage-column');
    if (!workspace || !sidebar || !stage) return;

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
    createOutputPanel(sidebar);

    const production = document.getElementById('productionOptionsPanel');
    if (production) sidebar.append(production);

    const media = window.matchMedia('(orientation: portrait)');
    const onViewportChange = () => {
      applyResponsiveGroupState();
      renderTabs();
      window.requestAnimationFrame(() => window.dispatchEvent(new Event('goods-maker-layout-change')));
    };
    media.addEventListener?.('change', onViewportChange);
    window.addEventListener('resize', onViewportChange, { passive: true });

    setMode('acrylic');
    window.GoodsMakerLayout = { setMode, refresh: onViewportChange };
  }

  init();
})();
