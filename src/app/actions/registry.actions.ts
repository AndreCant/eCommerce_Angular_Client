import { Action } from "@ngrx/store";
import { Registry } from "../model/Registry";

export enum ERegistryActions {
  SHOW = '[Registry] Show',
  SHOW_SUCCESS = '[Registry] Show Success',
  UPDATE = '[Registry] Update',
  UPDATE_SUCCESS = '[Registry] Update Success'
}

export class ShowAction implements Action {
  readonly type = ERegistryActions.SHOW;
}
export class ShowSuccessAction implements Action {
  readonly type = ERegistryActions.SHOW_SUCCESS;
  constructor(public payload: Registry) {}
}
export class UpdateRegistryAction implements Action {
  readonly type = ERegistryActions.UPDATE;
  constructor(public payload: Registry) {}
}
export class UpdateRegistrySuccessAction implements Action {
  readonly type = ERegistryActions.UPDATE_SUCCESS;
  constructor(public payload: Registry) {}
}


export type ALL_REDUCER_ACTIONS = ShowSuccessAction | UpdateRegistrySuccessAction;