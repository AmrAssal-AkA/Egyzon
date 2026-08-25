import mongoose, {Schema}from 'mongoose';
import {IWishlist} from '../types/wishlist.types';

const wishlistSchema = new Schema<IWishlist>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true,
        unique: true
    },
    productId: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IWishlist>('Wishlist', wishlistSchema);