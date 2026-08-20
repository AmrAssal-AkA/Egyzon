import React from "react";
import { X } from "lucide-react";

interface Action {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
}

interface SelectModelProps {
  selectedCount: number;
  onClear: () => void;
  actions: Action[];
}

function SelectModel({ selectedCount, onClear, actions }: SelectModelProps) {
  if (selectedCount === 0) {
    return null;
  }

  const getButtonClasses = (variant: Action["variant"]) => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 text-white hover:bg-blue-700";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700";
      case "secondary":
      default:
        return "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";
    }
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md"
      role="toolbar"
      aria-label="Bulk actions"
    >
      <div className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl shadow-lg p-3 mx-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
            {selectedCount}
          </span>
          <span className="text-sm font-medium text-gray-800">
            {selectedCount} user{selectedCount > 1 ? "s" : ""} selected
          </span>
        </div>
        <div className="flex items-center gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${getButtonClasses(
                action.variant,
              )}`}
            >
              {action.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear selection"
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectModel;
