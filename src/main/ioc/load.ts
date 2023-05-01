import bindInteractors from './bind-interactors';
import container from './container';
import bindPresenters from './bind-presenters';
import bindInfra from './bind-infra';

export default function load() {
  container.load(bindInfra);
  container.load(bindInteractors);
  container.load(bindPresenters);
}
