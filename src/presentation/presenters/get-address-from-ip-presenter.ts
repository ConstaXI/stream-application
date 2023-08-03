import { inject, injectable } from 'inversify';
import GetAddressFromIpInteractor from '../../business/interactors/get-address-from-ip-interactor';
import GetAddressFromCacheInteractor from '../../business/interactors/get-address-from-cache-interactor';
import { Client, ClientWithAddress } from '../../domain/entities/client';
import SetAddressInCacheInteractor from '../../business/interactors/set-address-in-cache-interactor';
import Presenter from '../protocols/presenter';
import Publisher, {
  publisherSymbol,
} from '../../business/protocols/publisher/publisher';

export type PresenterInput = {
  ip: string;
  clientId: string;
  timestamp: number;
};

@injectable()
export default class GetAddressFromIpPresenter implements Presenter {
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

  async handle({ clientId, ip }: PresenterInput): Promise<ClientWithAddress> {
    const addressFromCache = await this.getAddressFromCacheInteractor.execute(
      clientId,
    );

    if (addressFromCache) {
      await this.publisher.send(JSON.stringify(addressFromCache));
      return { id: clientId, ip, address: addressFromCache };
    }

    const externAddress = await this.getAddressFromIpInteractor.execute(ip);

    const client: Client = {
      id: clientId,
      ip,
    };

    const addressWithTimestamp = await this.setAddressInCacheInteractor.execute(
      client,
      externAddress,
    );

    const clientWithAddress: ClientWithAddress = {
      ...client,
      address: addressWithTimestamp,
    };

    await this.publisher.send(JSON.stringify(clientWithAddress));

    return clientWithAddress;
  }
}
