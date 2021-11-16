import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.states";
import { orderReducer } from "./order.reducers";
import { paymentReducer } from "./payment.reducers";
import { productReducer } from "./product.reducers";
import { registryReducer } from "./registry.reducers";
import { userReducer } from "./user.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
    registryState: registryReducer,
    userState: userReducer,
    paymentState: paymentReducer,
    productState: productReducer,
    orderState: orderReducer
 };