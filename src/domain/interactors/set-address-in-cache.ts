import { ClientWithAddress } from '../entities/client';
import { Interactor } from '../protocols/interactor';

export interface SetAddressInCache extends Interactor {
  execute(client: ClientWithAddress): Promise<void>;
}
