import { useReducer } from 'react';
import { initialCheckState } from './contract';
import { checkReducer } from './reducer';

export function useCheckViewModel() {
  const [state, dispatch] = useReducer(checkReducer, initialCheckState);
  return { state, dispatch };
}
