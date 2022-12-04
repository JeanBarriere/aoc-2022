export const map =
  <T, U>(mapFn: (value: T) => U) =>
  (arr: T[]) =>
    arr.map(mapFn);
