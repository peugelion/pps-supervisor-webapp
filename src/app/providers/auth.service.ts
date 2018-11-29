import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// https://stackoverflow.com/questions/34660263/angular2-conditional-routing
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { Observable, Subject } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { BehaviorSubject, Observable, of} from 'rxjs';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';

const API_ROOT = environment.apiUrl; /* API ENDPOINT, eg. http://localhost:1337 */
const LOGIN_PATH = '/api/login';  // URL to web api
const LOGOUT_PATH = '/api/logout';  // URL to web api

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  
  HAS_LOGGED_IN = 'hasLoggedIn';

  private _authed = new BehaviorSubject<boolean>(false);
  private httpOptions = {
    withCredentials: true
  };

  // horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  // verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private http: HttpClient,
    public router: Router,
    public cookieService: CookieService,
    public snackBar: MatSnackBar,
    // public ppsAlert: AlertComponent
  ) {}

  authentificate(username: string, password: string) {
    const body = {
      'username': username,
      'password': password,
      'remember_me': 'true'
    };
    this.cookieService.set( 'hubieLoginUsername', username );
    this.cookieService.set( 'hubieLoginPassword', password );
    return this.http.post(`${API_ROOT}${LOGIN_PATH}`, body, this.httpOptions).toPromise()
      .then(response => {
            localStorage.setItem(this.HAS_LOGGED_IN, 'true');
            this._authed.next(true);
            // return true;
            return response;
        },
        err => {
          localStorage.setItem(this.HAS_LOGGED_IN, 'false');
          this._authed.next(false);
          console.warn(err.status);
          // return false;
          // return err.status;
          throw err;
        }
      );
  }

  // authentificate(username: string, password: string) {
  //   const body = {
  //     'username': username,
  //     'password': password,
  //     'remember_me': 'true'
  //   };
  //   this.cookieService.set( 'hubieLoginUsername', username );
  //   this.cookieService.set( 'hubieLoginPassword', password );
  //   return this.http.post(API_ROOT + LOGIN_PATH, body, this.httpOptions)
  //     .subscribe(response => {
  //         // localStorage.setItem('id_token', response.json().id_token);
  //         // this.router.navigate(['home']);
  //           localStorage.setItem(this.HAS_LOGGED_IN, 'true');
  //           this.loggedIn.next(true);
  //           // return true;
  //           return response;
  //       },
  //       err => {
  //         console.log('error', err);
  //         localStorage.setItem(this.HAS_LOGGED_IN, 'false');
  //         this.loggedIn.next(false);
  //         console.log('login error localStorage', localStorage.getItem(this.HAS_LOGGED_IN));
  //         if (err.error === 'Unauthorized') {
  //           console.log('Unauthorized');
  //           // this.router.navigateByUrl('/login');
  //           return false;
  //         }
  //       },
  //       () => {
  //         // this.finished = true
  //         console.log('login obs Finished');
  //       }
  //     );
  // }

  async logout(): Promise<any> {
    // return this.http.get(API_ROOT + this.LOGOUT_PATH, { headers: this.contentHeaders, withCredentials: true })
    return this.http.get(API_ROOT + LOGOUT_PATH, this.httpOptions)
    // .subscribe(
    .toPromise().then(
      response => {
          console.log('logout success');
          localStorage.setItem(this.HAS_LOGGED_IN, 'false');
          // localStorage.removeItem('userid');
          // localStorage.removeItem('username');
          // localStorage.removeItem('jwt');
          this._authed.next(false);
          this.router.navigateByUrl('/login');
          return true;
      },
      err => {
        // const httpErrText = err.error + ' (' +  err.status + ' ' + err.statusText + '). ';
        // // const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
        // // const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
        // this.snackBar.open(httpErrText, 'Zatvori', {
        //   'duration' : 10000,
        //   // horizontalPosition:  horizontalPosition,
        //   // verticalPosition: verticalPosition,
        //   'panelClass' : ['ui', 'negative', 'message'],
        // });
        this._authed.next(false);
        throw err;
        // return false;
      }
    );
  }

  isLoggedIn(): Promise<boolean> {
    return JSON.parse(localStorage.getItem(this.HAS_LOGGED_IN));
    // return isLoggedIn && await this.isSessionExpired();
  }

  get isLoggedInObs() {
    return this._authed.asObservable(); // https://loiane.com/2017/08/angular-hide-navbar-login-page/
  }

  // get isLoggedInObs(): Observable<boolean> {
  //   // this.isLoggedIn().then(() => {
  //   //   this.loggedIn.next(true) : this.loggedIn.next(false);
  //   // })
  //   // console.log('this.isLoggedIn()', this.isLoggedIn());
  //   return this._authed.asObservable(); // https://loiane.com/2017/08/angular-hide-navbar-login-page/
  // }


  // isLoggedInObs(): Observable<boolean> {
  //   return this._authed.asObservable();
  // }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
  //   // const isLoggedIn = false; // ... your login logic here
  //   // const isLoggedIn = this.isLoggedInObs();
  //   // console.log('canActivate isLoggedIn', this.isLoggedInObs());
  //   // const isLoggedIn = this.isLoggedInObs();
  //   const isLoggedIn = this.isLoggedIn();
  //   console.log('canActivate isLoggedIn', isLoggedIn);
  //   if (isLoggedIn) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isLoggedInObs.pipe(map(isLoggedIn => {
      if (isLoggedIn) {
          return true;
      } else {
        // console.log('canActivate isLoggedIn OBS is false ...');
        // this.authentificate(null, null).then((respData) => {
        //     console.log('data', respData);
        //     return true;
        //   }).catch(err => false);
        if (this.isLoggedIn()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
    }));
  }

  // async setUserId(userid: string) {
  //   return localStorage.setItem('userid', userid);
  // }

  async getUserId(): Promise<string> {
    return localStorage.getItem('userid');
  }

  async setUsername(username: string): Promise<any> {
    return localStorage.setItem('username', username);
  }

  async getUsername(): Promise<string> {
    return localStorage.getItem('username');
  }
}
