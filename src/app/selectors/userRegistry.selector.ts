import { createSelector } from "@ngrx/store";
import { IAppState, IUserRegistryState, IUserState } from "../state/app.states";

const selectUserRegistry = (state: IAppState) => {
  return state.userRegistryState;
};

export const selectorUserRegistry  = createSelector(
    selectUserRegistry,
    (state: IUserRegistryState) => {
        return state.userRegistry;
    }
);