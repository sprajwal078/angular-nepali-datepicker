import { NgModule } from '@angular/core';
import { AngularNepaliDatepickerComponent } from './angular-nepali-datepicker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ToNpPipe } from './datepicker/to-np.pipe';

@NgModule({
  declarations: [DatepickerComponent, ToNpPipe],
  imports: [
  ],
  exports: [DatepickerComponent]
})
export class AngularNepaliDatepickerModule { }
