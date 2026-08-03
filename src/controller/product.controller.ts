import type { Request, Response } from "express";

import { ProductServices } from "../services/product.services";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";
import uploadImage from "../config/cloudainry.config";

const createProduct = async (req: Request, res: Response) => {
  try {
    const sellerId = (req as any).user?.id;
    if (!sellerId) {
      return sendErrorResponse(res, 401, "Unauthorized: Seller ID not found");
    }
    const { productName, productDescription, price, discount, stock } =
      req.body;
    const images = req.files as Express.Multer.File[];
    if (!images || images.length === 0 || !images[0]?.buffer) {
      return sendErrorResponse(res, 400, "Image file is required");
    }
    const imageUrl = await uploadImage(images[0]?.buffer, "Eguzon/Products");
    if (!imageUrl) {
      return sendErrorResponse(res, 400, "Image upload failed");
    }
    const newProduct = await ProductServices.createProduct(sellerId, {
      productName,
      productDescription,
      price,
      discount,
      stock,
      imageUrl,
    });
    sendSuccessResponse(res, 201, "Product created successfully", newProduct);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const applyDiscount = async (req: Request, res: Response) => {
  try {
    const sellerId = (req as any).user?.id;
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
};

const getAllProducts = async (req: Request, res: Response) => {
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
};

const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.productId as string ||(process.env.NODE_ENV !== 'production' && req.body.productId);;
  if (!productId) {
    return sendErrorResponse(res, 400, "productId not fount");
  }

  try {
    const getProduct = await ProductServices.getProductById(productId);
    return sendSuccessResponse(res, 200, "Product retrieved successfully", getProduct);
  } catch (error) {
    sendErrorResponse(res, 500, "Internal Server Error", error);
  }
};

export default {
  createProduct,
  applyDiscount,
  getAllProducts,
  getProductById,
};
