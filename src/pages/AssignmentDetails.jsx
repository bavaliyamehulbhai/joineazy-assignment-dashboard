import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function AssignmentDetails() {
  const { id } = useParams();
  const { currentUser, assignments } = useApp();
  const navigate = useNavigate();

  const assignment = assignments.find((a) => a.id === id);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() =>
            navigate(currentUser?.role === "admin" ? "/admin" : "/student")
          }
          className="mb-6 inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          ← Back to Dashboard
        </button>

        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">
            {assignment ? assignment.title : "Assignment Details"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {assignment
              ? assignment.description
              : "Assignment details will be rendered here."}
          </p>
        </div>
      </div>
    </div>
  );
}
