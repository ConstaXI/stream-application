import { ipServiceSymbol } from '../../src/business/protocols/services/ip-service';
import { BadGateway, badGateway } from '../../src/domain/errors/bad-gateway';
import { invalidIp } from '../../src/domain/errors/ip-not-valid';
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

  afterAll(() => {
    container.unbindAll();
  });

  it('should return an address', async () => {
    const fakeIpStackResponse = makeFakeSuccessIpStackResponse();

    fakeHttpClientGet.mockResolvedValueOnce(fakeIpStackResponse);

    const address = await service.getAddress(ip);

    const {
      city,
      latitude,
      longitude,
      country_name: countryName,
      region_name: regionName,
    } = fakeIpStackResponse;

    expect(address.city).toBe(city);
    expect(address.latitude).toBe(latitude);
    expect(address.longitude).toBe(longitude);
    expect(address.country).toBe(countryName);
    expect(address.region).toBe(regionName);
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

  it('should return error if id is well formed, but address was not found', async () => {
    const error = invalidIp();
    fakeHttpClientGet.mockRejectedValueOnce(error);

    await expect(service.getAddress(ip)).rejects.toThrow(error);
  });

  it('should return error if http client returns error', async () => {
    const fakeIpStackResponse = makeFakeErrorIpStackResponse();
    fakeHttpClientGet.mockResolvedValue(fakeIpStackResponse);

    await expect(service.getAddress(ip)).rejects.toThrow();
  });
});
