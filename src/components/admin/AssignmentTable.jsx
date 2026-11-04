import { Eye, Pencil, Trash2, Users, CalendarDays } from "lucide-react";
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
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-12 text-center">
        <div className="text-4xl mb-3">📋</div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          No assignments match your view
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Try clearing your search query or adjusting your completion filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/40">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Assignment
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Due Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Students
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 min-w-[200px]">
                Class Completion
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {assignments.map((assignment) => {
              const progress = getAssignmentProgress(assignment);
              const totalAssigned = assignment.assignedTo?.length || 0;
              const submittedCount = Object.values(assignment.submissions || {}).filter(
                (status) => status === "submitted"
              ).length;

              return (
                <tr key={assignment.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      {assignment.title}
                    </p>
                    <p className="mt-0.5 max-w-xs truncate text-xs text-slate-500 dark:text-slate-400">
                      {assignment.description}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-xs font-medium text-slate-600 dark:text-slate-300">
                    {formatDate(assignment.dueDate)}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>{totalAssigned} assigned</span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <ProgressBar percentage={progress} />
                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      {submittedCount} of {totalAssigned} submitted ({progress}%)
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/admin/assignment/${assignment.id}`)}
                        aria-label={`View submission status for ${assignment.title}`}
                        className="rounded-xl p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer transition"
                        title="View Submission Status"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => onEdit(assignment)}
                        aria-label={`Edit ${assignment.title}`}
                        className="rounded-xl p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 cursor-pointer transition"
                        title="Edit Assignment"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => onDelete(assignment)}
                        aria-label={`Delete ${assignment.title}`}
                        className="rounded-xl p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer transition"
                        title="Delete Assignment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/80 md:hidden">
        {assignments.map((assignment) => {
          const progress = getAssignmentProgress(assignment);
          const totalAssigned = assignment.assignedTo?.length || 0;
          const submittedCount = Object.values(assignment.submissions || {}).filter(
            (status) => status === "submitted"
          ).length;

          return (
            <div key={assignment.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    {assignment.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <CalendarDays size={14} className="text-slate-400" />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {progress}%
                </span>
              </div>

              <div>
                <ProgressBar percentage={progress} />
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {submittedCount} of {totalAssigned} submitted
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => navigate(`/admin/assignment/${assignment.id}`)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Eye size={14} />
                  <span>View</span>
                </button>

                <button
                  onClick={() => onEdit(assignment)}
                  aria-label={`Edit ${assignment.title}`}
                  className="rounded-xl bg-blue-50 dark:bg-blue-950/50 p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 cursor-pointer"
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={() => onDelete(assignment)}
                  aria-label={`Delete ${assignment.title}`}
                  className="rounded-xl bg-red-50 dark:bg-red-950/50 p-2 text-red-600 dark:text-red-400 hover:bg-red-100 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
