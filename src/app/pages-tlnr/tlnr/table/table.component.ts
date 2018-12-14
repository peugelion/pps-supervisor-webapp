import { Component, Input, Output, AfterViewInit, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
// import { Component, Input, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  // workerRoutes = [];
  // displayedColumns: string[] = [
  //   'Mesto', 'Opis_542', 'DatumPocetka', 'DatumZavrsetka', 'DuzinaPosete', 'PauzaMinuta',
  //    'TargetMesec', 'ProdajaMesec', 'TargetDan', 'ProdajaDan', 'TelPlan',
  // ];
  // this.tableCssClass = 'ui unstackable red table mat-elevation-z8 ' + (val.length > 1 ? 'celled selectable' : 'very basic');
  tableCssClass = 'ui unstackable red table celled selectable';  // helper
  columnLabels: string[] = [];
  @Input() set columnLabelsInput(val: any) {
    // this.dataSource.data = val;
    this.columnLabels = val;
    console.log('columnLabelsInput');
  }
  displayedColumns: string[] = [];
  @Input() set columnsInput(val: any) {
    // this.dataSource.data = val;
    this.displayedColumns = val;
    console.log('columnsInput');
  }
  stickyCollumn = '';
  @Input() set stickyCollumnInput(val: any) {
    this.stickyCollumn = val;
    console.log('stickyCollumnInput');
  }
  dataSource = new MatTableDataSource();
  data = null;
  @Input() set dataInput(val: any) {
    // this.dataSource.data = val;
    this.data = val;
    console.log('dataInput');
  }
  @Input() set filterValueInput(val: string) {
    this.applyFilter(val);
  }
  // @Output() btnClick = new EventEmitter();

  constructor() {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    /* https://stackoverflow.com/questions/50962765/expressionchangedafterithasbeencheckederror-invoking-toastr-in-nginit-in-angular */
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.data;
      console.log('ngAfterViewInit setTimeout');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // isStickyCollumn (column: string): boolean {
  //   // console.log(column);
  //   return column === 'Opis' ? true : false;
  // }

  /* https://stackoverflow.com/questions/51727317/angular-6-call-and-pass-a-function-from-parent-to-child-component */
  // click(param1) { // Fk_Partner
  //   this.btnClick.emit(param1);
  // }
}
