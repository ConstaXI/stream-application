import { createClient } from '@redis/client';

const redisClient = createClient({ url: process.env.REDIS_URL as string });

export default redisClient;
