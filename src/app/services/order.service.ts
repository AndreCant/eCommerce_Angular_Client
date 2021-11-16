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

  getUserOrders(): Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${baseUrl}/orders`);
  }

  createOrder(order: Order): Observable<Order>{
    return this.httpClient.post<Order>(`${baseUrl}/order`, order);
  }
}
