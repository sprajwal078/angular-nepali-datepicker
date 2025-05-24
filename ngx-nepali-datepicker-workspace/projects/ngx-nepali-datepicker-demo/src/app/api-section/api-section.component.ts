import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDemoComponent, ApiItem } from '../api-demo/api-demo.component'; // Import ApiItem as well

@Component({
  selector: 'app-api-section',
  standalone: true,
  imports: [
    CommonModule,
    ApiDemoComponent
  ],
  templateUrl: './api-section.component.html',
  styleUrls: ['./api-section.component.css']
})
export class ApiSectionComponent {
  datepickerApiDescription = 'A flexible and themeable Nepali datepicker component for Angular applications. It allows users to select dates in the Bikram Sambat (BS) calendar system and can be integrated into forms using ControlValueAccessor.';

  datepickerInputs: ApiItem[] = [
    {
      name: 'hideInput',
      type: 'boolean',
      default: 'false',
      description: 'When set to true, the default input field of the datepicker is hidden. Useful for creating custom input solutions or when the calendar is always visible.'
    },
    {
      name: 'alwaysVisible',
      type: 'boolean',
      default: 'false',
      description: 'When set to true, the calendar part of the datepicker remains always visible on the page, instead of being a popup.'
    },
    {
      name: 'inputClass',
      type: 'string',
      default: "''",
      description: 'Custom CSS class(es) to be applied to the datepicker input field. Allows for easy integration with existing form styling (e.g., Bootstrap form-control).'
    },
    {
      name: 'language',
      type: "'en' | 'ne'",
      default: "'ne'",
      description: "Sets the language for displaying month names, day names, and numerals. 'en' for English, 'ne' for Nepali."
    },
    {
      name: 'monthDisplayType',
      type: "'default' | 'modern' | 'short'",
      default: "'default'",
      description: "Determines how month names are displayed. 'default': Full name (e.g., Baisakh / वैशाख). 'modern': Typically full English name. 'short': Abbreviated name (e.g., Bai / वै). (Note: Current service implementation for 'modern' and 'short' Nepali might show full names; this can be customized further)."
    },
    {
      name: 'dayDisplayType',
      type: "'default' | 'short'",
      default: "'default'",
      description: "Determines how weekday names are displayed in the calendar header. 'default': Full name (e.g., Sunday / आइतबार). 'short': Abbreviated name (e.g., Sun / आइत)."
    },
    {
      name: 'dateFormatter',
      type: '(date: NepaliDate | null) => string',
      default: 'Formats as YYYY/MM/DD in BS, respecting language for numerals.',
      description: 'A custom function to format the selected NepaliDate object into a string for display in the input field. If not provided, a default formatter (YYYY/MM/DD) is used.'
    }
  ];

  // Outputs and methods can be added here later if needed for the API documentation
  // datepickerOutputs: ApiItem[] = [ /* ... */ ];
  // datepickerMethods: ApiItem[] = [ /* ... */ ];

  constructor() {}
}
