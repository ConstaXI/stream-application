import { ContainerModule, interfaces } from 'inversify';
import { ConsumerAdapter } from '../../presentation/adapters/adapt-consumer';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(ConsumerAdapter).toSelf();
});
