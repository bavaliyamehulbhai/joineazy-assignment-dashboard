export default function EmptyState({ title = "No items found", description = "Get started by adding new items." }) {
  return (
    <div className="text-center py-12 px-4 bg-white rounded-xl border border-dashed border-slate-300">
      <div className="text-4xl mb-3">📭</div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="text-slate-500 text-sm mt-1">{description}</p>
    </div>
  );
}

