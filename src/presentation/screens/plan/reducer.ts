import type { PlanIntent, PlanState } from './contract';

export function planReducer(state: PlanState, intent: PlanIntent): PlanState {
  switch (intent.type) {
    case 'changeVerseRef':
      return { ...state, verseRef: intent.value };
    case 'changeWhen':
      return { ...state, when: intent.value };
    case 'changeWhat':
      return { ...state, what: intent.value };
  }
}
