# 웹 기반 이미지·캔버스 편집기 제작 플레이북

> **대상 독자:** 복잡한 웹 편집기, 이미지 처리 도구, 굿즈 제작 도구를 구현하는 고추론 모델 또는 숙련된 프런트엔드 엔지니어  
> **작성 목적:** 굿즈 메이커 프로젝트에서 여러 차례 수정하며 드러난 요구사항과 실패 원인을 일반화해, 전혀 다른 목적의 웹을 만들더라도 같은 시행착오를 반복하지 않게 한다.  
> **사용 방법:** 새 프로젝트의 기획·설계 단계에서 먼저 읽고, 해당되는 항목을 요구사항과 완료 조건에 포함한다. 아래에서 `[공통]`은 대부분의 편집형 웹에, `[캔버스]`는 이미지·도형 편집기에, `[제작]`은 칼선·화이트·재단여백 같은 출력 제작 도구에 적용한다.

---

## 0. 가장 먼저 지켜야 할 12가지 원칙

1. **DOM부터 만들지 말고 상태 모델과 상호작용 상태 머신부터 설계한다.**  
   선택, 다중 선택, 그룹, 그룹 내부 편집, 이동, 회전, 크기 조절, 드래그 선택을 나중에 덧붙이면 이벤트 충돌과 저장 형식 변경이 반복된다.

2. **원본 데이터와 파생 데이터를 분리한다.**  
   원본 이미지·알파 마스크·개체 관계가 진실의 원천이며, 칼선·화이트·효과·미리보기는 언제든 다시 만들 수 있는 파생 결과다.

3. **값 편집과 고비용 연산을 분리한다.**  
   드래그 중에는 가이드만 갱신하고, `다시 만들기` 또는 포인터 해제 시 최종 연산한다. 사용자가 위치를 잡는 동안 매 프레임 전체 마스크·칼선·색상 확장을 계산하지 않는다.

4. **미리보기와 내보내기가 같은 렌더 파이프라인을 사용해야 한다.**  
   미리보기 전용 보정과 내보내기 전용 보정이 따로 있으면 결과가 다르게 나온다. 해상도만 다르게 하고 합성 순서와 알고리즘은 공유한다.

5. **모바일과 데스크톱을 별도 기능으로 보지 말고 Pointer Events 기반으로 처음부터 통합한다.**  
   마우스만 구현한 뒤 터치를 붙이면 이동·회전·크기 조절이 자주 깨진다.

6. **그룹은 단순한 ID 배열이 아니라 일급 객체다.**  
   그룹 이동, 그룹 내부 편집, 그룹 기준 외곽선·그림자, 앞뒤 순서, 저장·복원, 실행취소가 모두 그룹을 이해해야 한다.

7. **이미지 분석은 파생 칼선이 아니라 원본 알파/픽셀 기준으로 시작한다.**  
   개체 분리와 연결 threshold를 이미 팽창된 칼선 기준으로 계산하면 거리 의미가 틀어진다.

8. **랜덤은 항상 결정적이어야 한다.**  
   패턴, 회전, 크기, 위치 랜덤은 동일 설정에서 계속 흔들리지 않도록 seed를 사용한다. 사용자가 설정을 바꾸었을 때만 결과가 바뀌게 한다.

9. **컨텍스트에 맞지 않는 옵션은 숨긴다.**  
   실제 반투명 면이 없으면 화이트 레이어 두 종류를 보여주지 않고, 특정 모드에서만 필요한 설정은 그 모드 안에만 둔다.

10. **작업 복원과 실행취소를 첫 버전부터 넣는다.**  
    데이터 모델이 굳은 뒤 추가하면 모든 변형 작업을 다시 감싸야 한다.

11. **제작용 내보내기는 브라우저 표시 성공만으로 완료가 아니다.**  
    Illustrator, 인쇄 프로그램, 다른 브라우저에서 직접 열어 호환성을 확인한다.

12. **기능 완료 조건을 화면이 아니라 실패 사례로 정의한다.**  
    “칼선이 나온다”가 아니라 “작은 안티에일리어싱 픽셀로 스파이크가 생기지 않고, 대지 경계에 붙지 않으며, 곡선으로 출력된다”까지 명시한다.

---

## 1. 이 프로젝트에서 확인된 안정적인 UX 기본값

### 1.1 시각 디자인

- `[공통]` 전체 UI는 채도가 낮은 편안한 색을 사용하고, 작업 캔버스의 투명 체크무늬는 **중립 회색**으로 유지한다. UI 테마색을 체크무늬에 섞으면 이미지 색 판별이 어려워진다.
- `[공통]` 페이지 제목과 상단 아이콘은 별개 요소로 관리한다. 제목 문자열에 이모지를 붙이지 말고 아이콘 영역에서만 표시한다.
- `[공통]` 샘플 이미지는 사용자가 명시적으로 원하지 않으면 자동 로드하지 않는다. 실제 작업과 샘플의 구분이 모호해지고 초기 연산 비용도 생긴다.
- `[공통]` 설명은 “알고리즘 명칭”보다 사용 결과를 말한다. 예: `morphological closing` 대신 `4 mm 이하의 좁은 홈은 입구에서 연결`.

### 1.2 정보 구조

- `[공통]` 서로 연관된 옵션은 **한 카드 안의 동등한 행**으로 둔다. 같은 주제인데 내부에 또 카드가 들어가는 중첩 구조는 피한다.
- `[공통]` 이미 모드 문맥이 분명하면 라벨에서 `유테`, `무테`, `스티커` 같은 중복 단어를 뺀다.
- `[공통]` 고급 옵션은 펼침 영역으로 숨기되, 결과에 중요한 값과 현재 상태는 항상 보이게 한다.
- `[공통]` 각 수치에는 단위, 허용 범위, 기본값의 의미를 함께 표시한다.

### 1.3 숫자 입력 UX

모든 크기, 위치, 회전, 불투명도, 간격 입력은 다음 공통 컴포넌트를 사용한다.

- 숫자 입력은 평소에 간결하게 보인다.
- 입력창에 포커스되어 커서가 깜빡일 때만 바로 아래에 슬라이더가 나타난다.
- 숫자와 슬라이더는 양방향 동기화한다.
- 키보드 입력, 화살표 키, 휠, 슬라이더 모두 동일한 clamp·round 로직을 거친다.
- 가로·세로·확대율처럼 서로 종속된 값은 한 방향만 진실의 원천이 되지 않도록 변환 함수를 명확히 둔다.

