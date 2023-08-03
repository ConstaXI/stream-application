import { injectable } from 'inversify';
import CacheRepository from '../../business/protocols/repositories/cache-repository';
import redisClient from '../redis';

@injectable()
export default class RedisCacheRepository implements CacheRepository {
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
