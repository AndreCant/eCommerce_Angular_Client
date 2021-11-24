import { initialUserRegistryState, IUserRegistryState, IUserState } from "../state/app.states";
import * as fromActions from '../actions/userRegistry.actions';
import { EUserRegistryActions } from "../actions/userRegistry.actions";

export function userRegistryReducer(state = initialUserRegistryState, action: fromActions.ALL_REDUCER_ACTIONS): IUserRegistryState {
    switch (action.type) {
        case EUserRegistryActions.SHOW_USERS_SUCCESS: {
            return {
                ...state,
                userRegistry: action.payload
            };
        }

        default:
            return state;
    }
}