import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Product } from '../model/Product';

const baseUrl = `${AppConstants.SERVICES_BASE_URL}/admin/product`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {}

  getProducts(url: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(url);
  }

  getProduct(url: string): Observable<Product>{
    return this.httpClient.get<Product>(url);
  }

  getProductsByIds(url: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(url);
  }

  createProduct(product: Product): Observable<string>{
    return this.httpClient.post<string>(baseUrl, product);
  }

  deleteProduct(id: number): Observable<string>{
    return this.httpClient.delete<string>(`${baseUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<string>{
    return this.httpClient.patch<string>(`${baseUrl}/${id}`, product);
  }
}
