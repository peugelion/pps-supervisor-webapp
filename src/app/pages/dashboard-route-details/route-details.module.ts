import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteDetailsRoutingModule } from './route-details-routing.module';
// import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { RouteDetailsComponent } from './route-details.component';

import { ZaliheTableComponent } from './zalihe-table/zalihe-table.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { TabsComponent } from './tabs/tabs.component';
import { SuiTabsModule, SuiDimmerModule } from 'ng2-semantic-ui';

import { TableLayoutModule } from '@pepsi-app/pages/dashboard/worker-route/table-layout/table-layout.module';

/* pipe */
import { CustomPipeModule } from '../../pipes/custom.pipe.module';
// import { TimeFormatModule } from '../../pipes/time-format.module';

/* mobile geastures (swipe ...) */
import 'hammerjs';

@NgModule({
  declarations: [RouteDetailsComponent, ZaliheTableComponent, TabsComponent, ImageSliderComponent],
  imports: [
    CommonModule,
    RouteDetailsRoutingModule,
    // DashboardRoutingModule
    TableLayoutModule,
    CustomPipeModule,
    // TimeFormatModule
    SuiTabsModule, SuiDimmerModule
  ]
})
export class RouteDetailsModule { }
