import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdblokirajUnosPorudzbineRoutingModule } from './odblokiraj-unos-porudzbine-routing.module';
import { OdblokirajUnosPorudzbineComponent } from './odblokiraj-unos-porudzbine.component';

// import { SuiDimmerModule, SuiSelectModule, SuiPopupModule, SuiCheckboxModule } from 'ng2-semantic-ui';
import { SuiDimmerModule, SuiSelectModule, SuiCheckboxModule } from 'ng2-semantic-ui';
import { CustomPipeModule } from '../../pipes/custom.pipe.module';

import { KorisnikModule } from '@pepsi-shared/_top-menu/korisnik/korisnik.module';
import { ToggleMenuBtnModule } from '@pepsi-shared/_top-menu/toggle-menu-btn/toggle-menu-btn.module';
import { DatePickerModule } from '@pepsi-shared/date-picker/date-picker.module';
import { SelectModule } from '@pepsi-shared/select/select.module';
import { FormsModule } from '@angular/forms'; /* za select komponentu */
import { SearchModule } from '@pepsi-shared/search/search.module';
// import { SearchRemoteApiComponent } from './search/search-remote-api.component';

// import { WorkerRouteComponent } from './worker-route/worker-route.component';
// import { WorkerRouteModule } from './worker-route/worker-route.module';
// import { CardLayoutComponent } from './worker-route/card-layout/card-layout.component';
// import { TableLayoutModule } from './worker-route/table-layout/table-layout.module';

@NgModule({
  declarations: [
    OdblokirajUnosPorudzbineComponent,
    // SearchRemoteApiComponent
  ],
  imports: [
    CommonModule,
    OdblokirajUnosPorudzbineRoutingModule,
    FormsModule, /* SelectComponent */
    // SuiDimmerModule, SuiSelectModule, SuiPopupModule, SuiCheckboxModule,
    SuiDimmerModule, SuiSelectModule, SuiCheckboxModule,
    CustomPipeModule,
    ToggleMenuBtnModule,
    KorisnikModule,
    DatePickerModule,
    SelectModule,
    SearchModule
    // SearchRemoteApiComponent,
    // TableLayoutModule
  ],
})
export class OdblokirajUnosPorudzbineModule { }
