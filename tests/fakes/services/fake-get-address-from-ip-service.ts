import { injectable } from 'inversify';
import GetAddressFromIpService from '../../../src/business/protocols/services/get-address-from-ip-service';
import { Address } from '../../../src/domain/entities/address';
import makeFakeAddress from '../entities/address';

@injectable()
export default class FakeGetAddressFromIpService
  implements GetAddressFromIpService
{
  async get(ip: string): Promise<Address> {
    return makeFakeAddress();
  }
}

export const fakeGetAddressFromIpServiceGet = jest.spyOn(
  FakeGetAddressFromIpService.prototype,
  'get',
);
