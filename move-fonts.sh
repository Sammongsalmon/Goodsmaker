#!/usr/bin/env bash
set -euo pipefail

# 저장소 밖/루트에 놓인 폰트를 assets/fonts로 복사하고 fonts.json을 갱신합니다.
#
# 사용법
#   bash move-fonts.sh
#   bash move-fonts.sh /path/to/font-folder
#
# 일반 폰트 파일 -> assets/fonts/imported/
# 폰트 전용 ZIP   -> assets/fonts/_packages/
#
# 웹 프로젝트 ZIP처럼 폰트 외 코드/이미지가 함께 들어 있는 ZIP은 자동으로 제외합니다.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPT_DIR"
SOURCE_DIR="${1:-$ROOT_DIR}"
FONT_ROOT="$ROOT_DIR/assets/fonts"
IMPORTED_DIR="$FONT_ROOT/imported"
PACKAGES_DIR="$FONT_ROOT/_packages"
GENERATED_DIR="$FONT_ROOT/_generated"

if [[ ! -d "$SOURCE_DIR" ]]; then
  printf '폰트 검색 경로가 없습니다: %s\n' "$SOURCE_DIR" >&2
  exit 1
fi
if ! command -v unzip >/dev/null 2>&1; then
  printf 'unzip 명령이 필요합니다.\n' >&2
  exit 1
fi

mkdir -p "$IMPORTED_DIR" "$PACKAGES_DIR" "$GENERATED_DIR"

copied_fonts=0
copied_packages=0
skipped=0
rejected_archives=0

sha256_file() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$1" | awk '{print $1}'
  else
    shasum -a 256 "$1" | awk '{print $1}'
  fi
}

copy_unique() {
  local source="$1"
  local destination_dir="$2"
  local kind="$3"
  local base stem ext candidate source_hash target_hash

  base="$(basename "$source")"
  ext=".${base##*.}"
  stem="${base%.*}"
  candidate="$destination_dir/$base"
  source_hash="$(sha256_file "$source")"

  if [[ -f "$candidate" ]]; then
    target_hash="$(sha256_file "$candidate")"
    if [[ "$source_hash" == "$target_hash" ]]; then
      skipped=$((skipped + 1))
      return 0
    fi
    candidate="$destination_dir/${stem}-${source_hash:0:10}${ext}"
  fi

  cp -p "$source" "$candidate"
  if [[ "$kind" == "font" ]]; then
    copied_fonts=$((copied_fonts + 1))
  else
    copied_packages=$((copied_packages + 1))
  fi
  printf '추가: %s -> %s\n' "$source" "$candidate"
}


extract_font_package() {
  local archive="$1"
  local archive_name target_dir entry normalized destination

  archive_name="$(basename "${archive%.*}")"
  archive_name="${archive_name//[^[:alnum:]_.-]/_}"
  [[ -n "$archive_name" ]] || archive_name="font-package"
  target_dir="$GENERATED_DIR/$archive_name"
  rm -rf "$target_dir"
  mkdir -p "$target_dir"

  while IFS= read -r entry; do
    [[ -z "$entry" || "$entry" == */ ]] && continue
    normalized="${entry//\\//}"
    case "${normalized,,}" in
      *.ttf|*.otf|*.woff|*.woff2) ;;
      *) continue ;;
    esac
    if [[ "$normalized" == /* || "$normalized" == *"../"* || "$normalized" == ".." ]]; then
      printf '경고: 안전하지 않은 ZIP 경로 제외: %s / %s\n' "$archive" "$entry" >&2
      continue
    fi
    destination="$target_dir/$normalized"
    mkdir -p "$(dirname "$destination")"
    unzip -p "$archive" "$entry" > "$destination"
    printf '압축 해제: %s -> %s\n' "$entry" "$destination"
  done < <(unzip -Z1 "$archive")
}

archive_is_font_package() {
  local archive="$1"
  local entry lower base ext
  local font_count=0
  local invalid_count=0

  while IFS= read -r entry; do
    [[ -z "$entry" || "$entry" == */ ]] && continue
    lower="${entry,,}"
    base="${lower##*/}"
    ext=".${base##*.}"
    case "$ext" in
      .ttf|.otf|.woff|.woff2)
        font_count=$((font_count + 1))
        ;;
      .txt|.md|.pdf|.rtf|.license)
        ;;
      *)
        case "$base" in
          license|license.*|readme|readme.*|ofl.txt|.ds_store)
            ;;
          __macosx/*)
            ;;
          *)
            invalid_count=$((invalid_count + 1))
            ;;
        esac
        ;;
    esac
  done < <(unzip -Z1 "$archive" 2>/dev/null || true)

  [[ "$font_count" -gt 0 && "$invalid_count" -eq 0 ]]
}

while IFS= read -r -d '' file; do
  lower="${file,,}"
  case "$lower" in
    *.ttf|*.otf|*.woff|*.woff2)
      copy_unique "$file" "$IMPORTED_DIR" font
      ;;
    *.zip)
      if archive_is_font_package "$file"; then
        copy_unique "$file" "$PACKAGES_DIR" package
        extract_font_package "$file"
      else
        rejected_archives=$((rejected_archives + 1))
        printf '제외: 폰트 전용 ZIP이 아님: %s\n' "$file"
      fi
      ;;
  esac
done < <(
  find "$SOURCE_DIR" \
    \( -path "$ROOT_DIR/.git" -o \
       -path "$ROOT_DIR/node_modules" -o \
       -path "$ROOT_DIR/android" -o \
       -path "$ROOT_DIR/dist" -o \
       -path "$ROOT_DIR/downloads" -o \
       -path "$FONT_ROOT" \) -prune -o \
    -type f \
    \( -iname '*.ttf' -o -iname '*.otf' -o -iname '*.woff' -o -iname '*.woff2' -o -iname '*.zip' \) \
    -print0
)

printf '\n폰트 이동 완료\n'
printf '  폰트 파일 추가: %d\n' "$copied_fonts"
printf '  폰트 ZIP 추가: %d\n' "$copied_packages"
printf '  동일 파일 건너뜀: %d\n' "$skipped"
printf '  일반 프로젝트 ZIP 제외: %d\n' "$rejected_archives"

if [[ -f "$ROOT_DIR/package.json" ]]; then
  cd "$ROOT_DIR"
  if [[ -f "$ROOT_DIR/node_modules/fontkit/package.json" ]] && npm run 2>/dev/null | grep -q 'fonts:sync'; then
    npm run fonts:sync
  elif [[ -f "$ROOT_DIR/node_modules/fontkit/package.json" ]] && npm run 2>/dev/null | grep -q 'fonts:import'; then
    npm run fonts:import
  else
    printf '\n폰트 파일과 ZIP 압축 해제는 완료했습니다.\n'
    printf 'fonts.json을 새로 만들려면 먼저 npm install 후 npm run fonts:sync를 실행하세요.\n'
  fi
fi

printf '\n확인할 폴더\n'
printf '  %s\n' "$IMPORTED_DIR"
printf '  %s\n' "$PACKAGES_DIR"
printf '  %s\n' "$GENERATED_DIR"
printf '  %s\n' "$FONT_ROOT/fonts.json"
