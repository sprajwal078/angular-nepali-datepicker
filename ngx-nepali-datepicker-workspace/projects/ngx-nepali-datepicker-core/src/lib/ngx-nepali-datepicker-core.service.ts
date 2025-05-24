import { Injectable } from '@angular/core';
import { NepaliDate, CalendarDay, CalendarMonthGrid } from './types';
import { 
  convertToBS as utilConvertToBS,
  convertToAD as utilConvertToAD,
  getDaysInNepaliMonth as utilGetDaysInNepaliMonth,
  getDayOfWeekBS as utilGetDayOfWeekBS
} from './nepali-date-utils';
import { 
  NEPALI_MONTHS_EN, 
  NEPALI_MONTHS_NE, 
  NEPALI_DIGITS,
  NEPALI_DAYS_EN_SHORT,
  NEPALI_DAYS_NE_SHORT,
  NEPALI_DAYS_EN,
  NEPALI_DAYS_NE
} from './mappings';


@Injectable({
  providedIn: 'root'
})
export class NgxNepaliDatepickerCoreService {

  constructor() { }

  public getTodaysNepaliDate(): NepaliDate {
    const todayAD = new Date();
    return this.getNepaliDate(todayAD);
  }

  public getNepaliDate(date: Date): NepaliDate {
    const bsDateParts = utilConvertToBS(date);
    return { year: bsDateParts.year, month: bsDateParts.month, day: bsDateParts.day };
  }

  public getEnglishDate(nepaliDate: NepaliDate): Date {
    const adDate = utilConvertToAD(nepaliDate);
    return adDate;
  }

  public getDaysInNepaliMonth(year: number, month: number): number { // month is 0-indexed
    return utilGetDaysInNepaliMonth(year, month);
  }

  public getNepaliMonthName(month: number, lang: 'en' | 'ne' = 'en', type: 'default' | 'modern' | 'short' = 'default'): string {
    // For 'modern' and 'short', English names are typically used as they are more common in mixed UIs
    // or are shorter. 'default' uses full Nepali names if lang is 'ne'.
    // This can be customized further based on actual requirements for 'modern'.
    if (lang === 'ne') {
      if (type === 'short') { // Assuming short for Nepali means the standard abbreviation if available, or full if not.
        // For simplicity, returning full Nepali name for 'short' as well, can be mapped to abbreviations if needed.
        return NEPALI_MONTHS_NE[month]; 
      }
      return NEPALI_MONTHS_NE[month]; // Default and Modern use full Nepali name
    } else { // lang === 'en'
      if (type === 'short') {
        return NEPALI_MONTHS_EN[month].substring(0, 3); // e.g., Bai, Jes
      }
      return NEPALI_MONTHS_EN[month]; // Default and Modern use full English name
    }
  }

  public getNepaliDayName(dayOfWeek: number, lang: 'en' | 'ne' = 'en', type: 'default' | 'short' = 'default'): string {
    // dayOfWeek is 0 for Sunday, 6 for Saturday
    if (lang === 'ne') {
      return type === 'short' ? NEPALI_DAYS_NE_SHORT[dayOfWeek] : NEPALI_DAYS_NE[dayOfWeek];
    } else { // lang === 'en'
      return type === 'short' ? NEPALI_DAYS_EN_SHORT[dayOfWeek] : NEPALI_DAYS_EN[dayOfWeek];
    }
  }
  
  public formatNepaliNumber(num: number): string {
    return String(num).split('').map(digit => NEPALI_DIGITS[parseInt(digit, 10)]).join('');
  }

