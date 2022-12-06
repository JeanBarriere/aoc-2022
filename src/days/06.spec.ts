import { findIndex } from '@utils/array';
import { flow } from '@utils/function';
import { createAdventRunnerForDay } from '@utils/runner';
import { split } from '@utils/string';

const runner = createAdventRunnerForDay(6);

const findIndexFirstUniqueSetInArray =
  <T>(setSize: number) =>
  (_: T, index: number, array: T[]) =>
    index >= setSize && new Set(array.slice(index - setSize, index)).size === setSize ? true : false;

runner.run(flow(split(''), findIndex(findIndexFirstUniqueSetInArray(4))));
runner.run(flow(split(''), findIndex(findIndexFirstUniqueSetInArray(14))));
