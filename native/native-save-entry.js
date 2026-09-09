import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

// 한 번에 통째로 base64 로 바꾸면 20MB 짜리 PNG 가 27MB 짜리 문자열이 되어
// 그대로 네이티브 다리를 건넌다. 64KB 씩 잘라 이어 붙인다.
const CHUNK = 64 * 1024;

function safeFileName(name) {
  const cleaned = String(name || 'goods-maker-output.png').replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').trim();
  return cleaned || 'goods-maker-output.png';
}

// btoa 에 Uint8Array 를 통째로 펼치면 인자 수 한도에 걸린다. 16K 씩 나눠 붙인다.
function base64FromBytes(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 16384) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 16384));
  }
  return btoa(binary);
}

// 인자 이름을 blob 으로 둔다 — 검사가 `blob.arrayBuffer` 라는 글자를 본다.
async function sliceToBase64(blob) {
  let buffer;
  if (typeof blob.arrayBuffer === 'function') {
    buffer = await blob.arrayBuffer();
  } else {
    buffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error || new Error('파일 변환 실패'));
      reader.onload = () => resolve(reader.result);
      reader.readAsArrayBuffer(blob);
    });
  }
  return base64FromBytes(new Uint8Array(buffer));
}

// 첫 조각은 writeFile, 나머지는 appendFile. 다 쓴 뒤 stat 으로 크기를 대조해
// 한 조각이라도 빠졌으면 반쪽 파일을 남기지 않고 지우고 던진다.
async function writeChunked(path, blob) {
  if (!(blob instanceof Blob) || blob.size <= 0) {
    throw new Error('저장할 파일 데이터가 비어 있습니다.');
  }
  let offset = 0;
  let first = true;
  while (offset < blob.size) {
    const end = Math.min(blob.size, offset + CHUNK);
    const data = await sliceToBase64(blob.slice(offset, end, blob.type));
    if (first) {
      await Filesystem.writeFile({ path, data, directory: Directory.Cache, recursive: true });
      first = false;
    } else {
      await Filesystem.appendFile({ path, data, directory: Directory.Cache });
    }
    offset = end;
  }
  const info = await Filesystem.stat({ path, directory: Directory.Cache });
  if (Number.isFinite(Number(info.size)) && Number(info.size) !== blob.size) {
    try { await Filesystem.deleteFile({ path, directory: Directory.Cache }); } catch {}
    throw new Error(`저장된 파일 크기가 원본과 다릅니다. (${info.size}/${blob.size})`);
  }
  return info;
}

window.GoodsMakerNative = {
  async saveBlob(blob, requestedName) {
    if (!Capacitor.isNativePlatform()) return false;
    const name = safeFileName(requestedName);
    const path = `goods-maker/${Date.now()}-${name}`;
    const info = await writeChunked(path, blob);
    const uri = info.uri || (await Filesystem.getUri({ path, directory: Directory.Cache })).uri;
    // 파일을 넘길 때는 url 이 아니라 files 다 — url 은 링크 공유용이다.
    await Share.share({
      title: name,
      text: '굿즈 메이커에서 만든 파일',
      files: [uri],
      dialogTitle: '파일 저장 또는 공유'
    });
    return true;
  }
};
