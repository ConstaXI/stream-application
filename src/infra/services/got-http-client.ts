import got from 'got';
import { injectable } from 'inversify';
import HttpClient from '../protocols/http-client';
import { Result, ok } from '../../domain/protocols/result';
import { BadGateway, badGateway } from '../../domain/errors/bad-gateway';

@injectable()
export default class GotHttpClient implements HttpClient {
  private readonly got = got;

  async get<T>(
    url: string,
    path?: string,
    searchParameters?: Record<string, string>,
  ): Promise<Result<T, BadGateway>> {
    const baseUrl = url.endsWith('/') ? url : `${url}/`;
    const pathUrl = path?.startsWith('/') ? path : `/${path}`;

    const response = await this.got.get<T>(`${baseUrl}${pathUrl}`, {
      responseType: 'json',
      searchParams: searchParameters,
    });

    const { statusCode, body } = response;

    if (statusCode !== 200) {
      return badGateway();
    }

    return ok(body);
  }
}
