import 'reflect-metadata';
import * as dotenv from 'dotenv';
import kafkaClient from '../infra/kafka';
import redisClient from '../infra/redis';
import adaptConsumer from './adapters/adapt-consumer';
import container from './ioc/container';
import GetAddressFromIpPresenter from '../presentation/presenters/get-address-from-ip-presenter';
import load from './ioc/load';

dotenv.config();
load();

try {
  await redisClient.connect();
  const consumer = kafkaClient.consumer({ groupId: 'ip-listener' });
  await consumer.subscribe({
    topic: process.env.INPUT_TOPIC as string,
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: adaptConsumer(container.get(GetAddressFromIpPresenter)),
  });
  await consumer.connect();
  console.info('Ready to accept messages');
} catch (error) {
  console.error(error);
}
