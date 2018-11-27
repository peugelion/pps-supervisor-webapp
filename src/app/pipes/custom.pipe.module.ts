import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import {SuiModule} from 'ng2-semantic-ui';

import { DateTimeFormatPipe, DateFormatPipe, TimeFormatPipe } from './date-time-format.pipe';
import { TyvsLyPipe, ShortMonthPipe } from './short-str.pipe';


@NgModule({
  imports: [],
  declarations: [
    DateTimeFormatPipe,
    DateFormatPipe,
    TimeFormatPipe,
    TyvsLyPipe,
    ShortMonthPipe
  ],
  exports: [
    DateTimeFormatPipe,
    DateFormatPipe,
    TimeFormatPipe,
    TyvsLyPipe,
    ShortMonthPipe
  ]
})
export class CustomPipeModule {}

