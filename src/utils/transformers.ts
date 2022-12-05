import { identity } from './function';
import { split } from './string';

export const numbersList = (value: string) => value.split('\n').map(Number);

export const noTransformer = identity<string>;

export const list = split('\n');
