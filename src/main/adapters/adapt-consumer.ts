import { EachMessageHandler } from 'kafkajs';
import Presenter from '../../presentation/protocols/presenter';

export default function adaptConsumer(
  presenter: Presenter<unknown, Error>,
): EachMessageHandler {
  return async ({ message }) => {
    const { value } = message;

    if (!value) {
      console.log('No value');
      return;
    }

    const stringyfied = value.toString();

    const input = JSON.parse(stringyfied);

    const response = await presenter.handle(input);

    console.log(response.value);
  };
}
