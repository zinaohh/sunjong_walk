import type { HomeIntent, HomeState } from './contract';

/** 순수 함수: (지금 상태, 의도) → 다음 상태. 저장소 호출 같은 부수 효과는 뷰모델 훅에서. */
export function homeReducer(state: HomeState, intent: HomeIntent): HomeState {
  switch (intent.type) {
    case 'loaded':
      return { ...state, status: 'ready', obedience: intent.obedience };
    case 'failed':
      return { ...state, status: 'error' };
  }
}
