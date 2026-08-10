"use client";

import React, { useState, useMemo } from "react";
import {
  Pencil,
  Trash2Icon,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";

export interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  maxStock: number;
  status: "Active" | "Inactive" | "Low Stock" | "Out of Stock";
  sku: string;
  image?: string;
  createdAt: string;
}

const initialProducts: ProductItem[] = [
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

interface ProductViewerProps {
  productsList?: ProductItem[];
  filterTab?: string;
  searchQuery?: string;
  categoryFilter?: string;
  onEditProduct?: (product: ProductItem) => void;
  onDeleteProduct?: (id: number) => void;
}

export default function ProductViewer({
  productsList = initialProducts,
  filterTab = "all",
  searchQuery = "",
  categoryFilter = "all",
  onEditProduct,
  onDeleteProduct,
}: ProductViewerProps) {
  const [products, setProducts] = useState<ProductItem[]>(productsList);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter products based on search, tab, and category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab filter
      if (filterTab === "active" && p.status !== "Active") return false;
      if (filterTab === "inactive" && p.status !== "Inactive") return false;
      if (filterTab === "low_stock" && p.status !== "Low Stock") return false;
      if (filterTab === "out_of_stock" && p.status !== "Out of Stock")
        return false;

      // Category filter
      if (
        categoryFilter !== "all" &&
        p.category.toLowerCase() !== categoryFilter.toLowerCase()
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesSku && !matchesCat) return false;
      }

      return true;
    });
  }, [products, filterTab, searchQuery, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Selection handlers
  const isAllSelected =
    paginatedProducts.length > 0 &&
    paginatedProducts.every((p) => selectedIds.includes(p.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      const paginatedIds = paginatedProducts.map((p) => p.id);
      setSelectedIds(selectedIds.filter((id) => !paginatedIds.includes(id)));
    } else {
      const paginatedIds = paginatedProducts.map((p) => p.id);
      const newSelected = Array.from(
        new Set([...selectedIds, ...paginatedIds]),
      );
      setSelectedIds(newSelected);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteItem = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    onDeleteProduct?.(id);
  };

  const handleBulkDelete = () => {
    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
  };

  // Status badge styling helper
  const getStatusBadge = (status: ProductItem["status"]) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case "Low Stock":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Low Stock
          </span>
        );
      case "Out of Stock":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Out of Stock
          </span>
        );
      case "Inactive":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Inactive
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl transition-all animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
              {selectedIds.length}
            </span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
              products selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium shadow-xs transition-all cursor-pointer"
            >
              <Trash2Icon className="w-3.5 h-3.5" />
              <span>Delete Selected</span>
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-all cursor-pointer"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Main Table Card */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/70 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <th scope="col" className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                  />
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Product Details
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Category
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Price
                </th>
                <th scope="col" className="py-3.5 px-4 min-w-40">
                  Stock Level
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Status
                </th>
                <th scope="col" className="py-3.5 px-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const isSelected = selectedIds.includes(product.id);
                  const stockPercentage = Math.min(
                    100,
                    Math.round((product.stock / product.maxStock) * 100),
                  );

                  return (
                    <tr
                      key={product.id}
                      className={`group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                        isSelected ? "bg-blue-50/40 dark:bg-blue-950/20" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(product.id)}
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        />
                      </td>

                      {/* Product Name & Details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                            {product.image || "📦"}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">
                              {product.name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              SKU: {product.sku}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-xs">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {product.price.toLocaleString()} EGP
                        </span>
                      </td>

                      {/* Stock Level Bar */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1.5 max-w-37.5">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              {product.stock} units
                            </span>
                            <span className="text-slate-400">
                              {stockPercentage}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                product.stock === 0
                                  ? "bg-rose-500"
                                  : product.stock <= 5
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                              }`}
                              style={{ width: `${stockPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(product.status)}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEditProduct?.(product)}
                            title="Edit product"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(product.id)}
                            title="Delete product"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all cursor-pointer"
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* Empty State */
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <Package className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        No products found
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs">
                        Try adjusting your search query, filters, or tab
                        selection.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {filteredProducts.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {filteredProducts.length}
            </span>{" "}
            products
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