```ts
interface NumericSpec {
  min: number;
  max: number;
  step: number;
  unit?: string;
  format?: (value: number) => string;
  parse?: (text: string) => number;
}

function normalizeNumeric(value: number, spec: NumericSpec): number {
  const clamped = Math.max(spec.min, Math.min(spec.max, value));
  const steps = Math.round((clamped - spec.min) / spec.step);
  return spec.min + steps * spec.step;
}
```

**중요:** `input` 이벤트에서는 가벼운 미리보기만, `change` 또는 포인터 해제에서는 히스토리 저장과 무거운 재계산을 수행한다.

### 1.4 컬러피커 UX

브라우저·플랫폼 기본 피커만 맡기면 모바일에서 비직관적인 별도 창이 뜨거나 색 변화 방향이 보이지 않는 경우가 있다. 편집기에서는 다음 형태의 자체 피커를 기본으로 한다.

- 채도·명도 2차원 영역
- 실제 무지개색이 보이는 Hue 바
- 현재 색에서 투명으로 변하는 알파 바
- 슬라이더 손잡이는 **흰색 원**
- 이동한 구간을 테마색으로 채우는 진행 효과는 사용하지 않는다.
- HEX 8자리(`#RRGGBBAA`), RGBA, 불투명도 숫자를 함께 지원한다.
- 색상 버튼을 클릭하면 피커가 즉시 열리고, 별도의 `직접 설정` 단계는 만들지 않는다.
- 투명색이 의미 있는 배경·효과 색에는 alpha를 반드시 저장한다.

```css
.hue-track {
  background: linear-gradient(90deg,
    #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%);
}
.alpha-track {
  background:
    linear-gradient(90deg, rgba(var(--rgb), 0), rgba(var(--rgb), 1)),
    var(--checker);
}
.color-thumb {
  background: #fff;
  border: 2px solid rgba(0,0,0,.35);
  border-radius: 999px;
  box-shadow: 0 1px 5px rgba(0,0,0,.25);
}
```

---

## 2. 사용자가 나중에 자주 추가하게 되는 기능: 처음부터 설계할 것

| 나중에 빠지기 쉬운 기능 | 뒤늦게 추가하면 생기는 비용 | 처음 설계할 때 반영할 것 |
|---|---|---|
| 모바일 이동·회전·크기 조절 | mouse/touch 이중 구현, 스크롤 충돌 | Pointer Events, pointer capture, `touch-action` 정책 |
| 다중 선택·그룹·그룹 내부 편집 | 선택 상태가 단일 ID로 굳음 | `selectedIds`, `groups`, 선택 상태 머신 |
| 실행취소·재실행 | 모든 이벤트를 다시 감싸야 함 | command/snapshot 경계, 작업 단위 정의 |
| 새로고침 복원 | 이미지 Blob 저장 형식 변경 | schema version이 있는 IndexedDB |
| 앞뒤 순서·정렬 | 배열 순서와 렌더 순서 불일치 | z-index를 모델의 명시적 필드로 관리 |
| 숫자 입력 슬라이더 | 입력별 중복 구현 | 공통 NumericField 컴포넌트 |
| 파일 이름 입력 | 각 내보내기 함수에 하드코딩 | 공통 `resolveExportName()` |
| 투명/흰 배경 내보내기 | JPG/PNG 합성 로직 분기 | export compositing 옵션 모델 |
| 출력 레이어 선택 | 렌더 결과가 한 장으로 굳음 | 처음부터 레이어별 캔버스/렌더 노드 |
| 실제 반투명과 AA 구분 | 화이트 결과가 깨짐 | 반투명 영역 분석 모듈 |
| Illustrator SVG 호환 | 브라우저에서만 확인하면 놓침 | SVG 1.1 + 임베드 호환 테스트 |
| 결정적 랜덤 패턴 | 편집할 때마다 배치가 흔들림 | seed 기반 PRNG와 패턴 좌표 키 |
| 고비용 연산 지연 적용 | 드래그마다 멈춤 | draft/applied 상태와 dirty flag |
| 데이터 마이그레이션 | 이전 저장 작업이 깨짐 | `schemaVersion`, migration 함수 |

---

## 3. 권장 아키텍처

대형 단일 `app.js`는 초기 프로토타입에는 빠르지만, 기능이 늘면 상태·렌더·알고리즘이 서로 얽힌다. 새 프로젝트는 아래처럼 나눈다.

```text
src/
  app/
    store.ts                 # 단일 상태 저장소, schemaVersion
    commands.ts              # 실행취소/재실행 command
    migrations.ts            # 저장 데이터 마이그레이션
  editor/
    coordinate-system.ts     # 화면↔대지 좌표 변환
    pointer-controller.ts    # 선택/이동/회전/리사이즈 상태 머신
    selection.ts             # 단일/다중/그룹/내부 선택
    alignment.ts             # 중앙/상하좌우/자동 배치
  render/
    render-graph.ts          # 레이어 DAG, dirty flag
    preview-renderer.ts
    export-renderer.ts
    effects.ts               # 외곽선/광선/그림자
  image/
    alpha-trim.ts
    alpha-analysis.ts
    connected-components.ts
    masks.ts
    color-field.ts
  geometry/
    contours.ts
    offsets.ts
    curve-fit.ts
    boolean.ts
    distance.ts
  patterns/
    pattern-engine.ts
    seeded-random.ts
    particles.ts
  export/
    png.ts
    jpg.ts
    svg.ts
    pdf-ai.ts
  persistence/
    indexed-db.ts
  ui/
    numeric-field.ts
    color-picker.ts
    option-disclosure.ts
```

### 3.1 상태 모델

원본 데이터와 파생 결과를 분리한다.

