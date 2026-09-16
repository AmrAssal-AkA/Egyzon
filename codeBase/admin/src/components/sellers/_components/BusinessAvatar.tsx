



const avatarColors = [
  "bg-amber-100 text-amber-800 border-amber-200",
  "bg-sky-100 text-sky-800 border-sky-200",
  "bg-emerald-100 text-emerald-800 border-emerald-200",
  "bg-violet-100 text-violet-800 border-violet-200",
];



export function BusinessAvatar({ name }: { name: string }): React.ReactElement {
  const safeName = (name || "").trim() || "Egyzon";
  const initials = safeName
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join("")
    .slice(0, 2) 
    .toUpperCase();

  const colorIndex =
    safeName.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    avatarColors.length;

  return (
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[colorIndex]}`}
      aria-hidden="true"
    >
      {initials || "SE"}
    </div>
  );
}