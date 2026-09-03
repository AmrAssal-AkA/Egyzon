import React from "react";

import { UserStatus } from "../../../types/user";

export function UserStatusIndicator({
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
