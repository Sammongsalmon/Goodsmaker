import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { generateFontManifest } from './generate-font-manifest.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const inbox = path.join(root, 'font-drop');
const fontsDir = path.join(root, 'assets', 'fonts');
const importedDir = path.join(fontsDir, 'imported');
const packagesDir = path.join(fontsDir, '_packages');
const fontExt = new Set(['.ttf', '.otf', '.woff', '.woff2']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

function safeName(name) {
  const ext = path.extname(name).toLowerCase();
  const stem = path.basename(name, path.extname(name))
    .normalize('NFKC')
    .replace(/[\u0000-\u001f<>:"|?*\\/]+/g, '_')
    .replace(/\s+/g, ' ')
    .trim() || 'font';
  return `${stem}${ext}`;
}

async function digest(file) {
  const data = await fs.readFile(file);
  return crypto.createHash('sha256').update(data).digest('hex').slice(0, 10);
}

async function copyUnique(source, targetDir) {
  await fs.mkdir(targetDir, { recursive: true });
  const clean = safeName(path.basename(source));
  let destination = path.join(targetDir, clean);
  const sourceHash = await digest(source);
  try {
    const targetHash = await digest(destination);
    if (sourceHash === targetHash) return { destination, copied: false };
    const ext = path.extname(clean);
    const stem = path.basename(clean, ext);
    destination = path.join(targetDir, `${stem}-${sourceHash}${ext}`);
  } catch {}
  await fs.copyFile(source, destination);
  return { destination, copied: true };
}

await fs.mkdir(inbox, { recursive: true });
await fs.mkdir(importedDir, { recursive: true });
await fs.mkdir(packagesDir, { recursive: true });
const files = await walk(inbox);
let copiedFonts = 0;
let copiedPackages = 0;
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (fontExt.has(ext)) {
    const result = await copyUnique(file, importedDir);
    if (result.copied) copiedFonts += 1;
  } else if (ext === '.zip') {
    const result = await copyUnique(file, packagesDir);
    if (result.copied) copiedPackages += 1;
  }
}
console.log(`font-drop import: ${copiedFonts} font files, ${copiedPackages} ZIP packages copied`);
await generateFontManifest();
