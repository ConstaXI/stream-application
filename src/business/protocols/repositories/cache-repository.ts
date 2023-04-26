export const cacheRepositorySymbol = Symbol.for('CacheRepository');

export default interface CacheRepository {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
}
