import { inject, injectable } from 'inversify';
import GetAddressFromIpInteractor from '../../business/interactors/get-address-from-ip-interactor';
import GetAddressFromCacheInteractor from '../../business/interactors/get-address-from-cache-interactor';
import { ClientWithAddress } from '../../domain/entities/client';
import { Result, ok } from '../../domain/protocols/result';
import SetAddressInCacheInteractor from '../../business/interactors/set-address-in-cache-interactor';

export type PresenterInput = {
  ip: string;
  id: string;
  timestamp: number;
};

@injectable()
export default class GetAddressFromIpPresenter {
  constructor(
    @inject(GetAddressFromIpInteractor)
    private readonly getAddressFromIpInteractor: GetAddressFromIpInteractor,
    @inject(GetAddressFromCacheInteractor)
    private readonly getAddressFromCacheInteractor: GetAddressFromCacheInteractor,
    @inject(SetAddressInCacheInteractor)
    private readonly setAddressInCacheInteractor: SetAddressInCacheInteractor,
  ) {}

  async handle(
    input: PresenterInput,
  ): Promise<Result<ClientWithAddress, Error>> {
    const addressFromCache = await this.getAddressFromCacheInteractor.execute(
      input.id,
    );

    if (addressFromCache.isFail()) {
      return addressFromCache;
    }

    if (addressFromCache.value) {
      return ok({ ...input, address: addressFromCache.value });
    }

    const externAddress = await this.getAddressFromIpInteractor.execute(
      input.ip,
    );

    if (externAddress.isFail()) {
      return externAddress;
    }

    const client: ClientWithAddress = {
      ...input,
      address: externAddress.value,
    };

    await this.setAddressInCacheInteractor.execute(client);

    return ok(client);
  }
}
