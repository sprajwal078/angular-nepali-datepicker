import { MonthMapping, DaysMapping, WordsMapping } from './types';

export const numberMapping: string[] = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export const wordsMapping: WordsMapping = {
  year: 'साल',
  month: 'महिना'
};

export const daysMapping: DaysMapping = {
  en: {
    default: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  },
  ne: {
    default: ['आइत', 'सोम', 'मंगल्', 'बुध', 'बिही', 'शुक्र', 'शनि'],
    short: ['आ', 'सो', 'मं', 'बु', 'बि', 'शु', 'श']
  }
};

export const monthsMapping: MonthMapping = {
  en: {
    default: [
      'Baisakh', 'Jestha', 'Asadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Marga', 'Falgun', 'Chaitra'
    ],
    modern: [
      'Baisakh', 'Jeth', 'Asaar', 'Saawn', 'Bhadau', 'Aashoj', 'Kartik', 'Mangsir', 'Push', 'Magh', 'Fagun', 'Chait'
    ],
    short: [
      'Bai', 'Jes', 'Asa', 'Shr', 'Bha', 'Ash', 'Kar', 'Man', 'Pou', 'Mar', 'Fal', 'Cha'
    ]
  },
  ne: {
    default: [
      'बैशाख', 'जेष्ठ', 'आषाढ', 'श्रवण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'मार्ग', 'फाल्गुन', 'चैत्र'
    ],
    modern: [
      'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'अशोज', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
    ],
    short: [
      'बै', 'जे', 'अ', 'श्रा', 'भा', 'आ', 'का', 'मं', 'पौ', 'मा', 'फा', 'चै'
    ]
  }
};
