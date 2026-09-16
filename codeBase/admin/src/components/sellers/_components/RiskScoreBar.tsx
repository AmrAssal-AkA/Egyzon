

export function RiskScoreBar({ score }: { score: number }): React.ReactElement {
  const barColor =
    score >= 80
      ? "bg-emerald-500"
      : score >= 50
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="flex items-center gap-3 min-w-[120px]">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-900 tabular-nums w-6 text-right">
        {score}
      </span>
    </div>
  );
}