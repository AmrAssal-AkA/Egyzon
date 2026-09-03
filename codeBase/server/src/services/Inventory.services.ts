import Product from "../models/productModel";
import type { IProduct } from "../types/product.types";
import { NotificationServices } from "./notification.services";
import { AppError } from "../utils/AppError";

const Low_Stock_Threshold = 5;

export const InventoryServices = {
  async notifyLowStock(product: IProduct) {
    try {
      if (product.stock <= 0) {
        if (!product.outOfStockNotify) {
          await NotificationServices.createNotification({
            user: product.sellerId.toString(),
            type: "warning",
            message: `Your product ${product.productName} is out of stock. Please restock it as soon as possible.`,
            isRead: false,
            createdAt: new Date(),
          });
          product.outOfStockNotify = true;
          product.lowStockNotify = true;
          await product.save();
        }
      } else if (product.stock <= Low_Stock_Threshold) {
        if (!product.lowStockNotify) {
          await NotificationServices.createNotification({
            user: product.sellerId.toString(),
            type: "warning",
            message: `Your product ${product.productName} is low in stock. Please restock it soon.`,
            isRead: false,
            createdAt: new Date(),
          });
          product.lowStockNotify = true;
          await product.save();
        }
      } else if (product.lowStockNotify || product.outOfStockNotify) {
        product.lowStockNotify = false;
        product.outOfStockNotify = false;
        await product.save();
      }
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Failed to notify low stock");
    }
  },
  async adjustStock(ProductId: string, delta: number) {
    try {
        const product = await Product.findById(ProductId);
        if (!product) throw new AppError(404, `Product with ID ${ProductId} not found`);
        const newStock = product.stock + delta;
        if (newStock < 0) throw new AppError(400, `Insufficient stock for product ${product.productName}`);
        product.stock = newStock;
        await this.notifyLowStock(product);
        await product.save();
    }catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(500, "Failed to adjust stock");
    }
  },
  async setStock(ProductId: string, newStock: number) {
    try {
        const product = await Product.findById(ProductId);
        if (!product) throw new AppError(404, `Product with ID ${ProductId} not found`);
        if (newStock < 0) throw new AppError(400, `Stock cannot be negative for product ${product.productName}`);
        product.stock = newStock;
        await this.notifyLowStock(product);
        await product.save();
        return product;
    }catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(500, "Failed to set stock");
    }
  }
};
