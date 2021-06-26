import { createSelector } from "@ngrx/store";
import { IAppState, IPaymentState } from "../state/app.states";

const selectPayment = (state: IAppState) => {
    return state.paymentState;
};
  
export const selectorPayment  = createSelector(
    selectPayment,
    (state: IPaymentState) => {
        return state.payments;
    }
);