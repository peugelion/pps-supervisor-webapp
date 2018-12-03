import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

// export interface PeriodicElement {
//   Mesto: string;
//   Opis_542: string;
//   DatumPocetka: string;
//   DatumZavrsetka: string;
//   DuzinaPosete: string;
//   PauzaMinuta: string;
//   TargetMesec: string;
//   ProdajaMesec: string;
//   TargetDan: string;
//   ProdajaDan: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {Mesto: 'Ha', Opis_542: '', DatumPocetka: 'H',  DatumZavrsetka: 'H', DuzinaPosete: 'H ', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
//   {Mesto: 'Hb', Opis_542: '', DatumPocetka: 'He', DatumZavrsetka: 'H', DuzinaPosete: 'He', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
//   {Mesto: 'H1', Opis_542: '', DatumPocetka: 'Li', DatumZavrsetka: 'H', DuzinaPosete: 'Li', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
//   {Mesto: 'Hf', Opis_542: '', DatumPocetka: 'Be', DatumZavrsetka: 'H', DuzinaPosete: 'Be', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
//   {Mesto: 'He', Opis_542: '', DatumPocetka: 'Bo', DatumZavrsetka: 'H', DuzinaPosete: 'B ', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
//   {Mesto: 'Hd', Opis_542: '', DatumPocetka: 'Ca', DatumZavrsetka: 'H', DuzinaPosete: 'C ', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
//   {Mesto: 'H', Opis_542: '', DatumPocetka: 'Ni', DatumZavrsetka: 'H', DuzinaPosete: 'N ', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
//   {Mesto: 'H', Opis_542: '', DatumPocetka: 'Ox', DatumZavrsetka: 'H', DuzinaPosete: 'O ', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
//   {Mesto: 'H', Opis_542: '', DatumPocetka: 'Fl', DatumZavrsetka: 'H', DuzinaPosete: 'F ', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
//   {Mesto: 'H', Opis_542: '', DatumPocetka: 'Ne', DatumZavrsetka: 'H', DuzinaPosete: 'Ne', PauzaMinuta: '123',
//    TargetMesec: '123', ProdajaMesec: '22', TargetDan: '33', ProdajaDan: '9'},
// ];

@Component({
  selector: 'app-table-layout',
  encapsulation: ViewEncapsulation.None,  // prikazi ceo selection, bez scrollovanja ... override SUI css
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnInit {

  workerRoutes = [];
  displayedColumns: string[] = [
    'Mesto', 'Opis_542', 'DatumPocetka', 'DatumZavrsetka', 'DuzinaPosete', 'PauzaMinuta',
     'TargetMesec', 'ProdajaMesec', 'TargetDan', 'ProdajaDan', 'TelPlan',
    //  'Fk_Partner'
  ];
  // displayedColumns: string[] = [
  //   'objekat', 'opis', 'poc', 'zav', 'duz', 'pauza', 'targetMesec', 'prodajaMesec', 'targetDan', 'prodajaDan', 'nacin'
  // ];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  // dataSource = new MatTableDataSource(this.workerRoutes);
  dataSource = null;
  @Input() set workerRoutesInput(val: any) {
    this.workerRoutes = val;
    this.isSingleRow = val.length === 1;
    // this.tableCssClass = 'ui unstackable red table mat-elevation-z8 ' + (val.length > 1 ? 'celled selectable' : 'very basic');
    this.tableCssClass = 'ui unstackable red table ' + (val.length > 1 ? 'celled selectable' : 'very basic');
    if (this.isSingleRow) {
      this.displayedColumns.shift(); // remove 'Mesto' collumn
    }
    this.dataSource = new MatTableDataSource(this.workerRoutes);
  }
  @Input() set filterValueInput(val: string) {
    this.applyFilter(val);
  }
  @Output() btnClick = new EventEmitter();

  isSingleRow;
  tableCssClass = '';  // helper

  constructor() {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    if (!this.isSingleRow) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
