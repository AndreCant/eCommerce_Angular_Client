import { Registry } from "./Registry";

export interface UserRegistry{
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    registry?: Registry;
}