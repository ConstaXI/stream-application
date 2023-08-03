import GetAddressFromIpInteractor from '../../src/business/interactors/get-address-from-ip-interactor';
import { ipServiceSymbol } from '../../src/business/protocols/services/ip-service';
import { invalidIp } from '../../src/domain/errors/ip-not-valid';
import container from '../../src/main/ioc/container';
import FakeIpService, {
  fakeIpServiceGetAddress,
} from '../fakes/services/fake-ip-service';

describe('GetAddressFromIpInteractor', () => {
  container.bind(ipServiceSymbol).to(FakeIpService);
  container.bind(GetAddressFromIpInteractor).toSelf();

  const interactor = container.get(GetAddressFromIpInteractor);

  afterAll(() => {
    container.unbindAll();
  });

  it('should call get address from ip service with correct values', async () => {
    const ip = '192.168.0.1';

    await interactor.execute(ip);

    expect(fakeIpServiceGetAddress).toHaveBeenCalledWith(ip);
  });

  it('should throw error if ip is invalid', async () => {
    const ip = 'im not valid, lol';

    const invalidIpError = invalidIp();

    await expect(interactor.execute(ip)).rejects.toThrow(invalidIpError);
  });
});
