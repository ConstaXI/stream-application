export const cacheRepositorySymbol = Symbol.for('CacheRepository');

export default interface SetInCacheCacheRepository {
  set<T extends Record<string, unknown>>(key: string, value: T): Promise<void>;
}
