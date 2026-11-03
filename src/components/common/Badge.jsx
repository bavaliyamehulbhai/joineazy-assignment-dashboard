export default function Badge({ status }) {
  const styles = {
    submitted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    overdue: "bg-rose-50 text-rose-700 border-rose-200",
  };
  const labels = {
    submitted: "Submitted",
    pending: "Pending",
    overdue: "Overdue",
  };

  const key = status?.toLowerCase() || "pending";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[key] || "bg-slate-100 text-slate-700 border-slate-200"
      }`}
    >
      {labels[key] || status}
    </span>
  );
}

