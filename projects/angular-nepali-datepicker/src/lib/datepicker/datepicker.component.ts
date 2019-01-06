import { Component, OnInit, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import * as NepaliDateConverter from 'nepali-date';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NepaliDate, MonthData, DaysMapping, MonthMapping, DateFormatter } from './types';
import { daysMapping, monthsMapping } from './mapping';

@Component({
  selector: 'np-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {

  nepaliDateToday: NepaliDate = { day: 0, month: 0, year: 0 };
  currentNepaliDate: NepaliDate = { day: 0, month: 0, year: 0 };
  selectedDate: NepaliDate;
  formattedDate = '';
  currentDate = new Date();

  displayDate: string;

  years: number[] = [];

  currentMonthData: MonthData;

  daysMapping: DaysMapping = daysMapping;

  monthsMapping: MonthMapping = monthsMapping;

  isOpen = false;

  @Input()
  hideInput = false;

  @Input()
  alwaysVisible = false;

  @Input()
  inputClass: string;

  @Input()
  language: 'en' | 'ne' = 'ne';

  @Input()
  monthDisplayType: 'default' | 'modern' | 'short' = 'default';

  @Input()
  dayDisplayType: 'default' | 'short' = 'default';

  @Input()
  dateFormatter: DateFormatter = (selectedDate: NepaliDate) => {
    const dd = selectedDate.day < 10 ? '0' + selectedDate.day : selectedDate.day;
    const mm = selectedDate.month < 10 ? '0' + selectedDate.month : selectedDate.month;
    return `${dd}/${mm}/${this.selectedDate.year}`;
  }

  constructor() { }

  ngOnInit() {
    const nepaliDateToday = new NepaliDateConverter(new Date());
    this.nepaliDateToday = {
      year: nepaliDateToday.getYear(),
      month: nepaliDateToday.getMonth(),
      day: nepaliDateToday.getDate()
    };

    this.setCurrentDate();
    this.populateYears();
    this.setCurrentMonthData();
  }

  setCurrentDate() {
    let currentNepaliDate;
    if (!this.selectedDate) {
      currentNepaliDate = new NepaliDateConverter(this.currentDate);
    } else {
      const { year, month, day } = this.selectedDate;
      currentNepaliDate = new NepaliDateConverter(year, month, day);
      this.currentDate = currentNepaliDate.getEnglishDate();
    }
    this.currentNepaliDate = {
      year: currentNepaliDate.getYear(),
      month: currentNepaliDate.getMonth(),
      day: currentNepaliDate.getDate()
    };
  }

  populateYears() {
    for (let i = 2001; i <= 2088; i++) {
      this.years.push(i);
    }
  }

  resetCurrentMonthData() {
    this.currentMonthData = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
  }

  formatValue() {
    if (this.selectedDate) {
      this.formattedDate = this.dateFormatter(this.selectedDate);
    }
  }

  propagateChange = (_: any) => { };

  propagateTouch = (_: any) => { };

  writeValue(value: any) {
    if (value) {
      this.selectedDate = value;
      this.formatValue();
    }
  }

  registerOnTouched() { }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  setCurrentMonthData() {
    this.resetCurrentMonthData();
    // fill the currentMonthData with current date
    const day = this.currentDate.getDay();
    this.currentMonthData[day] = [this.currentNepaliDate.day];

    // fill the currentMonthData with day before the current date
    this.setMonthDataBefore(day - 1, this.currentNepaliDate.day - 1);

    // fill the currentMonthData with day after the current date
    this.setMonthDataAfter(day + 1, this.currentNepaliDate.day + 1);

    // we need some empty spaces in place so that the dates are shown in correct order
    // eg if the 1st day starts on monday then we need 1 empty space for non existingn date on Sunday
    this.createEmptySpaces();
  }

  setMonthDataBefore(day, date) {
    if (date >= 1) {
      if (day < 0) {
        day = 6;
      }
      this.currentMonthData[day] = [date, ...this.currentMonthData[day]];
      this.setMonthDataBefore(--day, --date);
    }
  }

  setMonthDataAfter(day, date) {
    const nepaliDate = new NepaliDateConverter(this.currentNepaliDate.year, this.currentNepaliDate.month, date);
    //  only add the data if the current month matches
    if (nepaliDate.getMonth() === this.currentNepaliDate.month) {
      if (day > 6) {
        day = 0;
      }
      this.currentMonthData[day] = [...this.currentMonthData[day], date];
      this.setMonthDataAfter(++day, ++date);
    }
  }

  createEmptySpaces() {
    // first find out which day has the 1st
    //  if its a Sunday, then don't do anything else add 1 space on each previous day
    let dayIndex = 0;
    Object.values(this.currentMonthData).find((value, index) => {
      if (value.includes(1)) {
        dayIndex = index;
      }
      return value.includes(1);
    });

    if (dayIndex) {
      for (dayIndex; dayIndex > 0; dayIndex--) {
        const monthData = this.currentMonthData[dayIndex - 1];
        this.currentMonthData[dayIndex - 1] = [null, ...monthData];
      }
    }
  }

  selectDate(day: number) {
    this.selectedDate = { ...this.currentNepaliDate, day };
    this.formatValue();
    this.close();
    this.propagateChange(this.selectedDate);
  }

  selectYear(year: string) {
    this.currentNepaliDate.year = +year;
    const newDate = new NepaliDateConverter(this.currentNepaliDate.year, this.currentNepaliDate.month, this.currentNepaliDate.day);
    this.currentDate = newDate.getEnglishDate();
    this.setCurrentMonthData();
  }

  selectMonth(month: string) {
    this.currentNepaliDate.month = this.monthsMapping[this.language][this.monthDisplayType].indexOf(month);
    const newDate = new NepaliDateConverter(this.currentNepaliDate.year, this.currentNepaliDate.month, this.currentNepaliDate.day);
    this.currentDate = newDate.getEnglishDate();
    this.setCurrentMonthData();
  }

  toggleOpen() {
    if (!this.alwaysVisible) {
      this.isOpen = !this.isOpen;
    }
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.setCurrentDate();
  }

}
