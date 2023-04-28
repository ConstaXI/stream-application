import { Kafka } from 'kafkajs';

const kafkaClient = new Kafka({
  clientId: 'stream-application',
  brokers: ['localhost:9092'],
});

export default kafkaClient;
