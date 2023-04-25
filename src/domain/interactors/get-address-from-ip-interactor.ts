import { Address } from '../entities/address';
import HttpError from '../protocols/http-error';
import { Interactor } from '../protocols/interactor';
import { Result } from '../protocols/result';

export interface GetAddressFromIp extends Interactor<Address> {
  execute(ip: string): Promise<Result<Address, HttpError>>;
}
