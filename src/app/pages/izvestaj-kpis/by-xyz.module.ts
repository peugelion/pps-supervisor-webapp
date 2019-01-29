import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ByXYZRoutingModule } from './by-xyz-routing.module';
import { ByXYZComponent } from './by-xyz.component';

import { SuiDimmerModule, SuiCheckboxModule } from 'ng2-semantic-ui';
import { DatePickerModule } from '@pepsi-shared/date-picker/date-picker.module';
import { ToggleMenuBtnModule } from '@pepsi-shared/_top-menu/toggle-menu-btn/toggle-menu-btn.module';
import { KorisnikModule } from '@pepsi-shared/_top-menu/korisnik/korisnik.module';
import { TableSortingModule } from '@pepsi-shared/table-sorting/table-sorting.module';




@NgModule({
  declarations: [
    ByXYZComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ByXYZRoutingModule,
    SuiDimmerModule, SuiCheckboxModule,
    ToggleMenuBtnModule,
    KorisnikModule,
    DatePickerModule,
    TableSortingModule,
  ]
})
export class ByXYZModule { }
