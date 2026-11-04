import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No assignments found",
  description = "There is nothing to display matching your criteria.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-xl p-8 sm:p-10 text-center transition-colors">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] text-neutral-400 dark:text-neutral-500">
        <Inbox className="h-5 w-5" strokeWidth={1.75} />
      </div>

      <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white tracking-tight">
        {title}
      </h3>

      <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#0071e3] hover:bg-[#0077ed] px-3.5 py-2 text-xs font-medium text-white cursor-pointer shadow-xs transition active:scale-[0.98]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
