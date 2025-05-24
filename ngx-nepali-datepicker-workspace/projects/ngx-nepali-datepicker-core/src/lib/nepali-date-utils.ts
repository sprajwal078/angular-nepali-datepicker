import { NepaliDate } from './types';

// Data for days in each Nepali month (BS) - From nepali-date-converter's date-config.ts
// BS Year: [Baisakh, Jestha, Asar, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, Chaitra]
// Month is 0-indexed internally (Baisakh=0, Chaitra=11)
export const NEPALI_MONTH_DAYS_BS: { [year: number]: number[] } = {
  2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2022: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
  2084: [30, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2085: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2086: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2087: [31, 31, 32, 31, 32, 30, 30, 29, 30, 30, 30, 30],
  2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]
};

export const NEPALI_CALENDAR_REFERENCE_AD_DATE = new Date(1943, 3, 13); // April 13, 1943 AD (month is 0-indexed for JS Date)
export const NEPALI_CALENDAR_REFERENCE_BS_DATE: NepaliDate = { year: 2000, month: 0, day: 1 }; // Baisakh 1, 2000 BS (month is 0-indexed)

const MS_IN_DAY = 1000 * 60 * 60 * 24;

export function getDaysInNepaliMonth(bsYear: number, bsMonth: number): number { // bsMonth is 0-indexed
  const yearData = NEPALI_MONTH_DAYS_BS[bsYear];
  if (!yearData) {
    throw new Error(`Year ${bsYear} is out of data range (2000-2090 BS).`);
  }
  const days = yearData[bsMonth];
  if (days === undefined) {
    throw new Error(`Invalid Nepali month: ${bsMonth + 1} for year ${bsYear}.`);
  }
  return days;
}

export function convertToBS(adDate: Date): NepaliDate {
  const targetAdYear = adDate.getFullYear();
  const targetAdMonth = adDate.getMonth(); // 0-indexed
  const targetAdDay = adDate.getDate();

  // Create a new Date object for the target AD date to avoid modifying the input
  const currentAdDate = new Date(targetAdYear, targetAdMonth, targetAdDay);

  // Calculate the number of days passed since the reference AD date
  // Ensure time components are zeroed out for accurate day difference
  const refAdEpoch = new Date(
    NEPALI_CALENDAR_REFERENCE_AD_DATE.getFullYear(),
    NEPALI_CALENDAR_REFERENCE_AD_DATE.getMonth(),
    NEPALI_CALENDAR_REFERENCE_AD_DATE.getDate()
  ).getTime();
  const targetAdEpoch = currentAdDate.getTime();
  let daysDiff = Math.floor((targetAdEpoch - refAdEpoch) / MS_IN_DAY);

  let bsYear = NEPALI_CALENDAR_REFERENCE_BS_DATE.year;
  let bsMonth = NEPALI_CALENDAR_REFERENCE_BS_DATE.month; // 0-indexed
  let bsDay = NEPALI_CALENDAR_REFERENCE_BS_DATE.day;

  if (daysDiff >= 0) {
    // Target AD date is after or same as reference AD date
    bsDay += daysDiff;
    while (true) {
      const daysInCurrentBsMonth = getDaysInNepaliMonth(bsYear, bsMonth);
      if (bsDay <= daysInCurrentBsMonth) {
        break;
      }
      bsDay -= daysInCurrentBsMonth;
      bsMonth++;
      if (bsMonth >= 12) {
        bsMonth = 0;
        bsYear++;
        if (!NEPALI_MONTH_DAYS_BS[bsYear]) {
          throw new Error(`BS year ${bsYear} out of data range during AD to BS conversion (target future).`);
        }
      }
    }
  } else {
    // Target AD date is before reference AD date
    daysDiff = Math.abs(daysDiff);
    while (daysDiff > 0) {
      if (daysDiff < bsDay) {
        bsDay -= daysDiff;
        daysDiff = 0;
      } else {
        daysDiff -= bsDay; // Consume days from current bsDay down to 1
        bsMonth--;
        if (bsMonth < 0) {
          bsMonth = 11;
          bsYear--;
          if (!NEPALI_MONTH_DAYS_BS[bsYear]) {
            throw new Error(`BS year ${bsYear} out of data range during AD to BS conversion (target past).`);
          }
        }
        bsDay = getDaysInNepaliMonth(bsYear, bsMonth); // Days in the new (previous) month
      }
    }
  }
  return { year: bsYear, month: bsMonth, day: bsDay };
}

