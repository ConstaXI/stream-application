export const publisherSymbol = Symbol('Publisher');

export default interface Publisher {
  send(message: string): Promise<void>;
  fail(error: Error): Promise<void>;
}
