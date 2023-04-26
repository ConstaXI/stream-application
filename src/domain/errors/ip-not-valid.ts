import { Fail, fail } from '../protocols/result';

export class InvalidIp extends Error {
  constructor() {
    super('Ip Not Valid');
    this.name = 'IpNotValid';
    this.message = 'Ip is well formed, but it is not a public IP address';
  }
}

export function invalidIp(): Fail<InvalidIp> {
  return fail(new InvalidIp());
}
