import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

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

@Component({
  selector: 'app-table-layout',
  encapsulation: ViewEncapsulation.None,  // prikazi ceo selection, bez scrollovanja ... override SUI css
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnInit {
  isSingleRow = true;
  tableCssClass = '';  // helper

  // workerRoutes = [];
  workerRoutes: Array<any> = null;
  displayedColumns: string[] = [
    'Mesto', 'Opis_542', 'DatumPocetka', 'DatumZavrsetka', 'DuzinaPosete', 'PauzaMinuta',
    'TargetMesec', 'ProdajaMesec', 'TargetDan', 'ProdajaDan', 'TelPlan',
    //  'Fk_Partner'
  ];
  dataSource = null;
  @Input() set workerRoutesInput(val: any) {
    // if (val == null || val[0] == null) {
    //   return;
    // }
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
    // console.log('filterValueInput', val);
    this.applyFilter(val);
  }
  // @Output() btnClick = new EventEmitter();

  constructor() {
    // console.log('this.workerRoutes (constructor)', this.workerRoutes);
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // console.log('this.workerRoutes (ngOnInit)', this.workerRoutes);
    if (!this.isSingleRow) {
      // console.log('init sort (ngOnInit)', this.isSingleRow, this.workerRoutes);
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  /* https://stackoverflow.com/questions/51727317/angular-6-call-and-pass-a-function-from-parent-to-child-component */
  // click(param1) { // Fk_Partner
  //   this.btnClick.emit(param1);
  // }
}
