import { useReducer } from 'react';
import { initialPlanState } from './contract';
import { planReducer } from './reducer';

export function usePlanViewModel() {
  const [state, dispatch] = useReducer(planReducer, initialPlanState);
  return { state, dispatch };
}