  public generateCalendarMonth(bsYear: number, bsMonth: number): CalendarMonthGrid { // bsMonth is 0-indexed
    const numDaysInMonth = this.getDaysInNepaliMonth(bsYear, bsMonth);
    const firstDayOfMonthBS: NepaliDate = { year: bsYear, month: bsMonth, day: 1 };
    
    let firstDayOfWeek = -1;
    try {
      firstDayOfWeek = utilGetDayOfWeekBS(firstDayOfMonthBS); // 0 for Sunday, 6 for Saturday
    } catch (e) {
      // console.error("Error getting day of week, defaulting to Sunday (0)", e);
      firstDayOfWeek = 0; // Default to Sunday if conversion fails (e.g. out of range)
    }


    const calendarGrid: CalendarMonthGrid = [];
    let currentWeek: CalendarDay[] = [];
    
    let prevMonth = bsMonth - 1;
    let prevYear = bsYear;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const numDaysInPrevMonth = this.getDaysInNepaliMonth(prevYear, prevMonth);

    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = numDaysInPrevMonth - firstDayOfWeek + 1 + i;
      let adDateForPrevMonthDay = new Date(NaN); // Default to invalid date
      try {
        adDateForPrevMonthDay = this.getEnglishDate({ year: prevYear, month: prevMonth, day });
      } catch (e) { /* ignore, keep invalid date */ }

      currentWeek.push({
        bsDay: day,
        adDate: adDateForPrevMonthDay,
        isCurrentMonth: false,
        isDisabled: true,
      });
    }

    for (let day = 1; day <= numDaysInMonth; day++) {
      let adDateForCurrentMonthDay = new Date(NaN);
      try {
        adDateForCurrentMonthDay = this.getEnglishDate({ year: bsYear, month: bsMonth, day });
      } catch (e) { /* ignore */ }
      
      currentWeek.push({
        bsDay: day,
        adDate: adDateForCurrentMonthDay,
        isCurrentMonth: true,
      });

      if (currentWeek.length === 7) {
        calendarGrid.push(currentWeek);
        currentWeek = [];
      }
    }

    let nextMonth = bsMonth + 1;
    let nextYear = bsYear;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }
    let dayPadding = 1;
    while (currentWeek.length > 0 && currentWeek.length < 7) {
      let adDateForNextMonthDay = new Date(NaN);
      try {
         // Ensure dayPadding is valid for the next month before converting
        const daysInNextActualMonth = this.getDaysInNepaliMonth(nextYear, nextMonth);
        if (dayPadding <= daysInNextActualMonth) {
            adDateForNextMonthDay = this.getEnglishDate({ year: nextYear, month: nextMonth, day: dayPadding });
        } else {
            // This case should ideally not be hit if logic is perfect, but good for safety
        }
      } catch (e) { /* ignore */ }

      currentWeek.push({
        bsDay: dayPadding,
        adDate: adDateForNextMonthDay,
        isCurrentMonth: false,
        isDisabled: true,
      });
      dayPadding++;
    }
    if (currentWeek.length > 0 && currentWeek.length <= 7) { 
        calendarGrid.push(currentWeek);
    }
    
    // Ensure the grid is not empty if numDaysInMonth was 0 (should not happen with valid data)
    if (calendarGrid.length === 0 && numDaysInMonth === 0 && currentWeek.length > 0) {
        calendarGrid.push(currentWeek);
    }
    // Ensure last week is filled if partially filled and then pushed
    if (calendarGrid.length > 0) {
        let lastWeekRef = calendarGrid[calendarGrid.length -1];
        while(lastWeekRef.length < 7) {
            let adDateForPadding = new Date(NaN);
             try {
                const daysInNextActualMonth = this.getDaysInNepaliMonth(nextYear, nextMonth);
                if (dayPadding <= daysInNextActualMonth) {
                    adDateForPadding = this.getEnglishDate({ year: nextYear, month: nextMonth, day: dayPadding });
                }
            } catch (e) { /* ignore */ }
            lastWeekRef.push({
                bsDay: dayPadding,
                adDate: adDateForPadding,
                isCurrentMonth: false,
                isDisabled: true,
            });
            dayPadding++;
        }
    }

    return calendarGrid;
  }
}
