import { injectable } from 'inversify';
import { BadGateway } from '../../../src/domain/errors/bad-gateway';
import { Result, ok } from '../../../src/domain/protocols/result';
import HttpClient from '../../../src/infra/protocols/http-client';

@injectable()
export default class FakeHttpClient implements HttpClient {
  async get<T>(
    _url: string,
    _path?: string | undefined,
    _headers?: Record<string, string> | undefined,
  ): Promise<Result<T, BadGateway>> {
    return ok({} as T);
  }
}

export const fakeHttpClientGet = jest.spyOn(FakeHttpClient.prototype, 'get');
