import { AlertTriangle, CheckCircle2, X } from "lucide-react";

export default function SubmissionDialog({
  isOpen,
  onClose,
  onConfirm,
  assignmentTitle,
}) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div>
              <h2
                id="submission-dialog-title"
                className="text-lg font-bold text-slate-900 dark:text-white tracking-tight"
              >
                Confirm Submission
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Final confirmation required
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close submission dialog"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message */}
        <div className="mb-6">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Are you sure you have completed and submitted the work for{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              "{assignmentTitle}"
            </span>
            ?
          </p>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
            💡 Once confirmed, your assignment status will update to <strong>Submitted</strong> and your overall progress will recalculate.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer shadow-sm transition active:scale-95"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Confirm Submission</span>
          </button>
        </div>
      </div>
    </div>
  );
}
