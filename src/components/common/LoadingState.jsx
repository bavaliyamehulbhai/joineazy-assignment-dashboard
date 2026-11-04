export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="text-center p-6">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-500" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {message}
        </p>
      </div>
    </div>
  );
}
