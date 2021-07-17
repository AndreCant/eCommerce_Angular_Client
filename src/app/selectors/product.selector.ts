import { createSelector } from "@ngrx/store";
import { IAppState, IProductsFilteredState } from "../state/app.states";

const selectProduct = (state: IAppState) => {
    return state.productState;
};
  
export const selectorProduct = createSelector(
    selectProduct,
    (state: IProductsFilteredState) => {
        return state.products;
    }
);