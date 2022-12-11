const isNumber = (value?: number): value is number => Boolean(value && !Number.isNaN(Number(value)));

export const sum = (left: number, right?: number) => left + (isNumber(right) ? right : left);
export const multiply = (left: number, right?: number) => left * (isNumber(right) ? right : left);

export const sortNumberDesc = (left: number, right: number) => right - left;
export const sortNumberAsc = (left: number, right: number) => left - right;
