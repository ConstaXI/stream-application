import { inject, injectable } from 'inversify';
import { AddressWithTimestamp } from '../../domain/entities/address';
import { CacheAddress } from '../../domain/interactors/get-address-from-cache';
import { Result, ok } from '../../domain/protocols/result';
import CacheRepository, {
  cacheRepositorySymbol,
} from '../protocols/repositories/cache-repository';

@injectable()
export default class GetAddressFromCacheInteractor implements CacheAddress {
  constructor(
    @inject(cacheRepositorySymbol)
    private readonly cacheRepository: CacheRepository,
  ) {}

  async execute(
    clientId: string,
  ): Promise<Result<AddressWithTimestamp | undefined, Error>> {
    const found = await this.cacheRepository.get<AddressWithTimestamp>(
      clientId,
    );

    const isValid = found ? found.timestamp + 30 * 60_000 > Date.now() : false;

    if (!found || !isValid) {
      return ok(undefined);
    }

    return ok(found);
  }
}
