import 'reflect-metadata';
import * as dotenv from 'dotenv';
import Application from './application';
import kafkaClient from '../infra/kafka';
import redisClient from '../infra/redis';

dotenv.config();

try {
  const application = new Application(
    kafkaClient.consumer({ groupId: 'stream-application-ips' }),
    redisClient as any,
  );

  await application.start();
} catch (error) {
  console.error(error);
}
