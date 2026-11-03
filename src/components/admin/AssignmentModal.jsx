import { useEffect, useState } from "react";
import { X, CheckSquare, Square } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  dueDate: "",
  driveLink: "",
  assignedTo: [],
};

export default function AssignmentModal({
  isOpen,
  onClose,
  students = [],
  editingAssignment = null,
  onCreate,
  onUpdate,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const isEditing = Boolean(editingAssignment);

  useEffect(() => {
    if (editingAssignment) {
      setForm({
        title: editingAssignment.title || "",
        description: editingAssignment.description || "",
        dueDate: editingAssignment.dueDate || "",
        driveLink: editingAssignment.driveLink || "",
        assignedTo: editingAssignment.assignedTo || [],
      });
    } else {
      setForm(emptyForm);
    }

    setError("");
  }, [editingAssignment, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const toggleStudent = (studentId) => {
    setForm((prev) => {
      const alreadySelected = prev.assignedTo.includes(studentId);
      return {
        ...prev,
        assignedTo: alreadySelected
          ? prev.assignedTo.filter((id) => id !== studentId)
          : [...prev.assignedTo, studentId],
      };
    });
    setError("");
  };

  const selectAllStudents = () => {
    setForm((prev) => ({
      ...prev,
      assignedTo: students.map((student) => student.id),
    }));
    setError("");
  };

  const clearStudents = () => {
    setForm((prev) => ({
      ...prev,
      assignedTo: [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Assignment title is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Assignment description is required.");
      return;
    }

    if (!form.dueDate) {
      setError("Due date is required.");
      return;
    }

    if (!form.driveLink.trim()) {
      setError("Google Drive link is required.");
      return;
    }

    if (!form.driveLink.includes("drive.google.com")) {
      setError("Please enter a valid Google Drive link (e.g., https://drive.google.com/...).");
      return;
    }

    if (form.assignedTo.length === 0) {
      setError("Please assign at least one student.");
      return;
    }

    if (isEditing) {
      onUpdate(editingAssignment.id, form);
    } else {
      onCreate(form);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 px-4 py-8 backdrop-blur-xs flex items-center justify-center animate-in fade-in duration-200">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {isEditing ? "Edit Assignment" : "Create New Assignment"}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {isEditing
                ? "Update assignment instructions and student allocation."
                : "Fill details and assign to all or selected cohort students."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs sm:text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Assignment Title *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. React Dashboard Challenge"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Description & Requirements *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Provide clear assignment instructions, deliverables, and guidelines..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {/* Due Date & Drive Link Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Due Date *
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Google Drive Link *
              </label>
              <input
                type="url"
                name="driveLink"
                value={form.driveLink}
                onChange={handleChange}
                placeholder="https://drive.google.com/..."
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          {/* Student Allocation Section */}
          <div className="pt-2">
            <div className="mb-2.5 flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Student Allocation *
                </label>
                <p className="text-xs text-slate-500">
                  Select which students should receive this assignment.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAllStudents}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer transition"
                >
                  Select All ({students.length})
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={clearStudents}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer transition"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="max-h-48 space-y-1.5 overflow-y-auto rounded-xl border border-slate-200 p-2.5 bg-slate-50/50">
              {students.map((student) => {
                const isSelected = form.assignedTo.includes(student.id);

                return (
                  <div
                    key={student.id}
                    onClick={() => toggleStudent(student.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition select-none ${
                      isSelected
                        ? "border-blue-200 bg-blue-50/70"
                        : "border-transparent bg-white hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isSelected ? (
                        <CheckSquare className="h-4 w-4 text-blue-600 shrink-0" />
                      ) : (
                        <Square className="h-4 w-4 text-slate-400 shrink-0" />
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900">
                          {student.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {student.email}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-blue-100 text-blue-700"
                          : "text-slate-400"
                      }`}
                    >
                      {isSelected ? "Assigned" : "Unassigned"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>{form.assignedTo.length} of {students.length} students assigned</span>
              {form.assignedTo.length === students.length && (
                <span className="text-emerald-600 font-medium">✓ Assigned to All</span>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col-reverse gap-2.5 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer shadow-sm transition active:scale-95"
            >
              {isEditing ? "Save Changes" : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
