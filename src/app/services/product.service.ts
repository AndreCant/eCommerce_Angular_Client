import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

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
}
