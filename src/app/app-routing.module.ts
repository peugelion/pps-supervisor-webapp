import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './providers/auth.service';
import { Observable } from 'rxjs';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';
import { IzvestajKpisComponent } from './pages/izvestaj-kpis/izvestaj-kpis.component';
import { HomeComponent } from './pages/home/home.component';
import { NoSidebarLayoutComponent } from './page-layout/no-sidebar-layout.component';
import { SidebarLayoutComponent } from './page-layout/sidebar-layout.component';

/* https://www.devglan.com/angular/angular-hide-sidenav-login-page */
/* https://stackoverflow.com/questions/49728144/hiding-navigation-bar-from-login-page-in-angular-4 */

const routes: Routes = [
    {
        path: '',
        component: NoSidebarLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }, {
                path: '',
                component: HomeComponent,
                canActivate: [AuthService]
            }
        ]
    },
    {
        path: '',
        component: SidebarLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthService]
            }, {
                path: 'route-details/:Fk_Partner',
                component: RouteDetailsComponent,
                canActivate: [AuthService]
            }, {
                path: 'izvestaj-kpis',
                component: IzvestajKpisComponent,
                canActivate: [AuthService]
            }, {
                path: '**',
                component: HomeComponent,
                canActivate: [AuthService]
            }
        ]
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
