import { Action } from "@ngrx/store";
import { Registry } from "../model/Registry";

export enum ERegistryActions {
  SHOW = '[Registry] Show',
  SHOW_SUCCESS = '[Registry] Show Success'
}

export class ShowAction implements Action {
  readonly type = ERegistryActions.SHOW;
}
export class ShowSuccessAction implements Action {
  readonly type = ERegistryActions.SHOW_SUCCESS;
  constructor(public payload: Registry) {}
}

export type ALL_REDUCER_ACTIONS = ShowSuccessAction;