import { injectable } from 'inversify';
import HttpClient from '../../../src/infra/protocols/http-client';

@injectable()
export default class FakeHttpClient implements HttpClient {
  async get<T>(
    _url: string,
    _path?: string | undefined,
    _headers?: Record<string, string> | undefined,
  ): Promise<T> {
    return {} as T;
  }
}

export const fakeHttpClientGet = jest.spyOn(FakeHttpClient.prototype, 'get');
