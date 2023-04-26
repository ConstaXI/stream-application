import { Address } from '../../../domain/entities/address';
import { BadGateway } from '../../../domain/errors/bad-gateway';
import { Result } from '../../../domain/protocols/result';

export const ipServiceSymbol = Symbol.for('IpService');

export default interface IpService {
  getAddress(ip: string): Promise<Result<Address, BadGateway>>;
}
