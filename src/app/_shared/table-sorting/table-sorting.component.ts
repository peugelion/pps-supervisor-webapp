// import { Component, ViewEncapsulation, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Component, ViewEncapsulation, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const data = {'AKvsKK': 1, 'AprTYvsAprLY': 0, 'AprilLY': 0, 'AprilTY': 0, 'AugTYvsAugLY': 0, 'AugustLY': 0, 'AugustTY': 0,
// 'DecTYvsDecLY': 0, 'DecemberLY': 0, 'DecemberTY': 0, 'DiffMTD': 0, 'FebTYvsFebLY': 0, 'FebruaryLY': 0, 'FebruaryTY': 0,
// 'JanTYvsJanLY': 0, 'JanuaryLY': 0, 'JanuaryTY': 0, 'JulTYvsJulLY': 0, 'JulyLY': 0, 'JulyTY': 0, 'JunTYvsJunLY': 0, 'JuneLY': 0,
// 'JuneTY': 0, 'KKvsKKProizvod': 3.47, 'KupciKupili': 66, 'LYTD': 0, 'MTDLY': 0, 'MarTYvsMarLY': 0, 'MarchLY': 0, 'MarchTY': 0,
// 'MayLY': 0, 'MayTY': 0, 'MayTYvsMayLY': 0, 'MonthlyPlan': 0, 'Neisporuceno': 0, 'Nivo': 0, 'NovTYvsNovLY': 0, 'NovemberLY': 0,
// 'NovemberTY': 0, 'OctTYvsOctLY': 0, 'OctoberLY': 0, 'OctoberTY': 0, 'Opis': 'bla bla bla', 'PlanPercentage': 0, 'RNB': 1, 'SalesMTD': 0,
// 'SepTYvsSepLY': 0, 'SeptemberLY': 0, 'SeptemberTY': 0, 'Sifra': 'AKTIVNI OBJEKTI', 'TYTD': 0, 'TYTDvsLYTD': 0, 'TotalMonth': 0};

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-table-sorting',
  encapsulation: ViewEncapsulation.None,  // prikazi ceo selection, bez scrollovanja ... override SUI css
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.scss']
})
// export class TableSortingComponent implements OnInit, OnDestroy {
export class TableSortingComponent implements AfterViewInit {
  rptData = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[];

  isSingleRow = false;
  isSmallTable = false;
  tableCssClass = 'ui unstackable red table  celled selectable  custom__table';  // helper
  filterActive = null; // filter state

  @Input() set rptDataInput(val: Array<Object>) {
    this.isSingleRow = val.length === 1;
    this.isSmallTable = val.length && val.length <= 20;
    this.displayedColumns = (Object.keys(val[0]));    // console.log('this.displayedColumns', this.displayedColumns);
    // this.displayedColumns.shift(); // remove 'RNB' column
    this.rptData = val;
    // this.cdRef.detectChanges(); // force change detection (zone lost)
    this.dataSource.data = this.rptData;
  }
  @Input() set filterValueInput(val: string) {
    this.applyFilter(val);
  }

  filtersArr: string[] | null = null;
  @Input() set filtersArrInput(val: string[]) {
    console.log('filtersArrInput', val);
    this.filtersArr = val;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    /* https://stackoverflow.com/questions/50962765/expressionchangedafterithasbeencheckederror-invoking-toastr-in-nginit-in-angular */
    setTimeout(() => {
      if (!this.isSingleRow) {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      // this.dataSource.data = this.rptData;
      // console.log('[ngAfterViewInit]');
    });
  }

  //

  applyFilter(filterValue: string) {
    // console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  inputFilter(filterValue: string) {
    console.log('input filterValue', filterValue, this.filterActive);
    if (this.filterActive != null) {
      this.filterActive = null;
    }
    console.log('input filterValue', filterValue, this.filterActive);
    this.applyFilter(filterValue);
  }

  clickFilter(filterActive: number, filterValue: string) {
    if (filterActive === this.filterActive) {
      this.filterActive = null;
      this.applyFilter('');
    } else {
      this.filterActive = filterActive;
      this.applyFilter(filterValue);
    }
    console.log(this.filterActive, this.filterActive === 0, this.filterActive === 1, this.filterActive === 2, this.filterActive === 3);
  }

  //

  // parseColumnName(columnName) {
  //   console.log('columnName', columnName);
  //   return columnName;
  // }

  //

  isStickyCollumn(columnTxt: string): boolean {
    // return column === 'Opis' ? true : false;
    // console.log('isStickyCollumn', columnTxt);
    return ['Opis', 'NazivPartner', 'ImeProd'].indexOf(columnTxt) + 1 ? true : false;
  }

  //

  // tdCssClass(val) {
  //   [ngClass]="{'right aligned': !isSingleRow, 'active': !this.isNumber(row['Sifra']), 'inactive': this.isNumber(row['Sifra'])}"
  //   [className]="!this.isNumber(row['Sifra']) ? 'active' : 'inactive'";
  //   return /^\d+$/.test(val);
  // }

  isActiveRow(row) {
    // console.log('isActiveRow', row);
    const isNumber = val => {
      if (!val) {
        return false;
      }
      return /^\d+$/.test(val);
    };
    return (!isNumber(row.Sifra) && !isNumber(row.sifraPartner) && !isNumber(row.SifraProd));
  }

  // isRightAllignedCollumn(column) {
  //   console.log('column ...', (column !== 'Opis'), column );
  //   return (column !== 'Opis');
  // }

  tdClass(column, row) {
    // {'zero': column.includes('vs'), 'positive plus': column.includes('vs') && row[column] > 0,
    // 'negative': column.includes('vs') && row[column] < 0 && row[column] != -100}
    const isVsColumn = column.includes('vs');
    if (!isVsColumn) {
      return;
    }
    // console.log('tdClass', column, row);
    if (row[column] > 0) {
      return 'positive plus';
    } else if (row[column] < 0 && row[column] !== -100) {
      return 'negative';
    }
    return 'zero';
  }
}
