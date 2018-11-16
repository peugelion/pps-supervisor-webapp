import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.css']
})
export class TableLayoutComponent {
  workerRoutes = [];
  @Input() set workerRoutesInput(val: any) {
    this.workerRoutes = val;
    this.isSingleRow = val.length === 1;
    this.tableCssClass = 'ui unstackable red table ' + (val.length > 1 ? 'celled selectable' : 'very basic');
  }
  @Output() btnClick = new EventEmitter();

  isSingleRow;
  tableCssClass = '';  // helper

  constructor() {}

  /* https://stackoverflow.com/questions/51727317/angular-6-call-and-pass-a-function-from-parent-to-child-component */
  click(param1) { // Fk_Partner
    this.btnClick.emit(param1);
  }

  swipeLeft(event) {    console.log('swipeLeft', event);
    event.target.classList.remove('swiped');
    event.target.lastChild.classList.add('hidden');
    setTimeout(() => {
      event.target.classList.add('swiped');
      event.target.lastChild.classList.remove('hidden');
    }, 0);
  }

  swipeRight(event) {    console.log('swipeRight', event);
    event.target.classList.add('swiped');
    event.target.lastChild.classList.remove('hidden');
    setTimeout(() => {
      event.target.classList.remove('swiped');
      event.target.lastChild.classList.add('hidden');
    }, 0);
  }

}
