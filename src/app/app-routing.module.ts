import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './providers/auth.service';
import { Observable } from 'rxjs';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';


let isLoggedIn$: Observable<boolean>;

const routes: Routes = [
  {
    path: '',
    redirectTo: isLoggedIn$ ? '/dashboard' : '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'route-details/:id/:date',
    component: RouteDetailsComponent
  },
  {
    path: 'route-details/:id',
    component: RouteDetailsComponent
  },
  {
    path: '**',
     component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    isLoggedIn$ = this.authService.isLoggedInObs;
  }
}
