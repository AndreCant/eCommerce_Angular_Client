import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { User } from '../model/User';
import { getUserId } from '../utility/Utitity';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = '';
  
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${AppConstants.SERVICES_BASE_URL}/user/${getUserId()}`;
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl);
  }
}
