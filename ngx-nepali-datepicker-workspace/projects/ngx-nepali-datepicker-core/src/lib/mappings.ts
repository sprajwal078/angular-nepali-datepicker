export const NEPALI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export const NEPALI_MONTHS_EN = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik',
  'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

export const NEPALI_MONTHS_NE = [
  'वैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन', 'कार्तिक',
  'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत'
];

export const NEPALI_DAYS_EN_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const NEPALI_DAYS_NE_SHORT = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];

export const NEPALI_DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const NEPALI_DAYS_NE = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'];

export const NEPALI_WORDS = {
  YEAR_EN: 'Year',
  MONTH_EN: 'Month',
  YEAR_NE: 'वर्ष',
  MONTH_NE: 'महिना'
};

// For mapping days in a month (e.g., Ashadh has 31 days in 2079 BS)
// This will be the core data for BS calendar.
// For now, this will be a placeholder. The actual data is extensive.
// The service will need a function to get days in a specific BS month and year.
export const NEPALI_MONTH_DAYS_BS = {
  // Example: year_bs: [days_in_Baisakh, days_in_Jestha, ..., days_in_Chaitra]
  2079: [31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 29, 30],
  2080: [31, 32, 31, 32, 31, 30, 29, 30, 29, 30, 30, 30],
  2081: [30, 32, 31, 32, 31, 30, 29, 30, 29, 30, 30, 30], // Placeholder
  // ... more years would be needed
};

// Reference date: April 13, 1943 AD is Baisakh 1, 2000 BS (Saturday)
export const NEPALI_CALENDAR_REFERENCE = {
  adYear: 1943,
  adMonth: 3, // 0-indexed April
  adDay: 13,
  bsYear: 2000,
  bsMonth: 0, // 0-indexed Baisakh
  bsDay: 1,
  dayOfWeek: 6 // Saturday (0 for Sunday)
};
