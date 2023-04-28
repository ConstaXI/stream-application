import bindInteractors from './bind-interactors';
import bindServices from './bind-infra';
import container from './container';
import bindPresenters from './bind-presenters';

export default function load() {
  container.load(bindServices);
  container.load(bindInteractors);
  container.load(bindPresenters);
}
