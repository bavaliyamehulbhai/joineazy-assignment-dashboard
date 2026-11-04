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
  onSubmit,
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

    if (onSubmit) {
      onSubmit(form);
    } else if (isEditing && onUpdate) {
      onUpdate(editingAssignment.id, form);
    } else if (onCreate) {
      onCreate(form);
    }

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assignment-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-4 py-6 backdrop-blur-sm flex items-center justify-center transition-opacity"
    >
      <div className="w-full max-w-xl rounded-2xl bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-2xl overflow-hidden my-auto transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] px-5 py-3.5">
          <div>
            <h2
              id="assignment-modal-title"
              className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white tracking-tight"
            >
              {isEditing ? "Edit Assignment" : "New Assignment"}
            </h2>
            <p className="text-[11px] text-neutral-400">
              {isEditing
                ? "Update instructions and student cohort"
                : "Enter task details and allocate to students"}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 p-5">
          {error && (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3.5 py-2 text-xs font-medium text-rose-600 dark:text-rose-400">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="assignment-title"
              className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
            >
              Title *
            </label>
            <input
              id="assignment-title"
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. React Dashboard Challenge"
              className="w-full rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] px-3.5 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-[#0071e3] transition"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="assignment-desc"
              className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
            >
              Description *
            </label>
            <textarea
              id="assignment-desc"
              name="description"
              required
              value={form.description}
              onChange={handleChange}
              rows={2}
              placeholder="Provide clear assignment instructions and guidelines..."
              className="w-full resize-none rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] px-3.5 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-[#0071e3] transition"
            />
          </div>

          {/* Due Date & Drive Link */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="assignment-duedate"
                className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
              >
                Due Date *
              </label>
              <input
                id="assignment-duedate"
                type="date"
                name="dueDate"
                required
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] px-3.5 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-[#0071e3] transition"
              />
            </div>

            <div>
              <label
                htmlFor="assignment-drivelink"
                className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
              >
                Google Drive Link *
              </label>
              <input
                id="assignment-drivelink"
                type="url"
                name="driveLink"
                required
                value={form.driveLink}
                onChange={handleChange}
                placeholder="https://drive.google.com/..."
                className="w-full rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] px-3.5 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-[#0071e3] transition"
              />
            </div>
          </div>

          {/* Student Allocation */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Cohort Allocation *
                </label>
                <p className="text-[10px] text-neutral-400">
                  Select students who should receive this assignment
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={selectAllStudents}
                  className="text-xs font-medium text-[#0071e3] hover:underline cursor-pointer"
                >
                  Select All ({students.length})
                </button>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <button
                  type="button"
                  onClick={clearStudents}
                  className="text-xs font-medium text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="max-h-40 space-y-1 overflow-y-auto rounded-xl border border-black/[0.06] dark:border-white/[0.08] p-2 bg-black/[0.02] dark:bg-white/[0.02]">
              {students.map((student) => {
                const isSelected = form.assignedTo.includes(student.id);

                return (
                  <div
                    key={student.id}
                    onClick={() => toggleStudent(student.id)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition select-none ${
                      isSelected
                        ? "bg-[#0071e3]/10 text-neutral-900 dark:text-white"
                        : "hover:bg-black/[0.04] dark:hover:bg-white/[0.05] text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isSelected ? (
                        <CheckSquare className="h-4 w-4 text-[#0071e3] shrink-0" />
                      ) : (
                        <Square className="h-4 w-4 text-neutral-400 shrink-0" />
                      )}
                      <div>
                        <p className="text-xs font-medium leading-tight">
                          {student.name}
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          {student.email}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#0071e3]/15 text-[#0071e3] dark:text-[#2997ff]"
                          : "text-neutral-400"
                      }`}
                    >
                      {isSelected ? "Assigned" : "Unassigned"}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-1.5 text-[11px] text-neutral-400">
              {form.assignedTo.length} of {students.length} students selected
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#0071e3] hover:bg-[#0077ed] px-4 py-1.5 text-xs font-medium text-white shadow-xs transition active:scale-[0.98] cursor-pointer"
            >
              {isEditing ? "Save Changes" : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
