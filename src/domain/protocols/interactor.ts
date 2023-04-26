import { Result } from './result';

export interface Interactor<Return, Errors> {
  execute(..._arguments: unknown[]): Promise<Result<Return, Errors>>;
}
