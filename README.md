# 굿즈 메이커 v23

아크릴·코롯토 칼선, 스티커 대지, 이미지 꾸미기를 한 웹 앱에서 처리하는 브라우저 기반 편집기입니다. 서버 없이 실행할 수 있고, GitHub Pages 배포와 Capacitor 기반 Android APK 빌드 구성을 함께 제공합니다.

## v23: 이미지 작업 탭 확장

### 글상자 개체

- `꾸밀 개체 이미지 추가` 아래의 작은 `글상자` 버튼으로 추가합니다.
- 이동·회전은 이미지와 같고, 가로·세로 크기는 서로 독립적으로 조절합니다.
- 내용, 폰트, 굵기, 글자 크기, 행간, 자간, 가로·세로 정렬을 편집할 수 있습니다.
- 글자 채우기:
  - 단색
  - 선형 그라데이션
  - 땡땡이·줄무늬·그리드·별·사각별·팔각별·하트 패턴
- 글자 배경:
  - 입력창에서 일부 글자를 선택해 해당 범위에만 배경색 적용
  - 전체 글자에 한 번에 적용
  - 범위별 배경을 개별 삭제하거나 전체 삭제
- 글자 배경색과 채우기 색은 투명도까지 설정할 수 있습니다.

### 도형과 선 개체

`도형 / 선` 버튼에서 다음 개체를 추가합니다.

- 사각형: 모서리 둥글기 조절
- 원·타원
- 별
- 사각별
- 팔각별
- 하트
- 선:
  - 실선
  - 점선
  - 동그란 점선
  - 일점쇄선
  - 두 줄
  - 둥근·평평한·각진 선 끝

도형과 선도 이동·회전·자유 크기 조절·그룹화·잠금·앞뒤 순서 변경·효과 적용이 가능합니다. 도형은 단색·그라데이션·패턴 채우기와 별도 외곽선을 지원합니다.

### 누적 효과 레이어

이미지, 글상자, 도형, 선에 효과를 여러 개 쌓을 수 있습니다.

- 외곽선
- 외부광선
- 내부광선
- 그림자
- 입체: 블러 없는 그림자를 여러 단계 채워 개체와 끝 지점 사이가 비지 않는 돌출 면을 만듭니다.

효과는 위·아래 순서 변경, 잠시 끄기, 삭제가 가능합니다. 그룹화한 개체는 겹친 내부 경계를 제거한 **그룹 전체 알파 외곽**을 기준으로 효과를 한 번만 계산합니다.

### 개체 잠금

- 선택 개체 또는 다중 선택 개체를 잠글 수 있습니다.
- 잠긴 개체는 선택 상태와 저장 상태는 유지하지만 이동·크기·회전·효과·그룹 구조·레이어 순서·삭제가 제한됩니다.
- `현재 효과를 모든 개체에 일괄 적용`은 잠긴 개체를 건너뜁니다.

## 저장소 폰트 자동 등록

이 배포본에는 사용자 제공 폰트 바이너리를 포함하지 않습니다. 라이선스를 확인한 폰트를 본인 저장소에 직접 넣어 사용하세요.

### 직접 폰트 파일 넣기

다음 확장자를 `assets/fonts/` 아래 원하는 하위 폴더에 넣습니다.

```text
.otf  .ttf  .woff  .woff2
```

예:

```text
assets/
└── fonts/
    ├── korean/
    │   ├── Example-Regular.otf
    │   └── Example-Bold.otf
    └── fonts.json
```

### ZIP 묶음 넣기

압축을 그대로 보관하려면 다음 폴더에 넣습니다.

```text
assets/fonts/_packages/MyFontPack.zip
```

빌드 시 ZIP 안의 지원 폰트만 `assets/fonts/_generated/`에 풀어 사용합니다. `_generated/`는 자동 생성되며 Git에 커밋하지 않습니다.

### 폰트 목록 생성

```bash
npm install
npm run fonts:sync
```

생성기는 각 파일의 내부 메타데이터를 읽습니다.

- 선택 목록 표시 이름: 폰트 내부 Family/Full Name
- 파일명은 표시 이름으로 사용하지 않음
- 정적 폰트의 weight/style 읽기
- 가변 폰트 `wght` 축 범위 읽기
- 동일 패밀리의 여러 굵기는 같은 패밀리로 로드

자세한 내용은 [`assets/fonts/README.md`](assets/fonts/README.md)를 참고하세요.

## Codespaces에서 개발

저장소를 Codespaces로 열면 `.devcontainer/devcontainer.json`의 설정에 따라 의존성을 설치하고 폰트 목록을 생성합니다.

