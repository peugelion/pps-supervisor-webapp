import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IzvestajKpisRoutingModule } from './izvestaj-kpis-routing.module';
import { IzvestajKpisComponent } from './izvestaj-kpis.component';

import { SuiDimmerModule } from 'ng2-semantic-ui';

import { DatePickerModule } from '@pepsi-shared/date-picker/date-picker.module';
// import { SearchComponent } from '@pepsi-shared/search/search.component';
import { SearchModule } from '@pepsi-shared/search/search.module';
import { ToggleMenuBtnModule } from '@pepsi-shared/_top-menu/toggle-menu-btn/toggle-menu-btn.module';
import { KorisnikModule } from '@pepsi-shared/_top-menu/korisnik/korisnik.module';

/* quick list cmp */
import { QuickListComponent } from '@pepsi-app/pages/izvestaj-kpis/quick-list/quick-list.component';
/* table-sorting-pagination cmp */
// import { TableSortingComponent } from '@pepsi-shared/table-sorting/table-sorting.component';
import { TableSortingModule } from '@pepsi-shared/table-sorting/table-sorting.module';
  // import { CustomPipeModule } from '../../pipes/custom.pipe.module';
  // import {MatTableModule} from '@angular/material/table';
  // import {MatSortModule} from '@angular/material/sort';
  // import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    IzvestajKpisComponent,
    // SearchComponent,
    QuickListComponent,
    // TableSortingComponent
  ],
  imports: [
    CommonModule,
    IzvestajKpisRoutingModule,

    SuiDimmerModule,
    // SuiSearchModule,

    ToggleMenuBtnModule,
    KorisnikModule,
    DatePickerModule,
    // SearchComponent,
    // SearchRemoteApiComponent,
    SearchModule,
    TableSortingModule,

    // CustomPipeModule,
    // MatTableModule, MatSortModule, MatPaginatorModule
  ]
})
export class IzvestajKpisModule { }
