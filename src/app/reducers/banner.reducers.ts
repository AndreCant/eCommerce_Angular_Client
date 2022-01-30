import { EBannerActions } from "../actions/banner.actions";
import { IBannerState, initialBannerState } from "../state/app.states";
import * as fromActions from '../actions/banner.actions';

export function bannerReducer(state = initialBannerState, action: fromActions.ALL_REDUCER_ACTIONS): IBannerState {
    switch (action.type) {
        case EBannerActions.SHOW_ALL_SUCCESS: {
            return {
                ...state,
                banner: action.payload
            };
        }
        case EBannerActions.SHOW_SUCCESS: {
            return {
                ...state,
                banner: action.payload
            };
        }
        case EBannerActions.CREATE_SUCCESS: {
            return {
                ...state,
                message: action.payload
            };
        }
        case EBannerActions.UPDATE_SUCCESS: {
            return {
                ...state,
                message: action.payload
            };
        }
        case EBannerActions.DELETE_SUCCESS: {
            return {
                ...state,
                message: action.payload
            };
        }

        default:
            return state;
    }
}