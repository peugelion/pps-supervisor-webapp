import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteDetailsRoutingModule } from './route-details-routing.module';
// import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { RouteDetailsComponent } from './route-details.component';

import { SuiModule } from 'ng2-semantic-ui';

import { ZaliheTableComponent } from '../../@route-detail/zalihe-table/zalihe-table.component';
import { TabsComponent } from '../../@route-detail/tabs/tabs.component';

import { TableLayoutModule } from '@pps/pages/dashboard/table-layout/table-layout.module';

/* pipe */
import { CustomPipeModule } from '../../pipes/custom.pipe.module';
// import { TimeFormatModule } from '../../pipes/time-format.module';

@NgModule({
  declarations: [RouteDetailsComponent, ZaliheTableComponent, TabsComponent],
  imports: [
    CommonModule,
    RouteDetailsRoutingModule,
    // DashboardRoutingModule
    SuiModule,
    TableLayoutModule,
    CustomPipeModule,
    // TimeFormatModule
  ]
})
export class RouteDetailsModule { }
