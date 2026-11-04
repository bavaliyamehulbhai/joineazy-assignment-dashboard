import { useMemo } from "react";
import { ArrowLeft, ExternalLink, Users, CalendarDays, ShieldAlert } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProgressBar from "../components/common/ProgressBar";
import Badge from "../components/common/Badge";

import { useApp } from "../context/AppContext";
import { getAssignmentProgress } from "../utils/calculations";
import { formatDate } from "../utils/helpers";

export default function AdminAssignmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { assignments, users, currentUser } = useApp();

  const assignment = useMemo(() => {
    return assignments.find(
      (item) => item.id === id && item.createdBy === currentUser?.id
    );
  }, [assignments, id, currentUser]);

  if (!assignment) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[50vh] items-center justify-center px-4">
          <div className="max-w-md w-full text-center bg-white dark:bg-[#1c1c1e] p-6 sm:p-8 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="h-6 w-6" />
            </div>

            <h2 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white tracking-tight">
              Assignment Unavailable
            </h2>

            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              This assignment does not exist or was created by another administrator.
            </p>

            <button
              onClick={() => navigate("/admin/assignments")}
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] px-4 py-2 text-xs font-medium text-white transition active:scale-[0.98] cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Assignments</span>
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const assignedStudents = users.filter(
    (user) =>
      user.role === "student" && assignment.assignedTo?.includes(user.id)
  );

  const progress = getAssignmentProgress(assignment);
  const submittedCount = Object.values(assignment.submissions || {}).filter(
    (status) => status === "submitted"
  ).length;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-4 sm:space-y-5">
        {/* Apple Back Nav */}
        <div>
          <button
            onClick={() => navigate("/admin/assignments")}
            className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Assignments</span>
          </button>
        </div>

        {/* Apple Card Header */}
        <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-4 sm:p-6 space-y-5 transition-colors">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-4">
            <div>
              <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                Submission Oversight
              </span>

              <h1 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight mt-0.5">
                {assignment.title}
              </h1>

              <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
                {assignment.description}
              </p>
            </div>

            <div className="shrink-0 self-start sm:self-auto">
              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] px-3 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition active:scale-[0.98]"
              >
                <span>Google Drive</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Quick Meta Chips */}
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="flex items-center gap-2.5 p-3 bg-black/[0.02] dark:bg-white/[0.04] rounded-xl border border-black/[0.04] dark:border-white/[0.06]">
              <CalendarDays size={15} className="text-neutral-400 shrink-0" />
              <div>
                <p className="text-[10px] text-neutral-400">Due Date</p>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {formatDate(assignment.dueDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 bg-black/[0.02] dark:bg-white/[0.04] rounded-xl border border-black/[0.04] dark:border-white/[0.06]">
              <Users size={15} className="text-neutral-400 shrink-0" />
              <div>
                <p className="text-[10px] text-neutral-400">Cohort</p>
                <p className="font-semibold text-neutral-900 dark:text-white">
                  {assignedStudents.length} Students Allocated
                </p>
              </div>
            </div>
          </div>

          {/* Class Completion Progress Bar */}
          <div className="border-t border-black/[0.04] dark:border-white/[0.06] pt-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                  Class Completion
                </p>
                <p className="text-[11px] text-neutral-400">
                  {submittedCount} of {assignedStudents.length} students have submitted
                </p>
              </div>

              <span className="text-xs font-semibold tabular-nums text-neutral-800 dark:text-neutral-200 px-2 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.08]">
                {progress}%
              </span>
            </div>

            <ProgressBar percentage={progress} showLabel={false} height="h-2" />
          </div>
        </div>

        {/* Student Submission Tracking Table */}
        <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#1c1c1e] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden transition-colors">
          <div className="border-b border-black/[0.04] dark:border-white/[0.06] p-4 flex items-center justify-between">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
                Student Roster
              </h2>
              <p className="text-[11px] text-neutral-400">
                Live submission status for this assignment
              </p>
            </div>

            <span className="text-[10px] font-medium text-neutral-500 bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.5 rounded-md">
              {assignedStudents.length} students
            </span>
          </div>

          <div className="divide-y divide-black/[0.03] dark:divide-white/[0.04]">
            {assignedStudents.map((student) => {
              const status =
                assignment.submissions?.[student.id] || "pending";

              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-black/[0.06] dark:bg-white/[0.08] flex items-center justify-center font-medium text-neutral-700 dark:text-neutral-300 text-xs">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white text-xs leading-tight">
                        {student.name}
                      </p>
                      <p className="text-[10px] text-neutral-400">{student.email}</p>
                    </div>
                  </div>

                  <div>
                    <Badge status={status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
