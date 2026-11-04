import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, CheckCircle2, BookOpen, Clock } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import StudentStats from "../components/student/StudentStats";
import ProgressBar from "../components/common/ProgressBar";
import Badge from "../components/common/Badge";

import { useApp } from "../context/AppContext";
import { isOverdue, formatDate } from "../utils/helpers";
import {
  getStudentProgress,
  getSubmittedCount,
  getPendingCount,
} from "../utils/calculations";

export default function StudentDashboard() {
  const { currentUser, assignments, isLoading } = useApp();

  const studentAssignments = useMemo(() => {
    if (!currentUser) return [];
    return assignments.filter((assignment) =>
      assignment.assignedTo?.includes(currentUser.id)
    );
  }, [assignments, currentUser]);

  if (isLoading || !currentUser) {
    return null;
  }

  const total = studentAssignments.length;
  const submitted = getSubmittedCount(assignments, currentUser.id);
  const pending = getPendingCount(assignments, currentUser.id);
  const progress = getStudentProgress(assignments, currentUser.id);

  // Identify overdue and urgent pending assignments
  const pendingAssignments = studentAssignments.filter(
    (a) => (a.submissions?.[currentUser.id] || "pending") === "pending"
  );

  const overdueAssignments = pendingAssignments.filter((a) =>
    isOverdue(a.dueDate)
  );

  // Recent 3 assignments
  const recentAssignments = [...studentAssignments].slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-5 sm:space-y-6">
        {/* Apple-style Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Welcome back, {currentUser.name?.split(" ")[0]}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Here is your academic progress and upcoming deadlines overview.
            </p>
          </div>

          <Link
            to="/student/assignments"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white px-3.5 py-2 text-xs font-medium shadow-xs transition active:scale-[0.98]"
          >
            <span>View All Assignments</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Apple Metric Cards */}
        <StudentStats total={total} submitted={submitted} pending={pending} />

        {/* Progress Card */}
        <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
                Coursework Progress
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {submitted} of {total} assignments completed
              </p>
            </div>
            <span className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
              {progress}%
            </span>
          </div>

          <ProgressBar percentage={progress} showLabel={false} height="h-2.5" />
        </div>

        {/* Split Grid: Priority Deadlines & Recent Assignments */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Action Required / Urgent Deadlines */}
          <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Clock size={15} />
                  </div>
                  <h2 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
                    Action Required
                  </h2>
                </div>

                {overdueAssignments.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                    <AlertTriangle size={11} />
                    {overdueAssignments.length} Overdue
                  </span>
                )}
              </div>

              {pendingAssignments.length === 0 ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    All caught up!
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    No pending assignments require your submission.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingAssignments.slice(0, 3).map((assignment) => {
                    const isTaskOverdue = isOverdue(assignment.dueDate);
                    return (
                      <Link
                        key={assignment.id}
                        to={`/student/assignment/${assignment.id}`}
                        className="group flex items-center justify-between p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.05] transition"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate group-hover:text-[#0071e3] transition-colors">
                            {assignment.title}
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            Due {formatDate(assignment.dueDate)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isTaskOverdue ? (
                            <span className="text-[10px] font-semibold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-md">
                              Overdue
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md">
                              Pending
                            </span>
                          )}
                          <ArrowRight
                            size={12}
                            className="text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-white group-hover:translate-x-0.5 transition"
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {pendingAssignments.length > 3 && (
              <Link
                to="/student/assignments"
                className="mt-3 text-[11px] font-medium text-[#0071e3] hover:underline flex items-center justify-end gap-1"
              >
                <span>+{pendingAssignments.length - 3} more pending</span>
                <ArrowRight size={11} />
              </Link>
            )}
          </div>

          {/* Recent Coursework Snapshot */}
          <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.08] text-neutral-700 dark:text-neutral-300">
                    <BookOpen size={15} />
                  </div>
                  <h2 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
                    Coursework Snapshot
                  </h2>
                </div>

                <Link
                  to="/student/assignments"
                  className="text-xs font-medium text-[#0071e3] hover:underline"
                >
                  See all
                </Link>
              </div>

              <div className="space-y-2">
                {recentAssignments.map((assignment) => {
                  const studentStatus =
                    assignment.submissions?.[currentUser.id] || "pending";
                  const isTaskOverdue =
                    studentStatus === "pending" && isOverdue(assignment.dueDate);

                  return (
                    <Link
                      key={assignment.id}
                      to={`/student/assignment/${assignment.id}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.05] transition"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate group-hover:text-[#0071e3] transition-colors">
                          {assignment.title}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-0.5 truncate">
                          {assignment.description}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <Badge
                          status={isTaskOverdue ? "overdue" : studentStatus}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
              <span>{total} total assigned</span>
              <Link
                to="/student/assignments"
                className="font-medium text-[#0071e3] hover:underline flex items-center gap-1"
              >
                <span>Assignments Hub</span>
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
