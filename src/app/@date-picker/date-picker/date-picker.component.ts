import { Component, ViewEncapsulation, AfterViewInit, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatepickerMode } from 'ng2-semantic-ui';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, AfterViewInit {
// export class DatePickerComponent {
  dateMode: DatepickerMode;
  datePopupPosition: any = 'bottom-right';

  selectedDate: Date = null;
  @Input() set selectedDateInput(val: any) {
    this.selectedDate = val;
  }
  @Output() dateChangeAction = new EventEmitter();

  constructor() {
    // this.dateMode = DatepickerMode.Date;
  }

  ngAfterViewInit() {
    // this.dateMode = DatepickerMode.Date;
  }

  ngOnInit() {
    this.dateMode = DatepickerMode.Date;
  }

  /* https://stackoverflow.com/questions/51727317/angular-6-call-and-pass-a-function-from-parent-to-child-component */
  dateChange($event) { // Fk_Partner
    this.dateChangeAction.emit(this.selectedDate);
  }
}
