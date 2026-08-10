import type {Request, Response} from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/Responses";
import { AdminService } from "../../services/admin.services";




export const ManageSellerApplicationsController = {
    getAllPendingSellerApplications: async (req: Request, res: Response) => {
        try{
            const applications = await AdminService.getAllPendingSellerApplications();
            return sendSuccessResponse(res, 200, "Pending seller applications retrieved successfully", applications);
        }catch(error){
            return sendErrorResponse(res, 500, "Internal Server Error", "An unexpected error occurred");
        }
    },
    approveSeller: async (req: Request, res: Response) => {
        try {
        const sellerId  = req.params.sellerId as string;
        if (!sellerId) return sendErrorResponse(res, 400, "Bad Request", "Seller ID is required");

        const updatedSeller = await AdminService.approveSeller(sellerId);
        return sendSuccessResponse(res, 200, "Seller approved successfully", updatedSeller);
    }catch(error){
        return sendErrorResponse(res, 500, "Internal Server Error", "An unexpected error occurred");
    }
 }, 
 requestAdditionalDocuments: async (req: Request, res: Response) => {
    try{
        const sellerId  = req.params.sellerId as string;
        if (!sellerId) return sendErrorResponse(res, 400, "Bad Request", "Seller ID is required");
        const { message } = req.body;
        if (!message) return sendErrorResponse(res, 400, "Bad Request", "Message is required");
        const updatedSeller = await AdminService.requestAdditionalDocuments(sellerId, message);
        return sendSuccessResponse(res, 200, "Request for additional documents sent successfully", updatedSeller);
    }catch(error){
        return sendErrorResponse(res, 500,"Internal Server Error", "An unexpected error occurred")
    }
 },
 rejectseller: async (req: Request, res: Response) => {
    try {
        const sellerId  = req.params.sellerId as string;
        if (!sellerId) return sendErrorResponse(res, 400, "Bad Request", "Seller ID is required");
        
        const updatedSeller = await AdminService.rejectSeller(sellerId);
        return sendSuccessResponse(res, 200, "Seller rejected successfully", updatedSeller);
    }catch(error){
        return sendErrorResponse(res, 500, "Internal Server Error", "An unexpected error occurred");
    }
 }
}