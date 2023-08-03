import GetAddressFromCacheInteractor from '../../src/business/interactors/get-address-from-cache-interactor';
import { cacheRepositorySymbol } from '../../src/business/protocols/repositories/cache-repository';
import container from '../../src/main/ioc/container';
import makeFakeAddress from '../fakes/entities/address';
import FakeCacheRepository, {
  fakeCacheRepositoryDelete,
  fakeCacheRepositoryGet,
} from '../fakes/repositories/fake-cache-repository';

describe('GetAddressFromCacheInteractor', () => {
  container.bind(cacheRepositorySymbol).to(FakeCacheRepository);
  container.bind(GetAddressFromCacheInteractor).toSelf();

  const interactor = container.get(GetAddressFromCacheInteractor);

  const id = 'any_id';

  afterAll(() => {
    container.unbindAll();
  });

  it('should call cache repository with correct values', async () => {
    await interactor.execute(id);

    expect(fakeCacheRepositoryGet).toHaveBeenCalledWith(id);
  });

  it('should return undefined if repository doesnt find address', async () => {
    fakeCacheRepositoryGet.mockResolvedValueOnce(undefined);

    const imUndefined = await interactor.execute(id);

    expect(imUndefined).toBe(undefined);
  });

  it('should return undefined if repository finds address, but timestamp is beyond 30 minutes', async () => {
    fakeCacheRepositoryGet.mockResolvedValueOnce(
      makeFakeAddress({ timestamp: 0 }),
    );

    const imUndefined = await interactor.execute(id);

    expect(imUndefined).toBe(undefined);
  });

  it('should return cached address', async () => {
    const address = makeFakeAddress({ timestamp: Date.now() });

    fakeCacheRepositoryGet.mockResolvedValueOnce(address);

    const addressFromCache = await interactor.execute(id);

    expect(addressFromCache).toEqual(address);
  });

  it('should delete expired addresses', async () => {
    const expired = makeFakeAddress({ timestamp: 0 });

    fakeCacheRepositoryGet.mockResolvedValueOnce(expired);

    await interactor.execute(id);

    expect(fakeCacheRepositoryDelete).toHaveBeenCalledWith(id);
  });
});
