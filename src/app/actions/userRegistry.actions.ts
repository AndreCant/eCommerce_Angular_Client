import { Action } from "@ngrx/store";
import { UserRegistry } from "../model/UserRegistry";

export enum EUserRegistryActions {
  SHOW_USERS = '[UserRegistry] Show',
  SHOW_USERS_SUCCESS = '[UserRegistry] Show Success'
}

export class ShowUsersAction implements Action {
  readonly type = EUserRegistryActions.SHOW_USERS;
}
export class ShowUsersSuccessAction implements Action {
  readonly type = EUserRegistryActions.SHOW_USERS_SUCCESS;
  constructor(public payload: UserRegistry[]) {}
}

export type ALL_REDUCER_ACTIONS = ShowUsersSuccessAction;