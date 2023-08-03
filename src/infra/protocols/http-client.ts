export const httpClientSymbol = Symbol.for('HttpClient');

export default interface HttpClient {
  get<T>(
    url: string,
    path?: string,
    headers?: Record<string, string>,
  ): Promise<T>;
}
