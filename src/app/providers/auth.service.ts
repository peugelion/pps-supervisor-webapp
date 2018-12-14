import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
/* https://stackoverflow.com/questions/34660263/angular2-conditional-routing */
// import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
// import { Observable, Subject } from 'rxjs';
// import { catchError, map} from 'rxjs/operators';
// import { BehaviorSubject, Observable, of} from 'rxjs';

const API_ROOT = environment.apiUrl; /* API ENDPOINT, eg. http://localhost:1337 */
const LOGIN_PATH = '/api/login';  // URL to web api
const LOGOUT_PATH = '/api/logout';  // URL to web api

@Injectable({
  providedIn: 'root'
})
// export class AuthService implements CanActivate {
export class AuthService {
  HAS_LOGGED_IN = 'hasLoggedIn';

  /* https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243 */
  // private _authed = new BehaviorSubject<boolean>(false);
  private _authed = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private http: HttpClient,
    public router: Router,
    public cookieService: CookieService
  ) {
    // const isLoggedIn = this.isLoggedIn();
    // isLoggedIn ? this._authed.next(true) : this._authed.next(false);
  }

  // isLoggedIn(): Promise<boolean> {
  //   return JSON.parse(localStorage.getItem(this.HAS_LOGGED_IN));
  //   // return isLoggedIn && await this.isSessionExpired();
  // }
  private isLoggedIn(): boolean {
    // return !!localStorage.getItem(this.HAS_LOGGED_IN);
    return JSON.parse(localStorage.getItem(this.HAS_LOGGED_IN));
  }

  /**
  *
  * @returns {Observable<T>}
  */
  get isLoggedInObs() {
    return this._authed.asObservable(); // https://loiane.com/2017/08/angular-hide-navbar-login-page/
  }

  /**
  *  Login the user then tell all the subscribers about the new status
  */
  authentificate(username: string, password: string) {
    const body = {
      'username': username,
      'password': password,
      'remember_me': 'true'
    };
    this.cookieService.set( 'hubieLoginUsername', username );
    this.cookieService.set( 'hubieLoginPassword', password );
    return this.http.post(`${API_ROOT}${LOGIN_PATH}`, body, {withCredentials: true}).toPromise()
      .then(response => {
            localStorage.setItem(this.HAS_LOGGED_IN, 'true');
            this._authed.next(true);
            return response;  // return true;
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

  /**
  * Log out the user then tell all the subscribers about the new status
  */
  async logout(): Promise<any> {
    return this.http.get(API_ROOT + LOGOUT_PATH, {withCredentials: true})
    // .subscribe(
    .toPromise().then(
      response => {
        localStorage.setItem(this.HAS_LOGGED_IN, 'false');
        this._authed.next(false);
        // localStorage.removeItem('userid');
        // localStorage.removeItem('username');
        // localStorage.removeItem('jwt');
        this.router.navigateByUrl('/login');
        return true;
      },
      err => {
        localStorage.setItem(this.HAS_LOGGED_IN, 'false');
        this._authed.next(false);
        throw err;
      }
    );
  }

  // async setUsername(username: string): Promise<any> {
  //   return localStorage.setItem('username', username);
  // }
  // async getUsername(): Promise<string> {
  //   return localStorage.getItem('username');
  // }

  // async setUserId(userid: string) {
  //   return localStorage.setItem('userid', userid);
  // }
  // async getUserId(): Promise<string> {
  //   return localStorage.getItem('userid');
  // }
}