```bash
npm run dev
```

- 기본 포트: `4173`
- `assets/fonts/`가 바뀌면 `fonts.json` 자동 갱신
- 폰트 파일 추가 후 페이지의 `새로고침` 버튼으로 선택 목록 재로딩

## GitHub Pages 배포

폰트 목록을 빌드 시 자동 생성하려면 저장소의 Pages Source를 **GitHub Actions**로 설정하는 편이 안전합니다.

1. 이 프로젝트를 저장소 최상위에 업로드합니다.
2. `Settings → Pages → Build and deployment → Source`에서 `GitHub Actions`를 선택합니다.
3. `main` 브랜치에 push하면 `.github/workflows/pages.yml`이 실행됩니다.
4. Actions가 폰트 목록 생성, 웹 빌드, Pages 배포를 순서대로 수행합니다.

직접 브랜치 배포를 계속 사용하는 경우에는 Codespaces에서 `npm run fonts:sync`를 실행한 뒤 갱신된 `assets/fonts/fonts.json`도 커밋해야 합니다.

## Android APK

웹 기능을 Capacitor WebView 안에서 그대로 실행하는 Android 구성을 포함합니다. PNG·JPG·SVG·AI 등의 내보내기는 Android 공유/저장 선택창으로 전달됩니다. 이 소스 압축에는 미리 빌드된 APK 바이너리는 포함하지 않으며, 아래 GitHub Actions 또는 Android Studio 절차로 생성합니다.

### GitHub Actions에서 APK 만들기

1. 프로젝트 전체를 GitHub 저장소에 push합니다.
2. 저장소의 `Actions` 탭을 엽니다.
3. `Build Android APK` 워크플로를 선택합니다.
4. `Run workflow`를 누릅니다.
5. 완료된 실행의 `Artifacts`에서 `goods-maker-debug-apk`를 내려받습니다.

워크플로는 Android 프로젝트가 없으면 자동 생성하고 `app-debug.apk`를 빌드합니다. 디버그 APK는 테스트 설치용입니다. 스토어 배포에는 별도의 서명 키와 release AAB/APK 설정이 필요합니다.

### 로컬 Android Studio 사용

```bash
npm install
npm run android:add       # 최초 1회
npm run android:sync      # 웹 수정 후
npm run android:open
```

`android/` 폴더가 만들어진 뒤 Android Studio에서 실행하거나 서명된 빌드를 만들 수 있습니다.

## 기존 주요 기능

### 아크릴·코롯토

- 무테 색상 확장 재단여백
- 유테 투명 테두리
- 내부 빈 공간 칼선 선택
- 평평한 밑받침과 빈 공간 처리
- 내부·외부 다중 타공과 위치 편집
- 대지 크기·그림 크기·확대율 분리
- 원본·화이트·칼선·확장 도안 레이어 출력

### 스티커

- 여러 이미지 배치·이동·회전·크기 변경
- 한 투명 이미지 안의 떨어진 개체 분리
- threshold 자동 연결과 수동 칼선 합치기
- 합친 칼선 묶음 이동과 내부 개체 개별 편집
- 칼선 사이 최소 간격 자동 배치
- 단색·그라데이션·이미지·패턴 배경
- 여러 이미지 패턴, 균형 순환, 자연스러운 랜덤 순서
- 입자 크기·위치·회전 랜덤과 밀도·분산 조절

### 이미지 작업

- 투명 여백 자동 제거
- 다중 선택과 드래그 선택
- 그룹화한 이미지의 합성 외곽 효과
- 이미지·글·도형·선의 공통 레이어 순서
- 투명·단색·그라데이션·이미지·패턴 배경
- PNG/JPG 저장
- PNG 저장 시 투명 또는 흰 배경 선택

### 공통

- 포커스할 때만 나타나는 숫자 슬라이더
- Hue·채도/밝기·투명도·HEX 컬러피커
- IndexedDB 자동 저장과 새로고침 복원
- 최대 45단계 실행취소·재실행
- 사용자 지정 파일명

## 출력 형식

- 아크릴·스티커: 선택 레이어 PNG, SVG, PDF 1.4 호환 `.ai`
- 이미지 작업: PNG, JPG

`.ai`는 Adobe Illustrator의 비공개 네이티브 구조가 아니라 Illustrator에서 열 수 있는 PDF 호환 파일입니다. 실제 발주 전 제작 업체의 별색, 오버프린트, CMYK, 타공 규격을 확인하세요.

## 프로젝트 구조

