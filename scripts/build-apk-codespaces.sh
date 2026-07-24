#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p downloads
bash scripts/install-android-sdk.sh
# shellcheck disable=SC1090
source "$HOME/.goods-maker-android-env"
if ! command -v java >/dev/null 2>&1; then
  echo "Java 17이 필요합니다. Codespaces를 다시 빌드하거나 devcontainer의 Java feature를 확인하세요." >&2
  exit 1
fi
npm install --no-audit --no-fund
npm run fonts:import
npm run build:web
if [ ! -d android ]; then
  npx cap add android
fi
npx cap sync android
(
  cd android
  chmod +x gradlew
  ./gradlew assembleDebug
)
cp android/app/build/outputs/apk/debug/app-debug.apk downloads/goods-maker-debug.apk
printf '\nAPK created: %s/downloads/goods-maker-debug.apk\n' "$PWD"
