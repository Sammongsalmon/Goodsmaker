import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as fontkit from 'fontkit';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fontsDir = path.join(root, 'assets', 'fonts');
const packagesDir = path.join(fontsDir, '_packages');
const generatedDir = path.join(fontsDir, '_generated');
const manifestPath = path.join(fontsDir, 'fonts.json');
const supported = new Set(['.otf', '.ttf', '.woff', '.woff2']);

async function walk(dir, predicate = () => true) {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute, predicate));
    else if (predicate(absolute)) files.push(absolute);
  }
  return files;
}

function safeArchivePath(entry) {
  const parts = String(entry || '').replaceAll('\\', '/').split('/').filter(Boolean);
  if (!parts.length || parts.some(part => part === '.' || part === '..')) return null;
  if (!supported.has(path.extname(parts.at(-1)).toLowerCase())) return null;
  return parts.map(part => part.replace(/[\u0000-\u001f<>:"|?*]/g, '_')).join('/');
}

function archiveFolderName(archive) {
  const relative = path.relative(packagesDir, archive).replaceAll(path.sep, '__');
  return relative.replace(/\.zip$/i, '').replace(/[^\p{L}\p{N}._-]+/gu, '_') || 'font-package';
}

async function extractFontArchives() {
  await fs.rm(generatedDir, { recursive: true, force: true });
  await fs.mkdir(generatedDir, { recursive: true });
  const archives = (await walk(packagesDir, file => path.extname(file).toLowerCase() === '.zip'))
    .sort((a, b) => a.localeCompare(b, 'ko'));
  if (!archives.length) return 0;

  let extracted = 0;
  for (const archive of archives) {
    const listing = spawnSync('unzip', ['-Z1', archive], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
    if (listing.error || listing.status !== 0) {
      console.warn(`font archive skipped: ${path.relative(root, archive)} (unzip 명령을 사용할 수 없거나 손상된 ZIP입니다)`);
      continue;
    }
    const folder = path.join(generatedDir, archiveFolderName(archive));
    for (const entry of listing.stdout.split(/\r?\n/)) {
      const safe = safeArchivePath(entry);
      if (!safe) continue;
      const output = spawnSync('unzip', ['-p', archive, entry], { encoding: null, maxBuffer: 128 * 1024 * 1024 });
      if (output.error || output.status !== 0 || !output.stdout?.length) {
        console.warn(`font entry skipped: ${path.basename(archive)} / ${entry}`);
        continue;
      }
      const destination = path.join(folder, safe);
      if (!destination.startsWith(folder + path.sep)) continue;
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, output.stdout);
      extracted += 1;
    }
  }
  if (extracted) console.log(`extracted ${extracted} font files from assets/fonts/_packages/`);
  return extracted;
}

function weightFromFont(font) {
  const axis = font.variationAxes?.wght;
  if (axis && Number.isFinite(axis.min) && Number.isFinite(axis.max)) {
    return `${Math.round(axis.min)} ${Math.round(axis.max)}`;
  }
  const os2 = font['OS/2'];
  return String(Math.max(1, Math.min(1000, Number(os2?.usWeightClass) || 400)));
}

function styleFromFont(font) {
  const subfamily = String(font.subfamilyName || font.fullName || '').toLowerCase();
  return Number(font.italicAngle) !== 0 || /italic|oblique/.test(subfamily) ? 'italic' : 'normal';
}

function safeText(value, fallback = '') {
  return String(value || fallback).replace(/[\u0000-\u001f]/g, '').trim();
}

async function writeIfChanged(file, text) {
  const current = await fs.readFile(file, 'utf8').catch(() => '');
  if (current === text) return false;
  await fs.writeFile(file, text);
  return true;
}

export async function generateFontManifest() {
  await fs.mkdir(fontsDir, { recursive: true });
  await fs.mkdir(packagesDir, { recursive: true });
  await extractFontArchives();
  const files = (await walk(fontsDir, file => supported.has(path.extname(file).toLowerCase())))
    .sort((a, b) => a.localeCompare(b, 'ko'));
  const fonts = [];
  for (const file of files) {
    try {
      const font = fontkit.openSync(file);
      const family = safeText(font.familyName, font.fullName || path.basename(file, path.extname(file)));
      const fullName = safeText(font.fullName, family);
      const postscriptName = safeText(font.postscriptName, '');
      const relative = path.relative(root, file).split(path.sep).join('/');
      fonts.push({
        family,
        fullName,
        postscriptName,
        weight: weightFromFont(font),
        style: styleFromFont(font),
        url: relative,
        file: path.basename(file)
      });
      console.log(`font: ${relative} -> ${family} / ${fullName}`);
    } catch (error) {
      console.warn(`font skipped: ${path.relative(root, file)} (${error.message})`);
    }
  }
  const manifest = { schemaVersion: 1, fonts };
  const text = `${JSON.stringify(manifest, null, 2)}\n`;
  const changed = await writeIfChanged(manifestPath, text);
  console.log(`${changed ? 'wrote' : 'unchanged'} ${path.relative(root, manifestPath)} (${fonts.length} fonts)`);
  return manifest;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateFontManifest().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
