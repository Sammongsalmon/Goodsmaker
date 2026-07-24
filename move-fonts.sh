#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   bash move-fonts.sh
#   bash move-fonts.sh /path/to/search
#
# Searches recursively for .ttf/.otf/.woff/.woff2 and .zip files,
# copies fonts into assets/fonts/imported, extracts font ZIPs into
# assets/fonts/_generated, then refreshes the font manifest if the project
# already provides a font build script.

ROOT_DIR="$(pwd)"
SEARCH_DIR="${1:-$ROOT_DIR}"
FONT_ROOT="$ROOT_DIR/assets/fonts"
IMPORTED_DIR="$FONT_ROOT/imported"
GENERATED_DIR="$FONT_ROOT/_generated"
PACKAGES_DIR="$FONT_ROOT/_packages"
TMP_DIR="$FONT_ROOT/.tmp-font-import"

mkdir -p "$IMPORTED_DIR" "$GENERATED_DIR" "$PACKAGES_DIR" "$TMP_DIR"

copied=0
extracted=0
skipped=0

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

safe_copy() {
  local src="$1"
  local dst_dir="$2"
  local base stem ext candidate n

  base="$(basename "$src")"
  stem="${base%.*}"
  ext=".${base##*.}"
  candidate="$dst_dir/$base"
  n=1

  # Same file content already exists: skip.
  if [[ -f "$candidate" ]] && cmp -s "$src" "$candidate"; then
    skipped=$((skipped + 1))
    return 0
  fi

  # Same name but different content: keep both safely.
  while [[ -e "$candidate" ]]; do
    candidate="$dst_dir/${stem}-${n}${ext}"
    n=$((n + 1))
  done

  cp -p "$src" "$candidate"
  copied=$((copied + 1))
  printf 'Copied: %s -> %s\n' "$src" "$candidate"
}

extract_zip_fonts() {
  local zip_file="$1"
  local zip_name extract_dir font

  zip_name="$(basename "${zip_file%.*}")"
  extract_dir="$TMP_DIR/$zip_name-$(date +%s%N)"
  mkdir -p "$extract_dir"

  # Keep the original package too.
  safe_copy "$zip_file" "$PACKAGES_DIR"

  if ! unzip -qq -o "$zip_file" -d "$extract_dir"; then
    printf 'Warning: could not extract ZIP: %s\n' "$zip_file" >&2
    return 0
  fi

  while IFS= read -r -d '' font; do
    safe_copy "$font" "$GENERATED_DIR"
    extracted=$((extracted + 1))
  done < <(
    find "$extract_dir" -type f \
      \( -iname '*.ttf' -o -iname '*.otf' -o -iname '*.woff' -o -iname '*.woff2' \) \
      -print0
  )
}

# Find all font files and font ZIPs, while excluding generated/vendor folders.
while IFS= read -r -d '' file; do
  case "${file,,}" in
    *.ttf|*.otf|*.woff|*.woff2)
      safe_copy "$file" "$IMPORTED_DIR"
      ;;
    *.zip)
      extract_zip_fonts "$file"
      ;;
  esac
done < <(
  find "$SEARCH_DIR" \
    \( -path "$ROOT_DIR/.git" -o \
       -path "$ROOT_DIR/node_modules" -o \
       -path "$ROOT_DIR/android" -o \
       -path "$FONT_ROOT" \) -prune -o \
    -type f \
    \( -iname '*.ttf' -o -iname '*.otf' -o -iname '*.woff' -o -iname '*.woff2' -o -iname '*.zip' \) \
    -print0
)

printf '\nFont copy complete.\n'
printf 'Copied files: %d\n' "$copied"
printf 'Fonts found inside ZIPs: %d\n' "$extracted"
printf 'Skipped identical files: %d\n' "$skipped"

# Refresh the manifest using whichever script the project already exposes.
if [[ -f "$ROOT_DIR/package.json" ]]; then
  if npm run | grep -qE '^[[:space:]]+fonts:sync$'; then
    npm run fonts:sync
  elif npm run | grep -qE '^[[:space:]]+fonts:import$'; then
    npm run fonts:import
  elif npm run | grep -qE '^[[:space:]]+fonts$'; then
    npm run fonts
  else
    printf '\nNo font manifest npm script found. Files were copied successfully.\n'
  fi
fi

printf '\nDone. Review these folders:\n'
printf '  %s\n' "$IMPORTED_DIR"
printf '  %s\n' "$GENERATED_DIR"
printf '  %s\n' "$PACKAGES_DIR"
