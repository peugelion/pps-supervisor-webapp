import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.css']
})
export class CardLayoutComponent {
  workerRoutes = [];
  @Input() set workerRoutesInput(val: any) {
    this.workerRoutes = val;
  }
  // @Output() btnClick = new EventEmitter();

  constructor() { }

  /* https://stackoverflow.com/questions/51727317/angular-6-call-and-pass-a-function-from-parent-to-child-component */
  // click(param1) { // Fk_Partner
  //   this.btnClick.emit(param1);
  // }

}
