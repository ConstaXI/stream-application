import { inject, injectable } from 'inversify';
import { AddressWithTimestamp } from '../../domain/entities/address';
import { GetAddressFromCache } from '../../domain/interactors/get-address-from-cache';
import DeleteFromCacheRepository, {
  cacheRepositorySymbol,
} from '../protocols/repositories/delete-from-cache-repository';
import GetFromCacheRepository from '../protocols/repositories/get-from-cache-repository';

@injectable()
export default class GetAddressFromCacheInteractor
  implements GetAddressFromCache
{
  constructor(
    @inject(cacheRepositorySymbol)
    private readonly cacheRepository: GetFromCacheRepository &
      DeleteFromCacheRepository,
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
