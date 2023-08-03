import { injectable } from 'inversify';
import redisClient from '../redis';
import SetInCacheCacheRepository from '../../business/protocols/repositories/set-in-cache-repository';
import GetFromCacheRepository from '../../business/protocols/repositories/get-from-cache-repository';
import DeleteFromCacheRepository from '../../business/protocols/repositories/delete-from-cache-repository';

@injectable()
export default class RedisCacheRepository
  implements
    SetInCacheCacheRepository,
    GetFromCacheRepository,
    DeleteFromCacheRepository
{
  private readonly client = redisClient;

  async get<T extends Record<string, unknown>>(
    key: string,
  ): Promise<T | undefined> {
    const stringyfied = await this.client.get(key);

    if (!stringyfied) return undefined;

    return JSON.parse(stringyfied);
  }

  async set<T>(key: string, value: T): Promise<void> {
    const stringyfied = JSON.stringify(value);

    await this.client.set(key, stringyfied);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
