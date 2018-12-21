// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService } from './providers/auth.service';
// import { SharedService } from './providers/shared.service';
// import 'rxjs/add/operator/filter';
// import {
//   Router,
//   NavigationStart, NavigationEnd,
//   // NavigationError, NavigationCancel, RoutesRecognized,
//   ActivatedRoute
// } from '@angular/router';
// import { filter, debounceTime } from 'rxjs/operators';

// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';
// import { SharedService } from '@pepsi-app/providers/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  // title = 'app';
  // isLoggedIn$: Observable<boolean>;
  // isLoggedIn = false;

  constructor(
    // private _authService: AuthService,
    // private _sharedService: SharedService, router: Router, // za zatvaranje sidebar-a
  ) {
    // router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   console.log('event.url', event.url);
    //   this._sharedService.emitMenuToggle(false); // zatvaram sidebar nakon promene rute
    // });
  }

  // async ngOnInit() {
  // console.log('initializeApp');
  // this.isLoggedIn$ = this._authService.isLoggedInObs;
  // this.isLoggedIn = await this._authService.isLoggedIn();
  // }
}
