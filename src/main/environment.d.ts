declare global {
  namespace NodeJS {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    interface ProcessEnv {
      ACCESS_KEY: string;
      IP_STACK_URL: string;
      REDIS_URL: string;
      OUTPUT_TOPIC: string;
      INPUT_TOPIC: string;
      TEST_INPUT_TOPIC: string;
      TEST_OUTPUT_TOPIC: string;
      TEST_REDIS_URL: string;
    }
  }
}

export default {};
