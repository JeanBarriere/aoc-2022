import { filter, length, map } from '@utils/array';
import { createAdventRunnerForDay } from '@utils/runner';
import { split } from '@utils/string';
import { list } from '@utils/transformers';
import { flow } from '@utils/function';
import { asTuple } from '@utils/tuple';

class Vector<Dimension = number> {
  #from: Dimension;
  #to: Dimension;

  private constructor(from: Dimension, to: Dimension) {
    this.#from = from;
    this.#to = to;
  }

  static from(str: string): Vector {
    const [from, to] = str.split('-');

    return new Vector(Number(from), Number(to));
  }

  public includes(vector: Vector<Dimension>): boolean {
    return this.#from <= vector.#from && this.#to >= vector.#to;
  }

  public intersects(vector: Vector<Dimension>): boolean {
    return this.#from <= vector.#from && this.#to >= vector.#from;
  }
}

const runner = createAdventRunnerForDay(4);

const vectorsList = flow(list, map(split(',')), map(map(Vector.from)), map(asTuple));

runner.run(
  flow(
    filter(([a, b]: [Vector, Vector]) => a.includes(b) || b.includes(a)),
    length
  ),
  vectorsList
);

runner.run(
  flow(
    filter(([a, b]: [Vector, Vector]) => a.intersects(b) || b.intersects(a)),
    length
  ),
  vectorsList
);
