export default function ProgressBar({
  percentage = 0,
  showLabel = true,
  height = "h-2",
}) {
  const safePercentage = Math.min(100, Math.max(0, percentage));
  const isComplete = safePercentage === 100;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-xs tracking-tight">
          <span className="font-medium text-neutral-500 dark:text-neutral-400">
            Completion
          </span>
          <span
            className={`font-semibold tabular-nums text-[11px] px-1.5 py-0.5 rounded-md ${
              isComplete
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                : "text-neutral-700 dark:text-neutral-300 bg-black/[0.04] dark:bg-white/[0.08]"
            }`}
          >
            {safePercentage}%
          </span>
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.1] ${height}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete
              ? "bg-emerald-500"
              : "bg-[#0071e3]"
          }`}
          style={{
            width: `${safePercentage}%`,
          }}
        />
      </div>
    </div>
  );
}
