/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */

export type Result<O, F> = Ok<O> | Fail<F>;

export class Fail<F> {
  constructor(readonly value: F) {}

  isFail(): this is Fail<F> {
    return true;
  }

  isOk(): this is Ok<never> {
    return false;
  }
}

export class Ok<O> {
  constructor(readonly value: O) {}

  isFail(): this is Fail<never> {
    return false;
  }

  isOk(): this is Ok<O> {
    return true;
  }
}

export const fail = <F>(value: F): Fail<F> => {
  return new Fail(value);
};

export const ok = <O>(value: O): Ok<O> => {
  return new Ok(value);
};
