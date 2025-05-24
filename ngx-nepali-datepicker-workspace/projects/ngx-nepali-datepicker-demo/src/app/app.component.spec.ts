import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxNepaliDatepickerCoreComponent } from '../../../ngx-nepali-datepicker-core/src/public-api';
import { ExamplesSectionComponent } from './examples-section/examples-section.component';
import { ApiSectionComponent } from './api-section/api-section.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Since it's standalone
        // FormsModule, // FormsModule and CommonModule are imported by AppComponent itself
        // CommonModule, 
        // NgxNepaliDatepickerCoreComponent, // Also imported by AppComponent
        // ExamplesSectionComponent, // Also imported by AppComponent
        // ApiSectionComponent // Also imported by AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the title 'NGX Nepali Datepicker Demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('NGX Nepali Datepicker Demo');
  });

  it('should have default activeTab as "examples"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.activeTab).toBe('examples');
  });

  it('selectTab method should update activeTab', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.selectTab('api');
    expect(app.activeTab).toBe('api');
    app.selectTab('examples');
    expect(app.activeTab).toBe('examples');
  });

  it('should render the datepicker component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ndp-ngx-nepali-datepicker-core')).toBeTruthy();
  });
  
  it('should render the examples section by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // ngOnInit will set activeTab to 'examples'
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-examples-section')).toBeTruthy();
    expect(compiled.querySelector('app-api-section')).toBeFalsy();
  });

  it('should render the api section when api tab is selected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.selectTab('api');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-api-section')).toBeTruthy();
    expect(compiled.querySelector('app-examples-section')).toBeFalsy();
  });
});
