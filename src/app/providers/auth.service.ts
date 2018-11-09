import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
// https://stackoverflow.com/questions/34660263/angular2-conditional-routing
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
// import { Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';


const API_ROOT_URL = environment.apiUrl; /* API ENDPOINT, eg. http://localhost:1337 */
const LOGIN_PATH = '/api/login';  // URL to web api
const LOGOUT_PATH = '/api/logout';  // URL to web api

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  HAS_LOGGED_IN = 'hasLoggedIn';

  private loggedIn = new BehaviorSubject<boolean>(false);
  private httpOptions = {
    withCredentials: true
  };

  constructor(
    private http: HttpClient,
    public router: Router,
    public cookieService: CookieService
  ) {}

  async login(username: string, password: string): Promise<any> {
    const body = {
      'username': username,
      'password': password,
      'remember_me': 'true'
    };
    this.cookieService.set( 'hubieLoginUsername', username );
    this.cookieService.set( 'hubieLoginPassword', password );
    // return this.http.post(API_ROOT_URL + LOGIN_PATH, body, this.httpOptions)
    //   .subscribe(
    return this.http.post(API_ROOT_URL + LOGIN_PATH, body, this.httpOptions).toPromise()
      .then(response => {
          // localStorage.setItem('id_token', response.json().id_token);
          // this.router.navigate(['home']);
            localStorage.setItem(this.HAS_LOGGED_IN, 'true');
            this.loggedIn.next(true);
            // return true;
            return response;
        },
        err => {
          console.log('error', err);
          localStorage.setItem(this.HAS_LOGGED_IN, 'false');
          this.loggedIn.next(false);
          console.log('login error localStorage', localStorage.getItem(this.HAS_LOGGED_IN));
          if (err.error === 'Unauthorized') {
            console.log('Unauthorized');
            // this.router.navigateByUrl('/login');
            return false;
          }
        }
      );
  }

  async logout(): Promise<any> {
    // return this.http.get(API_ROOT_URL + this.LOGOUT_PATH, { headers: this.contentHeaders, withCredentials: true })
    return this.http.get(API_ROOT_URL + LOGOUT_PATH, this.httpOptions)
    .subscribe(
      response => {
          console.log('logout success');
          localStorage.setItem(this.HAS_LOGGED_IN, 'false');
          // localStorage.removeItem('userid');
          // localStorage.removeItem('username');
          // localStorage.removeItem('jwt');
          this.loggedIn.next(false);
          this.router.navigateByUrl('/login');
          return true;
      },
      error => {
        // alert(error.text());
        console.log('this.http.post error', error.text());
        return false;
      }
    );
  }

  get isLoggedInObs() {
    // this.isLoggedIn().then(() => {
    //   this.loggedIn.next(true) : this.loggedIn.next(false);
    // })
    // console.log('this.isLoggedIn()', this.isLoggedIn());
    return this.loggedIn.asObservable(); // https://loiane.com/2017/08/angular-hide-navbar-login-page/
  }

  isLoggedIn(): Promise<boolean> {
    return JSON.parse(localStorage.getItem(this.HAS_LOGGED_IN));
    // return isLoggedIn && await this.isSessionExpired();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const isLoggedIn = false; // ... your login logic here
    const isLoggedIn = this.isLoggedIn();
    console.log('canActivate', isLoggedIn);
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  async setUserId(userid: string) {
    return localStorage.setItem('userid', userid);
  }

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
