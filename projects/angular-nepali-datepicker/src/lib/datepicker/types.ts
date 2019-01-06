
export interface MonthData {
  0: number[];
  1: number[];
  2: number[];
  3: number[];
  4: number[];
  5: number[];
  6: number[];
}

export interface NepaliDate {
  day: number;
  month: number;
  year: number;
}


interface Values {
  default: string[];
  short?: string[];
  modern?: string[];
}

export interface MonthMapping {
  en: Values;
  ne: Values;
}

export interface DaysMapping {
  en: Values;
  ne: Values;
}

export interface WordsMapping {
  year: string;
  month: string;
}

export type DateFormatter = (date: NepaliDate) => string;
