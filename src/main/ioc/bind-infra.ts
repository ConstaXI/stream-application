import { ContainerModule, interfaces } from 'inversify';
import { ipServiceSymbol } from '../../business/protocols/services/ip-service';
import IpStack from '../../infra/services/ip-stack';
import GotHttpClient from '../../infra/services/got-http-client';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(ipServiceSymbol).toConstantValue(new IpStack(new GotHttpClient()));
});
