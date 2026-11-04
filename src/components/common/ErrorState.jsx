import { AlertCircle } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  onRetry,
}) {
  return (
    <div className="flex min-h-[250px] items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 p-6 rounded-2xl shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
          <AlertCircle className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>

        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer transition shadow-sm"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
