import { Client } from '../entities/client';
import { Interactor } from '../protocols/interactor';
import { Result } from '../protocols/result';

export interface SetAddressInCache extends Interactor<undefined, Error> {
  execute(client: Client): Promise<Result<undefined, Error>>;
}
