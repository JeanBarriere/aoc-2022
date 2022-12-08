import { sortNumberDesc } from '@utils/number';
import { createAdventRunnerForDay } from '@utils/runner';
import { numbersList } from '@utils/transformers';

const runner = createAdventRunnerForDay(1);

const sliceArrayBy =
  <T>(by: T) =>
  (array: T[]): T[][] => {
    const newArray = new Array<T[]>();

    while (array.length > 0) {
      const until = array.indexOf(by);
      newArray.push(array.splice(0, until === -1 ? array.length : until + 1));
    }

    return newArray;
  };

const sliceTransformer = async (value: string) => Promise.resolve(numbersList(value)).then(sliceArrayBy(0));

const sum = (left: number, right: number) => left + right;

const arraySum = (array: number[]) => array.reduce(sum);

runner.run((caloriesList) => {
  const caloriesSummed = caloriesList.map(arraySum);

  return Math.max(...caloriesSummed);
}, sliceTransformer);

runner.run((caloriesList) => {
  const caloriesSummed = caloriesList.map(arraySum).sort(sortNumberDesc).splice(0, 3).reduce(sum);

  return caloriesSummed;
}, sliceTransformer);
