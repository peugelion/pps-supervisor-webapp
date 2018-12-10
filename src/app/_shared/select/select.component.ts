import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input('label') label: string;
  @Input('placeholder') placeholder: string;
  selectedOption = '';
  @Input() set selectedOptionInput(val: any) {
    this.selectedOption = val;
  }
  options: Array<any>;
  @Input() set optionsInput(val: any) {
    this.options = val;
  }

  @Input('labelField') labelField: string;
  @Input('valueField') valueField: string;

  @Output() selectedChangeAction = new EventEmitter();

  constructor() { }

  ngOnInit() {     console.log('labelField', this.labelField, 'valueField', this.valueField, this.options);
  }

  /* https://stackoverflow.com/questions/51727317/angular-6-call-and-pass-a-function-from-parent-to-child-component */
  selectChange($event) { // Fk_Partner
    this.selectedChangeAction.emit(this.selectedOption);
  }

}
