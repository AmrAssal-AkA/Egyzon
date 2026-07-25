import type { Request, Response } from 'express';



import {sendSuccessResponse, sendErrorResponse} from '../utils/Responses'
import { WishlistServices } from '../services/wishlist.services';

const addToWishlist = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId || (process.env.NODE_ENV !== 'production' && req.body.userId);
        const product = req.body.productId || req.params.productId;
        if (!user){
            return sendErrorResponse(res, 401, 'unauthorized', 'user must be logged in to add product to wishlist');
        }
        if (!product){
            return sendErrorResponse(res, 400, 'Bad Request', 'Product ID is required');
        }

        const response = await WishlistServices.addToWishlist(user, product);
        sendSuccessResponse(res, 201, 'Product added to wishlist', response);
    }catch (error) {    
        sendErrorResponse(res, 500, 'Internal Server Error', error);
    }
}

const removeFromWishlist = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId || (process.env.NODE_ENV !== 'production' && req.body.userId);
        const product = req.body.productId || req.params.productId;
        if (!user){
            return sendErrorResponse(res, 401, 'unauthorized', 'user must be logged in to remove product from wishlist`');
        }
        if (!product){
            return sendErrorResponse(res, 400, 'Bad Request', 'Product ID is required');
        }

        const response = await WishlistServices.removeFromWishlist(user, product);
        sendSuccessResponse(res, 200, 'Product removed from wishlist', response);
    }catch(error){
        sendErrorResponse(res, 500, 'Internal Server Error', error);
    }
}


const getWishlist = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId || (process.env.NODE_ENV !== 'production' && req.body.userId);
        if (!user){
            return sendErrorResponse(res, 401, 'unauthorized', 'user must be logged in to view wishlist');
        }
        const respose = await WishlistServices.getWishlist(user);
        sendSuccessResponse(res, 200, 'Wishlist retrieved successfully', respose);
    }catch(error){
        sendErrorResponse(res, 500, 'Internal Server Error', error);
    }
}



export { addToWishlist, removeFromWishlist, getWishlist };
