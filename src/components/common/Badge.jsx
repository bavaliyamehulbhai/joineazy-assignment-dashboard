export default function Badge({ status }) {
  const styles = {
    submitted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    overdue: "bg-red-50 text-red-700 border-red-200",
  };

  const labels = {
    submitted: "Submitted",
    pending: "Pending",
    overdue: "Overdue",
  };

  const normalizedStatus = status?.toLowerCase() || "pending";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[normalizedStatus] ||
        "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {labels[normalizedStatus] || status}
    </span>
  );
}
