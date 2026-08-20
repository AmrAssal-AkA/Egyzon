import {Types} from "mongoose";

export interface IProduct {
    productId: string;
    productName: string;
    productDescription: string;
    price: number;
    discount: number;
    stock: number;
    AvgRating: number;
    status: 'active' | 'inactive';
    sku: string;
    imageUrl: string[];
    sellerId: Types.ObjectId;
    categoryId: Types.ObjectId;
}

export interface ICategory {
    categoryName: string;
    description: string;
    imageUrl: string;
    Products: Types.ObjectId[];
}