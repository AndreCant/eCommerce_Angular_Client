import { Action } from "@ngrx/store";
import { ProductsFilter } from "../model/ProductsFilter";

export enum EProductActions {
    SHOW_ALL = '[Product] Show All',
    SHOW_ALL_SUCCESS = '[Product] Show All Success'
  }
  
  export class ShowAllAction implements Action {
    readonly type = EProductActions.SHOW_ALL;
    constructor(public url: string) {}
  }
  export class ShowAllSuccessAction implements Action {
    readonly type = EProductActions.SHOW_ALL_SUCCESS;
    constructor(public payload: ProductsFilter[]) {}
  }
  
  export type ALL_REDUCER_ACTIONS = ShowAllSuccessAction;