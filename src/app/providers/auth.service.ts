import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const apiUrl = environment.apiUrl; /* API ENDPOINT, eg. http://localhost:1337 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  HAS_LOGGED_IN = 'hasLoggedIn';

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  private loginUrl = '/api/login';  // URL to web api

  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  async login(username: string, password: string): Promise<any> {
    // return this.http.post(apiUrl + this.loginUrl, {username, password}).subscribe(() => {
      localStorage.setItem(this.HAS_LOGGED_IN, 'true');
      // this.setUserId  (auth['user']['id']);
      // this.setUsername(auth['user']['username']);
      this.loggedIn.next(true);
      // this.router.navigate(['/']);
      this.router.navigateByUrl('/');
      return true;
    // });
  }

  logout(): Promise<any> {
    localStorage.setItem(this.HAS_LOGGED_IN, 'false');
    // localStorage.removeItem('userid');
    // localStorage.removeItem('username');
    // localStorage.removeItem('jwt');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    return;
  }

  get isLoggedInObs() {
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
