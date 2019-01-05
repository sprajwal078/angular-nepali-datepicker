import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNp'
})
export class ToNpPipe implements PipeTransform {

  numberMapping = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  wordsMapping = {
    year: 'साल',
    month: 'महिना'
  };

  transform(value: number | string, language: string = 'ne', type: string = 'number'): any {
    if (value) {
      if (language === 'ne') {
        switch (type) {
          case 'number':
            const split = value.toString().split('');
            return split.map(n => {
              return this.numberMapping[+n] ? this.numberMapping[+n] : n;
            }).join('');
          case 'word':
            return this.wordsMapping[value.toString().toLowerCase()];
          default:
        }
      }
      return value;
    }
    return '';
  }

}
