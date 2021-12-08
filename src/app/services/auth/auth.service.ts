import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppConstants } from '../../app.constants';
import { LoginData } from '../../model/LoginData';
import { LoginResult } from '../../model/LoginResult';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';
import { decrypt } from 'src/app/utility/Utitity';

const loginURL = `${AppConstants.SERVICES_BASE_URL}/login`;
const registerURL = `${AppConstants.SERVICES_BASE_URL}/register`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public httpClient: HttpClient, public jwtHelper: JwtHelperService, public router: Router) { }

  public authenticate(loginData: LoginData): Observable<LoginResult> {
    return this.httpClient
      .post<LoginResult>(loginURL, loginData)
      .pipe(catchError(this.handleError));
  }

  public register(user: User): Observable<LoginResult> {
    return this.httpClient
      .post<LoginResult>(registerURL, user)
      .pipe(catchError(this.handleError));
  }

  public logout() {
    localStorage.setItem(AppConstants.LOGIN_STORAGE, '');
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    let login: LoginResult;
    const loginStorage = localStorage.getItem(AppConstants.LOGIN_STORAGE);
    let loginStr: string | null = loginStorage ? decrypt(loginStorage) : null;

    if (loginStr) {
      login = JSON.parse(loginStr);
    } else {
      return false;
    }

    const token = login.token;
    let tokenExpired: boolean = false;

    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.setItem(AppConstants.LOGIN_STORAGE, '');
      tokenExpired = true;
    } 

    return !tokenExpired;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned error: ${JSON.stringify(error)}`);
    }
   
    return throwError(error);
  }
}
