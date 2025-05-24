import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiSectionComponent } from './api-section.component';
import { ApiDemoComponent } from '../api-demo/api-demo.component'; // ApiSectionComponent imports ApiDemoComponent
import { CommonModule } from '@angular/common';

describe('ApiSectionComponent', () => {
  let component: ApiSectionComponent;
  let fixture: ComponentFixture<ApiSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApiSectionComponent, // Standalone
        // CommonModule, ApiDemoComponent are imported by ApiSectionComponent itself
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a datepickerApiDescription defined', () => {
    expect(component.datepickerApiDescription).toBeDefined();
    expect(component.datepickerApiDescription.length).toBeGreaterThan(0);
  });

  it('should have datepickerInputs populated', () => {
    expect(component.datepickerInputs).toBeDefined();
    expect(component.datepickerInputs.length).toBeGreaterThan(0);
    // Check for a known input
    const hideInput = component.datepickerInputs.find(input => input.name === 'hideInput');
    expect(hideInput).toBeTruthy();
    if (hideInput) { // TypeScript null check
        expect(hideInput.type).toBe('boolean');
        expect(hideInput.default).toBe('false');
    }
  });

  it('should render an app-api-demo component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-api-demo')).toBeTruthy();
  });
});
