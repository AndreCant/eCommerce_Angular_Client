import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateAction, CreateSuccessAction, EPaymentActions, ShowAllAction, ShowAllSuccessAction } from '../actions/payment.actions';
import { Payment } from '../model/Payment';
import { PaymentService } from '../services/payment.service';

@Injectable()
export class PaymentEffects {

  constructor(private actions$: Actions, private paymentService: PaymentService) {}

  loadPayments$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<ShowAllAction>(EPaymentActions.SHOW_ALL),
      switchMap(() => this.paymentService.getPayments()),
      switchMap((paymentsResp: Payment[]) => of(new ShowAllSuccessAction(paymentsResp))))
  });

  createPayment$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<CreateAction>(EPaymentActions.CREATE),
      switchMap((payment) => this.paymentService.createPayment(payment.payload)),
      switchMap((response) => of(new CreateSuccessAction(response)))
      )
  });
}
