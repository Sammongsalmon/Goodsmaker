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
for (const file of ['index.html', 'style.css', 'layout.js', 'runtime-fonts.js', 'app.js',
                    'native-save.js', 'native-storage-save.js', 'conditional-visibility.js',
                    'display-settings.js', 'background-removal.js', 'guide-template.js', 'guide-render.js', 'curve-fit.js', 'cmyk-profile.js',
                    'help-toggle.js', 'interaction.js']) {
  await fs.copyFile(path.join(root, file), path.join(dist, file));
}
await fs.cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
console.log('web build ready in dist/');
