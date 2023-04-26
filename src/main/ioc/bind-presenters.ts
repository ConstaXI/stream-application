import { ContainerModule, interfaces } from 'inversify';
import GetAddressFromIpPresenter from '../../presentation/presenters/get-address-from-ip-presenter';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(GetAddressFromIpPresenter).toSelf();
});
