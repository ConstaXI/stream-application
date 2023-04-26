import { inject, injectable } from 'inversify';
import { Address } from '../../domain/entities/address';
import { GetAddressFromIp } from '../../domain/interactors/get-address-from-ip';
import { Result } from '../../domain/protocols/result';
import IpService, {
  ipServiceSymbol,
} from '../protocols/services/get-address-from-ip-service';
import { BadGateway } from '../../domain/errors/bad-gateway';
import { InvalidIp, invalidIp } from '../../domain/errors/ip-not-valid';
import { AddressNotFound } from '../../domain/errors/address-not-found';

@injectable()
export default class GetAddressFromIpInteractor implements GetAddressFromIp {
  constructor(
    @inject(ipServiceSymbol)
    private readonly ipService: IpService,
  ) {}

  async execute(
    ip: string,
  ): Promise<Result<Address, BadGateway | AddressNotFound | InvalidIp>> {
    const verifyIp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

    if (!verifyIp.test(ip)) {
      return invalidIp();
    }

    return this.ipService.getAddress(ip);
  }
}
