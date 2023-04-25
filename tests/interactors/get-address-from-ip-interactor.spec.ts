import GetAddressFromIpInteractor from '../../src/business/interactors/get-address-from-ip';
import { getAddressFromIpServiceSymbol } from '../../src/business/protocols/services/get-address-from-ip-service';
import container from '../../src/main/ioc/container';
import FakeGetAddressFromIpService, {
  fakeGetAddressFromIpServiceGet,
} from '../fakes/services/fake-get-address-from-ip-service';

describe('GetAddressFromIpInteractor', () => {
  container.bind(getAddressFromIpServiceSymbol).to(FakeGetAddressFromIpService);
  container.bind(GetAddressFromIpInteractor).toSelf();

  const interactor = container.get(GetAddressFromIpInteractor);

  it('should call get address from ip service with correct values', async () => {
    const ip = 'dummy_ip';

    await interactor.execute(ip);

    expect(fakeGetAddressFromIpServiceGet).toHaveBeenCalledWith(ip);
  });
});
