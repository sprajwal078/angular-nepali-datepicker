import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NpDatepickerModule } from 'angular-nepali-datepicker';
import { FormsModule } from '@angular/forms';
import { ExampleDemoComponent } from './example-demo/example-demo.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiSectionComponent } from './api-section/api-section.component';
import { ExamplesSectionComponent } from './examples-section/examples-section.component';
import { ApiDemoComponent } from './api-demo/api-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleDemoComponent,
    ApiSectionComponent,
    ExamplesSectionComponent,
    ApiDemoComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NpDatepickerModule,
    NgbTabsetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
