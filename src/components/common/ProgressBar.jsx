export default function ProgressBar({ progress = 0, label = "" }) {
  const safeProgress = Math.min(100, Math.max(0, progress));
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
          <span>{label}</span>
          <span>{safeProgress}%</span>
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}

