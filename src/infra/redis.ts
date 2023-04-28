import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL as string });

export default redisClient;
