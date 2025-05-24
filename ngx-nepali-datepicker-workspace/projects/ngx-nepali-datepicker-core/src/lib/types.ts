export interface NepaliDate {
  year: number;
  month: number; // 0-indexed (Baisakh = 0, Chaitra = 11)
  day: number;
}

export interface NepaliDateMonthInfo {
  bsMonth: string;
  bsMonthDays: number;
  bsYear: number;
  bsDaysInMonth: { dayInWeek: number, day: number }[];
}

export interface CalendarDay {
  day: number;
  weekDay: number; // 0 for Sunday, 6 for Saturday
  isCurrentMonth: boolean;
  nepaliDate?: NepaliDate; // Optional: corresponding NepaliDate
  adDate?: Date; // Optional: corresponding AD Date
}

export interface BikramSambatDate {
  npYear: number;
  npMonth: number; // 0-indexed
  npDay: number;
}

export interface EnglishDate {
  year: number;
  month: number; // 0-indexed
  day: number;
}
