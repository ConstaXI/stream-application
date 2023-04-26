import { inject, injectable } from 'inversify';
import { ClientWithAddress } from '../../domain/entities/client';
import { SetAddressInCache } from '../../domain/interactors/set-address-in-cache';
import { Result, ok } from '../../domain/protocols/result';
import CacheRepository, {
  cacheRepositorySymbol,
} from '../protocols/repositories/cache-repository';

@injectable()
export default class SetAddressInCacheInteractor implements SetAddressInCache {
  constructor(
    @inject(cacheRepositorySymbol)
    private readonly cacheRepository: CacheRepository,
  ) {}

  async execute(client: ClientWithAddress): Promise<Result<undefined, Error>> {
    const clientCopy = { ...client };

    clientCopy.address.timestamp = Date.now();

    await this.cacheRepository.set(client.id, clientCopy);

    return ok(undefined);
  }
}
