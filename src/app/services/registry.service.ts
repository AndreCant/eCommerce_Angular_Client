import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Registry } from '../model/Registry';
import { getUserId } from '../utility/Utitity';

const baseUrl = `${AppConstants.SERVICES_BASE_URL}/user/${getUserId()}/registry`;

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(private httpClient: HttpClient) {}

  getRegistry(): Observable<Registry>{
    return this.httpClient.get<Registry>(baseUrl);
  }

  updateRegistry(registry: Registry): Observable<Registry>{
    return this.httpClient.patch<Registry>(baseUrl, registry);
  }
}
