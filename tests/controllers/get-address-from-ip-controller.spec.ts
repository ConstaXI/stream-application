import GetAddressFromCacheInteractor from '../../src/business/interactors/get-address-from-cache-interactor';
import GetAddressFromIpInteractor from '../../src/business/interactors/get-address-from-ip-interactor';
import SetAddressInCacheInteractor from '../../src/business/interactors/set-address-in-cache-interactor';
import { publisherSymbol } from '../../src/business/protocols/publisher/publisher';
import { cacheRepositorySymbol } from '../../src/business/protocols/repositories/delete-from-cache-repository';
import { ipServiceSymbol } from '../../src/business/protocols/services/ip-service';
import container from '../../src/main/ioc/container';
import GetAddressFromIpController, {
  ControllerInput,
} from '../../src/presentation/controllers/get-address-from-ip-controller';
import {
  makeFakeAddress,
  makeFakeAddressWithTimestamp,
} from '../fakes/entities/address';
import FakePublisher from '../fakes/publisher/fake-publisher';
import FakeCacheRepository, {
  fakeCacheRepositoryGet,
} from '../fakes/repositories/fake-cache-repository';
import { fakeHttpClientGet } from '../fakes/services/fake-http-client';
import FakeIpService, {
  fakeIpServiceGetAddress,
} from '../fakes/services/fake-ip-service';

describe('GetAddressFromCacheInteractor', () => {
  container.bind(cacheRepositorySymbol).to(FakeCacheRepository);
  container.bind(ipServiceSymbol).to(FakeIpService);

  container.bind(GetAddressFromCacheInteractor).toSelf();
  container.bind(SetAddressInCacheInteractor).toSelf();
  container.bind(GetAddressFromIpInteractor).toSelf();
  container.bind(publisherSymbol).to(FakePublisher);

  container.bind(GetAddressFromIpController).toSelf();

  const controller = container.get(GetAddressFromIpController);

  const defaultInput: ControllerInput = {
    ip: '192.168.0.1',
    clientId: '1',
    timestamp: 123456789,
  };

  afterAll(() => {
    container.unbindAll();
  });

  it('should return an address from cache', async () => {
    const addressInCache = makeFakeAddressWithTimestamp();

    fakeCacheRepositoryGet.mockResolvedValueOnce(addressInCache);

    const clientWithAddress = await controller.handle(defaultInput);

    expect(clientWithAddress.address).toBe(addressInCache);
    expect(fakeHttpClientGet).not.toHaveBeenCalled();
  });

  it('should ignore address from cache because of expired timestamp, and get from extern', async () => {
    const expiredAddressFromCache = makeFakeAddressWithTimestamp({
      timestamp: 0,
    });
    const addressFromExtern = makeFakeAddress();

    fakeCacheRepositoryGet.mockResolvedValueOnce(expiredAddressFromCache);
    fakeIpServiceGetAddress.mockResolvedValueOnce(addressFromExtern);

    const clientWithAddress = await controller.handle(defaultInput);

    const {
      address: { timestamp, ...restAddress },
    } = clientWithAddress;

    expect(fakeIpServiceGetAddress).toHaveBeenCalled();
    expect(addressFromExtern).toEqual(restAddress);
  });
});
