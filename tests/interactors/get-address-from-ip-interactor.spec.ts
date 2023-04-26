import GetAddressFromIpInteractor from '../../src/business/interactors/get-address-from-ip-interactor';
import { ipServiceSymbol } from '../../src/business/protocols/services/get-address-from-ip-service';
import { InvalidIp } from '../../src/domain/errors/ip-not-valid';
import { Fail } from '../../src/domain/protocols/result';
import container from '../../src/main/ioc/container';
import FakeIpService, {
  fakeIpServiceGetAddress,
} from '../fakes/services/fake-ip-service';

describe('GetAddressFromIpInteractor', () => {
  container.bind(ipServiceSymbol).to(FakeIpService);
  container.bind(GetAddressFromIpInteractor).toSelf();

  const interactor = container.get(GetAddressFromIpInteractor);

  it('should call get address from ip service with correct values', async () => {
    const ip = '192.168.0.1';

    await interactor.execute(ip);

    expect(fakeIpServiceGetAddress).toHaveBeenCalledWith(ip);
  });

  it('should return error if ip is invalid', async () => {
    const ip = 'im not valid, lol';

    const error = (await interactor.execute(ip)) as Fail<InvalidIp>;

    expect(error.isFail()).toBe(true);
    expect(error.value).toBeInstanceOf(InvalidIp);
  });
});
