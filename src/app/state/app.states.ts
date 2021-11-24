import { Payment } from "../model/Payment";
import { ProductsFilter } from "../model/ProductsFilter";
import { Registry } from "../model/Registry";
import { User } from "../model/User";
import { Order } from "../model/Order";
import { UserRegistry } from "../model/UserRegistry";

/** APP STATE */
export interface IAppState {
    registryState: IRegistryState;
    userState: IUserState;
    paymentState: IPaymentState;
    productState: IProductsFilteredState;
    orderState: IOrderState;
    userRegistryState: IUserRegistryState;
}
/**************** */


export interface IRegistryState {
    registry: Registry;
    message: any;
}
export interface IUserState {
    user: User;
    message: any;
}
export interface IPaymentState {
    payments: Payment[];
    message: any;
}

export interface IProductsFilteredState {
    products: ProductsFilter[];
    message: any;
}

export interface IOrderState {
    orders: Order[];
    message: any;
}

export interface IUserRegistryState {
    userRegistry: UserRegistry[];
    message: any;
}

export const initialRegistryState: IRegistryState = {
    registry: {},
    message: null
};

export const initialUserState: IUserState = {
    user: {},
    message: null
};

export const initialPaymentState: IPaymentState = {
    payments: [],
    message: null
};

export const initialProductsFilteredState: IProductsFilteredState = {
    products: [],
    message: null
};

export const initialOrderState: IOrderState = {
    orders: [],
    message: null
};

export const initialUserRegistryState: IUserRegistryState = {
    userRegistry: [],
    message: null
};
