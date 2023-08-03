import { Address } from '../entities/address';
import { Interactor } from '../protocols/interactor';

export interface GetAddressFromIp extends Interactor {
  execute(ip: string): Promise<Address>;
}
