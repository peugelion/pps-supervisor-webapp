import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './providers/auth.service';
import { SharedService } from './providers/shared.service';
import { AlertComponent } from './@alert/alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  // showSidebar$: Observable<boolean>;
  // private defaultShowSidebar = true;
  allowSidebarOnPage = false;

  title = 'app';
  isLoggedIn$: Observable<boolean>;
  isLoggedIn = false;
  isSidebarVisible$: Observable<boolean>;
  isSidebarVisible = false;

  appPages = [
    {
      title: 'Dashboard',
      route: 'dashboard',
      icon: 'world'
    },
    {
      title: 'Izveštaj KPIs',
      route: 'izvestaj-kpis',
      icon: 'newspaper outline'
    },
  ];

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _sharedService: SharedService,
    public ppsAlert: AlertComponent
  ) {
    this.setSidebarAllowedOnPage();
    // this.isSidebarVisible$ = this._sharedService.isSidebarVisibleObs;
    // this.isSidebarVisible$.subscribe(toggle => this.isSidebarVisible = toggle);
    _sharedService.toggleChangeEmitted$.subscribe(toggle => this.isSidebarVisible = toggle);
  }

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp() {
    // this.isLoggedIn$ = this._authService.isLoggedInObs;
    // this.isSidebarVisible$ = this._sharedService.isSidebarVisibleObs;
    this.isLoggedIn = await this._authService.isLoggedIn();
    console.log('initializeApp isLoggedIn', this.isLoggedIn);
  }

  //

  setSidebarAllowedOnPage() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationEnd') {
        const name = (<any>event).url.split('/').slice(-1)[0];
        this.allowSidebarOnPage = name !== 'login' && name !== '' ; //
      }
    });
  }

  sidebarToggle() {
    // this.isSidebarVisible$.next(true);
    this.isSidebarVisible = true;
  }

  //

  logout() {
    this._sharedService.emitMenuToggle(false);

    this._authService.logout().catch(e => {
      this.ppsAlert.showAlert({
        'type' : 'error',
        'text' : e.error + ' (' +  e.status + ' ' + e.statusText + '). ',
        'duration': 8 // 'action': null, 'verticalPosition' : null, 'panelClass' : null
      });
    });
  }
}