```ts
interface DocumentState {
  schemaVersion: number;
  mode: 'acrylic' | 'sticker' | 'maker';
  artboard: { widthMm: number; heightMm: number };
  items: EditorItem[];
  groups: EditorGroup[];
  selection: SelectionState;
  background: BackgroundConfig;
  production?: ProductionConfig;
  export: ExportConfig;
  ui: UiState;
}

interface EditorItem {
  id: string;
  sourceId: string;            // IndexedDB Blob 참조
  transform: {
    xMm: number;
    yMm: number;
    widthMm: number;
    heightMm: number;
    rotationDeg: number;
  };
  zIndex: number;
  crop: { sx: number; sy: number; sw: number; sh: number };
  effects: EffectConfig;
  groupId?: string;
  visible: boolean;
  locked: boolean;
}

interface EditorGroup {
  id: string;
  itemIds: string[];
  effectMode: 'per-item' | 'union-alpha';
}
```

### 3.2 파생 결과와 dirty flag

```ts
interface DerivedState {
  previewBitmap?: ImageBitmap;
  alphaMask?: Uint8Array;
  componentLabels?: Int32Array;
  cutPaths?: Path2D[];
  whiteLayers?: { opaqueOnly: ImageBitmap; full: ImageBitmap };
  bleedBitmap?: ImageBitmap;
  dirty: Set<'layout'|'alpha'|'geometry'|'color'|'effects'|'export'>;
}
```

- 이동만 바뀌면 원본 픽셀 분석을 다시 하지 않는다.
- 색 효과만 바뀌면 칼선을 다시 만들지 않는다.
- threshold가 바뀌면 component graph만 갱신한다.
- 최종 해상도 렌더는 내보내기 직전에 만든다.

---

## 4. 캔버스 편집기 상호작용 상태 머신

### 4.1 권장 상태

```text
idle
selecting-marquee
moving-items
resizing-items
rotating-items
group-edit
hole-edit
panning
```

상태마다 허용되는 이벤트와 cursor를 명시한다. Boolean 여러 개(`isDragging`, `isRotating`, `isSelecting`)를 동시에 관리하지 않는다.

### 4.2 화면 좌표를 대지 좌표로 변환

CSS 확대, 고해상도 캔버스, 스크롤을 모두 고려한다.

```ts
function clientToCanvas(ev: PointerEvent, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (ev.clientX - rect.left) * (canvas.width / rect.width),
    y: (ev.clientY - rect.top) * (canvas.height / rect.height)
  };
}
```

- `pointerdown`에서 `setPointerCapture(pointerId)`를 호출한다.
- 편집 핸들이 있는 영역은 `touch-action: none`, 스크롤 영역은 `pan-y`처럼 역할별로 나눈다.
- 클릭과 드래그를 구분할 최소 이동 거리(예: 4~6 CSS px)를 둔다.
- 더블클릭/더블탭은 시간뿐 아니라 같은 개체인지 확인한다.

### 4.3 선택 규칙

- 일반 클릭: 최상단 개체 하나 선택
- 다중 선택 모드: 클릭한 개체의 선택 토글
- 빈 영역 드래그: marquee와 교차하는 개체 선택
- 빈 영역 클릭: 선택 해제
- 그룹 클릭: 그룹 전체 선택
- 그룹 더블클릭: 그룹 내부 편집 모드 진입
- 내부 편집 중 다른 구성원을 더블클릭: 내부 선택 집합에 추가
- 내부 개체 단일 클릭: 해당 내부 선택 해제 또는 종료 규칙을 일관되게 적용

선택 판정은 화면에 그려진 bounding box만 쓰지 말고, 필요할 때 alpha hit test를 사용한다. 다만 매 pointermove마다 원본 픽셀을 읽지 않도록 저해상도 hit mask를 캐시한다.

### 4.4 그룹과 효과

그룹 효과는 개별 이미지에 효과를 준 뒤 합치는 것이 아니라 다음 순서로 처리한다.

1. 그룹 구성원을 z-order대로 투명 오프스크린 캔버스에 합성
2. 합성된 alpha union 생성
3. union alpha에 외곽선·외부광선·내부광선·그림자 적용
4. 그룹 원본 합성본을 위에 렌더

이렇게 해야 겹친 두 이미지 사이로 외곽선이 침범하지 않는다.

```ts
function renderGroup(group: EditorGroup, items: EditorItem[], scale: number) {
  const bounds = getUnionBounds(group.itemIds, items, true); // 효과 여유 포함
  const base = makeOffscreen(bounds, scale);
  for (const item of sortByZ(group.itemIds, items)) renderItem(base.ctx, item, bounds, scale);
  const alpha = extractAlpha(base.canvas);
  const effects = renderEffectsFromUnionAlpha(alpha, groupEffects(group), scale);
  return composite(effects, base.canvas);
}
```

### 4.5 정렬과 자동 배치

기본 정렬 버튼:

- X축 중앙
- Y축 중앙
- 전체 중앙
- 칼선/외곽 기준 위, 아래, 왼쪽, 오른쪽
- 선택 묶음의 상대 간격은 유지

자동 간격 배치는 모든 개체를 처음부터 재배열하지 않고, 충돌 제약을 푸는 최소 이동 문제로 본다.

1. 개체/그룹별 칼선 bounding polygon 또는 distance field를 준비
2. 간격 미달 쌍만 찾기(spatial hash 사용)
3. 각 쌍에 필요한 분리 벡터 계산
4. 이동 가능 개체에 벡터를 절반씩 분배
5. 몇 차례 반복하고 대지 경계 제약 적용
6. 더 이상 개선되지 않으면 경고

그룹은 내부 배치를 유지한 하나의 rigid body로 다룬다.

---

## 5. 실행취소·재실행, 저장, 복원

### 5.1 작업 단위

다음은 하나의 history entry로 묶는다.

- 드래그 시작부터 pointerup까지
- 슬라이더 포커스 시작부터 변경 확정까지
- 그룹화/그룹 해제
- 정렬/자동 배치 한 번
- 이미지 업로드/삭제
- 배경·효과 설정 한 번

매 pointermove마다 snapshot을 만들지 않는다.

```ts
interface HistoryEntry {
  label: string;
  before: SerializableDocumentState;
  after: SerializableDocumentState;
}
```

큰 이미지 Blob은 snapshot마다 복사하지 않고 `sourceId`로 참조한다.

### 5.2 IndexedDB

