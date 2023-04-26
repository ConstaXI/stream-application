declare global {
  namespace NodeJS {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    interface ProcessEnv {
      ACCESS_KEY: string;
      IP_STACK_URL: string;
    }
  }
}

export default {};
