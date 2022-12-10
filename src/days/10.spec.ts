import { loop, map, reduce } from '@utils/array';
import { flow, pipe } from '@utils/function';
import { sum } from '@utils/number';
import { createAdventRunnerForDay } from '@utils/runner';
import { split } from '@utils/string';

const runner = createAdventRunnerForDay(10);

type Operation = 'noop' | 'addx';
class Command {
  #op: Operation;
  #value: number;

  constructor(op: Operation, arg?: string) {
    this.#op = op;
    this.#value = Number(arg);
  }

  public static fromStr(input: string): Command {
    const [op, arg] = input.split(' ');

    return new Command(op as Operation, arg ?? '');
  }

  public get cycles(): number {
    switch (this.#op) {
      case 'addx':
        return 2;
      case 'noop':
        return 1;
    }
  }

  public get value(): number {
    return this.#value;
  }

  public toString() {
    return `Command {${this.#op}:${this.#value}}`;
  }
}

class Program {
  #commands: Command[];
  #cycle: number;

  private constructor(cmd: Command[], cycle?: number) {
    this.#commands = cmd;
    this.#cycle = cycle ?? 0;
  }

  static fromCommands(cmd: Command[]): Program {
    return new Program(cmd);
  }

  public get commands(): Command[] {
    return this.#commands;
  }

  public getCycleAt(index: number): Program {
    const commands: Command[] = [];
    while (commands.map((c) => c.cycles).reduce(sum, 1) < index - 1) {
      commands.push(this.commands[commands.length % this.commands.length]!);
    }
    return new Program(commands, index);
  }

  public get value(): number {
    return this.#commands.map((c) => c.value).reduce(sum, 1);
  }

  public get strength(): number {
    return this.#cycle * this.value;
  }

  public toString() {
    return `Program {${this.#commands.length}}\n [${this.#commands}]`;
  }
}

const toProgram = flow(split('\n'), map(Command.fromStr), Program.fromCommands);

runner.run(
  (program) =>
    pipe(
      [20, 60, 100, 140, 180, 220],
      map((c: number) => program.getCycleAt(c).strength),
      reduce(sum, 0)
    ),
  toProgram
);

runner.run(
  (program) =>
    '\n' +
    loop(6, (crtLine) =>
      loop(40, (times) => {
        const currentCycle = program.getCycleAt(40 * (crtLine - 1) + times).value;
        return currentCycle <= times && currentCycle + 2 >= times ? '#' : '.';
      }).join('')
    ).join('\n'),
  toProgram
);
