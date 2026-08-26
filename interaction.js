/* 조작감 — 햅틱 · 누름 반응 · 숫자칸 스크럽 (v107)
   ============================================================
   사용자: "버튼/슬라이더 조작감도 좀 개선해보자. 지금 조작감이 좋진 않아.
            보편적인 보정/사진 조작 앱에서 사용되는 접근성/햅틱 적용해서"

   재고 시작했다. 브라우저에서 412×915 로 잰 값이다.

     :active 규칙          0개    ← 눌러도 아무 반응이 없다
     VIBRATE 권한          없음   ← navigator.vibrate 가 조용히 무시된다
     버튼 세로             32~38px (목표 44)
     숫자칸                103개 · 값 하나 바꾸려면 매번 키보드

   그래서 세 가지를 넣는다.
     ① 햅틱      — 누름 · 단계 · 한계 · 끝냄을 손끝으로 알린다
     ② 누름 반응 — 손이 닿는 즉시(80ms 안) 화면이 답한다
     ③ 스크럽    — 숫자칸을 좌우로 끌어 값을 바꾼다 (키보드는 그대로 남는다)

   DOM 을 옮기지 않는다. 마크업도 안 고친다. 전부 위임(delegation)이라
   나중에 만들어지는 버튼에도 저절로 걸린다.
   ============================================================ */
