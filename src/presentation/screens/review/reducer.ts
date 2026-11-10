import type { ReviewIntent, ReviewState } from './contract';

export function reviewReducer(state: ReviewState, intent: ReviewIntent): ReviewState {
  switch (intent.type) {
    case 'checksLoaded':
      return { ...state, checks: intent.checks };
  }
}
