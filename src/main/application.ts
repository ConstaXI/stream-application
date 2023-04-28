import { Consumer } from 'kafkajs';
import { RedisClientType } from 'redis';
import adaptConsumer from './adapters/adapt-consumer';
import container from './ioc/container';
import GetAddressFromIpPresenter from '../presentation/presenters/get-address-from-ip-presenter';
import load from './ioc/load';

export default class Application {
  constructor(
    private readonly consumer: Consumer,
    private readonly redisClient: RedisClientType,
  ) {}

  async start(): Promise<void> {
    load();
    await this.redisClient.connect();
    await this.consumer.subscribe({ topic: process.env.INPUT_TOPIC as string });
    await this.consumer.run({
      eachMessage: adaptConsumer(container.get(GetAddressFromIpPresenter)),
    });
    await this.consumer.connect();
  }

  async kill(): Promise<void> {
    await this.consumer.disconnect();
    await this.redisClient.disconnect();
  }
}
