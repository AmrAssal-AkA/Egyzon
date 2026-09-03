import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Ban,
  Eye,
  MoreHorizontal,
  Trash2,
  UserCheck,
  UserCog,
} from "lucide-react";

import {User} from "../../../types/user"
import { UserRowAction } from "../UserTable";

interface MenuItem {
  id: UserRowAction;
  label: string;
  icon: React.ReactElement;
  variant?: "default" | "danger";
}


export function UserRowActionsMenu({
  user,
  onUserAction,
}: {
  user: User;
  onUserAction?: (action: UserRowAction, user: User) => void;
}): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const isSuspended = user.status === "suspended";

  const menuItems: MenuItem[] = [
    {
      id: "view",
      label: "View Profile",
      icon: <Eye className="w-4 h-4" aria-hidden="true" />,
    },
    {
      id: "changeRole",
      label: "Change Role",
      icon: <UserCog className="w-4 h-4" aria-hidden="true" />,
    },
    {
      id: "toggleStatus",
      label: isSuspended ? "Activate User" : "Block User",
      icon: isSuspended ? (
        <UserCheck className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Ban className="w-4 h-4" aria-hidden="true" />
      ),
      variant: isSuspended ? "default" : "danger",
    },
    {
      id: "delete",
      label: "Delete User",
      icon: <Trash2 className="w-4 h-4" aria-hidden="true" />,
      variant: "danger",
    },
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

  const handleAction = (action: UserRowAction): void => {
    onUserAction?.(action, user);
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Actions for ${user.name}`}
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
            aria-label={`Actions for ${user.name}`}
            style={{ top: menuPosition.top, left: menuPosition.left }}
            className="fixed z-50 min-w-[180px] rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg shadow-gray-200/60"
          >
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {index === menuItems.length - 1 && (
                  <div
                    className="my-1.5 border-t border-gray-100"
                    role="separator"
                  />
                )}
                <button
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
              </React.Fragment>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
