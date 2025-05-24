import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamplesSectionComponent } from './examples-section.component';
import { ExampleDemoComponent } from '../example-demo/example-demo.component';
import { NgxNepaliDatepickerCoreComponent } from '../../../ngx-nepali-datepicker-core/src/public-api';
import { NgxNepaliDatepickerCoreService } from '../../../ngx-nepali-datepicker-core/src/public-api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NepaliDate } from '../../../ngx-nepali-datepicker-core/src/public-api';

describe('ExamplesSectionComponent', () => {
  let component: ExamplesSectionComponent;
  let fixture: ComponentFixture<ExamplesSectionComponent>;
  let datepickerService: NgxNepaliDatepickerCoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExamplesSectionComponent, // Standalone
        // CommonModule, FormsModule, ExampleDemoComponent, NgxNepaliDatepickerCoreComponent are imported by ExamplesSectionComponent
      ],
      // No need to declare components imported by a standalone component
      providers: [NgxNepaliDatepickerCoreService] // Provide if not already providedIn: 'root' or if you need a fresh instance/mock
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamplesSectionComponent);
    component = fixture.componentInstance;
    datepickerService = TestBed.inject(NgxNepaliDatepickerCoreService); // Get service instance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize date models to null or specified values', () => {
    expect(component.date1).toBeNull();
    expect(component.date2).toBeNull();
    expect(component.date3).toBeNull();
    expect(component.date4).toBeNull();
    expect(component.date5).toEqual({ year: 2080, month: 0, day: 15 });
    expect(component.date6).toBeNull();
    expect(component.date7).toBeNull();
  });

  it('hideInputForAlwaysVisibleExample should be false initially', () => {
    expect(component.hideInputForAlwaysVisibleExample).toBe(false);
  });

  it('customDateFormatter should format date correctly', () => {
    const date: NepaliDate = { year: 2080, month: 5, day: 20 }; // Ashwin 20, 2080
    // Spy on service's formatNepaliNumber if it's complex or to isolate test
    spyOn(datepickerService, 'formatNepaliNumber').and.callFake((num: number) => {
      // Simple mock for testing formatter string structure
      const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      return String(num).split('').map(digit => nepaliDigits[parseInt(digit, 10)]).join('');
    });

    const formatted = component.customDateFormatter(date);
    expect(datepickerService.formatNepaliNumber).toHaveBeenCalledWith(2080);
    expect(datepickerService.formatNepaliNumber).toHaveBeenCalledWith(6); // month + 1
    expect(datepickerService.formatNepaliNumber).toHaveBeenCalledWith(20);
    expect(formatted).toBe('२०८० साल, ६ महिना, २० गते');
  });

  it('customDateFormatter should return empty string for null date', () => {
    const formatted = component.customDateFormatter(null);
    expect(formatted).toBe('');
  });
  
  it('exampleCodeSnippets should be populated', () => {
    expect(component.exampleCodeSnippets.ex1).toContain('<ndp-ngx-nepali-datepicker-core');
    expect(Object.keys(component.exampleCodeSnippets).length).toBeGreaterThanOrEqual(7);
  });

  // Test for the presence of app-example-demo components in the template
  it('should render app-example-demo components for examples', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Check for a few to confirm they are being rendered
    expect(compiled.querySelectorAll('app-example-demo').length).toBe(7);
  });

});
