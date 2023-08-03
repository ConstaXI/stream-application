export const cacheRepositorySymbol = Symbol.for('CacheRepository');

export default interface GetFromCacheRepository {
  get<T extends Record<string, unknown>>(key: string): Promise<T | undefined>;
}
