import type { LocalDate, Obedience } from '@/domain/model/obedience';

export interface HomeState {
  status: 'loading' | 'ready' | 'error';
  weekStart: LocalDate;
  obedience: Obedience | null;
}

export type HomeIntent =
  { type: 'load' } | { type: 'loaded'; obedience: Obedience | null } | { type: 'failed' };

export function initialHomeState(weekStart: LocalDate): HomeState {
  return { status: 'loading', weekStart, obedience: null };
}
