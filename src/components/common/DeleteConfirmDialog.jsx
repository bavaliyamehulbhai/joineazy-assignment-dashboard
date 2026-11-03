import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Assignment",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 tracking-tight text-lg">
                Delete Assignment
              </h2>
              <p className="text-xs text-slate-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Are you sure you want to permanently delete{" "}
          <span className="font-semibold text-slate-900">"{title}"</span>?
          All associated student submission statuses and tracking data will also be removed.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer shadow-sm transition active:scale-95"
          >
            Delete Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

