import { EOrderActions } from '../actions/order.actions';
import * as fromActions from '../actions/order.actions';
import { initialOrderState, IOrderState } from '../state/app.states';

export function orderReducer(state = initialOrderState, action: fromActions.ALL_REDUCER_ACTIONS): IOrderState {
    switch (action.type) {
        case EOrderActions.SHOW_ALL_SUCCESS: {
            return {
                ...state,
                orders: action.payload
            };
        }
        case EOrderActions.CREATE_SUCCESS: {
            return {
                ...state,
                message: action.payload
            };
        }

        default:
            return state;
    }
}