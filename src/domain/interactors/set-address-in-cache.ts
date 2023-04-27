import { ClientWithAddress } from '../entities/client';
import { Interactor } from '../protocols/interactor';
import { Result } from '../protocols/result';

export interface SetAddressInCache extends Interactor<undefined, Error> {
  execute(client: ClientWithAddress): Promise<Result<undefined, Error>>;
}
