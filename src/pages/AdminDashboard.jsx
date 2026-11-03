import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function AdminDashboard() {
  const { currentUser, logout, getAdminAssignmentsForCurrentUser } = useApp();
  const navigate = useNavigate();

  const myCreatedAssignments = getAdminAssignmentsForCurrentUser();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200 mb-2">
              Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Welcome, {currentUser?.name} 👨‍🏫
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
              Your Created Assignments ({myCreatedAssignments.length})
            </h2>
            <span className="text-xs text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full font-medium border border-purple-200">
              Admin Ownership Isolated
            </span>
          </div>

          <p className="text-slate-600 text-sm mb-6">
            Admin ownership check verified: you can only view and manage assignments created by your administrator account.
          </p>

          <div className="space-y-3">
            {myCreatedAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">
                    {assignment.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assigned to: {assignment.assignedTo?.length || 0} students
                  </p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                  Due: {assignment.dueDate}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
            Full Admin Assignment CRUD, Allocation modals, and Student status tracking will be built in Phase 6 & Phase 7.
          </div>
        </div>
      </div>
    </div>
  );
}
