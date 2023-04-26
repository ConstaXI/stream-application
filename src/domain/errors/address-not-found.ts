import { Fail, fail } from '../protocols/result';

export class AddressNotFound extends Error {
  constructor() {
    super('Bad Ip');
    this.name = 'BadIp';
    this.message =
      'Ip is invalid, but address was not found. Maybe is not a public IP?';
  }
}

export function addressNotFound(): Fail<AddressNotFound> {
  return fail(new AddressNotFound());
}
