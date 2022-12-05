import { last, map } from "@utils/array";
import { createAdventRunnerForDay } from "@utils/runner";
import { split } from "@utils/string";

const runner = createAdventRunnerForDay(5);

type Crate = string;
type Crates = Array<Crate>;

class Cargo {
  #containers: Array<Crates>;

  constructor(length: number) {
    this.#containers = new Array(length).fill(null).map(() => new Array());
  }

  public get mover() {
    return {
      grabCrates: (position: number, amount: number = 1): Crates | undefined =>
        this.#containers[position]?.splice(-amount),
      addCrates: (position: number, ...crates: Crates): number =>
        this.#containers[position]?.push(...crates) ?? 0,
    } as const;
  }

  public get containers(): ReadonlyArray<Crates> {
    return this.#containers;
  }
}

type Instruction = [amount: number, from: number, to: number];
type InstructionSet = Array<Instruction>;

const toCargo = (input?: string): Cargo => {
  const cargo = new Cargo(9);

  input
    ?.split("\n")
    .reverse()
    // get each value
    .map((line) => line.split("").filter((_, index) => (index - 1) % 4 === 0))
    // remove crates numbers
    .slice(1)
    // add crates in cargo
    .forEach(
      map((value, index) => {
        if (value !== " ") {
          cargo.mover.addCrates(index, value);
        }
      })
    );
  return cargo;
};

const toInstructionSet = (input?: string): InstructionSet => {
  return (
    input?.split("\n").map(
      (line) =>
        line
          .split(/[move|from|to]/)
          .filter(Number)
          .map(Number) as Instruction
    ) ?? []
  );
};

const inputToCargoAndInstructions = (
  value: string
): Promise<[Cargo, InstructionSet]> =>
  Promise.resolve(split("\n\n")(value)).then(([cargo, instructionSet]) => [
    toCargo(cargo),
    toInstructionSet(instructionSet),
  ]);

runner.run(([cargo, instructions]) => {
  instructions.forEach(([amount, from, to]) => {
    for (let move = 0; move < amount; move++) {
      const movingCrates = cargo.mover.grabCrates(from - 1) ?? [];
      cargo.mover.addCrates(to - 1, ...movingCrates);
    }
  });
  return cargo.containers.map(last()).join("");
}, inputToCargoAndInstructions);

runner.run(([cargo, instructions]) => {
  instructions.forEach(([amount, from, to]) => {
    const movingCrates = cargo.mover.grabCrates(from - 1, amount) ?? [];
    cargo.mover.addCrates(to - 1, ...movingCrates);
  });
  return cargo.containers.map(last()).join("");
}, inputToCargoAndInstructions);
