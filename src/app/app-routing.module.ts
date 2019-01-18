import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './providers/auth.service';
// import { Observable } from 'rxjs';
import { RoleGuardService } from './providers/auth-guard.service';

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
                canActivate: [RoleGuardService]
            }, {
                path: 'dashboard/route-details/:Fk_Partner',
                // component: RouteDetailsComponent,
                // path: 'dashboard/route-details/:Fk_Partner',
                loadChildren: './pages/dashboard-route-details/route-details.module#RouteDetailsModule',
                canActivate: [RoleGuardService]
            }, {
                path: 'tlnr',
                loadChildren: './pages-tlnr/tlnr/tlnr.module#TlnrModule',
                canActivate: [RoleGuardService],
                data: {
                    expectedRole: 'tlnr'
                }
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
                canActivate: [RoleGuardService]
            }, {
                path: 'odblokiraj-unos-porudzbine',
                // component: IzvestajKpisComponent,
                loadChildren: './pages/odblokiraj-unos-porudzbine/odblokiraj-unos-porudzbine.module#OdblokirajUnosPorudzbineModule',
                canActivate: [RoleGuardService]
            }, {
                // path: 'izvestaj-kpis',
                path: 'report-daily-sales-kpis/by-customer-by-sku',
                // component: IzvestajKpisComponent,
                loadChildren: './pages/izvestaj-kpis/izvestaj-kpis.module#IzvestajKpisModule',
                canActivate: [RoleGuardService]
            }, {
                path: 'report-daily-sales-kpis/by-area-by-sku',
                loadChildren: './pages/izvestaj-kpis/by-area-by-sku/by-area-by-sku.module#ByAreaBySkuModule',
                canActivate: [RoleGuardService]
            }, {
                path: 'report-daily-sales-kpis/by-area-by-sku/:dali8OZ',
                loadChildren: './pages/izvestaj-kpis/by-area-by-sku/by-area-by-sku.module#ByAreaBySkuModule',
                canActivate: [RoleGuardService]
            }, {
                path: '**',
                // component: HomeComponent,
                loadChildren: './pages/home/home.module#HomeModule',
                canActivate: [RoleGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        AuthService,
        RoleGuardService
    ]
})

export class AppRoutingModule {
    constructor(
        // private authService: AuthService,
        // private authGuardService: RoleGuardService
    ) { }
}
