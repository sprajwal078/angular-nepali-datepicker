import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NpDatepickerModule } from 'angular-nepali-datepicker';
import { FormsModule } from '@angular/forms';
import { ExampleDemoComponent } from './example-demo/example-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleDemoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NpDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
