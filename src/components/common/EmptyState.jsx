export default function EmptyState({
  title = "No assignments found",
  description = "Try changing your search or status filter.",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="text-4xl mb-3">🔍</div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
}
