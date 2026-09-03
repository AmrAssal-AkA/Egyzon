import type { Request, Response } from "express";

import Product from "../models/productModel";
import { AppError } from "../utils/AppError";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";
import type { SearchProductsSchemaType } from "../validators/product.validate";

const ALLOWED_SORT_FIELDS = new Set(["price", "productName", "createdAt"]);

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const {
      q: query,
      category,
      sort,
    } = req.query as unknown as SearchProductsSchemaType;
    if (!query || typeof query !== "string") {
      throw new AppError(
        400,
        "Query parameter is required and must be a string",
      );
    }
    const pageNumber = Math.max(1, parseInt(req.query.page as string) || 1);
    const limitNumber = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const skip = (pageNumber - 1) * limitNumber;

    const searchCriteria: any = {
      $text: { $search: query },
    };
    if (category && typeof category === "string") {
      searchCriteria.category = category;
    }
    const sortCriteria: any = {};
    let projection: any = undefined;

    if (sort && typeof sort === "string") {
      const parts = sort.split(":");
      const field: string = parts[0] || "";
      const order: string = parts[1] || "asc";
      if (field && ALLOWED_SORT_FIELDS.has(field)) {
        sortCriteria[field] = order === "desc" ? -1 : 1;
      }
    } else {
      projection = { score: { $meta: "textScore" } };
      sortCriteria.score = { $meta: "textScore" };
    }
    const [products, total] = await Promise.all([
      Product.find(searchCriteria, projection)
        .sort(sortCriteria)
        .skip(skip)
        .limit(limitNumber),
      Product.countDocuments(searchCriteria),
    ]);
    const totalPages = Math.ceil(total / limitNumber);

    return sendSuccessResponse(res, 200, "Products retrieved successfully", {
      products,
      total,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    if (error instanceof AppError)
      return sendErrorResponse(res, error.statusCode, error.message);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};
