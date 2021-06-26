import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.states";
import { paymentReducer } from "./payment.reducers";
import { registryReducer } from "./registry.reducers";
import { userReducer } from "./user.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
    registryState: registryReducer,
    userState: userReducer,
    paymentState: paymentReducer
 };