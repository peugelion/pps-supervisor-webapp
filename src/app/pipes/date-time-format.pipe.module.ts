import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import {SuiModule} from 'ng2-semantic-ui';

import { DateTimeFormatPipe, TimeFormatPipe } from './date-time-format.pipe';


@NgModule({
  imports: [],
  declarations: [
    DateTimeFormatPipe,
    TimeFormatPipe
  ],
  exports: [
    DateTimeFormatPipe,
    TimeFormatPipe
  ]
})
export class DateTimeFormatPipeModule {}

