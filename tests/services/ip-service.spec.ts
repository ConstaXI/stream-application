import { ipServiceSymbol } from '../../src/business/protocols/services/get-address-from-ip-service';
import { Address } from '../../src/domain/entities/address';
import { InvalidIp } from '../../src/domain/errors/ip-not-valid';
import { Fail, Ok, ok, fail } from '../../src/domain/protocols/result';
import { httpClientSymbol } from '../../src/infra/protocols/http-client';
import IpStack from '../../src/infra/services/ip-stack';
import container from '../../src/main/ioc/container';
import {
  makeFakeErrorIpStackResponse,
  makeFakeSuccessIpStackResponse,
} from '../fakes/responses/fake-ip-stack-response';
import FakeHttpClient, {
  fakeHttpClientGet,
} from '../fakes/services/fake-http-client';

describe('IpService', () => {
  container.bind(httpClientSymbol).to(FakeHttpClient);
  container.bind(ipServiceSymbol).to(IpStack);

  process.env.ACCESS_KEY = 'any_access_key';
  process.env.IP_STACK_URL = 'any_ip_stack_url';

  const service = container.get<IpStack>(ipServiceSymbol);

  const ip = '192.168.0.1';

  it('should return an address', async () => {
    const fakeIpStackResponse = makeFakeSuccessIpStackResponse();

    fakeHttpClientGet.mockResolvedValueOnce(ok(fakeIpStackResponse));

    const address = (await service.getAddress(ip)) as Ok<Address>;

    const {
      city,
      latitude,
      longitude,
      country_name: countryName,
      region_name: regionName,
    } = fakeIpStackResponse;

    expect(address.isOk()).toBe(true);
    expect(address.value.city).toBe(city);
    expect(address.value.latitude).toBe(latitude);
    expect(address.value.longitude).toBe(longitude);
    expect(address.value.country).toBe(countryName);
    expect(address.value.region).toBe(regionName);
  });

  it('should call http client with correct values', async () => {
    await service.getAddress(ip);

    expect(fakeHttpClientGet).toHaveBeenCalledWith(
      process.env.IP_STACK_URL,
      ip,
      {
        access_key: process.env.ACCESS_KEY,
      },
    );
  });

  it('should return error if id is wellformed, but address was not found', async () => {
    fakeHttpClientGet.mockResolvedValueOnce(ok(makeFakeErrorIpStackResponse()));

    const failed = (await service.getAddress(ip)) as Fail<InvalidIp>;

    expect(failed.isFail()).toBe(true);
    expect(failed.value).toBeInstanceOf(InvalidIp);
  });
});
