import { createSelector } from "@ngrx/store";
import { IAppState, IBannerState } from "../state/app.states";

const selectBanner = (state: IAppState) => {
    return state.bannerState;
};
  
export const selectorBanner  = createSelector(
    selectBanner,
    (state: IBannerState) => {
        return state.banner;
    }
);