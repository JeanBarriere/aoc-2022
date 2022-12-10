import { at, last, loop, map, reduce } from '@utils/array';
import { flow, pipe } from '@utils/function';
import { createAdventRunnerForDay } from '@utils/runner';
import { asSet, size } from '@utils/set';
import { split } from '@utils/string';

type Direction = 'U' | 'R' | 'D' | 'L';
type Steps = number;
type Action = [Direction, Steps];
type Position = [y: number, x: number];
type Knot = Position[];

const PositionToString = ([y, x]: Position): string => `${y}-${x}`;

const toAction = (input: string): Action => {
  const [direction, steps] = input.split(' ') as string[];

  return [direction, Number(steps)] as Action;
};

const runner = createAdventRunnerForDay(9);
const actionsList = flow(split('\n'), map(toAction));

const moveHead = (head: Position, direction: Direction): Position => {
  switch (direction) {
    case 'U':
      return [head[0] - 1, head[1]];
    case 'D':
      return [head[0] + 1, head[1]];
    case 'L':
      return [head[0], head[1] - 1];
    case 'R':
      return [head[0], head[1] + 1];
  }
};

const isInRange = (head: Position, tail: Position) => {
  return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
};

const moveTail = (tail: Position, head: Position): Position => {
  if (!isInRange(head, tail)) {
    const distY = Math.round(head[0] - tail[0]);
    const distX = Math.round(head[1] - tail[1]);
    return [tail[0] + (distY > 0 ? 1 : distY < 0 ? -1 : 0), tail[1] + (distX > 0 ? 1 : distX < 0 ? -1 : 0)];
  }
  return tail;
};

class Bridge {
  #knots: Knot[];
  constructor(knots = 2) {
    this.#knots = new Array(knots).fill(null).map(() => [[0, 0]]);
  }

  public move(direction: Direction): Bridge {
    this.#knots.forEach((knot, index, knots) => {
      knot.push(
        index === 0
          ? moveHead(pipe(knot, last)!, direction)
          : moveTail(pipe(knot, last)!, pipe(pipe(knots, at(index - 1))!, last)!)
      );
    });
    return this;
  }

  public get tail(): Knot {
    return pipe(this.#knots, last)!;
  }
}

runner.run(
  flow(
    reduce((bridge, action: Action) => loop(action[1], () => bridge.move(action[0])), new Bridge(2)),
    (bridge: Bridge) => bridge.tail.map(PositionToString),
    asSet,
    size
  ),
  actionsList
);

runner.run(
  flow(
    reduce((bridge, action: Action) => loop(action[1], () => bridge.move(action[0])), new Bridge(10)),
    (bridge: Bridge) => bridge.tail.map(PositionToString),
    asSet,
    size
  ),
  actionsList
);