export function convertToAD(bsDate: NepaliDate): Date {
  if (!NEPALI_MONTH_DAYS_BS[bsDate.year] || bsDate.month < 0 || bsDate.month > 11 || bsDate.day < 1 || bsDate.day > getDaysInNepaliMonth(bsDate.year, bsDate.month)) {
    throw new Error(`Invalid BS Date: Year ${bsDate.year}, Month ${bsDate.month + 1}, Day ${bsDate.day}`);
  }

  let totalBsDaysSinceReference = 0;

  // Calculate days from reference BS date to input bsDate
  if (bsDate.year >= NEPALI_CALENDAR_REFERENCE_BS_DATE.year) {
    // Target BS date is after or same year as reference BS date
    for (let y = NEPALI_CALENDAR_REFERENCE_BS_DATE.year; y <= bsDate.year; y++) {
      const startMonth = (y === NEPALI_CALENDAR_REFERENCE_BS_DATE.year) ? NEPALI_CALENDAR_REFERENCE_BS_DATE.month : 0;
      const endMonth = (y === bsDate.year) ? bsDate.month : 11;

      for (let m = startMonth; m <= endMonth; m++) {
        const daysInCurrentMonth = getDaysInNepaliMonth(y, m);
        if (y === NEPALI_CALENDAR_REFERENCE_BS_DATE.year && m === NEPALI_CALENDAR_REFERENCE_BS_DATE.month) {
          if (y === bsDate.year && m === bsDate.month) { // Target is in the same month as reference
            totalBsDaysSinceReference += (bsDate.day - NEPALI_CALENDAR_REFERENCE_BS_DATE.day);
          } else {
            totalBsDaysSinceReference += (daysInCurrentMonth - NEPALI_CALENDAR_REFERENCE_BS_DATE.day + 1);
          }
        } else if (y === bsDate.year && m === bsDate.month) {
          totalBsDaysSinceReference += bsDate.day;
        } else {
          totalBsDaysSinceReference += daysInCurrentMonth;
        }
      }
    }
  } else {
    // Target BS date is before reference BS date
    for (let y = NEPALI_CALENDAR_REFERENCE_BS_DATE.year - 1; y >= bsDate.year; y--) {
      for (let m = 11; m >= 0; m--) {
        totalBsDaysSinceReference -= getDaysInNepaliMonth(y, m);
      }
    }
    // Days in reference year, before reference month
    for (let m = NEPALI_CALENDAR_REFERENCE_BS_DATE.month - 1; m >= 0; m--) {
      totalBsDaysSinceReference -= getDaysInNepaliMonth(NEPALI_CALENDAR_REFERENCE_BS_DATE.year, m);
    }
     totalBsDaysSinceReference -= (NEPALI_CALENDAR_REFERENCE_BS_DATE.day -1);


    // Add days from target year up to target month/day
    for (let m = 0; m < bsDate.month; m++) {
        totalBsDaysSinceReference -= getDaysInNepaliMonth(bsDate.year, m);
    }
    totalBsDaysSinceReference -= (getDaysInNepaliMonth(bsDate.year, bsDate.month) - bsDate.day);
  }
  
  const resultAdDate = new Date(NEPALI_CALENDAR_REFERENCE_AD_DATE.getTime());
  resultAdDate.setDate(resultAdDate.getDate() + totalBsDaysSinceReference);
  return resultAdDate;
}

export function getDayOfWeekBS(bsDate: NepaliDate): number {
  const adDate = convertToAD(bsDate);
  if (isNaN(adDate.getTime())) {
      throw new Error("Could not convert BS date to AD to determine day of week.");
  }
  return adDate.getDay(); // 0 for Sunday, 6 for Saturday
}
