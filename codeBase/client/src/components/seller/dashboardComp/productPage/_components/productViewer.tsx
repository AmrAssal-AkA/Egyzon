"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Pencil,
  Trash2Icon,
  ChevronLeft,
  ChevronRight,
  Package,
  BadgePercentIcon
} from "lucide-react";
import { Product } from "@/types/product.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ProductViewerProps {
  productsList?: Product[];
  filterTab?: string;
  searchQuery?: string;
  categoryFilter?: string;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (id: string | number) => void | Promise<void>;
  onApplyDiscount?: (product: Product) => void;
}

export default function ProductViewer({
  productsList = [],
  filterTab = "all",
  searchQuery = "",
  categoryFilter = "all",
  onEditProduct,
  onDeleteProduct,
  onApplyDiscount,
}: ProductViewerProps) {
  const [products, setProducts] = useState<Product[]>(productsList);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const itemsPerPage = 5;

  useEffect(() => {
    setProducts(productsList);
  }, [productsList]);

  // Filter products based on search, tab, and category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const normStatus = (p.status || "").toLowerCase();
      // Tab filter
      if (filterTab === "active" && normStatus !== "active") return false;
      if (filterTab === "inactive" && normStatus !== "inactive") return false;
      if (
        filterTab === "low_stock" &&
        normStatus !== "low stock" &&
        normStatus !== "low_stock"
      )
        return false;
      if (
        filterTab === "out_of_stock" &&
        normStatus !== "out of stock" &&
        normStatus !== "out_of_stock"
      )
        return false;

      const productCat =
        typeof p.category === "object" && p.category !== null
          ? (p.category as any).categoryName || (p.category as any).name || ""
          : typeof p.category === "string"
            ? p.category
            : "";

      // Category filter
      if (
        categoryFilter !== "all" &&
        productCat.toLowerCase() !== categoryFilter.toLowerCase()
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const productName = (p.name || p.productName || "").toLowerCase();
        const productSku = (p.sku || "").toLowerCase();
        const productCategory = productCat.toLowerCase();
        const matchesName = productName.includes(query);
        const matchesSku = productSku.includes(query);
        const matchesCat = productCategory.includes(query);
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

  const getProductId = (p: Product): string | number => p.id ?? p._id ?? "";

  // Selection handlers
  const isAllSelected =
    paginatedProducts.length > 0 &&
    paginatedProducts.every((p) => selectedIds.includes(getProductId(p)));

  const handleSelectAll = () => {
    if (isAllSelected) {
      const paginatedIds = paginatedProducts.map(getProductId);
      setSelectedIds(selectedIds.filter((id) => !paginatedIds.includes(id)));
    } else {
      const paginatedIds = paginatedProducts.map(getProductId);
      const newSelected = Array.from(
        new Set([...selectedIds, ...paginatedIds]),
      );
      setSelectedIds(newSelected);
    }
  };

  const handleSelectOne = (id: string | number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteItem = (id: string | number) => {
    setProducts((prev) => prev.filter((p) => getProductId(p) !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    onDeleteProduct?.(id);
  };

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => {
      handleDeleteItem(id);
    });
    setSelectedIds([]);
  };

  const handleProductDiscount = (product: Product) => {
    onApplyDiscount?.(product);
  };

  // Status badge styling helper
  const getStatusBadge = (status?: Product["status"]) => {
    const normStatus = (status || "").toLowerCase();
    switch (normStatus) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case "low stock":
      case "low_stock":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Low Stock
          </span>
        );
      case "out of stock":
      case "out_of_stock":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Out of Stock
          </span>
        );
      case "inactive":
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
                  const prodId = getProductId(product);
                  const isSelected = selectedIds.includes(prodId);
                  const maxStock =
                    product.maxStock || Math.max(100, product.stock);
                  const stockPercentage = Math.min(
                    100,
                    Math.round((product.stock / maxStock) * 100),
                  );
                  const displayName =
                    product.name || product.productName || "Untitled Product";
                  const displaySku =
                    product.sku ||
                    (prodId ? `SKU-${String(prodId).slice(-6)}` : "SKU-N/A");
                  const displayCategory =
                    typeof product.category === "object" && product.category !== null
                      ? (product.category as any).categoryName || (product.category as any).name || "General"
                      : typeof product.category === "string" && product.category.trim() !== ""
                        ? product.category
                        : "General";
                  const imageSrc = Array.isArray(product.imageUrl)
                    ? product.imageUrl[0]
                    : typeof product.imageUrl === "string"
                      ? product.imageUrl
                      : product.image;

                  return (
                    <tr
                      key={String(prodId)}
                      className={`group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                        isSelected ? "bg-blue-50/40 dark:bg-blue-950/20" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(prodId)}
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        />
                      </td>

                      {/* Product Name & Details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center overflow-hidden text-lg shrink-0 group-hover:scale-105 transition-transform">
                            {imageSrc &&
                            (imageSrc.startsWith("http") ||
                              imageSrc.startsWith("/") ||
                              imageSrc.startsWith("blob:")) ? (
                              <Image
                                src={imageSrc}
                                alt={displayName}
                                width={40}
                                height={40}
                                priority={true}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              imageSrc || "📦"
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">
                              {displayName}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              SKU: {displaySku}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-xs">
                          {displayCategory}
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
                            onClick={() => handleProductDiscount(product)}
                            title="Apply discount"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all cursor-pointer"
                          >
                            <BadgePercentIcon className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => onEditProduct?.(product)}
                            title="Edit product"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(product)}
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

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        open={Boolean(productToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setProductToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to delete this product? Are you sure you want to remove{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                &ldquo;
                {productToDelete?.name ||
                  productToDelete?.productName ||
                  "this product"}
                &rdquo;
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              onClick={() => setProductToDelete(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={async (e) => {
                e.preventDefault();
                if (!productToDelete) return;
                try {
                  setIsDeleting(true);
                  const prodId = getProductId(productToDelete);
                  await onDeleteProduct?.(prodId);
                  setProducts((prev) =>
                    prev.filter((p) => getProductId(p) !== prodId)
                  );
                  setSelectedIds((prev) => prev.filter((i) => i !== prodId));
                  setProductToDelete(null);
                } finally {
                  setIsDeleting(false);
                }
              }}
              className="bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
            >
              {isDeleting ? "Deleting..." : "Delete Product"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
