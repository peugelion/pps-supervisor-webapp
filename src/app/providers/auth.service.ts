import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// import { Headers } from '@angular/http';


const apiUrl = environment.apiUrl; /* API ENDPOINT, eg. http://localhost:1337 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  HAS_LOGGED_IN = 'hasLoggedIn';

  private loggedIn = new BehaviorSubject<boolean>(false);
  private httpOptions = {
    withCredentials: true
  };
  private loginUrl = '/login';  // URL to web api
  private logoutUrl = '/logout';  // URL to web api

  constructor(
    private http: HttpClient,
    public router: Router,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const body = {
      'username': username,
      'password': password,
      'remember_me': 'true'
    };
    return this.http.post(apiUrl + this.loginUrl, body, this.httpOptions)
      .subscribe(
        response => {
            console.log('login success');
            localStorage.setItem(this.HAS_LOGGED_IN, 'true');
            // localStorage.setItem('id_token', response.json().id_token);
            // this.router.navigate(['home']);
            this.loggedIn.next(true);
            return true;
        },
        error => {
          // alert(error.text());
          console.log('this.http.post error', error.text());
          return false;
        }
      );
  }

  async logout(): Promise<any> {
    // return this.http.get(apiUrl + this.logoutUrl, { headers: this.contentHeaders, withCredentials: true })
    return this.http.get(apiUrl + this.logoutUrl, this.httpOptions)
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

  async isLoggedIn(): Promise<boolean> {
    return JSON.parse(localStorage.getItem(this.HAS_LOGGED_IN));
    // return isLoggedIn && await this.isSessionExpired();
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
