import Product from "../models/productModel";
import { IProduct } from "../types/product.types";
import { AppError } from "../utils/AppError";

// Service function to create a new product by a seller
export const ProductServices = {
  createProduct: async (sellerId: string, productData: any) => {
    try {
      const newProduct = await Product.create({
        ...productData,
        SellerId: sellerId,
      });
      const existingProduct = await Product.findOne({ productId: newProduct.productId, SellerId: sellerId });
      if (existingProduct) {
        throw new AppError(400, 'Product already exists');
      }
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new AppError(500, 'Failed to create product');
    }
  },
  // Service function to apply a discount to a product by a seller
  ApplyDiscount: async (
    SellerId: string,
    productId: string,
    discount: number,
  ) => {
    const product = await Product.findOne({ productId, SellerId: SellerId });
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    product.price = product.price - product.price * discount;
    return await product.save();
  },
  // Service function to update a product by a seller
  UpdateProduct: async (
    SellerId: string,
    productId: string,
    productData: any,
  ) => {
    const product = await Product.findOne({ productId, SellerId: SellerId });
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    Object.assign(product, productData);
    return await product.save();
  },
  // Service function to get all products with pagination
  getAllProducts: async (page: number, limit: number) => {
    try {
      const [products, total] = await Promise.all([
        Product.find()
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit),
        Product.countDocuments(),
      ]);

      return { products, total };
    } catch (error) {
      console.log(error);
      throw new AppError(500, 'Failed to get products');
    }
  },
  getProductById: async (productId: string) => {
    try {
      const product = await Product.findOne({ productId });
      if (!product) {
        throw new AppError(404, 'Product not found');
      }

      return product;
    } catch (error) {
      if(error instanceof AppError) {
        throw error
      }
      console.log(error);
      throw new AppError(500, "Failed To get the product")
    }
  },
};
