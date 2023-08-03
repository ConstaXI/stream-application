import { inject, injectable } from 'inversify';
import { Client } from '../../domain/entities/client';
import { SetAddressInCache } from '../../domain/interactors/set-address-in-cache';
import { cacheRepositorySymbol } from '../protocols/repositories/delete-from-cache-repository';
import { Address, AddressWithTimestamp } from '../../domain/entities/address';
import SetInCacheCacheRepository from '../protocols/repositories/set-in-cache-repository';

@injectable()
export default class SetAddressInCacheInteractor implements SetAddressInCache {
  constructor(
    @inject(cacheRepositorySymbol)
    private readonly cacheRepository: SetInCacheCacheRepository,
  ) {}

  async execute(
    client: Client,
    address: Address,
  ): Promise<AddressWithTimestamp> {
    const addressWithTimestamp: AddressWithTimestamp = {
      ...address,
      timestamp: Date.now(),
    };

    await this.cacheRepository.set(client.id, addressWithTimestamp);

    return addressWithTimestamp;
  }
}
