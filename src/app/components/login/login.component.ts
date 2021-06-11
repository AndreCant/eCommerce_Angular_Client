import { Component, OnInit } from '@angular/core';
import { LoginData } from '../../model/LoginData';
import { AuthService } from '../../services/auth/auth.service';
import { AppConstants } from '../../app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginData;
  loginError: any;

  constructor(private auth: AuthService, public router: Router) { 
    this.loginData = {email: '', password: ''};
  }

  ngOnInit(): void {}

  login() {
    this.auth.authenticate(this.loginData).subscribe(res => {
      console.log(res);
      localStorage.setItem(AppConstants.LOGIN_STORAGE, JSON.stringify(res));
      this.router.navigate(['']);
    }, error => {
       this.loginError = error;
    });
  }
}
