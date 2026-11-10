import type { CheckIntent, CheckState } from './contract';

export function checkReducer(state: CheckState, intent: CheckIntent): CheckState {
  switch (intent.type) {
    case 'selectResult':
      return { ...state, result: intent.result };
    case 'changeMemo':
      return { ...state, memo: intent.value };
  }
}
