#!/usr/bin/env bash
set -euo pipefail
ANDROID_CMDLINE_TOOLS_VERSION="${ANDROID_CMDLINE_TOOLS_VERSION:-15859902}"
ANDROID_PLATFORM="${ANDROID_PLATFORM:-36}"
ANDROID_BUILD_TOOLS="${ANDROID_BUILD_TOOLS:-35.0.0}"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/android-sdk}"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"

if command -v sdkmanager >/dev/null 2>&1; then
  echo "Android SDK command-line tools already installed."
else
  mkdir -p "$ANDROID_HOME/cmdline-tools"
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT
  url="https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_CMDLINE_TOOLS_VERSION}_latest.zip"
  echo "Downloading Android command-line tools ${ANDROID_CMDLINE_TOOLS_VERSION}..."
  curl -fL "$url" -o "$tmp/tools.zip"
  unzip -q "$tmp/tools.zip" -d "$tmp/unpacked"
  rm -rf "$ANDROID_HOME/cmdline-tools/latest"
  mkdir -p "$ANDROID_HOME/cmdline-tools/latest"
  cp -a "$tmp/unpacked/cmdline-tools/." "$ANDROID_HOME/cmdline-tools/latest/"
fi

yes | sdkmanager --licenses >/dev/null || true
sdkmanager "platform-tools" "platforms;android-${ANDROID_PLATFORM}" "build-tools;${ANDROID_BUILD_TOOLS}"
cat > "$HOME/.goods-maker-android-env" <<ENV
export ANDROID_HOME="$ANDROID_HOME"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:\$PATH"
ENV
printf '\nAndroid SDK ready: %s\n' "$ANDROID_HOME"
