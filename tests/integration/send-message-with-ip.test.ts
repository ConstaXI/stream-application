/* eslint-disable unicorn/no-null */
// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import { Partitioners } from 'kafkajs';
import kafkaClient from '../../src/infra/kafka';
import redisClient from '../../src/infra/redis';

describe('Send message with IP', () => {
  jest.useFakeTimers();

  it('Should cache address in redis', async () => {
    const producer = kafkaClient.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
    const input = {
      clientId: '1',
      ip: '191.185.208.65',
    };
    const buffer = Buffer.from(JSON.stringify(input));
    await producer.connect();
    await producer.send({
      topic: 'get-address-from-ip',
      messages: [{ value: buffer }],
    });
    await producer.disconnect();
    const stringified = redisClient.get(input.clientId);
    expect(stringified).not.toBe(null);
  });
});
