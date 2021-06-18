import { createSelector } from "@ngrx/store";
import { IAppState, IUserState } from "../state/app.states";

const selectUser = (state: IAppState) => {
  return state.userState;
};

export const selectorUser  = createSelector(
    selectUser,
    (state: IUserState) => {
        return state.user;
    }
);