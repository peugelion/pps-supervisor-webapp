import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
// import { debug } from 'util';
import { StateService } from '../../providers/state.service';
// import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  // isLoggedIn = false;

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

  // ngOnDestroy() {
  //   this.stateService.setSelectedDate(new Date(this.dateString));
  // }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true; // block login btn
      this.auth.authentificate(this.loginForm.value.username, this.loginForm.value.password)
        .then((respData) => {          // console.log('data', respData);
          this.loading = false;
          this.loginApiError = !respData;
          if (respData) {
            this.router.navigate(['']);
            this.stateService.setUserData(respData);
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

  handleLoginError(e) {
    this.loading = false;
    this.loginApiError = e.error + ' (' +  e.status + ' ' + e.statusText + '). ';
    if (e.status === 401) {
      this.loginApiError = 'Pogrešno korisničko ime i\ili šifra ' + e.status;
    } else if (e.status === 400) {
      this.loginApiError = 'REST API nedostupan... ' + this.loginApiError;
    }
    // if (e.status === 504) {
    //   this.loginApiError_text = e.message;
    // }
    // this.loginApiError_text = e;
    console.log('login err', e);
  }

  login(event, username, password) {
    console.log(event, username, password);
    event.preventDefault();
    return;
    // let body = JSON.stringify({ username, password });
    // this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
    //   .subscribe(
    //     response => {
    //       localStorage.setItem('id_token', response.json().id_token);
    //       this.router.navigate(['home']);
    //     },
    //     error => {
    //       alert(error.text());
    //       console.log(error.text());
    //     }
    //   );
  }
}
