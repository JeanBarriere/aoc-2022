export type MapFn<T, U> = (value: T) => U;

export const identity = <T>(value: T): T => value;
export const get =
  <T>(value: T) =>
  () =>
    value;

export function pipe<InitialValue>(value: InitialValue, ...pipeFns: MapFn<unknown, unknown>[]): unknown;
export function pipe<InitialValue, A>(value: InitialValue, fn: MapFn<InitialValue, A>): A;
export function pipe<InitialValue, A, B>(value: InitialValue, fn: MapFn<InitialValue, A>, fn2: MapFn<A, B>): B;
export function pipe<InitialValue, A, B, C>(
  value: InitialValue,
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>
): C;
export function pipe<InitialValue, A, B, C, D>(
  value: InitialValue,
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>
): D;
export function pipe<InitialValue, A, B, C, D, E>(
  value: InitialValue,
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>
): E;
export function pipe<InitialValue, A, B, C, D, E, F>(
  value: InitialValue,
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>
): F;
export function pipe<InitialValue, A, B, C, D, E, F, G>(
  value: InitialValue,
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>,
  fn7: MapFn<F, G>
): G;
export function pipe<InitialValue, A, B, C, D, E, F, G, H>(
  value: InitialValue,
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>,
  fn7: MapFn<F, G>,
  fn8: MapFn<G, H>
): H;
export function pipe<InitialValue, A, B, C, D, E, F, G, H, I>(
  value: InitialValue,
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>,
  fn7: MapFn<F, G>,
  fn8: MapFn<G, H>,
  fn9: MapFn<H, I>
): I;
export function pipe<InitialValue, A, B, C, D, E, F, G, H, I, J>(
  value: InitialValue,
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>,
  fn7: MapFn<F, G>,
  fn8: MapFn<G, H>,
  fn9: MapFn<H, I>,
  fn10: MapFn<I, J>
): J;

export function pipe<T>(initialValue: T, ...pipeFns: MapFn<unknown, unknown>[]): unknown {
  const [toPipe, ...pipeline] = pipeFns;

  if (pipeline.length > 0) {
    return pipe(toPipe?.(initialValue) ?? initialValue, ...pipeline);
  } else {
    return toPipe?.(initialValue) ?? initialValue;
  }
}

export function flow<InitialValue>(...flowFns: MapFn<unknown, unknown>[]): (value: InitialValue) => unknown;
export function flow<InitialValue, A>(fn: MapFn<InitialValue, A>): (value: InitialValue) => A;
export function flow<InitialValue, A, B>(fn: MapFn<InitialValue, A>, fn2: MapFn<A, B>): (value: InitialValue) => B;
export function flow<InitialValue, A, B, C>(
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>
): (value: InitialValue) => C;
export function flow<InitialValue, A, B, C, D>(
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>
): (value: InitialValue) => D;
export function flow<InitialValue, A, B, C, D, E>(
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>
): (value: InitialValue) => E;
export function flow<InitialValue, A, B, C, D, E, F>(
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>
): (value: InitialValue) => F;
export function flow<InitialValue, A, B, C, D, E, F, G>(
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>,
  fn7: MapFn<F, G>
): (value: InitialValue) => G;
export function flow<InitialValue, A, B, C, D, E, F, G, H>(
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>,
  fn7: MapFn<F, G>,
  fn8: MapFn<G, H>
): (value: InitialValue) => H;
export function flow<InitialValue, A, B, C, D, E, F, G, H, I>(
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>,
  fn7: MapFn<F, G>,
  fn8: MapFn<G, H>,
  fn9: MapFn<H, I>
): (value: InitialValue) => I;
export function flow<InitialValue, A, B, C, D, E, F, G, H, I, J>(
  fn: MapFn<InitialValue, A>,
  fn2: MapFn<A, B>,
  fn3: MapFn<B, C>,
  fn4: MapFn<C, D>,
  fn5: MapFn<D, E>,
  fn6: MapFn<E, F>,
  fn7: MapFn<F, G>,
  fn8: MapFn<G, H>,
  fn9: MapFn<H, I>,
  fn10: MapFn<I, J>
): (value: InitialValue) => J;

export function flow<T>(...flowFns: MapFn<unknown, unknown>[]): (initialValue: T) => unknown {
  return (initialValue) => flowFns.reduce((acc, cur) => cur(acc), initialValue as unknown);
}
