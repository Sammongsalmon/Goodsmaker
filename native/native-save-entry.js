import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

function safeFileName(name) {
  const cleaned = String(name || 'goods-maker-output.png').replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').trim();
  return cleaned || 'goods-maker-output.png';
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error('파일 변환 실패'));
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.readAsDataURL(blob);
  });
}

window.GoodsMakerNative = {
  async saveBlob(blob, requestedName) {
    if (!Capacitor.isNativePlatform()) return false;
    const name = safeFileName(requestedName);
    const base64 = await blobToBase64(blob);
    const result = await Filesystem.writeFile({
      path: `goods-maker/${Date.now()}-${name}`,
      data: base64,
      directory: Directory.Cache,
      recursive: true
    });
    await Share.share({
      title: name,
      text: '굿즈 메이커에서 만든 파일',
      url: result.uri,
      dialogTitle: '파일 저장 또는 공유'
    });
    return true;
  }
};
