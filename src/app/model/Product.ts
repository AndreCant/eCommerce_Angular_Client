import { Image } from "./Image";

export interface Product{
    id: number;
    name?: string;
    short_description?: string;
    description?: string;
    price?: string;
    gender?: string;
    type?: string;
    sub_type?: string;
    size_available?: string;
    color?: string;
    material?: string;
    collection?: string;
    images?: Image[];
    previewUrl?: string;
    preview?: string;
}