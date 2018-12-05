import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteDetailsRoutingModule } from './route-details-routing.module';
// import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { RouteDetailsComponent } from './route-details.component';

import { ZaliheTableComponent } from './zalihe-table/zalihe-table.component';
import { TabsComponent } from './tabs/tabs.component';
  import { SuiTabsModule } from 'ng2-semantic-ui';

import { TableLayoutModule } from '@pepsi-app/pages/dashboard/table-layout/table-layout.module';

/* pipe */
import { CustomPipeModule } from '../../pipes/custom.pipe.module';
// import { TimeFormatModule } from '../../pipes/time-format.module';

@NgModule({
  declarations: [RouteDetailsComponent, ZaliheTableComponent, TabsComponent],
  imports: [
    CommonModule,
    RouteDetailsRoutingModule,
    // DashboardRoutingModule
    TableLayoutModule,
    CustomPipeModule,
    // TimeFormatModule
    SuiTabsModule
  ]
})
export class RouteDetailsModule { }
