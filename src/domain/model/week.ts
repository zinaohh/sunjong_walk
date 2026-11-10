import type { LocalDate } from './obedience';

/** Date → YYYY-MM-DD (기기 현지 시간) */
export function toLocalDate(date: Date): LocalDate {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 해당 날짜가 속한 주의 월요일 */
export function weekStartOf(date: Date): LocalDate {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const daysFromMonday = (copy.getDay() + 6) % 7;
  copy.setDate(copy.getDate() - daysFromMonday);
  return toLocalDate(copy);
}

/** 주 시작일부터 7일 */
export function daysOfWeek(weekStart: LocalDate): LocalDate[] {
  const [y, m, d] = weekStart.split('-').map(Number);
  return Array.from({ length: 7 }, (_, i) => toLocalDate(new Date(y, m - 1, d + i)));
}
