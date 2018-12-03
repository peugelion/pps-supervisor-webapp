/* angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
// import {RouteReuseStrategy} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

/* @angular/material */
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

/* 3rd party */
import {SuiModule} from 'ng2-semantic-ui';
import { CookieService } from 'ngx-cookie-service';
import 'hammerjs';
// import { WebStorageModule } from 'ngx-store';
// import { NgxLiquidCacheModule } from 'ngx-liquid-cache';

/* session logging, production only */
import * as LogRocket from 'logrocket';
if (environment.production) {
   LogRocket.init('kdwxer/pps-supervizor');
}

/* page layouts - sidebar VS no sidebar */
import { SidebarLayoutComponent } from './page-layout/sidebar-layout.component';
import { NoSidebarLayoutComponent } from './page-layout/no-sidebar-layout.component';
/* custom pipes */
import { CustomPipeModule } from './pipes/custom.pipe.module';
/* alert cmp */
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AlertComponent } from './@alert/alert/alert.component';
/* custom modules */
import { KorisnikModule } from '@pps/@top-menu/korisnik/korisnik.module';

@NgModule({
   declarations: [
      AppComponent,
      AlertComponent,
      SidebarLayoutComponent,
      NoSidebarLayoutComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      SuiModule,
      FormsModule,
      // NgxLiquidCacheModule.forRoot(),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      // RouteDetailsComponentModule,
      CustomPipeModule,
      NoopAnimationsModule,
      // BrowserAnimationsModule,
      MatSnackBarModule,
      KorisnikModule,
   ],
   providers: [
    CookieService,
    AlertComponent
   ],
   bootstrap: [AppComponent],
   // entryComponents: [
   // ]
})
export class AppModule { }
