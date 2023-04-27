import { Result } from '../../domain/protocols/result';

export default interface Presenter<O, F> {
  handle(...arguments_: unknown[]): Promise<Result<O, F>>;
}
