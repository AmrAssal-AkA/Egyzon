"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";

import TopBar from "./_components/topBar";
import ProductViewer from "./_components/productViewer";
import AddProductModel from "./_components/AddProductModel";
import AnalyticStatusCart from "./_components/AnalyticStatusCard";
import { sellerService } from "@/services/sellerService";
import { SellerProduct } from "@/types/seller";
import { Product } from "@/types/product.type";
import { toast } from "sonner";

export default function ProductsContainer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await sellerService.getSellerProducts();
      if (response && response.success && Array.isArray(response.data)) {
        const mapped: Product[] = response.data.map((p: SellerProduct) => {
          const stock = p.stock ?? 0;
          let computedStatus: Product["status"] = "Active";
          if (stock === 0) computedStatus = "Out of Stock";
          else if (stock <= 5) computedStatus = "Low Stock";
          else if (p.status === "inactive") computedStatus = "Inactive";

          const imageSrc = Array.isArray(p.imageUrl)
            ? p.imageUrl[0]
            : typeof p.imageUrl === "string"
              ? p.imageUrl
              : (p as any).image;

          const prodId = p._id || String(Math.random());

          return {
            _id: p._id,
            id: prodId,
            productName: p.productName || "Untitled Product",
            name: p.productName || "Untitled Product",
            productDescription: p.productDescription || "",
            description: p.productDescription || "",
            category: p.category || "General",
            price: p.price || 0,
            discount: p.discount || 0,
            stock: stock,
            maxStock: Math.max(100, stock),
            status: computedStatus,
            sku: p.sku || `SKU-${String(p._id || Date.now()).slice(-6)}`,
            imageUrl: imageSrc,
            image: imageSrc,
            createdAt: p.createdAt
              ? p.createdAt.split("T")[0]
              : new Date().toISOString().split("T")[0],
          };
        });
        setProducts(mapped);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to load seller products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Dynamic tab counts
  const tabCounts = useMemo(() => {
    return {
      all: products.length,
      active: products.filter((p) => {
        const s = (p.status || "").toLowerCase();
        return s === "active";
      }).length,
      inactive: products.filter((p) => {
        const s = (p.status || "").toLowerCase();
        return s === "inactive";
      }).length,
      low_stock: products.filter((p) => {
        const s = (p.status || "").toLowerCase();
        return s === "low stock" || s === "low_stock";
      }).length,
      out_of_stock: products.filter((p) => {
        const s = (p.status || "").toLowerCase();
        return s === "out of stock" || s === "out_of_stock";
      }).length,
    };
  }, [products]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (savedData?: any) => {
    if (savedData) {
      let computedStatus: Product["status"] = savedData.status || "Active";
      const stockVal = savedData.stock || 0;
      if (stockVal === 0 && computedStatus !== "Inactive") {
        computedStatus = "Out of Stock";
      } else if (
        stockVal > 0 &&
        stockVal <= 5 &&
        computedStatus !== "Inactive"
      ) {
        computedStatus = "Low Stock";
      }

      if (editingProduct) {
        const targetId = editingProduct.id ?? editingProduct._id;
        setProducts((prev) =>
          prev.map((p) =>
            (p.id ?? p._id) === targetId
              ? {
                  ...p,
                  name: savedData.name,
                  productName: savedData.name,
                  category: savedData.category,
                  price: savedData.price,
                  stock: savedData.stock,
                  status: computedStatus,
                }
              : p,
          ),
        );
      } else {
        const newProd: Product = {
          id: Date.now(),
          name: savedData.name,
          productName: savedData.name,
          category: savedData.category,
          price: savedData.price,
          stock: savedData.stock,
          maxStock: Math.max(100, savedData.stock),
          status: computedStatus,
          sku: "AUTO-GENERATED",
          image: "📦",
          imageUrl: "📦",
          createdAt: new Date().toISOString().split("T")[0],
        };
        setProducts((prev) => [newProd, ...prev]);
      }
    }
    // Refresh products list from server
    loadProducts();
    setIsModalOpen(false);
  };

  const totalVal = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.stock, 0);
  }, [products]);

  const inStockRate = useMemo(() => {
    if (products.length === 0) return 0;
    const inStock = products.filter((p) => p.stock > 0).length;
    return Math.round((inStock / products.length) * 1000) / 10;
  }, [products]);

  const reorderCount = useMemo(() => {
    return products.filter((p) => p.stock <= 5).length;
  }, [products]);

  const handleDeleteProduct = async (id: string | number) => {
    try {
      const response = await sellerService.deleteProduct(id);
      if (response && response.success) {
        toast.success(response.message || "Product deleted successfully");
        setProducts((prev) => prev.filter((p) => (p.id ?? p._id) !== id));
        loadProducts();
      } else {
        toast.error(response?.message || "Failed to delete product");
      }
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      toast.error(error?.message || "Failed to delete product");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
        counts={tabCounts}
        onAddProduct={handleOpenAddModal}
      />

      {loading ? (
        <div className="w-full py-16 flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium text-slate-500">
            Loading products catalog...
          </p>
        </div>
      ) : (
        <ProductViewer
          productsList={products}
          filterTab={activeTab}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          onEditProduct={handleOpenEditModal}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnalyticStatusCart totalInventoryVal={totalVal || 35000} />
        <AnalyticStatusCart InStockRate={inStockRate || 50.6} />
        <AnalyticStatusCart ReOrderRequired={reorderCount} />
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <AddProductModel
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          editingProduct={editingProduct}
        />
      )}
    </div>
  );
}
