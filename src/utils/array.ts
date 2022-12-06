import { MapFn } from './function';

export const map =
  <T, U>(mapFn: (value: T, index: number, array: T[]) => U) =>
  (arr: T[]): U[] =>
    arr.map(mapFn);

export const forEach =
  <T>(forEachFn: (value: T, index: number, array: T[]) => void) =>
  (arr: T[]): T[] => {
    arr.forEach(forEachFn);
    return arr;
  };

export const findIndex =
  <T>(findIndexFn: (value: T, index: number, array: T[]) => void) =>
  (arr: T[]): number =>
    arr.findIndex(findIndexFn);

export const loop = <U>(cycles: number, mapFn: MapFn<void, U>): U[] => new Array(cycles).fill(null).map(mapFn);

export const filter =
  <T, U>(filterFn: (value: T, index: number, array: T[]) => U) =>
  (arr: T[]) =>
    arr.filter(filterFn);

export function reduce<U, T>(
  reduceFn: (previousValue: U, currentValue: T, currentIndex: number) => U,
  initialValue: U
): (arr: T[]) => U;

export function reduce<T>(reduceFn: (previousValue: T, currentValue: T, currentIndex: number) => T): (arr: T[]) => T;

export function reduce<T>(
  reduceFn: (previousValue: T, currentValue: T, currentIndex: number) => T,
  initialValue: T
): (arr: T[]) => T;

export function reduce<U, T>(
  reduceFn:
    | ((previousValue: U, currentValue: T, currentIndex: number) => U)
    | ((previousValue: T, currentValue: T, currentIndex: number) => T),
  initialValue?: U
): (arr: T[]) => T | U {
  return (arr: T[]) => (initialValue ? arr.reduce(reduceFn as () => U, initialValue) : arr.reduce(reduceFn as () => T));
}

export const slice =
  <T>(start?: number, end?: number) =>
  (arr: T[]) =>
    arr.slice(start, end);

export const length = <T>(arr: T[]) => arr.length;

export const reverse = <T>(arr: T[]) => arr.reverse();

export const last = <T>(arr: T[]) => arr.at(-1);
export const join =
  <T>(separator?: string) =>
  (arr: T[]) =>
    arr.join(separator);
