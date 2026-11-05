import { ArrowLeft, User, Mail, Shield, CheckCircle2, BookOpen, Clock, LogOut, Sun, Moon, Database, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProgressBar from "../components/common/ProgressBar";
import { useApp } from "../context/AppContext";
import {
  getStudentProgress,
  getSubmittedCount,
  getPendingCount,
  getAssignmentProgress,
} from "../utils/calculations";

export default function Profile() {
  const { currentUser, assignments, users, logout, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const isAdmin = currentUser.role === "admin";
  const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U";

  // Calculations for Student
  const studentAssignments = assignments.filter((a) =>
    a.assignedTo?.includes(currentUser.id)
  );
  const totalAssigned = studentAssignments.length;
  const submittedCount = getSubmittedCount(assignments, currentUser.id);
  const pendingCount = getPendingCount(assignments, currentUser.id);
  const progressRate = getStudentProgress(assignments, currentUser.id);

  // Calculations for Admin
  const adminAssignments = assignments.filter((a) => a.createdBy === currentUser.id);
  const totalAdminAssignments = adminAssignments.length;
  const totalStudents = users.filter((u) => u.role === "student").length;
  const totalSubmissionsReceived = adminAssignments.reduce((acc, a) => {
    return (
      acc +
      Object.values(a.submissions || {}).filter((s) => s === "submitted").length
    );
  }, 0);
  const adminClassAverage =
    totalAdminAssignments > 0
      ? Math.round(
          adminAssignments.reduce((acc, a) => acc + getAssignmentProgress(a), 0) /
            totalAdminAssignments
        )
      : 0;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleResetData = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all data back to original seed data? This will clear custom submissions and reset assignments."
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const backPath = isAdmin ? "/admin" : "/student";

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-5 sm:space-y-6">
        {/* Apple Back Nav */}
        <div>
          <button
            onClick={() => navigate(backPath)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Apple Profile Header Card */}
        <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-5 sm:p-7 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Apple Large Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-950 dark:from-neutral-200 dark:to-white text-white dark:text-neutral-950 font-bold text-2xl shadow-sm select-none">
                {userInitial}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight truncate">
                    {currentUser.name}
                  </h1>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isAdmin
                        ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                        : "bg-[#0071e3]/10 text-[#0071e3] dark:text-[#2997ff] border border-[#0071e3]/20"
                    }`}
                  >
                    {isAdmin ? "Faculty Admin" : "Cohort Student"}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 flex items-center gap-1.5">
                  <Mail size={12} className="text-neutral-400" />
                  <span>{currentUser.email}</span>
                </p>

                <div className="mt-1 flex items-center gap-2 text-[10px] text-neutral-400">
                  <span className="font-mono bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.2 rounded">
                    ID: {currentUser.id}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    ● Account Active
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Trigger */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 self-start sm:self-auto rounded-xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-rose-500/10 text-neutral-700 dark:text-neutral-300 hover:text-rose-600 dark:hover:text-rose-400 px-3.5 py-2 text-xs font-medium transition active:scale-[0.98] cursor-pointer"
            >
              <LogOut size={13} />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Academic Performance Snapshot */}
        <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-5 sm:p-6 transition-colors">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
            {isAdmin ? "Faculty Performance & Cohort Analytics" : "Academic Progress Summary"}
          </h2>

          {isAdmin ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
                  <p className="text-[10px] text-neutral-400 font-medium">Created Coursework</p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums mt-0.5">
                    {totalAdminAssignments}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
                  <p className="text-[10px] text-neutral-400 font-medium">Total Students</p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums mt-0.5">
                    {totalStudents}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
                  <p className="text-[10px] text-neutral-400 font-medium">Submissions Received</p>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums mt-0.5">
                    {totalSubmissionsReceived}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-neutral-500">Aggregate Class Progress</span>
                  <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">
                    {adminClassAverage}%
                  </span>
                </div>
                <ProgressBar percentage={adminClassAverage} showLabel={false} height="h-2" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-medium mb-0.5">
                    <BookOpen size={11} className="text-[#0071e3]" />
                    <span>Assigned</span>
                  </div>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums">
                    {totalAssigned}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-medium mb-0.5">
                    <CheckCircle2 size={11} className="text-emerald-500" />
                    <span>Submitted</span>
                  </div>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums">
                    {submittedCount}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-medium mb-0.5">
                    <Clock size={11} className="text-amber-500" />
                    <span>Pending</span>
                  </div>
                  <p className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums">
                    {pendingCount}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-neutral-500">Personal Completion</span>
                  <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">
                    {progressRate}%
                  </span>
                </div>
                <ProgressBar percentage={progressRate} showLabel={false} height="h-2" />
              </div>
            </div>
          )}
        </div>

        {/* System Settings & LocalStorage Status */}
        <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-5 sm:p-6 space-y-4 transition-colors">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            System & Workspace Preferences
          </h2>

          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
            {/* Theme Toggle Row */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                  Appearance Theme
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Currently using {theme === "dark" ? "OLED Dark" : "Apple Light"} theme
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition active:scale-[0.98] cursor-pointer"
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={13} className="text-amber-400" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} className="text-neutral-600" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </button>
            </div>

            {/* Storage Engine Row */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <Database size={13} className="text-neutral-400" />
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                    Data Persistence Engine
                  </p>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Client-side storage via browser LocalStorage (zero external dependencies)
                </p>
              </div>

              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Active & Synced
              </span>
            </div>

            {/* Reset Demo Data Row */}
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                  Reset Demo State
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Restore default seed assignments and clean test submissions
                </p>
              </div>

              <button
                onClick={handleResetData}
                className="inline-flex items-center gap-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 px-3 py-1.5 text-xs font-medium transition active:scale-[0.98] cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

