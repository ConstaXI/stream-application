import { inject, injectable } from 'inversify';
import { Address } from '../../domain/entities/address';
import { GetAddressFromIp } from '../../domain/interactors/get-address-from-ip';
import IpService, { ipServiceSymbol } from '../protocols/services/ip-service';
import { invalidIp } from '../errors/ip-not-valid';

@injectable()
export default class GetAddressFromIpInteractor implements GetAddressFromIp {
  constructor(
    @inject(ipServiceSymbol)
    private readonly ipService: IpService,
  ) {}

  async execute(ip: string): Promise<Address> {
    const verifyIp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

    if (!verifyIp.test(ip)) {
      throw invalidIp();
    }

    return this.ipService.getAddress(ip);
  }
}
