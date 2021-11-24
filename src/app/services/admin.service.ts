import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { UserRegistry } from '../model/UserRegistry';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl: string = '';
  
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${AppConstants.SERVICES_BASE_URL}/admin`;
  }

  getUserRegistries(): Observable<UserRegistry[]> {
    return this.httpClient.get<UserRegistry[]>(`${this.baseUrl}/users`);
  }
}
