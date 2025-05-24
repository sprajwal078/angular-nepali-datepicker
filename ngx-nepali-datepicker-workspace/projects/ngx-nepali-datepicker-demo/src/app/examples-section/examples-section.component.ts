import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExampleDemoComponent } from '../example-demo/example-demo.component';
import { NgxNepaliDatepickerCoreComponent } from '../../../ngx-nepali-datepicker-core/src/public-api';
import { NepaliDate } from '../../../ngx-nepali-datepicker-core/src/public-api';
import { NgxNepaliDatepickerCoreService } from '../../../ngx-nepali-datepicker-core/src/public-api'; // For custom formatter language

@Component({
  selector: 'app-examples-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExampleDemoComponent,
    NgxNepaliDatepickerCoreComponent
  ],
  templateUrl: './examples-section.component.html',
  styleUrls: ['./examples-section.component.css']
})
export class ExamplesSectionComponent {
  date1: NepaliDate | null = null;
  date2: NepaliDate | null = null;
  date3: NepaliDate | null = null;
  date4: NepaliDate | null = null;
  date5: NepaliDate | null = { year: 2080, month: 0, day: 15 }; // Initial Baisakh 15, 2080
  date6: NepaliDate | null = null;
  date7: NepaliDate | null = null;

  hideInputForAlwaysVisibleExample = false;

  constructor(private datepickerService: NgxNepaliDatepickerCoreService) {} // Inject service for formatter

  customDateFormatter = (date: NepaliDate | null): string => {
    if (!date) {
      return '';
    }
    // Example: २०८० साल, १ महिना, १५ गते (month is 0-indexed, so add 1)
    const year = this.datepickerService.formatNepaliNumber(date.year);
    const month = this.datepickerService.formatNepaliNumber(date.month + 1);
    const day = this.datepickerService.formatNepaliNumber(date.day);
    return `${year} साल, ${month} महिना, ${day} गते`;
  };

  exampleCodeSnippets = {
    ex1: `<ndp-ngx-nepali-datepicker-core [(ngModel)]="date1"></ndp-ngx-nepali-datepicker-core>`,
    ex2: `<ndp-ngx-nepali-datepicker-core [(ngModel)]="date2" monthDisplayType="modern"></ndp-ngx-nepali-datepicker-core>`,
    ex3: `<ndp-ngx-nepali-datepicker-core [(ngModel)]="date3" monthDisplayType="short" dayDisplayType="short"></ndp-ngx-nepali-datepicker-core>`,
    ex4: `<ndp-ngx-nepali-datepicker-core [(ngModel)]="date4" language="en"></ndp-ngx-nepali-datepicker-core>`,
    ex5: 
`<input type="checkbox" [(ngModel)]="hideInputForAlwaysVisibleExample" id="hideInputCheck">
<label for="hideInputCheck">Hide Input</label>
<ndp-ngx-nepali-datepicker-core 
  [(ngModel)]="date5" 
  [alwaysVisible]="true" 
  [hideInput]="hideInputForAlwaysVisibleExample">
</ndp-ngx-nepali-datepicker-core>`,
    ex6: 
`<ndp-ngx-nepali-datepicker-core 
  [(ngModel)]="date6" 
  [dateFormatter]="customDateFormatter" 
  inputClass="custom-input-class">
</ndp-ngx-nepali-datepicker-core>`,
    ex7: `<ndp-ngx-nepali-datepicker-core [(ngModel)]="date7" inputClass="demo-form-control"></ndp-ngx-nepali-datepicker-core>`
  };
}
