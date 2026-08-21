(() => {
  'use strict';

  const previousSave = window.GoodsMakerNative?.saveBlob
    ? window.GoodsMakerNative.saveBlob.bind(window.GoodsMakerNative)
    : null;
  const CHUNK_BYTES = 96 * 1024; // divisible by 3 so concatenated base64 stays valid
  const VERIFY_LIMIT = 24 * 1024 * 1024;

  function isNative() {
    try { return !!window.Capacitor?.isNativePlatform?.(); }
    catch (_) { return false; }
  }

  function safeFileName(name) {
    const cleaned = String(name || 'goods-maker-output.png')
      .normalize('NFC')
      .replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_')
      .replace(/[. ]+$/g, '')
      .trim();
    return cleaned || 'goods-maker-output.png';
  }

  function plugin() {
    return window.Capacitor?.Plugins?.Filesystem || null;
  }

  function bytesToBase64(bytes) {
    let binary = '';
    const step = 0x4000;
    for (let offset = 0; offset < bytes.length; offset += step) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + step));
    }
    return btoa(binary);
  }

  function base64ToBytes(value) {
    const raw = String(value || '').replace(/^data:[^,]*,/, '').replace(/\s+/g, '');
    const binary = atob(raw);
    const out = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++) out[index] = binary.charCodeAt(index);
    return out;
  }

  async function blobPartToBase64(blob) {
    const buffer = typeof blob.arrayBuffer === 'function'
      ? await blob.arrayBuffer()
      : await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = () => reject(reader.error || new Error('파일 변환 실패'));
          reader.onload = () => resolve(reader.result);
          reader.readAsArrayBuffer(blob);
        });
    return bytesToBase64(new Uint8Array(buffer));
  }

  async function sha256Bytes(bytes) {
    if (!window.crypto?.subtle) return null;
    const digest = await window.crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map(value => value.toString(16).padStart(2, '0')).join('');
  }

  async function blobSha256(blob) {
    if (!window.crypto?.subtle || blob.size > VERIFY_LIMIT) return null;
    return sha256Bytes(await blob.arrayBuffer());
  }

  async function ensurePermission(Filesystem) {
    if (typeof Filesystem.checkPermissions !== 'function') return true;
    const current = await Filesystem.checkPermissions().catch(() => null);
    const value = current?.publicStorage;
    if (value === 'granted' || value === 'limited') return true;
    if (typeof Filesystem.requestPermissions !== 'function') return false;
    const requested = await Filesystem.requestPermissions().catch(() => null);
    return requested?.publicStorage === 'granted' || requested?.publicStorage === 'limited';
  }

  async function removeExisting(Filesystem, target) {
    try {
      await Filesystem.deleteFile({ path: target.path, directory: target.directory });
    } catch (_) {}
  }

  async function writeBlob(Filesystem, target, blob) {
    await removeExisting(Filesystem, target);
    let offset = 0;
    let first = true;
    while (offset < blob.size) {
      const end = Math.min(blob.size, offset + CHUNK_BYTES);
      const data = await blobPartToBase64(blob.slice(offset, end, blob.type));
      if (first) {
        await Filesystem.writeFile({
          path: target.path,
          data,
          directory: target.directory,
          recursive: true
        });
        first = false;
      } else {
        await Filesystem.appendFile({
          path: target.path,
          data,
          directory: target.directory
        });
      }
      offset = end;
    }

    const stat = await Filesystem.stat({ path: target.path, directory: target.directory });
    if (Number.isFinite(Number(stat.size)) && Number(stat.size) !== blob.size) {
      await removeExisting(Filesystem, target);
      throw new Error(`저장된 파일 크기가 원본과 다릅니다. (${stat.size}/${blob.size})`);
    }

    if (blob.size <= VERIFY_LIMIT && typeof Filesystem.readFile === 'function') {
      const originalHash = await blobSha256(blob);
      const stored = await Filesystem.readFile({ path: target.path, directory: target.directory });
      let storedBytes;
      if (stored?.data instanceof Blob) storedBytes = new Uint8Array(await stored.data.arrayBuffer());
      else storedBytes = base64ToBytes(stored?.data);
      if (storedBytes.byteLength !== blob.size) {
        await removeExisting(Filesystem, target);
        throw new Error(`저장 검증 중 파일 크기가 달라졌습니다. (${storedBytes.byteLength}/${blob.size})`);
      }
      const storedHash = await sha256Bytes(storedBytes);
      if (originalHash && storedHash && originalHash !== storedHash) {
        await removeExisting(Filesystem, target);
        throw new Error('저장 검증 중 파일 내용이 달라졌습니다. 다시 시도해 주세요.');
      }
    }

    const uri = stat?.uri || (await Filesystem.getUri({ path: target.path, directory: target.directory })).uri;
    return { ...target, uri, size: Number(stat?.size) || blob.size };
  }

  function toast(message, bad = false) {
    let node = document.getElementById('nativeSaveToast');
    if (!node) {
      node = document.createElement('div');
      node.id = 'nativeSaveToast';
      Object.assign(node.style, {
        position: 'fixed', left: '50%', bottom: '18px', zIndex: '100000',
        transform: 'translateX(-50%)', maxWidth: 'calc(100vw - 32px)',
        padding: '10px 14px', borderRadius: '12px', fontSize: '13px',
        lineHeight: '1.35', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,.18)',
        transition: 'opacity .18s ease', pointerEvents: 'none'
      });
      document.body.appendChild(node);
    }
    node.style.background = bad ? '#fff0f0' : '#e8f8ff';
    node.style.color = bad ? '#8d2525' : '#174f63';
    node.style.border = bad ? '1px solid #e9bcbc' : '1px solid #acd9e8';
    node.style.opacity = '1';
    node.textContent = message;
    clearTimeout(node._hideTimer);
    node._hideTimer = setTimeout(() => { node.style.opacity = '0'; }, bad ? 5200 : 3600);
  }

  async function saveDirectly(blob, requestedName) {
    if (!isNative()) return previousSave ? previousSave(blob, requestedName) : false;
    if (!(blob instanceof Blob) || blob.size <= 0) throw new Error('저장할 파일 데이터가 비어 있습니다.');

    const Filesystem = plugin();
    if (!Filesystem) throw new Error('Android 파일 저장 플러그인을 찾지 못했습니다.');
    const name = safeFileName(requestedName);
    const candidates = [
      { directory: 'DOCUMENTS', path: `goodsmaker/${name}`, label: `문서/goodsmaker/${name}` },
      { directory: 'EXTERNAL_STORAGE', path: `Download/goodsmaker/${name}`, label: `다운로드/goodsmaker/${name}` },
      { directory: 'EXTERNAL', path: `goodsmaker/${name}`, label: `앱 저장소/goodsmaker/${name}` }
    ];
    const failures = [];
    let permissionRetried = false;
    for (const target of candidates) {
      try {
        const saved = await writeBlob(Filesystem, target, blob);
        toast(`저장 완료 · ${saved.label}`);
        window.dispatchEvent(new CustomEvent('goods-maker-file-saved', { detail: saved }));
        return true;
      } catch (error) {
        failures.push(`${target.label}: ${error?.message || error}`);
        const publicDirectory = target.directory === 'DOCUMENTS' || target.directory === 'EXTERNAL_STORAGE';
        if (publicDirectory && !permissionRetried) {
          permissionRetried = true;
          const granted = await ensurePermission(Filesystem);
          if (granted) {
            try {
              const saved = await writeBlob(Filesystem, target, blob);
              toast(`저장 완료 · ${saved.label}`);
              window.dispatchEvent(new CustomEvent('goods-maker-file-saved', { detail: saved }));
              return true;
            } catch (retryError) {
              failures.push(`${target.label} (권한 재시도): ${retryError?.message || retryError}`);
            }
          }
        }
      }
    }
    const reason = failures.join('\n');
    toast('파일을 저장하지 못했습니다. 저장소 권한을 확인해 주세요.', true);
    throw new Error(reason || '파일을 저장하지 못했습니다.');
  }

  window.GoodsMakerNative = {
    ...(window.GoodsMakerNative || {}),
    saveBlob: saveDirectly
  };
})();
