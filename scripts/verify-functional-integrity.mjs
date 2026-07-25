import fs from 'node:fs';
import crypto from 'node:crypto';

function text(path) {
  if (!fs.existsSync(path)) throw new Error(`${path}: file not found`);
  return fs.readFileSync(path, 'utf8');
}

function sha256(path) {
  if (!fs.existsSync(path)) throw new Error(`${path}: file not found`);
  return crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
}

function requireText(path, patterns) {
  const source = text(path);
  for (const pattern of patterns) {
    if (!source.includes(pattern)) throw new Error(`${path}: missing ${pattern}`);
  }
}

function forbidText(path, patterns) {
  const source = text(path);
  for (const pattern of patterns) {
    if (source.includes(pattern)) {
      throw new Error(`${path}: forbidden legacy wiring remains: ${pattern}`);
    }
  }
}

// Visual files are deliberately not compared with a version-specific hash.
// This patch does not contain style.css or layout.js, so the repository's
// current visual/layout files remain the source of truth.
for (const path of ['style.css', 'layout.js']) {
  if (!fs.existsSync(path)) throw new Error(`${path}: required visual file not found`);
}

requireText('index.html', [
  '<label class="dropzone compact" for="multiFileInput">',
  'id="multiFileInput" multiple type="file"',
  '<label class="dropzone compact" for="makerFileInput">',
  'id="makerFileInput" multiple type="file"',
  'accept="image/*"'
]);
forbidText('index.html', [
  'stickerImagesPickerBtn',
  'makerImagesPickerBtn',
  'native-image-file-input',
  'direct-file-trigger'
]);

requireText('app.js', [
  "els.multiFileInput.addEventListener('change'",
  "els.makerFileInput.addEventListener('change'",
  'await addStickerFiles(files)',
  'await addMakerFiles(files)',
  'r.readAsDataURL(file)',
  'canvasToBlobReliable',
  'async function exportPng()',
  'async function exportJpg()',
  'async function exportSvg()',
  'async function exportAi()',
  'window.GoodsMakerNative?.saveBlob'
]);
forbidText('app.js', [
  'exposeNativeImageInput',
  'stickerImagesPickerBtn',
  'makerImagesPickerBtn'
]);

requireText('native/native-save-entry.js', [
  "from '@capacitor/filesystem'",
  "from '@capacitor/share'",
  'Filesystem.writeFile',
  'Filesystem.appendFile',
  'Filesystem.stat',
  'Share.share',
  'files: [uri]',
  'blob.arrayBuffer',
  'blob.size'
]);
requireText('native-save.js', [
  "registerPlugin('Filesystem')",
  "registerPlugin('Share')",
  'Filesystem.appendFile',
  'Share.share',
  'files: [uri]',
  'blob.arrayBuffer'
]);
requireText('android/app/src/main/java/com/goodsmaker/app/MainActivity.java', [
  'extends BridgeActivity'
]);
requireText('android/app/capacitor.build.gradle', [
  "project(':capacitor-filesystem')",
  "project(':capacitor-share')"
]);
requireText('scripts/build-web.mjs', [
  "'native_bridge.js'",
  "'native-save.js'"
]);

console.log('Functional wiring OK.');
console.log(`Visual files kept as-is: style.css ${sha256('style.css')}`);
console.log(`Visual files kept as-is: layout.js ${sha256('layout.js')}`);
