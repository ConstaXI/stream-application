export default interface Controller {
  handle(...arguments_: unknown[]): Promise<unknown>;
}
