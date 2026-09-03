import type { Request, Response } from "express";

import { ProductServices } from "../services/product.services";
import { NotificationServices } from "../services/notification.services";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";
import uploadImage from "../config/cloudainry.config";
import { scanFile } from "../utils/virusScan";
import logger from "../utils/logger";
import { sentizeRichText , sentizePlainText} from "../utils/senitize";
import { AppError } from "../utils/AppError";
import {InventoryServices} from "../services/Inventory.services";

export const ProductController = {
 createProduct: async (req: Request, res: Response) => {
  try {
    const sellerId =
      (req as any).user?.userId ||
      (req as any).user?._id ||
      (req as any).user?.id;
    if (!sellerId) {
      return sendErrorResponse(res, 401, "Unauthorized: Seller ID not found");
    }
    const {
      productName,
      productDescription,
      price,
      discount,
      stock,
      category,
    } = req.body;
    if (
      !productName ||
      !productDescription ||
      price === undefined ||
      stock === undefined
    ) {
      return sendErrorResponse(
        res,
        400,
        "All required product fields must be provided",
      );
    }
    const cleanedDescription = sentizeRichText(productDescription);
    const sanitizedProductName = sentizePlainText(productName);
    const images = req.files as Express.Multer.File[];
    if (!images || images.length === 0 || !images[0]?.buffer) {
      return sendErrorResponse(res, 400, "Image file is required");
    }
    for (const image of images) {
      const { isInfected, viruses } = await scanFile(image.buffer);
      if (isInfected) {
        logger.warn(
          `Product Image is infected with viruses: ${viruses.join(", ")}`,
        );
        return sendErrorResponse(
          res,
          400,
          "Bad Request",
          `Product Image is infected with viruses: ${viruses.join(", ")}`,
        );
      }
    }
    const imageUrl = await Promise.all(
      images.map((image) => uploadImage(image.buffer, "Egyzon/Products")),
    );
    if (!imageUrl || imageUrl.length === 0) {
      return sendErrorResponse(res, 400, "Image upload failed");
    }

    const newProduct = await ProductServices.createProduct(sellerId, {
      productName: sanitizedProductName,
      productDescription: cleanedDescription,
      price: Number(price),
      discount: discount !== undefined ? Number(discount) : 0,
      stock: Number(stock),
      category,
      imageUrl: imageUrl.map((url) => url.secure_url),
    });
    await NotificationServices.createNotification({
      user: sellerId,
      type: "success",
      message: `Product "${newProduct.productName}" created successfully.`,
      isRead: false,
      createdAt: new Date(),
    });
    sendSuccessResponse(res, 201, "Product created successfully", newProduct);
  } catch (error: any) {
    console.log(error);
    sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Error",
    );
  }
},
applyDiscount: async (req: Request, res: Response) => {
  try {
    const sellerId =
      (req as any).user?.userId ||
      (req as any).user?._id ||
      (req as any).user?.id;
    const productId = req.params.productId as string;
    const discount = req.body.discount as number;

    const updatedProduct = await ProductServices.ApplyDiscount(
      sellerId,
      productId,
      discount,
    );
    sendSuccessResponse(
      res,
      200,
      "Discount applied successfully",
      updatedProduct,
    );
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
},
getAllProducts: async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await ProductServices.getAllProducts(
      Number(page),
      Number(limit),
    );
    sendSuccessResponse(res, 200, "Products retrieved successfully", products);
  } catch (error) {
    sendErrorResponse(res, 500, "Internal Server Error", error);
  }
},
getProductById: async (req: Request, res: Response) => {
  const productId =
    (req.params.productId as string) ||
    (process.env.NODE_ENV !== "production" && req.body.productId);
  if (!productId) {
    return sendErrorResponse(res, 400, "productId not fount");
  }

  try {
    const getProduct = await ProductServices.getProductById(productId);
    return sendSuccessResponse(
      res,
      200,
      "Product retrieved successfully",
      getProduct,
    );
  } catch (error) {
    sendErrorResponse(res, 500, "Internal Server Error", error);
  }
},
 updateProduct: async (req: Request, res: Response) => {
   try {
    const user = req.user?.userId
    const seller = req.user?.role;
    if(!user || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden","You are not authorized to access this resource");
    const productId = req.params.productId as string;
    if (!productId) return sendErrorResponse(res, 400, "Bad Request", "Product ID is required");
    const { productName, productDescription, price, discount, stock, category } = req.body;
    const cleanedDescription = sentizeRichText(productDescription);
    const sanitizedProductName = sentizePlainText(productName);
    if (!sanitizedProductName || !cleanedDescription || price === undefined || stock === undefined) {
        return sendErrorResponse(res, 400, "Bad Request", "All required product fields must be provided");
    }
    const images = req.files as Express.Multer.File[];
    let imageUrl: string[] | undefined;
    if (images && images.length > 0) {
      imageUrl = await Promise.all(
        images.map((image) => uploadImage(image.buffer, "Egyzon/Products"))
      ).then((urls) => urls.map((url) => url.secure_url));
    }

    const editProduct = await ProductServices.UpdateProduct(user, productId, {
      productName: sanitizedProductName,
      productDescription: cleanedDescription,
      price: price !== undefined ? Number(price) : undefined,
      discount: discount !== undefined ? Number(discount) : undefined,
      stock: stock !== undefined ? Number(stock) : undefined,
      category,
      imageUrl,
    });
    return sendSuccessResponse(res, 200, "Product updated successfully", editProduct);
   }catch(error){
       sendErrorResponse(res, 500, "Internal Server Error", error);
   }
},
 getSellerProducts: async (req: Request, res: Response) => {
  try {
    const sellerId =
      (req as any).user?.userId ||
      (req as any).user?._id ||
      (req as any).user?.id;
    if (!sellerId) {
      return sendErrorResponse(res, 401, "Unauthorized: Seller ID not found");
    }
    const products = await ProductServices.getSellerProducts(sellerId);
    sendSuccessResponse(
      res,
      200,
      "Seller products retrieved successfully",
      products,
    );
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
},
deleteProduct: async (req: Request, res: Response) => {
  try {
    const sellerId =
      (req as any).user?.userId ||
      (req as any).user?._id ||
      (req as any).user?.id;
    const productId = req.params.productId as string;
    const deletedProduct = await ProductServices.deleteProduct(
      sellerId,
      productId,
    );
    sendSuccessResponse(
      res,
      200,
      "Product deleted successfully",
      deletedProduct,
    );
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
},
setStock: async (req: Request, res: Response) => {
try {
  const sellerId = req.user?.userId;
  const  user = req.user?.role;
  if(!sellerId || user !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
  const productId = req.params.productId as string;
  const { newStock } = req.body;
  if (newStock === undefined) {
    return sendErrorResponse(res, 400, "Bad Request", "New stock value is required");
  }
  const updatedProduct = await InventoryServices.setStock(productId, Number(newStock));
  return sendSuccessResponse(res, 200, "Stock updated successfully", updatedProduct);
}catch(error){
  if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message);
  return sendErrorResponse(res, 500, 'internal server error')
}
}
}
