import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';
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

  loggedIn = false;

  constructor( ) {
    this.initializeApp();

    // this.authService.handleAuthentication();
  }

  ngOnInit() {
    // this.checkLoginStatus();
    // this.listenForLoginEvents();
  }

  initializeApp() {
    // this.platform.ready().then(() => {
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });
  }
}
