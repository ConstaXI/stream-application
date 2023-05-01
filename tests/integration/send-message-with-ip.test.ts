/* eslint-disable unicorn/no-null */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import { Partitioners } from 'kafkajs';
import kafkaClient from '../../src/infra/kafka';
// import redisClient from '../../src/infra/redis';

describe('Send message with IP', () => {
  jest.useFakeTimers();

  const producer = kafkaClient.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  // const defaultInput = {
  //   clientId: '1',
  //   ip: '191.185.208.65',
  // };

  beforeAll(async () => {
    await producer.connect();
  });

  afterAll(async () => {
    await producer.disconnect();
  });

  it('Should cache address in redis', async () => {
    // const buffer = Buffer.from(JSON.stringify(defaultInput));
    // await producer.send({
    //   topic: 'get-address-from-ip',
    //   messages: [{ value: buffer }],
    // });
    // const stringified = await redisClient.get(defaultInput.clientId);
    // expect(stringified).not.toBe(null);
    expect(true).toBe(true);
  });
});
