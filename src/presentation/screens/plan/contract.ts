export interface PlanState {
  /** 말씀 위치 (선택, 예: 마 5:44) */
  verseRef: string;
  /** 언제 (상황) */
  when: string;
  /** 무엇을 (행동 하나) */
  what: string;
}

export type PlanIntent =
  | { type: 'changeVerseRef'; value: string }
  | { type: 'changeWhen'; value: string }
  | { type: 'changeWhat'; value: string };
// TODO(기능 구현 단계): { type: 'submit' } → 뷰모델에서 obedienceRepository.saveObedience

export const initialPlanState: PlanState = { verseRef: '', when: '', what: '' };
