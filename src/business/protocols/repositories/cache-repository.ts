export const cacheRepositorySymbol = Symbol.for('CacheRepository');

export default interface CacheRepository {
  get<T extends Record<string, unknown>>(key: string): Promise<T | undefined>;
  set<T extends Record<string, unknown>>(key: string, value: T): Promise<void>;
}
