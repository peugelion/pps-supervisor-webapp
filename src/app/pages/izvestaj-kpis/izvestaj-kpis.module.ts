import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IzvestajKpisRoutingModule } from './izvestaj-kpis-routing.module';
import { IzvestajKpisComponent } from './izvestaj-kpis.component';

import { SuiDimmerModule, SuiSearchModule } from 'ng2-semantic-ui';

import { DatePickerModule } from '@pepsi-shared/date-picker/date-picker.module';
import { SearchComponent } from '@pepsi-app/pages/izvestaj-kpis/search/search.component';
import { SearchRemoteApiComponent } from '@pepsi-app/pages/izvestaj-kpis/search/search-remote-api.component';
import { ToggleMenuBtnModule } from '@pepsi-shared/_top-menu/toggle-menu-btn/toggle-menu-btn.module';
import { KorisnikModule } from '@pepsi-shared/_top-menu/korisnik/korisnik.module';

/* quick list cmp */
import { QuickListComponent } from '@pepsi-app/pages/izvestaj-kpis/quick-list/quick-list.component';
/* table-sorting-pagination cmp */
import { TableSortingComponent } from './table-sorting/table-sorting.component';
  import { CustomPipeModule } from '../../pipes/custom.pipe.module';
  import {MatTableModule} from '@angular/material/table';
  import {MatSortModule} from '@angular/material/sort';
  import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    IzvestajKpisComponent,
    SearchComponent, SearchRemoteApiComponent,
    QuickListComponent,
    TableSortingComponent
  ],
  imports: [
    CommonModule,
    IzvestajKpisRoutingModule,

    SuiDimmerModule, SuiSearchModule,

    DatePickerModule,
    // SearchComponent,
    // SearchRemoteApiComponent,
    ToggleMenuBtnModule,
    KorisnikModule,

    CustomPipeModule,
    MatTableModule, MatSortModule, MatPaginatorModule
  ]
})
export class IzvestajKpisModule { }
