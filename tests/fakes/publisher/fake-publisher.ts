import { injectable } from 'inversify';
import Publisher from '../../../src/business/protocols/publisher/publisher';

@injectable()
export default class FakePublisher implements Publisher {
  async send(_message: string): Promise<void> {}
}

export const fakePublisherSend = jest.spyOn(FakePublisher.prototype, 'send');
