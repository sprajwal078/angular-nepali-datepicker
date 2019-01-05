import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  date1: any;
  date2: any;
  date3: any;
  date4: any;
  date5: any;

  api: string[] = [
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
  [(ngModel)]="date4"
  language="en">
</np-datepicker>`
  ];
}
