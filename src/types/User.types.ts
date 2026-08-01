import {Types} from "mongoose";

export interface IUser {
    FirstName: string;
    LastName: string;
    email: string;
    password: string;
    role: 'customer' | 'seller' | 'admin';
    phoneNumber?: string;
    isBlocked: boolean;
    isVerified?: boolean;
    refreshToken?: string;
    emailVerificationToken?: string;
    emailVerificationTokenExpiration?: Date;
    createdAt: Date;
}

export interface ICustomer  extends IUser {
    customerId: string;
    user: Types.ObjectId;
    orders: Types.ObjectId[];
    wishlist: Types.ObjectId[];
    cart: Types.ObjectId[];
    paymentMethods: Types.ObjectId[];
    address?: string[];
    createdAt: Date;
}
export interface ISeller  extends IUser {
    sellerId: string;
    user: Types.ObjectId;
    conercialRegisterNumber: number;
    taxCardNumber: number;
    sellerDocuments: {
        commercialRegisterFile: string[];
        taxCardFile: string[];
    };
    storeName: string;
    storeManagement: {
        storeDescription: string;
        storeLogo: string;
        storeBanner: string;
        storeType: 'physical' | 'online' | 'both';
        storephysicalAddress?: string;
        storeOnlineAddress?: string;
    }
    wallet: Types.ObjectId;
    contary: string;
    applicantStatus: 'pending' | 'under-review' | 'additional_docs_requested' | 'approved' | 'rejected';
    createdAt: Date;
}

export interface IAdmin extends IUser {
    AdminId: string;
    user: Types.ObjectId;
    createdAt: Date;
}




export interface IWallet {
    walletId: string;
    seller: Types.ObjectId;
    balance: number;
    currency: string;
    createdAt: Date;
}