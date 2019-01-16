import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ByAreaBySkuRoutingModule } from './by-area-by-sku-routing.module';
import { ByAreaBySkuComponent } from './by-area-by-sku.component';

import { SuiDimmerModule, SuiCheckboxModule } from 'ng2-semantic-ui';
import { DatePickerModule } from '@pepsi-shared/date-picker/date-picker.module';
import { ToggleMenuBtnModule } from '@pepsi-shared/_top-menu/toggle-menu-btn/toggle-menu-btn.module';
import { KorisnikModule } from '@pepsi-shared/_top-menu/korisnik/korisnik.module';
import { TableSortingModule } from '@pepsi-shared/table-sorting/table-sorting.module';




@NgModule({
  declarations: [
    ByAreaBySkuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ByAreaBySkuRoutingModule,
    SuiDimmerModule, SuiCheckboxModule,
    ToggleMenuBtnModule,
    KorisnikModule,
    DatePickerModule,
    TableSortingModule,
  ]
})
export class ByAreaBySkuModule { }
