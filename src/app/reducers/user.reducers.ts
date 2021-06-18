import { initialUserState, IUserState } from "../state/app.states";
import * as fromActions from '../actions/user.actions';
import { EUserActions } from "../actions/user.actions";

export function userReducer(state = initialUserState, action: fromActions.ALL_REDUCER_ACTIONS): IUserState {
    switch (action.type) {
        case EUserActions.SHOW_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload
            };
        }

        default:
            return state;
    }
}