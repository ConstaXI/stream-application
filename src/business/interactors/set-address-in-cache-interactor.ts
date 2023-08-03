import { inject, injectable } from 'inversify';
import { ClientWithAddress } from '../../domain/entities/client';
import { SetAddressInCache } from '../../domain/interactors/set-address-in-cache';
import CacheRepository, {
  cacheRepositorySymbol,
} from '../protocols/repositories/cache-repository';
import { AddressWithTimestamp } from '../../domain/entities/address';

@injectable()
export default class SetAddressInCacheInteractor implements SetAddressInCache {
  constructor(
    @inject(cacheRepositorySymbol)
    private readonly cacheRepository: CacheRepository,
  ) {}

  async execute(client: ClientWithAddress): Promise<void> {
    const addressWithTimestamp: AddressWithTimestamp = {
      ...client.address,
      timestamp: Date.now(),
    };

    await this.cacheRepository.set(client.id, addressWithTimestamp);
  }
}
