import { createSelector } from "@ngrx/store";
import { IAppState, ICategoryState } from "../state/app.states";

const selectCategory = (state: IAppState) => {
    return state.categoryState;
};
  
export const selectorCategory  = createSelector(
    selectCategory,
    (state: ICategoryState) => {
        return state.category;
    }
);