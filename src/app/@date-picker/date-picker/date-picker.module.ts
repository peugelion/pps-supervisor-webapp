import { NgModule } from '@angular/core';
import { DatePickerComponent  } from './date-picker.component';

import { FormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
  imports: [
    FormsModule,
    SuiModule
  ]
})
export class DatePickerModule {}
