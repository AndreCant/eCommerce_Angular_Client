import { Action } from "@ngrx/store";
import { User } from "../model/User";

export enum EUserActions {
  SHOW_USER = '[User] Show',
  SHOW_USER_SUCCESS = '[User] Show Success'
}

export class ShowUserAction implements Action {
  readonly type = EUserActions.SHOW_USER;
}
export class ShowUserSuccessAction implements Action {
  readonly type = EUserActions.SHOW_USER_SUCCESS;
  constructor(public payload: User) {}
}

export type ALL_REDUCER_ACTIONS = ShowUserSuccessAction;