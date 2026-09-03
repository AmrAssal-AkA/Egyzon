import { User } from "../../../types/user";

export function UserAvatar({ user }: { user: User }): React.ReactElement {
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