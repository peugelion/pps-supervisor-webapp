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
import {SuiSidebarModule, SuiModalModule} from 'ng2-semantic-ui';
import { CookieService } from 'ngx-cookie-service';
import 'hammerjs';
// import { WebStorageModule } from 'ngx-store';
// import { NgxLiquidCacheModule } from 'ngx-liquid-cache';

/* session logging, production only */
import * as LogRocket from 'logrocket';
if (environment.production) {
   LogRocket.init('kdwxer/pps-supervizor');
}

import { SidebarLayoutComponent } from './page-layout/sidebar-layout.component';       /* page layout - sidebar */
import { NoSidebarLayoutComponent } from './page-layout/no-sidebar-layout.component';  /* page layout - no sidebar */
import {MatSnackBarModule} from '@angular/material/snack-bar';                         /* alert cmp */
import { AlertComponent } from '@pepsi-shared/alert/alert.component';                  /* alert cmp */
import { KorisnikModule } from '@pepsi-shared/_top-menu/korisnik/korisnik.module';
import { CustomPipeModule } from '@pepsi-app/pipes/custom.pipe.module';                /* custom pipes */

import { ChoicesModalComponent } from '@pepsi-app/pages/dashboard/worker-route/@modal/choices-modal.component';
   import { SuiCheckboxModule } from 'ng2-semantic-ui';

@NgModule({
   declarations: [
      AppComponent,
      AlertComponent,
      SidebarLayoutComponent,
      NoSidebarLayoutComponent,
      ChoicesModalComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      SuiSidebarModule, SuiModalModule,
      // NgxLiquidCacheModule.forRoot(),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      // RouteDetailsComponentModule,
      CustomPipeModule,
      NoopAnimationsModule,
      // BrowserAnimationsModule,
      MatSnackBarModule,
      KorisnikModule,
      SuiCheckboxModule, /* ChoicesModalComponent */
   ],
   providers: [
    CookieService,
    AlertComponent
   ],
   bootstrap: [AppComponent],
   entryComponents: [
      ChoicesModalComponent /* modal mora biti odma dostupan */
   ]
})
export class AppModule { }
