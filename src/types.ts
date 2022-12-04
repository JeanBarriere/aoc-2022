export interface Transformer<Output> {
  (value: string): Output | Promise<Output>;
}

export interface Executor<Input, Output> {
  (input: Input): Output | Promise<Output>;
}
