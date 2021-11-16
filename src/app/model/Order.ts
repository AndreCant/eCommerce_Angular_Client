import { OrderLineItem } from "./OrderLineItem";

export interface Order{
    id?: number;
    code?: string;
    status?: string;
    payment_id?: number;
    user_id?: number;
    items?: OrderLineItem[];
}