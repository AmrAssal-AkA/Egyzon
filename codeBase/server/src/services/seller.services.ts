import Seller from "../models/sellerModel";
import User from "../models/userModel";
import { AppError } from "../utils/AppError";
import { SellerApplyApplicantTemplate } from "../templates/SellerApplyApplicant";

export const SellerServices = {
  ApplyAsPartner: async (sellerData: any, userId: string) => {
      const existingSeller = await Seller.findById(userId);
      const user = await Seller.db.model("User").findById(userId);

      if (!user) throw new AppError(404, "User not found");
      if (user.role === "seller") throw new AppError(400, "User is already a seller");
    
      const SaveSellerData = await Seller.findByIdAndUpdate(userId, {
        role: "seller",
        storeName: sellerData.storeName,
        commercialRegisterNumber: sellerData.commercialRegisterNumber,
        taxCardNumber: sellerData.taxCardNumber,
        sellerDocuments: sellerData.sellerDocuments,
        applicantStatus: "pending",
      },
      {new: true}
    );
      try {
        await SellerApplyApplicantTemplate(
          user.email,
          user.FirstName,
          sellerData.storeName,
        );
      } catch (err) {
        console.error("Error sending email to applicant:", err);
      }
      return SaveSellerData;
    
  },
  checkExistingSeller: async (userId: string) => {
    const user = await Seller.db.model("User").findById(userId);
    if(!user) throw new AppError(404,"user not found");
    const existingSeller = await Seller.findOne({ user: user._id });
    if (existingSeller) throw new AppError(400, "User has already applied to be a seller");
    return existingSeller;
  },
  setupStore: async (storeData: any, userId: string) => {
    try {
      const seller = await Seller.findOne({ user: userId });
      if (!seller) {
        throw new AppError(404, "Seller not found");
      }
      if (seller.applicantStatus !== "approved") {
        throw new AppError(403, "Seller is not approved to set up a store");
      }
      const {
        storeLogo,
        storeBanner,
        storeDescription,
        storeType,
        storephysicalAddress,
        storeOnlineAddress,
      } = storeData;
      seller.storeManagement = {
        storeLogo,
        storeBanner,
        storeDescription,
        storeType,
        storephysicalAddress,
        storeOnlineAddress,
      };
      await seller.save();

      return seller;
    } catch (error) {
      console.log(error);
      throw new AppError(500, "Internal Server Error");
    }
  },
};