- 이미지/배경/패턴 Blob: IndexedDB object store
- 문서 상태 JSON: IndexedDB 또는 작은 경우 localStorage
- `schemaVersion` 필수
- 저장은 300~800ms debounce
- 저장 실패·quota 초과를 UI에 알림
- 같은 브라우저·같은 origin에서만 복원된다는 설명 제공

```ts
const migrations: Record<number, (doc: any) => any> = {
  2: migrateSingleHoleToHoleArray,
  3: addPatternSeed,
  4: addGroupModel
};
```

초기화는 현재 탭만 지울지 전체 문서를 지울지 명확히 구분한다.

---

## 6. 이미지 업로드 전처리

### 6.1 투명 여백 자르기

꾸밀 개체와 패턴 입자는 항상 알파 정보가 있는 최소 bounding box로 자른 뒤 사용한다.

- threshold는 보통 alpha > 1로 시작하되, 잡티 제거용 안정화 마스크를 함께 사용한다.
- 자른 뒤 원본 파일명, 원래 크기, crop 정보는 보존한다.
- 패턴에 여러 이미지를 넣을 때 각 이미지마다 독립적으로 trim한다.

### 6.2 작은 픽셀·안티에일리어싱 안정화

한두 픽셀짜리 점을 무조건 삭제하면 섬세한 장식도 사라진다. 다음을 조합한다.

- 연결 성분 면적
- 최소 폭/높이
- 본체와의 접촉 길이
- 본체에서의 돌출 길이
- 실제 출력 mm 환산 크기

마스크 안정화는 **원본 이미지 픽셀을 수정하는 것**이 아니라, 칼선·확장 계산용 분석 마스크에만 적용한다.

### 6.3 실제 반투명 면과 안티에일리어싱 구분

`0 < alpha < 255`만으로 반투명 판정하면 외곽 AA도 반투명으로 오인한다.

실제 반투명 영역은 다음 조건을 여러 개 만족해야 한다.

- 일정 면적 이상의 연결 성분
- 최소 가로/세로 두께
- 1~3 px 침식 후에도 남는 내부 core
- 외곽 opaque 영역과 평행한 얇은 띠가 아님
- 이미지 크기에 따라 threshold를 상대값으로 조정

```ts
function isRealTranslucentRegion(component: AlphaComponent, imageArea: number) {
  const minArea = Math.max(12, imageArea * 0.00008);
  return component.area >= minArea
    && component.width >= 4
    && component.height >= 4
    && component.erodedCoreArea >= Math.max(4, component.area * 0.08)
    && !component.isThinBoundaryBand;
}
```

실제 반투명 면이 감지될 때만 UI에서 `화이트 · 반투명 면 제외`와 `화이트 · 전체`를 분리해 보여준다. 없으면 `화이트` 하나만 표시한다.

---

## 7. 개체 분리·합치기 알고리즘

### 7.1 0 mm 분리의 의미

`0 mm`에서는 **원본 알파 마스크에서 실제로 연결되지 않은 모든 성분을 분리**한다. 칼선 offset이나 테두리 결과를 기준으로 분리하지 않는다.

1. 원본 알파 안정화 마스크 생성
2. connected component labeling
3. 작은 잡티 필터링
4. 각 성분의 crop과 원본 좌표 보존

### 7.2 threshold 자동 합치기

threshold는 “칼선 사이 거리”가 아니라 **원본 성분 픽셀 외곽 사이의 실제 거리**다.

- 성분마다 distance transform 또는 boundary point index 준비
- 성분 간 최소 실제 거리를 계산
- threshold 이하인 쌍을 graph edge로 연결
- union-find로 자동 그룹 생성

파생 칼선의 여백을 먼저 넣고 거리를 재면 threshold가 실제보다 작아져 예상치 못한 합치기가 생긴다.

### 7.3 수동 합치기

사용자가 threshold보다 멀리 떨어진 성분도 다중 선택해 합칠 수 있어야 한다.

- 자동 합치기 결과와 수동 그룹을 별도 데이터로 보관
- 수동 그룹이 자동 threshold 변경으로 풀리지 않게 한다.
- 그룹 연결부는 두 성분의 가장 가까운 안정적인 boundary 구간을 찾아 round bridge로 생성한다.
- 너무 가느다란 bridge가 되지 않도록 최소 폭을 제작 단위 mm로 제한한다.

### 7.4 이미 분리된 다른 업로드 이미지도 합치기

합치기 대상은 “한 이미지에서 쪼개진 성분”으로 제한하지 말고 모든 편집 개체와 기존 그룹을 받을 수 있게 한다. 겹침이 있을 때는 다음 정책을 제공한다.

- 현재 z-order 유지
- 첫 선택을 맨 위
- 마지막 선택을 맨 위

---

## 8. 칼선·외곽선 생성에서 반복된 실패와 해결 원칙

### 8.1 찌글찌글한 칼선

원인:

- 알파 마스크 1 px 요철을 모두 꼭짓점으로 유지
- contour를 점 간 직선으로만 연결
- 화면 픽셀 단위 smoothing을 출력 크기와 무관하게 적용

해결:

1. 실제 mm 기준 마스크 smoothing
2. 면적 보정으로 과도한 수축 방지
3. 곡선을 일정 arc-length로 resample
4. cubic Bézier 또는 적응형 곡선 피팅
5. 오차가 큰 구간만 anchor 복원
6. SVG에도 동일한 곡선 path 출력

단순화의 목적은 다각형화가 아니라 **원본 곡률을 유지하면서 제어점 수를 줄이는 것**이다.

### 8.2 스파이크

칼선에 걸린 작은 픽셀이나 AA 점이 offset 시 긴 돌기로 확대될 수 있다.

- source alpha 분석 마스크에서 작은 spur 제거
- skeleton/국소 폭으로 가늘고 짧은 돌출부 판단
- 색상 확장과 칼선이 같은 안정화 마스크를 사용
- 실제 길고 넓은 장식은 보존

### 8.3 대지 가장자리에 붙는 칼선

원인:

- flood fill 또는 좁은 홈 연결 로직이 대지 경계를 외부 공간으로 잘못 처리
- 작업 마스크에 padding이 없음

해결:

- 대지보다 넓은 임시 마스크에서 연산
- 결과가 임시 마스크 바깥 경계에 닿으면 해당 보정을 폐기
- 좁은 홈 연결은 밑받침 추가 전의 도안 외곽에만 적용
- 대지 경계는 절대 도형 정보로 사용하지 않는다.

