# 순종워크 (sunjong_walk)

한 주에 순종 하나를 정하고, 매일 저녁 기록하고, 주말에 돌아보는 신앙 루틴 기록 웹앱.

- 화면 4개: 이번 주(홈) / 정하기 / 오늘 체크 / 주간 돌아보기
- 기록은 기기 안 브라우저 저장소(localStorage)에만 저장 - 서버·DB 없음
- 점수·연속 기록 숫자·순위·배지 없음, AI 사용 안 함, 말씀 추천 안 함
- 성경 본문은 저장·표시하지 않고 위치(예: 마 5:44)만 기록

## 기술 스택

| 영역      | 사용                                                    |
| --------- | ------------------------------------------------------- |
| UI        | React 19 + TypeScript                                   |
| 빌드      | Vite (정적 파일 `dist/` 로 빌드)                        |
| 라우팅    | React Router                                            |
| 상태      | 화면별 `useReducer` (전역 상태 라이브러리 없음)         |
| 린트/포맷 | ESLint (typescript-eslint, react-hooks) + Prettier      |
| 배포      | Vercel (정적 사이트)                                    |
| 홈 화면   | `manifest.webmanifest` + iOS 메타 태그 (홈 화면에 추가) |

## 시작하기

필요한 것: Node.js 20.19 이상 (권장 22, `.nvmrc` 참고)

```bash
# 1. 설치
npm install

# 2. 개발 서버 (http://localhost:5173)
npm run dev
#    같은 와이파이의 폰에서 보려면 터미널에 나오는 Network 주소로 접속

# 3. 빌드 (결과물: dist/)
npm run build

# 4. 빌드 결과 미리보기
npm run preview
```

그 밖의 명령

| 명령                   | 하는 일                |
| ---------------------- | ---------------------- |
| `npm run lint`         | ESLint 검사            |
| `npm run format`       | Prettier로 코드 정리   |
| `npm run format:check` | 정리가 필요한지 검사만 |
| `npm run typecheck`    | 타입 검사              |

## 배포 (Vercel)

설정은 `vercel.json`에 있습니다 (빌드 명령 `npm run build`, 출력 폴더 `dist`, 모든 주소를 `index.html`로 보내는 규칙).

**방법 A - GitHub 연결 (권장)**

1. GitHub에 이 레포를 올린다.
2. [vercel.com](https://vercel.com) → Add New → Project → 이 레포 선택 → Deploy.
3. 이후 `main`에 push하면 자동 배포, PR마다 미리보기 주소가 생긴다.

**방법 B - 터미널에서 직접**

```bash
npx vercel        # 미리보기 배포
npx vercel --prod # 실제 배포
```

## 폴더 구조

레이어는 3개입니다. 화살표 방향으로만 가져다 씁니다 (`presentation → data → domain`).

```
src/
├─ domain/                      # 앱의 규칙. React·저장 방식을 모른다
│  ├─ model/                    # Obedience(이번 주 순종), DailyCheck(매일 기록), 날짜·주 계산
│  └─ repository/               # ObedienceRepository 인터페이스 (저장소 약속)
├─ data/                        # 저장소 구현
│  ├─ index.ts                  # ★ 저장소를 만드는 유일한 곳
│  └─ local/                    # localStorage 구현
└─ presentation/                # 화면
   ├─ app/                      # 라우팅, 공통 레이아웃, 스타일
   ├─ components/               # 공통 컴포넌트 (하단 탭, 화면 제목)
   └─ screens/
      ├─ home/                  # 이번 주
      ├─ plan/                  # 정하기
      ├─ check/                 # 오늘 체크
      └─ review/                # 주간 돌아보기
```

레이어 규칙은 ESLint가 검사합니다 (`domain`에서 React나 `data`를 가져오면 오류).

### 화면 하나의 구성 (MVI)

각 화면 폴더에는 파일 4개가 있습니다.

| 파일                  | 역할                                                                     |
| --------------------- | ------------------------------------------------------------------------ |
| `contract.ts`         | **State**(화면에 보이는 모든 값)와 **Intent**(화면에서 일어나는 일) 정의 |
| `reducer.ts`          | `(State, Intent) → 새 State` 순수 함수. 저장·통신 같은 부수 효과 없음    |
| `use〇〇ViewModel.ts` | 리듀서를 붙이고, 저장소 호출 같은 부수 효과를 처리하는 훅                |
| `〇〇Screen.tsx`      | State를 그리고, 사용자 동작을 Intent로 보내기만 한다                     |

흐름: 화면에서 동작 → `dispatch(Intent)` → 리듀서가 새 State 계산 → 화면 다시 그림

## 앱으로 옮길 때 (예정)

- 이 프로젝트는 정적 파일(`dist/`)로만 빌드되므로 Capacitor 등으로 그대로 감쌀 수 있습니다.
- 저장소 교체: `src/data/index.ts`에서 반환하는 구현만 바꾸면 됩니다. 화면 코드는 그대로.
- 알림: 이번 세팅에는 없음. 앱으로 옮길 때 기기 예약 알림(로컬 알림)으로 추가 예정.

## 개발 가이드

기능을 추가하는 순서, 브랜치·커밋 규칙은 [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)를 보세요.

## 현재 상태

기본 세팅만 되어 있습니다. 4개 화면은 껍데기이고, 저장(정하기·기록하기) 기능은 아직 연결하지 않았습니다.
각 화면의 `contract.ts`에 다음 단계 `TODO`가 적혀 있습니다.
