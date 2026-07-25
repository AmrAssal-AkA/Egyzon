import type { Request, Response } from "express";

import { SellerServices } from "../../services/seller.services";
import { sendSuccessResponse, sendErrorResponse } from "../../utils/Responses";
import uploadImage from "../../config/cloudainry.config";
import { AppError } from "../../utils/AppError";

const createRequestToJoin = async (req: Request, res: Response) => {
  try {
    const userId =
      req.user?.userId ||
      (process.env.NODE_ENV !== "production" && req.body.userId);
    if (!userId) {
      return sendErrorResponse(
        res,
        401,
        "Unauthorized",
        "User not authenticated",
      );
    }
    const { storeName, commercialRegisterNumber, taxCardNumber, contary } =
      req.body;
    if (
      !storeName ||
      !commercialRegisterNumber ||
      !taxCardNumber ||
      !contary ||
      storeName.trim() === "" ||
      commercialRegisterNumber.trim() === "" ||
      taxCardNumber.trim() === "" ||
      contary.trim() === ""
    ) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "All fields are required",
      );
    }
    if (contary !== "Egypt") {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Only Egyptian sellers are allowed",
      );
    }
    const files = req.files as {
      commercialRegisterImage?: Express.Multer.File[];
      taxCardImage?: Express.Multer.File[];
    };
    if (!files || !files.commercialRegisterImage || !files.taxCardImage) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Both images are required",
      );
    }
    if (
      files.commercialRegisterImage![0]!.mimetype !== "image/jpeg" &&
      files.commercialRegisterImage![0]!.mimetype !== "image/png"
    ) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Invalid commercial register image format",
      );
    }
    const [commercialRegisterImageUpload, taxCardImageUpload] =
      await Promise.all([
        uploadImage(
          files.commercialRegisterImage![0]!.buffer,
          "Egyzon/Seller/CommercialRegister",
        ),
        uploadImage(files.taxCardImage![0]!.buffer, "Egyzon/Seller/TaxCard"),
      ]);
    const sellerData = {
      storeName,
      contary,
      commercialRegisterNumber,
      taxCardNumber,
      commercialRegisterUrl: commercialRegisterImageUpload.secure_url,
      taxCardUrl: taxCardImageUpload.secure_url,
    };
    const sendPaper = await SellerServices.ApplyAsPartner(sellerData, userId);
    return sendSuccessResponse(
      res,
      201,
      "Request to join sent successfully",
      sendPaper,
    );
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      return sendErrorResponse(
        res,
        error.statusCode,
        error.status,
        error.message,
      );
    }
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};


{/*  second step After the seller document Approval */}
const setupStore = async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    const userId =
      req.user?.userId ||
      (process.env.NODE_ENV !== "production" && req.body.userId);
    if (!userId) {
      return sendErrorResponse(
        res,
        401,
        "Unauthorized",
        "User not authenticated",
      );
    }
    // Validate request body
    const {
      storeDescription,
      storeType,
      storephysicalAddress,
      storeOnlineAddress,
    } = req.body;
    if (
      !storeDescription ||
      storeDescription.trim() === "" ||
      !storeType ||
      storeType.trim() === "" ||
      !storephysicalAddress ||
      storephysicalAddress.trim() === "" ||
      !storeOnlineAddress ||
      storeOnlineAddress.trim() === ""
    ) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "All fields are required",
      );
    }
    if (
      storeType !== "physical" &&
      storeType !== "online" &&
      storeType !== "both"
    ) {
      return sendErrorResponse(res, 400, "Bad Request", "Invalid store type");
    }
    if (storeType === "physical" && !storephysicalAddress) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Physical address is required",
      );
    }
    if (storeType === "online" && !storeOnlineAddress) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Online address is required",
      );
    }
    if (storeDescription.length > 100) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Store description should not exceed 100 characters",
      );
    }
    // Validate file uploads
    const files = req.files as {
      storeLogo?: Express.Multer.File[];
      storeBanner?: Express.Multer.File[];
    };
    if (!files || !files.storeLogo) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "atleast upload the logo",
      );
    }
    if (
      files.storeLogo![0]!.mimetype !== "image/jpeg" &&
      files.storeLogo![0]!.mimetype !== "image/png"
    ) {
      return sendErrorResponse(res, 400, "Bad Request", "Invalid image format");
    }
    const [storeLogoUpload, storeBannerUpload] = await Promise.all([
      uploadImage(files.storeLogo![0]!.buffer, "Egyzon/Seller/StoreLogo"),
      files.storeBanner
        ? uploadImage(
            files.storeBanner![0]!.buffer,
            "Egyzon/Seller/StoreBanner",
          )
        : Promise.resolve({ secure_url: "" }),
    ]);
    // Setup store data
    const storeData = {
      storeDescription,
      storeType,
      storephysicalAddress,
      storeOnlineAddress,
      storeLogo: storeLogoUpload.secure,
      storeBanner: storeBannerUpload.secure_url,
    };
    await SellerServices.setupStore(storeData, userId);
    return sendSuccessResponse(res, 200, "Store setup successful");
  } catch (error) {
    if (error instanceof AppError) {
      console.log(error);
      sendErrorResponse(res, error.statusCode, error.status, error.message);
    } else {
      console.log(error);
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  }
};

export default {
  createRequestToJoin,
  setupStore,
};
