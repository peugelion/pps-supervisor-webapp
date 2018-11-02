import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {RouteReuseStrategy} from '@angular/router';
// import {HttpClientModule} from '@angular/common/http';
import {SuiModule} from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { WebStorageModule } from 'ngx-store';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './pages/login/login.component';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RouteDetailsComponent,
    DateTimeFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SuiModule,
    ReactiveFormsModule,
    // WebStorageModule,
  ],
  providers: [
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
