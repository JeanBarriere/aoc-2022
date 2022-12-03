import { Executor, Transformer } from "@types";
import { environment } from "./environment";
import { noTransformer } from "./transformers";

const SESSION = environment("AOC_SESSION").getOrThrow();

const fetchInput = async (day: number) => {
  const inputUrl = `https://adventofcode.com/2022/day/${day}/input`;
  return fetch(inputUrl, { headers: { cookie: `session=${SESSION}` } }).then(
    (res) => res.text()
  );
};

export const createAdventRunnerForDay = (day: number) => {
  const input = fetchInput(day);

  return {
    run: <Input, Output>(
      process: Executor<Input, Output>,
      transformer?: Transformer<Input>
    ) => {
      describe(`Advent of code Day ${day}`, async () => {
        const result: Output = await input
          .then(transformer ?? (noTransformer as Transformer<Input>))
          .then(process);

        it(`outputs ${result}`, () => {
          expect(result).toBeDefined();
        });
      });
    },
  };
};

export const log = <T>(value: T): T => { console.log(value); return value };