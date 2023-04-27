import { Kafka } from 'kafkajs';

const kafkaClient = new Kafka({
  clientId: 'stream-application',
  brokers: ['localhost:9092'],
});

export const kafkaConsumer = kafkaClient.consumer({
  groupId: 'stream-application-ips',
});

export const kafkaProducer = kafkaClient.producer();
