import { Component } from '@angular/core';
import { NepaliDate, DateFormatter } from 'angular-nepali-datepicker';

@Component({
  selector: 'app-examples-section',
  templateUrl: './examples-section.component.html',
  styleUrls: ['./examples-section.component.scss']
})
export class ExamplesSectionComponent {

  date1: any;
  date2: any;
  date3: any;
  date4: any;
  date5: any;
  date6: any;
  date7: any;
  date8: any;
  date9: any;
  date10: any;

  hideInput = false;

  api: any[] = [
`
<np-datepicker [(ngModel)]="date"></np-datepicker>
`,

`
<np-datepicker
  [(ngModel)]="date"
  monthDisplayType="modern">
</np-datepicker>
`,

`
<np-datepicker
  [(ngModel)]="date"
  monthDisplayType="short"
  dayDisplayType="short">
</np-datepicker>
`,

    `
<np-datepicker
  [(ngModel)]="date"
  language="en">
</np-datepicker>
`,

    {
      'true': `
<np-datepicker
  [(ngModel)]="date"
  alwaysVisible="true">
</np-datepicker>
`,
      'false': `
<np-datepicker
  [(ngModel)]="date"
  alwaysVisible="true"
  hideInput="true">
</np-datepicker>
`
    },
`
// in your component
import { NepaliDate, DateFormatter } from 'angular-nepali-datepicker';

formatter: DateFormatter = (date) => {
  return \`\${ date.year } साल, \${ date.month } महिना, \${ date.day } गते\`;
}

// in your template
<np-datepicker
  [(ngModel)]="date"
  [dateFormatter]="formatter">
</np-datepicker>
`,
    `
<np-datepicker
  [(ngModel)]="date"
  class="form-group"
  inputClass="form-control">
</np-datepicker>
`
  ];

  formatter: DateFormatter = (date) => {
    return `${date.year} साल, ${date.month} महिना, ${date.day} गते`;
  }

}
