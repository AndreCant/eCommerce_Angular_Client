import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Category } from '../model/Category';

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

  createCategory(category: Category): Observable<string>{
    return this.httpClient.post<string>(`${baseUrl}/admin/category`, category);
  }

  updateCategory(category: Category, id: number): Observable<string>{
    return this.httpClient.patch<string>(`${baseUrl}/admin/category/${id}`, category);
  }

  deleteCategory(id: number): Observable<string>{
    return this.httpClient.delete<string>(`${baseUrl}/admin/category/${id}`);
  }

}
