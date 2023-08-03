import { inject, injectable } from 'inversify';
import { AddressWithTimestamp } from '../../domain/entities/address';
import { CacheAddress } from '../../domain/interactors/get-address-from-cache';
import CacheRepository, {
  cacheRepositorySymbol,
} from '../protocols/repositories/cache-repository';

@injectable()
export default class GetAddressFromCacheInteractor implements CacheAddress {
  constructor(
    @inject(cacheRepositorySymbol)
    private readonly cacheRepository: CacheRepository,
  ) {}

  async execute(clientId: string): Promise<AddressWithTimestamp | undefined> {
    const found = await this.cacheRepository.get<AddressWithTimestamp>(
      clientId,
    );

    if (!found) {
      return undefined;
    }

    const isValid = found.timestamp + 30 * 60_000 > Date.now();

    if (!isValid) {
      await this.cacheRepository.delete(clientId);
      return undefined;
    }

    return found;
  }
}
