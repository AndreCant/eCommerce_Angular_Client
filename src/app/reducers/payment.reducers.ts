import * as fromActions from '../actions/payment.actions';
import { EPaymentActions } from '../actions/payment.actions';
import { initialPaymentState, IPaymentState } from '../state/app.states';

export function paymentReducer(state = initialPaymentState, action: fromActions.ALL_REDUCER_ACTIONS): IPaymentState {
    switch (action.type) {
        case EPaymentActions.SHOW_ALL_SUCCESS: {
            return {
                ...state,
                payments: action.payload
            };
        }
        case EPaymentActions.CREATE_SUCCESS: {
            return {
                ...state,
                message: action.payload
            };
        }
        case EPaymentActions.DELETE_SUCCESS: {
            return {
                ...state,
                message: action.payload
            };
        }

        default:
            return state;
    }
}