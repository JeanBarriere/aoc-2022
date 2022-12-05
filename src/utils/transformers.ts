import { Transformer } from 'types';
import { split } from './string';

export const numbersList: Transformer<number[]> = (value: string) => value.split('\n').map(Number);

export const noTransformer: Transformer<string> = (value: string): string => value;

export const list: Transformer<string[]> = split('\n');
