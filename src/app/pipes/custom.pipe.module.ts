import { NgModule } from '@angular/core';
import { DateTimeFormatPipe, DateFormatPipe, TimeFormatPipe } from './date-time-format.pipe';
import { TyvsLyPipe, ShortMonthPipe } from './short-str.pipe';


@NgModule({
  imports: [
    // TimeFormatModule
  ],
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

