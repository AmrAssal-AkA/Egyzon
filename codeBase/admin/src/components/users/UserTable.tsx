import React from "react";

import { BadgeCheck } from "lucide-react";

import { User } from "../../types/user";
/* Components Of the page */
import { UserAvatar } from "./_components/userAvatacCompoent";
import { UserRowActionsMenu } from "./_components/userRowActionMenu";
import { UserRoleBadge } from "./_components/userRoleBadge";
import { UserStatusIndicator } from "./_components/userStatusIndicator";

/* Table context */
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

/* The Main Component user Table */
function UserTable({
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

export default UserTable;