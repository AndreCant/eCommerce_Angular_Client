import { Action } from "@ngrx/store";
import { Payment } from "../model/Payment";

export enum EPaymentActions {
  SHOW_ALL = '[Payment] Show All',
  SHOW_ALL_SUCCESS = '[Payment] Show All Success',
  CREATE = '[Payment] Create',
  CREATE_SUCCESS = '[Payment] Create Success',
  DELETE = '[Payment] Delete',
  DELETE_SUCCESS = '[Payment] Delete Success'
}

export class ShowAllAction implements Action {
  readonly type = EPaymentActions.SHOW_ALL;
}
export class ShowAllSuccessAction implements Action {
  readonly type = EPaymentActions.SHOW_ALL_SUCCESS;
  constructor(public payload: Payment[]) {}
}
export class CreateAction implements Action {
  readonly type = EPaymentActions.CREATE;
  constructor(public payload: Payment) {}
}
export class CreateSuccessAction implements Action {
  readonly type = EPaymentActions.CREATE_SUCCESS;
  constructor(public payload: Payment) {}
}
export class DeleteAction implements Action {
  readonly type = EPaymentActions.DELETE;
  constructor(public payload: number) {}
}
export class DeleteSuccessAction implements Action {
  readonly type = EPaymentActions.DELETE_SUCCESS;
  constructor(public payload: string) {}
}

export type ALL_REDUCER_ACTIONS = ShowAllSuccessAction | CreateSuccessAction | DeleteSuccessAction;