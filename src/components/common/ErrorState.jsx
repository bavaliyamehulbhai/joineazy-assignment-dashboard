import Button from "./Button";

export default function ErrorState({ title = "Something went wrong", message = "Please try again later.", onRetry }) {
  return (
    <div className="text-center py-12 px-4 bg-red-50/50 rounded-xl border border-red-200">
      <div className="text-4xl mb-3">⚠️</div>
      <h3 className="text-lg font-semibold text-red-800">{title}</h3>
      <p className="text-red-600 text-sm mt-1 mb-4">{message}</p>
      {onRetry && (
        <Button variant="danger" onClick={onRetry}>Try Again</Button>
      )}
    </div>
  );
}

