import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ToNpPipe } from './datepicker/to-np.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DatepickerComponent, ToNpPipe],
  imports: [CommonModule, OverlayModule],
  exports: [DatepickerComponent]
})
export class AngularNepaliDatepickerModule { }
