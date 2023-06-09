import { inject, injectable } from 'inversify';
import GetAddressFromIpInteractor from '../../business/interactors/get-address-from-ip-interactor';
import GetAddressFromCacheInteractor from '../../business/interactors/get-address-from-cache-interactor';
import { ClientWithAddress } from '../../domain/entities/client';
import SetAddressInCacheInteractor from '../../business/interactors/set-address-in-cache-interactor';
import Presenter from '../protocols/presenter';
import Publisher, {
  publisherSymbol,
} from '../../business/protocols/publisher/publisher';
import { Result, ok } from '../../domain/protocols/result';

export type PresenterInput = {
  ip: string;
  clientId: string;
  timestamp: number;
};

@injectable()
export default class GetAddressFromIpPresenter
  implements Presenter<ClientWithAddress, Error>
{
  constructor(
    @inject(GetAddressFromIpInteractor)
    private readonly getAddressFromIpInteractor: GetAddressFromIpInteractor,
    @inject(GetAddressFromCacheInteractor)
    private readonly getAddressFromCacheInteractor: GetAddressFromCacheInteractor,
    @inject(SetAddressInCacheInteractor)
    private readonly setAddressInCacheInteractor: SetAddressInCacheInteractor,
    @inject(publisherSymbol)
    private readonly publisher: Publisher,
  ) {}

  async handle({
    clientId,
    ip,
  }: PresenterInput): Promise<Result<ClientWithAddress, Error>> {
    const addressFromCache = await this.getAddressFromCacheInteractor.execute(
      clientId,
    );

    if (addressFromCache.isFail()) {
      await this.publisher.fail(addressFromCache.value);
      return addressFromCache;
    }

    if (addressFromCache.value) {
      await this.publisher.send(JSON.stringify(addressFromCache.value));
      return ok({ id: clientId, ip, address: addressFromCache.value });
    }

    const externAddress = await this.getAddressFromIpInteractor.execute(ip);

    if (externAddress.isFail()) {
      await this.publisher.fail(externAddress.value);
      return externAddress;
    }

    const client: ClientWithAddress = {
      id: clientId,
      ip,
      address: externAddress.value,
    };

    await this.setAddressInCacheInteractor.execute(client);

    await this.publisher.send(JSON.stringify(client));

    return ok(client);
  }
}
