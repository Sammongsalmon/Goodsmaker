# 저장소 폰트 폴더

글상자에서 사용할 **라이선스 확인이 끝난** 폰트를 이 폴더에 넣으면 폰트 파일 내부의 Family/Full Name을 읽어 선택 목록에 자동 등록합니다. 파일명은 표시 이름으로 사용하지 않습니다.

## 가장 간단한 방법

`assets/fonts/` 아래 원하는 폴더에 `.otf`, `.ttf`, `.woff`, `.woff2` 파일을 넣습니다.

```text
assets/
└── fonts/
    ├── my-fonts/
    │   ├── Example-Regular.otf
    │   └── Example-Bold.otf
    └── fonts.json   # 자동 생성
```

Codespaces 터미널에서 실행합니다.

```bash
npm install
npm run fonts:sync
npm run dev
```

`npm run dev`를 켜 둔 동안에는 `assets/fonts/`의 변경을 감지해 `fonts.json`을 다시 만듭니다. GitHub Actions 배포와 APK 빌드도 빌드 직전에 같은 작업을 자동 실행합니다.

## ZIP 폰트 묶음

ZIP을 바로 보관하려면 `assets/fonts/_packages/`에 넣습니다. `npm run fonts:sync`가 ZIP 안의 지원 폰트만 안전한 임시 폴더인 `_generated/`에 풀고 목록을 만듭니다.

```text
assets/fonts/_packages/MyFontPack.zip
```

- `_generated/`는 빌드 산출물이므로 Git에 올리지 않습니다.
- ZIP 안의 `.otf`, `.ttf`, `.woff`, `.woff2`만 사용합니다.
- Codespaces와 GitHub Actions의 Linux 환경에서는 시스템 `unzip` 명령을 사용합니다.

## 동작 원칙

- 폰트 선택 목록에는 **파일명이 아니라 폰트 내부의 Family/Full Name**이 표시됩니다.
- 같은 패밀리의 여러 굵기와 이탤릭 파일은 같은 패밀리로 로드되고, 글상자의 굵기 선택과 함께 사용합니다.
- 가변 폰트의 `wght` 축 범위도 읽습니다.
- `fonts.json`은 직접 편집하기보다 생성 스크립트로 갱신하는 편이 안전합니다.
- 웹 공개 저장소와 APK에 포함해도 되는 폰트인지 라이선스를 반드시 확인하세요.

이 배포본에는 사용자 제공 폰트 바이너리를 포함하지 않습니다. 폰트 파일은 본인 저장소의 이 폴더에 직접 넣어 사용하세요.
