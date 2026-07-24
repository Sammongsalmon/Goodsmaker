#!/usr/bin/env bash
set -euo pipefail
ROOT="$PWD"
BUILD_APK=0
for arg in "$@"; do
  case "$arg" in
    --apk) BUILD_APK=1 ;;
    *) ROOT="$arg" ;;
  esac
done
cd "$ROOT"

if [ ! -f package.json ] || [ ! -f scripts/codespaces-setup.sh ]; then
  project_zip="$(find . -maxdepth 1 -type f \( -name 'goods-maker-v*-codespaces.zip' -o -name 'goods-maker-v*-source-apk-ready.zip' \) | sort | tail -n 1)"
  if [ -z "${project_zip:-}" ]; then
    echo "통합 프로젝트 ZIP을 현재 폴더에서 찾지 못했습니다." >&2
    exit 1
  fi
  temp_dir="$(mktemp -d)"
  trap 'rm -rf "$temp_dir"' EXIT
  unzip -q "$project_zip" -d "$temp_dir"
  source_dir="$temp_dir"
  if [ -d "$temp_dir/goods-maker" ]; then source_dir="$temp_dir/goods-maker"; fi
  if [ -d "$temp_dir/goods-maker-v24" ]; then source_dir="$temp_dir/goods-maker-v24"; fi
  cp -a "$source_dir"/. "$ROOT"/
fi

mkdir -p font-drop
for file in "$ROOT"/*; do
  [ -f "$file" ] || continue
  case "${file,,}" in
    *.ttf|*.otf|*.woff|*.woff2) cp -f "$file" font-drop/ ;;
    *.zip)
      if unzip -Z1 "$file" 2>/dev/null | grep -Eiq '\.(ttf|otf|woff2?)$'; then
        cp -f "$file" font-drop/
      fi
      ;;
  esac
done

bash scripts/codespaces-setup.sh
if [ "$BUILD_APK" -eq 1 ]; then
  npm run release:codespaces
fi

printf '\n웹을 GitHub Pages에 반영하려면:\n'
printf '  git add . && git commit -m "Update Goods Maker" && git push\n'
