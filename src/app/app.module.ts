import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {RouteReuseStrategy} from '@angular/router';
// import {HttpClientModule} from '@angular/common/http';
import {SuiModule} from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { WebStorageModule } from 'ngx-store';
import { HttpClientModule } from '@angular/common/http';
import { NgxLiquidCacheModule } from 'ngx-liquid-cache';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { RouteDetailsComponentModule } from './pages/route-details/route-details.component.module';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';

import { WorkerRouteComponent } from './@dashboard/worker-route/worker-route.component';
import { DateTimeFormatPipeModule } from './pipes/date-time-format.pipe.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import 'hammerjs';
import { TabsComponent } from './@route-detail/tabs/tabs.component';
import { ZaliheTableComponent } from './@route-detail/zalihe-table/zalihe-table.component';
import { ChoicesModalComponent } from './@modal/choices-modal.component';
import { TableLayoutComponent } from './@dashboard/table-layout/table-layout.component';
import { CardLayoutComponent } from './@dashboard/card-layout/card-layout.component';

@NgModule({
    exports: [
      FormsModule,
      ReactiveFormsModule
    ],
   declarations: [
      AppComponent,
      DashboardComponent,
      WorkerRouteComponent,
      LoginComponent,
      RouteDetailsComponent,
      TabsComponent,
      ZaliheTableComponent,
      ChoicesModalComponent,
      TableLayoutComponent,
      CardLayoutComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      SuiModule,
      FormsModule,
      ReactiveFormsModule,
      NgxLiquidCacheModule.forRoot(),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      // RouteDetailsComponentModule,
      DateTimeFormatPipeModule,
   ],
   providers: [
    CookieService
   ],
   bootstrap: [AppComponent],

   entryComponents: [
      ChoicesModalComponent,
      // RouteUnblockModal
   ]
})
export class AppModule { }
