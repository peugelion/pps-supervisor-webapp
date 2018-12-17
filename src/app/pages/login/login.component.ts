import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
// import { debug } from 'util';
import { StateService } from '../../providers/state.service';
// import { ApiService } from '../../providers/api.service';
import * as LogRocket from 'logrocket';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  loginApiError: any = false; // bool or string
  loading = false; // disable login button after click\submit while waiting for loggin api reponse - no double login

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private auth: AuthService,
    private stateService: StateService,
    // private apiService: ApiService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(2)]],
        password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true; // block login btn
      this.auth.authentificate(this.loginForm.value.username, this.loginForm.value.password)
        .then((userData) => {          // console.log('data', userData);
          this.loading = false;
          this.loginApiError = !userData;
          console.log('login userData', userData);
          if (userData) {
            this.setLogRocketUser(this.loginForm.value.username);
            this.stateService.setUserData(userData);
            const isSupervisor = userData['permissions'] === 1;
            if (isSupervisor) {               // console.log('1 Supervisor -> homepage');
              this.router.navigate(['']);
            } else {                          // console.log('2 Nije Supervizor -> tlnr');
              this.router.navigate(['/tlnr']);
            }
          }
        }).catch(err => this.handleLoginError(err));

      // const login = this.auth.authentificate(this.loginForm.value.username, this.loginForm.value.password)
      //   .unsubscribe( x => {});
      // console.log('login', login);
        // .subscribe(
        //   (data) => {
        //     // this.auth._saveJwt(data.id_token);
        //     console.log('subs data', data);
        //     this.loading = false;
        //     if (data) {
        //       this.router.navigate(['']);
        //       this.stateService.setUserData(data);
        //     }
        //   },  // not necessary to call _saveJwt from here now.
        //   (err) => {
        //     console.log(err);
        //     this.loading = false;
        //     this.loginApiError = true;
        //   },
        //   () => console.log('Done [login cmp]')
        // );
  }

  setLogRocketUser(username) {
    if (environment.production) {
      console.log('logRocketUser', username, environment.production);
       LogRocket.identify(username); // an immutable ID from your db (preferred) /* https://docs.logrocket.com/reference#identify */
    }
  }

  handleLoginError(e) {
    this.loading = false;
    this.loginApiError = e.error + ' (' +  e.status + ' ' + e.statusText + '). ';
    if (e.status === 401) {
      this.loginApiError = 'Pogrešno korisničko ime i\\ili šifra ' + e.status;
    } else if (e.status === 400) {
      if (e.error === 'UserNotAuthorized') {
        return;
      }
      this.loginApiError = 'REST API nedostupan... ' + this.loginApiError;
    }
    // if (e.status === 504) {
    //   this.loginApiError_text = e.message;
    // }
    // this.loginApiError_text = e;
    console.log('login err', e);
  }

  // login(event, username, password) {
  //   console.log(event, username, password);
  //   event.preventDefault();
  //   return;
  //   // let body = JSON.stringify({ username, password });
  //   // this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
  //   //   .subscribe(
  //   //     response => {
  //   //       localStorage.setItem('id_token', response.json().id_token);
  //   //       this.router.navigate(['home']);
  //   //     },
  //   //     error => {
  //   //       alert(error.text());
  //   //       console.log(error.text());
  //   //     }
  //   //   );
  // }
}
