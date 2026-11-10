import { useEffect, useReducer } from 'react';
import { obedienceRepository } from '@/data';
import { weekStartOf } from '@/domain/model/week';
import { initialHomeState } from './contract';
import { homeReducer } from './reducer';

export function useHomeViewModel() {
  const [state, dispatch] = useReducer(homeReducer, weekStartOf(new Date()), initialHomeState);

  useEffect(() => {
    let cancelled = false;
    obedienceRepository
      .getObedienceOfWeek(state.weekStart)
      .then((obedience) => !cancelled && dispatch({ type: 'loaded', obedience }))
      .catch(() => !cancelled && dispatch({ type: 'failed' }));
    return () => {
      cancelled = true;
    };
  }, [state.weekStart]);

  return { state, dispatch };
}
