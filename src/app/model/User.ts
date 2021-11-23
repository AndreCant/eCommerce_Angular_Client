import { Registry } from "./Registry";

export interface User{
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    registry?: Registry;
}