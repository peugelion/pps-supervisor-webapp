import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  // isLoggedIn = false;

  loginApiError = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private auth: AuthService
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

      this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
        .then((isLoggedIn) => {
          this.loginApiError = !isLoggedIn;
        }).catch(err => this.loginApiError = false);
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
