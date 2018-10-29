import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn$: Observable<boolean>;

  appPages = [
    {
      title: 'Login',
      route: 'login',
      icon: 'sign-in'
    },
    {
      title: 'Page2',
      route: 'page2',
      icon: 'calendar'
    },
    {
      title: 'Page3',
      route: 'page3',
      icon: 'calendar'
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp() {
    this.isLoggedIn$ = this.authService.isLoggedInObs;
  }

  async logout() {
    this.authService.logout();
  }
}
