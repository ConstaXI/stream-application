export const cacheRepositorySymbol = Symbol.for('CacheRepository');

export default interface DeleteFromCacheRepository {
  delete(key: string): Promise<void>;
}
