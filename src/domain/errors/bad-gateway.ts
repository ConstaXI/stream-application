export class BadGateway extends Error {
  constructor() {
    super('Bad Gateway');
    this.name = 'BadGateway';
    this.message = 'Server failed during external request';
  }
}

export function badGateway(): BadGateway {
  return new BadGateway();
}
