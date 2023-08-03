import { Address } from '../../../domain/entities/address';

export const ipServiceSymbol = Symbol.for('IpService');

export default interface IpService {
  getAddress(ip: string): Promise<Address>;
}
