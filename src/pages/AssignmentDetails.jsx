import { useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, CheckCircle2, CalendarDays, ShieldAlert } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import Badge from "../components/common/Badge";
import SubmissionDialog from "../components/student/SubmissionDialog";

import { useApp } from "../context/AppContext";
import { isOverdue, formatDate } from "../utils/helpers";

export default function AssignmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { assignments, currentUser, submitAssignment } = useApp();
  const [showDialog, setShowDialog] = useState(false);

  const assignment = useMemo(() => {
    const foundAssignment = assignments.find((item) => item.id === id);

    if (!foundAssignment || !currentUser) {
      return null;
    }

    // Role-based access check
    if (currentUser.role === "student") {
      const isAssigned = foundAssignment.assignedTo?.includes(currentUser.id);
      if (!isAssigned) {
        return null;
      }
    }

    return foundAssignment;
  }, [assignments, id, currentUser]);

  const backPath = currentUser?.role === "admin" ? "/admin/assignments" : "/student/assignments";

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
              You do not have permission to view this assignment or it has not been allocated to your account.
            </p>

            <button
              onClick={() => navigate(backPath)}
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

  const studentStatus =
    assignment.submissions?.[currentUser?.id] || "pending";

  const overdue =
    studentStatus === "pending" && isOverdue(assignment.dueDate);

  const displayStatus = overdue ? "overdue" : studentStatus;

  const handleConfirmSubmission = () => {
    submitAssignment(assignment.id, currentUser.id);
    setShowDialog(false);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
        {/* Apple Back Nav */}
        <div>
          <button
            onClick={() => navigate(backPath)}
            className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Assignments</span>
          </button>
        </div>

        {/* Apple Main Detail Card */}
        <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden">
          {/* Header */}
          <div className="border-b border-black/[0.04] dark:border-white/[0.06] p-4 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  Coursework
                </span>
                <h1 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight mt-0.5">
                  {assignment.title}
                </h1>
              </div>

              {currentUser?.role === "student" && (
                <div className="self-start sm:self-auto">
                  <Badge status={displayStatus} />
                </div>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-6 space-y-5">
            {/* Description */}
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1.5">
                Instructions
              </h2>
              <p className="leading-relaxed text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm whitespace-pre-line">
                {assignment.description}
              </p>
            </div>

            {/* Metadata Chips */}
            <div className="grid gap-3 sm:grid-cols-2 pt-1">
              <div className="rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] p-3">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                  <CalendarDays size={13} />
                  <span>Due Date</span>
                </div>
                <p className="font-semibold text-neutral-900 dark:text-white text-sm">
                  {formatDate(assignment.dueDate)}
                </p>
                {overdue && (
                  <p className="mt-1 text-[11px] text-rose-500 font-medium">
                    Deadline passed — submission still accepted.
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5">
                    Course Resources
                  </p>
                  <p className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
                    Google Drive Folder
                  </p>
                </div>

                <a
                  href={assignment.driveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] px-3 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition active:scale-[0.98]"
                >
                  <span>Open</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Student 2-Step Submission Area */}
            {currentUser?.role === "student" && (
              <div className="border-t border-black/[0.04] dark:border-white/[0.06] pt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Submission Status
                  </span>
                </div>

                {studentStatus === "submitted" ? (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white shrink-0">
                      <CheckCircle2 size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
                        Submitted & Verified
                      </p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                        Your submission has been recorded.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm">
                        Ready to submit?
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Click below to verify and finalize your assignment submission.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowDialog(true)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] px-4 py-2 text-xs font-medium text-white shadow-xs transition active:scale-[0.98] cursor-pointer"
                    >
                      <CheckCircle2 size={13} />
                      <span>Yes, I have submitted</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two-Step Confirmation Dialog */}
      <SubmissionDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleConfirmSubmission}
        assignmentTitle={assignment.title}
      />
    </DashboardLayout>
  );
}
