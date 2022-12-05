import { createAdventRunnerForDay } from '@utils/runner';

const runner = createAdventRunnerForDay(2);

enum Shape {
  Rock = 1,
  Paper = 2,
  Scissors = 3
}

enum Result {
  Win = 6,
  Draw = 3,
  Lose = 0
}

type Opponent = 'A' | 'B' | 'C';
type Me = 'X' | 'Y' | 'Z';

const mapOpponent = (opponent: Opponent): Shape => {
  switch (opponent) {
    case 'A':
      return Shape.Rock;
    case 'B':
      return Shape.Paper;
    case 'C':
      return Shape.Scissors;
  }
};
const mapMe = (me: Me): Shape => {
  switch (me) {
    case 'X':
      return Shape.Rock;
    case 'Y':
      return Shape.Paper;
    case 'Z':
      return Shape.Scissors;
  }
};

const mapMeResult = (me: Me): Result => {
  switch (me) {
    case 'X':
      return Result.Lose;
    case 'Y':
      return Result.Draw;
    case 'Z':
      return Result.Win;
  }
};

type Guide = [Shape, Shape][];
type GuideResult = [Shape, Result][];

const extractGuideResult = (value: string): GuideResult =>
  value
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [opponent, me] = line.split(' ');

      return [mapOpponent(opponent as Opponent), mapMeResult(me as Me)];
    });

const extractGuide = (value: string): Guide =>
  value
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [opponent, me] = line.split(' ');

      return [mapOpponent(opponent as Opponent), mapMe(me as Me)];
    });

const pointsOf = (shapeOrResult: Shape | Result): number => {
  return shapeOrResult;
};

const win = (left: Shape, right: Shape): boolean => {
  return pointsOf(right) - pointsOf(left) === 1 || pointsOf(right) - pointsOf(left) === -2;
};

const draw = (left: Shape, right: Shape): boolean => {
  return pointsOf(right) - pointsOf(left) === 0;
};

const betterThan = (shape: Shape): Shape => {
  return shape + 1 > 3 ? 1 : shape + 1;
  // switch (shape) {
  //   case Shape.Rock:
  //     return Shape.Paper;
  //   case Shape.Paper:
  //     return Shape.Scissors;
  //   case Shape.Scissors:
  //     return Shape.Rock;
  // }
};

const worseThan = (shape: Shape): Shape => {
  return shape - 1 < 1 ? 3 : shape - 1;
  // switch (shape) {
  //   case Shape.Rock:
  //     return Shape.Scissors;
  //   case Shape.Paper:
  //     return Shape.Rock;
  //   case Shape.Scissors:
  //     return Shape.Paper;
  // }
};

const isWinResult = (result: Result): boolean => result === Result.Win;
const isDrawResult = (result: Result): boolean => result === Result.Draw;

const evalPartyPoint = ([left, right]: [left: Shape, right: Shape]): number => {
  return pointsOf(right) + (win(left, right) ? 6 : draw(left, right) ? 3 : 0);
};

const evalGuidedPoint = ([left, right]: [left: Shape, right: Result]): number => {
  return (
    pointsOf(right) +
    (isWinResult(right) ? pointsOf(betterThan(left)) : isDrawResult(right) ? pointsOf(left) : pointsOf(worseThan(left)))
  );
};

const sum = (left: number, right: number) => left + right;

runner.run((guide) => guide.map(evalPartyPoint).reduce(sum), extractGuide);

runner.run((guide) => guide.map(evalGuidedPoint).reduce(sum), extractGuideResult);
