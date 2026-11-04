export default function Badge({ status }) {
  const styles = {
    submitted:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60",
    pending:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60",
    overdue:
      "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60",
  };

  const labels = {
    submitted: "Submitted",
    pending: "Pending",
    overdue: "Overdue",
  };

  const normalizedStatus = status?.toLowerCase() || "pending";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold select-none ${
        styles[normalizedStatus] ||
        "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
      }`}
    >
      {labels[normalizedStatus] || status}
    </span>
  );
}
