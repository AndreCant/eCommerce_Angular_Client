import { Component, OnInit } from '@angular/core';
import { LoginData } from '../../model/LoginData';
import { AuthService } from '../../services/auth/auth.service';
import { AppConstants } from '../../app.constants';
import { Router } from '@angular/router';
import { encrypt } from 'src/app/utility/Utitity';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginData;
  unauthorised: Boolean = false;

  constructor(private auth: AuthService, public router: Router) { 
    this.loginData = {email: '', password: ''};
  }

  ngOnInit(): void {}

  public login() {
    this.auth.authenticate(this.loginData).subscribe(res => {
      localStorage.setItem(AppConstants.LOGIN_STORAGE, encrypt(JSON.stringify(res)));
      this.router.navigate(['']);
    }, error => {
      this.checkError(error);
    });
  }

  private checkError(error: any){
    if (error && error.status == 401) {
      this.unauthorised = true;
    }
  }
}
