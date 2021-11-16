import { createSelector } from "@ngrx/store";
import { IAppState, IOrderState } from "../state/app.states";

const selectOrder = (state: IAppState) => {
    return state.orderState;
};
  
export const selectorOrder  = createSelector(
    selectOrder,
    (state: IOrderState) => {
        return state.orders;
    }
);