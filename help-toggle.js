/* GOODSMAKER_HELP_TOGGLE v84 */
(function () {
  'use strict';

  // ── 도움말을 버튼 뒤로 (v84) ───────────────────────────────────────
  //
  // 설명글이 62개, 5,900자였다. 값 하나에 네 줄짜리 해설이 붙어 있으니
  // 정작 조절할 입력칸이 화면 밖으로 밀렸다. 그래서 블록마다 우상단에
  // 물음표를 하나 두고, 누를 때만 그 블록의 설명이 뜨게 한다.
  //
  // **동적 상태줄은 건드리지 않는다.** `.field-help` 중 22개는 설명이
  // 아니라 app.js 가 내용을 계속 바꿔 쓰는 상태줄이다("배경 15,182px 을
  // 지웠습니다" 같은 것). 그것들은 항상 보여야 한다. HTML 에서
  // `data-live` 로 표시해 두고 여기서는 건너뛴다.
  //
  // **표시/숨김을 conditional-visibility.js 와 나눠 갖지 않는다.**
  // 그쪽은 "지금 모드에서 이 설명이 해당되는가" 를 정하고(패턴 설명 하나),
  // 여기서는 "사용자가 설명을 펴 놨는가" 를 정한다. 축이 다르다.
  // 그쪽이 숨길 때 인라인 display:none !important 를 걸므로 그쪽이 이기고,
  // 그쪽이 보일 때만 이 모듈의 펼침 여부가 뜻을 갖는다 — 합성이 맞는다.

  var STORE_KEY = 'goodsmaker.helpOpen.v1';

  // 처음 켰을 때만 펴 두는 것 (v84).
  //
  // 기준은 취향이 아니라 하나다 — **값을 잘못 두면 그림이 조용히 망가지는 곳.**
  // 오류도 안 나고, 보통 배율에서는 눈에도 안 띈다. 이 저장소의 사고 기록이
  // 그대로 이 세 곳이다.
  //
  //   배경색 찾는 범위 — 관용도. 낮으면 배경이 안 지워지고 높으면 그림을 먹는다
  //   새는 것 막기     — v81. 기본값 0 이라 아무도 안 켰고, 가는 가닥이
  //                      점선처럼 끊겨 나갔다 (조각 10개 → 6 으로 켜니 1개)
  //   외곽 정리        — 잔여 픽셀 지우기 · 덩어리·구멍 정리(v80, 눈동자
  //                      하이라이트처럼 떨어진 진짜 그림을 지울 수 있다) ·
  //                      가장자리 번짐 잘라내기(v83, 털·모션블러 사진은 꺼야 한다)
  //
  // 나머지 21개 블록은 접어 둔다. 많이 펴 두면 접은 뜻이 없어진다.
  // 열쇠는 블록 제목이다 — 제목을 바꾸면 여기도 같이 바꿔야 한다
  // (verify-features 가 index.html 에 이 제목들이 있는지 본다).
  // 처음에는 **전부 접어 둔다** (v171). 사용자: "설명 최대한 압축하고 접어서
  // 안 보이게". 도움말은 ⓘ·? 를 눌렀을 때만 편다.
  var DEFAULT_OPEN = [];

  // 안쪽 것이 먼저 잡히도록 closest() 에 한꺼번에 넘긴다.
  var BLOCK_SELECTOR = [
    '.choice-block',
    '.size-settings-card',
    '.hole-editor-layout',
    '.bg-remove-panel',
    '.detail-group',
    '.sheet-body',
    '.card'
  ].join(',');

  var TITLE_SELECTOR = '.choice-label,.size-section-heading strong,.panel-heading,summary,legend,strong';

  // ── 설명을 "블록 통째로" 가 아니라 "그 칸만" 열게 (v149) ──────────
  //
  // 사용자: "글이 굉장히 많고 … 직관적이고 덜 번잡스럽게"
  //
  // v84 는 블록 우상단 물음표 하나로 그 블록의 설명을 **전부** 폈다. 그래서
  // 값 하나가 궁금해서 눌러도 네댓 문단이 한꺼번에 쏟아졌다. 설명이 설정 칸
  // 안에 들어 있으면(대부분 그렇다) 그 칸 이름 옆에 작은 ⓘ 를 붙이고 **그
  // 하나만** 연다. 칸에 안 들어 있는 블록 설명만 예전처럼 우상단 물음표가 맡는다.
  //
  // 그래서 물음표 하나가 여는 글의 양이 줄고, 어느 설명이 어느 값의 것인지도
  // 눈으로 붙는다.
  var FIELD_SELECTOR = 'label.field,.check-row,.hole-position-row,.mini-check';
  // 칸 이름이 들어가는 자리 — 여기 끝에 ⓘ 를 붙인다.
  var FIELD_LABEL_SELECTOR = ':scope > span:first-child, :scope > .field-label';

  // 저장된 것이 **없을 때**(첫 실행)와 **빈 배열일 때**(사용자가 다 접었다)를
  // 갈라야 한다. 안 그러면 다 접어 놔도 새로 열 때마다 기본값이 되살아난다.
  function readOpen() {
    var raw = null;
    try { raw = localStorage.getItem(STORE_KEY); } catch (e) { /* 무시 */ }
    if (raw === null) return new Set(DEFAULT_OPEN);
    try {
      var list = JSON.parse(raw);
      return new Set(Array.isArray(list) ? list : []);
    } catch (e) { return new Set(); }
  }
  function writeOpen(set) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify([...set])); } catch (e) { /* 무시 */ }
  }

  var openKeys = readOpen();
  var keyCounts = Object.create(null);

  // 블록을 다시 찾아도 같은 열쇠가 나와야 새로고침 뒤에도 펼침이 유지된다.
  // 열쇠는 **바뀌지 않는 것**에서만 뽑는다.
  // 처음에는 클래스 이름을 썼다가 새로고침하면 펼침이 풀렸다 —
  // .detail-group 에 붙는 tab-active 처럼 상태에 따라 켜졌다 꺼지는 클래스가
  // 있어서 같은 블록인데 열쇠가 달라졌기 때문이다. id 와 제목만 쓴다.
  function blockKey(block) {
    if (block.dataset.helpKey) return block.dataset.helpKey;
    var raw = block.id || titleOf(block) || block.tagName.toLowerCase();
    // 이 열쇠는 그대로 선택자 안에 들어간다([data-help-owner="..."]).
    // 한글은 따옴표 안에서 멀쩡하니 위험한 두 글자만 걷어낸다.
    var base = raw.split('"').join('').split('\\').join('').trim().slice(0, 40) || 'block';
    keyCounts[base] = (keyCounts[base] || 0) + 1;
    var key = keyCounts[base] > 1 ? base + '~' + keyCounts[base] : base;
    block.dataset.helpKey = key;
    return key;
  }

  function titleOf(block) {
    var el = block.querySelector(TITLE_SELECTOR);
    var text = el ? (el.textContent || '').trim() : '';
    return text ? text.slice(0, 24) : '이 항목';
  }

  function makeButton(block, key) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'help-toggle-btn';
    btn.dataset.helpFor = key;
    btn.textContent = '?';
    var name = titleOf(block);
    btn.setAttribute('aria-label', name + ' 도움말');
    btn.title = name + ' 도움말';
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function (event) {
      // <details class="detail-group"> 안에서는 이걸 안 막으면 그룹이 접힌다.
      event.preventDefault();
      event.stopPropagation();
      toggle(block, key);
    });
    return btn;
  }

  // 펼침 상태를 **도움말 요소 자체**에 건다. 조상 선택자로 하면 안 된다 —
  // 블록이 겹쳐 있기 때문이다. 예를 들어 acrylicSealBlock 안의 설명은
  // 바깥 <details class="detail-group"> 도 같이 .help-block 이라서,
  // `.help-block:not(.help-open) .field-help` 는 **바깥이 닫혀 있으면**
  // 안쪽을 펴도 계속 숨겨 버린다. 실제로 이렇게 안 열렸다.
  // 도움말은 자기 블록 하나에만 속하므로(closest 로 가장 가까운 것) 상태도
  // 거기에만 달면 겹침이 문제가 되지 않는다.
  function apply(block, key) {
    var on = openKeys.has(key);
    block.classList.toggle('help-open', on);
    var helps = document.querySelectorAll('.field-help[data-help-owner="' + key + '"]');
    for (var i = 0; i < helps.length; i++) {
      if (on) helps[i].setAttribute('data-help-open', '1');
      else helps[i].removeAttribute('data-help-open');
    }
    var btn = block.querySelector(':scope > .help-toggle-btn, :scope > summary > .help-toggle-btn, .help-field-btn[data-help-for="' + key + '"]');
    if (btn) btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    block.classList.toggle('help-field-open', on && block.classList.contains('help-field'));
  }


  function toggle(block, key) {
    if (openKeys.has(key)) openKeys.delete(key); else openKeys.add(key);
    writeOpen(openKeys);
    apply(block, key);
  }

  // 설정 칸 하나짜리 ⓘ. 열쇠는 그 칸 안의 입력 id 로 잡는다 — 새로고침 뒤에도
  // 같은 열쇠가 나와야 펼침이 유지된다.
  function fieldKey(field) {
    if (field.dataset.helpKey) return field.dataset.helpKey;
    var input = field.querySelector('input[id],select[id],textarea[id]');
    var raw = (input && input.id) || field.id || (field.textContent || '').trim().slice(0, 24) || 'field';
    var base = raw.split('"').join('').split('\\').join('').trim().slice(0, 40) || 'field';
    keyCounts[base] = (keyCounts[base] || 0) + 1;
    var key = keyCounts[base] > 1 ? base + '~' + keyCounts[base] : base;
    field.dataset.helpKey = key;
    return key;
  }
  function makeFieldButton(field, key) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'help-field-btn';
    btn.dataset.helpFor = key;
    btn.textContent = 'ⓘ';
    var name = (field.querySelector('span') || field).textContent.trim().slice(0, 20) || '이 설정';
    btn.setAttribute('aria-label', name + ' 설명');
    btn.title = name + ' 설명';
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      toggle(field, key);
    });
    return btn;
  }

  function refresh() {
    var helps = document.querySelectorAll('.field-help:not([data-live]):not([data-help])');
    var touched = [];
    for (var i = 0; i < helps.length; i++) {
      var help = helps[i];
      help.setAttribute('data-help', '1');
      // 설정 칸 안에 든 설명이면 **그 칸**이 주인이다 (v149).
      var field = help.closest(FIELD_SELECTOR);
      var block = field || help.closest(BLOCK_SELECTOR) || help.parentElement;
      if (!block) continue;
      // 소속을 못 박아 둔다. 블록이 겹쳐 있어도 가장 가까운 하나에만 속한다.
      help.setAttribute('data-help-owner', field ? fieldKey(field) : blockKey(block));
      if (touched.indexOf(block) < 0) touched.push(block);
    }
    for (var j = 0; j < touched.length; j++) {
      var blk = touched[j];
      var isField = blk.matches(FIELD_SELECTOR);
      var key = isField ? fieldKey(blk) : blockKey(blk);
      if (isField) {
        if (!blk.classList.contains('help-field')) {
          blk.classList.add('help-field');
          var slot = blk.querySelector(FIELD_LABEL_SELECTOR) || blk;
          slot.appendChild(makeFieldButton(blk, key));
        }
      } else if (!blk.classList.contains('help-block')) {
        blk.classList.add('help-block');
        var btn = makeButton(blk, key);
        // <details> 는 요약줄 안에 넣어야 제목과 안 겹치고 접기도 안 건드린다.
        var summary = blk.tagName === 'DETAILS' ? blk.querySelector(':scope > summary') : null;
        if (summary) summary.appendChild(btn); else blk.insertBefore(btn, blk.firstChild);
      }
      apply(blk, key);
    }
    return touched.length;
  }

  /* ── 세 번째 단: `드물게` 블록은 접어 둔다 (v186) ────────────────────
     사용자: *"화면 가독성 좀 떨어지는 느낌인데 좀 더 직관적으로 바꿀 수 있나?"*

     v149 의 `간단히 보기` 는 전부-또는-전무였다 — 켜면 고급 20개가 사라지고
     끄면 20개가 한꺼번에 쏟아진다. 그 20개 안에도 결이 다른 둘이 섞여 있다.
     값 하나짜리 칸(다듬는 것)과, 무언가 잘못됐을 때만 쓰는 **도구 블록**
     (입구 잠금 · 두 지점 닫기 · 투명 메우기 · 확장도안 올가미 …)이다.
     뒤쪽은 버튼 넷과 목록과 긴 설명을 달고 있어 한 블록이 화면 3분의 1을 먹는다.

     그래서 단을 셋으로 나눈다.
       ① 기본            — 늘 보인다
       ② data-advanced   — `간단히 보기` 를 끄면 보인다 (v149 그대로)
       ③ data-tier=rare  — 그 위에 **접혀 있고**, 제목을 눌러야 펴진다

     이것은 도움말 접기와 **같은 축**이다(사용자가 펴 놨는가). 그래서 여기에
     둔다 — `conditional-visibility.js` 는 "지금 모드에서 해당되는가" 쪽이고
     축이 다르다(v52 규칙). 펴 둔 것은 도움말과 같은 저장소에 남긴다. */
  var TIER_KEY = 'goodsmaker.tierOpen.v1';
  function readTierOpen() {
    try {
      var raw = localStorage.getItem(TIER_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (_) { return {}; }
  }
  function writeTierOpen(map) {
    try { localStorage.setItem(TIER_KEY, JSON.stringify(map)); } catch (_) { }
  }
  var tierOpen = readTierOpen();
  function tierTitleRow(block) {
    return block.querySelector(':scope > .hole-title-row, :scope > .split-title-row') || null;
  }
  function tierLabel(block) {
    var el = block.querySelector('.choice-label');
    return el ? (el.textContent || '').trim() : '';
  }
  function applyTier(block, key) {
    var on = !!tierOpen[key];
    block.classList.toggle('tier-open', on);
    var btn = block.querySelector(':scope > .tier-toggle, :scope > .hole-title-row > .tier-toggle, :scope > .split-title-row > .tier-toggle');
    if (btn) {
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      btn.textContent = on ? '⌃' : '⌄';
      btn.setAttribute('aria-label', tierLabel(block) + (on ? ' 접기' : ' 펴기'));
    }
  }
  function refreshTiers() {
    var blocks = document.querySelectorAll('[data-tier="rare"]:not([data-tier-ready])');
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      block.setAttribute('data-tier-ready', '1');
      block.classList.add('tier-block');
      var key = block.id || tierLabel(block);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tier-toggle';
      btn.setAttribute('aria-expanded', 'false');
      (function (blk, k) {
        btn.addEventListener('click', function (event) {
          event.preventDefault(); event.stopPropagation();
          tierOpen[k] = !tierOpen[k];
          writeTierOpen(tierOpen);
          applyTier(blk, k);
        });
      })(block, key);
      var row = tierTitleRow(block);
      /* 제목줄이 없는 블록(`올가미로 지우기` 처럼 제목이 맨 <span> 하나인 것)은
         **제목줄을 만들어 준다.** 접었을 때 남는 것이 제목줄뿐이므로, 화살표만
         블록 맨 앞에 꽂으면 제목이 같이 감춰져 **화살표 하나만 뜬다** — 실측으로
         걸렸다(9개 중 1개가 그랬다). 만들어 두면 CSS 도 누르기도 한 갈래가 된다. */
      if (!row) {
        var label = block.querySelector(':scope > .choice-label');
        if (label) {
          row = document.createElement('div');
          row.className = 'tier-title-row tier-title-made';
          block.insertBefore(row, label);
          row.appendChild(label);
        }
      }
      // 제목줄이 있으면 그 안에, 없으면 블록 맨 앞에 — 도움말 버튼(우상단
      // absolute)과 자리가 겹치지 않게 제목줄 쪽을 먼저 본다.
      if (row) row.appendChild(btn); else block.insertBefore(btn, block.firstChild);
      // 제목줄 전체를 눌러도 펴지게 한다 — 화살표만 노리게 하면 손이 아프다.
      if (row) {
        (function (blk, k) {
          row.addEventListener('click', function (event) {
            if (event.target.closest('button, input, label, select')) return;
            tierOpen[k] = !tierOpen[k];
            writeTierOpen(tierOpen);
            applyTier(blk, k);
          });
        })(block, key);
        row.classList.add('tier-title-row');
      }
      applyTier(block, key);
    }
  }

  function start() {
    refresh();
    refreshTiers();
    // 시트처럼 나중에 만들어지는 마크업도 잡는다.
    if (typeof MutationObserver === 'function') {
      var pending = 0;
      var observer = new MutationObserver(function () {
        if (pending) return;
        pending = requestAnimationFrame(function () { pending = 0; refresh(); refreshTiers(); });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  window.GoodsMakerHelp = { refresh: refresh, openKeys: openKeys };
})();
