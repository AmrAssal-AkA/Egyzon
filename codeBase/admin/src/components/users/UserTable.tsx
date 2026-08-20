import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BadgeCheck,
  Ban,
  Eye,
  MoreHorizontal,
  Trash2,
  UserCheck,
  UserCog,
} from "lucide-react";

import { User, UserRole, UserStatus } from "../../types/user";

export type UserRowAction = "view" | "changeRole" | "toggleStatus" | "delete";

interface UserTableProps {
  users: User[];
  selectedIds: Set<string>;
  onToggleUser: (id: string) => void;
  onToggleAll: () => void;
  allSelected: boolean;
  someSelected: boolean;
  onUserAction?: (action: UserRowAction, user: User) => void;
}

interface MenuItem {
  id: UserRowAction;
  label: string;
  icon: React.ReactElement;
  variant?: "default" | "danger";
}

function UserRowActionsMenu({
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

const roleStyles: Record<UserRole, string> = {
  seller: "bg-blue-50 text-blue-700 border-blue-100",
  customer: "bg-gray-100 text-gray-600 border-gray-200",
  admin: "bg-stone-800 text-stone-100 border-stone-700",
};

const roleLabels: Record<UserRole, string> = {
  seller: "Seller",
  customer: "Customer",
  admin: "Admin",
};

function UserAvatar({ user }: { user: User }): React.ReactElement {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const fallbackColors = [
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-violet-100 text-violet-700",
    "bg-amber-100 text-amber-700",
    "bg-stone-800 text-stone-100",
  ];

  const colorIndex =
    user.name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    fallbackColors.length;

  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt=""
        className="w-9 h-9 rounded-full object-cover border border-gray-200"
      />
    );
  }

  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border border-transparent ${fallbackColors[colorIndex]}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function UserRoleBadge({ role }: { role: UserRole }): React.ReactElement {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${roleStyles[role]}`}
    >
      {roleLabels[role]}
    </span>
  );
}

function UserStatusIndicator({
  status,
}: {
  status: UserStatus;
}): React.ReactElement {
  const isActive = status === "active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm ${
        isActive ? "text-gray-700" : "text-red-600 font-medium"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-red-500"
        }`}
        aria-hidden="true"
      />
      {isActive ? "Active" : "Suspended"}
    </span>
  );
}

export default function UserTable({
  users,
  selectedIds,
  onToggleUser,
  onToggleAll,
  allSelected,
  someSelected,
  onUserAction,
}: UserTableProps): React.ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 pl-5 pr-3 w-10">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = someSelected && !allSelected;
                  }
                }}
                onChange={onToggleAll}
                aria-label="Select all users"
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400"
              />
            </th>
            <th className="py-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              User
            </th>
            <th className="py-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Role
            </th>
            <th className="py-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Status
            </th>
            <th className="py-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Joined Date
            </th>
            <th className="py-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Last Activity
            </th>
            <th className="py-3 pr-5 pl-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const isSelected = selectedIds.has(user.id);
            const isSuspended = user.status === "suspended";

            return (
              <tr
                key={user.id}
                className={`border-b border-gray-50 transition-colors ${
                  isSuspended ? "bg-red-50/40" : "hover:bg-gray-50/70"
                }`}
              >
                <td className="py-4 pl-5 pr-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleUser(user.id)}
                    aria-label={`Select ${user.name}`}
                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400"
                  />
                </td>

                <td className="py-4 px-3">
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <UserAvatar user={user} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {user.name}
                        </span>
                        {user.verified && (
                          <BadgeCheck
                            className="w-4 h-4 text-blue-500 shrink-0"
                            aria-label="Verified account"
                          />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-3">
                  <UserRoleBadge role={user.role} />
                </td>

                <td className="py-4 px-3">
                  <UserStatusIndicator status={user.status} />
                </td>

                <td className="py-4 px-3 text-sm text-gray-500 whitespace-nowrap">
                  {user.joinedDate}
                </td>

                <td className="py-4 px-3 whitespace-nowrap">
                  {user.lastActivity === "Just now" ? (
                    <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                      <span
                        className="w-2 h-2 rounded-full bg-emerald-500"
                        aria-hidden="true"
                      />
                      Just now
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">
                      {user.lastActivity}
                    </span>
                  )}
                </td>

                <td className="py-4 pr-5 pl-3 text-right">
                  <UserRowActionsMenu user={user} onUserAction={onUserAction} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
