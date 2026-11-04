import { CalendarDays, ExternalLink, ArrowRight } from "lucide-react";
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
      className={`group rounded-2xl bg-white dark:bg-[#1c1c1e] border transition-all duration-200 flex flex-col justify-between p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md ${
        overdue
          ? "border-rose-500/30 hover:border-rose-500/50"
          : "border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.14] dark:hover:border-white/[0.16]"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white tracking-tight group-hover:text-[#0071e3] transition-colors line-clamp-1">
            {assignment.title}
          </h3>
          <Badge status={displayStatus} />
        </div>

        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
          {assignment.description}
        </p>
      </div>

      <div className="mt-2 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
          <CalendarDays size={13} className="shrink-0" />
          <span className="font-medium">Due {formatDate(assignment.dueDate)}</span>
          {overdue && (
            <span className="text-[10px] text-rose-500 font-semibold ml-1">
              • Past due
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open Google Drive resource for ${assignment.title}`}
            className="inline-flex items-center gap-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-neutral-700 dark:text-neutral-300 px-3 py-1.5 text-xs font-medium transition active:scale-[0.98]"
          >
            <span>Drive</span>
            <ExternalLink size={11} />
          </a>

          <Link
            to={`/student/assignment/${assignment.id}`}
            aria-label={`View assignment ${assignment.title}`}
            className="inline-flex items-center gap-1 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white px-3.5 py-1.5 text-xs font-medium shadow-xs transition active:scale-[0.98]"
          >
            <span>{studentStatus === "submitted" ? "View" : "Submit"}</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}
