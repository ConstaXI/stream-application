import { injectable } from 'inversify';
import { Producer as KafkaProducer } from 'kafkajs';
import Publisher from '../../business/protocols/publisher/publisher';

@injectable()
export default class KafkaPublisher implements Publisher {
  constructor(
    private readonly topic: string,
    private readonly producer: KafkaProducer,
  ) {}

  async send(message: string): Promise<void> {
    const buffer = Buffer.from(message);

    await this.producer.connect();
    await this.producer.send({
      topic: this.topic,
      messages: [{ value: buffer }],
    });
    await this.producer.disconnect();
  }

  async fail(error: Error): Promise<void> {
    const buffer = Buffer.from(error.message);

    await this.producer.connect();
    await this.producer.send({
      topic: this.topic,
      messages: [{ value: buffer }],
    });
    await this.producer.disconnect();
  }
}
