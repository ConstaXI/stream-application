import { injectable } from 'inversify';
import IpService from '../../../src/business/protocols/services/ip-service';
import { Address } from '../../../src/domain/entities/address';
import { makeFakeAddress } from '../entities/address';

@injectable()
export default class FakeIpService implements IpService {
  async getAddress(_ip: string): Promise<Address> {
    return makeFakeAddress();
  }
}

export const fakeIpServiceGetAddress = jest.spyOn(
  FakeIpService.prototype,
  'getAddress',
);
