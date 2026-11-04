export default function ProgressBar({ percentage = 0 }) {
  const safePercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600 dark:text-slate-400">Completion</span>
        <span className="font-semibold text-slate-900 dark:text-white">{safePercentage}%</span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-slate-900 dark:bg-indigo-500 transition-all duration-500 ease-out"
          style={{
            width: `${safePercentage}%`,
          }}
        />
      </div>
    </div>
  );
}
