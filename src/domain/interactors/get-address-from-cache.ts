import { AddressWithTimestamp } from '../entities/address';
import { Interactor } from '../protocols/interactor';
import { Result } from '../protocols/result';

export interface CacheAddress
  extends Interactor<AddressWithTimestamp | undefined, Error> {
  execute(
    clientId: string,
  ): Promise<Result<AddressWithTimestamp | undefined, Error>>;
}
