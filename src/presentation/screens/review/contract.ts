import type { DailyCheck, LocalDate } from '@/domain/model/obedience';

export interface ReviewState {
  weekStart: LocalDate;
  /** 이번 주 7일 */
  days: LocalDate[];
  /** 기록한 날의 체크 (점수·연속 기록 계산은 하지 않는다) */
  checks: DailyCheck[];
}

export type ReviewIntent = { type: 'checksLoaded'; checks: DailyCheck[] };
// TODO(기능 구현 단계): 뷰모델에서 obedienceRepository.getChecks → checksLoaded

export function initialReviewState(input: {
  weekStart: LocalDate;
  days: LocalDate[];
}): ReviewState {
  return { ...input, checks: [] };
}
