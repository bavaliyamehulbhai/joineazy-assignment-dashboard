export default function ProgressBar({ percentage = 0 }) {
  const safePercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">Progress</span>
        <span className="font-semibold text-slate-900">{safePercentage}%</span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-500 ease-out"
          style={{
            width: `${safePercentage}%`,
          }}
        />
      </div>
    </div>
  );
}
