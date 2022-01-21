import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Category } from '../model/Category';
import { Registry } from '../model/Registry';
import { getUserId } from '../utility/Utitity';

const baseUrl = `${AppConstants.SERVICES_BASE_URL}`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${baseUrl}/categories`);
  }

  getCategoryByName(name: any): Observable<Category>{
    return this.httpClient.get<Category>(`${baseUrl}/category/${name}`);
  }

}
