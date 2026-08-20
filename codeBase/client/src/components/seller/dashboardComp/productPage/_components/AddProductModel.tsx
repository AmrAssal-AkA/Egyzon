"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  X,
  Package,
  Upload,
  Plus,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  fetchCategories,
  addCategory,
  addProduct,
  editProduct,
  addProductToCategory,
} from "@/services/product";
import { Product, ProductFormData } from "@/types/product.type";
import { toast } from "sonner";


interface CategoryOption {
  id: string;
  name: string;
}

interface AddProductModelProps {
  onClose: () => void;
  onSave: (data?: ProductFormData) => void;
  editingProduct?: Product | null;
}

export default function AddProductModel({
  onClose,
  onSave,
  editingProduct = null,
}: AddProductModelProps) {
  const [categoryMode, setCategoryMode] = useState<"existing" | "new">(
    "existing",
  );
  const [categoriesList, setCategoriesList] = useState<CategoryOption[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Product Form State
  const [formData, setFormData] = useState({
    name: editingProduct
      ? editingProduct.name || editingProduct.productName || ""
      : "",
    description: editingProduct
      ? editingProduct.description ||
        editingProduct.productDescription ||
        ""
      : "",
    category: editingProduct ? editingProduct.category || "" : "",
    price: editingProduct ? editingProduct.price.toString() : "",
    discount: editingProduct
      ? (
          editingProduct.discount ??
          editingProduct.discountPercentage ??
          0
        ).toString()
      : "0",
    stock: editingProduct ? editingProduct.stock.toString() : "",
    status: editingProduct
      ? (editingProduct.status as Product["status"]) || "Active"
      : ("Active" as Product["status"]),
  });

  // Product Images File State
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(() => {
    if (!editingProduct) return [];
    if (Array.isArray(editingProduct.imageUrl) && editingProduct.imageUrl.length > 0) {
      return editingProduct.imageUrl;
    }
    if (typeof editingProduct.imageUrl === "string" && editingProduct.imageUrl) {
      return [editingProduct.imageUrl];
    }
    if (editingProduct.image) {
      return [editingProduct.image];
    }
    return [];
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || editingProduct.productName || "",
        description:
          editingProduct.description ||
          editingProduct.productDescription ||
          "",
        category: editingProduct.category || "",
        price: (editingProduct.price ?? "").toString(),
        discount: (
          editingProduct.discount ??
          editingProduct.discountPercentage ??
          0
        ).toString(),
        stock: (editingProduct.stock ?? "").toString(),
        status: (editingProduct.status as Product["status"]) || "Active",
      });

      const initialImgs = Array.isArray(editingProduct.imageUrl) && editingProduct.imageUrl.length > 0
        ? editingProduct.imageUrl
        : typeof editingProduct.imageUrl === "string" && editingProduct.imageUrl
          ? [editingProduct.imageUrl]
          : editingProduct.image
            ? [editingProduct.image]
            : [];
      setImagePreviews(initialImgs);
    }
  }, [editingProduct]);

  // New Category State
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState<
    string | null
  >(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [categorySuccess, setCategorySuccess] = useState<string | null>(null);

  // Overall Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch Categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const cats = await fetchCategories();
        if (Array.isArray(cats) && cats.length > 0) {
          const options: CategoryOption[] = cats
            .map((c: any) => ({
              id: String(c._id || c.id || ""),
              name: String(
                c.categoryName || c.name || (typeof c === "string" ? c : ""),
              ),
            }))
            .filter((c) => c.name.trim() !== "");

          setCategoriesList(options);

          if (options.length > 0) {
            const initialMatch = options.find(
              (c) =>
                c.name.toLowerCase() ===
                (formData.category || "").toLowerCase(),
            );
            if (initialMatch) {
              setSelectedCategoryId(initialMatch.id);
            } else if (options[0]) {
              setFormData((prev) => ({ ...prev, category: options[0].name }));
              setSelectedCategoryId(options[0].id);
            }
          }
        } else {
          setCategoriesList([]);
        }
      } catch (err) {
        console.error("Failed to fetch existing categories", err);
        setCategoriesList([]);
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, [formData.category]);

  // Handle Product Images Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setProductImages((prev) => [...prev, ...selectedFiles]);

      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const removeProductImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Category Image Change
  const handleCategoryImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewCategoryImage(file);
      setCategoryImagePreview(URL.createObjectURL(file));
    }
  };

  // Create New Category Handler
  const handleCreateCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryError(null);
    setCategorySuccess(null);

    if (
      !newCategory.name.trim() ||
      !newCategory.description.trim() ||
      !newCategoryImage
    ) {
      setCategoryError("Category name, description, and image are required.");
      return;
    }

    try {
      setIsCreatingCategory(true);
      const catFormData = new FormData();
      catFormData.append("categoryName", newCategory.name.trim());
      catFormData.append("name", newCategory.name.trim());
      catFormData.append("description", newCategory.description.trim());
      catFormData.append("image", newCategoryImage);

      const res = await addCategory(catFormData);

      const createdName = newCategory.name.trim();
      const createdId = String(
        res?.data?._id ||
          res?.data?.category?._id ||
          res?.data?.id ||
          res?._id ||
          res?.category?._id ||
          "",
      );

      const newOption: CategoryOption = {
        id: createdId,
        name: createdName,
      };

      setCategoriesList((prev) => {
        const rest = prev.filter(
          (c) =>
            createdId &&
            c.id !== createdId &&
            c.name.toLowerCase() !== createdName.toLowerCase(),
        );
        return [newOption, ...rest];
      });
      setFormData((prev) => ({ ...prev, category: createdName }));
      setSelectedCategoryId(createdId);
      setCategorySuccess(`Category "${createdName}" created and selected!`);
      setNewCategory({ name: "", description: "" });
      setNewCategoryImage(null);
      setCategoryImagePreview(null);
      setCategoryMode("existing");
    } catch (err: any) {
      console.error("Failed to create category:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        err?.error ||
        (typeof err === "string" ? err : "Failed to create category");
      setCategoryError(errorMessage);
    } finally {
      setIsCreatingCategory(false);
    }
  };

  // Product Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError("Product name is required.");
      return;
    }
    if (!formData.description.trim()) {
      setFormError("Product description is required.");
      return;
    }
    if (
      !formData.price ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      setFormError("A valid positive price is required.");
      return;
    }
    if (!formData.category || !formData.category.trim()) {
      setFormError("Category is required.");
      return;
    }
    if (
      formData.stock === "" ||
      isNaN(Number(formData.stock)) ||
      Number(formData.stock) < 0
    ) {
      setFormError("A valid non-negative stock quantity is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingProduct) {
        const prodId = editingProduct._id || editingProduct.id;
        if (!prodId) {
          setFormError("Product ID is required for editing.");
          return;
        }

        const editPayload = {
          productName: formData.name.trim(),
          productDescription: formData.description.trim(),
          price: Number(formData.price),
          discount: Number(formData.discount || 0),
          category: (formData.category || "").trim(),
          stock: Number(formData.stock),
        };

        const res = await editProduct(prodId, editPayload);
        toast.success(res?.message || "Product updated successfully");

        let activeCatId = selectedCategoryId;
        if (!activeCatId) {
          const match = categoriesList.find(
            (c) =>
              c.name.toLowerCase() === (formData.category || "").toLowerCase(),
          );
          if (match?.id) {
            activeCatId = match.id;
          }
        }

        if (activeCatId) {
          try {
            await addProductToCategory({
              categoryId: activeCatId,
              productId: String(prodId),
            });
          } catch (catErr) {
            console.warn("Category linking notice:", catErr);
          }
        }

        onSave(
          res?.data || {
            ...editingProduct,
            name: formData.name,
            productName: formData.name,
            description: formData.description,
            productDescription: formData.description,
            category: formData.category,
            price: parseFloat(formData.price) || 0,
            discount: parseFloat(formData.discount) || 0,
            stock: parseInt(formData.stock, 10) || 0,
            status: formData.status,
          },
        );
        onClose();
        return;
      }

      const dataToSend = new FormData();
      dataToSend.append("productName", formData.name.trim());
      dataToSend.append("productDescription", formData.description.trim());
      dataToSend.append("price", String(Number(formData.price)));
      dataToSend.append("discount", String(Number(formData.discount || 0)));
      dataToSend.append("category", (formData.category || "").trim());
      dataToSend.append("stock", String(Number(formData.stock)));

      if (productImages.length > 0) {
        productImages.forEach((file) => {
          dataToSend.append("image", file, file.name);
        });
      }

      const res = await addProduct(dataToSend);
      toast.success(res?.message || "Product created successfully");

      const createdProductId = String(
        res?.data?._id ||
          res?.data?.product?._id ||
          res?.data?.id ||
          res?._id ||
          res?.product?._id ||
          "",
      );

      let activeCatId = selectedCategoryId;
      if (!activeCatId) {
        const match = categoriesList.find(
          (c) =>
            c.name.toLowerCase() === (formData.category || "").toLowerCase(),
        );
        if (match?.id) {
          activeCatId = match.id;
        }
      }

      if (createdProductId && activeCatId) {
        try {
          await addProductToCategory({
            categoryId: activeCatId,
            productId: createdProductId,
          });
        } catch (catErr) {
          console.warn("Product created, but category linking notice:", catErr);
        }
      }

      onSave(
        res?.data || {
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price) || 0,
          stock: parseInt(formData.stock, 10) || 0,
          sku: "AUTO-GENERATED",
          status: formData.status,
        },
      );
      onClose();
    } catch (err: any) {
      console.error("Product submission failed:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        err?.error ||
        (typeof err === "string" ? err : "Failed to process product");
      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <p className="text-xs text-slate-500">
                Fill in details for your product catalog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto"
        >
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Wireless Headphones"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Product Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe your product specs, features..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Category Checkpoints */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Category Checkpoint *
              </label>
              {categorySuccess && (
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {categorySuccess}
                </span>
              )}
            </div>

            {/* Checkpoint Mode Selector */}
            <div className="grid grid-cols-2 gap-2 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setCategoryMode("existing")}
                className={`py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  categoryMode === "existing"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                Existing Category
              </button>
              <button
                type="button"
                onClick={() => setCategoryMode("new")}
                className={`py-1.5 px-3 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  categoryMode === "new"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                Create New Category
              </button>
            </div>

            {/* Existing Category Select */}
            {categoryMode === "existing" ? (
              <div>
                <select
                  value={formData.category}
                  required
                  onChange={(e) => {
                    const selectedName = e.target.value;
                    const selectedOption = categoriesList.find(
                      (c) => c.name === selectedName,
                    );
                    setFormData({ ...formData, category: selectedName });
                    setSelectedCategoryId(selectedOption?.id || "");
                  }}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                >
                  {isLoadingCategories ? (
                    <option value="" disabled>
                      Loading categories...
                    </option>
                  ) : categoriesList.length === 0 ? (
                    <option value="" disabled>
                      No categories found. Click &quot;Create New Category&quot;
                      above.
                    </option>
                  ) : (
                    <>
                      <option value="" disabled>
                        Select a category *
                      </option>
                      {categoriesList.map((cat, idx) => (
                        <option key={cat.id || idx} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            ) : (
              /* Inline Category Creation Sub-Form */
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-2.5">
                {categoryError && (
                  <p className="text-[11px] text-rose-500 font-medium">
                    {categoryError}
                  </p>
                )}
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                    New Category Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Smart Wearables"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Category Description *
                  </label>
                  <input
                    type="text"
                    placeholder="Brief summary of category items..."
                    value={newCategory.description}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Category Image *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCategoryImageChange}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    {categoryImagePreview && (
                      <Image
                        src={categoryImagePreview}
                        alt="Cat Preview"
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded object-cover border border-slate-200"
                      />
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCreateCategorySubmit}
                  disabled={isCreatingCategory}
                  className="mt-1 w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isCreatingCategory ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {isCreatingCategory
                      ? "Creating Category..."
                      : "Add & Select Category"}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Price (EGP) *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="250"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Stock *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="10"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* SKU Field - Disabled & Server Auto-Generated */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
              <span>SKU Code</span>
              <span className="text-[10px] text-slate-400 font-normal">
                Auto-generated by server
              </span>
            </label>
            <input
              type="text"
              disabled
              value={
                editingProduct
                  ? editingProduct.sku ||
                    (editingProduct.id || editingProduct._id
                      ? `SKU-${String(editingProduct.id || editingProduct._id).slice(-6)}`
                      : "Auto-generated by server")
                  : "Auto-generated by server"
              }
              className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-500 dark:text-slate-400 font-mono cursor-not-allowed select-none"
            />
          </div>

          {/* Product Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Product Images
            </label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 transition-all cursor-pointer relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-5 h-5 text-slate-400" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Click or drag & drop product images
              </p>
              <p className="text-[10px] text-slate-400">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="flex items-center gap-2 mt-2 overflow-x-auto py-1">
                {imagePreviews.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 group"
                  >
                    <Image
                      src={src}
                      width={48}
                      height={48}
                      alt={`Upload ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeProductImage(i)}
                      className="absolute inset-0 bg-slate-900/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Footer Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{editingProduct ? "Save Changes" : "Add Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
