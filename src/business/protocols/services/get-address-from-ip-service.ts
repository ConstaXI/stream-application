import { Address } from '../../../domain/entities/address';

export const getAddressFromIpServiceSymbol = Symbol.for(
  'GetAddressFromIpService',
);

export default interface GetAddressFromIpService {
  get(ip: string): Promise<Address>;
}
