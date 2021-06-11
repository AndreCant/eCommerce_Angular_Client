import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppConstants } from '../../app.constants';
import { LoginData } from '../../model/LoginData';
import { LoginResult } from '../../model/LoginResult';

const baseURL = `${AppConstants.SERVICES_BASE_URL}/login`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  public authenticate(loginData: LoginData): Observable<LoginResult> {
    return this.httpClient
      .post<LoginResult>(baseURL, loginData)
      .pipe(catchError(this.handleError));
  }

  public logout() {
    localStorage.setItem(AppConstants.LOGIN_STORAGE, '');
  }

  public isAuthenticated(): boolean {
    let login: LoginResult;
    let loginStr: string | null = localStorage.getItem(AppConstants.LOGIN_STORAGE);

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
