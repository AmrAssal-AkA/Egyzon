import { UserRole } from "../../../types/user";


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

export function UserRoleBadge({ role }: { role: UserRole }): React.ReactElement {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${roleStyles[role]}`}
    >
      {roleLabels[role]}
    </span>
  );
}