### 8.4 유테의 좁은 U자 홈

제작이 어려운 좁은 입구는 안쪽까지 따라가지 않고 입구에서 자연스럽게 연결한다.

- 외부와 연결된 홈만 대상
- 내부 닫힌 구멍·타공은 제외
- 실제 mm 기준 최소 입구 폭(예: 4 mm)을 사용
- 밑받침이 만든 의도적 투명 공간은 예외 처리

### 8.5 둥근 offset

사각 커널 팽창은 직선·각진 모서리를 만든다. 유클리드 거리 transform 또는 round join 기반 vector offset을 사용한다.

- 외부 offset: round join
- 내부 offset: self-intersection 정리
- 작은 곡률 반경보다 큰 offset 시 topology 변화를 검사

---

## 9. 밑받침·타공처럼 결과를 바꾸는 특수 도형

이 부분은 제작 도구 특화지만, “원본 외곽에 추가 구조물을 결합”하는 일반 문제에도 적용된다.

### 9.1 밑받침

- 밑받침은 도안 전체 smoothing에 섞지 않고 **별도 shape**로 만든 뒤 boolean union한다.
- 둥글기 슬라이더는 밑받침 모서리와 접합부에만 적용한다.
- 다른 캐릭터 외곽·타공 곡률에 영향을 주면 안 된다.
- 무테와 유테의 밑받침 생성 규칙이 다를 수 있으므로 전략 객체로 분리한다.
- 빈 공간 유지 모드에서는 밑받침과 원본 사이의 투명 영역을 색 확장 대상으로 삼지 않는다.

### 9.2 타공

- 여러 타공을 배열로 관리하고 각 타공에 draft/applied 값을 둔다.
- 위치 이동 중에는 가이드만 표시하고 `다시 만들기` 시 geometry에 반영한다.
- 다시 만들기 후 선택 가이드는 닫되, 타공 자체는 삭제하지 않는다.
- 내부 타공: 이미지 픽셀은 유지하고 칼선 path에 구멍만 추가하는 옵션 가능
- 외부 타공: 투명 고리와 구멍을 원본의 투명 정보처럼 취급하되, 이미지와 겹친 픽셀은 이미지가 우선
- 중앙 정렬, 타공 직경, 벽 두께, 도안과의 간격을 개별 설정

---

## 10. 재단여백/색상 확장: 단색과 그라데이션을 함께 보존하는 방법

이 알고리즘의 핵심은 “가장 가까운 픽셀 복사”나 “주변 평균” 한 가지로 해결하지 않는 것이다.

### 10.1 실패 패턴

- 경계 한 픽셀만 샘플링 → AA 색이 확장되어 줄무늬·오색 발생
- 넓은 샘플 평균 → 서로 다른 색 경계가 블러됨
- 모든 영역을 단색 분류 → 실제 그라데이션이 사라짐
- 모든 영역을 보간 → 단색 면이 그라데이션처럼 번짐
- 확장 후 원본과 1 px 틈 → 투명 실선 발생

### 10.2 권장 파이프라인

1. **분석 마스크 안정화**  
   AA와 작은 spur를 정리하되 원본 픽셀은 보존한다.

2. **경계 안쪽 샘플 띠 생성**  
   경계에서 법선 안쪽으로 여러 깊이의 샘플을 취한다. 한 픽셀만 보지 않는다.

3. **색상 영역 분할**  
   색 차이, 공간 연결성, gradient 방향을 사용해 경계 근처를 region label로 나눈다.

4. **단색 여부를 ‘덩어리’로 판정**  
   단순히 몇 픽셀 값이 비슷한지가 아니라, 안쪽에 충분한 면적의 연결된 저분산 색상 영역이 있는지 확인한다.

5. **그라데이션 여부 판정**  
   region 내 RGB 또는 Lab 값을 위치에 대해 선형/저차 곡면으로 피팅하고 잔차가 낮으면 gradient로 본다.

6. **영역별 확장**
   - 단색 region: robust 대표색(median/trimmed mean) 하나로 확장
   - gradient region: 경계 법선 방향으로 fitted color field를 외삽
   - texture region: nearest valid sample + edge-aware propagation

7. **색 경계 보존**  
   서로 다른 region label 사이에서는 평균하지 않는다. 경계의 접선 방향을 따라 분리선을 연장한다.

8. **투명 금지/차단 영역 반영**  
   외부 타공 고리, 밑받침 빈 공간처럼 확장되면 안 되는 투명 영역은 propagation mask에서 barrier로 처리한다.

9. **안쪽 2 px 겹침**  
   확장 결과를 원본 안쪽으로 2 px 정도 더 겹치게 만든 뒤 원본을 마지막에 다시 합성한다. 원본과 확장 사이의 투명 실선을 없앤다.

10. **최종 외곽 AA**  
    확장 도안 바깥 1 px 정도에만 coverage 기반 AA를 적용한다. 내부 색 경계에는 blur를 적용하지 않는다.

### 10.3 단색 판정 예시

```ts
interface RegionStats {
  count: number;
  connectedCoreArea: number;
  covarianceTrace: number;
  maxDeltaE: number;
  gradientFitError: number;
}

function classifyRegion(s: RegionStats): 'flat'|'gradient'|'texture' {
  const hasBody = s.connectedCoreArea >= 20;
  if (hasBody && s.covarianceTrace < 10 && s.maxDeltaE < 4) return 'flat';
  if (s.gradientFitError < 5) return 'gradient';
  return 'texture';
}
```

절대 threshold는 이미지 해상도와 색공간에 맞춰 조정해야 한다. 가능하면 sRGB 거리보다 Lab/OKLab 기반 차이를 사용한다.

### 10.4 경계 방향

- 일반 경계: 칼선에서의 색 경계 접선을 외부로 연장
- 꼭짓점의 색 경계: 원본 꼭짓점과 offset 꼭짓점을 연결
- 경계가 불안정하면 근처 수 px~수십 px를 사용해 robust line/curve fit

### 10.5 성능 최적화

색상 확장은 전체 대지가 아니라 경계 주변 band에서만 계산한다.

