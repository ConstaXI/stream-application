import 'reflect-metadata';
import './ioc/load';
import * as dotenv from 'dotenv';
import redisClient from '../infra/redis';
import { kafkaConsumer } from '../infra/kafka';
import configConsumer from './kafka/config-consumer';

dotenv.config();

try {
  await redisClient.connect();
  await configConsumer(kafkaConsumer);
} catch (error) {
  console.error(error);
}
