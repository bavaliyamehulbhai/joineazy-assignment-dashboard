import { CalendarDays, ExternalLink, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../common/Badge";
import { formatDate, isOverdue } from "../../utils/helpers";

export default function AssignmentCard({ assignment, currentUser }) {
  const studentStatus =
    assignment.submissions?.[currentUser.id] || "pending";

  const overdue =
    studentStatus === "pending" && isOverdue(assignment.dueDate);

  const displayStatus = overdue ? "overdue" : studentStatus;

  return (
    <article
      className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between ${
        overdue
          ? "border-rose-300 dark:border-rose-900/50 bg-rose-50/20 dark:bg-rose-950/10"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white tracking-tight">
            {assignment.title}
          </h3>
          <Badge status={displayStatus} />
        </div>

        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
          {assignment.description}
        </p>
      </div>

      <div className="mt-2 flex flex-col gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays size={14} className="text-slate-400 dark:text-slate-500 shrink-0" />
            <span>Due {formatDate(assignment.dueDate)}</span>
          </div>
          {overdue && (
            <p className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-1">
              <AlertCircle size={12} />
              <span>Deadline passed</span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to={`/student/assignment/${assignment.id}`}
            aria-label={`View details for ${assignment.title}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-center"
          >
            View Details
          </Link>

          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open Google Drive resource for ${assignment.title}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 dark:bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-indigo-500 cursor-pointer text-center shadow-sm"
          >
            <span>Open Drive</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}
