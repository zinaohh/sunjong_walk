import type { DailyCheck, LocalDate, Obedience } from '../model/obedience';

/**
 * 기록 저장소 인터페이스.
 * 화면(presentation)은 이 인터페이스만 알고, 실제 저장 방식(data)은 모른다.
 * 지금은 브라우저 저장소 구현을 쓰고, 앱으로 옮길 때 구현만 바꾼다.
 * 모든 메서드를 Promise로 둔 이유: 앱의 저장소(기기 파일·SQLite 등)는 대부분 비동기라서.
 */
export interface ObedienceRepository {
  getObedienceOfWeek(weekStart: LocalDate): Promise<Obedience | null>;
  saveObedience(obedience: Obedience): Promise<void>;

  getChecks(obedienceId: string): Promise<DailyCheck[]>;
  getCheck(obedienceId: string, date: LocalDate): Promise<DailyCheck | null>;
  saveCheck(check: DailyCheck): Promise<void>;
}
