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
import { RouteDetailsComponentModule } from './pages/route-details/route-details.component.module';
import { WorkerRouteComponent } from './worker-route/worker-route.component';
import { DateTimeFormatPipeModule } from './pipes/date-time-format.pipe.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    //   LoginComponentModule,
      RouteDetailsComponentModule,
      DateTimeFormatPipeModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
