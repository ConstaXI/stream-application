export class EmptyMessage extends Error {
  constructor() {
    super('Empty message');
    this.name = 'EmptyMessage';
    this.message = 'The message is empty';
  }
}

export function emptyMessage(): EmptyMessage {
  return new EmptyMessage();
}
