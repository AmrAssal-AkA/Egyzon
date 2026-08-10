"use client";

import React, { useState, useMemo } from "react";
import TopBar from "./topBar";
import ProductViewer, { ProductItem } from "./productViewer";
import AddProductModel ,{ ProductFormData } from "./AddProductModel";
import AnalyticStatusCart from "./AnalyticStatusCard"


export const initialProducts: ProductItem[] = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    category: "Electronics",
    price: 3499,
    stock: 45,
    maxStock: 100,
    status: "Active",
    sku: "EL-2026-001",
    image: "🎧",
    createdAt: "2026-07-15",
  },
  {
    id: 2,
    name: "Ergonomic Mechanical Keyboard",
    category: "Electronics",
    price: 1850,
    stock: 4,
    maxStock: 50,
    status: "Low Stock",
    sku: "EL-2026-002",
    image: "⌨️",
    createdAt: "2026-07-18",
  },
  {
    id: 3,
    name: "Minimalist Modern Desk Lamp",
    category: "Furniture",
    price: 799,
    stock: 0,
    maxStock: 30,
    status: "Out of Stock",
    sku: "FN-2026-003",
    image: "💡",
    createdAt: "2026-07-20",
  },
  {
    id: 4,
    name: "Premium Leather Everyday Backpack",
    category: "Accessories",
    price: 2200,
    stock: 18,
    maxStock: 40,
    status: "Active",
    sku: "AC-2026-004",
    image: "🎒",
    createdAt: "2026-07-22",
  },
  {
    id: 5,
    name: "Smart Health & Fitness Tracker",
    category: "Electronics",
    price: 1299,
    stock: 0,
    maxStock: 60,
    status: "Inactive",
    sku: "EL-2026-005",
    image: "⌚",
    createdAt: "2026-07-25",
  },
  {
    id: 6,
    name: "Ceramic Coffee Mug Set (4-Pack)",
    category: "Home & Living",
    price: 450,
    stock: 82,
    maxStock: 120,
    status: "Active",
    sku: "HL-2026-006",
    image: "☕",
    createdAt: "2026-07-28",
  },
];

export default function ProductsContainer() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Dynamic tab counts
  const tabCounts = useMemo(() => {
    return {
      all: products.length,
      active: products.filter((p) => p.status === "Active").length,
      inactive: products.filter((p) => p.status === "Inactive").length,
      low_stock: products.filter((p) => p.status === "Low Stock").length,
      out_of_stock: products.filter((p) => p.status === "Out of Stock").length,
    };
  }, [products]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (data: ProductFormData) => {
    let computedStatus = data.status;
    if (data.stock === 0 && computedStatus !== "Inactive") {
      computedStatus = "Out of Stock";
    } else if (data.stock > 0 && data.stock <= 5 && computedStatus !== "Inactive") {
      computedStatus = "Low Stock";
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: data.name,
                category: data.category,
                price: data.price,
                stock: data.stock,
                status: computedStatus,
                sku: data.sku,
              }
            : p
        )
      );
    } else {
      const newProd: ProductItem = {
        id: Date.now(),
        name: data.name,
        category: data.category,
        price: data.price,
        stock: data.stock,
        maxStock: Math.max(100, data.stock),
        status: computedStatus,
        sku: data.sku || `PRD-${Date.now().toString().slice(-4)}`,
        image: "📦",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProducts((prev) => [newProd, ...prev]);
    }

    setIsModalOpen(false);
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

      <ProductViewer
        productsList={products}
        filterTab={activeTab}
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        onEditProduct={handleOpenEditModal}
        onDeleteProduct={(id) => setProducts((prev) => prev.filter((p) => p.id !== id))}
      />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnalyticStatusCart  totalInventoryVal={35000} />
      <AnalyticStatusCart  InStockRate={50.6} />
      <AnalyticStatusCart  ReOrderRequired={2} />

      

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

