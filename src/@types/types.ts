import { Character } from "./generated";

export type ReturnedCharacters = Record<string, Character>
export type TableData = [string, any][];
export type ChartData = [string, number, string][];