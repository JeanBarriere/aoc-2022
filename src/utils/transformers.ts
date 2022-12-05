import { split } from './string';

export const numbersList = (value: string) => value.split('\n').map(Number);

export const noTransformer = (value: string): string => value;

export const list = split('\n');
