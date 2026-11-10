import { useReducer } from 'react';
import { daysOfWeek, weekStartOf } from '@/domain/model/week';
import { initialReviewState } from './contract';
import { reviewReducer } from './reducer';

function thisWeek() {
  const weekStart = weekStartOf(new Date());
  return { weekStart, days: daysOfWeek(weekStart) };
}

export function useReviewViewModel() {
  const [state, dispatch] = useReducer(reviewReducer, thisWeek(), initialReviewState);
  return { state, dispatch };
}
