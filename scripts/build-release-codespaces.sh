#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf downloads
mkdir -p downloads
npm install --no-audit --no-fund
npm run fonts:import
npm run build:web
(
  cd dist
  zip -qr ../downloads/goods-maker-web.zip .
)
bash scripts/build-apk-codespaces.sh
printf '\n완료된 파일\n'
printf '  웹: %s/downloads/goods-maker-web.zip\n' "$PWD"
printf '  APK: %s/downloads/goods-maker-debug.apk\n' "$PWD"
