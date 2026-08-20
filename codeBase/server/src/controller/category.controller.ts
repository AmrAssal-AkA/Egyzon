import type { Request, Response } from "express";

import uploadImage from "../config/cloudainry.config";
import { CategoryService } from "../services/category.services";
import { ICategory } from "../types/product.types";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";

export const CategoryController = {
  createCategory: async (req: Request, res: Response) => {
    try {
       const { categoryName, description } = req.body;
       if (!categoryName || !description) {
        return sendErrorResponse(res, 400, "All required fields must be provided");
       }
       const image = req.file;
       if (!image || !image.buffer) {
           return sendErrorResponse(res, 400, "Image file is required");
       }
       console.log("Image received:", image);
        const uploadedImage = await uploadImage(image.buffer, "Egyzon/Categories");
        if (!uploadedImage) {
            return sendErrorResponse(res, 400, "Image upload failed");
        }

        const categoryData: ICategory = {
            categoryName,
            description,
            imageUrl: uploadedImage.secure_url,
            Products: [],
        };
        const category = await CategoryService.createCategory(categoryData);
        console.log("Category created successfully:", category);
        sendSuccessResponse(res, 201, "Category created successfully", category);
    } catch (error) {
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  getAllCategories: async (req: Request, res: Response) => {
    try{
      const categories = await CategoryService.getAllCategories();
      sendSuccessResponse(res, 200, "Categories fetched successfully", categories);
    }catch (error) {
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  addProductToCategory: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId;
      if (!sellerId) {
        return sendErrorResponse(res, 401, "Unauthorized: Seller ID is missing");
      }
      const { categoryId, productId } = req.body ;
      if (!categoryId || !productId) return sendErrorResponse(res, 400, "Category ID and Product ID are required");
      
      const updatedCategory = await CategoryService.addProductToCategory(categoryId, productId);
      sendSuccessResponse(res, 200, "Product added to category successfully", updatedCategory);
    }catch (error) {
      console.log(error);
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  getProductsByCategory: async (req: Request, res: Response) => {
    try {
      const rawCategoryId = req.params.categoryId;
      const categoryId = Array.isArray(rawCategoryId) ? rawCategoryId[0] : rawCategoryId;
      if (!categoryId) return sendErrorResponse(res, 400, "Category ID is required");
      const products = await CategoryService.getProductsByCategory(categoryId);
      sendSuccessResponse(res, 200, "Products fetched successfully", products);
    }catch (error) {
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  },

};
