import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Payment } from '../model/Payment';
import { getUserId } from '../utility/Utitity';

const baseUrl = `${AppConstants.SERVICES_BASE_URL}/user/${getUserId()}/payment`;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {}

  getPayments(): Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(baseUrl);
  }

  createPayment(payment: Payment): Observable<Payment>{
    return this.httpClient.post<Payment>(baseUrl, payment);
  }

  deletePayment(paymentId: number): Observable<string>{
    return this.httpClient.delete<string>(`${baseUrl}/${paymentId}`);
  }
}
