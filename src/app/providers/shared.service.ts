import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Observable string sources
  // private emitChangeSource = new Subject<any>();
  private _menuState = new BehaviorSubject<boolean>(false);
  // Observable string streams
  toggleChangeEmitted$ = this._menuState.asObservable();

  constructor() { }

  // Service message commands
  emitMenuToggle(change: any) {
      this._menuState.next(change);
  }
  // emitMenuToggle() {
  //     this._menuState.next(true);
  // }

  get isSidebarVisibleObs() {
    return this._menuState.asObservable(); // https://loiane.com/2017/08/angular-hide-navbar-login-page/
  }
}
