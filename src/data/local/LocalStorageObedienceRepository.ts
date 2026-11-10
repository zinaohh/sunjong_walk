import type { DailyCheck, LocalDate, Obedience } from '@/domain/model/obedience';
import type { ObedienceRepository } from '@/domain/repository/ObedienceRepository';

/** 저장 형식이 바뀌면 버전을 올리고 마이그레이션을 추가한다. */
const KEY_PREFIX = 'sunjong_walk:v1';
const OBEDIENCES_KEY = `${KEY_PREFIX}:obediences`;
const CHECKS_KEY = `${KEY_PREFIX}:checks`;

/** 기기 안 브라우저 저장소(localStorage) 구현. 서버로 아무것도 보내지 않는다. */
export class LocalStorageObedienceRepository implements ObedienceRepository {
  private readonly storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  async getObedienceOfWeek(weekStart: LocalDate): Promise<Obedience | null> {
    return this.readList<Obedience>(OBEDIENCES_KEY).find((o) => o.weekStart === weekStart) ?? null;
  }

  async saveObedience(obedience: Obedience): Promise<void> {
    const rest = this.readList<Obedience>(OBEDIENCES_KEY).filter((o) => o.id !== obedience.id);
    this.writeList(OBEDIENCES_KEY, [...rest, obedience]);
  }

  async getChecks(obedienceId: string): Promise<DailyCheck[]> {
    return this.readList<DailyCheck>(CHECKS_KEY)
      .filter((c) => c.obedienceId === obedienceId)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async getCheck(obedienceId: string, date: LocalDate): Promise<DailyCheck | null> {
    return (
      this.readList<DailyCheck>(CHECKS_KEY).find(
        (c) => c.obedienceId === obedienceId && c.date === date,
      ) ?? null
    );
  }

  /** 같은 날 다시 기록하면 덮어쓴다 (하루에 하나). */
  async saveCheck(check: DailyCheck): Promise<void> {
    const rest = this.readList<DailyCheck>(CHECKS_KEY).filter(
      (c) => !(c.obedienceId === check.obedienceId && c.date === check.date),
    );
    this.writeList(CHECKS_KEY, [...rest, check]);
  }

  private readList<T>(key: string): T[] {
    try {
      const raw = this.storage.getItem(key);
      return raw ? (JSON.parse(raw) as T[]) : [];
    } catch {
      // 사생활 보호 모드 등에서 저장소를 못 읽으면 빈 목록으로 본다.
      return [];
    }
  }

  private writeList<T>(key: string, list: T[]): void {
    this.storage.setItem(key, JSON.stringify(list));
  }
}
