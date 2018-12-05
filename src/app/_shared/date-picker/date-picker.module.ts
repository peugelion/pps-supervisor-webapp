import { NgModule } from '@angular/core';
import { DatePickerComponent  } from './date-picker.component';

import { FormsModule } from '@angular/forms';
import {SuiPopupModule, SuiDatepickerModule} from 'ng2-semantic-ui';

@NgModule({
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
  imports: [
    FormsModule,
    SuiPopupModule, SuiDatepickerModule
  ]
})
export class DatePickerModule {}
