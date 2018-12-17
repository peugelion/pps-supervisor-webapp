import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../providers/shared.service';
import { AuthService } from '../providers/auth.service';
import { AlertComponent } from '@pepsi-app/_shared/alert/alert.component';
import { Router, NavigationEnd } from '@angular/router'; // za zatvaranje sidebar-a
import { filter } from 'rxjs/operators';                 // za zatvaranje sidebar-a

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
  // isSupervisor = false;

  appPages = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: 'world',
      // permissions: isSupervisor;
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
    private _authService: AuthService,
    router: Router, // za zatvaranje sidebar-a
  ) {
    _sharedService.toggleChangeEmitted$.subscribe(toggle => this.isSidebarVisible = toggle);
    /* zatvaram sidebar nakon promene rute */
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // console.log('event.url', event.url);
      _sharedService.emitMenuToggle(false); // zatvaram sidebar nakon promene rute
    });
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
