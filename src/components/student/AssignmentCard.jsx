import { CalendarDays, ExternalLink } from "lucide-react";
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
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
            {assignment.title}
          </h3>
          <Badge status={displayStatus} />
        </div>

        <p className="text-sm leading-6 text-slate-600 line-clamp-2 mb-4">
          {assignment.description}
        </p>
      </div>

      <div className="mt-2 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <CalendarDays size={16} className="text-slate-400 shrink-0" />
          <span>Due {formatDate(assignment.dueDate)}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to={`/student/assignment/${assignment.id}`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 transition hover:bg-slate-100 cursor-pointer text-center"
          >
            View Details
          </Link>

          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs sm:text-sm font-medium text-white transition hover:bg-slate-800 cursor-pointer text-center shadow-sm"
          >
            <span>Open Drive</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
