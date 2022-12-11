import { last, loop, map } from '@utils/array';
import { flow, pipe } from '@utils/function';
import { multiply, sum, sortNumberDesc } from '@utils/number';
import { createAdventRunnerForDay, log } from '@utils/runner';
import { split } from '@utils/string';

// NOTE: this day would love a refactor
const runner = createAdventRunnerForDay(11);

type Operator = '+' | '*';
const Operator = (input?: string): Operator => (input ?? '+') as Operator;

class Operation {
  #operator: Operator;
  #op: (left: number, right?: number) => number;
  #operand: number | 'self';

  private constructor(operator: Operator, operand: number | 'self') {
    this.#operator = operator;
    this.#op = operator === '*' ? multiply : sum;
    this.#operand = operand;
  }

  public static fromStr(input?: string): Operation {
    const [operand, operator] = input?.split(' ').reverse() ?? [];

    return new Operation(Operator(operator), operand === 'old' ? 'self' : Number(operand ?? 0));
  }

  public eval(value: number): number {
    return this.#op(value, this.#operand as number);
  }

  public toString() {
    return `Operation (${this.#operator}) {${this.#operand}}`;
  }
}

const worrynessPostInspection = (value: number): number => Math.floor(value / 3);
const noOp = (value: number): number => value;

class TestThrow {
  #divider: number;
  #idTrue: number;
  #idFalse: number;

  private constructor(divider: number, idTrue: number, idFalse: number) {
    this.#divider = divider;
    this.#idTrue = idTrue;
    this.#idFalse = idFalse;
  }

  public static fromStr(input: string[]): TestThrow {
    const [test, testTrue, testFalse] = input;
    const divider = Number(test?.split(' ').reverse().at(0) ?? 0);
    const dividerTrue = Number(testTrue?.split(' ').reverse().at(0) ?? 0);
    const dividerFalse = Number(testFalse?.split(' ').reverse().at(0) ?? 0);

    return new TestThrow(divider, dividerTrue, dividerFalse);
  }

  public get divider(): number {
    return this.#divider;
  }

  public throw(item: number, commonDivider: number): [number, number] {
    return [item % commonDivider, item % this.#divider === 0 ? this.#idTrue : this.#idFalse];
  }

  public toString() {
    return `TestThrow (${this.#divider}) {${this.#idTrue}:${this.#idFalse}}`;
  }
}

class Monkey {
  #id: number;
  #items: number[];
  #inspections: number;
  #operation: Operation;
  #throw: TestThrow;
  #worrynessAction: (value: number) => number;

  private constructor(
    id: number,
    items: number[],
    operation: Operation,
    testThrow: TestThrow,
    worryness?: (value: number) => number
  ) {
    this.#id = id;
    this.#items = items;
    this.#operation = operation;
    this.#throw = testThrow;
    this.#inspections = 0;
    this.#worrynessAction = worryness ?? noOp;
  }

  public static fromStr(worrynessAction?: (value: number) => number): (input: string) => Monkey {
    return (input: string) => {
      const [monkeyName, startItems, operation, ...test] = input.split('\n');
      const monkeyId = monkeyName?.split(/Monkey |:/).filter(Boolean).map(Number).at(0) ?? 0;
      const items = startItems?.split(/ |:|,/).map(Number).filter(Boolean) ?? [];

      return new Monkey(monkeyId, items, Operation.fromStr(operation), TestThrow.fromStr(test), worrynessAction);
    };
  }

  public get testDivider(): number {
    return this.#throw.divider;
  }

  public grab(item: number): Monkey {
    this.#items.push(item);
    return this;
  }

  public toString() {
    return `Monkey (${this.#id}:${this.#inspections}) {op:${this.#operation}|throw:${this.#throw}|items:${this.#items.length}}`;
  }

  public throw(commonDivider: number): [item: number, monkey: number][] {
    this.#inspections += this.#items.length;
    return this.#items.splice(0).map((item) => {
      const newValue = this.#worrynessAction(this.#operation.eval(item));
      return this.#throw.throw(newValue, commonDivider);
    });
  }

  public get inspections(): number {
    return this.#inspections;
  }
}

class Round {
  #id: number;
  #monkeys: Monkey[];

  private constructor(id: number, monkeys: Monkey[]) {
    this.#id = id;
    this.#monkeys = monkeys;
  }

  private get commonDivider(): number {
    return this.#monkeys.map((m) => m.testDivider).reduce(multiply);
  }

  public static fromMonkeys(monkeys: Monkey[]) {
    return new Round(0, monkeys);
  }

  public play(): Round {
    this.#monkeys.forEach((monkey) =>
      monkey.throw(this.commonDivider).forEach(([item, monkey]) => {
        this.#monkeys[monkey]?.grab(item);
      })
    );
    this.#id += 1;
    return this;
  }

  public get monkeys(): Monkey[] {
    return this.#monkeys;
  }

  public toString() {
    return `Round (${this.#id}) {\n${this.#monkeys.map((m) => `  ${m}`).join('\n')}\n}`;
  }
}

const toMonkey = (worrynessAction?: (value: number) => number) =>
  flow(split('\n\n'), map(Monkey.fromStr(worrynessAction)));

runner.run((monkeys) => {
  const round = Round.fromMonkeys(monkeys);

  return pipe(
    loop(20, () => round.play()),
    last,
    (r: Round | undefined) =>
      r?.monkeys
        .map((m) => m.inspections)
        .sort(sortNumberDesc)
        .slice(0, 2)
        .reduce(multiply)
  );
}, toMonkey(worrynessPostInspection));

runner.run((monkeys) => {
  const round = Round.fromMonkeys(monkeys);

  return pipe(
    loop(10000, () => round.play()),
    last,
    // log,
    (r: Round | undefined) =>
      r?.monkeys
        .map((m) => m.inspections)
        .sort(sortNumberDesc)
        .slice(0, 2)
        .reduce(multiply)
  );
}, toMonkey());
