import { EachMessageHandler } from 'kafkajs';
import Presenter from '../../presentation/protocols/presenter';

export default function adaptConsumer(
  presenter: Presenter,
): EachMessageHandler {
  return async ({ message }) => {
    const { value } = message;

    if (!value) {
      throw new Error('Message without value');
    }

    const input = JSON.parse(value.toString());

    const result = await presenter.handle(input);

    console.info(result);
  };
}
