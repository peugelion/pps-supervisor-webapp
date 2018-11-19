import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
// import {MatSort, MatTableDataSource} from '@angular/material';

// export interface PeriodicElement {
//   objekat: string;
//   poc: string;
//   zav: string;
//   duz: string;
//   pauza: string;
//   targetMesec: string;
//   prodajaMesec: string;
//   targetDan: string;
//   prodajaDan: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {objekat: 'H', poc: 'H',  zav: 'H', duz: 'H ', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
//   {objekat: 'H', poc: 'He', zav: 'H', duz: 'He', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
//   {objekat: 'H', poc: 'Li', zav: 'H', duz: 'Li', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
//   {objekat: 'H', poc: 'Be', zav: 'H', duz: 'Be', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
//   {objekat: 'H', poc: 'Bo', zav: 'H', duz: 'B ', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
//   {objekat: 'H', poc: 'Ca', zav: 'H', duz: 'C ', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
//   {objekat: 'H', poc: 'Ni', zav: 'H', duz: 'N ', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
//   {objekat: 'H', poc: 'Ox', zav: 'H', duz: 'O ', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
//   {objekat: 'H', poc: 'Fl', zav: 'H', duz: 'F ', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
//   {objekat: 'H', poc: 'Ne', zav: 'H', duz: 'Ne', pauza: '123', targetMesec: '123', prodajaMesec: '22', targetDan: '33', prodajaDan: '9'},
// ];

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.css']
})
export class TableLayoutComponent implements OnInit {
  // displayedColumns: string[] = ['objekat', 'poc', 'zav', 'duz', 'pauza', 'targetMesec', 'prodajaMesec', 'targetDan', 'prodajaDan'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  workerRoutes = [];
  @Input() set workerRoutesInput(val: any) {
    this.workerRoutes = val;
    this.isSingleRow = val.length === 1;
    // this.tableCssClass = 'ui unstackable red table mat-elevation-z8 ' + (val.length > 1 ? 'celled selectable' : 'very basic');
    this.tableCssClass = 'ui unstackable red table ' + (val.length > 1 ? 'celled selectable' : 'very basic');
    // this.dataSource.sort = this.sort;
  }
  @Output() btnClick = new EventEmitter();

  isSingleRow;
  tableCssClass = '';  // helper

  constructor() {}

  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // this.dataSource.sort = this.sort;
  }

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
