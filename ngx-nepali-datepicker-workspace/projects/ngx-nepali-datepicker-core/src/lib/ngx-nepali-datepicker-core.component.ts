import { Component, Input, forwardRef, OnInit, HostListener, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgxNepaliDatepickerCoreService } from './ngx-nepali-datepicker-core.service';
import { NepaliDate, CalendarMonthGrid, CalendarDay } from './types';
import { NEPALI_MONTH_DAYS_BS } from './nepali-date-utils';

@Component({
  selector: 'ndp-ngx-nepali-datepicker-core',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ngx-nepali-datepicker-core.component.html',
  styleUrls: ['./ngx-nepali-datepicker-core.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxNepaliDatepickerCoreComponent),
      multi: true
    }
  ]
})
export class NgxNepaliDatepickerCoreComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() hideInput: boolean = false;
  @Input() alwaysVisible: boolean = false;
  @Input() inputClass: string = '';
  @Input() language: 'en' | 'ne' = 'ne';
  @Input() monthDisplayType: 'default' | 'modern' | 'short' = 'default';
  @Input() dayDisplayType: 'default' | 'short' = 'default';

  @Input() dateFormatter: (date: NepaliDate | null) => string = (date: NepaliDate | null): string => {
    if (!date) {
      return '';
    }
    const day = this.language === 'ne' ? this.datepickerService.formatNepaliNumber(date.day) : String(date.day).padStart(2, '0');
    const month = this.language === 'ne' ? this.datepickerService.formatNepaliNumber(date.month + 1) : String(date.month + 1).padStart(2, '0');
    const year = this.language === 'ne' ? this.datepickerService.formatNepaliNumber(date.year) : String(date.year);
    return `${year}/${month}/${day}`;
  };

  currentDisplayNepaliDate!: NepaliDate;
  selectedNepaliDate: NepaliDate | null = null;
  formattedInputValue: string = '';
  calendarGrid: CalendarMonthGrid = [];
  isCalendarOpen: boolean = false;
  
  yearsList: number[] = [];
  monthNames: string[] = [];
  dayNames: string[] = []; // Renamed from dayNamesShort

  private onChange: (value: NepaliDate | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    public datepickerService: NgxNepaliDatepickerCoreService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    if (this.alwaysVisible) {
      this.isCalendarOpen = true;
    }
    this.populateYearsList();
    
    const today = this.datepickerService.getTodaysNepaliDate();
    if (this.selectedNepaliDate) {
      this.currentDisplayNepaliDate = { year: this.selectedNepaliDate.year, month: this.selectedNepaliDate.month, day: 1 };
    } else {
      this.currentDisplayNepaliDate = { year: today.year, month: today.month, day: 1 };
    }
    this.generateCalendar();
    this.updateDisplayNames();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['language'] || changes['monthDisplayType'] || changes['dayDisplayType']) {
      this.updateDisplayNames();
      // If date formatter depends on language, reformat input
      if (changes['language'] && this.selectedNepaliDate) {
        this.formattedInputValue = this.dateFormatter(this.selectedNepaliDate);
      }
    }
    if (changes['alwaysVisible']) {
        if (this.alwaysVisible) {
            this.isCalendarOpen = true;
            this.generateCalendar(); // Regenerate calendar if it becomes always visible
        }
    }
  }

  private populateYearsList(): void {
    const minYear = Math.min(...Object.keys(NEPALI_MONTH_DAYS_BS).map(Number));
    const maxYear = Math.max(...Object.keys(NEPALI_MONTH_DAYS_BS).map(Number));
    for (let year = minYear; year <= maxYear; year++) {
      this.yearsList.push(year);
    }
  }

  private updateDisplayNames(): void {
    this.monthNames = Array(12).fill(0).map((_, i) => 
      this.datepickerService.getNepaliMonthName(i, this.language, this.monthDisplayType)
    );
    this.dayNames = Array(7).fill(0).map((_, i) =>
      this.datepickerService.getNepaliDayName(i, this.language, this.dayDisplayType)
    );
  }

  writeValue(date: NepaliDate | null): void {
    if (date && this.isValidNepaliDate(date)) {
      this.selectedNepaliDate = { ...date };
      this.currentDisplayNepaliDate = { year: date.year, month: date.month, day: 1 };
    } else {
      this.selectedNepaliDate = null;
      const today = this.datepickerService.getTodaysNepaliDate();
      this.currentDisplayNepaliDate = {year: today.year, month: today.month, day: 1};
    }
    this.formattedInputValue = this.dateFormatter(this.selectedNepaliDate);
    if (this.isCalendarOpen || this.alwaysVisible) { // Regenerate if open or always visible
        this.generateCalendar();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // TODO: Implement disabled state for the input if not hideInput
  }

  private isValidNepaliDate(date: NepaliDate): boolean {
    if (!date || typeof date.year !== 'number' || typeof date.month !== 'number' || typeof date.day !== 'number') {
      return false;
    }
    if (date.month < 0 || date.month > 11) return false;
    try {
        const daysInMonth = this.datepickerService.getDaysInNepaliMonth(date.year, date.month);
        if (date.day < 1 || date.day > daysInMonth) return false;
    } catch (e) { // Catches error if year is out of range for getDaysInNepaliMonth
        return false;
    }
    return true;
  }
  
  generateCalendar(): void {
    if (this.currentDisplayNepaliDate) {
      try {
        this.calendarGrid = this.datepickerService.generateCalendarMonth(
          this.currentDisplayNepaliDate.year,
          this.currentDisplayNepaliDate.month
        );
      } catch (e) {
        // console.error("Error generating calendar", e);
        this.calendarGrid = []; // Reset grid on error
      }
    }
  }

  selectDate(calendarDay: CalendarDay): void {
    if (!calendarDay.isCurrentMonth || calendarDay.isDisabled) {
      return;
    }
    this.selectedNepaliDate = {
      year: this.currentDisplayNepaliDate.year,
      month: this.currentDisplayNepaliDate.month,
      day: calendarDay.bsDay
    };
    this.formattedInputValue = this.dateFormatter(this.selectedNepaliDate);
    this.onChange(this.selectedNepaliDate);
    this.onTouched();
    if (!this.alwaysVisible) {
      this.isCalendarOpen = false;
    }
    // No need to call generateCalendar() here as selection doesn't change the month display
    // but if you want to highlight the selected date, the template will handle it.
  }

  changeYear(yearString: string): void {
    const year = parseInt(yearString, 10);
    if (this.currentDisplayNepaliDate.year !== year) {
        this.currentDisplayNepaliDate.year = year;
        this.generateCalendar();
    }
  }

  changeMonth(monthIndexString: string): void {
    const monthIndex = parseInt(monthIndexString, 10);
     if (this.currentDisplayNepaliDate.month !== monthIndex) {
        this.currentDisplayNepaliDate.month = monthIndex;
        this.generateCalendar();
    }
  }

  previousMonth(): void {
    this.currentDisplayNepaliDate.month--;
    if (this.currentDisplayNepaliDate.month < 0) {
      this.currentDisplayNepaliDate.month = 11;
      this.currentDisplayNepaliDate.year--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDisplayNepaliDate.month++;
    if (this.currentDisplayNepaliDate.month > 11) {
      this.currentDisplayNepaliDate.month = 0;
      this.currentDisplayNepaliDate.year++;
    }
    this.generateCalendar();
  }

  toggleCalendar(): void {
    if (this.alwaysVisible) return;
    this.isCalendarOpen = !this.isCalendarOpen;
    if (this.isCalendarOpen) {
      this.ensureCalendarDate();
      this.updateDisplayNames(); 
    }
  }
  
  openCalendar(): void {
    if (this.alwaysVisible || this.isCalendarOpen) return;
    this.isCalendarOpen = true;
    this.ensureCalendarDate();
    this.updateDisplayNames();
  }

  closeCalendar(): void {
    if (this.alwaysVisible) return;
    this.isCalendarOpen = false;
  }

  // Helper to set currentDisplayNepaliDate to selected date's month or today if no selection
  private ensureCalendarDate(): void {
    if (this.selectedNepaliDate) {
        if(this.currentDisplayNepaliDate.year !== this.selectedNepaliDate.year || this.currentDisplayNepaliDate.month !== this.selectedNepaliDate.month) {
            this.currentDisplayNepaliDate = {...this.selectedNepaliDate, day: 1};
        }
    } else {
        const today = this.datepickerService.getTodaysNepaliDate();
        if(this.currentDisplayNepaliDate.year !== today.year || this.currentDisplayNepaliDate.month !== today.month) {
            this.currentDisplayNepaliDate = {year: today.year, month: today.month, day: 1};
        }
    }
    this.generateCalendar();
  }
  
  onInputClick(): void {
    if (!this.isCalendarOpen) { // Only open if not already, toggle will handle otherwise
        this.openCalendar();
    }
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.alwaysVisible && this.isCalendarOpen) {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.closeCalendar();
      }
    }
  }

  isSelected(day: CalendarDay): boolean {
    if (!this.selectedNepaliDate || !day.isCurrentMonth) return false;
    return this.selectedNepaliDate.year === this.currentDisplayNepaliDate.year &&
           this.selectedNepaliDate.month === this.currentDisplayNepaliDate.month &&
           this.selectedNepaliDate.day === day.bsDay;
  }

  isToday(day: CalendarDay): boolean {
      if(!day.isCurrentMonth) return false;
      const todayBs = this.datepickerService.getTodaysNepaliDate();
      return day.bsDay === todayBs.day && 
             this.currentDisplayNepaliDate.month === todayBs.month &&
             this.currentDisplayNepaliDate.year === todayBs.year;
  }
}
