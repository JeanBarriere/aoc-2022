import { first, flat, length, map, sort } from '@utils/array';
import { flow } from '@utils/function';
import { sortNumberDesc } from '@utils/number';
import { createAdventRunnerForDay } from '@utils/runner';
import { singleDigitList } from '@utils/transformers';

const runner = createAdventRunnerForDay(8);

const treesVisibleInRange = (arr: number[], tree: number, inclusive?: boolean) => {
  const idx = arr.findIndex((v) => v >= tree);

  if (idx === -1) {
    return arr.length;
  }
  return idx + Number(inclusive ?? 0);
};

const treesVisibleFromLeft = (row: number[], treeIndex: number, tree: number, inclusive?: boolean): number =>
  treesVisibleInRange(row.slice(0, treeIndex).reverse(), tree, inclusive);
const treesVisibleFromRight = (row: number[], treeIndex: number, tree: number, inclusive?: boolean): number =>
  treesVisibleInRange(row.slice(treeIndex + 1), tree, inclusive);
const treesVisibleFromTop = (col: number[], rowIndex: number, tree: number, inclusive?: boolean): number =>
  treesVisibleInRange(col.slice(0, rowIndex).reverse(), tree, inclusive);
const treesVisibleFromBottom = (col: number[], rowIndex: number, tree: number, inclusive?: boolean): number =>
  treesVisibleInRange(col.slice(rowIndex + 1), tree, inclusive);

runner.run(
  flow(
    map((row: number[], rowIndex, forest) =>
      row.filter((tree, treeIndex) => {
        return (
          treesVisibleFromLeft(row, treeIndex, tree) === treeIndex ||
          treesVisibleFromRight(row, treeIndex, tree) === row.length - treeIndex - 1 ||
          treesVisibleFromTop(
            forest.map((r) => r[treeIndex]!),
            rowIndex,
            tree
          ) === rowIndex ||
          treesVisibleFromBottom(
            forest.map((r) => r[treeIndex]!),
            rowIndex,
            tree
          ) ===
            forest.length - rowIndex - 1
        );
      })
    ),
    flat,
    length
  ),
  singleDigitList
);

runner.run(
  flow(
    map((row: number[], rowIndex, forest) =>
      row.map((tree, treeIndex, currentRow) => {
        return (
          treesVisibleFromLeft(currentRow, treeIndex, tree, true) *
          treesVisibleFromRight(currentRow, treeIndex, tree, true) *
          treesVisibleFromTop(
            forest.map((r) => r[treeIndex]!),
            rowIndex,
            tree,
            true
          ) *
          treesVisibleFromBottom(
            forest.map((r) => r[treeIndex]!),
            rowIndex,
            tree,
            true
          )
        );
      })
    ),
    flat,
    sort(sortNumberDesc),
    first
  ),
  singleDigitList
);
