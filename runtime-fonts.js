(() => {
  'use strict';

  const DB_NAME = 'acrylic-production-manager';
  const DB_VERSION = 2;
  const WORKSPACE_STORE = 'workspace';
  const FONT_STORE = 'runtimeFonts';
  const SUPPORTED_EXTENSIONS = new Set(['ttf', 'otf', 'woff', 'woff2']);
  const MAX_FONT_BYTES = 32 * 1024 * 1024;
  const objectUrls = new Map();
  const fontFaces = new Map();

  function extensionOf(name = '') {
    return String(name).split('.').pop().toLowerCase();
  }

  function stemOf(name = '') {
    return String(name).replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim() || '사용자 폰트';
  }

  function openDb() {
    if (!('indexedDB' in window)) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(WORKSPACE_STORE)) db.createObjectStore(WORKSPACE_STORE);
        if (!db.objectStoreNames.contains(FONT_STORE)) db.createObjectStore(FONT_STORE, { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('폰트 저장소를 열 수 없습니다.'));
    });
  }

  function transactionDone(tx) {
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error('폰트 저장 작업에 실패했습니다.'));
      tx.onabort = () => reject(tx.error || new Error('폰트 저장 작업이 취소되었습니다.'));
    });
  }

  function readAllFromStore(store) {
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error || new Error('폰트 목록을 읽지 못했습니다.'));
    });
  }

  function readTag(view, offset) {
    return String.fromCharCode(view.getUint8(offset), view.getUint8(offset + 1), view.getUint8(offset + 2), view.getUint8(offset + 3));
  }

  function decodeUtf16Be(bytes) {
    const chars = [];
    for (let i = 0; i + 1 < bytes.length; i += 2) chars.push(String.fromCharCode((bytes[i] << 8) | bytes[i + 1]));
    return chars.join('').replace(/\0/g, '').trim();
  }

  function decodeLatin(bytes) {
    try { return new TextDecoder('windows-1252').decode(bytes).replace(/\0/g, '').trim(); }
    catch { return String.fromCharCode(...bytes).replace(/\0/g, '').trim(); }
  }

  function decodeName(bytes, platformId) {
    return platformId === 0 || platformId === 3 ? decodeUtf16Be(bytes) : decodeLatin(bytes);
  }

  function preferredName(records, ids) {
    const candidates = records.filter(record => ids.includes(record.nameId) && record.text);
    if (!candidates.length) return '';
    const score = record => {
      let value = ids.indexOf(record.nameId) * 100;
      if (record.platformId === 3) value -= 30;
      if (record.platformId === 0) value -= 20;
      if ([0x0412, 0x0409, 0].includes(record.languageId)) value -= 10;
      return value;
    };
    candidates.sort((a, b) => score(a) - score(b) || b.text.length - a.text.length);
    return candidates[0].text;
  }

  function parseNameTable(buffer) {
    const view = new DataView(buffer);
    if (view.byteLength < 6) return [];
    const count = view.getUint16(2);
    const stringOffset = view.getUint16(4);
    const records = [];
    for (let i = 0; i < count; i++) {
      const base = 6 + i * 12;
      if (base + 12 > view.byteLength) break;
      const platformId = view.getUint16(base);
      const encodingId = view.getUint16(base + 2);
      const languageId = view.getUint16(base + 4);
      const nameId = view.getUint16(base + 6);
      const length = view.getUint16(base + 8);
      const offset = stringOffset + view.getUint16(base + 10);
      if (offset < 0 || length < 0 || offset + length > view.byteLength) continue;
      const bytes = new Uint8Array(buffer, offset, length);
      const text = decodeName(bytes, platformId);
      if (text) records.push({ platformId, encodingId, languageId, nameId, text });
    }
    return records;
  }

  function inferStyle(subfamily = '', fullName = '') {
    return /italic|oblique|기울임/i.test(`${subfamily} ${fullName}`) ? 'italic' : 'normal';
  }

  function inferWeight(subfamily = '', fullName = '', fallback = 400) {
    const text = `${subfamily} ${fullName}`.toLowerCase();
    const rules = [
      [/thin|hairline/, 100], [/extra\s*light|ultra\s*light/, 200], [/light/, 300],
      [/medium/, 500], [/semi\s*bold|demi\s*bold/, 600], [/extra\s*bold|ultra\s*bold/, 800],
      [/black|heavy/, 900], [/bold/, 700]
    ];
    for (const [pattern, weight] of rules) if (pattern.test(text)) return weight;
    return Math.max(1, Math.min(1000, Number(fallback) || 400));
  }

  function tableDirectorySfnt(buffer, fontOffset = 0) {
    const view = new DataView(buffer);
    if (fontOffset + 12 > view.byteLength) throw new Error('손상된 OpenType 파일입니다.');
    const numTables = view.getUint16(fontOffset + 4);
    const tables = new Map();
    for (let i = 0; i < numTables; i++) {
      const base = fontOffset + 12 + i * 16;
      if (base + 16 > view.byteLength) break;
      const tag = readTag(view, base);
      const offset = view.getUint32(base + 8);
      const length = view.getUint32(base + 12);
      if (offset + length <= view.byteLength) tables.set(tag, { offset, length, compressedLength: length });
    }
    return tables;
  }

  async function inflateZlib(bytes) {
    if (!('DecompressionStream' in window)) throw new Error('이 브라우저에서는 압축 WOFF 이름을 분석할 수 없습니다.');
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'));
    return await new Response(stream).arrayBuffer();
  }

  async function tableDirectoryWoff(buffer) {
    const view = new DataView(buffer);
    const numTables = view.getUint16(12);
    const tables = new Map();
    for (let i = 0; i < numTables; i++) {
      const base = 44 + i * 20;
      if (base + 20 > view.byteLength) break;
      const tag = readTag(view, base);
      const offset = view.getUint32(base + 4);
      const compressedLength = view.getUint32(base + 8);
      const length = view.getUint32(base + 12);
      if (offset + compressedLength <= view.byteLength) tables.set(tag, { offset, length, compressedLength });
    }
    return tables;
  }

  async function getTableBuffer(buffer, table, woff = false) {
    const raw = buffer.slice(table.offset, table.offset + table.compressedLength);
    if (woff && table.compressedLength < table.length) return inflateZlib(new Uint8Array(raw));
    return raw;
  }

  async function parseFontMetadata(buffer, fileName = '') {
    const view = new DataView(buffer);
    if (view.byteLength < 12) throw new Error('폰트 파일이 너무 짧습니다.');
    const signature = readTag(view, 0);
    let tables;
    let woff = false;
    let metadataFallback = false;

    if (signature === 'wOF2') {
      metadataFallback = true;
      return {
        family: stemOf(fileName), fullName: stemOf(fileName), postscriptName: '',
        weight: inferWeight(fileName, fileName), style: inferStyle(fileName, fileName),
        metadataFallback
      };
    }
    if (signature === 'wOFF') {
      woff = true;
      tables = await tableDirectoryWoff(buffer);
    } else if (signature === 'ttcf') {
      const firstOffset = view.getUint32(12);
      tables = tableDirectorySfnt(buffer, firstOffset);
    } else {
      tables = tableDirectorySfnt(buffer, 0);
    }

    const nameTable = tables.get('name');
    if (!nameTable) throw new Error('폰트 내부 이름 테이블을 찾을 수 없습니다.');
    const nameBuffer = await getTableBuffer(buffer, nameTable, woff);
    const names = parseNameTable(nameBuffer);
    const family = preferredName(names, [16, 1]) || stemOf(fileName);
    const fullName = preferredName(names, [4, 16, 1]) || family;
    const postscriptName = preferredName(names, [6]);
    const subfamily = preferredName(names, [17, 2]);
    let rawWeight = 400;
    const os2 = tables.get('OS/2');
    if (os2) {
      const os2Buffer = await getTableBuffer(buffer, os2, woff);
      const os2View = new DataView(os2Buffer);
      if (os2View.byteLength >= 6) rawWeight = os2View.getUint16(4);
    }
    return {
      family, fullName, postscriptName,
      weight: inferWeight(subfamily, fullName, rawWeight),
      style: inferStyle(subfamily, fullName), metadataFallback
    };
  }

  async function digestId(buffer, fileName) {
    if (crypto?.subtle) {
      const hash = await crypto.subtle.digest('SHA-256', buffer);
      const hex = [...new Uint8Array(hash)].slice(0, 12).map(value => value.toString(16).padStart(2, '0')).join('');
      return `font-${hex}`;
    }
    return `font-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}-${stemOf(fileName)}`;
  }

  function mimeForFile(file) {
    if (file.type) return file.type;
    return ({ ttf: 'font/ttf', otf: 'font/otf', woff: 'font/woff', woff2: 'font/woff2' })[extensionOf(file.name)] || 'application/octet-stream';
  }

  async function installFile(file) {
    if (!file) throw new Error('폰트 파일이 없습니다.');
    const ext = extensionOf(file.name);
    if (!SUPPORTED_EXTENSIONS.has(ext)) throw new Error(`${file.name}: TTF, OTF, WOFF, WOFF2만 추가할 수 있습니다.`);
    if (file.size > MAX_FONT_BYTES) throw new Error(`${file.name}: 32MB보다 큰 폰트는 추가할 수 없습니다.`);
    const buffer = await file.arrayBuffer();
    const metadata = await parseFontMetadata(buffer, file.name).catch(error => ({
      family: stemOf(file.name), fullName: stemOf(file.name), postscriptName: '',
      weight: inferWeight(file.name, file.name), style: inferStyle(file.name, file.name),
      metadataFallback: true, metadataError: error.message
    }));
    const record = {
      id: await digestId(buffer, file.name),
      fileName: file.name,
      family: metadata.family,
      fullName: metadata.fullName,
      postscriptName: metadata.postscriptName || '',
      weight: String(metadata.weight || 400),
      style: metadata.style || 'normal',
      mimeType: mimeForFile(file),
      metadataFallback: !!metadata.metadataFallback,
      metadataError: metadata.metadataError || '',
      addedAt: Date.now(),
      blob: new Blob([buffer], { type: mimeForFile(file) })
    };
    const db = await openDb();
    if (!db) throw new Error('이 환경에서는 폰트를 저장할 수 없습니다.');
    const tx = db.transaction(FONT_STORE, 'readwrite');
    const done = transactionDone(tx);
    tx.objectStore(FONT_STORE).put(record);
    await done;
    db.close();
    return record;
  }

  async function list() {
    const db = await openDb();
    if (!db) return [];
    const tx = db.transaction(FONT_STORE, 'readonly');
    const done = transactionDone(tx);
    const records = await readAllFromStore(tx.objectStore(FONT_STORE));
    await done;
    db.close();
    return records.sort((a, b) => Number(a.addedAt || 0) - Number(b.addedAt || 0));
  }

  async function remove(id) {
    const db = await openDb();
    if (!db) return;
    const tx = db.transaction(FONT_STORE, 'readwrite');
    const done = transactionDone(tx);
    tx.objectStore(FONT_STORE).delete(id);
    await done;
    db.close();
    const oldUrl = objectUrls.get(id);
    if (oldUrl) URL.revokeObjectURL(oldUrl);
    objectUrls.delete(id);
    const face = fontFaces.get(id);
    if (face) document.fonts.delete(face);
    fontFaces.delete(id);
  }

  async function clear() {
    const db = await openDb();
    if (!db) return;
    const tx = db.transaction(FONT_STORE, 'readwrite');
    const done = transactionDone(tx);
    tx.objectStore(FONT_STORE).clear();
    await done;
    db.close();
    for (const url of objectUrls.values()) URL.revokeObjectURL(url);
    objectUrls.clear();
    for (const face of fontFaces.values()) document.fonts.delete(face);
    fontFaces.clear();
  }

  async function loadAll() {
    const records = await list();
    const loaded = [];
    for (const record of records) {
      try {
        const previous = objectUrls.get(record.id);
        if (previous) URL.revokeObjectURL(previous);
        const previousFace = fontFaces.get(record.id);
        if (previousFace) document.fonts.delete(previousFace);
        const url = URL.createObjectURL(record.blob);
        objectUrls.set(record.id, url);
        const face = new FontFace(record.family, `url(${JSON.stringify(url)})`, {
          style: record.style || 'normal', weight: String(record.weight || '400'), display: 'swap'
        });
        await face.load();
        document.fonts.add(face);
        fontFaces.set(record.id, face);
        loaded.push({
          id: record.id, family: record.family, label: record.fullName || record.family,
          fullName: record.fullName || record.family, postscriptName: record.postscriptName || '',
          weight: record.weight || '400', style: record.style || 'normal', source: 'runtime',
          fileName: record.fileName, metadataFallback: !!record.metadataFallback
        });
      } catch (error) {
        loaded.push({ ...record, source: 'runtime-error', loadError: error.message });
      }
    }
    return loaded;
  }

  window.GoodsMakerFonts = {
    supportedExtensions: [...SUPPORTED_EXTENSIONS],
    installFile,
    list,
    remove,
    clear,
    loadAll,
    parseFontMetadata
  };
})();
