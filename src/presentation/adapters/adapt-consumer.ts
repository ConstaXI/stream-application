import { EachMessageHandler } from 'kafkajs';
import Controller from '../protocols/controller';
import { emptyMessage } from '../../infra/errors/empty-message';
import { inject, injectable } from 'inversify';
import Publisher, {
  publisherSymbol,
} from '../../business/protocols/publisher/publisher';

@injectable()
export class ConsumerAdapter {
  constructor(
    @inject(publisherSymbol)
    private readonly publiser: Publisher,
  ) {}

  adapt(controller: Controller): EachMessageHandler {
    return async ({ message }) => {
      try {
        const { value } = message;

        if (!value) {
          throw emptyMessage();
        }

        const input = JSON.parse(value.toString());

        const result = await controller.handle(input);

        await this.publiser.send(JSON.stringify(result));
      } catch (error) {
        if (error instanceof Error) {
          await this.publiser.send(JSON.stringify(error.message));
        }

        await this.publiser.send('internal error');
      }
    };
  }
}
