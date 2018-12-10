import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../providers/shared.service';
import { AuthService } from '../providers/auth.service';
import { AlertComponent } from '@pepsi-app/_shared/alert/alert.component';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent {
  // showSidebar$: Observable<boolean>;
  // private defaultShowSidebar = true;
  allowSidebarOnPage = false;
  isSidebarVisible$: Observable<boolean>;
  isSidebarVisible = false;

  appPages = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: 'world'
    },
    {
      title: 'Odblokiraj unos porudžbine',
      route: '/odblokiraj-unos-porudzbine',
      icon: 'redo'
    },
    {
      title: 'Izveštaj KPIs',
      route: '/izvestaj-kpis',
      icon: 'newspaper outline'
    },
  ];

  constructor(
    public ppsAlert: AlertComponent,
    private _sharedService: SharedService,
    private _authService: AuthService
  ) {
    // this.setSidebarAllowedOnPage();
    // this.isSidebarVisible$ = this._sharedService.isSidebarVisibleObs;
    // this.isSidebarVisible$.subscribe(toggle => this.isSidebarVisible = toggle);
    _sharedService.toggleChangeEmitted$.subscribe(toggle => this.isSidebarVisible = toggle);
  }

  sidebarToggle() {
    // this.isSidebarVisible$.next(true);
    this.isSidebarVisible = true;
  }

  logout() {
    this._sharedService.emitMenuToggle(false);
    this._authService.logout().catch(e => {
      this.ppsAlert.showErrorAlert({
        'text' : e.error + ' (' +  e.status + ' ' + e.statusText + '). ',
      });
    });
  }

}
