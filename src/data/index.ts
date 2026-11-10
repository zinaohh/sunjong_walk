import type { ObedienceRepository } from '@/domain/repository/ObedienceRepository';
import { LocalStorageObedienceRepository } from './local/LocalStorageObedienceRepository';

/**
 * 저장소를 만드는 유일한 곳.
 * 앱으로 옮길 때는 여기서 반환하는 구현만 바꾸면 된다.
 * (예: Capacitor Preferences / SQLite 구현)
 */
export const obedienceRepository: ObedienceRepository = new LocalStorageObedienceRepository(
  window.localStorage,
);
