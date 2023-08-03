import 'reflect-metadata';
import * as dotenv from 'dotenv';
import kafkaClient from '../infra/kafka';
import redisClient from '../infra/redis';
import container from './ioc/container';
import GetAddressFromIpController from '../presentation/controllers/get-address-from-ip-controller';
import load from './ioc/load';
import { ConsumerAdapter } from '../presentation/adapters/adapt-consumer';

dotenv.config();
load();

try {
  await redisClient.connect();
  const consumer = kafkaClient.consumer({ groupId: 'ip-listener' });
  await consumer.subscribe({
    topic: process.env.INPUT_TOPIC as string,
    fromBeginning: true,
  });
  const adapter = container.get(ConsumerAdapter);
  await consumer.run({
    eachMessage: adapter.adapt(container.get(GetAddressFromIpController)),
  });
  await consumer.connect();
  console.info('Ready to accept messages');
} catch (error) {
  console.error(error);
}
