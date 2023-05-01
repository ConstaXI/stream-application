declare global {
  namespace NodeJS {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    interface ProcessEnv {
      ACCESS_KEY: string;
      IP_STACK_URL: string;
      REDIS_URL: string;
      KAFKA_BROKER: string;
      OUTPUT_TOPIC: string;
      INPUT_TOPIC: string;
    }
  }
}

export default {};
