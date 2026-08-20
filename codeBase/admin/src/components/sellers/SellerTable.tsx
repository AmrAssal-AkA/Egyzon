import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Clock,
  Eye,
  MoreHorizontal,
  ShieldCheck,
  Ban,
  PauseCircle,
} from "lucide-react";

import { Seller, SellerStatus } from "../../types/seller";

export type SellerRowAction = "view" | "approve" | "reject" | "requestDocs";

interface SellerTableProps {
  sellers: Seller[];
  onSellerAction?: (action: SellerRowAction, seller: Seller) => void;
}

interface MenuItem {
  id: SellerRowAction;
  label: string;
  icon: React.ReactElement;
  variant?: "default" | "danger";
}

const avatarColors = [
  "bg-amber-100 text-amber-800",
  "bg-sky-100 text-sky-800",
  "bg-gray-200 text-gray-700",
  "bg-emerald-100 text-emerald-800",
  "bg-violet-100 text-violet-800",
];

function BusinessAvatar({ name }: { name: string }): React.ReactElement {
  const initials = name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colorIndex =
    name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    avatarColors.length;

  return (
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[colorIndex]}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function RiskScoreBar({ score }: { score: number }): React.ReactElement {
  const barColor =
    score >= 80
      ? "bg-emerald-500"
      : score >= 50
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="flex items-center gap-3 min-w-[120px]">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-900 tabular-nums w-6 text-right">
        {score}
      </span>
    </div>
  );
}

const statusConfig: Record<
  SellerStatus,
  { label: string; className: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pending: {
    label: "Pending",
    className: "bg-orange-50 text-orange-600 border-orange-100",
    icon: Clock,
  },
  under_review: {
    label: "Under Review",
    className: "bg-blue-50 text-blue-600 border-blue-100",
    icon: Eye,
  },
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
    icon: ShieldCheck,
  },
  suspended: {
    label: "Suspended",
    className: "bg-amber-50 text-amber-700 border-amber-100",
    icon: PauseCircle,
  },
  banned: {
    label: "Banned",
    className: "bg-red-50 text-red-600 border-red-100",
    icon: Ban,
  },
};

function SellerStatusBadge({ status }: { status: SellerStatus }): React.ReactElement {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      {config.label}
    </span>
  );
}

function SellerRowActionsMenu({
  seller,
  onSellerAction,
}: {
  seller: Seller;
  onSellerAction?: (action: SellerRowAction, seller: Seller) => void;
}): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const menuItems: MenuItem[] = [
    {
      id: "view",
      label: "View Application",
      icon: <Eye className="w-4 h-4" aria-hidden="true" />,
    },
    ...(seller.status !== "active"
      ? [
          {
            id: "approve" as SellerRowAction,
            label: "Approve Seller",
            icon: <ShieldCheck className="w-4 h-4" aria-hidden="true" />,
          },
        ]
      : []),
    ...(seller.status === "pending" || seller.status === "under_review"
      ? [
          {
            id: "requestDocs" as SellerRowAction,
            label: "Request Documents",
            icon: <Clock className="w-4 h-4" aria-hidden="true" />,
          },
        ]
      : []),
    ...(seller.status !== "banned"
      ? [
          {
            id: "reject" as SellerRowAction,
            label: "Reject Application",
            icon: <Ban className="w-4 h-4" aria-hidden="true" />,
            variant: "danger" as const,
          },
        ]
      : []),
  ];

  const updateMenuPosition = (): void => {
    if (!triggerRef.current || !menuRef.current) {
      return;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportPadding = 8;

    let top = triggerRect.bottom + 6;
    let left = triggerRect.right - menuRect.width;

    if (left < viewportPadding) {
      left = viewportPadding;
    }

    if (left + menuRect.width > window.innerWidth - viewportPadding) {
      left = window.innerWidth - menuRect.width - viewportPadding;
    }

    if (top + menuRect.height > window.innerHeight - viewportPadding) {
      top = triggerRect.top - menuRect.height - 6;
    }

    setMenuPosition({ top, left });
  };

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    updateMenuPosition();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleReposition = (): void => {
      updateMenuPosition();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [isOpen]);

  const handleAction = (action: SellerRowAction): void => {
    onSellerAction?.(action, seller);
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Actions for ${seller.businessName}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 ${
          isOpen
            ? "bg-gray-100 text-gray-700"
            : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        }`}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label={`Actions for ${seller.businessName}`}
            style={{ top: menuPosition.top, left: menuPosition.left }}
            className="fixed z-50 min-w-[180px] rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg shadow-gray-200/60"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                onClick={() => handleAction(item.id)}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                  item.variant === "danger"
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span
                  className={
                    item.variant === "danger" ? "text-red-500" : "text-gray-400"
                  }
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export default function SellerTable({
  sellers,
  onSellerAction,
}: SellerTableProps): React.ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-100">
            <th className="py-3.5 pl-6 pr-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Business Entity
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Principal / Owner
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Submitted
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Risk Score
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Status
            </th>
            <th className="py-3.5 pr-6 pl-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {sellers.map((seller) => (
            <tr
              key={seller.id}
              className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
            >
              <td className="py-4 pl-6 pr-3">
                <div className="flex items-center gap-3 min-w-[240px]">
                  <BusinessAvatar name={seller.businessName} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {seller.businessName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ID: {seller.businessId}
                    </p>
                  </div>
                </div>
              </td>

              <td className="py-4 px-3">
                <div className="min-w-[180px]">
                  <p className="text-sm text-gray-900">{seller.ownerName}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {seller.ownerEmail}
                  </p>
                </div>
              </td>

              <td className="py-4 px-3 whitespace-nowrap">
                <p className="text-sm text-gray-900">{seller.submittedAt}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {seller.submittedRelative}
                </p>
              </td>

              <td className="py-4 px-3">
                <RiskScoreBar score={seller.riskScore} />
              </td>

              <td className="py-4 px-3">
                <SellerStatusBadge status={seller.status} />
              </td>

              <td className="py-4 pr-6 pl-3 text-right">
                <SellerRowActionsMenu
                  seller={seller}
                  onSellerAction={onSellerAction}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
