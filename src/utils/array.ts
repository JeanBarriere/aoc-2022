export const map =
  <T, U>(mapFn: (value: T, index: number, array: T[]) => U) =>
  (arr: T[]) =>
    arr.map(mapFn);

export const filter =
  <T, U>(filterFn: (value: T, index: number, array: T[]) => U) =>
  (arr: T[]) =>
    arr.filter(filterFn);

export const length = <T>(arr: T[]) => arr.length;

export const last =
  <T>() =>
  (arr: T[]) =>
    arr.at(-1);
