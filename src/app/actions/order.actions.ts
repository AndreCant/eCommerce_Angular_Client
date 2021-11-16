import { Action } from "@ngrx/store";
import { Order } from "../model/Order";

export enum EOrderActions {
  SHOW_ALL = '[Order] Show All',
  SHOW_ALL_SUCCESS = '[Order] Show All Success',
  CREATE = '[Order] Create',
  CREATE_SUCCESS = '[Order] Create Success'
}

export class ShowAllAction implements Action {
  readonly type = EOrderActions.SHOW_ALL;
}
export class ShowAllSuccessAction implements Action {
  readonly type = EOrderActions.SHOW_ALL_SUCCESS;
  constructor(public payload: Order[]) {}
}
export class CreateAction implements Action {
  readonly type = EOrderActions.CREATE;
  constructor(public payload: Order) {}
}
export class CreateSuccessAction implements Action {
  readonly type = EOrderActions.CREATE_SUCCESS;
  constructor(public payload: Order) {}
}

export type ALL_REDUCER_ACTIONS = ShowAllSuccessAction | CreateSuccessAction;