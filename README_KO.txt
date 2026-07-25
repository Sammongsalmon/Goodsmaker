굿즈 메이커 v46.1 종료 코드 1 수정

원인:
- v46 검증 스크립트가 특정 과거 버전의 style.css/layout.js SHA-256을 고정값으로 요구했습니다.
- 현재 저장소의 화면 파일이 정상이어도 해시가 다르면 verify:functions가 코드 1로 종료했습니다.
- 터미널에 set -euo pipefail을 직접 입력한 경우, 그 실패로 현재 셸까지 종료될 수 있습니다.

적용:
1. 이 ZIP을 저장소 루트에 덮어씁니다.
2. 다음처럼 자식 셸로 실행합니다.
   bash RUN_V46_SAFE.sh

이 패치는 style.css와 layout.js를 포함하거나 변경하지 않습니다.
검증 스크립트는 현재 두 파일의 해시를 출력만 하고 기능 배선만 검사합니다.

APK 빌드:
- .devcontainer가 Java 21로 바뀐 뒤 기존 Codespace를 계속 쓰고 있다면,
  먼저 Codespaces: Rebuild Container를 실행해야 합니다.
- 재빌드 후: npm run apk:codespaces
