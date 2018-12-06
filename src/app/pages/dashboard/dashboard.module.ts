import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SuiDimmerModule, SuiSelectModule, SuiPopupModule, SuiCheckboxModule } from 'ng2-semantic-ui';
import { CustomPipeModule } from '../../pipes/custom.pipe.module';

import { KorisnikModule } from '@pepsi-shared/_top-menu/korisnik/korisnik.module';
import { ToggleMenuBtnModule } from '@pepsi-shared/_top-menu/toggle-menu-btn/toggle-menu-btn.module';
import { DatePickerModule } from '@pepsi-shared/date-picker/date-picker.module';
import { SelectComponent } from './select/select.component';
  import { FormsModule } from '@angular/forms'; /* za select komponentu */

import { WorkerRouteComponent } from './worker-route/worker-route.component';
// import { WorkerRouteModule } from './worker-route/worker-route.module';
import { CardLayoutComponent } from './worker-route/card-layout/card-layout.component';
import { TableLayoutModule } from './worker-route/table-layout/table-layout.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SelectComponent,
    WorkerRouteComponent,
    CardLayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule, /* SelectComponent */
    SuiDimmerModule, SuiSelectModule, SuiPopupModule, SuiCheckboxModule,
    CustomPipeModule,
    DatePickerModule,
    ToggleMenuBtnModule,
    KorisnikModule,
    TableLayoutModule
  ],
})
export class DashboardModule { }
