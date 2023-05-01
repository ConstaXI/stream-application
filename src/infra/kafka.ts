import { config } from 'dotenv';
import { Kafka, logLevel } from 'kafkajs';

config();

const kafkaClient = new Kafka({
  clientId: 'stream-application',
  brokers: [process.env.KAFKA_BROKER as string],
  logLevel: logLevel.ERROR,
});

export default kafkaClient;
