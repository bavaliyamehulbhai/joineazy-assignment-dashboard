import { useEffect, useState } from "react";
import {
  initializeStorage,
  getUsers,
  getAssignments,
} from "./utils/storage";
import {
  getStudentAssignments,
  getSubmittedCount,
  getPendingCount,
  getStudentProgress,
  getAssignmentProgress,
  getAdminAssignments,
} from "./utils/calculations";
import {
  getStudents,
  getAdmins,
  formatDate,
  isOverdue,
} from "./utils/helpers";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 1. Initialize LocalStorage
    initializeStorage();

    const users = getUsers() || [];
    const assignments = getAssignments() || [];

    // 2. Calculations testing
    const students = getStudents(users);
    const admins = getAdmins(users);

    const student1 = "student-1"; // Mehul Bavaliya
    const student1Assignments = getStudentAssignments(assignments, student1);
    const student1Submitted = getSubmittedCount(assignments, student1);
    const student1Pending = getPendingCount(assignments, student1);
    const student1Progress = getStudentProgress(assignments, student1);

    const admin1 = "admin-1"; // Dr. Rajesh Patel
    const admin1Assignments = getAdminAssignments(assignments, admin1);
    const assignment1Progress = getAssignmentProgress(assignments[0]);

    const testResults = {
      totalUsers: users.length,
      adminsCount: admins.length,
      studentsCount: students.length,
      totalAssignments: assignments.length,
      student1: {
        name: users.find((u) => u.id === student1)?.name,
        assignedCount: student1Assignments.length,
        submitted: student1Submitted,
        pending: student1Pending,
        progress: student1Progress,
      },
      admin1: {
        name: users.find((u) => u.id === admin1)?.name,
        ownAssignmentsCount: admin1Assignments.length,
      },
      assignment1Stats: {
        title: assignments[0]?.title,
        dueDateFormatted: formatDate(assignments[0]?.dueDate),
        isOverdue: isOverdue(assignments[0]?.dueDate),
        ...assignment1Progress,
      },
    };

    console.log("=== PHASE 2 VERIFICATION DATA ===");
    console.log("Users in LocalStorage:", users);
    console.log("Assignments in LocalStorage:", assignments);
    console.log("Calculations & Tests:", testResults);

    setData(testResults);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-2 border border-emerald-500/20">
            Phase 2 Active
          </span>
          <h1 className="text-2xl font-bold text-white">
            Data Architecture & Storage Verification
          </h1>
          <p className="text-slate-400 text-sm">
            LocalStorage initialized with seed users & assignments.
          </p>
        </div>

        {data ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-400">Total Users</p>
                <p className="text-xl font-bold text-white">{data.totalUsers}</p>
                <p className="text-[11px] text-slate-500">2 Admins, 5 Students</p>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-400">Assignments</p>
                <p className="text-xl font-bold text-white">{data.totalAssignments}</p>
                <p className="text-[11px] text-slate-500">Seeded in storage</p>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-400">{data.student1.name}</p>
                <p className="text-xl font-bold text-indigo-400">{data.student1.progress}%</p>
                <p className="text-[11px] text-slate-500">
                  {data.student1.submitted} of {data.student1.assignedCount} done
                </p>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-400">Admin 1 Scope</p>
                <p className="text-xl font-bold text-emerald-400">{data.admin1.ownAssignmentsCount}</p>
                <p className="text-[11px] text-slate-500">of 5 assignments</p>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 text-xs font-mono space-y-1.5 text-slate-300">
              <p className="text-emerald-400 font-semibold mb-1">
                ✓ LocalStorage Check: joineazy_users & joineazy_assignments loaded
              </p>
              <p>• Assignment 1 Progress: {data.assignment1Stats.submitted}/{data.assignment1Stats.total} submitted ({data.assignment1Stats.percentage}%)</p>
              <p>• Formatted Date Test: {data.assignment1Stats.dueDateFormatted} (Overdue: {data.assignment1Stats.isOverdue ? "Yes" : "No"})</p>
              <p className="text-slate-400 mt-2">
                Press F12 &rarr; Console or Application tab to inspect raw stored JSON.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Initializing LocalStorage...</p>
        )}
      </div>
    </div>
  );
}

export default App;
