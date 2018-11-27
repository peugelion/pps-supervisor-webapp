/* angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
// import {RouteReuseStrategy} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* @angular/material */
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
// import {
//    MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule,MatTableModule, MatSortModule, MatPaginatorModule
// } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatInputModule } from '@angular/material/Input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';

/* 3rd party */
// import { WebStorageModule } from 'ngx-store';
import {SuiModule} from 'ng2-semantic-ui';
import { NgxLiquidCacheModule } from 'ngx-liquid-cache';
import { CookieService } from 'ngx-cookie-service';
import 'hammerjs';

/* modules */
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { RouteDetailsComponentModule } from './pages/route-details/route-details.component.module';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';
import { IzvestajKpisComponent } from './pages/izvestaj-kpis/izvestaj-kpis.component';
import { HomeComponent } from './pages/home/home.component';

/* pipes */
import { CustomPipeModule } from './pipes/custom.pipe.module';

/* session logging, production only */
import * as LogRocket from 'logrocket';
if (environment.production) {
   LogRocket.init('kdwxer/pps-supervizor');
}

/* components */
import { WorkerRouteComponent } from './@dashboard/worker-route/worker-route.component';
import { TabsComponent } from './@route-detail/tabs/tabs.component';
import { ZaliheTableComponent } from './@route-detail/zalihe-table/zalihe-table.component';
import { ChoicesModalComponent } from './@modal/choices-modal.component';
import { TableLayoutComponent } from './@dashboard/table-layout/table-layout.component';
import { CardLayoutComponent } from './@dashboard/card-layout/card-layout.component';
import { TableSortingComponent } from './@table/table-sorting/table-sorting.component';
import { DatePickerComponent } from './@date-picker/date-picker/date-picker.component';
import { SelectComponent } from './@select/select/select.component';
import { SearchComponent } from './@search/search/search.component';
import { SearchRemoteApiComponent } from './@search/search/search-remote-api.component';
import { AlertComponent } from './@alert/alert/alert.component';
import { QuickListComponent } from './@search/quick-list/quick-list.component';
import { KorisnikComponent } from './@top-menu/korisnik/korisnik.component';
import { ToggleMenuBtnComponent } from './@top-menu/toggle-menu-btn/toggle-menu-btn.component';

@NgModule({
    exports: [
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
    ],
   declarations: [
      AppComponent,
      DashboardComponent,
      WorkerRouteComponent,
      LoginComponent,
      RouteDetailsComponent,
      HomeComponent,
      IzvestajKpisComponent,
      TabsComponent,
      ZaliheTableComponent,
      ChoicesModalComponent,
      TableLayoutComponent,
      CardLayoutComponent,
      TableSortingComponent,
      DatePickerComponent,
      SelectComponent,
      SearchComponent,
      SearchRemoteApiComponent,
      AlertComponent,
      QuickListComponent,
      KorisnikComponent,
      ToggleMenuBtnComponent,
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
      CustomPipeModule,
      NoopAnimationsModule,
      // BrowserAnimationsModule,
      MatTableModule, MatSortModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSnackBarModule,
   ],
   providers: [
    CookieService,
    AlertComponent
   ],
   bootstrap: [AppComponent],

   entryComponents: [
      ChoicesModalComponent,
      // RouteUnblockModal
   ]
})
export class AppModule { }
