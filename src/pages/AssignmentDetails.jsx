import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, ExternalLink } from "lucide-react";

import { useApp } from "../context/AppContext";
import Badge from "../components/common/Badge";
import { formatDate, isOverdue } from "../utils/helpers";

export default function AssignmentDetails() {
  const { id } = useParams();
  const { currentUser, assignments } = useApp();
  const navigate = useNavigate();

  const assignment = assignments.find((item) => item.id === id);

  if (!assignment) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center border border-slate-200 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Assignment Not Found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            The assignment you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() =>
              navigate(currentUser?.role === "admin" ? "/admin" : "/student")
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const studentStatus =
    assignment.submissions?.[currentUser?.id] || "pending";
  const overdue =
    studentStatus === "pending" && isOverdue(assignment.dueDate);
  const displayStatus = overdue ? "overdue" : studentStatus;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link
            to={currentUser?.role === "admin" ? "/admin" : "/student"}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition mb-4 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full mb-2">
                Assignment View
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {assignment.title}
              </h1>
            </div>

            {currentUser?.role === "student" && (
              <div className="self-start sm:self-auto">
                <Badge status={displayStatus} />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Description & Requirements
            </h2>
            <p className="text-sm sm:text-base leading-7 text-slate-700 whitespace-pre-line">
              {assignment.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                <CalendarDays size={15} />
                <span>Due Date</span>
              </div>
              <p className="font-semibold text-slate-900 text-sm">
                {formatDate(assignment.dueDate)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">
                  Reference / Submission Drive
                </p>
                <p className="font-semibold text-slate-900 text-sm">
                  Google Drive Resource
                </p>
              </div>

              <a
                href={assignment.driveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 cursor-pointer shadow-sm"
              >
                <span>Open</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {currentUser?.role === "student" && (
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
              Note: The 2-step submission flow will be activated in Phase 5.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
