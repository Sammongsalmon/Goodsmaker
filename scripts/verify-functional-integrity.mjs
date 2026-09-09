import fs from 'node:fs';
import crypto from 'node:crypto';

// 첫 실패에서 던지면 그 뒤의 실패가 통째로 가려진다. 실제로 그랬다 —
// native-save-entry 하나를 고치자 build-web.mjs 의 낡은 검사가 그제서야 나왔다.
// 다 모아서 한 번에 보여 주고 마지막에 한 번 실패한다.
const failures = [];

function text(path) {
  if (!fs.existsSync(path)) { failures.push(`${path}: file not found`); return ''; }
  return fs.readFileSync(path, 'utf8');
}

function sha256(path) {
  if (!fs.existsSync(path)) throw new Error(`${path}: file not found`);
  return crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
}

function requireText(path, patterns) {
  const source = text(path);
  for (const pattern of patterns) {
    if (!source.includes(pattern)) failures.push(`${path}: missing ${pattern}`);
  }
}

function forbidText(path, patterns) {
  const source = text(path);
  for (const pattern of patterns) {
    if (source.includes(pattern)) {
      failures.push(`${path}: forbidden legacy wiring remains: ${pattern}`);
    }
  }
}

// Visual files are deliberately not compared with a version-specific hash.
// This patch does not contain style.css or layout.js, so the repository's
// current visual/layout files remain the source of truth.
for (const path of ['style.css', 'layout.js']) {
  if (!fs.existsSync(path)) failures.push(`${path}: required visual file not found`);
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
// native-save.js는 esbuild가 생성·압축하는 결과물이므로
// 플러그인 연결은 native/native-save-entry.js에서 검증합니다.

requireText('android/app/src/main/java/com/goodsmaker/app/MainActivity.java', [
  'extends BridgeActivity'
]);
requireText('android/app/capacitor.build.gradle', [
  "project(':capacitor-filesystem')",
  "project(':capacitor-share')"
]);
// `native_bridge.js` 는 이 저장소에 **한 번도 없던 파일**이다(git 이력 0건).
// v46 패치 계열에서 온 이름이고, 그 자리는 native-save.js 와
// native-storage-save.js 둘이 나눠 맡는다. 후자가 빠지면 화면은 뜨는데
// 저장이 조용히 안 된다(v62) — 그래서 그것을 대신 본다.
requireText('scripts/build-web.mjs', [
  "'native-save.js'",
  "'native-storage-save.js'"
]);

if (failures.length) {
  console.error(`무결성 검사 실패 ${failures.length}건`);
  for (const f of failures) console.error('  · ' + f);
  process.exit(1);
}
console.log('Functional wiring OK.');
console.log(`Visual files kept as-is: style.css ${sha256('style.css')}`);
console.log(`Visual files kept as-is: layout.js ${sha256('layout.js')}`);
