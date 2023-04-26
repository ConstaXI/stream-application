import { Address } from '../entities/address';
import { BadGateway } from '../errors/bad-gateway';
import { InvalidIp } from '../errors/ip-not-valid';
import { Interactor } from '../protocols/interactor';
import { Result } from '../protocols/result';

export interface GetAddressFromIp extends Interactor<Address, Error> {
  execute(ip: string): Promise<Result<Address, BadGateway | InvalidIp>>;
}
