import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import UserTable, { UserRowAction } from "../../components/users/UserTable";
import { useAlert } from "../../hooks/useAlert";
import { useUsers } from "../../hooks/useUsers";
import SelectModel from "../../components/users/selectModel";
import { activateUser, blockUser } from "../../services/user.services";
import { User, UserRole, UserTab } from "../../types/user";

const PAGE_SIZE = 10;

const TABS: { id: UserTab; label: string }[] = [
  { id: "all", label: "All Users" },
  { id: "customer", label: "Customers" },
  { id: "seller", label: "Sellers" },
  { id: "admin", label: "Admins" },
];

function filterUsers(
  users: User[],
  query: string,
  role: UserRole | "all",
  tab: UserTab
): User[] {
  const normalizedQuery = query.trim().toLowerCase();

  return users.filter((user) => {
    const matchesTab = tab === "all" || user.role === tab;
    const matchesRole = role === "all" || user.role === role;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      user.name.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery) ||
      user.id.toLowerCase().includes(normalizedQuery);

    return matchesTab && matchesRole && matchesQuery;
  });
}

function UsersPage(): React.ReactElement {
  const { users, isLoading, error, refresh } = useUsers();
  const { showError, showSuccess } = useAlert();
  const [activeTab, setActiveTab] = useState<UserTab>("all");
  const [statusActionUserId, setStatusActionUserId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredUsers = useMemo(
    () => filterUsers(users, query, roleFilter, activeTab),
    [users, query, roleFilter, activeTab]
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  const pageStart =
    filteredUsers.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, filteredUsers.length);

  const allPageSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((user) => selectedIds.has(user.id));

  const somePageSelected =
    paginatedUsers.some((user) => selectedIds.has(user.id)) && !allPageSelected;

  const handleTabChange = (tab: UserTab): void => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleQueryChange = (value: string): void => {
    setQuery(value);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleRoleFilterChange = (value: UserRole | "all"): void => {
    setRoleFilter(value);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleToggleUser = (id: string): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleAll = (): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const shouldSelectAll = !allPageSelected;

      paginatedUsers.forEach((user) => {
        if (shouldSelectAll) {
          next.add(user.id);
        } else {
          next.delete(user.id);
        }
      });

      return next;
    });
  };

  const paginationItems = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleUserAction = async (
    action: UserRowAction,
    user: User
  ): Promise<void> => {
    if (action !== "toggleStatus") {
      return;
    }

    if (statusActionUserId) {
      return;
    }

    setStatusActionUserId(user.id);

    try {
      const isSuspended = user.status === "suspended";
      const response = isSuspended
        ? await activateUser(user.id)
        : await blockUser(user.id);

      if (!response.success) {
        showError(
          response.message ||
            (isSuspended ? "Failed to activate user." : "Failed to block user.")
        );
        return;
      }

      await refresh();
      showSuccess(
        isSuspended
          ? `${user.name} has been activated successfully.`
          : `${user.name} has been blocked successfully.`
      );
    } catch {
      showError(
        user.status === "suspended"
          ? "Something went wrong while activating the user."
          : "Something went wrong while blocking the user."
      );
    } finally {
      setStatusActionUserId(null);
    }
  };

  const userActions = [
    {
      label: "Suspend",
      onClick: () => alert(`Suspending ${selectedIds.size} users`),
      variant: "danger" as const,
    },
    {
      label: "Change Role",
      onClick: () => alert(`Changing role for ${selectedIds.size} users`),
      variant: "secondary" as const,
    },
  ];
  if (isLoading) {
    return (
      <main className="p-6 bg-gray-50/80 min-h-full">
        <div className="flex items-center justify-center py-24 text-sm text-gray-500">
          Loading users...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 bg-gray-50/80 min-h-full">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm font-medium text-red-600">Failed to load users</p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-50/80 min-h-full">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
            Command Center
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
            User Management
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:min-w-[320px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Query name, email, ID..."
              aria-label="Search users"
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <select
              value={roleFilter}
              onChange={(event) =>
                handleRoleFilterChange(event.target.value as UserRole | "all")
              }
              aria-label="Filter by role"
              className="appearance-none w-full sm:w-auto pl-10 pr-10 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
            >
              <option value="all">Role: All</option>
              <option value="customer">Role: Customer</option>
              <option value="seller">Role: Seller</option>
              <option value="admin">Role: Admin</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav
          className="flex items-center gap-6 overflow-x-auto"
          aria-label="User categories"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`pb-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <section className="bg-white border border-gray-200/80 shadow-sm rounded-xl overflow-hidden">
        {paginatedUsers.length > 0 ? (
          <UserTable
            users={paginatedUsers}
            selectedIds={selectedIds}
            onToggleUser={handleToggleUser}
            onToggleAll={handleToggleAll}
            allSelected={allPageSelected}
            someSelected={somePageSelected}
            onUserAction={handleUserAction}
          />
        ) : (
          <div className="py-16 px-6 text-center">
            <p className="text-sm font-medium text-gray-700">No users found</p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4 border-t border-gray-100 bg-gray-50/40">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">{pageStart}</span> to{" "}
            <span className="font-semibold text-gray-800">{pageEnd}</span> of{" "}
            <span className="font-semibold text-gray-800">
              {filteredUsers.length.toLocaleString()}
            </span>{" "}
            entries
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-white hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {paginationItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 text-sm text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCurrentPage(Number(item))}
                  aria-label={`Page ${item}`}
                  aria-current={currentPage === item ? "page" : undefined}
                  className={`min-w-8 h-8 px-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-white"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-white hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <SelectModel
        selectedCount={selectedIds.size}
        onClear={handleClearSelection}
        actions={userActions}
      />
    </main>
  );
}

export default UsersPage;
