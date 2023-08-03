import { injectable } from 'inversify';
import SetInCacheCacheRepository from '../../../src/business/protocols/repositories/set-in-cache-repository';
import DeleteFromCacheRepository from '../../../src/business/protocols/repositories/delete-from-cache-repository';
import GetFromCacheRepository from '../../../src/business/protocols/repositories/get-from-cache-repository';

@injectable()
export default class FakeCacheRepository
  implements
    SetInCacheCacheRepository,
    DeleteFromCacheRepository,
    GetFromCacheRepository
{
  async delete(_key: string): Promise<void> {}

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

export const fakeCacheRepositoryDelete = jest.spyOn(
  FakeCacheRepository.prototype,
  'delete',
);
