import { inject, injectable } from 'inversify';
import IpService from '../../business/protocols/services/get-address-from-ip-service';
import { Address } from '../../domain/entities/address';
import { BadGateway } from '../../domain/errors/bad-gateway';
import { Result, ok } from '../../domain/protocols/result';
import HttpClient, { httpClientSymbol } from '../protocols/http-client';
import { IpStackResponse, isIpStackError } from './ip-stack-response';
import { InvalidIp, invalidIp } from '../../domain/errors/ip-not-valid';

@injectable()
export default class IpStack implements IpService {
  constructor(
    @inject(httpClientSymbol)
    private readonly httpClient: HttpClient,
  ) {}

  async getAddress(
    ip: string,
  ): Promise<Result<Address, BadGateway | InvalidIp>> {
    const response = await this.httpClient.get<IpStackResponse>(
      process.env.IP_STACK_URL as string,
      ip,
      { access_key: process.env.ACCESS_KEY as string },
    );

    if (response.isFail()) {
      return response;
    }

    if (isIpStackError(response.value)) {
      return invalidIp();
    }

    const address = response.value;

    return ok({
      country: address.country_name,
      region: address.region_name,
      city: address.city,
      latitude: address.latitude,
      longitude: address.longitude,
    });
  }
}
