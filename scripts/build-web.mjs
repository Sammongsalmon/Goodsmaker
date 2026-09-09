import fs from 'node:fs/promises';
import path from 'node:path';
import { generateFontManifest } from './generate-font-manifest.mjs';
import './build-native-bridge.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
await generateFontManifest();
await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });
// v62 동기화: 앱에서 넘어온 세 파일이 빠지면 화면은 뜨지만 저장·표시 설정이
// 조용히 동작하지 않는다. index.html 이 참조하는 것과 이 목록을 맞춰 둔다.
// privacy.html 은 플레이 콘솔이 요구하는 개인정보처리방침 URL 이 가리키는 쪽이다.
// 여기서 빠지면 배포 사이트에서 404 가 되고 콘솔 심사가 막힌다.
for (const file of ['index.html', 'privacy.html', 'style.css', 'layout.js', 'runtime-fonts.js', 'app.js',
                    'native-save.js', 'native-storage-save.js', 'conditional-visibility.js',
                    'display-settings.js', 'background-removal.js', 'guide-template.js', 'guide-render.js', 'curve-fit.js', 'cmyk-profile.js',
                    'help-toggle.js', 'ui-visuals.js', 'interaction.js']) {
  await fs.copyFile(path.join(root, file), path.join(dist, file));
}
await fs.cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
console.log('web build ready in dist/');
