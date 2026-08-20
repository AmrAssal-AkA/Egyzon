"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seller_services_1 = require("../../services/seller.services");
const Responses_1 = require("../../utils/Responses");
const cloudainry_config_1 = __importDefault(require("../../config/cloudainry.config"));
const AppError_1 = require("../../utils/AppError");
const socket_1 = __importDefault(require("../../socket"));
const createRequestToJoin = async (req, res) => {
    let uploadedCommercialRegister;
    let uploadedTaxCard;
    try {
        const userId = req.user?.userId;
        if (!userId)
            return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized", "User not authenticated");
        const { storeName, commercialRegisterNumber, taxCardNumber } = req.body;
        if (!storeName?.trim() ||
            !commercialRegisterNumber?.trim() ||
            !taxCardNumber?.trim()) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "All fields are required");
        }
        const files = req.files;
        if (!files?.commercialRegisterImage?.[0] || !files.taxCardImage?.[0])
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Both Commercial Register Image and Tax Card Image are required");
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        const crMime = files.commercialRegisterImage?.[0]?.mimetype ?? "";
        const taxMime = files.taxCardImage?.[0]?.mimetype ?? "";
        if (!allowedTypes.includes(crMime))
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Invalid image format. Only JPE, PNG and JPG are allowed");
        if (!allowedTypes.includes(taxMime))
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Invalid image format. Only JPEG and PNG are allowed");
        await seller_services_1.SellerServices.checkExistingSeller(userId);
        const [crUpload, taxUpload] = await Promise.all([
            (0, cloudainry_config_1.default)(files.commercialRegisterImage[0].buffer, "Egyzon/Seller/CommercialRegister"),
            (0, cloudainry_config_1.default)(files.taxCardImage[0].buffer, "Egyzon/Seller/TaxCard"),
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
            }
        };
        await seller_services_1.SellerServices.ApplyAsPartner(sellerData, userId);
        const socket = socket_1.default.getSockets(String(userId));
        socket.forEach((socket) => {
            req.io.to(socket).emit("notification", {
                id: `seller-${userId}-${new Date().getTime()}`,
                user: String(userId),
                type: "success",
                message: "Your request to join as a seller has been submitted successfully.",
                data: {
                    sellerId: userId,
                },
                isRead: false,
                createdAt: new Date(),
            });
        });
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Request sent successfully");
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, "Bad Request", error.message);
        }
        console.log(error);
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", "Something went wrong");
    }
};
{
    /*  second step After the seller document Approval */
}
const setupStore = async (req, res) => {
    try {
        // Check if user is authenticated
        const userId = req.user?.userId ||
            (process.env.NODE_ENV !== "production" && req.body?.userId);
        if (!userId) {
            return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized", "User not authenticated");
        }
        // Validate request body
        const { storeDescription, storeType, storephysicalAddress, storeOnlineAddress, } = req.body;
        if (!storeDescription ||
            storeDescription.trim() === "" ||
            !storeType ||
            storeType.trim() === "" ||
            !storephysicalAddress ||
            storephysicalAddress.trim() === "" ||
            !storeOnlineAddress ||
            storeOnlineAddress.trim() === "") {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "All fields are required");
        }
        if (storeType !== "physical" &&
            storeType !== "online" &&
            storeType !== "both") {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Invalid store type");
        }
        if (storeType === "physical" && !storephysicalAddress) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Physical address is required");
        }
        if (storeType === "online" && !storeOnlineAddress) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Online address is required");
        }
        if (storeDescription.length > 100) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Store description should not exceed 100 characters");
        }
        // Validate file uploads
        const files = req.files;
        if (!files || !files.storeLogo) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "atleast upload the logo");
        }
        if (files.storeLogo[0].mimetype !== "image/jpeg" &&
            files.storeLogo[0].mimetype !== "image/png") {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Invalid image format");
        }
        const [storeLogoUpload, storeBannerUpload] = await Promise.all([
            (0, cloudainry_config_1.default)(files.storeLogo[0].buffer, "Egyzon/Seller/StoreLogo"),
            files.storeBanner
                ? (0, cloudainry_config_1.default)(files.storeBanner[0].buffer, "Egyzon/Seller/StoreBanner")
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
        await seller_services_1.SellerServices.setupStore(storeData, userId);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Store setup successful");
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            console.log(error);
            (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.status, error.message);
        }
        else {
            console.log(error);
            (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    }
};
exports.default = {
    createRequestToJoin,
    setupStore,
};
//# sourceMappingURL=StoreCreation.controller.js.map