import bindInteractors from './bind-interactors';
import bindServices from './bind-infra';
import container from './container';

container.load(bindServices);
container.load(bindInteractors);
