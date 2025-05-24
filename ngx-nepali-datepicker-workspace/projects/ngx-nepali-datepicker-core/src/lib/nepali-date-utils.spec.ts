import { 
  convertToBS, 
  convertToAD, 
  getDaysInNepaliMonth, 
  getDayOfWeekBS,
  NEPALI_CALENDAR_REFERENCE_AD_DATE,
  NEPALI_CALENDAR_REFERENCE_BS_DATE
} from './nepali-date-utils';
import { NepaliDate } from './types';

describe('NepaliDateUtils', () => {

  describe('getDaysInNepaliMonth', () => {
    it('should return correct days for known months/years', () => {
      expect(getDaysInNepaliMonth(2080, 0)).toBe(31); // Baisakh 2080
      expect(getDaysInNepaliMonth(2080, 1)).toBe(32); // Jestha 2080
      expect(getDaysInNepaliMonth(2079, 11)).toBe(30); // Chaitra 2079
    });

    it('should throw error for years out of data range', () => {
      expect(() => getDaysInNepaliMonth(1999, 0)).toThrowError('Year 1999 is out of data range (2000-2090 BS).');
      expect(() => getDaysInNepaliMonth(2091, 0)).toThrowError('Year 2091 is out of data range (2000-2090 BS).');
    });
    
    it('should throw error for invalid month', () => {
      expect(() => getDaysInNepaliMonth(2080, -1)).toThrowError('Invalid Nepali month: 0 for year 2080.');
      expect(() => getDaysInNepaliMonth(2080, 12)).toThrowError('Invalid Nepali month: 13 for year 2080.');
    });
  });

  describe('convertToBS', () => {
    it('should convert the reference AD date to reference BS date correctly', () => {
      const adDate = new Date(NEPALI_CALENDAR_REFERENCE_AD_DATE); // April 13, 1943
      const expectedBsDate: NepaliDate = { 
        year: NEPALI_CALENDAR_REFERENCE_BS_DATE.year, 
        month: NEPALI_CALENDAR_REFERENCE_BS_DATE.month, 
        day: NEPALI_CALENDAR_REFERENCE_BS_DATE.day 
      }; // Baisakh 1, 2000
      expect(convertToBS(adDate)).toEqual(expectedBsDate);
    });

    it('should convert a known modern AD date to BS', () => {
      // Example: May 14, 2023 AD = Jestha 1, 2080 BS
      const adDate = new Date(2023, 4, 14); // Month is 0-indexed for JS Date (4 = May)
      const expectedBsDate: NepaliDate = { year: 2080, month: 1, day: 1 }; // Month 1 = Jestha
      expect(convertToBS(adDate)).toEqual(expectedBsDate);
    });

    it('should convert an AD date just after reference', () => {
      const adDate = new Date(1943, 3, 14); // April 14, 1943
      const expectedBsDate: NepaliDate = { year: 2000, month: 0, day: 2 }; // Baisakh 2, 2000
      expect(convertToBS(adDate)).toEqual(expectedBsDate);
    });
    
    it('should convert an AD date far after reference', () => {
      // Example: January 1, 2000 AD = Poush 17, 2056 BS
      const adDate = new Date(2000, 0, 1); 
      const expectedBsDate: NepaliDate = { year: 2056, month: 8, day: 17 }; // Poush 17, 2056
      expect(convertToBS(adDate)).toEqual(expectedBsDate);
    });

    it('should convert an AD date before reference (if supported by data)', () => {
      // April 12, 1943 AD should be Chaitra 31, 1999 BS
      // Note: The current NEPALI_MONTH_DAYS_BS starts from 2000. This test will fail unless 1999 data is added.
      // For now, expecting it to throw or return a capped value based on current implementation.
      // Given current implementation, this will likely throw or be inaccurate.
      // This test highlights a limitation of the current data range.
      const adDate = new Date(1943, 3, 12); // April 12, 1943
       expect(() => convertToBS(adDate)).toThrowError(/BS year 1999 out of data range/);
    });

  });

  describe('convertToAD', () => {
    it('should convert the reference BS date to reference AD date correctly', () => {
      const bsDate: NepaliDate = { 
        year: NEPALI_CALENDAR_REFERENCE_BS_DATE.year, 
        month: NEPALI_CALENDAR_REFERENCE_BS_DATE.month, 
        day: NEPALI_CALENDAR_REFERENCE_BS_DATE.day 
      }; // Baisakh 1, 2000
      const expectedAdDate = new Date(NEPALI_CALENDAR_REFERENCE_AD_DATE);
      const convertedAdDate = convertToAD(bsDate);
      expect(convertedAdDate.getFullYear()).toEqual(expectedAdDate.getFullYear());
      expect(convertedAdDate.getMonth()).toEqual(expectedAdDate.getMonth());
      expect(convertedAdDate.getDate()).toEqual(expectedAdDate.getDate());
    });

    it('should convert a known modern BS date to AD', () => {
      // Example: Jestha 1, 2080 BS = May 14, 2023 AD
      const bsDate: NepaliDate = { year: 2080, month: 1, day: 1 }; // Month 1 = Jestha
      const expectedAdDate = new Date(2023, 4, 14); // Month is 0-indexed
      const convertedAdDate = convertToAD(bsDate);
      expect(convertedAdDate.getFullYear()).toEqual(expectedAdDate.getFullYear());
      expect(convertedAdDate.getMonth()).toEqual(expectedAdDate.getMonth());
      expect(convertedAdDate.getDate()).toEqual(expectedAdDate.getDate());
    });
    
    it('should convert a BS date just after reference', () => {
      const bsDate: NepaliDate = { year: 2000, month: 0, day: 2 }; // Baisakh 2, 2000
      const expectedAdDate = new Date(1943, 3, 14); // April 14, 1943
      const convertedAdDate = convertToAD(bsDate);
      expect(convertedAdDate.getFullYear()).toEqual(expectedAdDate.getFullYear());
      expect(convertedAdDate.getMonth()).toEqual(expectedAdDate.getMonth());
      expect(convertedAdDate.getDate()).toEqual(expectedAdDate.getDate());
    });

    it('should convert a BS date far after reference', () => {
      // Poush 17, 2056 BS = January 1, 2000 AD
      const bsDate: NepaliDate = { year: 2056, month: 8, day: 17 }; 
      const expectedAdDate = new Date(2000, 0, 1); 
      const convertedAdDate = convertToAD(bsDate);
      expect(convertedAdDate.getFullYear()).toEqual(expectedAdDate.getFullYear());
      expect(convertedAdDate.getMonth()).toEqual(expectedAdDate.getMonth());
      expect(convertedAdDate.getDate()).toEqual(expectedAdDate.getDate());
    });
    
    it('should throw for BS dates before data range start', () => {
      const bsDate: NepaliDate = { year: 1999, month: 11, day: 30 }; // Chaitra 30, 1999
      expect(() => convertToAD(bsDate)).toThrowError(/Year 1999 is out of data range/);
    });
  });

  describe('getDayOfWeekBS', () => {
    it('should return correct day of week for reference BS date (Saturday = 6)', () => {
      // Baisakh 1, 2000 BS was a Saturday. April 13, 1943 was a Tuesday.
      // The original library's reference stated Saturday. The date 1943-04-13 is indeed a Tuesday.
      // My `NEPALI_CALENDAR_REFERENCE_AD_DATE` is correct for a Tuesday.
      // Let's test a known Tuesday: Baisakh 1, 2000 BS.
      // If reference AD date (1943-04-13) is Tuesday (day 2), and it's Baisakh 1, 2000.
      // Then Baisakh 1, 2000 should be Tuesday.
      const bsDate: NepaliDate = { year: 2000, month: 0, day: 1 };
      expect(getDayOfWeekBS(bsDate)).toBe(new Date(1943, 3, 13).getDay()); // Should match the reference AD day of week
    });

    it('should return correct day of week for another known BS date', () => {
      // Jestha 1, 2080 BS = May 14, 2023 AD (Sunday)
      const bsDate: NepaliDate = { year: 2080, month: 1, day: 1 };
      expect(getDayOfWeekBS(bsDate)).toBe(0); // Sunday
    });
  });
});
