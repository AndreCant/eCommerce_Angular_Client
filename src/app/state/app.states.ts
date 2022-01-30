import { Payment } from "../model/Payment";
import { Product } from "../model/Product";
import { Registry } from "../model/Registry";
import { User } from "../model/User";
import { Order } from "../model/Order";
import { UserRegistry } from "../model/UserRegistry";
import { Category } from "../model/Category";
import { Banner } from "../model/Banner";

/** APP STATE */
export interface IAppState {
    registryState: IRegistryState;
    userState: IUserState;
    paymentState: IPaymentState;
    productState: IProductState;
    orderState: IOrderState;
    userRegistryState: IUserRegistryState;
    categoryState: ICategoryState;
    bannerState: IBannerState;
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

export interface IProductState {
    products: Product[];
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

export interface ICategoryState {
    category: Category[];
    message: any;
}
export interface IBannerState {
    banner: Banner[];
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

export const initialProductedState: IProductState = {
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

export const initialCategoryState: ICategoryState = {
    category: [],
    message: null
};
export const initialBannerState: IBannerState = {
    banner: [],
    message: null
};