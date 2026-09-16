import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ban, Clock, Eye, MoreHorizontal, ShieldCheck } from "lucide-react";

import type { Seller } from "../../../types/seller";
import { createPortal } from "react-dom";
import { SellerRowAction } from "../SellerTable";


interface MenuItem {
  id: SellerRowAction;
  label: string;
  icon: React.ReactElement;
  variant?: "default" | "danger";
}


export function SellerRowActionsMenu({
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
        aria-label={`Actions for ${seller.storeName || "—"}`}
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
            aria-label={`Actions for ${seller.storeName}`}
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