```text
.
├── index.html
├── style.css
├── app.js
├── native-save.js
├── package.json
├── capacitor.config.json
├── assets/
│   └── fonts/
│       ├── fonts.json
│       ├── README.md
│       └── _packages/
├── native/
│   └── native-save-entry.js
├── scripts/
│   ├── generate-font-manifest.mjs
│   ├── dev-server.mjs
│   ├── build-native-bridge.mjs
│   └── build-web.mjs
├── .devcontainer/
├── .github/workflows/
└── docs/
```

## 검증

이 버전은 다음 정적·브라우저 스모크 테스트를 기준으로 점검합니다.

- JavaScript 문법 검사
- HTML ID와 JavaScript 참조 연결 검사
- 글상자·도형 추가와 자유 크기 조절
- 단색·그라데이션·패턴 텍스트 렌더링
- 부분 글자 배경
- 효과 레이어 누적과 입체 효과
- 그룹 합성 외곽 효과
- 잠금 상태의 편집 방지
- ZIP 무결성 및 사용자 폰트 바이너리 미포함 확인

---

## v24 · Codespaces 통합 빌드와 APK 기기 폰트

### 가장 간단한 사용 순서

1. 이 프로젝트 ZIP을 저장소 또는 Codespaces 작업 폴더에 풉니다.
2. 사용할 `.ttf`, `.otf`, `.woff`, `.woff2`, 폰트 ZIP을 `font-drop/`에 넣습니다.
3. Codespaces 터미널에서 실행합니다.

```bash
bash scripts/codespaces-setup.sh
npm run dev
```

웹과 APK를 한 번에 만들려면 다음을 실행합니다.

```bash
npm run release:codespaces
```

완료 파일은 다음 위치에 생깁니다.

```text
downloads/goods-maker-web.zip
downloads/goods-maker-debug.apk
```

Codespaces 왼쪽 파일 탐색기에서 `downloads` 폴더의 파일을 우클릭해 다운로드할 수 있습니다.

### 통합 ZIP과 폰트를 Codespaces 루트에 같이 올린 경우

프로젝트 ZIP, 폰트 파일, `codespaces-bootstrap.sh`를 한 폴더에 올린 뒤 다음처럼 실행할 수 있습니다.

```bash
bash codespaces-bootstrap.sh "$PWD"
cd goods-maker
npm run release:codespaces
```

부트스트랩 스크립트는 통합 ZIP을 현재 저장소 루트에 덮어쓰고, 폰트 파일과 폰트가 든 ZIP을 찾아 `font-drop/`으로 복사한 뒤 프로젝트를 준비합니다. 기존 `.git` 폴더는 건드리지 않습니다.

### 저장소 폰트 자동 등록

`npm run fonts:import`는 다음을 수행합니다.

- 직접 폰트 파일 → `assets/fonts/imported/`
- 폰트 ZIP → `assets/fonts/_packages/`
- ZIP 내부 폰트 안전 추출 → `assets/fonts/_generated/`
- 내부 Family Name/Full Name 분석 → `assets/fonts/fonts.json`

웹과 APK에 폰트를 포함하려면 생성된 `assets/fonts/` 변경사항을 커밋해야 합니다. 폰트 라이선스에서 재배포가 허용되는지도 확인하세요.

### APK 안에서 폰트 직접 추가

이미지 작업 탭에서 글상자를 선택하면 `기기 폰트` 카드가 표시됩니다.

- `＋ 폰트 추가`로 TTF·OTF·WOFF·WOFF2 여러 개 선택
- TTF·OTF·WOFF는 가능한 경우 폰트 내부 이름을 읽어 표시
- WOFF2처럼 브라우저에서 내부 이름을 직접 읽기 어려운 형식은 파일명을 표시명으로 사용
- 추가한 폰트는 IndexedDB에 저장되어 앱을 닫았다 열어도 유지
- 폰트 선택 메뉴에서 `· 기기` 표시가 붙은 항목을 선택해 글상자에 적용
- `삭제` 또는 `모두 삭제`로 기기 저장 폰트 정리

이 기능은 APK의 Android 파일 선택기를 사용하며, 별도 저장소 권한 없이 사용자가 선택한 파일만 읽습니다. 웹에서도 동일한 브라우저에 폰트가 저장됩니다.

### GitHub Pages와 Actions

- `main` 브랜치에 push하면 `.github/workflows/pages.yml`이 웹을 빌드하고 GitHub Pages에 배포합니다.
- `.github/workflows/android-apk.yml`은 디버그 APK를 빌드해 `goods-maker-debug-apk` Artifact로 제공합니다.
- Codespaces에서 Android SDK 설치가 오래 걸리면 Actions 빌드를 사용하는 편이 간단합니다.
