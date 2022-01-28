import { Category } from "../model/Category";
import { Action } from "@ngrx/store";

export enum ECategoryActions {
    SHOW_ALL = '[Category] Show All',
    SHOW_ALL_SUCCESS = '[Category] Show All Success',
    CREATE = '[Category] Create',
    CREATE_SUCCESS = '[Category] Create Success',
    UPDATE = '[Category] Update',
    UPDATE_SUCCESS = '[Category] Update Success',
    DELETE = '[Category] Delete',
    DELETE_SUCCESS = '[Category] Delete Success'
  }
  
  export class ShowAllAction implements Action {
    readonly type = ECategoryActions.SHOW_ALL;
    constructor() {}
  }
  export class ShowAllSuccessAction implements Action {
    readonly type = ECategoryActions.SHOW_ALL_SUCCESS;
    constructor(public payload: Category[]) {}
  }
  export class CreateAction implements Action {
    readonly type = ECategoryActions.CREATE;
    constructor(public payload: Category) {}
  }
  export class CreateSuccessAction implements Action {
    readonly type = ECategoryActions.CREATE_SUCCESS;
    constructor(public payload: string) {}
  }
  export class UpdateAction implements Action {
    readonly type = ECategoryActions.UPDATE;
    constructor(public payload: Category, public id: number) {}
  }
  export class UpdateSuccessAction implements Action {
    readonly type = ECategoryActions.UPDATE_SUCCESS;
    constructor(public payload: string) {}
  }
  export class DeleteAction implements Action {
    readonly type = ECategoryActions.DELETE;
    constructor(public id: number) {}
  }
  export class DeleteSuccessAction implements Action {
    readonly type = ECategoryActions.DELETE_SUCCESS;
    constructor(public payload: string) {}
  }
  
  export type ALL_REDUCER_ACTIONS = ShowAllSuccessAction | CreateSuccessAction | UpdateSuccessAction | DeleteSuccessAction;