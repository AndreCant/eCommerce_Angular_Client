import { createSelector } from "@ngrx/store";
import { IAppState, IRegistryState } from "../state/app.states";

const selectRegistry = (state: IAppState) => {
  return state.registryState;
};

export const selectorRegistry  = createSelector(
    selectRegistry,
    (state: IRegistryState) => {
        return state.registry;
    }
);