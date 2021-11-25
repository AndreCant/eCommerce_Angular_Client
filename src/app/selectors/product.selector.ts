import { createSelector } from "@ngrx/store";
import { IAppState, IProductState } from "../state/app.states";

const selectProduct = (state: IAppState) => {
    return state.productState;
};
  
export const selectorProduct = createSelector(
    selectProduct,
    (state: IProductState) => {
        return state.products;
    }
);