import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './providers/auth.service';
// import { SharedService } from './providers/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  title = 'app';
  isLoggedIn$: Observable<boolean>;
  isLoggedIn = false;

  constructor(private _authService: AuthService) {}

  async ngOnInit() {
    console.log('initializeApp');
    // this.isLoggedIn$ = this._authService.isLoggedInObs;
    this.isLoggedIn = await this._authService.isLoggedIn();
  }
}