(() => {
  'use strict';

  // ── 햅틱 ────────────────────────────────────────────────────────
  //
  // navigator.vibrate 를 쓴다. Capacitor 햅틱 플러그인을 넣지 않은 이유는
  // 그것이 네이티브 동기화를 다시 돌려야 하는 일이고(이 저장소의 안드로이드
  // 껍데기는 APK 역추출 재구성본이라 건드릴수록 위험하다), 웹 API 로 같은
  // 것을 얻을 수 있기 때문이다. 대신 AndroidManifest 에 VIBRATE 권한이
  // 있어야 한다 — 없으면 호출은 성공한 척하고 아무 일도 안 일어난다.
  //
  // 세기는 사람마다 다르다. 접근성상 **끌 수 있어야** 하므로 화면 설정에
  // 손잡이를 두고 여기서 그 값을 읽는다.
  const KEY = 'goodsmaker.haptics';   // 'off' | 'light' | 'medium'
  const PATTERNS = {
    tap:    [10],            // 버튼을 눌렀다
    tick:   [6],             // 한 단계 움직였다 (스크럽·스테퍼)
    detent: [14],            // 눈금에 닿았다 (기본값·중앙·끝)
    bump:   [11, 45, 11],    // 더 갈 수 없다 (최소/최대)
    done:   [16, 60, 24],    // 무거운 계산이 끝났다
    warn:   [26, 50, 26]     // 막혔다 · 되돌렸다
  };
  const SCALE = { off: 0, light: 0.6, medium: 1 };

  let mode = 'light';
  try { const v = localStorage.getItem(KEY); if (v && v in SCALE) mode = v; } catch (e) { /* 무시 */ }

  // 연타를 그대로 흘리면 손목이 얼얼하다. 같은 종류는 최소 간격을 둔다.
  let lastAt = 0;
  const MIN_GAP = 24;

  function buzz(kind) {
    const k = SCALE[mode];
    if (!k || !navigator.vibrate) return false;
    const pattern = PATTERNS[kind];
    if (!pattern) return false;
    const now = Date.now();
    if (now - lastAt < MIN_GAP) return false;
    lastAt = now;
    // 세기는 길이로 흉내 낸다. 웹 진동 API 에는 진폭이 없다.
    try { return navigator.vibrate(pattern.map(ms => Math.max(1, Math.round(ms * k)))); }
    catch (e) { return false; }
  }

  function setMode(next) {
    if (!(next in SCALE)) return;
    mode = next;
    try { localStorage.setItem(KEY, next); } catch (e) { /* 무시 */ }
    if (next !== 'off') buzz('detent');   // 고른 세기를 바로 손끝으로 들려준다
  }

  // ── 누르면 손끝에 답한다 ────────────────────────────────────────
  //
  // pointerdown 에서 울린다. click 은 손을 뗀 뒤라 늦다 — 사진 앱들이
  // 하나같이 누르는 순간에 울리는 이유가 그것이다.
  const SKIP = 'input,textarea,select,[data-no-haptic]';

  document.addEventListener('pointerdown', ev => {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    const el = ev.target.closest('button, .segment, .view-tab, .chip, [role="button"]');
    if (!el || el.disabled || el.closest(SKIP)) return;
    buzz(el.dataset.haptic || 'tap');
  }, true);

  // 값이 바뀌는 것(체크박스·라디오·선택)은 바뀐 **뒤**가 맞다.
  document.addEventListener('change', ev => {
    const t = ev.target;
    if (!t) return;
    if (t.type === 'checkbox' || t.type === 'radio' || t.tagName === 'SELECT') buzz('tick');
  }, true);

  // ── 숫자칸 스크럽 ───────────────────────────────────────────────
  //
  // 숫자칸이 103개다. 값 하나 바꾸려고 매번 키보드를 올렸다 내리는 것이
  // 이 앱에서 가장 손이 많이 가는 동작이었다. 좌우로 끌면 값이 바뀌게 한다
  // (그림 편집 앱의 수치 라벨을 끄는 것과 같은 조작이다).
  //
  // 탭은 그대로 둔다 — 움직임이 문턱을 넘기 전에는 아무 일도 안 하고,
  // 그러면 평소처럼 포커스가 가서 키보드로 정확한 값을 넣을 수 있다.
  const START_PX = 6;     // 이만큼 움직여야 스크럽으로 본다 (탭을 안 잡아먹게)
  const PX_PER_STEP = 9;  // 한 단계 옮기는 데 필요한 거리

  let scrub = null;

  const stepOf = input => {
    const s = parseFloat(input.step);
    return Number.isFinite(s) && s > 0 ? s : 1;
  };
  const decimalsOf = step => {
    const s = String(step);
    const dot = s.indexOf('.');
    return dot < 0 ? 0 : s.length - dot - 1;
  };

  document.addEventListener('pointerdown', ev => {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    const input = ev.target.closest('input[type="number"]');
    if (!input || input.disabled || input.readOnly) return;
    const step = stepOf(input);
    scrub = {
      input, step,
      digits: decimalsOf(step),
      min: input.min === '' ? -Infinity : parseFloat(input.min),
      max: input.max === '' ? Infinity : parseFloat(input.max),
      startX: ev.clientX, startY: ev.clientY,
      base: parseFloat(input.value) || 0,
      last: parseFloat(input.value) || 0,
      pointerId: ev.pointerId,
      active: false
    };
  }, true);

  document.addEventListener('pointermove', ev => {
    if (!scrub || ev.pointerId !== scrub.pointerId) return;
    const dx = ev.clientX - scrub.startX, dy = ev.clientY - scrub.startY;
    if (!scrub.active) {
      // 세로로 먼저 움직였으면 스크롤이다. 가로 의도일 때만 잡는다.
      if (Math.abs(dx) < START_PX || Math.abs(dx) <= Math.abs(dy)) return;
      scrub.active = true;
      scrub.input.classList.add('is-scrubbing');
      try { scrub.input.setPointerCapture(ev.pointerId); } catch (e) { /* 무시 */ }
      scrub.input.blur();   // 키보드가 떠 있으면 내린다
    }
    ev.preventDefault();
    const steps = Math.round((ev.clientX - scrub.startX) / PX_PER_STEP);
    let next = scrub.base + steps * scrub.step;
    next = Math.min(scrub.max, Math.max(scrub.min, next));
    next = parseFloat(next.toFixed(scrub.digits));
    if (next === scrub.last) return;
    const atLimit = next === scrub.min || next === scrub.max;
    scrub.last = next;
    scrub.input.value = next;
    scrub.input.dispatchEvent(new Event('input', { bubbles: true }));
    buzz(atLimit ? 'bump' : 'tick');
  }, true);

  function endScrub(ev) {
    if (!scrub) return;
    if (ev && ev.pointerId !== scrub.pointerId) return;
    const s = scrub; scrub = null;
    if (!s.active) return;
    s.input.classList.remove('is-scrubbing');
    try { s.input.releasePointerCapture(s.pointerId); } catch (e) { /* 무시 */ }
    // change 를 한 번 쏜다. input 만 듣는 곳과 change 만 듣는 곳이 섞여 있다.
    s.input.dispatchEvent(new Event('change', { bubbles: true }));
    buzz('detent');
    if (ev) { ev.preventDefault(); ev.stopPropagation(); }
  }
  document.addEventListener('pointerup', endScrub, true);
  document.addEventListener('pointercancel', endScrub, true);

  // 스크럽으로 끝난 손짓이 클릭으로도 새어 나가지 않게 한다.
  document.addEventListener('click', ev => {
    const input = ev.target.closest && ev.target.closest('input.is-scrubbing');
    if (input) { ev.preventDefault(); ev.stopPropagation(); }
  }, true);

  // ── 슬라이더 눈금 ───────────────────────────────────────────────
  // range 는 두 개뿐이지만, 끌 때 아무 감각이 없으면 어디쯤인지 모른다.
  const rangeLast = new WeakMap();
  document.addEventListener('input', ev => {
    const el = ev.target;
    if (!el || el.type !== 'range') return;
    const v = parseFloat(el.value);
    const prev = rangeLast.get(el);
    rangeLast.set(el, v);
    if (prev === undefined || v === prev) return;
    const min = parseFloat(el.min) || 0, max = parseFloat(el.max) || 100;
    buzz(v === min || v === max ? 'bump' : 'tick');
  }, true);

  // 밖에서 쓸 수 있게 열어 둔다 — 화면 설정이 세기를 바꾸고, 앱이 "끝났다"
  // 같은 순간에 직접 울린다.
  window.GoodsMakerHaptics = Object.freeze({
    buzz, setMode,
    get mode() { return mode; },
    get supported() { return typeof navigator.vibrate === 'function'; },
    levels: ['off', 'light', 'medium']
  });
})();
