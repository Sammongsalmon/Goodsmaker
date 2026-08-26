/* GOODSMAKER_DISPLAY_SETTINGS v62 */
(() => {
  'use strict';

  // ────────────────────────────────────────────────────────────────
  // 화면 설정 — 밝기 · 화면 글꼴 · 글자 크기
  //
  // 안드로이드에서 기기 글꼴을 바꿔도 이 앱 화면은 따라가지 않는다.
  // 화면이 WebView 로 그려지고, WebView 는 시스템 글꼴 설정을 대체로
  // 무시하기 때문이다(CSS 의 system-ui 는 "사용자가 고른 글꼴" 이 아니라
  // OS 에 내장된 기본 서체로 해석된다). 그래서 앱이 직접 고르게 한다.
  //
  // 고른 값은 localStorage 에 남고, 첫 페인트 전에 index.html 의 인라인
  // 스크립트가 --ui-font / --ui-scale 을 세워 둔다. 이 파일은 그 뒤를
  // 이어받아 목록을 만들고, 기기에 추가한 폰트(IndexedDB)처럼 주소가
  // 없어서 인라인 스크립트가 못 살리는 것들을 복원한다.
  // ────────────────────────────────────────────────────────────────

  const FONT_KEY = 'goodsmaker.uiFont';
  const SCALE_KEY = 'goodsmaker.uiScale';
  const THEME_KEY = 'goodsmaker.theme';
  const FACE_ID = 'gm-ui-font-face';
  const GENERIC = new Set(['sans-serif', 'serif', 'monospace', 'system-ui', 'cursive', 'fantasy']);
  const SCALES = ['0.72', '0.8', '1', '1.2'];
  const DEFAULT_SCALE = '0.8';   // style.css 의 --ui-scale 기본값과 같아야 한다.

  const BUILTIN = [
    { value: '__system__', family: '__system__', label: '기기 기본 글꼴', note: '이 기기의 시스템 서체' },
    { value: 'sans-serif', family: 'sans-serif', label: '기본 고딕', note: '기기 내장' },
    { value: 'serif', family: 'serif', label: '기본 명조', note: '기기 내장' },
    {
      value: 'ChosunIlboMyeongjoUI',
      family: 'ChosunIlboMyeongjoUI',
      label: '조선일보명조',
      note: '앱 내장 · v60까지 쓰던 글꼴',
      url: 'assets/ui/ChosunIlboMyeongjoUI.woff2',
      weight: '400',
      style: 'normal'
    }
  ];

  const el = id => document.getElementById(id);
  const root = document.documentElement;
  const objectUrls = new Map();
  let catalog = [];
  let catalogReady = null;
  let lastFocus = null;

  function readJson(key) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }
    catch (e) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* 저장 못 해도 이번 세션에는 적용된다 */ }
  }

  function quoteFamily(family) {
    return GENERIC.has(family) ? family : `"${String(family).replace(/"/g, '')}"`;
  }

  // ── 글꼴 적용 ───────────────────────────────────────────────────
  function applyFont(entry) {
    document.getElementById(FACE_ID)?.remove();
    if (!entry || !entry.family || entry.family === '__system__') {
      root.style.removeProperty('--ui-font');
      return;
    }
    const quoted = quoteFamily(entry.family);
    if (entry.url) {
      const style = document.createElement('style');
      style.id = FACE_ID;
      style.textContent = `@font-face{font-family:${quoted};src:url(${JSON.stringify(entry.url)});`
        + `font-weight:${entry.weight || 400};font-style:${entry.style || 'normal'};font-display:swap;}`;
      document.head.appendChild(style);
    }
    root.style.setProperty('--ui-font', `${quoted}, var(--ui-font-stack)`);
  }

  // 기기에 추가한 폰트는 blob 이라 매번 새 주소를 만들어야 한다.
  async function applyDeviceFont(entry) {
    const records = await window.GoodsMakerFonts?.list?.() || [];
    const record = records.find(item => item.id === entry.deviceId) || records.find(item => item.family === entry.family);
    if (!record) return false;
    const previous = objectUrls.get(record.id);
    if (previous) URL.revokeObjectURL(previous);
    const url = URL.createObjectURL(record.blob);
    objectUrls.set(record.id, url);
    try {
      const face = new FontFace(record.family, `url(${JSON.stringify(url)})`, {
        style: record.style || 'normal', weight: String(record.weight || '400'), display: 'swap'
      });
      await face.load();
      document.fonts.add(face);
    } catch (e) {
      return false;
    }
    root.style.setProperty('--ui-font', `${quoteFamily(record.family)}, var(--ui-font-stack)`);
    return true;
  }

  async function verifyLoaded(family) {
    if (!document.fonts?.load) return true;
    try {
      await document.fonts.load(`16px ${quoteFamily(family)}`, '가나다ABC');
      return document.fonts.check(`16px ${quoteFamily(family)}`, '가나다ABC');
    } catch (e) { return true; }
  }

  function applyScale(scale) {
    const value = Number(scale);
    if (!(value >= 0.8 && value <= 1.4)) return;
    root.style.setProperty('--ui-scale', String(value));
  }

  // ── 글꼴 목록 ───────────────────────────────────────────────────
  async function buildCatalog() {
    const list = [...BUILTIN];

    // 저장소 폰트 (assets/fonts/fonts.json) — 도안 글상자와 같은 목록이다.
    try {
      const response = await fetch('assets/fonts/fonts.json');
      if (response.ok) {
        const manifest = await response.json();
        const entries = Array.isArray(manifest) ? manifest : (manifest.fonts || []);
        const seen = new Set();
        for (const entry of entries) {
          if (!entry?.family || !entry?.url || seen.has(entry.family)) continue;
          seen.add(entry.family);
          list.push({
            value: `repo:${entry.family}`,
            family: entry.family,
            label: entry.fullName || entry.family,
            note: '저장소 폰트',
            url: entry.url,
            weight: String(entry.weight || '400'),
            style: entry.style || 'normal'
          });
        }
      }
    } catch (e) { /* 목록을 못 읽어도 내장 글꼴은 고를 수 있다 */ }

    // 기기에 추가한 폰트 (폰트 관리에서 올린 것)
    try {
      const records = await window.GoodsMakerFonts?.list?.() || [];
      for (const record of records) {
        list.push({
          value: `device:${record.id}`,
          family: record.family,
          label: record.fullName || record.family,
          note: '이 기기에 추가함',
          deviceId: record.id,
          weight: String(record.weight || '400'),
          style: record.style || 'normal'
        });
      }
    } catch (e) { /* 무시 */ }

    catalog = list;
    return list;
  }

  function ensureCatalog() {
    if (!catalogReady) catalogReady = buildCatalog();
    return catalogReady;
  }

  function currentFontValue() {
    const saved = readJson(FONT_KEY);
    if (!saved || !saved.family || saved.family === '__system__') return '__system__';
    if (saved.deviceId) return `device:${saved.deviceId}`;
    const match = catalog.find(item => item.family === saved.family && item.url === saved.url);
    return match ? match.value : (GENERIC.has(saved.family) ? saved.family : `repo:${saved.family}`);
  }

  function renderFontSelect() {
    const select = el('displayFontSelect');
    if (!select) return;
    const groups = [
      ['기본', catalog.filter(item => !item.url && !item.deviceId)],
      ['앱 내장', catalog.filter(item => item.url && item.value === 'ChosunIlboMyeongjoUI')],
      ['저장소 폰트', catalog.filter(item => item.value.startsWith('repo:'))],
      ['이 기기에 추가한 폰트', catalog.filter(item => item.value.startsWith('device:'))]
    ];
    select.innerHTML = groups
      .filter(([, items]) => items.length)
      .map(([label, items]) => `<optgroup label="${label}">`
        + items.map(item => `<option value="${item.value.replace(/"/g, '&quot;')}">${item.label.replace(/</g, '&lt;')}</option>`).join('')
        + '</optgroup>')
      .join('');
    select.value = currentFontValue();
    updateFontHelp();
  }

  function updateFontHelp() {
    const help = el('displayFontHelp');
    if (!help) return;
    const select = el('displayFontSelect');
    const entry = catalog.find(item => item.value === select?.value);
    const repoCount = catalog.filter(item => item.value.startsWith('repo:')).length;
    const deviceCount = catalog.filter(item => item.value.startsWith('device:')).length;
    const tail = `고를 수 있는 글꼴 ${catalog.length}종 (저장소 ${repoCount} · 기기 ${deviceCount})`;
    if (!entry || entry.value === '__system__') {
      help.textContent = `기기의 시스템 서체를 그대로 씁니다. ${tail}`;
      return;
    }
    help.textContent = `${entry.label} · ${entry.note}. ${tail}`;
  }

  // ── 상태 반영 ───────────────────────────────────────────────────
  // 진동은 기기가 못 하면 손잡이를 없애지 않고 **비활성으로 두고 이유를 쓴다**
  // (v50.17 규약). 없어지면 "왜 안 울리지" 를 물을 데가 사라진다.
  function syncHaptics() {
    const api = window.GoodsMakerHaptics;
    const group = el('hapticGroup'), help = el('hapticHelp');
    if (!group) return;
    const usable = !!api?.supported;
    markSegments('hapticGroup', 'hapticLevel', usable ? api.mode : 'off');
    for (const button of group.querySelectorAll('button')) button.disabled = !usable;
    if (!help) return;
    help.textContent = usable
      ? '버튼을 누르거나 수치를 끌 때 짧게 울립니다. 고른 세기는 바로 한 번 울려 확인시켜 줍니다.'
      : '이 기기(또는 브라우저)는 진동을 지원하지 않습니다. 앱에서는 켤 수 있습니다.';
  }

  function markSegments(groupId, attribute, value) {
    const group = el(groupId);
    if (!group) return;
    for (const button of group.querySelectorAll('button')) {
      const active = button.dataset[attribute] === value;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
  }

  function savedTheme() {
    try {
      const value = localStorage.getItem(THEME_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (e) { return null; }
  }

  function syncState() {
    const explicit = savedTheme();
    // 기기 설정을 따르는 중이어도 "지금 어느 쪽인지" 는 표시한다. 둘 다 꺼져
    // 있으면 고장 난 것처럼 보인다. 고정인지 따라가는 중인지는 아래 글로 알린다.
    const effective = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    markSegments('displayThemeGroup', 'displayTheme', effective);
    const help = el('displayThemeHelp');
    if (help) {
      help.textContent = explicit
        ? '직접 고른 밝기로 고정돼 있습니다.'
        : '기기 설정을 따르는 중입니다. 밝게/어둡게를 고르면 그 값으로 고정됩니다.';
    }
    const scale = String(Number(localStorage.getItem(SCALE_KEY)) || DEFAULT_SCALE);
    markSegments('displayScaleGroup', 'displayScale', SCALES.includes(scale) ? scale : DEFAULT_SCALE);
    syncHaptics();
    const select = el('displayFontSelect');
    if (select && catalog.length) select.value = currentFontValue();
    updateFontHelp();
  }

  // ── 시트 열고 닫기 ──────────────────────────────────────────────
  function sheet() { return el('displaySettingsSheet'); }

  async function open() {
    const node = sheet();
    if (!node) return;
    lastFocus = document.activeElement;
    node.classList.remove('hidden');
    node.setAttribute('aria-hidden', 'false');
    root.classList.add('apk-export-open');
    syncState();
    await ensureCatalog();
    renderFontSelect();
    syncState();
    requestAnimationFrame(() => node.querySelector('button:not([disabled]), select')?.focus?.({ preventScroll: true }));
  }

  function close({ restoreFocus = true } = {}) {
    const node = sheet();
    if (!node || node.classList.contains('hidden')) return;
    node.classList.add('hidden');
    node.setAttribute('aria-hidden', 'true');
    // 저장 시트가 함께 열려 있을 수 있으므로 그때는 잠금을 풀지 않는다.
    const exportSheet = el('apkExportSheet');
    if (!exportSheet || exportSheet.classList.contains('hidden')) root.classList.remove('apk-export-open');
    if (restoreFocus) lastFocus?.focus?.({ preventScroll: true });
  }

  function isOpen() {
    const node = sheet();
    return !!node && !node.classList.contains('hidden');
  }

  // ── 배선 ────────────────────────────────────────────────────────
  function wire() {
    if (!sheet()) return;

    el('displaySettingsBackdrop')?.addEventListener('click', () => close());
    el('displaySettingsClose')?.addEventListener('click', () => close());

    el('displayThemeGroup')?.addEventListener('click', event => {
      const button = event.target.closest('[data-display-theme]');
      if (!button) return;
      const theme = button.dataset.displayTheme;
      write(THEME_KEY, theme);
      window.GoodsMakerTheme?.apply?.(theme);
      syncState();
    });

    el('displayThemeAutoBtn')?.addEventListener('click', () => {
      try { localStorage.removeItem(THEME_KEY); } catch (e) { /* 무시 */ }
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      window.GoodsMakerTheme?.apply?.(system);
      syncState();
    });

    el('displayScaleGroup')?.addEventListener('click', event => {
      const button = event.target.closest('[data-display-scale]');
      if (!button) return;
      const scale = button.dataset.displayScale;
      write(SCALE_KEY, scale);
      applyScale(scale);
      syncState();
    });

    // 진동 세기 (v107). 값은 interaction.js 가 들고 있고 여기서는 손잡이만 준다.
    el('hapticGroup')?.addEventListener('click', event => {
      const button = event.target.closest('[data-haptic-level]');
      if (!button) return;
      window.GoodsMakerHaptics?.setMode(button.dataset.hapticLevel);
      syncHaptics();
    });

    el('displayFontSelect')?.addEventListener('change', async event => {
      const entry = catalog.find(item => item.value === event.target.value);
      if (!entry) return;
      if (entry.deviceId) {
        const record = { family: entry.family, deviceId: entry.deviceId, weight: entry.weight, style: entry.style };
        write(FONT_KEY, JSON.stringify(record));
        const ok = await applyDeviceFont(record);
        if (!ok) {
          const help = el('displayFontHelp');
          if (help) help.textContent = `${entry.label} 을(를) 불러오지 못했습니다. 폰트 관리에서 다시 추가해 주세요.`;
          return;
        }
      } else {
        const record = { family: entry.family, url: entry.url || '', weight: entry.weight || '400', style: entry.style || 'normal' };
        write(FONT_KEY, JSON.stringify(record));
        applyFont(record);
        // 저장소 폰트 파일이 빠진 채 빌드되면(폰트 ZIP 을 안 풀었을 때) 파일이
        // 404 라도 브라우저는 조용히 기본 글꼴로 되돌아간다. 화면은 그대로인데
        // 고른 글꼴만 안 먹는 상태가 되므로, 실제로 실렸는지 확인해 알린다.
        if (record.url) {
          const ok = await verifyLoaded(record.family);
          if (!ok) {
            const help = el('displayFontHelp');
            if (help) help.textContent = `${entry.label} 파일을 불러오지 못했습니다. 폰트 ZIP 이 저장소에 풀려 있는지 확인해 주세요. 지금은 기기 기본 글꼴로 보입니다.`;
            return;
          }
        }
      }
      updateFontHelp();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && isOpen()) {
        event.preventDefault();
        close();
      }
    });

    // 첫 페인트 스크립트가 못 살린 '기기에 추가한 폰트' 를 이어받는다.
    const saved = readJson(FONT_KEY);
    if (saved?.deviceId) applyDeviceFont(saved);
  }

  window.GoodsMakerDisplay = { open, close, isOpen };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire, { once: true });
  else wire();
})();
