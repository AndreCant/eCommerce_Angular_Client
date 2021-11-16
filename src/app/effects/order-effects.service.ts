import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { CreateAction, CreateSuccessAction, EOrderActions, ShowAllAction, ShowAllSuccessAction } from "../actions/order.actions";
import { Order } from "../model/Order";
import { OrderService } from "../services/order.service";

@Injectable()
export class OrderEffects {

  constructor(private actions$: Actions, private orderService: OrderService) {}

  loadOrders$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<ShowAllAction>(EOrderActions.SHOW_ALL),
      switchMap(() => this.orderService.getUserOrders()),
      switchMap((ordersResp: Order[]) => of(new ShowAllSuccessAction(ordersResp))))
  });

  createOrder$: Observable<Action> = createEffect(() => {
    return this.actions$
    .pipe(
      ofType<CreateAction>(EOrderActions.CREATE),
      switchMap((order) => this.orderService.createOrder(order.payload)),
      switchMap((response) => of(new CreateSuccessAction(response)))
      )
  });
}