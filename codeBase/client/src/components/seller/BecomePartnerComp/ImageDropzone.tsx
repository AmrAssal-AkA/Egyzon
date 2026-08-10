"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { UploadCloud, X, FileImage, AlertCircle, CheckCircle2 } from "lucide-react";
import { ImageDropzoneProps } from "@/types/seller";

export default function ImageDropzone({
  id,
  label,
  description = "SVG, PNG, JPG or WEBP (max. 5MB)",
  file,
  onFileSelect,
  accept = "image/jpeg,image/png,image/webp,image/jpg,application/pdf",
  maxSizeMB = 5,
  error,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      } else {
        setPreviewUrl(null);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleFileValidation = (selectedFile: File): boolean => {
    setLocalError(null);
    const sizeInMB = selectedFile.size / (1024 * 1024);

    if (sizeInMB > maxSizeMB) {
      setLocalError(`File size exceeds ${maxSizeMB}MB limit`);
      return false;
    }

    if (accept) {
      const allowedTypes = accept.split(",").map((t) => t.trim());
      const isAllowed = allowedTypes.some((type) => {
        if (type.endsWith("/*")) {
          return selectedFile.type.startsWith(type.replace("/*", ""));
        }
        return selectedFile.type === type;
      });

      if (!isAllowed) {
        setLocalError("Unsupported file format");
        return false;
      }
    }

    return true;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (handleFileValidation(droppedFile)) {
        onFileSelect(droppedFile);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (handleFileValidation(selectedFile)) {
        onFileSelect(selectedFile);
      }
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    setLocalError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const activeError = error || localError;

  return (
    <div className="w-full flex flex-col space-y-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-foreground flex items-center justify-between"
      >
        <span>{label} <span className="text-red-500">*</span></span>
        {file && (
          <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Attached
          </span>
        )}
      </label>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full rounded-xl border-2 border-dashed p-4 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center min-h-35 ${
          isDragging
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-[1.01]"
            : file
            ? "border-green-500/50 bg-green-50/30 dark:bg-green-950/10"
            : activeError
            ? "border-red-500/60 bg-red-50/30 dark:bg-red-950/10"
            : "border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 hover:border-blue-400 hover:bg-slate-100/50 dark:hover:bg-slate-850"
        }`}
      >
        {file ? (
          <div className="w-full flex items-center justify-between gap-4 p-1">
            <div className="flex items-center gap-3 min-w-0">
              {previewUrl ? (
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-border shrink-0 bg-background">
                  <Image
                    src={previewUrl}
                    alt={file.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <FileImage className="w-6 h-6" />
                </div>
              )}
              <div className="flex flex-col text-left min-w-0">
                <p className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-[260px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove document"
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
            <div className={`p-3 rounded-full ${
              isDragging
                ? "bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 animate-bounce"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            }`}>
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                <span className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Click to upload
                </span>{" "}
                or drag & drop
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
          </div>
        )}
      </div>

      {activeError && (
        <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-0.5">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{activeError}</span>
        </div>
      )}
    </div>
  );
}
