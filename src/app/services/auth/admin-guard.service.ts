import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { decrypt, isAdmin } from 'src/app/utility/Utitity';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {
    if (this.auth.isAuthenticated() && isAdmin()) {
      return true;
    }else{
      this.router.navigate(['404']);
      return false;
    }
  }
}