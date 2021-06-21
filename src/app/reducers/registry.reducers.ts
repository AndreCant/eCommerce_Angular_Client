import * as fromActions from '../actions/registry.actions';
import { ERegistryActions } from '../actions/registry.actions';
import { IRegistryState, initialRegistryState } from "../state/app.states";

export function registryReducer(state = initialRegistryState, action: fromActions.ALL_REDUCER_ACTIONS): IRegistryState {
    switch (action.type) {
        case ERegistryActions.SHOW_SUCCESS: {
            return {
                ...state,
                registry: action.payload
            };
        }
        case ERegistryActions.UPDATE_SUCCESS: {
            return {
                ...state,
                registry: action.payload
            };
        }

        default:
            return state;
    }
}