import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Order } from '../model/Order';
import { getUserId } from '../utility/Utitity';

const baseUrl = `${AppConstants.SERVICES_BASE_URL}/user/${getUserId()}`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders(mode: string): Observable<Order[]>{
    let url = mode === 'user' ? `${baseUrl}/orders` : `${AppConstants.SERVICES_BASE_URL}/admin/orders`;
    return this.httpClient.get<Order[]>(url);
  }

  createOrder(order: Order): Observable<Order>{
    return this.httpClient.post<Order>(`${baseUrl}/order`, order);
  }
}
