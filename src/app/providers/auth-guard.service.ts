import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '@pepsi-app/providers/state.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuardService implements CanActivate {
export class RoleGuardService implements CanActivate {

  constructor(
    private router: Router,
    private _authService: AuthService,
    private stateService: StateService
  ) {}

  // canActivate() {
  //   return this.authService.isLoggedIn();
  // }

  /* https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3 */
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const isLoggedIn$ = this._authService.isLoggedInObs;
    return isLoggedIn$.pipe(map(isLoggedIn => {
      if (isLoggedIn && this.isAllowedOnRoute(next)) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }));
  }

  isAllowedOnRoute(next: ActivatedRouteSnapshot): boolean {
    // console.log('isAllowedOnRoute USO ... provera dal je user rola 1 - supervizor ili rola 2 - tlnr');
    const supervizor = this.stateService.getSupervizor();
    const isSupervizor = supervizor && Object.keys(supervizor).length && supervizor.constructor === Object; // if not an empty obj
    /* expectedRole will be passed from the route config on the data property (app-routing.module.ts) */
    const expectedRole = next.data.expectedRole;
    // console.log(' isAllowedOnRoute: supervizor?', isSupervizor, 'expectedRole', expectedRole);
    const isAllowedOnRoute = (!isSupervizor && expectedRole === 'tlnr') || (isSupervizor && !expectedRole);
    // console.log('     isAllowedOnRoute ? :', isAllowedOnRoute);
    return isAllowedOnRoute;
  }

  // isLoggedIn(): Observable<boolean> {
  //   return this._authService.isLoggedInObs.pipe(map(isLoggedInObs => {
  //     // if (isLoggedInObs) {                         // console.log('  canActivate isLoggedInObs is true ...');
  //     //   return true;
  //     // } else if (this._authService.isLoggedIn()) {  console.log('    canActivate isLoggedInObs is false, localStorage is true ...');
  //     //   return true;
  //     // } else {                                console.log('    canActivate isLoggedInObs is false, localStorage is false, redirect.');
  //     //   return false;
  //     // }

  //     // return isLoggedInObs;
  //   }));
  // }
}
