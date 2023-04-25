import { inject, injectable } from 'inversify';
import { Address } from '../../domain/entities/address';
import { GetAddressFromIp } from '../../domain/interactors/get-address-from-ip-interactor';
import HttpError from '../../domain/protocols/http-error';
import { Result, ok } from '../../domain/protocols/result';
import GetAddressFromIpService, {
  getAddressFromIpServiceSymbol,
} from '../protocols/services/get-address-from-ip-service';

@injectable()
export default class GetAddressFromIpInteractor implements GetAddressFromIp {
  constructor(
    @inject(getAddressFromIpServiceSymbol)
    private readonly getAddressFromIpService: GetAddressFromIpService,
  ) {}

  async execute(ip: string): Promise<Result<Address, HttpError>> {
    const address = await this.getAddressFromIpService.get(ip);

    return ok(address);
  }
}
