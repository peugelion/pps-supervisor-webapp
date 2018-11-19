import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './providers/auth.service';
import { Observable } from 'rxjs';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';
import { IzvestajKpisComponent } from './pages/izvestaj-kpis/izvestaj-kpis.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  },
  {
    path: 'route-details/:Fk_Partner',
    component: RouteDetailsComponent,
    canActivate: [AuthService]
  },
  {
    path: 'izvestaj-kpis',
    component: IzvestajKpisComponent,
    canActivate: [AuthService]
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService
  ]
})
export class AppRoutingModule {
  constructor(private authService: AuthService) {}
}
