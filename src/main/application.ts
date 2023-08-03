import { RedisClientType } from 'redis';
import { Consumer } from 'kafkajs';
import load from './ioc/load';
import adaptConsumer from './adapters/adapt-consumer';
import container from './ioc/container';
import GetAddressFromIpPresenter from '../presentation/presenters/get-address-from-ip-presenter';

/**
 * @deprecated
 * @class Application
 * @description
 * Deprecated because it was used for facilitating integration testing.
 * This class is responsible for starting and stopping the application.
 * as well it's connections with external services.
 * @param {Consumer} consumer - Kafka consumer
 * @param {RedisClientType} redisClient - Redis client
 * @method listen - Starts the application
 * @method kill - Stops the application
 * @method bind - Binds the application to the dependencies
 * @method startConnections - Starts the connections with the external services
 *
 */
export default class Application {
  constructor(
    private readonly consumer: Consumer,
    private readonly redisClient: RedisClientType,
  ) {}

  private bind(): void {
    load();
  }

  private async startConnections(): Promise<void> {
    await this.redisClient.connect();
    await this.consumer.connect();
  }

  async listen(): Promise<void> {
    this.bind();
    await this.startConnections();
    await this.consumer.subscribe({
      topic: process.env.INPUT_TOPIC,
      fromBeginning: true,
    });
    await this.consumer.run({
      eachMessage: adaptConsumer(container.get(GetAddressFromIpPresenter)),
    });
  }

  async kill(): Promise<void> {
    await this.consumer.disconnect();
    await this.redisClient.disconnect();
  }
}
