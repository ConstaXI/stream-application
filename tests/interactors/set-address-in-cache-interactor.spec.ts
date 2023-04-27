import SetAddressInCacheInteractor from '../../src/business/interactors/set-address-in-cache-interactor';
import { cacheRepositorySymbol } from '../../src/business/protocols/repositories/cache-repository';
import container from '../../src/main/ioc/container';
import { makeFakeClientWithAddress } from '../fakes/entities/client';
import FakeCacheRepository, {
  fakeCacheRepositorySet,
} from '../fakes/repositories/fake-cache-repository';

describe('SetAddressInCacheInteractor', () => {
  container.bind(cacheRepositorySymbol).to(FakeCacheRepository);
  container.bind(SetAddressInCacheInteractor).toSelf();

  const interactor = container.get(SetAddressInCacheInteractor);

  afterAll(() => {
    container.unbindAll();
  });

  it('should set timestamp before seting address into cache', async () => {
    const client = makeFakeClientWithAddress();

    await interactor.execute(client);

    const { id, address } = client;

    expect(fakeCacheRepositorySet).toHaveBeenCalledWith(id, {
      ...address,
      timestamp: expect.any(Number),
    });
  });
});
