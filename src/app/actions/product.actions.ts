import { Action } from "@ngrx/store";
import { Product } from "../model/Product";

export enum EProductActions {
    SHOW_ALL = '[Product] Show All',
    SHOW_ALL_SUCCESS = '[Product] Show All Success',
    UPDATE = '[Product] Update',
    UPDATE_SUCCESS = '[Product] Update Success',
    CREATE = '[Product] Create',
    CREATE_SUCCESS = '[Product] Create Success',
    DELETE = '[Product] Delete',
    DELETE_SUCCESS = '[Product] Delete Success'
  }
  
  export class ShowAllAction implements Action {
    readonly type = EProductActions.SHOW_ALL;
    constructor(public url: string) {}
  }
  export class ShowAllSuccessAction implements Action {
    readonly type = EProductActions.SHOW_ALL_SUCCESS;
    constructor(public payload: Product[]) {}
  }

  export class CreateAction implements Action {
    readonly type = EProductActions.CREATE;
    constructor(public payload: Product) {}
  }
  export class CreateSuccessAction implements Action {
    readonly type = EProductActions.CREATE_SUCCESS;
    constructor(public payload: string) {}
  }

  export class UpdateAction implements Action {
    readonly type = EProductActions.UPDATE;
    constructor(public payload: Product, public id: number) {}
  }
  export class UpdateSuccessAction implements Action {
    readonly type = EProductActions.UPDATE_SUCCESS;
    constructor(public payload: string) {}
  }

  export class DeleteAction implements Action {
    readonly type = EProductActions.DELETE;
    constructor(public payload: number) {}
  }
  export class DeleteSuccessAction implements Action {
    readonly type = EProductActions.DELETE_SUCCESS;
    constructor(public payload: string) {}
  }
  
  export type ALL_REDUCER_ACTIONS = ShowAllSuccessAction | DeleteSuccessAction | CreateSuccessAction | UpdateSuccessAction;