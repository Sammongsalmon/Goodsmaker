#!/usr/bin/env bash
# Run this as: bash RUN_V46_SAFE.sh
# It runs in a child shell, so a failed build will not close the current terminal.
set -u

ROOT="${1:-.}"
cd "$ROOT" || {
  echo "저장소 경로로 이동할 수 없습니다: $ROOT" >&2
  exit 2
}

LOG="v46-build-$(date +%Y%m%d-%H%M%S).log"

run_step() {
  local label="$1"
  shift
  printf '\n===== %s =====\n' "$label" | tee -a "$LOG"
  "$@" 2>&1 | tee -a "$LOG"
  local code=${PIPESTATUS[0]}
  if [ "$code" -ne 0 ]; then
    printf '\n실패 단계: %s\n종료 코드: %s\n로그: %s/%s\n' "$label" "$code" "$PWD" "$LOG" >&2
    return "$code"
  fi
}

for required in package.json package-lock.json index.html app.js style.css layout.js scripts/verify-functional-integrity.mjs; do
  if [ ! -f "$required" ]; then
    echo "저장소 루트에서 실행해야 합니다. 누락: $required" >&2
    exit 2
  fi
done

run_step "Node 및 Java 버전" bash -lc 'node -v; npm -v; java -version 2>&1 || true' || exit $?
run_step "의존성 설치" npm ci --no-audit --no-fund || exit $?
run_step "기능 연결 검사" npm run verify:functions || exit $?

printf '\n기능 패치 검사가 통과했습니다.\n'
printf 'APK 빌드는 별도로 다음 명령을 실행하세요:\n'
printf '  npm run apk:codespaces\n'
printf '로그: %s/%s\n' "$PWD" "$LOG"
