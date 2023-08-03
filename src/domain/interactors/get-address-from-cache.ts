import { AddressWithTimestamp } from '../entities/address';
import { Interactor } from '../protocols/interactor';

export interface GetAddressFromCache extends Interactor {
  execute(clientId: string): Promise<AddressWithTimestamp | undefined>;
}
