# NGX Nepali Datepicker

An Angular datepicker component for selecting Nepali Bikram Sambat dates. This project is a reimplementation using the latest Angular features and plain CSS for styling.

## Library Project: `ngx-nepali-datepicker-core`

The core datepicker functionality is provided by the `ngx-nepali-datepicker-core` library.

### Importing and Using the Component

The main component is `NgxNepaliDatepickerCoreComponent`. Since it's a standalone component, you can import it directly into your component or module:

```typescript
import { NgxNepaliDatepickerCoreComponent } from 'ngx-nepali-datepicker-core'; // Adjust path if needed

@Component({
  selector: 'app-your-component',
  standalone: true,
  imports: [NgxNepaliDatepickerCoreComponent, FormsModule, CommonModule], // FormsModule for ngModel
  template: `
    <ndp-ngx-nepali-datepicker-core [(ngModel)]="myDate"></ndp-ngx-nepali-datepicker-core>
    <p>Selected Date: {{ myDate | json }}</p>
  `
})
export class YourComponent {
  myDate: any; // Should be 'NepaliDate | null' from the library's types
}
```

### Main Inputs

The component accepts several inputs to customize its behavior and appearance:

*   `hideInput`
*   `alwaysVisible`
*   `inputClass`
*   `language` ('en' or 'ne')
*   `monthDisplayType` ('default', 'modern', 'short')
*   `dayDisplayType` ('default', 'short')
*   `dateFormatter` (custom function)

For detailed API information, please refer to the API section in the demo application.

## Demo Application: `ngx-nepali-datepicker-demo`

A demo application is included to showcase the datepicker's features and usage examples.

### Running the Demo

1.  Ensure all dependencies are installed: `npm install` (run from the `ngx-nepali-datepicker-workspace` root).
2.  Serve the demo application: `ng serve ngx-nepali-datepicker-demo`
3.  Open your browser to `http://localhost:4200/`.

## Development

*   Built with Angular (version ~19.2.0, based on CLI used for scaffolding).
*   Uses plain CSS for styling, avoiding SASS/SCSS build complexities.
*   Core Nepali date conversion logic (AD to BS, BS to AD, days in month) is self-contained within the `ngx-nepali-datepicker-core` library. This was implemented due to issues with integrating external Nepali date libraries in the development environment.

## Known Issues/Limitations

*   **Initial Development Environment Challenges:** The project's initial setup (scaffolding of this new workspace and previous attempts to upgrade an older v7 version) encountered significant issues with `npm install` in the target development environment. These were primarily due to native addon compilation problems (e.g., `node-sass` required by older Angular CLI versions) and CLI tool compatibility issues when trying to use `ng new` or `ng update` within the existing `/app` structure. This new version aims to mitigate such problems by using plain CSS and having self-contained date logic, minimizing external build-time dependencies.
*   **Unit Test Execution:** Comprehensive unit tests have been written for the library's core logic, service, and for the demo application components. However, these tests could not be executed during the development process due to the aforementioned `npm install` failures which prevented the necessary testing tools (Karma, Jasmine, Angular test builders) from being installed. It is crucial to run these tests after successfully setting up the project in a compatible local environment.
*   **Date Conversion Logic:** The Bikram Sambat (BS) to AD and AD to BS date conversion logic within `nepali-date-utils.ts` has been reimplemented based on common algorithms and data sourced from the `nepali-date-converter` library (as direct installation was not possible). While it covers a wide range of dates (BS 2000-2090), it should be thoroughly tested for accuracy, especially for edge cases or dates far from the internal reference point (April 13, 1943 AD / Baisakh 1, 2000 BS).

---

This README provides a basic overview. For more detailed usage and API information, please explore the demo application.
