import { Eye, Pencil, Trash2, Users, CalendarDays, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../common/ProgressBar";
import { getAssignmentProgress } from "../../utils/calculations";
import { formatDate } from "../../utils/helpers";

export default function AssignmentTable({
  assignments = [],
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  if (assignments.length === 0) {
    return (
      <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#1c1c1e] p-8 text-center">
        <p className="text-sm font-semibold text-neutral-900 dark:text-white">
          No assignments match your view
        </p>
        <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
          Try clearing your search keyword or adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#1c1c1e] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/[0.04] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]">
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Assignment
              </th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Due Date
              </th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Cohort
              </th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 min-w-[180px]">
                Completion
              </th>
              <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-black/[0.03] dark:divide-white/[0.04]">
            {assignments.map((assignment) => {
              const progress = getAssignmentProgress(assignment);
              const totalAssigned = assignment.assignedTo?.length || 0;
              const submittedCount = Object.values(
                assignment.submissions || {}
              ).filter((status) => status === "submitted").length;

              return (
                <tr
                  key={assignment.id}
                  className="group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-neutral-900 dark:text-white text-xs sm:text-sm group-hover:text-[#0071e3] transition-colors">
                      {assignment.title}
                    </p>
                    <p className="mt-0.5 max-w-xs truncate text-[11px] text-neutral-400">
                      {assignment.description}
                    </p>
                  </td>

                  <td className="px-5 py-3.5 text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                    {formatDate(assignment.dueDate)}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                      <Users size={11} className="text-neutral-400" />
                      <span>{totalAssigned} students</span>
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <ProgressBar
                      percentage={progress}
                      showLabel={false}
                      height="h-1.5"
                    />
                    <p className="mt-1 text-[10px] text-neutral-400 tabular-nums">
                      <strong className="text-neutral-900 dark:text-white font-semibold">
                        {submittedCount}
                      </strong>{" "}
                      of {totalAssigned} submitted ({progress}%)
                    </p>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex justify-end items-center gap-1">
                      <button
                        onClick={() =>
                          navigate(`/admin/assignment/${assignment.id}`)
                        }
                        aria-label={`View status for ${assignment.title}`}
                        className="rounded-lg p-1.5 text-neutral-500 hover:text-[#0071e3] hover:bg-[#0071e3]/10 transition cursor-pointer"
                        title="View Submission Roster"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        onClick={() => onEdit(assignment)}
                        aria-label={`Edit ${assignment.title}`}
                        className="rounded-lg p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition cursor-pointer"
                        title="Edit Assignment"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => onDelete(assignment)}
                        aria-label={`Delete ${assignment.title}`}
                        className="rounded-lg p-1.5 text-neutral-500 hover:text-rose-600 hover:bg-rose-500/10 transition cursor-pointer"
                        title="Delete Assignment"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06] md:hidden">
        {assignments.map((assignment) => {
          const progress = getAssignmentProgress(assignment);
          const totalAssigned = assignment.assignedTo?.length || 0;
          const submittedCount = Object.values(
            assignment.submissions || {}
          ).filter((status) => status === "submitted").length;

          return (
            <div key={assignment.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
                    {assignment.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-neutral-400 line-clamp-1">
                    {assignment.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <CalendarDays size={12} />
                  <span>Due {formatDate(assignment.dueDate)}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  <span>{totalAssigned} students</span>
                </span>
              </div>

              <div>
                <ProgressBar
                  percentage={progress}
                  showLabel={false}
                  height="h-1.5"
                />
                <p className="mt-1 text-[10px] text-neutral-400">
                  {submittedCount} of {totalAssigned} submitted ({progress}%)
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() =>
                    navigate(`/admin/assignment/${assignment.id}`)
                  }
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#0071e3] hover:underline"
                >
                  <Eye size={13} />
                  <span>View Submissions</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(assignment)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(assignment)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
