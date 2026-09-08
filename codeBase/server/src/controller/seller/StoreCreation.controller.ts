import type { Request, Response } from "express";

import { SellerServices } from "../../services/seller.services";
import { sendSuccessResponse, sendErrorResponse } from "../../utils/Responses";
import uploadImage from "../../config/cloudainry.config";
import { AppError } from "../../utils/AppError";
import { scanFile } from "../../utils/virusScan";
import logger from "../../utils/logger";
import { NotificationServices } from "../../services/notification.services";

export const createRequestToJoin = async (req: Request, res: Response) => {
  let uploadedCommercialRegister: { public_id: string } | undefined;
  let uploadedTaxCard: { public_id: string } | undefined;
  try {
    const userId = req.user?.userId;
    if (!userId)
      return sendErrorResponse(
        res,
        401,
        "Unauthorized",
        "User not authenticated",
      );

    const { storeName, commercialRegisterNumber, taxCardNumber } = req.body;
    if (
      !storeName?.trim() ||
      !commercialRegisterNumber?.trim() ||
      !taxCardNumber?.trim()
    ) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "All fields are required",
      );
    }
    const files = req.files as {
      commercialRegisterImage?: Express.Multer.File[];
      taxCardImage?: Express.Multer.File[];
    };
    if (!files?.commercialRegisterImage?.[0] || !files.taxCardImage?.[0])
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Both Commercial Register Image and Tax Card Image are required",
      );
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const crMime = files.commercialRegisterImage?.[0]?.mimetype ?? "";
    const taxMime = files.taxCardImage?.[0]?.mimetype ?? "";
    if (!allowedTypes.includes(crMime))
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Invalid image format. Only JPE, PNG and JPG are allowed",
      );
    if (!allowedTypes.includes(taxMime))
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Invalid image format. Only JPEG and PNG are allowed",
      );
    // Check if the user is already a seller
    await SellerServices.checkExistingSeller(userId);
    // Scan the uploaded images for viruses
    for (const file of files.commercialRegisterImage ?? []) {
      const { isInfected, viruses } = await scanFile(file.buffer);
      if (isInfected) {
        logger.warn(
          `Commercial Register Image is infected with viruses: ${viruses.join(", ")}`,
        );
        return sendErrorResponse(
          res,
          400,
          "Bad Request",
          `Commercial Register Image is infected with viruses: ${viruses.join(", ")}`,
        );
      }
    }
    for (const file of files.taxCardImage ?? []) {
      const { isInfected, viruses } = await scanFile(file.buffer);
      if (isInfected) {
        logger.warn(
          `Tax Card Image is infected with viruses: ${viruses.join(", ")}`,
        );
        return sendErrorResponse(
          res,
          400,
          "Bad Request",
          `Tax Card Image is infected with viruses: ${viruses.join(", ")}`,
        );
      }
    }
    const [crUpload, taxUpload] = await Promise.all([
      uploadImage(
        files.commercialRegisterImage[0].buffer,
        "Egyzon/Seller/CommercialRegister",
      ),
      uploadImage(files.taxCardImage[0].buffer, "Egyzon/Seller/TaxCard"),
    ]);
    uploadedCommercialRegister = crUpload;
    uploadedTaxCard = taxUpload;
    console.log("Uploaded images:", crUpload.secure_url, taxUpload.secure_url);
    const sellerData = {
      storeName,
      commercialRegisterNumber,
      taxCardNumber,
      sellerDocuments: {
        commercialRegisterUrl: crUpload.secure_url,
        taxCardUrl: taxUpload.secure_url,
      },
    };
    await SellerServices.ApplyAsPartner(sellerData, userId);
    await NotificationServices.notifyPartenerApplicantsToAdmin({
      applicantId: userId,
      applicationId: new Date().toISOString(),
      applicantName: storeName,
      shopName: storeName,
    })

    return sendSuccessResponse(res, 200, "Request sent successfully");
  } catch (error) {
    if (error instanceof AppError) {
      return sendErrorResponse(
        res,
        error.statusCode,
        "Bad Request",
        error.message,
      );
    }

    return sendErrorResponse(
      res,
      500,
      "Internal Server Error",
      "Something went wrong",
    );
  }
};

{
  /*  second step After the seller document Approval */
}
export const setupStore = async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    const userId = req.user?.userId 
    const seller = req.user?.role
    if (!userId || seller !== "seller") return sendErrorResponse(res, 401, "Unauthorized", "User not authenticated");
    // Validate request body
    const {
      storeDescription,
      storeType,
      storephysicalAddress,
      storeOnlineAddress,
    } = req.body;
    console.log("Request body:", req.body);
    if (
      !storeDescription ||
      storeDescription.trim() === "" ||
      !storeType ||
      storeType.trim() === "" 
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
      storeType !== "online" 
    ) {
      return sendErrorResponse(res, 400, "Bad Request", "Invalid store type");
    }
    if (storeType === "physical" && (!storephysicalAddress || storephysicalAddress.trim() === "")) {
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Physical address is required",
      );
    }
    const finalOnlineAddress = storeType === "physical" ? "" : (storeOnlineAddress || "Online");
    const finalPhysicalAddress = storeType === "online" ? "" : storephysicalAddress;
    console.log("Request body after validation:", req.body);
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
    // Scan the uploaded images for viruses
    for (const file of files.storeLogo ?? []) {
      const { isInfected, viruses } = await scanFile(file.buffer);
      if (isInfected) {
        logger.warn(
          `Store Logo is infected with viruses: ${viruses.join(", ")}`,
        );
        return sendErrorResponse(
          res,
          400,
          "Bad Request",
          `Store Logo is infected with viruses: ${viruses.join(", ")}`,
        );
      }
    }
    for (const file of files.storeBanner ?? []) {
      const { isInfected, viruses } = await scanFile(file.buffer);
      if (isInfected) {
        logger.warn(
          `Store Banner is infected with viruses: ${viruses.join(", ")}`,
        );
        return sendErrorResponse(
          res,
          400,
          "Bad Request",
          `Store Banner is infected with viruses: ${viruses.join(", ")}`,
        );
      }
    }
    // Upload images to Cloudinary
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
      storeManagement: {
      storeDescription,
      storeType,
      storephysicalAddress: finalPhysicalAddress,
      storeOnlineAddress: finalOnlineAddress,
      storeLogo: storeLogoUpload.secure_url,
      storeBanner: storeBannerUpload.secure_url,
      },
    };
    console.log('store data', storeData)
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