```text
band = dilate(alpha, bleedPx + safetyPx) - erode(alpha, overlapPx)
```

band 바깥은 계산하지 않고, region 통계는 원본 해상도에서 한 번 캐시한다.

---

## 11. 패턴 엔진 설계

### 11.1 공통 데이터 모델

```ts
interface ParticlePatternConfig {
  kind: 'dot'|'star'|'square-star'|'octagram'|'heart'|'image';
  layout: 'grid'|'diagonal'|'random';
  sizeMode: 'fixed'|'random';
  size: number;
  sizeMin: number;
  sizeMax: number;
  gap: number;
  density: number;
  dispersion: number;
  rotationMode: 'fixed'|'random';
  rotation: number;
  rotationMin: number;
  rotationMax: number;
  seed: number;
  foreground: RGBA;
  background: BackgroundFill;
  imageSourceIds?: string[];
  imageOrder: 'balanced'|'random';
}
```

### 11.2 여러 이미지 패턴

- 모든 입력 이미지를 투명 여백 제거 후 사용
- 홀수 개 이미지도 특정 행에 몰리지 않게 배치
- 균형 순환에서는 이미지 개수 `n`과 서로소인 가장 작은 행 이동값 `s`를 사용한다.

```ts
function smallestCoprimeShift(n: number): number {
  for (let s = 2; s < n + 2; s++) if (gcd(s, n) === 1) return s;
  return 1;
}

index = (column + row * shift) % imageCount;
```

바로 위·아래 행에 같은 순서가 겹치지 않는지 작은 `n`(1~9)을 별도로 테스트한다.

### 11.3 결정적 랜덤

```ts
function hash32(x: number, y: number, seed: number): number {
  let h = Math.imul(x ^ seed, 0x45d9f3b) ^ Math.imul(y, 0x119de1f3);
  h ^= h >>> 16; h = Math.imul(h, 0x45d9f3b); h ^= h >>> 16;
  return (h >>> 0) / 0xffffffff;
}
```

셀 좌표와 seed로 크기, 위치, 회전, 이미지 순서를 결정하면 설정이 같을 때 결과가 안정적이다.

### 11.4 위치 랜덤과 밀도

- `분산`: 기준 셀 중심에서 움직일 수 있는 최대 비율
- `밀도`: 셀을 실제로 채울 확률 또는 목표 입자 수
- 완전 랜덤 배치에서는 최소 거리 검사를 넣어 과도한 겹침을 방지한다.
- 랜덤 크기의 최대값을 사용해 안전한 셀 크기와 화질 경고를 계산한다.

### 11.5 배경

패턴 바탕은 다음을 모두 지원할 수 있어야 한다.

- 투명
- 단색 + alpha
- 그라데이션 + alpha
- 이미지

배경 이미지에는 fit 방식, 확대율, X/Y, 임의 회전, 좌우 90° 회전 버튼을 제공한다.

---

## 12. 효과 렌더링

### 12.1 외곽선

Canvas `stroke`만으로 투명 이미지 외곽선을 만들면 작은 해상도에서 계단이 보일 수 있다.

권장 방식:

1. 고해상도 또는 2~4배 supersampling alpha mask 생성
2. distance field 또는 round dilation으로 외곽 영역 생성
3. coverage를 계산해 AA 적용
4. 다운샘플링 시 high-quality smoothing
5. 그룹이면 union alpha에 한 번 적용

### 12.2 광선·그림자

- 외부광선: 확장 alpha + blur + spread
- 내부광선: 원본 alpha 안쪽 distance 기준
- 그림자: alpha를 offset 후 blur
- 색, opacity, size, spread, shadow X/Y를 데이터 모델로 분리
- `모든 개체에 적용`은 선택 개체의 EffectConfig를 복제하되, 그룹 전용 설정을 명확히 한다.

효과 여유만큼 오프스크린 bounds를 넓히지 않으면 잘린다.

---

## 13. 성능과 최적화

### 13.1 Railway 같은 호스팅이 빨라지는 경우와 아닌 경우

연산이 브라우저 Canvas/JS에서 실행되면 GitHub Pages에서 Railway로 옮겨도 사용자의 CPU 연산 속도는 거의 달라지지 않는다. 서버 이전은 다음 경우에만 의미가 있다.

- 이미지 분석을 서버로 전송해 처리
- WASM/네이티브 라이브러리를 서버에서 실행
- 대규모 파일을 큐 기반으로 처리

정적 편집기는 먼저 클라이언트 알고리즘과 렌더 구조를 최적화한다.

### 13.2 권장 최적화 순서

1. 드래그 중 고비용 재계산 금지
2. dirty flag와 단계별 캐시
3. 미리보기 해상도 분리
4. 경계 band만 처리
5. spatial hash로 충돌 후보 축소
6. Web Worker로 픽셀 분석 이동
7. OffscreenCanvas/ImageBitmap 사용
8. typed array 재사용, canvas pool
9. 작업 취소 token
10. 최종적으로 WASM 고려

### 13.3 preview와 final 품질

- interactive preview: 대지의 0.25~0.5배, contour 간소화 허용
- settled preview: 포인터 해제 후 중간 품질
- export: 요청 해상도 전체, 동일 알고리즘

사용자에게 `미리보기 품질`을 노출할 수 있지만 결과 정확성을 바꾸는 옵션과 속도 옵션을 혼동하지 않게 한다.

### 13.4 비동기 작업 취소

```ts
let generationToken = 0;
async function rebuild() {
  const token = ++generationToken;
  const result = await workerCompute(currentJob());
  if (token !== generationToken) return; // 오래된 결과 폐기
  applyResult(result);
}
```

---

## 14. 내보내기 설계

### 14.1 공통 파일명

```ts
function sanitizeFileBaseName(input: string, fallback: string): string {
  const base = input.trim().replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ');
  return base || fallback;
}
```

확장자는 내보내기 함수가 붙인다. 사용자가 확장자를 입력해도 중복되지 않게 제거한다.

### 14.2 레이어 선택

제작 모드에서는 그림, 화이트, 칼선, 확장 도안, 배경 등을 개별 렌더 노드로 유지하고 다운로드 포함 여부를 체크박스로 선택한다. PNG 저장도 선택한 레이어만 합성한다.

