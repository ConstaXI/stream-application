import bindInteractors from './bind-interactors';
import container from './container';
import bindPresenters from './bind-presenters';
import bindInfra from './bind-infra';
import bindAdapters from './bind-adapters';

export default function load() {
  container.load(bindInfra);
  container.load(bindInteractors);
  container.load(bindPresenters);
  container.load(bindAdapters);
}
