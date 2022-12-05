import { filter, last, map, reduce, reverse, slice } from '@utils/array';
import { flow, get, pipe } from '@utils/function';
import { createAdventRunnerForDay } from '@utils/runner';
import { split } from '@utils/string';
import { asTuple } from '@utils/tuple';

const runner = createAdventRunnerForDay(5);

type Crate = string;
type Crates = Crate[];

class Cargo {
  #containers: Crates[];

  constructor(length: number) {
    this.#containers = new Array(length).fill(null).map(() => new Array());
  }

  public get mover() {
    return {
      grabCrates: (position: number, amount: number = 1): Crates | undefined =>
        this.#containers[position]?.splice(-amount),
      addCrates: (position: number, ...crates: Crates): number => this.#containers[position]?.push(...crates) ?? 0
    } as const;
  }

  public get containers(): ReadonlyArray<Crates> {
    return this.#containers;
  }
}

type Instruction = [amount: number, from: number, to: number];

const toCargo = flow(
  split('\n'),
  reverse,
  // remove crates position number
  slice(1),
  map(
    // cleanup each line and get its value
    flow(
      split(''),
      filter((_, index) => (index - 1) % 4 === 0)
    )
  ),
  reduce(
    (cargo, line) =>
      pipe(
        line,
        map((value: string, index) => value !== ' ' && cargo.mover.addCrates(index, value)),
        get(cargo)
      ),
    new Cargo(9)
  )
);

const toInstructionSet = flow(
  split('\n'),
  map((line) => line.split(/[move|from|to]/).filter(Number).map(Number) as Instruction)
);

const inputToCargoAndInstructions = flow(
  split('\n\n'),
  asTuple,
  ([cargo, instructionSet]) => [toCargo(cargo), toInstructionSet(instructionSet)] as const
);

runner.run(([cargo, instructions]) => {
  instructions.forEach(([amount, from, to]) => {
    for (let move = 0; move < amount; move++) {
      const movingCrates = cargo.mover.grabCrates(from - 1) ?? [];
      cargo.mover.addCrates(to - 1, ...movingCrates);
    }
  });
  return cargo.containers.map(last()).join('');
}, inputToCargoAndInstructions);

runner.run(([cargo, instructions]) => {
  instructions.forEach(([amount, from, to]) => {
    const movingCrates = cargo.mover.grabCrates(from - 1, amount) ?? [];
    cargo.mover.addCrates(to - 1, ...movingCrates);
  });
  return cargo.containers.map(last()).join('');
}, inputToCargoAndInstructions);
