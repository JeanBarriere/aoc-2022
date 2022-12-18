import { filter, find, flat, map } from '@utils/array';
import { flow, pipe } from '@utils/function';
import { sortNumberAsc } from '@utils/number';
import { createAdventRunnerForDay } from '@utils/runner';
import { split } from '@utils/string';

const runner = createAdventRunnerForDay(12);

type Position = `${string}:${string}`;
type Node = {
  position: Position;
  elevation: number;
  routes: Node[];
};

class Maze {
  #finalNode: Position;
  #visited: Set<Position>;
  #nodesMap: Map<Position, Position[]>;

  constructor(nodesMap: Map<Position, Position[]>, endNode: Position) {
    this.#finalNode = endNode;
    this.#nodesMap = nodesMap;
    this.#visited = new Set();
  }

  public hasVisited(position: Position): boolean {
    return Boolean(this.#visited.has(position));
  }

  private bfs(startNode: Position): Record<Position, Position | undefined> {
    const nodes: Record<Position, Position | undefined> = {};
    nodes[startNode] = undefined;
    this.#visited.add(startNode);
    const queue = [startNode];

    while (queue.length > 0) {
      const pos = queue.shift()!;
      for (const route of this.#nodesMap.get(pos)!) {
        if (!this.hasVisited(route)) {
          nodes[route] = pos;
          this.#visited.add(route);
          queue.push(route);
        }
        if (this.#finalNode === route) {
          return nodes;
        }
      }
    }
    return nodes;
  }

  public solve(start: Position): number {
    const nodes = this.bfs(start);
    let steps = 0;
    let node: Position | undefined = this.#finalNode;

    while (node && nodes[node]) {
      steps++;
      node = nodes[node];
    }

    this.#visited.clear();
    return steps;
  }
}

/**
 * @type {number} 1-26
 */
type Elevation = number;

const toElevation = (letter: string): Elevation =>
  Number(letter === 'S' ? 0 : letter === 'E' ? 27 : letter.charCodeAt(0) - 96);

const gridToNodes = (grid: number[][]) =>
  pipe(
    grid,
    map((row: number[], positionY) =>
      row.map((elevation, positionX): Node => ({ position: `${positionY}:${positionX}`, routes: [], elevation }))
    ),
    // map all directions
    map((row: Node[], _, nodes) =>
      row.map((node) => ({
        ...node,
        routes: [
          nodes[Number(node.position.split(':')[0]!) - 1]?.[Number(node.position.split(':')[1]!)]!,
          nodes[Number(node.position.split(':')[0]!) + 1]?.[Number(node.position.split(':')[1]!)]!,
          nodes[Number(node.position.split(':')[0]!)]?.[Number(node.position.split(':')[1]!) - 1]!,
          nodes[Number(node.position.split(':')[0]!)]?.[Number(node.position.split(':')[1]!) + 1]!
        ]
      }))
    ),
    // remove impossible directions
    map((row: Node[]) =>
      row.map((node: Node) => ({
        ...node,
        routes: node.routes.filter((r) => r && r.elevation <= node.elevation + 1)
      }))
    )
  );

const toNodes = flow(split('\n'), map(split('')), map(map(toElevation)), gridToNodes);

const getAllNodesElevation = (elevation: number) =>
  flow(
    flat<Node[]>,
    filter((n) => n.elevation === elevation)
  );

const getEndingNode = flow(
  flat<Node[]>,
  find((n) => n.elevation === 27)
);

const getNodesMap = (nodes: Node[][]): Map<Position, Position[]> =>
  nodes
    .flat()
    .map((node) => [node.position, node] as const)
    .reduce((nodesMap, [position, node]) => {
      return nodesMap.set(position, [...(nodesMap.get(position) ?? []), ...node.routes.map((n) => n.position)]);
    }, new Map<Position, Position[]>());

const getStepsFromElevation = (elevation: number) => (nodes: Node[][]) => {
  const startNodes = getAllNodesElevation(elevation)(nodes);
  const end = getEndingNode(nodes);
  const nodesMap = getNodesMap(nodes);

  return startNodes
    .map((startNode) => {
      return new Maze(nodesMap, end!.position).solve(startNode.position);
    })
    .filter(Number)
    .sort(sortNumberAsc)
    .at(0);
};

runner.run(flow(getStepsFromElevation(0)), toNodes);
runner.run(flow(getStepsFromElevation(1)), toNodes);
