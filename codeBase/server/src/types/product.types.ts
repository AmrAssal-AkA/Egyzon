import {Types, Document} from "mongoose";

export interface IProduct extends Document {
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
    category: Types.ObjectId;
    lowStockNotify: boolean;
    outOfStockNotify: boolean;
}

export interface ICategory {
    categoryName: string;
    description: string;
    imageUrl: string;
    Products: Types.ObjectId[];
}