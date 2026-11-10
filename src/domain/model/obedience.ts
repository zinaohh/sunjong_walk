/** 날짜 문자열 (YYYY-MM-DD, 기기 현지 시간 기준) */
export type LocalDate = string;

/**
 * 한 주에 하나 정하는 순종.
 * 성경 본문은 저장하지 않고 위치(예: "마 5:44")만 기록한다.
 */
export interface Obedience {
  id: string;
  /** 그 주의 시작일(월요일) */
  weekStart: LocalDate;
  /** 말씀 위치 (선택) */
  verseRef?: string;
  /** 언제 (상황) */
  when: string;
  /** 무엇을 (행동 하나) */
  what: string;
  createdAt: string;
}

/** 오늘 체크의 세 가지 결과 */
export const CHECK_RESULTS = ['lived', 'missed', 'noMoment'] as const;
export type CheckResult = (typeof CHECK_RESULTS)[number];

export const CHECK_RESULT_LABEL: Record<CheckResult, string> = {
  lived: '살아냈어요',
  missed: '기회가 있었는데 못 했어요',
  noMoment: '오늘은 그런 순간이 없었어요',
};

/**
 * 매일 저녁 기록.
 * 점수·연속 기록·순위·배지 필드는 두지 않는다. "그날 기록했다"는 사실만 남긴다.
 */
export interface DailyCheck {
  obedienceId: string;
  date: LocalDate;
  result: CheckResult;
  /** 한 줄 메모 (선택) */
  memo?: string;
  updatedAt: string;
}
