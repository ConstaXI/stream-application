import { ContainerModule, interfaces } from 'inversify';
import GetAddressFromIpInteractor from '../../business/interactors/get-address-from-ip-interactor';
import GetAddressFromCacheInteractor from '../../business/interactors/get-address-from-cache-interactor';
import SetAddressInCacheInteractor from '../../business/interactors/set-address-in-cache-interactor';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(GetAddressFromIpInteractor).toSelf();
  bind(GetAddressFromCacheInteractor).toSelf();
  bind(SetAddressInCacheInteractor).toSelf();
});
