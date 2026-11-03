export default function StudentStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="text-slate-500 text-xs">Total</div>
        <div className="text-2xl font-bold text-slate-800">{stats?.total || 0}</div>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="text-slate-500 text-xs">Submitted</div>
        <div className="text-2xl font-bold text-emerald-600">{stats?.submitted || 0}</div>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="text-slate-500 text-xs">Pending</div>
        <div className="text-2xl font-bold text-amber-600">{stats?.pending || 0}</div>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="text-slate-500 text-xs">Progress</div>
        <div className="text-2xl font-bold text-indigo-600">{stats?.progress || 0}%</div>
      </div>
    </div>
  );
}