일반 이미지 메이커 모드는 제작용 칼선·화이트를 노출하지 않고 PNG/JPG만 제공한다.

### 14.3 SVG와 Illustrator 호환

브라우저에서 보이는 SVG가 Illustrator에서 반드시 열리는 것은 아니다. 비트맵을 외부 링크로 두지 말고 파일 안에 임베드하며, 최신 `href`와 구형 호환 `xlink:href`를 함께 제공한다.

```xml
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     version="1.1"
     width="50mm" height="50mm"
     viewBox="0 0 1500 1500">
  <image x="0" y="0" width="1500" height="1500"
         preserveAspectRatio="none"
         href="data:image/png;base64,..."
         xlink:href="data:image/png;base64,..." />
</svg>
```

- raw Blob URL이나 로컬 파일 경로를 SVG에 넣지 않는다.
- SVG 루트의 실제 mm 크기와 viewBox를 함께 기록한다.
- 칼선은 raster가 아니라 vector path로 유지한다.
- Illustrator에서 직접 열고 Links 패널에 누락 링크가 없는지 확인한다.

### 14.4 AI

네이티브 `.ai` 포맷을 직접 구현한다고 주장하지 않는다. PDF 1.4 호환 데이터를 `.ai`로 제공하는 경우 UI와 README에 명확히 고지한다. 실제 발주 전 별색, 오버프린트, CMYK, 업체 템플릿 확인이 필요하다.

### 14.5 PNG/JPG 배경

- PNG: 투명 배경/흰 배경 선택
- JPG: 투명을 지원하지 않으므로 선택한 배경 또는 흰색으로 합성
- export renderer에 배경 합성 옵션을 전달하고 미리보기 DOM 스타일에 의존하지 않는다.

---

## 15. 오류·경고·상태 표시

최소한 다음 상태를 UI에 표시한다.

- 처리 중, 취소됨, 완료
- 설정이 변경되어 `다시 만들기`가 필요한 상태
- 이미지가 대지 밖으로 나감
- 출력 크기 대비 PPI 부족
- 투명 배경이 없어 개체 분리가 불가능함
- 대지가 좁아 자동 간격을 충족하지 못함
- 저장 실패/복원 실패
- 내보내기 호환성 안내

오류가 생겨도 캔버스를 완전히 비우지 않는다. 결과가 아직 없으면 대지와 원본 프리뷰를 먼저 보여준다.

---

## 16. 테스트 전략

### 16.1 자동 테스트

- connected component: 0 mm에서 정확한 개수
- threshold graph: 경계값 전후 합치기
- 수동 merge: threshold보다 먼 개체 합치기
- coprime pattern shift: 작은 이미지 개수에서 수직 반복 없음
- deterministic random: 같은 seed → 같은 결과
- numeric field: 값/슬라이더 양방향 동기화
- migration: 이전 schema → 최신 state
- export name sanitization

### 16.2 골든 이미지 테스트

다음 샘플을 고정해 결과 PNG/mask를 비교한다.

1. 단색 영역만 있는 이미지
2. 완만한 그라데이션
3. 단색과 그라데이션이 맞닿은 이미지
4. 얇은 AA 외곽
5. 실제 넓은 반투명 면
6. 1~2 px 잡티와 긴 얇은 장식
7. 좁은 U자 홈
8. 대지 경계 가까운 이미지
9. 외부 타공과 이미지가 겹치는 경우
10. 밑받침과 의도적 투명 공간
11. 겹친 그룹 이미지의 외곽선
12. 홀수 개 이미지 패턴

정확히 같은 픽셀 비교가 어려운 곡선·AA는 허용 오차와 구조적 지표(연결 성분 수, 경계 거리, 투명 구멍 유지)를 함께 본다.

### 16.3 수동 호환성 매트릭스

- Desktop: Chrome, Edge, Safari, Firefox
- Mobile: Android Chrome, iOS Safari
- 입력: 마우스, 트랙패드, 터치
- 내보내기: 브라우저 재열기, Illustrator, PDF 뷰어
- 배포: GitHub Pages 캐시 갱신

### 16.4 모바일 필수 시나리오

- 한 손가락 이동
- 회전 핸들
- 크기 조절 핸들
- 빠른 두 번 탭 그룹 내부 편집
- 빈 영역 탭 선택 해제
- 페이지 스크롤과 캔버스 조작 충돌 없음
- 컬러피커가 화면 밖으로 나가지 않음

---

## 17. 반복된 실패 사례와 바로 적용할 해결책

| 증상 | 흔한 원인 | 우선 점검 |
|---|---|---|
| 계산이 느림 | 드래그마다 전체 재연산 | draft/applied, dirty flag, preview 해상도 |
| 칼선이 찌글찌글 | 1 px contour를 직선 연결 | mm 기반 smoothing + Bézier fit |
| 칼선 스파이크 | 작은 AA/잡티가 offset | 안정화 마스크, spur filter |
| 칼선이 대지에 붙음 | flood fill/closing이 대지 경계 사용 | padded mask, border-touch rejection |
| 원본과 확장 사이 투명 선 | 확장 coverage 부족 | 안쪽 2 px overlap 후 원본 재합성 |
| 단색이 그라데이션처럼 됨 | 주변 평균/보간 과다 | 연결된 저분산 region을 flat으로 고정 |
| 그라데이션이 단색화 | 단색 분류 전파 과다 | local gradient fit, 경계 근처만 flat 확정 |
| 귀/팔에 다른 색 침범 | 한 픽셀 최근접 샘플 | region label + 법선/접선 기반 확장 |
| AA를 반투명 면으로 오인 | `0<alpha<255`만 검사 | 면적·두께·침식 core 검사 |
| 모바일 이동 안 됨 | mouse event, touch scroll 충돌 | Pointer Events + pointer capture |
| 클릭 선택 안 되고 드래그만 됨 | drag threshold/좌표계 오류 | CSS px 거리와 캔버스 좌표 분리 |
| 그룹 내부에 외곽선 침범 | 개별 효과 후 합성 | union alpha 후 그룹 효과 |
| 랜덤 패턴이 계속 흔들림 | `Math.random()` 직접 호출 | 좌표+seed 결정적 PRNG |
| SVG가 Illustrator에서 링크 오류 | `href`만 사용/외부 URL | data URI 임베드 + `xlink:href` |
| 새로고침 후 깨짐 | schema migration 없음 | versioned persistence |
| 서버 배포해도 안 빨라짐 | 연산이 클라이언트에 남음 | 브라우저 알고리즘 최적화/worker |

