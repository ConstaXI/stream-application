// import { GenericContainer, KafkaContainer } from 'testcontainers';
import * as dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

// const kafkaContainer = new KafkaContainer();
// const redisContainer = new GenericContainer('redis:latest');

// const startedKafkaContainer = await kafkaContainer
//   .withExposedPorts(9092)
//   .start();
// const startedRedisContainer = await redisContainer
//   .withExposedPorts(6379)
//   .start();

// process.env.KAFKA_BROKER = `${startedKafkaContainer.getHost()}:${
//   startedKafkaContainer.getMappedPort(9092) - 1
// }`;
// process.env.REDIS_URL = `redis://${startedRedisContainer.getHost()}:${startedRedisContainer.getMappedPort(
//   6379,
// )}`;

// const redisClient = await import('./src/infra/redis');
// const kafkaClient = await import('./src/infra/kafka');
// const importedApplication = await import('./src/main/application');
// const Application = importedApplication.default;

// const admin = kafkaClient.default.admin();
// await admin.connect();
// await admin.createTopics({
//   topics: [{ topic: process.env.INPUT_TOPIC as string }],
// });

// const application = new Application(
//   kafkaClient.default.consumer({ groupId: 'test-ip-listener' }),
//   redisClient.default as any,
// );

// beforeAll(async () => {
//   await application.listen();
// });

// afterAll(async () => {
//   await application.kill();
//   await startedKafkaContainer.stop();
//   await startedRedisContainer.stop();
// });
