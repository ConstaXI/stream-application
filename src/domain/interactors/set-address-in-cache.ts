import { Address, AddressWithTimestamp } from '../entities/address';
import { Client } from '../entities/client';
import { Interactor } from '../protocols/interactor';

export interface SetAddressInCache extends Interactor {
  execute(client: Client, address: Address): Promise<AddressWithTimestamp>;
}
