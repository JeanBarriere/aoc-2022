export const map =
  <T, U>(mapFn: (value: T, index: number, array: T[]) => U) =>
  (arr: T[]) =>
    arr.map(mapFn);

export const last =
  <T>() =>
  (arr: T[]) =>
    arr.at(-1);
