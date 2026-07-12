interface SeeAllButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

export default function SeeAllButton({
  isExpanded,
  onClick,
}: SeeAllButtonProps) {
  return (
    <button
      className="text-black dark:text-white cursor-pointer hover:underline whitespace-nowrap ml-4"
      onClick={onClick}
    >
      {isExpanded ? "Show Less" : "See All"}
    </button>
  );
}
