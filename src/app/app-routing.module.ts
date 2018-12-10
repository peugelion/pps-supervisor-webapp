import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './providers/auth.service';
// import { Observable } from 'rxjs';

// import { LoginComponent } from './pages/login/login.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { RouteDetailsComponent } from './pages/dashboard-route-details/route-details.component';
// import { IzvestajKpisComponent } from './pages/izvestaj-kpis/izvestaj-kpis.component';
// import { HomeComponent } from './pages/home/home.component';
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
                // component: LoginComponent
                loadChildren: './pages/login/login.module#LoginModule'

            }, {
                path: '',
                // component: HomeComponent,
                loadChildren: './pages/home/home.module#HomeModule',
                canActivate: [AuthService]
            }, {
                path: 'dashboard/route-details/:Fk_Partner',
                // component: RouteDetailsComponent,
                // path: 'dashboard/route-details/:Fk_Partner',
                loadChildren: './pages/dashboard-route-details/route-details.module#RouteDetailsModule',
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
                // component: DashboardComponent,
                loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthService]
            }, {
                path: 'odblokiraj-unos-porudzbine',
                // component: IzvestajKpisComponent,
                loadChildren: './pages/odblokiraj-unos-porudzbine/odblokiraj-unos-porudzbine.module#OdblokirajUnosPorudzbineModule',
                canActivate: [AuthService]
            }, {
                path: 'izvestaj-kpis',
                // component: IzvestajKpisComponent,
                loadChildren: './pages/izvestaj-kpis/izvestaj-kpis.module#IzvestajKpisModule',
                canActivate: [AuthService]
            }, {
                path: '**',
                // component: HomeComponent,
                loadChildren: './pages/home/home.module#HomeModule',
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
