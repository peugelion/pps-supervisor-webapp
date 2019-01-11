import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IzvestajKpisRoutingModule } from './izvestaj-kpis-routing.module';
import { IzvestajKpisComponent } from './izvestaj-kpis.component';

import { SuiDimmerModule } from 'ng2-semantic-ui';

import { DatePickerModule } from '@pepsi-shared/date-picker/date-picker.module';
import { SearchModule } from '@pepsi-shared/search/search.module';
import { ToggleMenuBtnModule } from '@pepsi-shared/_top-menu/toggle-menu-btn/toggle-menu-btn.module';
import { KorisnikModule } from '@pepsi-shared/_top-menu/korisnik/korisnik.module';

import { TableSortingModule } from '@pepsi-shared/table-sorting/table-sorting.module';
import { QuickListModule } from '@pepsi-shared/quick-list/quick-list.module';


@NgModule({
  declarations: [
    IzvestajKpisComponent,
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
    QuickListModule
  ]
})
export class IzvestajKpisModule { }
