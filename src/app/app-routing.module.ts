import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './providers/auth.service';
import { Observable } from 'rxjs';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
    path: '**',
    component: DashboardComponent,
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
