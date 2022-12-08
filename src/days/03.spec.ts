import { map } from '@utils/array';
import { sum } from '@utils/number';
import { createAdventRunnerForDay } from '@utils/runner';
import { list } from '@utils/transformers';

const runner = createAdventRunnerForDay(3);

type Rucksack = [string, string];
type BigRucksack = string;
type Rucksacks = Rucksack[];
type Ruckstack = [a: BigRucksack, b: BigRucksack, c: BigRucksack];

const Priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const splitInHalf = (line: string) =>
  [line.slice(0, line.length / 2), line.slice(line.length / 2, line.length)] as [string, string];

const splitLine = (value: string) => Promise.resolve(list(value)).then(map(splitInHalf));

const sliceArrayEvery =
  <T, U>(index: number) =>
  (array: T[]): U[] => {
    const newArray = new Array();

    while (array.length > 0) {
      newArray.push(array.splice(0, index) as U);
    }

    return newArray;
  };

const sliceLines = (value: string) => Promise.resolve(list(value)).then(sliceArrayEvery<string, Ruckstack>(3));

const findCommonLetter = ([left, right]: Rucksack) => {
  return left
    .split('')
    .filter((l) => right.includes(l))
    .at(0);
};

const findCommonLetterInRucktrack = ([a, b, c]: Ruckstack) => {
  return a
    .split('')
    .filter((l) => b.includes(l) && c.includes(l))
    .at(0);
};

const findCommonLetterGeneric = (left: string, ...right: string[]) => {
  return left
    .split('')
    .filter((l) => right.length === right.reduce((found, line) => found + (line.includes(l) ? 1 : 0), 0))
    .at(0);
};

const letterToPriorityPoint = (char?: string): number => Priorities.indexOf(char ?? '') + 1;

runner.run((rucksacks: Rucksacks) => {
  return (
    rucksacks
      // .map(findCommonLetter)
      .map((rucksack) => findCommonLetterGeneric(...rucksack))
      .map(letterToPriorityPoint)
      .reduce(sum)
  );
}, splitLine);

runner.run((ruckstacks: Ruckstack[]) => {
  return (
    ruckstacks
      // .map(findCommonLetterInRucktrack)
      .map((ruckstack) => findCommonLetterGeneric(...ruckstack))
      .map(letterToPriorityPoint)
      .reduce(sum)
  );
}, sliceLines);
