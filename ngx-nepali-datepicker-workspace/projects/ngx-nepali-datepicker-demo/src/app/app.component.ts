import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxNepaliDatepickerCoreComponent } from '../../../ngx-nepali-datepicker-core/src/public-api';

import { ExamplesSectionComponent } from './examples-section/examples-section.component';
import { ApiSectionComponent } from './api-section/api-section.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxNepaliDatepickerCoreComponent,
    ExamplesSectionComponent, // Added
    ApiSectionComponent     // Added
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NGX Nepali Datepicker Demo';
  activeTab: 'examples' | 'api' = 'examples';

  selectTab(tabName: 'examples' | 'api'): void {
    this.activeTab = tabName;
  }
}
