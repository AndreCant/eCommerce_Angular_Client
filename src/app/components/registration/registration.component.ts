import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'src/app/utility/CustomValidators';
import { encrypt } from 'src/app/utility/Utility';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  conflictError: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, public router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]], 
      email: ['',[Validators.required, Validators.email]], 
      password: ['', [CustomValidators.validatePassword]],
      role: ['customer', []],
      terms: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {}

  register(){
    delete this.registerForm.value.terms;

    this.auth.register(this.registerForm.value).subscribe(res => {
      localStorage.setItem(AppConstants.LOGIN_STORAGE, encrypt(JSON.stringify(res)));
      this.router.navigate(['']);
    }, error => {
       if(error.status === 409){
        this.conflictError = true;
      }
    });
  }

}
