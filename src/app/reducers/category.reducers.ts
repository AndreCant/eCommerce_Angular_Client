import { ECategoryActions } from "../actions/category.actions";
import { ICategoryState, initialCategoryState } from "../state/app.states";
import * as fromActions from '../actions/category.actions';

export function categoryReducer(state = initialCategoryState, action: fromActions.ALL_REDUCER_ACTIONS): ICategoryState {
    switch (action.type) {
        case ECategoryActions.SHOW_ALL_SUCCESS: {
            return {
                ...state,
                category: action.payload
            };
        }
        case ECategoryActions.CREATE_SUCCESS: {
            return {
                ...state,
                message: action.payload
            };
        }
        case ECategoryActions.UPDATE_SUCCESS: {
            return {
                ...state,
                message: action.payload
            };
        }
        case ECategoryActions.DELETE_SUCCESS: {
            return {
                ...state,
                message: action.payload
            };
        }

        default:
            return state;
    }
}