export interface Interactor {
  execute(..._arguments: unknown[]): Promise<unknown>;
}
