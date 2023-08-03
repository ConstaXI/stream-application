import { inject, injectable } from 'inversify';
import { Client } from '../../domain/entities/client';
import { SetAddressInCache } from '../../domain/interactors/set-address-in-cache';
import CacheRepository, {
  cacheRepositorySymbol,
} from '../protocols/repositories/cache-repository';
import { Address, AddressWithTimestamp } from '../../domain/entities/address';

@injectable()
export default class SetAddressInCacheInteractor implements SetAddressInCache {
  constructor(
    @inject(cacheRepositorySymbol)
    private readonly cacheRepository: CacheRepository,
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
