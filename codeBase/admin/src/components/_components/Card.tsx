import React from "react";
import { CardProps, CardAction } from "../../types/card";

export type { CardProps, CardAction };

export const Card: React.FC<CardProps> = ({
  title,
  description,
  value,
  imageSrc,
  icon,
  badges,
  actions,
  secondaryAction,
  variant = "default",
  onClick,
  className = "",
  styleOverrides,
  progress,
}) => {
  const isInteractive = Boolean(onClick);

  // Variant styling mapping
  const variantStyles = {
    default: "bg-white border border-gray-200/80 shadow-sm rounded-xl p-5",
    compact: "bg-white border border-gray-200 shadow-xs rounded-lg p-3.5",
    elevated:
      "bg-white border border-gray-100 shadow-md rounded-xl p-6 hover:shadow-lg",
  };

  const interactiveStyles = isInteractive
    ? "cursor-pointer transition-all duration-200 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    : "";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isInteractive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.();
    }
  };

  const renderBadge = (badge: string, index: number) => {
    const isPositive =
      badge.startsWith("+") ||
      badge.toLowerCase().includes("active") ||
      badge.toLowerCase().includes("success");
    const isNegative =
      badge.startsWith("-") ||
      badge.toLowerCase().includes("urgent") ||
      badge.toLowerCase().includes("failed");
    const isWarning =
      badge.toLowerCase().includes("pending") ||
      badge.toLowerCase().includes("review");

    let badgeColorClass = "bg-gray-100 text-gray-700 border-gray-200";
    if (isPositive) {
      badgeColorClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
    } else if (isNegative) {
      badgeColorClass = "bg-rose-50 text-rose-700 border-rose-200";
    } else if (isWarning) {
      badgeColorClass = "bg-amber-50 text-amber-700 border-amber-200";
    }

    return (
      <span
        key={index}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeColorClass}`}
      >
        {badge}
      </span>
    );
  };

  const renderActionButton = (action: CardAction, isSecondary = false) => {
    const actionVariant =
      action.variant || (isSecondary ? "outline" : "primary");

    const baseClasses =
      "inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
      outline:
        "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500",
      ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-400",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
      <button
        key={action.label}
        type="button"
        disabled={action.disabled}
        onClick={(e) => {
          e.stopPropagation();
          action.onClick();
        }}
        className={`${baseClasses} ${variantClasses[actionVariant]}`}
      >
        {action.label}
      </button>
    );
  };

  return (
    <div
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={styleOverrides}
      className={`relative flex flex-col justify-between overflow-hidden text-gray-900 ${variantStyles[variant]} ${interactiveStyles} ${className}`}
    >
      {/* Header section: Title, Image / Icon & Badges */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-gray-600 truncate ${
              variant === "compact" ? "text-xs" : "text-sm"
            }`}
          >
            {title}
          </h3>
          {description && (
            <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Visual Graphic (Icon or Image) */}
        {(icon || imageSrc) && (
          <div className="flex items-center justify-center shrink-0">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                className="w-10 h-10 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/80 flex items-center justify-center">
                {icon}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      {value !== undefined && (
        <div className="mt-3 flex items-baseline justify-between gap-2 flex-wrap">
          <div
            className={`font-bold tracking-tight text-gray-900 ${
              variant === "compact" ? "text-xl" : "text-2xl"
            }`}
          >
            {value}
          </div>

          {badges && badges.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {badges.map((badge, idx) => renderBadge(badge, idx))}
            </div>
          )}
        </div>
      )}

      {/* Badges fallback if value is not present */}
      {value === undefined && badges && badges.length > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {badges.map((badge, idx) => renderBadge(badge, idx))}
        </div>
      )}

      {/* Progress Indicator if provided */}
      {typeof progress === "number" && (
        <div className="mt-4 w-full">
          <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-1.5">
            <span>Progress</span>
            <span className="font-semibold text-gray-700">
              {Math.min(100, Math.max(0, progress))}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}

      {/* Actions & Secondary Action */}
      {(actions?.length || secondaryAction) && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end gap-2 flex-wrap">
          {secondaryAction && renderActionButton(secondaryAction, true)}
          {actions?.map((action) => renderActionButton(action, false))}
        </div>
      )}
    </div>
  );
};

export default Card;
