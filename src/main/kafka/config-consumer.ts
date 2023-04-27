import { Consumer } from 'kafkajs';
import adaptConsumer from '../adapters/adapt-consumer';
import container from '../ioc/container';
import GetAddressFromIpPresenter from '../../presentation/presenters/get-address-from-ip-presenter';

export default async function configConsumer(
  consumer: Consumer,
): Promise<Consumer> {
  await consumer.subscribe({ topic: 'ip', fromBeginning: true });
  await consumer.run({
    eachMessage: adaptConsumer(container.get(GetAddressFromIpPresenter)),
  });
  await consumer.connect();
  return consumer;
}
