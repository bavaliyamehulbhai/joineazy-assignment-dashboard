import { Check } from "lucide-react";

export default function Badge({ status }) {
  const normalizedStatus = status?.toLowerCase() || "pending";

  const styles = {
    submitted: {
      pill: "bg-emerald-500/10 dark:bg-emerald-400/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
      dot: "bg-emerald-500",
      icon: true,
      label: "Submitted",
    },
    pending: {
      pill: "bg-amber-500/10 dark:bg-amber-400/15 text-amber-700 dark:text-amber-300 border-amber-500/25",
      dot: "bg-amber-500",
      icon: false,
      label: "Pending",
    },
    overdue: {
      pill: "bg-rose-500/10 dark:bg-rose-400/15 text-rose-700 dark:text-rose-300 border-rose-500/25",
      dot: "bg-rose-500 animate-pulse",
      icon: false,
      label: "Overdue",
    },
  };

  const current = styles[normalizedStatus] || {
    pill: "bg-black/[0.05] dark:bg-white/[0.08] text-neutral-700 dark:text-neutral-300 border-black/[0.08] dark:border-white/[0.1]",
    dot: "bg-neutral-400",
    icon: false,
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-tight select-none backdrop-blur-md transition-colors ${current.pill}`}
    >
      {current.icon ? (
        <Check className="h-3 w-3 stroke-[2.5]" />
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />
      )}
      <span>{current.label}</span>
    </span>
  );
}