---

## 18. 처음부터 넣어야 하는 코드 품질 규칙

- TypeScript 또는 JSDoc 타입을 사용한다.
- 모든 mm↔px 변환을 한 모듈에서 처리한다.
- `Math.random()`을 렌더 루프에서 직접 사용하지 않는다.
- Canvas 생성은 pool을 사용하고 필요 이상으로 새로 만들지 않는다.
- `getImageData()`를 pointermove에서 호출하지 않는다.
- 모든 비동기 렌더에 token/cancel 처리를 둔다.
- DOM ID를 대형 객체에 수동 등록하는 방식보다 컴포넌트/데이터 속성 기반 바인딩을 선호한다.
- `render()` 안에서 상태를 변경하지 않는다.
- 파생 캐시에는 입력 hash 또는 version을 기록한다.
- UI 상태와 문서 상태를 분리한다. 팝오버 열림 상태는 문서 저장에 넣지 않는다.
- 직렬화할 수 없는 `Image`, `Path2D`, Canvas는 derived cache로만 둔다.
- 모든 단위 입력에 clamp와 NaN fallback을 적용한다.
- 배포 시 asset query version 또는 content hash로 캐시를 갱신한다.

---

## 19. 권장 구현 순서

### Phase 0 · 계약 정의

- 모드, 파일 형식, 단위, 최대 이미지 크기
- 모바일 지원 범위
- 선택·그룹 동작 문서
- 내보내기 호환 대상
- 성능 예산

### Phase 1 · 기반

- DocumentState, schema version
- IndexedDB source store
- history command
- coordinate system
- numeric field, color picker
- render graph와 dirty flag

### Phase 2 · 캔버스 편집

- 업로드 + alpha trim
- 이동/회전/크기 조절
- 선택/다중 선택/marquee
- z-order, 정렬
- 그룹/내부 편집

### Phase 3 · 배경과 효과

- 단색/그라데이션/이미지/패턴
- deterministic pattern
- union-alpha 그룹 효과
- PNG/JPG 내보내기

### Phase 4 · 이미지 분석/제작 기능

- connected components
- cutline/offset/curve fit
- white layer
- bleed extension
- holes/base
- production SVG/AI

### Phase 5 · 안정화

- 골든 이미지
- mobile interaction
- Illustrator 호환
- 저장 migration
- 성능 프로파일링

기능이 많은 경우에도 Phase 1의 기반을 생략하지 않는다. 프로토타입 시간이 조금 늘어도 이후 수정 비용이 크게 줄어든다.

---

## 20. 완료 조건 체크리스트

### 공통 편집기

- [ ] 모바일과 데스크톱에서 이동·회전·크기 조절 가능
- [ ] 클릭, 드래그 선택, 다중 선택, 빈 곳 선택 해제 동작이 일관됨
- [ ] 그룹 효과가 union alpha 기준으로 적용됨
- [ ] 실행취소·재실행이 작업 단위로 동작함
- [ ] 새로고침 후 이미지와 주요 설정이 복원됨
- [ ] 숫자 입력 포커스 시 슬라이더가 나타나고 양방향 동기화됨
- [ ] 컬러피커가 Hue/alpha 방향을 시각적으로 보여줌
- [ ] 파일명 미입력 시 안전한 기본 이름으로 저장됨
- [ ] 랜덤 패턴이 같은 설정에서 흔들리지 않음
- [ ] 투명 배경 PNG와 흰 배경 PNG/JPG가 올바르게 저장됨

### 이미지·패턴

- [ ] 업로드 개체의 투명 여백이 제거됨
- [ ] 여러 이미지 패턴이 홀수 개에서도 균형 있게 섞임
- [ ] 크기/위치/회전 랜덤 범위가 동작함
- [ ] 분산과 밀도가 독립적으로 조절됨
- [ ] 최대 랜덤 크기 기준으로 화질 경고가 계산됨

### 제작 기능

- [ ] 0 mm에서 원본 알파 기준 개체가 정확히 분리됨
- [ ] threshold가 원본 성분 사이 거리로 작동함
- [ ] 멀리 떨어진 개체도 수동 merge 가능
- [ ] 작은 픽셀로 칼선/확장 스파이크가 생기지 않음
- [ ] 칼선이 대지 경계에 붙지 않음
- [ ] 곡선 path가 SVG에서도 유지됨
- [ ] 단색은 단색, 그라데이션은 그라데이션으로 확장됨
- [ ] 원본과 확장 사이 투명 실선이 없음
- [ ] 실제 반투명 면이 있을 때만 화이트 2종 옵션이 표시됨
- [ ] Illustrator에서 SVG가 누락 링크 없이 열림

---

## 21. 미래의 GPT/개발자에게 전달할 핵심 요약

이 프로젝트에서 가장 많은 재작업을 만든 원인은 개별 알고리즘 자체보다 **처음부터 일반화하지 않은 상태 모델과 상호작용 규칙**이었다. 다음을 기본값으로 삼는다.

- 편집 개체, 그룹, 선택, history, persistence를 먼저 설계한다.
- 원본 알파 기준으로 분석하고 파생 칼선을 기준 데이터로 쓰지 않는다.
- 단색/그라데이션/반투명/AA를 서로 다른 문제로 분류한다.
- 고비용 연산은 확정 버튼 또는 idle 시점에 수행한다.
- 모바일 Pointer Events, 결정적 랜덤, export 호환성은 “추가 기능”이 아니라 기반 기능이다.
- 사용자에게 보이는 옵션은 현재 데이터에 의미가 있을 때만 노출한다.
- 브라우저에서 보인다는 이유로 제작 파일이 정상이라고 판단하지 않는다.

이 원칙을 지키면 이미지 편집기뿐 아니라 카드 뉴스 메이커, 썸네일 편집기, 라벨 배치 도구, 패턴 생성기, 인쇄물 제작기, 스티커 시트 편집기 등에도 그대로 재사용할 수 있다.
