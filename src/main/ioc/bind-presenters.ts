import { ContainerModule, interfaces } from 'inversify';
import GetAddressFromIpController from '../../presentation/controllers/get-address-from-ip-controller';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(GetAddressFromIpController).toSelf();
});
