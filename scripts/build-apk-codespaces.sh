#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p downloads
bash scripts/install-android-sdk.sh
# shellcheck disable=SC1090
source "$HOME/.goods-maker-android-env"
if ! command -v java >/dev/null 2>&1; then
  echo "Java 21이 필요합니다. Codespaces를 다시 빌드하거나 devcontainer의 Java feature를 확인하세요." >&2
  exit 1
fi
java_major="$(java -version 2>&1 | awk -F'[\".]' '/version/ {print $2; exit}')"
if [ "${java_major:-0}" -lt 21 ]; then
  echo "현재 Java ${java_major:-unknown}입니다. Capacitor 8 Android 빌드에는 Java 21이 필요합니다." >&2
  exit 1
fi
npm ci --no-audit --no-fund
node scripts/verify-functional-integrity.mjs
npm run fonts:import
npm run android:sync
(
  cd android
  chmod +x gradlew
  ./gradlew --no-daemon assembleDebug
)
APK=android/app/build/outputs/apk/debug/app-debug.apk
unzip -t "$APK"
unzip -p "$APK" assets/public/index.html | grep -q 'for="multiFileInput"'
unzip -p "$APK" assets/public/index.html | grep -q 'for="makerFileInput"'
cp "$APK" downloads/goodsmaker-v46-capacitor.apk
sha256sum downloads/goodsmaker-v46-capacitor.apk > downloads/goodsmaker-v46-capacitor.apk.sha256
printf '\nAPK created: %s/downloads/goodsmaker-v46-capacitor.apk\n' "$PWD"
