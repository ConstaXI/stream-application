import { injectable } from 'inversify';
import IpService from '../../../src/business/protocols/services/get-address-from-ip-service';
import { Address } from '../../../src/domain/entities/address';
import makeFakeAddress from '../entities/address';
import { Result, ok } from '../../../src/domain/protocols/result';
import { BadGateway } from '../../../src/domain/errors/bad-gateway';

@injectable()
export default class FakeIpService implements IpService {
  async getAddress(_ip: string): Promise<Result<Address, BadGateway>> {
    return ok(makeFakeAddress());
  }
}

export const fakeIpServiceGetAddress = jest.spyOn(
  FakeIpService.prototype,
  'getAddress',
);
