import { inject, injectable } from 'inversify';
import IpService from '../../business/protocols/services/ip-service';
import { Address } from '../../domain/entities/address';
import HttpClient, { httpClientSymbol } from '../protocols/http-client';
import { IpStackResponse, isIpStackError } from './ip-stack-response';
import { invalidIp } from '../../business/errors/ip-not-valid';

@injectable()
export default class IpStack implements IpService {
  constructor(
    @inject(httpClientSymbol)
    private readonly httpClient: HttpClient,
  ) {}

  async getAddress(ip: string): Promise<Address> {
    const response = await this.httpClient.get<IpStackResponse>(
      process.env.IP_STACK_URL as string,
      ip,
      { access_key: process.env.ACCESS_KEY as string },
    );

    if (isIpStackError(response)) {
      throw invalidIp();
    }

    return {
      country: response.country_name,
      region: response.region_name,
      city: response.city,
      latitude: response.latitude,
      longitude: response.longitude,
    };
  }
}
