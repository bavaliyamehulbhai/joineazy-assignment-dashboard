import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function StudentDashboard() {
  const { currentUser, logout, getStudentAssignmentsForCurrentUser } = useApp();
  const navigate = useNavigate();

  const myAssignments = getStudentAssignmentsForCurrentUser();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200 mb-2">
              Student Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Hello, {currentUser?.name} 👋
            </h1>
            <p className="text-sm text-slate-500 mt-1">{currentUser?.email}</p>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="self-start sm:self-auto rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer shadow-sm"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Assigned Assignments ({myAssignments.length})
            </h2>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium border border-emerald-200">
              Authenticated & Scoped
            </span>
          </div>

          <p className="text-slate-600 text-sm mb-6">
            Authentication and role-based scoping verified. You have access to only assignments allocated to you.
          </p>

          <div className="space-y-3">
            {myAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">
                    {assignment.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Due: {assignment.dueDate}
                  </p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                  Status: {assignment.submissions?.[currentUser?.id] || "pending"}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
            Full Student Dashboard layout, stats, and 2-step submission dialog will be built in Phase 4.
          </div>
        </div>
      </div>
    </div>
  );
}
