import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ByCustomerRoutingModule } from './by-customer-routing.module';
import { ByCustomerComponent } from './by-customer.component';

import { SuiDimmerModule } from 'ng2-semantic-ui';

import { DatePickerModule } from '@pepsi-shared/date-picker/date-picker.module';
import { SearchModule } from '@pepsi-shared/search/search.module';
import { ToggleMenuBtnModule } from '@pepsi-shared/_top-menu/toggle-menu-btn/toggle-menu-btn.module';
import { KorisnikModule } from '@pepsi-shared/_top-menu/korisnik/korisnik.module';

import { TableSortingModule } from '@pepsi-shared/table-sorting/table-sorting.module';
import { QuickListModule } from '@pepsi-shared/quick-list/quick-list.module';


@NgModule({
  declarations: [
    ByCustomerComponent,
  ],
  imports: [
    CommonModule,
    ByCustomerRoutingModule,

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
export class ByCustomerModule { }
