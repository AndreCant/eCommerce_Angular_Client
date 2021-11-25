import { initialProductedState, IProductState } from "../state/app.states";
import * as fromActions from '../actions/product.actions';
import { EProductActions } from "../actions/product.actions";

export function productReducer(state = initialProductedState, action: fromActions.ALL_REDUCER_ACTIONS): IProductState {
    switch (action.type) {
        case EProductActions.SHOW_ALL_SUCCESS: {
            return {
                ...state,
                products: action.payload
            };
        }

        default:
            return state;
    }
}