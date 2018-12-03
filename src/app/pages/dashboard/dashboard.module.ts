import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { SuiModule } from 'ng2-semantic-ui';

import { CustomPipeModule } from '../../pipes/custom.pipe.module';

import { KorisnikModule } from '../../@top-menu/korisnik/korisnik.module';
import { ToggleMenuBtnModule } from '../../@top-menu/toggle-menu-btn/toggle-menu-btn.module';

import { DatePickerModule } from '../../@date-picker/date-picker/date-picker.module';
// import { SelectModule } from '../../@select/select/select.module';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms'; /* za select komponentu */

import { WorkerRouteComponent } from './worker-route/worker-route.component';
// import { WorkerRouteModule } from './worker-route/worker-route.module';
import { CardLayoutComponent } from './card-layout/card-layout.component';
import { TableLayoutModule } from './table-layout/table-layout.module';

import { ChoicesModalComponent } from './worker-route/@modal/choices-modal.component';
// import { RouteUnblockModal } from './worker-route/@modal/choices-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SelectComponent,
    WorkerRouteComponent,
    CardLayoutComponent,
    ChoicesModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    SuiModule,
    FormsModule, /* SelectComponent */

    CustomPipeModule,
    
    DatePickerModule,
    // SelectModule,
    ToggleMenuBtnModule,
    KorisnikModule,

    // WorkerRouteModule
    TableLayoutModule,
  ],
  entryComponents: [
    ChoicesModalComponent
  ]
})
export class DashboardModule { }
