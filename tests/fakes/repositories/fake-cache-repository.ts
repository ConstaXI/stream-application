import { injectable } from 'inversify';
import CacheRepository from '../../../src/business/protocols/repositories/cache-repository';

@injectable()
export default class FakeCacheRepository implements CacheRepository {
  async get<T>(_key: string): Promise<T | undefined> {
    return {} as T;
  }

  async set<T>(_key: string, _value: T): Promise<void> {
    return undefined;
  }
}

export const fakeCacheRepositoryGet = jest.spyOn(
  FakeCacheRepository.prototype,
  'get',
);

export const fakeCacheRepositorySet = jest.spyOn(
  FakeCacheRepository.prototype,
  'set',
);
