/* GOODSMAKER_GUIDE_TEMPLATE v109 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;   // Node 테스트용
  if (root) root.GoodsMakerGuide = api;                                     // 브라우저
})(typeof self !== 'undefined' ? self : null, function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════
  // 인쇄소 가이드 AI 읽기 · 편집용 AI/PDF 쓰기 (v109)
  //
  // 인쇄소가 주는 "가이드 ai" 는 사실 PDF 다. Illustrator 가 저장할 때
  //   ① 사람이 보는 PDF 페이지 내용  ② Illustrator 만 읽는 비공개 데이터
  // 두 벌을 같이 넣는데, 레이어는 ①에 **광학 컨텐츠 그룹(OCG)** 으로
  // 남는다. 그 이름이 곧 "재단"·"화이트"·"컬러" 다.
  //
  // 이 파일은 DOM 도 캔버스도 쓰지 않는다. 바이트 → 바이트 순수 함수라서
  // Node 에서 실제 가이드 파일로 그대로 검사할 수 있다
  // (tools/test-guide-template.js).
  //
  // 세 가지를 한다.
  //   1) parseGuide  — 가이드에서 페이지 크기·레이어 이름·순서와 각 레이어가
  //                    **획으로 그렸는지 채우기로 그렸는지**, 무슨 색인지 읽는다.
  //   2) computePlacement — 우리 도안(mm)을 가이드 판형 어디에 놓을지 계산한다.
  //   3) buildFromGuide — 가이드의 객체 그래프를 그대로 물려받되 재단·화이트·
  //                    컬러 레이어의 내용만 우리 것으로 갈아 끼운 PDF 를 쓴다.
  //
  // ── 반드시 지켜야 하는 것 ──────────────────────────────────────────
  // /PieceInfo 의 Illustrator 비공개 데이터를 **버려야 한다.** 남겨 두면
  // Illustrator 는 우리가 쓴 페이지 내용 대신 그 비공개 데이터(=원본 샘플
  // 그림)를 열어 버린다. 파일은 멀쩡해 보이는데 내 도안이 없다.
  // buildFromGuide 가 페이지·문서에서 PieceInfo 를 지운다.
  // ══════════════════════════════════════════════════════════════════

  // ── PDF 값 표현 ────────────────────────────────────────────────────
  // 다시 써 낼 수 있어야 해서 이름·문자열을 원문 그대로 보관한다.
  const T = {
    num: v => ({ t: 'num', v }),
    bool: v => ({ t: 'bool', v }),
    nul: () => ({ t: 'null' }),
    name: v => ({ t: 'name', v }),
    str: (v, hex) => ({ t: 'str', v, hex: !!hex }),
    ref: (num, gen) => ({ t: 'ref', num, gen: gen || 0 }),
    arr: v => ({ t: 'array', v: v || [] }),
    dict: map => ({ t: 'dict', map: map || new Map() })
  };

  const WS = '\0\t\n\f\r ';
  const DELIM = '()<>[]{}/%';
  const isWs = c => WS.indexOf(c) >= 0;
  const isDelim = c => DELIM.indexOf(c) >= 0;
  const isReg = c => c !== undefined && !isWs(c) && !isDelim(c);

  function Lexer(s, i) { this.s = s; this.i = i || 0; }

  Lexer.prototype.skip = function () {
    const s = this.s;
    for (;;) {
      while (this.i < s.length && isWs(s[this.i])) this.i++;
      if (s[this.i] !== '%') return;
      while (this.i < s.length && s[this.i] !== '\n' && s[this.i] !== '\r') this.i++;
    }
  };

  Lexer.prototype.token = function () {
    this.skip();
    const s = this.s;
    if (this.i >= s.length) return null;
    const c = s[this.i];
    if (c === '<' && s[this.i + 1] === '<') { this.i += 2; return '<<'; }
    if (c === '>' && s[this.i + 1] === '>') { this.i += 2; return '>>'; }
    if (isDelim(c)) { this.i++; return c; }
    let j = this.i;
    while (isReg(s[j])) j++;
    const out = s.slice(this.i, j);
    this.i = j;
    return out;
  };

  Lexer.prototype.peekToken = function () { const at = this.i; const t = this.token(); this.i = at; return t; };

  // 이름의 #XX 이스케이프를 푼다. UTF-8 로 저장된 한글 레이어 이름이 있다.
  function decodeName(raw) {
    return raw.replace(/#([0-9A-Fa-f]{2})/g, (m, h) => String.fromCharCode(parseInt(h, 16)));
  }
  function encodeName(v) {
    let out = '';
    for (let i = 0; i < v.length; i++) {
      const c = v[i], code = v.charCodeAt(i);
      if (code < 0x21 || code > 0x7e || isDelim(c) || c === '#') out += '#' + code.toString(16).padStart(2, '0').toUpperCase();
      else out += c;
    }
    return out;
  }

  Lexer.prototype.value = function () {
    this.skip();
    const s = this.s;
    if (this.i >= s.length) return null;
    const c = s[this.i];
    if (c === '/') { this.i++; let j = this.i; while (isReg(s[j])) j++; const raw = s.slice(this.i, j); this.i = j; return T.name(decodeName(raw)); }
    if (c === '(') return this.literalString();
    if (c === '<') {
      if (s[this.i + 1] === '<') return this.dict();
      return this.hexString();
    }
    if (c === '[') {
      this.i++;
      const out = [];
      for (;;) {
        this.skip();
        if (this.i >= s.length) break;
        if (s[this.i] === ']') { this.i++; break; }
        const v = this.value();
        if (v === null) break;
        out.push(v);
      }
      return T.arr(out);
    }
    const tok = this.token();
    if (tok === null) return null;
    if (tok === 'true') return T.bool(true);
    if (tok === 'false') return T.bool(false);
    if (tok === 'null') return T.nul();
    if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(tok)) {
      // "12 0 R" 인지 먼저 본다.
      if (/^\d+$/.test(tok)) {
        const save = this.i;
        const t2 = this.token(), t3 = this.token();
        if (t3 === 'R' && /^\d+$/.test(t2 || '')) return T.ref(Number(tok), Number(t2));
        this.i = save;
      }
      return T.num(Number(tok));
    }
    return { t: 'op', v: tok };
  };

  Lexer.prototype.literalString = function () {
    const s = this.s;
    this.i++;                       // '('
    let depth = 1, out = [];
    while (this.i < s.length) {
      const c = s[this.i];
      if (c === '\\') {
        const d = s[this.i + 1];
        this.i += 2;
        if (d === 'n') out.push(10);
        else if (d === 'r') out.push(13);
        else if (d === 't') out.push(9);
        else if (d === 'b') out.push(8);
        else if (d === 'f') out.push(12);
        else if (d === '\n') { /* 줄 잇기 */ }
        else if (d === '\r') { if (s[this.i] === '\n') this.i++; }
        else if (d >= '0' && d <= '7') {
          let oct = d;
          while (oct.length < 3 && s[this.i] >= '0' && s[this.i] <= '7') oct += s[this.i++];
          out.push(parseInt(oct, 8) & 0xff);
        } else out.push(d.charCodeAt(0) & 0xff);
        continue;
      }
      this.i++;
      if (c === '(') { depth++; out.push(40); continue; }
      if (c === ')') { depth--; if (!depth) break; out.push(41); continue; }
      out.push(c.charCodeAt(0) & 0xff);
    }
    return T.str(Uint8Array.from(out), false);
  };

  Lexer.prototype.hexString = function () {
    const s = this.s;
    this.i++;                       // '<'
    let hex = '';
    while (this.i < s.length && s[this.i] !== '>') { const c = s[this.i++]; if (/[0-9A-Fa-f]/.test(c)) hex += c; }
    this.i++;
    if (hex.length % 2) hex += '0';
    const out = new Uint8Array(hex.length / 2);
    for (let k = 0; k < out.length; k++) out[k] = parseInt(hex.substr(k * 2, 2), 16);
    return T.str(out, true);
  };

  Lexer.prototype.dict = function () {
    const s = this.s;
    this.i += 2;                    // '<<'
    const map = new Map();
    for (;;) {
      this.skip();
      if (this.i >= s.length) break;
      if (s[this.i] === '>' && s[this.i + 1] === '>') { this.i += 2; break; }
      if (s[this.i] !== '/') { const junk = this.value(); if (junk === null) break; continue; }
      const key = this.value();
      const val = this.value();
      if (val === null) break;
      map.set(key.v, val);
    }
    return T.dict(map);
  };

  // ── 문서 ───────────────────────────────────────────────────────────
  function latin1(bytes) {
    let out = '';
    const CH = 0x8000;
    for (let i = 0; i < bytes.length; i += CH) out += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(bytes.length, i + CH)));
    return out;
  }

  function bytesOf(text) {
    const out = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) out[i] = text.charCodeAt(i) & 0xff;
    return out;
  }

  function concatBytes(list) {
    let n = 0;
    for (const b of list) n += b.length;
    const out = new Uint8Array(n);
    let at = 0;
    for (const b of list) { out.set(b, at); at += b.length; }
    return out;
  }

  function get(doc, v) {
    let guard = 0;
    while (v && v.t === 'ref') {
      if (++guard > 64) return null;
      v = doc.objects.get(v.num) || null;
    }
    return v;
  }
  function dget(doc, dict, key) {
    if (!dict) return null;
    const d = dict.t === 'stream' ? dict.dict : dict;
    if (!d || d.t !== 'dict') return null;
    return get(doc, d.map.get(key) || null);
  }
  function dgetRaw(dict, key) {
    if (!dict) return null;
    const d = dict.t === 'stream' ? dict.dict : dict;
    if (!d || d.t !== 'dict') return null;
    return d.map.get(key) || null;
  }
  function numOf(v, fallback) { return v && v.t === 'num' ? v.v : fallback; }

  // 객체 머리글을 앞에서부터 차례로 훑는다. 스트림 안의 이진 데이터가
  // "12 0 obj" 처럼 보일 수 있으므로 **커서를 스트림 끝 뒤로 밀어** 가며 읽는다.
  function scanObjects(text) {
    const found = [];
    const re = /(\d+)[\s]+(\d+)[\s]+obj\b/g;
    let cursor = 0;
    for (;;) {
      re.lastIndex = cursor;
      const m = re.exec(text);
      if (!m) break;
      const num = Number(m[1]);
      const lex = new Lexer(text, m.index + m[0].length);
      let value = lex.value();
      if (value === null) { cursor = m.index + m[0].length; continue; }
      const save = lex.i;
      const next = lex.token();
      if (next === 'stream') {
        let ds = lex.i;
        if (text[ds] === '\r') ds++;
        if (text[ds] === '\n') ds++;
        found.push({ num, value, streamStart: ds, dictEnd: save });
        // 길이는 간접 참조일 수 있어 2차에서 확정한다. 일단 endstream 으로 민다.
        const es = text.indexOf('endstream', ds);
        cursor = es < 0 ? ds : es + 9;
      } else {
        found.push({ num, value, streamStart: -1 });
        cursor = save;
      }
    }
    return found;
  }

  async function inflate(bytes, inflateFn) {
    if (inflateFn) return inflateFn(bytes);
    if (typeof DecompressionStream === 'function') {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    throw new Error('이 환경에서는 압축된 PDF 스트림을 풀 수 없습니다.');
  }

  // 압축 스트림을 풀어 준다. 실패하면 원본을 그대로 둔다 — 설명 레이어처럼
  // 손대지 않고 그대로 옮길 것은 굳이 풀 필요가 없다.
  async function loadDocument(bytes, opts) {
    const options = opts || {};
    const text = latin1(bytes);
    if (text.slice(0, 5) !== '%PDF-') throw new Error('PDF(=AI) 머리글이 아닙니다.');
    const raw = scanObjects(text);
    const objects = new Map();
    const doc = { bytes, text, objects, version: text.slice(5, 8) };
    for (const item of raw) objects.set(item.num, item.value);
    // 스트림 길이를 확정한다.
    for (const item of raw) {
      if (item.streamStart < 0) continue;
      const dict = item.value;
      let len = numOf(get(doc, dgetRaw(dict, 'Length')), -1);
      let end;
      if (len >= 0 && item.streamStart + len <= text.length) {
        end = item.streamStart + len;
        const after = text.slice(end, end + 20);
        if (!/^\s*endstream/.test(after)) len = -1;
      }
      if (len < 0) {
        let es = text.indexOf('endstream', item.streamStart);
        if (es < 0) es = text.length;
        end = es;
        while (end > item.streamStart && (text[end - 1] === '\n' || text[end - 1] === '\r')) end--;
      }
      objects.set(item.num, { t: 'stream', dict, raw: bytes.subarray(item.streamStart, end) });
    }
    // 객체 스트림(ObjStm)을 펼친다. Illustrator 는 안 쓰지만 다른 도구가 쓴다.
    for (const [, value] of Array.from(objects)) {
      if (!value || value.t !== 'stream') continue;
      const type = dgetRaw(value.dict, 'Type');
      if (!type || type.t !== 'name' || type.v !== 'ObjStm') continue;
      let data;
      try { data = await streamData(doc, value, options.inflate); } catch (e) { continue; }
      const n = numOf(dget(doc, value.dict, 'N'), 0);
      const first = numOf(dget(doc, value.dict, 'First'), 0);
      const body = latin1(data);
      const head = new Lexer(body.slice(0, first), 0);
      const pairs = [];
      for (let k = 0; k < n; k++) {
        const a = head.token(), b = head.token();
        if (a === null || b === null) break;
        pairs.push([Number(a), Number(b)]);
      }
      for (const [num, off] of pairs) {
        if (objects.has(num) && objects.get(num) !== value) continue;
        const lex = new Lexer(body, first + off);
        const parsed = lex.value();
        if (parsed) objects.set(num, parsed);
      }
    }
    doc.trailer = readTrailer(doc, text);
    // 암호가 걸린 PDF 는 문자열도 스트림도 못 읽는다. 여기서 안 막으면
    // "레이어를 찾지 못했습니다" 라는 엉뚱한 말이 나와 이름을 의심하게 된다.
    if (doc.trailer && doc.trailer.map && doc.trailer.map.has('Encrypt')) {
      throw new Error('암호가 걸린 PDF 입니다. 인쇄소에 암호 없는 가이드를 요청하거나, 일러스트레이터에서 암호를 풀어 다시 저장해 주세요.');
    }
    return doc;
  }

  function readTrailer(doc, text) {
    let at = text.lastIndexOf('trailer');
    while (at >= 0) {
      const lex = new Lexer(text, at + 7);
      const d = lex.value();
      if (d && d.t === 'dict' && d.map.has('Root')) return d;
      at = text.lastIndexOf('trailer', at - 1);
    }
    // XRef 스트림 문서: /Type /XRef 를 가진 스트림이 곧 트레일러다.
    for (const [, value] of doc.objects) {
      if (value && value.t === 'stream') {
        const type = dgetRaw(value.dict, 'Type');
        if (type && type.t === 'name' && type.v === 'XRef' && value.dict.map.has('Root')) return value.dict;
      }
    }
    // 마지막 수단: /Type /Catalog 를 직접 찾는다.
    for (const [num, value] of doc.objects) {
      const type = dgetRaw(value, 'Type');
      if (type && type.t === 'name' && type.v === 'Catalog') {
        const d = T.dict(new Map()); d.map.set('Root', T.ref(num, 0)); return d;
      }
    }
    return null;
  }

  async function streamData(doc, stream, inflateFn) {
    const filter = dget(doc, stream.dict, 'Filter');
    const names = !filter ? [] : filter.t === 'name' ? [filter.v] : filter.t === 'array' ? filter.v.map(f => (get(doc, f) || {}).v) : [];
    let data = stream.raw;
    for (const name of names) {
      if (name === 'FlateDecode') data = await inflate(data, inflateFn);
      else if (name === 'ASCIIHexDecode') {
        const hex = latin1(data).replace(/[^0-9A-Fa-f]/g, '');
        const out = new Uint8Array(Math.floor(hex.length / 2));
        for (let k = 0; k < out.length; k++) out[k] = parseInt(hex.substr(k * 2, 2), 16);
        data = out;
      } else throw new Error('지원하지 않는 스트림 필터: ' + name);
    }
    const parms = dget(doc, stream.dict, 'DecodeParms');
    if (parms && parms.t === 'dict') {
      const predictor = numOf(dget(doc, parms, 'Predictor'), 1);
      if (predictor >= 10) data = unpredict(data, numOf(dget(doc, parms, 'Colors'), 1), numOf(dget(doc, parms, 'BitsPerComponent'), 8), numOf(dget(doc, parms, 'Columns'), 1));
    }
    return data;
  }

  function unpredict(data, colors, bpc, columns) {
    const bpp = Math.max(1, Math.ceil(colors * bpc / 8));
    const rowLen = Math.ceil(colors * bpc * columns / 8);
    const rows = Math.floor(data.length / (rowLen + 1));
    const out = new Uint8Array(rows * rowLen);
    let prev = new Uint8Array(rowLen);
    for (let r = 0; r < rows; r++) {
      const tag = data[r * (rowLen + 1)];
      const src = data.subarray(r * (rowLen + 1) + 1, r * (rowLen + 1) + 1 + rowLen);
      const cur = out.subarray(r * rowLen, (r + 1) * rowLen);
      for (let i = 0; i < rowLen; i++) {
        const a = i >= bpp ? cur[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0, x = src[i];
        let v;
        if (tag === 0) v = x;
        else if (tag === 1) v = x + a;
        else if (tag === 2) v = x + b;
        else if (tag === 3) v = x + ((a + b) >> 1);
        else {
          const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
        }
        cur[i] = v & 0xff;
      }
      prev = cur;
    }
    return out;
  }

  // ── 레이어 이름 → 역할 ─────────────────────────────────────────────
  // 인쇄소마다 말이 다르다. "재단"·"칼선"·"도무송"·"CutContour" 가 다 같은 것이고
  // "컬러"·"그림"·"도안" 이 다 같은 것이다. 못 알아본 이름은 그대로 둔다 —
  // 모르는 레이어를 함부로 갈아 끼우느니 손대지 않는 편이 안전하다.
  const ROLE_RULES = [
    // v110: 실제로 못 알아본 이름들을 넣었다 — 단독 "Cut", "다이컷", "아웃라인".
    ['cut', /재단|칼선|칼\s*선|도무송|따내기|커팅|컷팅|다이\s*컷|아웃\s*라인|외곽선|cut\s*?line|cutline|cut\s*contour|cutcontour|thom|die\s*cut|trim\s*line|out\s*line|\bcut\b|\bcrease\b/i],
    ['white', /화이트|하이트|백색|흰색|백판|white/i],
    ['note', /설명|안내|가이드|주의|참고|guide|note|readme|caution|info/i],
    ['art', /컬러|칼라|칼러|그림|도안|이미지|디자인|인쇄|art\s*work|artwork|colou?r|design|image|print/i]
  ];

  function classifyLayer(name) {
    const text = String(name || '');
    for (const [role, re] of ROLE_RULES) if (re.test(text)) return role;
    return 'other';
  }

  // 같은 역할이 여럿이면 (컬러-앞 / 컬러-뒤) 앞/뒤를 구분해 둔다.
  // "컬러앞(앞뒤다른그림기준)" 처럼 괄호 안 설명에 앞·뒤가 같이 들어 있다.
  // 괄호 앞의 이름만 본다 — 그것이 레이어의 뜻이다.
  function layerSide(name) {
    const text = String(name || '').split(/[(\[（【]/)[0];
    if (/뒤|후면|배면|back|rear|reverse/i.test(text)) return 'back';
    if (/앞|전면|front|face/i.test(text)) return 'front';
    return '';
  }

  function pdfTextOf(strValue) {
    const b = strValue.v;
    if (b.length >= 2 && b[0] === 0xfe && b[1] === 0xff) {
      let out = '';
      for (let i = 2; i + 1 < b.length; i += 2) out += String.fromCharCode((b[i] << 8) | b[i + 1]);
      return out;
    }
    // PDFDocEncoding 은 ASCII 범위에서 Latin-1 과 같다.
    let out = '';
    for (let i = 0; i < b.length; i++) out += String.fromCharCode(b[i]);
    return out;
  }

  // ── 내용 스트림 훑기 ───────────────────────────────────────────────
  // /OC /MCn BDC … EMC 구간을 찾는다. 문자열·인라인 이미지 안의 글자를
  // 연산자로 착각하지 않도록 토큰 단위로 읽는다.
  function scanContentSpans(text) {
    const spans = [];
    const lex = new Lexer(text, 0);
    const stack = [];
    let operands = [];
    while (lex.i < text.length) {
      lex.skip();
      if (lex.i >= text.length) break;
      const at = lex.i;
      const c = text[at];
      if (c === '(' || c === '<' || c === '[' || c === '/') { lex.value(); operands.push(text.slice(at, lex.i)); continue; }
      const tok = lex.token();
      if (tok === null) break;
      if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(tok)) { operands.push(tok); continue; }
      if (tok === 'BI') {                         // 인라인 이미지 — EI 까지 건너뛴다
        const ei = text.indexOf('EI', lex.i);
        lex.i = ei < 0 ? text.length : ei + 2;
        operands = [];
        continue;
      }
      if (tok === 'BDC' || tok === 'BMC') {
        const tag = operands.length >= 2 ? operands[operands.length - 2] : operands[operands.length - 1] || '';
        const prop = operands.length >= 2 ? operands[operands.length - 1] : '';
        stack.push({ tag, prop, headStart: at - 0, start: lex.i, depth: stack.length, opStart: operandStart(text, at, operands) });
        operands = [];
        continue;
      }
      if (tok === 'EMC') {
        const open = stack.pop();
        if (open && open.depth === 0) {
          spans.push({
            tag: open.tag,
            property: open.prop.replace(/^\//, ''),
            outerStart: open.opStart,
            innerStart: open.start,
            innerEnd: at,
            outerEnd: lex.i
          });
        }
        operands = [];
        continue;
      }
      operands = [];
    }
    return spans;
  }

  // BDC 앞에 붙은 피연산자들의 시작 위치를 되짚는다.
  function operandStart(text, bdcAt, operands) {
    let at = bdcAt;
    for (let k = operands.length - 1; k >= 0 && k >= operands.length - 2; k--) {
      const token = operands[k];
      const found = text.lastIndexOf(token, at - 1);
      if (found < 0) break;
      at = found;
    }
    return at;
  }

  const PAINT_OPS = {
    S: 'stroke', s: 'stroke', B: 'both', 'B*': 'both', b: 'both', 'b*': 'both',
    f: 'fill', F: 'fill', 'f*': 'fill', n: 'none'
  };

  // 한 구간이 **어떻게 그려졌는지** 읽는다. 획인지 채우기인지, 무슨 색인지,
  // 선 굵기가 얼마인지. 우리가 새로 그릴 때 이걸 그대로 쓴다.
  function readSpanStyle(all, span) {
    const inner = all.slice(span.innerStart, span.innerEnd);
    const style = { paint: 'none', strokeColor: '', fillColor: '', strokeSpace: '', fillSpace: '', width: null, caps: null, joins: null, ops: [], xobjects: [] };
    const lex = new Lexer(inner, 0);
    let operands = [];
    let pendingStrokeSpace = '', pendingFillSpace = '';
    while (lex.i < inner.length) {
      lex.skip();
      if (lex.i >= inner.length) break;
      const at = lex.i, c = inner[at];
      if (c === '(' || c === '<' || c === '[' || c === '/') { lex.value(); operands.push(inner.slice(at, lex.i)); continue; }
      const tok = lex.token();
      if (tok === null) break;
      if (/^[+-]?(\d+\.?\d*|\.\d+)$/.test(tok)) { operands.push(tok); continue; }
      const args = operands.join(' ');
      if (tok === 'cs') { pendingFillSpace = operands[0] || ''; style.fillSpace = pendingFillSpace; }
      else if (tok === 'CS') { pendingStrokeSpace = operands[0] || ''; style.strokeSpace = pendingStrokeSpace; }
      else if (tok === 'scn' || tok === 'sc') style.fillColor = args + ' ' + tok;
      else if (tok === 'SCN' || tok === 'SC') style.strokeColor = args + ' ' + tok;
      else if (tok === 'g' || tok === 'rg' || tok === 'k') { style.fillColor = args + ' ' + tok; style.fillSpace = ''; }
      else if (tok === 'G' || tok === 'RG' || tok === 'K') { style.strokeColor = args + ' ' + tok; style.strokeSpace = ''; }
      else if (tok === 'w') style.width = Number(operands[0]);
      else if (tok === 'J') style.caps = Number(operands[0]);
      else if (tok === 'j') style.joins = Number(operands[0]);
      else if (tok === 'Do') style.xobjects.push((operands[0] || '').replace(/^\//, ''));
      else if (tok === 'Tj' || tok === 'TJ' || tok === "'" || tok === '"') style.hasText = true;
      else if (Object.prototype.hasOwnProperty.call(PAINT_OPS, tok)) {
        style.ops.push(tok);
        const kind = PAINT_OPS[tok];
        if (kind === 'stroke' && style.paint !== 'both') style.paint = style.paint === 'fill' ? 'both' : 'stroke';
        else if (kind === 'fill' && style.paint !== 'both') style.paint = style.paint === 'stroke' ? 'both' : 'fill';
        else if (kind === 'both') style.paint = 'both';
      }
      operands = [];
    }
    // 구간 안에서 색 공간을 안 정했으면 앞 구간에서 물려받은 것을 찾는다.
    if (style.fillColor && !style.fillSpace) style.fillSpace = lastColorSpace(all, span.innerStart, 'cs');
    if (style.strokeColor && !style.strokeSpace) style.strokeSpace = lastColorSpace(all, span.innerStart, 'CS');
    return style;
  }

  function lastColorSpace(all, before, op) {
    const head = all.slice(0, before);
    const re = new RegExp('(/[^\\s/\\[\\]<>()]+)\\s+' + op + '(?![A-Za-z*])', 'g');
    let m, found = '';
    while ((m = re.exec(head))) found = m[1];
    return found;
  }

  // ── 가이드 읽기 ────────────────────────────────────────────────────
  const PT_PER_MM = 72 / 25.4;

  function boxOf(doc, page, key) {
    const v = dget(doc, page, key);
    if (!v || v.t !== 'array' || v.v.length < 4) return null;
    const n = v.v.map(x => numOf(get(doc, x), 0));
    const x0 = Math.min(n[0], n[2]), y0 = Math.min(n[1], n[3]);
    const x1 = Math.max(n[0], n[2]), y1 = Math.max(n[1], n[3]);
    return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
  }

  // 페이지 상자는 물려받는다(MediaBox 는 Pages 에만 있을 수 있다).
  function inheritedBox(doc, page, key) {
    let node = page, guard = 0;
    while (node && guard++ < 32) {
      const box = boxOf(doc, node, key);
      if (box) return box;
      node = dget(doc, node, 'Parent');
    }
    return null;
  }

  function collectPages(doc, node, out, seen) {
    if (!node || out.length > 512) return;
    const type = dget(doc, node, 'Type');
    const kids = dget(doc, node, 'Kids');
    if (kids && kids.t === 'array') {
      for (const kid of kids.v) {
        const key = kid.t === 'ref' ? kid.num : null;
        if (key !== null) { if (seen.has(key)) continue; seen.add(key); }
        collectPages(doc, get(doc, kid), out, seen);
      }
      return;
    }
    if (type && type.t === 'name' && type.v === 'Pages') return;
    out.push(node);
  }

  function refNumOf(doc, value) {
    if (value && value.t === 'ref') return value.num;
    for (const [num, obj] of doc.objects) if (obj === value) return num;
    return -1;
  }

  async function parseGuide(bytes, opts) {
    const options = opts || {};
    const doc = await loadDocument(bytes, options);
    const catalog = dget(doc, doc.trailer, 'Root');
    if (!catalog) throw new Error('PDF 카탈로그를 찾지 못했습니다.');
    const pagesRoot = dget(doc, catalog, 'Pages');
    const pageDicts = [];
    collectPages(doc, pagesRoot, pageDicts, new Set());
    if (!pageDicts.length) throw new Error('페이지를 찾지 못했습니다.');

    // OCG 목록과 쌓임 순서
    const ocp = dget(doc, catalog, 'OCProperties');
    const dflt = dget(doc, ocp, 'D');
    const ocgOrder = [];
    const orderValue = dget(doc, dflt, 'Order');
    (function walk(v) {
      if (!v) return;
      if (v.t === 'array') { for (const item of v.v) walk(item.t === 'ref' ? item : get(doc, item)); return; }
      if (v.t === 'ref') { if (!ocgOrder.includes(v.num)) ocgOrder.push(v.num); }
    })(orderValue);
    const ocgAll = [];
    const ocgsValue = dgetRaw(dflt ? ocp : null, 'OCGs') || (ocp ? ocp.map.get('OCGs') : null);
    if (ocgsValue && ocgsValue.t === 'array') for (const item of ocgsValue.v) if (item.t === 'ref' && !ocgAll.includes(item.num)) ocgAll.push(item.num);
    for (const num of ocgAll) if (!ocgOrder.includes(num)) ocgOrder.push(num);

    const ocgName = new Map();
    for (const num of ocgOrder) {
      const ocg = doc.objects.get(num);
      const nameValue = dget(doc, ocg, 'Name');
      ocgName.set(num, nameValue && nameValue.t === 'str' ? pdfTextOf(nameValue) : '레이어 ' + num);
    }

    const warnings = [];
    const pages = [];
    for (let index = 0; index < pageDicts.length; index++) {
      const page = pageDicts[index];
      const media = inheritedBox(doc, page, 'MediaBox') || { x0: 0, y0: 0, x1: 595.276, y1: 841.89, w: 595.276, h: 841.89 };
      const trim = boxOf(doc, page, 'TrimBox') || boxOf(doc, page, 'ArtBox') || media;
      const art = boxOf(doc, page, 'ArtBox') || trim;
      let content = '';
      const contents = dget(doc, page, 'Contents');
      const streams = contents && contents.t === 'array' ? contents.v.map(v => get(doc, v)) : [contents];
      for (const stream of streams) {
        if (!stream || stream.t !== 'stream') continue;
        try { content += latin1(await streamData(doc, stream, options.inflate)) + '\n'; }
        catch (error) { warnings.push((index + 1) + '쪽 내용 스트림을 읽지 못했습니다: ' + (error && error.message || error)); }
      }
      const props = dget(doc, dget(doc, page, 'Resources'), 'Properties');
      const propToOcg = new Map();
      const ocgToProp = new Map();
      if (props && props.t === 'dict') {
        for (const [key, value] of props.map) {
          const num = value && value.t === 'ref' ? value.num : refNumOf(doc, get(doc, value));
          if (num >= 0) { propToOcg.set(key, num); if (!ocgToProp.has(num)) ocgToProp.set(num, key); }
        }
      }
      const spans = scanContentSpans(content).filter(s => s.tag === '/OC');
      const spanByOcg = new Map();
      for (const span of spans) {
        const num = propToOcg.has(span.property) ? propToOcg.get(span.property) : -1;
        if (num < 0) continue;
        if (!spanByOcg.has(num)) spanByOcg.set(num, []);
        spanByOcg.get(num).push(span);
      }
      const layers = [];
      for (const num of ocgOrder) {
        const list = spanByOcg.get(num) || [];
        const styles = list.map(span => readSpanStyle(content, span));
        const drawn = styles.find(s => s.paint !== 'none') || styles[0] || null;
        const painted = styles.some(s => s.paint !== 'none' || s.xobjects.length || s.hasText);
        const name = ocgName.get(num) || ('레이어 ' + num);
        layers.push({
          ocg: num,
          name,
          role: classifyLayer(name),
          side: layerSide(name),
          property: ocgToProp.get(num) || '',
          spans: list,
          empty: !list.length || !painted,
          style: drawn
        });
      }
      pages.push({
        index,
        pageDict: page,
        pageRef: refNumOf(doc, page),
        content,
        media, trim, art,
        widthMm: media.w / PT_PER_MM,
        heightMm: media.h / PT_PER_MM,
        trimWidthMm: trim.w / PT_PER_MM,
        trimHeightMm: trim.h / PT_PER_MM,
        layers,
        propToOcg
      });
    }

    // 재단·화이트가 어느 쪽에도 없으면 알려 준다. 이름이 다른 인쇄소일 수 있다.
    const roles = new Set();
    for (const page of pages) for (const layer of page.layers) roles.add(layer.role);
    if (!roles.has('cut')) warnings.push('재단(칼선) 레이어를 찾지 못했습니다. 레이어를 직접 지정해 주세요.');
    if (!roles.has('white')) warnings.push('화이트 레이어를 찾지 못했습니다. 레이어를 직접 지정해 주세요.');

    return { doc, catalog, pages, ocgOrder, ocgName, warnings, hasPrivateData: /AIPrivateData/.test(doc.text) };
  }

  // 가장 내용이 많은 쪽 — 보통 1쪽이 단면, 2쪽이 양면 샘플이다.
  function pickBestPage(guide, want) {
    const scored = guide.pages.map(page => {
      const arts = page.layers.filter(l => l.role === 'art' && !l.empty).length;
      let score = 0;
      if (page.layers.some(l => l.role === 'cut' && !l.empty)) score += 8;
      if (page.layers.some(l => l.role === 'white')) score += 2;
      // 양면 가이드를 달라고 하지 않는 한 **단면 쪽**을 고른다. 아트보드가
      // 여럿인 가이드는 보통 1쪽이 기본, 2쪽이 앞뒤 다른 그림 예시다.
      score += want === 'double' ? Math.min(4, arts) : (arts <= 1 ? 4 : 0);
      return { page, score };
    });
    let best = scored[0];
    for (const item of scored) if (item.score > best.score) best = item;
    return best ? best.page : guide.pages[0];
  }

  // ── 배치 ───────────────────────────────────────────────────────────
  // 우리 도안은 mm 로, 가이드는 pt 로 산다. 기본은 **1:1 실제 크기** —
  // 인쇄소가 보는 것은 실제 치수다. 판형보다 크면 그때만 줄인다.
  function computePlacement(page, widthMm, heightMm, opts) {
    const options = opts || {};
    const boxName = options.box === 'media' ? 'media' : options.box === 'art' ? 'art' : 'trim';
    const box = page[boxName] || page.media;
    const marginPt = Math.max(0, Number(options.marginMm) || 0) * PT_PER_MM;
    const availW = Math.max(1e-6, box.w - marginPt * 2);
    const availH = Math.max(1e-6, box.h - marginPt * 2);
    const wantW = widthMm * PT_PER_MM, wantH = heightMm * PT_PER_MM;
    let scale = 1, fitted = false;
    if (options.fit === 'fill') { scale = Math.min(availW / wantW, availH / wantH); fitted = true; }
    else if (wantW > availW + 1e-6 || wantH > availH + 1e-6) { scale = Math.min(availW / wantW, availH / wantH); fitted = true; }
    const drawW = wantW * scale, drawH = wantH * scale;
    // 판형 한가운데가 기본이고, 거기서 사람이 밀어 놓을 수 있다. 키링처럼
    // 위쪽에 고리 자리가 있어 그림이 아래로 내려가야 하는 제품이 있다 (v110).
    const shiftX = (Number(options.offsetXMm) || 0) * PT_PER_MM;
    const shiftY = (Number(options.offsetYMm) || 0) * PT_PER_MM;
    const ox = box.x0 + (box.w - drawW) / 2 + shiftX;
    const oy = box.y0 + (box.h - drawH) / 2 + shiftY;
    return {
      box: boxName, scale, fitted,
      offsetXMm: shiftX / PT_PER_MM, offsetYMm: shiftY / PT_PER_MM,
      ox, oy, widthPt: drawW, heightPt: drawH,
      widthMm: drawW / PT_PER_MM, heightMm: drawH / PT_PER_MM,
      // 픽셀 좌표(왼쪽 위 원점) → 페이지 좌표(왼쪽 아래 원점)
      mapper(widthPx, heightPx) {
        const sx = drawW / widthPx, sy = drawH / heightPx;
        return { sx, sy, x: px => ox + px * sx, y: py => oy + (heightPx - py) * sy };
      }
    };
  }

  // ── 다시 써 내기 ───────────────────────────────────────────────────
  function fmt(n) {
    if (!Number.isFinite(n)) return '0';
    const s = n.toFixed(4);
    return s.replace(/\.?0+$/, '') || '0';
  }

  function writeValue(value, mapRef) {
    if (!value) return 'null';
    switch (value.t) {
      case 'num': return fmt(value.v);
      case 'bool': return value.v ? 'true' : 'false';
      case 'null': return 'null';
      case 'name': return '/' + encodeName(value.v);
      case 'ref': return mapRef(value.num) + ' 0 R';
      case 'str': {
        if (value.hex) {
          let hex = '';
          for (let i = 0; i < value.v.length; i++) hex += value.v[i].toString(16).padStart(2, '0');
          return '<' + hex.toUpperCase() + '>';
        }
        // 한글 레이어 이름은 UTF-16BE 라 높은 바이트가 그대로 들어 있다.
        // Illustrator 자신도 이것을 **날바이트로** 쓴다(원본 가이드를 뜯어 확인).
        // 8진 이스케이프도 규격상 같은 뜻이지만, 읽는 쪽 구현을 믿지 말고
        // 원본과 같은 모양으로 써 준다. 제어문자와 괄호·역슬래시만 피한다.
        let out = '(';
        for (let i = 0; i < value.v.length; i++) {
          const b = value.v[i];
          if (b === 40 || b === 41 || b === 92) out += '\\' + String.fromCharCode(b);
          else if (b < 32) out += '\\' + b.toString(8).padStart(3, '0');
          else out += String.fromCharCode(b);
        }
        return out + ')';
      }
      case 'array': return '[' + value.v.map(v => writeValue(v, mapRef)).join(' ') + ']';
      case 'dict': {
        let out = '<<';
        for (const [key, v] of value.map) out += '/' + encodeName(key) + ' ' + writeValue(v, mapRef) + ' ';
        return out.trimEnd() + '>>';
      }
      case 'stream': return writeValue(value.dict, mapRef);
      default: return 'null';
    }
  }

  function cloneDict(dict) {
    const map = new Map();
    if (dict && dict.t === 'dict') for (const [key, value] of dict.map) map.set(key, value);
    return T.dict(map);
  }

  // 우리가 그릴 구간의 내용을 만든다. 가이드가 쓰던 색·굵기를 그대로 쓴다.
  function cutBody(style, ops, fallbackSpace) {
    let out = 'q\n';
    if (style && style.strokeColor) {
      if (style.strokeSpace) out += style.strokeSpace + ' CS\n';
      out += style.strokeColor + '\n';
    } else {
      out += '/' + fallbackSpace + ' CS\n1 SCN\n';
    }
    // PDF 의 선 굵기 초기값은 1pt 다. 가이드가 w 를 안 적고 획을 그렸다면
    // 화면에 보이던 그 굵기가 1pt 라는 뜻이므로 그대로 따라간다.
    const width = style && Number.isFinite(style.width) && style.width > 0 ? style.width
      : (style && style.strokeColor ? 1 : 0.25);
    out += fmt(width) + ' w\n';
    out += fmt(style && Number.isFinite(style.caps) ? style.caps : 1) + ' J\n';
    out += fmt(style && Number.isFinite(style.joins) ? style.joins : 1) + ' j\n';
    out += ops;
    out += 'S\n';
    out += 'Q\n';
    return out;
  }

  function whiteBody(style, ops, fallbackSpace, rule) {
    let out = 'q\n';
    if (style && style.fillColor) {
      if (style.fillSpace) out += style.fillSpace + ' cs\n';
      out += style.fillColor + '\n';
    } else {
      out += '/' + fallbackSpace + ' cs\n1 scn\n';
    }
    out += ops;
    out += (rule === 'nonzero' ? 'f\n' : 'f*\n');
    out += 'Q\n';
    return out;
  }

  function imageBody(name, place) {
    return 'q\n' + fmt(place.widthPt) + ' 0 0 ' + fmt(place.heightPt) + ' ' + fmt(place.ox) + ' ' + fmt(place.oy) + ' cm\n/' + name + ' Do\nQ\n';
  }

  // 원본 내용 스트림에서 구간 몸통만 갈아 끼운다. 손대지 않는 레이어(설명 등)는
  // 바이트 그대로 남는다 — 인쇄소가 넣어 둔 안내를 우리가 다시 그릴 이유가 없다.
  // 가이드의 원본 스트림은 구간을 넘나들며 q/Q 를 연다. 실제로 그랬다 —
  // 화이트 구간이 q 를 하나 열어 두면 다음 구간이 첫 줄의 Q 로 닫는다.
  // 그 다음 구간을 우리 것으로 갈아 끼우면 열린 q 가 갈 곳을 잃는다.
  // 그래서 **손대지 않는 구간도 스스로 균형을 맞추게** 앞뒤에 q/Q 를 채운다.
  // 짝이 맞는 q/Q 를 덧대는 것은 그리기 결과를 바꾸지 않는다.
  function balanceSpan(body) {
    const lex = new Lexer(body, 0);
    let depth = 0, deficit = 0;
    while (lex.i < body.length) {
      lex.skip();
      if (lex.i >= body.length) break;
      const c = body[lex.i];
      if (c === '(' || c === '<' || c === '[' || c === '/') { lex.value(); continue; }
      const tok = lex.token();
      if (tok === null) break;
      if (tok === 'q') depth++;
      else if (tok === 'Q') { if (depth > 0) depth--; else deficit++; }
      else if (tok === 'BI') { const ei = body.indexOf('EI', lex.i); lex.i = ei < 0 ? body.length : ei + 2; }
    }
    if (!depth && !deficit) return body;
    return 'q\n'.repeat(deficit) + body + 'Q\n'.repeat(depth);
  }

  // dropped 에 든 OCG 는 **구간째** 버린다. 몸통만 비우면 /OC ... BDC EMC 껍데기가
  // 남아 내용 스트림이 여전히 그 레이어를 가리키고, 목록에서만 빠져 어정쩡해진다.
  function rewriteContent(page, bodies, appended, dropped, order) {
    const spans = [];
    for (const layer of page.layers) for (const span of layer.spans) spans.push({ span, ocg: layer.ocg });
    spans.sort((a, b) => a.span.outerStart - b.span.outerStart);
    // 화면에서 순서를 바꿨으면 **구간을 그 순서로 다시 쓴다** (v138).
    // 구간 밖의 내용은 자리를 그대로 두고, 구간들만 첫 구간 자리에 몰아 넣는다 —
    // 그래야 페이지 수준 설정(변환·자르기)이 안 흐트러진다.
    // PDF 는 **나중에 그린 것이 위**라서, 화면 목록(맨 위가 맨 앞)을 뒤집어 쓴다.
    if (order && order.length) {
      const rank = new Map(order.map((ocg, i) => [ocg, order.length - i]));
      spans.sort((a, b) => (rank.get(a.ocg) ?? -1) - (rank.get(b.ocg) ?? -1)
        || a.span.outerStart - b.span.outerStart);
      const first = Math.min(...spans.map(item => item.span.outerStart));
      let out = page.content.slice(0, first);
      const used = new Set(), tail = [];
      for (const item of spans) {
        if (dropped && dropped.has(item.ocg)) continue;
        if (!bodies.has(item.ocg)) {
          out += '/OC /' + item.span.property + ' BDC\n' + balanceSpan(page.content.slice(item.span.innerStart, item.span.innerEnd)) + '\nEMC\n';
          continue;
        }
        const body = used.has(item.ocg) ? '' : bodies.get(item.ocg);
        used.add(item.ocg);
        out += '/OC /' + item.span.property + ' BDC\n' + body + 'EMC\n';
      }
      // 원래 구간 사이사이에 있던 내용은 순서대로 이어 붙인다.
      const plain = [...spans].sort((a, b) => a.span.outerStart - b.span.outerStart);
      let at = first;
      for (const item of plain) { tail.push(page.content.slice(at, item.span.outerStart)); at = item.span.outerEnd; }
      tail.push(page.content.slice(at));
      out += tail.join('');
      for (const item of appended) {
        if (used.has(item.ocg) || (dropped && dropped.has(item.ocg))) continue;
        out += '/OC /' + item.property + ' BDC\n' + item.body + 'EMC\n';
      }
      return balanceSpan(out);
    }
    const used = new Set();
    let out = '', at = 0;
    for (const item of spans) {
      out += page.content.slice(at, item.span.outerStart);
      at = item.span.outerEnd;
      if (dropped && dropped.has(item.ocg)) continue;
      if (!bodies.has(item.ocg)) {
        const kept = page.content.slice(item.span.innerStart, item.span.innerEnd);
        out += '/OC /' + item.span.property + ' BDC\n' + balanceSpan(kept) + '\nEMC\n';
        continue;
      }
      const body = used.has(item.ocg) ? '' : bodies.get(item.ocg);
      used.add(item.ocg);
      out += '/OC /' + item.span.property + ' BDC\n' + body + 'EMC\n';
    }
    out += page.content.slice(at);
    for (const item of appended) {
      if (used.has(item.ocg)) continue;
      if (dropped && dropped.has(item.ocg)) continue;
      out += '/OC /' + item.property + ' BDC\n' + item.body + 'EMC\n';
    }
    // 구간 밖에 남은 q/Q 까지 마지막에 한 번 더 맞춘다.
    return balanceSpan(out);
  }

  // ── 편집용 AI/PDF 만들기 ───────────────────────────────────────────
  // 가이드의 객체 그래프를 그대로 물려받되 재단·화이트·컬러 구간만 우리 것으로
  // 갈아 끼운다. 그래서 판형·재단선 색·설명 문구가 인쇄소가 준 그대로 남는다.
  function buildFromGuide(guide, options) {
    const opts = options || {};
    const doc = guide.doc;
    const page = typeof opts.page === 'number' ? guide.pages[opts.page] : (opts.page || guide.pages[0]);
    if (!page) throw new Error('가이드 페이지를 고르지 못했습니다.');
    const place = opts.place || computePlacement(page, opts.widthMm || page.trimWidthMm, opts.heightMm || page.trimHeightMm, opts.placement);
    const roles = Object.assign({}, opts.roles || {});
    const layerByOcg = new Map();
    for (const layer of page.layers) layerByOcg.set(layer.ocg, layer);

    let maxOld = 0;
    for (const num of doc.objects.keys()) if (num > maxOld) maxOld = num;
    let synthNext = maxOld + 1;
    const synth = new Map();
    const addObject = value => { const id = synthNext++; synth.set(id, value); return id; };
    const objAt = id => (synth.has(id) ? synth.get(id) : doc.objects.get(id));

    // 자원 묶음을 새 객체로 복제한다. 원본은 다른 페이지와 공유될 수 있으므로
    // 절대 제자리에서 고치지 않는다.
    const resources = cloneDict(dget(doc, page.pageDict, 'Resources') || T.dict(new Map()));
    function subDict(key) {
      const existing = get(doc, resources.map.get(key));
      const fresh = cloneDict(existing && existing.t === 'dict' ? existing : null);
      resources.map.set(key, T.ref(addObject(fresh), 0));
      return fresh;
    }
    const xobjects = subDict('XObject');
    const properties = subDict('Properties');
    const colorspaces = subDict('ColorSpace');
    const procset = T.arr([T.name('PDF'), T.name('Text'), T.name('ImageB'), T.name('ImageC'), T.name('ImageI')]);
    resources.map.set('ProcSet', procset);

    // 인쇄소가 색을 안 정해 둔 레이어를 위한 예비 스팟 컬러.
    let cutSpaceName = '', whiteSpaceName = '';
    function separation(label, c1) {
      const tint = addObject(T.dict(new Map([
        ['FunctionType', T.num(2)], ['Domain', T.arr([T.num(0), T.num(1)])],
        ['C0', T.arr([T.num(0), T.num(0), T.num(0), T.num(0)])],
        ['C1', T.arr(c1.map(T.num))], ['N', T.num(1)]
      ])));
      const space = T.arr([T.name('Separation'), T.name(label), T.name('DeviceCMYK'), T.ref(tint, 0)]);
      const key = 'GM_' + label.toUpperCase().replace(/[^A-Z0-9]/g, '');
      colorspaces.map.set(key, T.ref(addObject(space), 0));
      return key;
    }

    // 아직 /Properties 에 없는 레이어에 이름을 붙여 준다.
    function propertyFor(layer) {
      if (layer.property) return layer.property;
      const key = 'GMOC' + layer.ocg;
      properties.map.set(key, T.ref(layer.ocg, 0));
      layer.property = key;
      return key;
    }

    const bodies = new Map();
    const appended = [];
    const notes = [];
    const created = [];

    // 레이어를 안 살려 저장한 가이드가 있다. 그때는 우리가 레이어를 만들어
    // 넣는다 — 판형과 설명은 인쇄소 것을 그대로 쓰면서 재단·화이트·컬러만
    // 새로 얹는 셈이다 (v110).
    function utf16String(text) {
      const bytes = [0xfe, 0xff];
      for (const ch of String(text)) { const code = ch.charCodeAt(0); bytes.push((code >> 8) & 0xff, code & 0xff); }
      return T.str(Uint8Array.from(bytes), false);
    }
    // 우리가 실제로 쓰는 레이어(칼선·화이트·그림이 들어가는 곳). `안 쓰는 레이어
    // 지우기` 는 이 목록에 없는 것만 버린다.
    const usedOcgs = new Set();
    function createLayer(role, name, why) {
      const id = addObject(T.dict(new Map([['Type', T.name('OCG')], ['Name', utf16String(name)]])));
      const key = 'GMOC' + id;
      properties.map.set(key, T.ref(id, 0));
      const layer = { ocg: id, name, role, side: '', property: key, spans: [], empty: true, style: null, isNew: true };
      created.push(layer);
      layerByOcg.set(id, layer);
      notes.push(why || ('가이드에 ' + name + ' 레이어가 없어 새로 만들었습니다.'));
      return layer;
    }

    // 화면에서 [새 레이어] 로 만든 것 (v143).
    //
    // OCG 번호는 여기서만 딸 수 있으므로(문서 안의 최대 번호 다음), 화면 쪽은
    // `new:1` 같은 **임시 이름표**만 들고 있다가 여기서 진짜 번호로 바꾼다.
    // 바꿔야 하는 곳이 여럿이라(roles · 순서 · 비움 · 지움 · 이름 · 그림)
    // 자리마다 ocgOf 를 한 번씩 태운다.
    const tempOcg = new Map();
    for (const item of (opts.newLayers || [])) {
      if (!item || item.id == null) continue;
      const layer = createLayer('', String(item.name || '새 레이어'),
        '레이어 ' + String(item.name || '새 레이어') + ' 을(를) 새로 만들었습니다.');
      tempOcg.set(item.id, layer.ocg);
    }
    const ocgOf = value => (tempOcg.has(value) ? tempOcg.get(value) : value);
    for (const key of ['cut', 'white', 'art']) if (tempOcg.has(roles[key])) roles[key] = tempOcg.get(roles[key]);
    // roles 에 'new' 가 오면 새로 만든다. 화면에서 "새 레이어로 만들기" 를 고른 것.
    function resolveLayer(role, name, fallbackFinder) {
      const want = roles[role];
      if (want === 'new') return createLayer(role, name);
      if (typeof want === 'number' && layerByOcg.has(want)) return layerByOcg.get(want);
      const found = fallbackFinder();
      return found || null;
    }

    function assign(layer, body) {
      if (!layer) return;
      usedOcgs.add(layer.ocg);
      if (layer.spans.length) bodies.set(layer.ocg, body);
      else appended.push({ ocg: layer.ocg, property: propertyFor(layer), body });
    }

    // 재단
    const cutLayer = resolveLayer('cut', '재단', () => page.layers.find(l => l.role === 'cut'));
    if (opts.cutOps && cutLayer) {
      if (!cutLayer.style || !cutLayer.style.strokeColor) {
        cutSpaceName = separation('CutContour', [0, 1, 0, 0]);
        notes.push('가이드의 재단 레이어가 비어 있어 CutContour 스팟 컬러로 칼선을 그렸습니다.');
      }
      assign(cutLayer, cutBody(cutLayer.style, opts.cutOps, cutSpaceName));
    } else if (opts.cutOps) {
      notes.push('재단 레이어를 찾지 못해 칼선을 넣지 못했습니다.');
    } else if (cutLayer && cutLayer.spans.length && !cutLayer.empty) {
      // 칼선을 안 넣기로 했으면 **가이드의 재단선을 그대로 둔다.** 키링처럼
      // 인쇄소가 모양을 정해 둔 제품은 그 모양을 써야 한다 (v110).
      // `안 쓰는 레이어 지우기` 를 켰으면 이 레이어도 **비운다**(지우지는 않는다) —
      // 아래 블록이 맡는다. 사용자가 그렇게 골랐다: 내보내기에서 체크를 푼 자리는
      // 레이어를 남기되 안을 비운다.
      if (!opts.dropUnusedLayers) {
        usedOcgs.add(cutLayer.ocg);
        notes.push('칼선을 넣지 않아 가이드의 재단선을 그대로 두었습니다.');
      }
    }

    // 화이트
    const whiteLayer = resolveLayer('white', '화이트', () => page.layers.find(l => l.role === 'white'));
    if (opts.whiteOps && whiteLayer) {
      if (!whiteLayer.style || !whiteLayer.style.fillColor) {
        whiteSpaceName = separation('White', [1, 0, 0, 0]);
        notes.push('가이드의 화이트 레이어가 비어 있어 White 스팟 컬러로 채웠습니다.');
      }
      assign(whiteLayer, whiteBody(whiteLayer.style, opts.whiteOps, whiteSpaceName, opts.whiteRule));
    } else if (opts.whiteOps) {
      notes.push('화이트 레이어를 찾지 못해 화이트를 넣지 못했습니다.');
    } else if (whiteLayer && whiteLayer.spans.length && !whiteLayer.empty) {
      // 화이트를 안 넣기로 했으면 **가이드의 샘플 화이트도 비운다.**
      // 안 그러면 인쇄소 샘플 모양이 내 화이트인 척 남는다 (v110).
      bodies.set(whiteLayer.ocg, '');
      notes.push('화이트를 넣지 않아 가이드의 샘플 화이트를 비웠습니다.');
    }

    // 그림 — 이미지 XObject 로 넣는다.
    const artLayers = page.layers.filter(l => l.role === 'art')
      .concat(roles.art === 'new' ? [createLayer('art', '컬러')] : []);
    const images = opts.images || [];
    let imageIndex = 0;
    for (const image of images) {
      let target = image.ocg === 'new' ? artLayers[artLayers.length - 1] : layerByOcg.get(ocgOf(image.ocg));
      if (!target) target = artLayers.find(l => !bodies.has(l.ocg) && !appended.some(a => a.ocg === l.ocg));
      if (!target) { notes.push('그림을 넣을 컬러 레이어가 모자랍니다.'); break; }
      const name = 'GMIm' + imageIndex++;
      const maskId = image.alpha ? addObject({
        t: 'stream',
        dict: T.dict(new Map([
          ['Type', T.name('XObject')], ['Subtype', T.name('Image')],
          ['Width', T.num(image.width)], ['Height', T.num(image.height)],
          ['ColorSpace', T.name('DeviceGray')], ['BitsPerComponent', T.num(8)],
          ['Interpolate', T.bool(true)]
        ].concat(image.alpha.filter ? [['Filter', T.name('FlateDecode')]] : []))),
        raw: image.alpha.bytes
      }) : 0;
      const dictEntries = [
        ['Type', T.name('XObject')], ['Subtype', T.name('Image')],
        ['Width', T.num(image.width)], ['Height', T.num(image.height)],
        ['ColorSpace', T.name('DeviceRGB')], ['BitsPerComponent', T.num(8)],
        ['Interpolate', T.bool(true)]
      ];
      if (maskId) dictEntries.push(['SMask', T.ref(maskId, 0)]);
      if (image.rgb.filter) dictEntries.push(['Filter', T.name('FlateDecode')]);
      const imgId = addObject({ t: 'stream', dict: T.dict(new Map(dictEntries)), raw: image.rgb.bytes });
      xobjects.map.set(name, T.ref(imgId, 0));
      assign(target, imageBody(name, place));
    }
    // 설명 레이어 — 가이드에 "인쇄 전에 지우고 보내라" 고 적혀 있는 경우가 많다.
    // 지울지 말지는 사람이 고른다 (v110).
    if (opts.dropNotes) {
      for (const layer of page.layers) {
        if (layer.role !== 'note' || !layer.spans.length) continue;
        bodies.set(layer.ocg, '');
      }
      const count = page.layers.filter(l => l.role === 'note' && l.spans.length).length;
      if (count) notes.push('설명 레이어 ' + count + '개를 비웠습니다.');
    }

    // 그림을 못 받은 컬러 레이어는 비운다 — 샘플 그림이 남으면 안 된다.
    for (const layer of artLayers) if (!bodies.has(layer.ocg) && !appended.some(a => a.ocg === layer.ocg) && layer.spans.length) bodies.set(layer.ocg, '');

    // 화면에서 고른 세 자리(재단 · 화이트 · 컬러). 내용을 안 넣기로 했어도
    // **지우지는 않는다** — 인쇄소 판의 레이어 짜임은 그대로 둬야 하니까.
    const roleOcgs = new Set();
    if (cutLayer) roleOcgs.add(cutLayer.ocg);
    if (whiteLayer) roleOcgs.add(whiteLayer.ocg);
    if (typeof roles.art === 'number') roleOcgs.add(roles.art);
    for (const layer of created) roleOcgs.add(layer.ocg);

    // 안 쓰는 레이어를 통째로 지운다 (v136).
    //
    // 여태는 **비우기**만 했다 — 내용은 사라져도 OCG 는 /OCProperties 에 남아
    // 일러스트 레이어 창에 빈 폴더로 계속 뜬다. 인쇄소 가이드에는 안 쓰는
    // 레이어(설명 · 앞뒤 다른 그림용 컬러 둘)가 여럿 딸려 오므로, 정작 쓰는
    // 셋(재단 · 화이트 · 컬러)만 남기려면 목록에서도 빼야 한다.
    //
    // 무엇이 "쓰는" 것인지는 화면에서 고른 세 칸이 정한다 — usedOcgs 는 우리가
    // 실제로 내용을 넣은(또는 가이드 것을 일부러 그대로 둔) 레이어만 담는다.
    const dropped = new Set();
    // 레이어 관리자가 시킨 것 — 화면의 목록이 저장 설정보다 우선한다 (v138).
    // 비우기는 몸통만 지우고(레이어는 남는다), 지우기는 목록에서도 뺀다.
    for (const raw of (opts.emptyOcgs || [])) {
      const ocg = ocgOf(raw);
      const layer = layerByOcg.get(ocg);
      if (layer && layer.spans.length) bodies.set(ocg, '');
    }
    for (const ocg of (opts.dropOcgs || [])) dropped.add(ocgOf(ocg));
    // 이름 바꾸기 — OCG 객체를 그 자리에서 갈아 끼운다(objAt 이 synth 를 먼저 본다).
    for (const item of (opts.layerNames || [])) {
      const layer = layerByOcg.get(ocgOf(item.ocg));
      if (!layer || !item.name || item.name === layer.name) continue;
      const old = objAt(ocgOf(item.ocg));
      const dict = cloneDict(old && old.t === 'dict' ? old : null);
      dict.map.set('Type', T.name('OCG'));
      dict.map.set('Name', utf16String(String(item.name)));
      synth.set(ocgOf(item.ocg), dict);
      layer.name = String(item.name);
    }
    if (opts.dropUnusedLayers) {
      const names = [], emptied = [];
      for (const layer of page.layers) {
        if (usedOcgs.has(layer.ocg)) continue;
        if (roleOcgs.has(layer.ocg)) {
          // 고른 자리인데 내보내기에서 체크를 푼 것 — 남기되 안을 비운다.
          if (layer.spans.length) bodies.set(layer.ocg, '');
          emptied.push(layer.name);
          continue;
        }
        dropped.add(layer.ocg);
        names.push(layer.name);
      }
      for (const layer of created) if (!usedOcgs.has(layer.ocg) && !roleOcgs.has(layer.ocg)) dropped.add(layer.ocg);
      if (names.length) notes.push('안 쓰는 레이어 ' + names.length + '개를 지웠습니다 — ' + names.join(' · '));
      if (emptied.length) notes.push('고른 레이어 ' + emptied.length + '개는 남기고 비웠습니다 — ' + emptied.join(' · '));
    }

    // 새로 얹는 구간은 **아래부터** 그려야 한다. 나중에 그린 것이 위에 온다.
    const STACK = { white: 0, art: 1, cut: 2 };
    appended.sort((a, b) => (STACK[layerByOcg.get(a.ocg)?.role] ?? 1) - (STACK[layerByOcg.get(b.ocg)?.role] ?? 1));
    const content = rewriteContent(page, bodies, appended, dropped, opts.layerOrder);

    // 페이지 — Illustrator 비공개 데이터를 반드시 버린다.
    const pageDict = cloneDict(page.pageDict);
    pageDict.map.delete('PieceInfo');
    pageDict.map.delete('LastModified');
    pageDict.map.delete('Metadata');
    pageDict.map.delete('Annots');
    const contentBytes = bytesOf(content);
    const contentId = addObject({ t: 'stream', dict: T.dict(new Map([['Length', T.num(contentBytes.length)]])), raw: contentBytes });
    pageDict.map.set('Contents', T.ref(contentId, 0));
    pageDict.map.set('Resources', T.ref(addObject(resources), 0));
    const pageId = addObject(pageDict);
    const pagesId = addObject(T.dict(new Map([
      ['Type', T.name('Pages')], ['Kids', T.arr([T.ref(pageId, 0)])], ['Count', T.num(1)]
    ])));
    pageDict.map.set('Parent', T.ref(pagesId, 0));

    const title = opts.title || '굿즈 메이커 편집용 파일';
    const xmp = '<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>\n' +
      '<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' +
      '<rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:gm="https://goodsmaker.local/ns/1.0/"' +
      ' pdf:Producer="Goods Maker" xmp:CreatorTool="Goods Maker guide-template export" gm:GuideTemplate="true">' +
      '<dc:format>application/pdf</dc:format><dc:title><rdf:Alt><rdf:li xml:lang="x-default">' + String(title).replace(/[<&>]/g, '') + '</rdf:li></rdf:Alt></dc:title>' +
      '</rdf:Description></rdf:RDF></x:xmpmeta>\n<?xpacket end="w"?>';
    const xmpBytes = typeof TextEncoder === 'function' ? new TextEncoder().encode(xmp) : bytesOf(xmp);
    const metaId = addObject({
      t: 'stream',
      dict: T.dict(new Map([['Type', T.name('Metadata')], ['Subtype', T.name('XML')], ['Length', T.num(xmpBytes.length)]])),
      raw: xmpBytes
    });

    const catalog = cloneDict(guide.catalog);
    // 레이어 이름과 순서는 **가이드의 것 그대로** 나가야 한다 (v132).
    //
    // 사용자: "가이드파일을 올리면 가이드 내보내기를 했을 때 일러스트 상으로는
    //          폴더명, pdf 상으로는 레이어명이 가이드파일과 동일하게 나왔으면
    //          좋겠어."
    //
    // OCG 객체는 통째로 옮겨 실으므로 /Name 은 이미 같다. 문제는 **목록**이다 —
    // 여태 새 레이어를 만들었을 때만 OCProperties 를 다시 썼는데, 가이드의
    // /D /Order 에 빠진 OCG 가 있으면 그 레이어는 이름 없는 것으로 밀린다.
    // 이제 언제나 다시 쓰면서, 이 쪽에서 쓰는 OCG 가 전부 목록에 들어가게 한다.
    {
      const ocpOld = get(doc, catalog.map.get('OCProperties'));
      const ocp = cloneDict(ocpOld && ocpOld.t === 'dict' ? ocpOld : null);
      const dOld = get(doc, ocp.map.get('D'));
      const d = cloneDict(dOld && dOld.t === 'dict' ? dOld : null);
      const listOf = (holder, key) => {
        const v = get(doc, holder.map.get(key));
        return T.arr(v && v.t === 'array' ? v.v.slice() : []);
      };
      const ocgs = listOf(ocp, 'OCGs'), order = listOf(d, 'Order'), on = listOf(d, 'ON');
      // 레이어 창에서 보이는 순서 — 재단이 맨 위, 화이트가 아래.
      const top = ['cut', 'art', 'white'].map(role => created.find(l => l.role === role)).filter(Boolean);
      for (const layer of top.slice().reverse()) order.v.unshift(T.ref(layer.ocg, 0));
      for (const layer of created) { if (dropped.has(layer.ocg)) continue; ocgs.v.push(T.ref(layer.ocg, 0)); on.v.push(T.ref(layer.ocg, 0)); }
      // 가이드에 있던 레이어인데 목록에서 빠진 것을 채운다 — 이름이 살아 있어도
      // 목록에 없으면 Illustrator·Acrobat 의 레이어 창에 안 나온다.
      const listed = new Set();
      const collect = value => {
        if (!value) return;
        if (value.t === 'ref') { listed.add(value.num); return; }
        if (value.t === 'array') for (const item of value.v) collect(item);
      };
      collect(order);
      for (const layer of page.layers) {
        if (listed.has(layer.ocg) || dropped.has(layer.ocg)) continue;
        order.v.push(T.ref(layer.ocg, 0));
        listed.add(layer.ocg);
      }
      const known = new Set(ocgs.v.filter(v => v && v.t === 'ref').map(v => v.num));
      for (const layer of page.layers) if (!known.has(layer.ocg) && !dropped.has(layer.ocg)) { ocgs.v.push(T.ref(layer.ocg, 0)); known.add(layer.ocg); }
      // 지운 레이어는 목록 세 곳 어디에도 남기지 않는다 — /Order 는 제목 문자열과
      // 배열이 섞여 들어올 수 있어 재귀로 훑는다.
      if (dropped.size) {
        const prune = arr => T.arr(arr.v.filter(v => {
          if (v && v.t === 'ref') return !dropped.has(v.num);
          if (v && v.t === 'array') { const kept = prune(v); return kept.v.length ? (Object.assign(v, kept), true) : false; }
          return true;
        }));
        ocgs.v = prune(ocgs).v; order.v = prune(order).v; on.v = prune(on).v;
      }
      // 화면에서 바꾼 순서를 레이어 창에도 그대로 (v138). 목록에 없는 OCG 는
      // 뒤에 붙여 하나도 안 잃는다.
      if (opts.layerOrder && opts.layerOrder.length) {
        const want = opts.layerOrder.map(ocgOf).filter(ocg => !dropped.has(ocg));
        const seen = new Set(want);
        const rest = [];
        const gather = value => {
          if (!value) return;
          if (value.t === 'ref') { if (!seen.has(value.num) && !dropped.has(value.num)) { seen.add(value.num); rest.push(value.num); } return; }
          if (value.t === 'array') for (const item of value.v) gather(item);
        };
        gather(order);
        order.v = want.concat(rest).map(ocg => T.ref(ocg, 0));
      }
      ocp.map.set('OCGs', ocgs);
      d.map.set('Order', order);
      d.map.set('ON', on);
      ocp.map.set('D', T.ref(addObject(d), 0));
      catalog.map.set('OCProperties', T.ref(addObject(ocp), 0));
    }
    catalog.map.delete('PieceInfo');
    catalog.map.delete('Outlines');
    catalog.map.delete('Names');
    catalog.map.set('Type', T.name('Catalog'));
    catalog.map.set('Pages', T.ref(pagesId, 0));
    catalog.map.set('Metadata', T.ref(metaId, 0));
    catalog.map.set('PageMode', T.name('UseOC'));
    const catalogId = addObject(catalog);

    // ── 번호를 다시 매기며 내보낸다 ────────────────────────────────
    const mapping = new Map();
    const queue = [];
    const mapRef = old => {
      if (mapping.has(old)) return mapping.get(old);
      const next = mapping.size + 1;
      mapping.set(old, next);
      queue.push(old);
      return next;
    };
    mapRef(catalogId);
    const emitted = [];
    for (let cursor = 0; cursor < queue.length; cursor++) {
      const old = queue[cursor];
      const value = objAt(old);
      const newNum = mapping.get(old);
      if (!value) { emitted[newNum] = bytesOf('null'); continue; }
      if (value.t === 'stream') {
        const dict = cloneDict(value.dict);
        dict.map.set('Length', T.num(value.raw.length));
        const head = writeValue(dict, mapRef);
        emitted[newNum] = concatBytes([bytesOf(head + '\nstream\n'), value.raw, bytesOf('\nendstream')]);
      } else {
        emitted[newNum] = bytesOf(writeValue(value, mapRef));
      }
    }

    const count = mapping.size;
    const infoNum = count + 1;
    const now = opts.now || pdfDate();
    emitted[infoNum] = bytesOf('<< /Title (' + escapeLiteral(title) + ') /Creator (Goods Maker) /Producer (Goods Maker guide-template export) /CreationDate (' + now + ') /ModDate (' + now + ') >>');

    const chunks = [bytesOf('%PDF-1.6\n%\xE2\xE3\xCF\xD3\n% Guide-template AI/PDF generated by Goods Maker\n')];
    const offsets = [0];
    let pos = chunks[0].length;
    for (let i = 1; i <= infoNum; i++) {
      const body = emitted[i] || bytesOf('null');
      offsets[i] = pos;
      const head = bytesOf(i + ' 0 obj\n'), tail = bytesOf('\nendobj\n');
      chunks.push(head, body, tail);
      pos += head.length + body.length + tail.length;
    }
    const xrefPos = pos;
    let xref = 'xref\n0 ' + (infoNum + 1) + '\n0000000000 65535 f \n';
    for (let i = 1; i <= infoNum; i++) xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
    const id = (opts.id || Date.now().toString(16)).padStart(32, '0').slice(-32).toUpperCase();
    xref += 'trailer\n<< /Size ' + (infoNum + 1) + ' /Root ' + mapping.get(catalogId) + ' 0 R /Info ' + infoNum + ' 0 R /ID [<' + id + '><' + id + '>] >>\nstartxref\n' + xrefPos + '\n%%EOF\n';
    chunks.push(bytesOf(xref));
    const bytes = concatBytes(chunks);
    return { bytes, notes, place, page, content };
  }

  function escapeLiteral(text) {
    return String(text).replace(/[\\()\r\n]/g, ch => ({ '\\': '\\\\', '(': '\\(', ')': '\\)', '\r': '\\r', '\n': '\\n' }[ch]));
  }

  function pdfDate(date) {
    const d = date || new Date();
    const p = n => String(n).padStart(2, '0');
    return 'D:' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds());
  }

  return {
    PT_PER_MM,
    parseGuide,
    classifyLayer,
    layerSide,
    pickBestPage,
    computePlacement,
    buildFromGuide,
    // 검사용 내부 함수
    _internal: { Lexer, scanContentSpans, readSpanStyle, loadDocument, streamData, latin1, bytesOf, writeValue, rewriteContent, pdfTextOf, get, dget, numOf }
  };
});
