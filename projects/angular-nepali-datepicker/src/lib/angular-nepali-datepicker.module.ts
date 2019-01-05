import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ToNpPipe } from './datepicker/to-np.pipe';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [DatepickerComponent, ToNpPipe],
  imports: [OverlayModule],
  exports: [DatepickerComponent]
})
export class AngularNepaliDatepickerModule { }
