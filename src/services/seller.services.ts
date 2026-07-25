import Seller from '../models/sellerModel';
import User from '../models/userModel';
import { AppError } from '../utils/AppError';

export const SellerServices = {
    ApplyAsPartner: async (sellerData: any, userId: string) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new AppError(404, 'User not found');
            }
            const existingSeller = await Seller.findOne({ user: user._id });
            if (existingSeller) {
                throw new AppError(400, 'User has already applied to be a seller');
            }
            const sendPaper = await Seller.create({
                ...sellerData,
                user: user._id,
                applicantStatus: 'pending',
            }
            ); 
            return sendPaper;
        }catch (error) {
            console.log(error);
            throw new AppError(500, 'Internal Server Error');
        }
    },
    setupStore: async (storeData: any, userId: string) => {
        try {
            const seller = await Seller.findOne({ user: userId });
            if(!seller){
                throw new AppError(404, 'Seller not found');
            }
            if (seller.applicantStatus !== 'approved') {
                throw new AppError(403, 'Seller is not approved to set up a store');
            }
            const {  storeLogo, storeBanner, storeDescription, storeType, storephysicalAddress, storeOnlineAddress} = storeData;
            seller.storeManagement = {
                storeLogo,
                storeBanner,
                storeDescription,
                storeType,
                storephysicalAddress,
                storeOnlineAddress
            };
            await seller.save();

            return seller;
        }catch (error) {
            console.log(error);
            throw new AppError(500, 'Internal Server Error');
        }
    }
}