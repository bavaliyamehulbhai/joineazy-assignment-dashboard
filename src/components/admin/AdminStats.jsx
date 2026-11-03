export default function AdminStats({ totalAssignments = 0, totalStudents = 0, totalSubmissions = 0, completionRate = 0 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="text-slate-500 text-xs">Total Assignments</div>
        <div className="text-2xl font-bold text-slate-800">{totalAssignments}</div>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="text-slate-500 text-xs">Total Students</div>
        <div className="text-2xl font-bold text-slate-800">{totalStudents}</div>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="text-slate-500 text-xs">Submissions</div>
        <div className="text-2xl font-bold text-emerald-600">{totalSubmissions}</div>
      </div>
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="text-slate-500 text-xs">Overall Completion</div>
        <div className="text-2xl font-bold text-indigo-600">{completionRate}%</div>
      </div>
    </div>
  );
}

