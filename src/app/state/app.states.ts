import { Registry } from "../model/Registry";
import { User } from "../model/User";

export interface IAppState {
    registryState: IRegistryState;
    userState: IUserState;
}

export interface IRegistryState {
    registry: Registry;
    message: any;
}

export interface IUserState {
    user: User;
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
