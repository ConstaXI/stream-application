import { AddressWithTimestamp } from '../entities/address';
import { Interactor } from '../protocols/interactor';

export interface CacheAddress
  extends Interactor {
  execute(
    clientId: string,
  ): Promise<AddressWithTimestamp | undefined>;
}
