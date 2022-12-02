import { Transformer } from "types";

export const numbersList: Transformer<number[]> = (value: string) => value.split("\n").map(Number);

export const noTransformer: Transformer<string> = (
  value: string
): string => value;

export const list: Transformer<string[]> = (value: string) => value.split("\n").filter(Boolean)
