import { map, reduce } from '@utils/array';
import { flow } from '@utils/function';
import { sortNumberAsc, sum } from '@utils/number';
import { createAdventRunnerForDay } from '@utils/runner';
import { split } from '@utils/string';

const runner = createAdventRunnerForDay(7);

type KnownCommand = 'ls' | 'cd';
class Command {
  #cmd: KnownCommand;
  #arg: string | undefined;

  constructor(input: string) {
    const [_, cmd, arg] = input.split(' ');
    if (!cmd) {
      throw new Error('no command found');
    }
    this.#cmd = cmd as KnownCommand;
    this.#arg = arg;
  }

  public execute(dir: Dir): Dir {
    if (this.#cmd === 'cd') {
      if (this.#arg) {
        if (this.#arg === '..') {
          return dir.parent ?? dir;
        } else if (this.#arg === '/') {
          return dir.root;
        } else {
          return dir.getSubDir(this.#arg) ?? dir;
        }
      }
    }
    return dir;
  }

  public toString() {
    return `Command (${this.#cmd}${this.#arg ? `:${this.#arg}` : ''})`;
  }
}

abstract class INode {
  #name: string;
  public parent: Dir | undefined;

  abstract get size(): number;

  public get name(): string {
    return this.#name;
  }

  constructor(name: string) {
    this.#name = name;
  }

  public get root(): Dir {
    let root = this.parent ?? this;
    while (root.parent) {
      root = root.parent;
    }
    return root as Dir;
  }

  static isDirectory(node: INode): node is Dir {
    return node instanceof Dir;
  }

  static isSameNode(left: INode, right: INode): boolean {
    return left.constructor.name === right.constructor.name && left.name === right.name;
  }

  static fromStr(input: string): Dir | File {
    const [type, name] = input.split(' ') as [string, string];

    if (type === 'dir') {
      return new Dir(name);
    }
    return new File(name, Number(type));
  }
}

class Dir extends INode {
  #files: INode[];

  get size(): number {
    return this.#files.map((f) => f.size).reduce(sum, 0);
  }

  public get files(): INode[] {
    return [...this.#files, ...this.#files.flatMap((f) => (INode.isDirectory(f) ? f.files : []))];
  }

  constructor(name: string) {
    super(name);
    this.#files = new Array();
  }

  public getSubDir(name: string): Dir | undefined {
    return this.files.find((f) => f.name === name && INode.isDirectory(f)) as Dir | undefined;
  }

  public addFile(file: File | Dir): Dir {
    if (this.#files.findIndex((f) => INode.isSameNode(f, file)) === -1) {
      this.#files.push(file);
      file.parent = this;
    }
    return this;
  }

  public override toString() {
    return `${this.name} {dir - ${this.size}} [${this.files.length}][${this.files
      .map((f) => `${f.name}-${f instanceof Dir ? 'd' : 'f'}`)
      .join(', ')}]`;
  }
}

class File extends INode {
  #size: number;

  get size(): number {
    return this.#size;
  }

  constructor(name: string, size: number) {
    super(name);
    this.#size = size;
  }

  public override toString() {
    return `${this.name} {file - ${this.size}}`;
  }
}

const lineToAction = (line: string) => {
  if (line.startsWith('$')) {
    return new Command(line);
  } else {
    return INode.fromStr(line);
  }
};

const generateFSTree = flow(
  split('\n'),
  map(lineToAction),
  reduce((curDir, actionOrINode) => {
    if (actionOrINode instanceof Command) {
      return actionOrINode.execute(curDir);
    } else {
      return curDir.addFile(actionOrINode);
    }
  }, new Dir('/')),
  (file) => file.root
);

runner.run(
  (root) =>
    root.files
      .filter(INode.isDirectory)
      .filter((f) => f.size <= 100000)
      .map((f) => f.size)
      .reduce(sum, 0),
  generateFSTree
);

runner.run((root) => {
  const needToFree = root.size - 70000000 + 30000000;
  return root.files
    .filter(INode.isDirectory)
    .filter((f) => f.size > needToFree)
    .map((f) => f.size)
    .sort(sortNumberAsc)
    .at(0);
}, generateFSTree);
