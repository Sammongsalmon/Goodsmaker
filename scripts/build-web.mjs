import fs from 'node:fs/promises';
import path from 'node:path';
import { generateFontManifest } from './generate-font-manifest.mjs';
import './build-native-bridge.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
await generateFontManifest();
await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(dist, { recursive: true });
for (const file of ['index.html', 'style.css', 'layout.js', 'runtime-fonts.js', 'app.js', 'native-save.js']) {
  await fs.copyFile(path.join(root, file), path.join(dist, file));
}
await fs.cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
console.log('web build ready in dist/');
