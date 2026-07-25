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
    imageUrl: string[];
    SellerId: Types.ObjectId;
    createdAt: Date;
}