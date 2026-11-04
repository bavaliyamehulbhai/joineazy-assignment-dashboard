import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowRight, BookOpen, Users, CheckCircle2 } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import AdminStats from "../components/admin/AdminStats";
import ProgressBar from "../components/common/ProgressBar";
import AssignmentModal from "../components/admin/AssignmentModal";

import { useApp } from "../context/AppContext";
import { getAssignmentProgress } from "../utils/calculations";
import { formatDate } from "../utils/helpers";

export default function AdminDashboard() {
  const {
    currentUser,
    assignments,
    users,
    createAssignment,
    isLoading,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Role isolation: Only assignments created by this admin
  const adminAssignments = useMemo(() => {
    if (!currentUser) return [];
    return assignments.filter(
      (assignment) => assignment.createdBy === currentUser.id
    );
  }, [assignments, currentUser]);

  const students = useMemo(() => {
    return users.filter((user) => user.role === "student");
  }, [users]);

  // Overall class completion calculation
  const overallClassProgress = useMemo(() => {
    if (adminAssignments.length === 0) return 0;
    const totalPercentage = adminAssignments.reduce(
      (acc, a) => acc + getAssignmentProgress(a),
      0
    );
    return Math.round(totalPercentage / adminAssignments.length);
  }, [adminAssignments]);

  const recentAssignments = [...adminAssignments].slice(0, 4);

  if (isLoading || !currentUser) {
    return null;
  }

  const handleCreateAssignment = (assignmentData) => {
    createAssignment(assignmentData);
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-5 sm:space-y-6">
        {/* Apple-style Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Faculty Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Welcome, {currentUser.name}. Manage coursework and track student progress.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white px-3.5 py-2 text-xs font-medium shadow-xs transition active:scale-[0.98] cursor-pointer"
            >
              <Plus size={14} />
              <span>Create Assignment</span>
            </button>

            <Link
              to="/admin/assignments"
              className="inline-flex items-center gap-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-800 dark:text-neutral-200 px-3.5 py-2 text-xs font-medium transition active:scale-[0.98]"
            >
              <span>Manage All</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Apple Metric Cards */}
        <AdminStats assignments={adminAssignments} users={users} />

        {/* Class Progress Card */}
        <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-4 sm:p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
                Average Class Completion
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Aggregate submission completion across all your assignments
              </p>
            </div>
            <span className="text-lg font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
              {overallClassProgress}%
            </span>
          </div>

          <ProgressBar percentage={overallClassProgress} showLabel={false} height="h-2.5" />
        </div>

        {/* Recent Assignments Overview */}
        <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.08] text-neutral-700 dark:text-neutral-300">
                <BookOpen size={15} />
              </div>
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
                Recently Created Coursework
              </h2>
            </div>

            <Link
              to="/admin/assignments"
              className="text-xs font-medium text-[#0071e3] hover:underline"
            >
              View all ({adminAssignments.length})
            </Link>
          </div>

          {recentAssignments.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-xs text-neutral-400">
                No assignments created yet. Click "Create Assignment" to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentAssignments.map((assignment) => {
                const progress = getAssignmentProgress(assignment);
                const assignedCount = assignment.assignedTo?.length || 0;
                const submittedCount = Object.values(
                  assignment.submissions || {}
                ).filter((s) => s === "submitted").length;

                return (
                  <div
                    key={assignment.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] gap-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/assignment/${assignment.id}`}
                          className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:text-[#0071e3] transition-colors truncate"
                        >
                          {assignment.title}
                        </Link>
                        <span className="text-[10px] text-neutral-400 shrink-0">
                          Due {formatDate(assignment.dueDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Users size={11} />
                          {assignedCount} students
                        </span>
                        <span>•</span>
                        <span>
                          {submittedCount} of {assignedCount} submitted
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <div className="w-24 sm:w-32">
                        <ProgressBar percentage={progress} showLabel={false} height="h-1.5" />
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-neutral-700 dark:text-neutral-300 w-9 text-right">
                        {progress}%
                      </span>
                      <Link
                        to={`/admin/assignment/${assignment.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#0071e3] hover:underline ml-1"
                      >
                        <span>Details</span>
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Assignment Modal */}
      <AssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAssignment}
        students={students}
        currentUserId={currentUser.id}
      />
    </DashboardLayout>
  );
}
