# 폰트 넣는 곳

Codespaces에 업로드한 `.ttf`, `.otf`, `.woff`, `.woff2` 또는 폰트 ZIP을 이 폴더에 넣으세요.

```bash
npm run fonts:import
```

직접 폰트 파일은 `assets/fonts/imported/`로, ZIP은 `assets/fonts/_packages/`로 복사된 뒤 `fonts.json`이 갱신됩니다.
웹과 APK에 포함하려면 생성된 `assets/fonts/` 변경사항을 저장소에 커밋하세요.
