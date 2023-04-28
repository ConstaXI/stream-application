export default interface Presenter {
  handle(...arguments_: unknown[]): Promise<void>;
}
