
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'dateTimeFormat',
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  /**
   * Takes a DATE_TIME_FMT value and make it default date format.
   */
  transform(value: any, args?: any): any {
    return super.transform(value, environment.DATE_TIME_FMT);
  }
}