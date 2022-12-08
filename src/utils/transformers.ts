import { map } from './array';
import { flow, identity } from './function';
import { split } from './string';

export const numbersList = (value: string) => value.split('\n').map(Number);

export const singleDigitList = flow(split('\n'), map(flow(split(''), map(Number))));

export const noTransformer = identity<string>;

export const list = split('\n');
