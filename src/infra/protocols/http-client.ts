import { BadGateway } from '../../domain/errors/bad-gateway';
import { Result } from '../../domain/protocols/result';

export const httpClientSymbol = Symbol.for('HttpClient');

export default interface HttpClient {
  get<T>(
    url: string,
    path?: string,
    headers?: Record<string, string>,
  ): Promise<Result<T, BadGateway>>;
}
