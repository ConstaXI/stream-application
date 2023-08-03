import SetAddressInCacheInteractor from '../../src/business/interactors/set-address-in-cache-interactor';
import { cacheRepositorySymbol } from '../../src/business/protocols/repositories/delete-from-cache-repository';
import container from '../../src/main/ioc/container';
import { makeFakeAddress } from '../fakes/entities/address';
import { makeFakeClient } from '../fakes/entities/client';
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

  it('should set timestamp before setting address into cache', async () => {
    const client = makeFakeClient();
    const address = makeFakeAddress();

    await interactor.execute(client, address);

    expect(fakeCacheRepositorySet).toHaveBeenCalledWith(client.id, {
      ...address,
      timestamp: expect.any(Number),
    });
  });
});
