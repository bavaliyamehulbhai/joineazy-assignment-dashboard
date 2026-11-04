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

    // Role-based access check: Students can only view assignments allocated to them
    if (currentUser.role === "student") {
      const isAssigned = foundAssignment.assignedTo?.includes(currentUser.id);
      if (!isAssigned) {
        return null;
      }
    }

    return foundAssignment;
  }, [assignments, id, currentUser]);

  if (!assignment) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="h-7 w-7" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Assignment Unavailable
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              You do not have permission to view this assignment or it has not been allocated to your account.
            </p>

            <button
              onClick={() => navigate(currentUser?.role === "admin" ? "/admin" : "/student")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition cursor-pointer shadow-sm active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
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
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Navigation Breadcrumb */}
        <div>
          <button
            onClick={() => navigate(currentUser?.role === "admin" ? "/admin" : "/student")}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Assignments</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-colors">
          {/* Header */}
          <div className="border-b border-slate-100 dark:border-slate-800 p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Assignment Overview
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
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
          <div className="space-y-6 p-6 sm:p-8">
            {/* Description */}
            <section>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Description & Instructions
              </h2>

              <p className="leading-7 text-slate-700 dark:text-slate-300 text-sm sm:text-base whitespace-pre-line">
                {assignment.description}
              </p>
            </section>

            {/* Metadata Grid */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  <CalendarDays size={15} />
                  <span>Due Date</span>
                </div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">
                  {formatDate(assignment.dueDate)}
                </p>

                {overdue && (
                  <p className="mt-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                    ⚠️ This assignment is overdue, but you can still submit.
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Resource / Project Drive
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    Google Drive Link
                  </p>
                </div>

                <a
                  href={assignment.driveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 dark:bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-indigo-500 cursor-pointer shadow-sm"
                >
                  <span>Open Drive</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Student Two-Step Submission Section */}
            {currentUser?.role === "student" && (
              <section className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Submission Status
                </h2>

                {studentStatus === "submitted" ? (
                  <div className="flex items-start sm:items-center gap-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30 p-4 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                    <div>
                      <p className="font-bold text-sm text-emerald-950 dark:text-emerald-300">
                        Assignment Submitted
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 mt-0.5">
                        Your submission has been recorded and verified in localStorage.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">
                        Ready to submit your work?
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Click below to initiate the two-step submission verification.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowDialog(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 cursor-pointer active:scale-95"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Yes, I have submitted</span>
                    </button>
                  </div>
                )}
              </section>
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
