import HttpError from './http-error';
import { Result } from './result';

export interface Interactor<Return, Error extends HttpError = HttpError> {
  execute(..._arguments: unknown[]): Promise<Result<Return, Error>>;
}
