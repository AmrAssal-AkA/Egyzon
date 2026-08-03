import type { Request, Response } from "express";

import uploadImage from "../config/cloudainry.config";
import { CategoryService } from "../services/category.services";
import { ICategory } from "../types/product.types";

export const CategoryController = {
  createCategory: async (req: Request, res: Response) => {
    try {
      const { categoryName, description } = req.body;
      if (!categoryName || !description) {
        return res
          .status(400)
          .json({ message: "Category name and description are required" });
      }
      const categoryImage = req.file;
      if (!categoryImage) {
        return res.status(400).json({ message: "Category image is required" });
      }
      const upload = await uploadImage(categoryImage.buffer, "categories");
      const categoryData: ICategory = {
        categoryName,
        description,
        imageUrl: upload.secure_url,
        Products: [],
      };
      const category = await CategoryService.createCategory(categoryData);
      res
        .status(201)
        .json({ message: "Category created successfully", category });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
