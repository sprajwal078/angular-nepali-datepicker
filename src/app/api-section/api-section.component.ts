import { Component } from '@angular/core';
import { ApiItem } from '../types';

@Component({
  selector: 'app-api-section',
  templateUrl: './api-section.component.html',
  styleUrls: ['./api-section.component.scss']
})
export class ApiSectionComponent {
  desc = `The DatePickerComponent is an input field that opens a
          datepicker interface to select the desired date`;

  inputs: ApiItem[] = [
    {
      name: 'alwaysVisible',
      description: 'Makes the datepicker panel always visible',
      type: 'boolean',
      default: 'false'
    },

    {
      name: 'monthDisplayType',
      description: `Display month name in different styles. Available values: 'default' | 'modern' | 'short' `,
      type: 'string',
      default: `'default'`
    },

    {
      name: 'dayDisplayType',
      description: `Display day name in different styles. Available values: 'default' | 'short'`,
      type: 'string',
      default: `'default'`
    },

    {
      name: 'hideInput',
      description: `Hide the datepicker input element. Useful when used with 'alwaysVisible' prop`,
      type: 'boolean',
      default: 'false'
    },

    {
      name: 'inputClass',
      description: `Set class to the input element`,
      type: 'string',
    },

    {
      name: 'language',
      description: `Display language of the interface. Available languages 'ne' | 'en'`,
      type: 'string',
      default: `'ne'`
    },

    {
      name: 'dateFormatter',
      description: `Format the selected date to display on the input element`,
      type: 'function'
    }
  ];
}
