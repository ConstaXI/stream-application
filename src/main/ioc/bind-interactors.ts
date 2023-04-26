import { ContainerModule, interfaces } from 'inversify';
import GetAddressFromIpInteractor from '../../business/interactors/get-address-from-ip-interactor';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(GetAddressFromIpInteractor).toSelf();
});
