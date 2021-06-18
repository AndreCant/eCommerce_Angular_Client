import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { User } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = '';
  
  constructor(private httpClient: HttpClient) {
    let login: string | null = localStorage.getItem(AppConstants.LOGIN_STORAGE);
    if (login) {
      let userId = JSON.parse(login).user_id;
      this.baseUrl = `${AppConstants.SERVICES_BASE_URL}/user/${userId}`;
    }
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl);
  }
}
