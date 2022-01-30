import { Action } from "@ngrx/store";
import { Banner } from "../model/Banner";

export enum EBannerActions {
    SHOW_ALL = '[Banner] Show All',
    SHOW_ALL_SUCCESS = '[Banner] Show All Success',
    SHOW = '[Banner] Show',
    SHOW_SUCCESS = '[Banner] Show Success',
    CREATE = '[Banner] Create',
    CREATE_SUCCESS = '[Banner] Create Success',
    UPDATE = '[Banner] Update',
    UPDATE_SUCCESS = '[Banner] Update Success',
    DELETE = '[Banner] Delete',
    DELETE_SUCCESS = '[Banner] Delete Success'
  }
  
  export class ShowAllAction implements Action {
    readonly type = EBannerActions.SHOW_ALL;
    constructor() {}
  }
  export class ShowAllSuccessAction implements Action {
    readonly type = EBannerActions.SHOW_ALL_SUCCESS;
    constructor(public payload: Banner[]) {}
  }
  export class ShowAction implements Action {
    readonly type = EBannerActions.SHOW;
    constructor(public payload: string) {}
  }
  export class ShowSuccessAction implements Action {
    readonly type = EBannerActions.SHOW_SUCCESS;
    constructor(public payload: Banner[]) {}
  }
  export class CreateAction implements Action {
    readonly type = EBannerActions.CREATE;
    constructor(public payload: FormData) {}
  }
  export class CreateSuccessAction implements Action {
    readonly type = EBannerActions.CREATE_SUCCESS;
    constructor(public payload: string) {}
  }
  export class UpdateAction implements Action {
    readonly type = EBannerActions.UPDATE;
    constructor(public payload: FormData, public id: number) {}
  }
  export class UpdateSuccessAction implements Action {
    readonly type = EBannerActions.UPDATE_SUCCESS;
    constructor(public payload: string) {}
  }
  export class DeleteAction implements Action {
    readonly type = EBannerActions.DELETE;
    constructor(public id: number) {}
  }
  export class DeleteSuccessAction implements Action {
    readonly type = EBannerActions.DELETE_SUCCESS;
    constructor(public payload: string) {}
  }

  export type ALL_REDUCER_ACTIONS = ShowAllSuccessAction | ShowSuccessAction | CreateSuccessAction | UpdateSuccessAction | DeleteSuccessAction;