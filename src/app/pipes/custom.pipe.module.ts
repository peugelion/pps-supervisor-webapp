import { NgModule } from '@angular/core';
import { DateTimeFormatPipe, DateFormatPipe, TimeFormatPipe } from './date-time-format.pipe';
import { TyvsLyPipe, ShortMonthPipe } from './short-str.pipe';
import { MappingPipe, MappingPipe2 } from './universal.pipe';


@NgModule({
  imports: [
    // TimeFormatModule
  ],
  declarations: [
    DateTimeFormatPipe,
    DateFormatPipe,
    TimeFormatPipe,
    TyvsLyPipe,
    ShortMonthPipe,
    MappingPipe, MappingPipe2
  ],
  exports: [
    DateTimeFormatPipe,
    DateFormatPipe,
    TimeFormatPipe,
    TyvsLyPipe,
    ShortMonthPipe,
    MappingPipe, MappingPipe2
  ]
})
export class CustomPipeModule { }

