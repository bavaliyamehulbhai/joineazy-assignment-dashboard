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
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="h-7 w-7" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Assignment Unavailable
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              This assignment does not exist or was created by another administrator.
            </p>

            <button
              onClick={() => navigate("/admin")}
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
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Breadcrumb Navigation */}
        <div>
          <button
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Admin Dashboard</span>
          </button>
        </div>

        {/* Assignment Card Header */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800/60 mb-2">
                Faculty Review View
              </span>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {assignment.title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-slate-600 dark:text-slate-400 whitespace-pre-line">
                {assignment.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-2xs"
              >
                <span>Google Drive</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Meta Stats */}
          <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
              <CalendarDays className="h-5 w-5 text-slate-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Submission Due Date</p>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{formatDate(assignment.dueDate)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
              <Users className="h-5 w-5 text-slate-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Assigned Cohort</p>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{assignedStudents.length} Students Allocated</p>
              </div>
            </div>
          </div>

          {/* Class Completion Progress Bar */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Class Completion Progress
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {submittedCount} of {assignedStudents.length} students have submitted
                </p>
              </div>

              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-900/50">
                {progress}%
              </span>
            </div>

            <ProgressBar percentage={progress} />
          </div>
        </div>

        {/* Student Submission Tracking Table */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-colors">
          <div className="border-b border-slate-200 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Allocated Students & Live Submission Status
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Track each student's submission status in real-time.
              </p>
            </div>

            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full self-start sm:self-auto shadow-2xs">
              {assignedStudents.length} Students
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {assignedStudents.map((student) => {
              const status =
                assignment.submissions?.[student.id] || "pending";

              return (
                <div
                  key={student.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-xs">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{student.email}</p>
                    </div>
                  </div>

                  <div className="self-start sm:self-auto">
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
