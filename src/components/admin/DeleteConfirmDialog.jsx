import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmDialog({
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
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm transition-opacity"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl p-5 border border-black/[0.08] dark:border-white/[0.1] shadow-2xl transition-colors">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <AlertTriangle size={18} />
            </div>

            <div>
              <h2
                id="delete-dialog-title"
                className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white tracking-tight"
              >
                Delete Assignment
              </h2>
              <p className="text-[11px] text-neutral-400">
                Permanent action
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Message */}
        <div className="space-y-2 mb-5">
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              "{assignmentTitle}"
            </span>
            ? All allocated student submission data for this task will be permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="inline-flex items-center gap-1 rounded-xl bg-rose-600 hover:bg-rose-700 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition active:scale-[0.98] cursor-pointer"
          >
            <span>Delete Permanently</span>
          </button>
        </div>
      </div>
    </div>
  );
}

