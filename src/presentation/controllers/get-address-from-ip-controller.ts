import { inject, injectable } from 'inversify';
import GetAddressFromIpInteractor from '../../business/interactors/get-address-from-ip-interactor';
import GetAddressFromCacheInteractor from '../../business/interactors/get-address-from-cache-interactor';
import { Client, ClientWithAddress } from '../../domain/entities/client';
import SetAddressInCacheInteractor from '../../business/interactors/set-address-in-cache-interactor';
import Controller from '../protocols/controller';
import { GetAddressFromIp } from '../../domain/interactors/get-address-from-ip';
import { GetAddressFromCache } from '../../domain/interactors/get-address-from-cache';
import { SetAddressInCache } from '../../domain/interactors/set-address-in-cache';

export type ControllerInput = {
  ip: string;
  clientId: string;
  timestamp: number;
};

@injectable()
export default class GetAddressFromIpController implements Controller {
  constructor(
    @inject(GetAddressFromIpInteractor)
    private readonly getAddressFromIpInteractor: GetAddressFromIp,
    @inject(GetAddressFromCacheInteractor)
    private readonly getAddressFromCacheInteractor: GetAddressFromCache,
    @inject(SetAddressInCacheInteractor)
    private readonly setAddressInCacheInteractor: SetAddressInCache,
  ) {}

  async handle({ clientId, ip }: ControllerInput): Promise<ClientWithAddress> {
    const addressFromCache = await this.getAddressFromCacheInteractor.execute(
      clientId,
    );

    if (addressFromCache) {
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

    return clientWithAddress;
  }
}
