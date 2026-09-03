import {HydratedDocument, Types} from "mongoose";

export interface IUser extends Document{
    id: string;
    FirstName: string;
    LastName: string;
    email: string;
    password: string;
    role: 'customer' | 'seller' | 'admin';
    phoneNumber?: string;
    isBlocked: boolean;
    isVerified?: boolean;
    refreshToken?: string;
    googleId?: string;
    facebookId?: string;
    resetPasswordToken?: string;
    resetPasswordTokenExpiration?: Date;
    emailVerificationToken?: string;
    emailVerificationTokenExpiration?: Date;
    completedOnboarding?: boolean;
    forgetPasswordToken?: string;
    forgetPasswordTokenExpiration?: Date;
    joinedDate?: Date;
    lastActiveDate?: Date;
    createdAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;

export interface ICustomer extends IUser {
    orders: Types.ObjectId[];
    wishlist: Types.ObjectId[];
    cart: Types.ObjectId[];
    paymentMethods: Types.ObjectId[];
    address?: string[];
}
export interface ISeller  extends IUser {
    sellerId: string;
    commercialRegisterNumber: string;
    taxCardNumber: string;
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
    products: Types.ObjectId[];
    notes: string;
    createdAt: Date;
}

export interface IAdmin extends IUser {
    employeeId: string;
    createdAt: Date;

    approveSeller(): Promise<ISeller>;
    rejectSeller(): Promise<ISeller>;
    requestAdditionalDocuments():  Promise<ISeller> ;
    blockUser(): Promise<IUser>;
    activateUser(): Promise<IUser>;
    RequestRemoveProduct(): Promise<IAdmin>;
    generateReports(): Promise<IAdmin>;
    verifyPayments(): Promise<IAdmin>;
    setPlatformFee(feePercentage: number): Promise<IAdmin>;
}




export interface IWallet {
    walletId: string;
    seller: Types.ObjectId;
    balance: number;
    currency: string;
    createdAt: Date;
}