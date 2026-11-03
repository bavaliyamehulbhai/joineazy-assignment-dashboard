import Badge from "../common/Badge";
import Button from "../common/Button";

export default function AssignmentCard({ assignment, onOpenSubmit }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-slate-900 text-lg">{assignment.title}</h3>
        <Badge status={assignment.status} />
      </div>
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{assignment.description}</p>
      <div className="text-xs text-slate-500 mb-5">Due: {assignment.dueDate}</div>
      <div className="flex items-center gap-3">
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
        >
          Open Drive
        </a>
        {assignment.status !== "submitted" && (
          <Button variant="primary" onClick={() => onOpenSubmit(assignment)}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

