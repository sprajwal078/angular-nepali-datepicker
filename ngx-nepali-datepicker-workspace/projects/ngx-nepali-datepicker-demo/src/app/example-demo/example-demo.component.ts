import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// FormsModule and NgxNepaliDatepickerCoreComponent are not directly used by ExampleDemoComponent itself,
// but by the content projected into it via <ng-content>.
// So, they are not strictly needed in its 'imports' array.

@Component({
  selector: 'app-example-demo',
  standalone: true,
  imports: [
    CommonModule,
    // FormsModule, // Removed, will be used by parent that projects content
    // NgxNepaliDatepickerCoreComponent // Removed, will be used by parent
  ],
  templateUrl: './example-demo.component.html',
  styleUrls: ['./example-demo.component.css']
})
export class ExampleDemoComponent {
  @Input() heading: string = 'Datepicker Example'; // Changed from title
  @Input() code: string = ''; // Added

  constructor() {}
}
