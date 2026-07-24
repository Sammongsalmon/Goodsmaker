#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p font-drop downloads
npm install --no-audit --no-fund
npm run fonts:import
npm run build:web
printf '\n준비 완료\n'
printf '  미리보기: npm run dev\n'
printf '  웹+APK 만들기: npm run release:codespaces\n'
printf '  출력 폴더: %s/downloads\n\n' "$PWD"
