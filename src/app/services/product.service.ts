import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsFilter } from '../model/ProductsFilter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {}

  getProducts(url: string): Observable<ProductsFilter[]>{
    return this.httpClient.get<ProductsFilter[]>(url);
  }
}
