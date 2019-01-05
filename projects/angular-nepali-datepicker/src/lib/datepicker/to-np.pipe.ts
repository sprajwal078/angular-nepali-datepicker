import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNp'
})
export class ToNpPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
