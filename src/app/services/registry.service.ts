import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Registry } from '../model/Registry';
import { UserService } from './user.service';

const baseUrl = `${AppConstants.SERVICES_BASE_URL}/registry`;

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(private httpClient: HttpClient) {}

  getRegistry(): Observable<Registry>{
    return this.httpClient.get<Registry>(baseUrl);
  }
}
