import type { CheckResult } from '@/domain/model/obedience';

export interface CheckState {
  result: CheckResult | null;
  /** 한 줄 메모 */
  memo: string;
}

export type CheckIntent =
  { type: 'selectResult'; result: CheckResult } | { type: 'changeMemo'; value: string };
// TODO(기능 구현 단계): { type: 'submit' } → 뷰모델에서 obedienceRepository.saveCheck

export const initialCheckState: CheckState = { result: null, memo: '' };
