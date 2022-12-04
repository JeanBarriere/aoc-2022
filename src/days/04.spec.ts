import { map } from "@utils/array";
import { createAdventRunnerForDay } from "@utils/runner";
import { split } from "@utils/string";
import { list } from "@utils/transformers";
import { Transformer } from "@types";

class Vector<Dimension = number> {
  #from: Dimension;
  #to: Dimension;

  private constructor(from: Dimension, to: Dimension) {
    this.#from = from;
    this.#to = to;
  }

  static from(str: string): Vector {
    const [from, to] = str.split("-");

    return new Vector(Number(from), Number(to));
  }

  public includes(vector: Vector<Dimension>): boolean {
    return this.#from <= vector.#from && this.#to >= vector.#to;
  }

  public intersects(vector: Vector<Dimension>): boolean {
    return this.#from <= vector.#from && this.#to >= vector.#from;
  }

  public toString(): string {
    return `[${this.#from}:${this.#to}]`;
  }

  public get from(): Dimension {
    return this.#from;
  }

  public get to(): Dimension {
    return this.#to;
  }
}

const runner = createAdventRunnerForDay(4);
export const vectorsList: Transformer<Array<[Vector, Vector]>> = async (
  value: string
) =>
  Promise.resolve(list(value))
    .then(map(split(",")))
    .then(map(map(Vector.from) as (value: string[]) => [Vector, Vector]));

const sum = (left: number, right: number) => left + right;

runner.run(
  (vectorsList) =>
    vectorsList
      .map(([a, b]) => a.includes(b) || b.includes(a))
      .map(Number)
      .reduce(sum),
  vectorsList
);

runner.run(
  (vectorsList) =>
    vectorsList
      .map(([a, b]) => a.intersects(b) || b.intersects(a))
      .map(Number)
      .reduce(sum),
  vectorsList
);
