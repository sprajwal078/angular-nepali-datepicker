import { TestBed } from '@angular/core/testing';
import { NgxNepaliDatepickerCoreService } from './ngx-nepali-datepicker-core.service';
import { NepaliDate } from './types';
import * as NepaliDateUtils from './nepali-date-utils'; // To spy on utility functions

describe('NgxNepaliDatepickerCoreService', () => {
  let service: NgxNepaliDatepickerCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxNepaliDatepickerCoreService]
    });
    service = TestBed.inject(NgxNepaliDatepickerCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodaysNepaliDate', () => {
    it('should return a valid NepaliDate object for today', () => {
      const todayAD = new Date(); // Current system date
      const expectedBS = NepaliDateUtils.convertToBS(todayAD); // Use the actual util for expected
      
      const result = service.getTodaysNepaliDate();
      expect(result).toEqual(expectedBS);
    });
  });

  describe('getNepaliDate (wrapper for convertToBS)', () => {
    it('should correctly convert an AD date to BS using the utility', () => {
      const adDate = new Date(2023, 4, 14); // May 14, 2023
      const expectedBsDate: NepaliDate = { year: 2080, month: 1, day: 1 }; // Jestha 1, 2080
      spyOn(NepaliDateUtils, 'convertToBS').and.returnValue(expectedBsDate);
      
      const result = service.getNepaliDate(adDate);
      expect(NepaliDateUtils.convertToBS).toHaveBeenCalledWith(adDate);
      expect(result).toEqual(expectedBsDate);
    });
  });

  describe('getEnglishDate (wrapper for convertToAD)', () => {
    it('should correctly convert a BS date to AD using the utility', () => {
      const bsDate: NepaliDate = { year: 2080, month: 1, day: 1 }; // Jestha 1, 2080
      const expectedAdDate = new Date(2023, 4, 14); // May 14, 2023
      spyOn(NepaliDateUtils, 'convertToAD').and.returnValue(expectedAdDate);

      const result = service.getEnglishDate(bsDate);
      expect(NepaliDateUtils.convertToAD).toHaveBeenCalledWith(bsDate);
      expect(result).toEqual(expectedAdDate);
    });
  });

  describe('getDaysInNepaliMonth (wrapper)', () => {
    it('should return correct days using the utility', () => {
      spyOn(NepaliDateUtils, 'getDaysInNepaliMonth').and.returnValue(32);
      const result = service.getDaysInNepaliMonth(2080, 1); // Jestha 2080
      expect(NepaliDateUtils.getDaysInNepaliMonth).toHaveBeenCalledWith(2080, 1);
      expect(result).toBe(32);
    });
  });

  describe('getNepaliMonthName', () => {
    it('should return correct English month names', () => {
      expect(service.getNepaliMonthName(0, 'en', 'default')).toBe('Baisakh');
      expect(service.getNepaliMonthName(0, 'en', 'short')).toBe('Bai');
    });
    it('should return correct Nepali month names', () => {
      expect(service.getNepaliMonthName(0, 'ne', 'default')).toBe('वैशाख');
      // Assuming short Nepali is same as default for this test, as per current service impl
      expect(service.getNepaliMonthName(0, 'ne', 'short')).toBe('वैशाख'); 
    });
  });

  describe('getNepaliDayName', () => {
    it('should return correct English day names', () => {
      expect(service.getNepaliDayName(0, 'en', 'default')).toBe('Sunday');
      expect(service.getNepaliDayName(0, 'en', 'short')).toBe('Sun');
    });
    it('should return correct Nepali day names', () => {
      expect(service.getNepaliDayName(0, 'ne', 'default')).toBe('आइतबार');
      expect(service.getNepaliDayName(0, 'ne', 'short')).toBe('आइत');
    });
  });
  
  describe('formatNepaliNumber', () => {
    it('should format numbers to Nepali digits', () => {
      expect(service.formatNepaliNumber(123)).toBe('१२३');
      expect(service.formatNepaliNumber(0)).toBe('०');
      expect(service.formatNepaliNumber(2080)).toBe('२०८०');
    });
  });

  describe('generateCalendarMonth', () => {
    // Baisakh 2080 (starts on a Friday - day 5 if Sunday is 0)
    // AD equivalent of Baisakh 1, 2080 is April 14, 2023 (Friday)
    // Days in Baisakh 2080: 31
    // Previous month: Chaitra 2079 (30 days)
    // Next month: Jestha 2080 (32 days)
    const year = 2080;
    const month = 0; // Baisakh (0-indexed)

    beforeEach(() => {
      // Mock getDayOfWeekBS to return a consistent start day for Baisakh 1, 2080
      // April 14, 2023 is a Friday. So day 5.
      spyOn(NepaliDateUtils, 'getDayOfWeekBS').and.callFake((bsDate: NepaliDate) => {
        if (bsDate.year === 2080 && bsDate.month === 0 && bsDate.day === 1) {
          return 5; // Friday
        }
        // Provide a fallback or more specific mocks if other dates are needed by generateCalendarMonth's internals
        const adDate = NepaliDateUtils.convertToAD(bsDate);
        return adDate.getDay();
      });
      // Mock convertToAD to ensure consistency if its actual implementation is flaky/placeholder
       spyOn(NepaliDateUtils, 'convertToAD').and.callFake((bsDate: NepaliDate) => {
        // This is a simplified mock. For real tests, you might need more date points
        if (bsDate.year === 2080 && bsDate.month === 0 && bsDate.day === 1) return new Date(2023, 3, 14); // Apr 14, 2023
        if (bsDate.year === 2079 && bsDate.month === 11) { // Chaitra 2079
            return new Date(2023, 2, 15 + bsDate.day -1); // Approx
        }
        if (bsDate.year === 2080 && bsDate.month === 1) { // Jestha 2080
             return new Date(2023, 4, 14 + bsDate.day -1); // Approx
        }
        return new Date(NaN); // Default for unmocked dates
      });
    });

    it('should generate a grid with the correct number of weeks and 7 days per week', () => {
      const calendarGrid = service.generateCalendarMonth(year, month);
      expect(calendarGrid.length).toBeGreaterThanOrEqual(4); // Usually 5 or 6 weeks
      expect(calendarGrid.length).toBeLessThanOrEqual(6);
      calendarGrid.forEach(week => {
        expect(week.length).toBe(7);
      });
    });

    it('should have correct starting padding days from previous month', () => {
      const calendarGrid = service.generateCalendarMonth(year, month);
      const firstWeek = calendarGrid[0];
      // Baisakh 1, 2080 is Friday (5). So 5 padding days.
      // Chaitra 2079 has 30 days.
      // Padding days: 26, 27, 28, 29, 30 (of Chaitra)
      const expectedPaddingDays = [
        { bsDay: 26, isCurrentMonth: false },
        { bsDay: 27, isCurrentMonth: false },
        { bsDay: 28, isCurrentMonth: false },
        { bsDay: 29, isCurrentMonth: false },
        { bsDay: 30, isCurrentMonth: false },
      ];
      for (let i = 0; i < 5; i++) {
        expect(firstWeek[i].bsDay).toBe(expectedPaddingDays[i].bsDay);
        expect(firstWeek[i].isCurrentMonth).toBe(false);
      }
    });

    it('should have correct days for the current month', () => {
      const calendarGrid = service.generateCalendarMonth(year, month);
      const daysInMonth = NepaliDateUtils.getDaysInNepaliMonth(year, month); // 31 for Baisakh 2080
      
      let currentMonthDaysCount = 0;
      let dayNumber = 1;
      calendarGrid.forEach(week => {
        week.forEach(day => {
          if (day.isCurrentMonth) {
            currentMonthDaysCount++;
            expect(day.bsDay).toBe(dayNumber);
            dayNumber++;
          }
        });
      });
      expect(currentMonthDaysCount).toBe(daysInMonth);
    });

     it('should have correct trailing padding days from next month', () => {
      const calendarGrid = service.generateCalendarMonth(year, month);
      const lastWeek = calendarGrid[calendarGrid.length - 1];
      
      let trailingDay = 1;
      let foundTrailing = false;
      for (let i = 0; i < lastWeek.length; i++) {
        if (!lastWeek[i].isCurrentMonth && lastWeek[i].bsDay > 0) { // Check bsDay > 0 to avoid issues with partially filled mock data
            foundTrailing = true;
            expect(lastWeek[i].bsDay).toBe(trailingDay);
            trailingDay++;
        }
      }
      expect(foundTrailing).toBe(true); // Ensure some trailing days were found and checked
    });
  });
});
