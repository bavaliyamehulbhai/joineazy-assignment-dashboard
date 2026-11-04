import { useMemo, useState } from "react";
import { Plus, Search, ArrowUpDown, X } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import AssignmentTable from "../components/admin/AssignmentTable";
import AssignmentModal from "../components/admin/AssignmentModal";
import DeleteConfirmDialog from "../components/admin/DeleteConfirmDialog";
import EmptyState from "../components/common/EmptyState";

import { useApp } from "../context/AppContext";
import { getAssignmentProgress } from "../utils/calculations";

export default function AdminAssignments() {
  const {
    currentUser,
    assignments,
    users,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    isLoading,
  } = useApp();

  const [search, setSearch] = useState("");
  const [filterProgress, setFilterProgress] = useState("all");
  const [sortBy, setSortBy] = useState("dueDateAsc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  // Role isolation: Only assignments created by this admin
  const adminAssignments = useMemo(() => {
    if (!currentUser) return [];
    return assignments.filter(
      (assignment) => assignment.createdBy === currentUser.id
    );
  }, [assignments, currentUser]);

  const students = useMemo(() => {
    return users.filter((user) => user.role === "student");
  }, [users]);

  // Filtering
  const filteredAssignments = adminAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(search.toLowerCase()) ||
      assignment.description.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    const progress = getAssignmentProgress(assignment);
    if (filterProgress === "completed") {
      return progress === 100;
    }
    if (filterProgress === "in-progress") {
      return progress < 100;
    }

    return true;
  });

  // Sorting
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (sortBy === "dueDateAsc") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === "dueDateDesc") {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
    if (sortBy === "titleAsc") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "progressDesc") {
      return getAssignmentProgress(b) - getAssignmentProgress(a);
    }
    return 0;
  });

  if (isLoading || !currentUser) {
    return null;
  }

  // Create & Edit Handlers
  const handleOpenCreate = () => {
    setEditingAssignment(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (assignment) => {
    setEditingAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleSaveAssignment = (formData) => {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, formData);
    } else {
      createAssignment(formData);
    }
    setIsModalOpen(false);
    setEditingAssignment(null);
  };

  // Delete Handlers
  const handleOpenDelete = (assignment) => {
    setAssignmentToDelete(assignment);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (assignmentToDelete) {
      deleteAssignment(assignmentToDelete.id);
      setIsDeleteDialogOpen(false);
      setAssignmentToDelete(null);
    }
  };

  // Segmented control counts
  const allCount = adminAssignments.length;
  const inProgressCount = adminAssignments.filter(
    (a) => getAssignmentProgress(a) < 100
  ).length;
  const completedCount = adminAssignments.filter(
    (a) => getAssignmentProgress(a) === 100
  ).length;

  const tabs = [
    { id: "all", label: "All", count: allCount },
    { id: "in-progress", label: "In Progress", count: inProgressCount },
    { id: "completed", label: "Completed", count: completedCount },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header & Primary Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Coursework & Assignments
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Create, edit, and track cohort submissions.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white px-3.5 py-2 text-xs font-medium shadow-xs transition active:scale-[0.98] cursor-pointer"
          >
            <Plus size={14} />
            <span>New Assignment</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* Apple Segmented Pill Tabs */}
            <div className="bg-black/[0.04] dark:bg-white/[0.08] p-1 rounded-xl inline-flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterProgress(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] ${
                    filterProgress === tab.id
                      ? "bg-white dark:bg-[#2c2c2e] text-neutral-900 dark:text-white shadow-xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded-md ${
                      filterProgress === tab.id
                        ? "bg-black/[0.06] dark:bg-white/[0.1]"
                        : "opacity-60"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-2.5 py-1.5 shadow-2xs">
              <ArrowUpDown size={12} className="text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-medium text-neutral-700 dark:text-neutral-300 outline-none cursor-pointer"
              >
                <option value="dueDateAsc">Due: Earliest First</option>
                <option value="dueDateDesc">Due: Latest First</option>
                <option value="titleAsc">Title: A to Z</option>
                <option value="progressDesc">Completion: High to Low</option>
              </select>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search assignments by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] pl-9 pr-9 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none focus:border-[#0071e3] transition shadow-2xs"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Assignment Table / Empty State */}
        {sortedAssignments.length === 0 ? (
          <EmptyState
            title="No assignments match your view"
            description={
              search
                ? `No assignments found for "${search}". Try clearing your search.`
                : "No assignments in this category."
            }
            actionLabel={
              search || filterProgress !== "all"
                ? "Reset Filters"
                : "+ Create First Assignment"
            }
            onAction={() => {
              if (search || filterProgress !== "all") {
                setSearch("");
                setFilterProgress("all");
              } else {
                handleOpenCreate();
              }
            }}
          />
        ) : (
          <AssignmentTable
            assignments={sortedAssignments}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        )}
      </div>

      {/* Create / Edit Modal */}
      <AssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingAssignment={editingAssignment}
        onSubmit={handleSaveAssignment}
        students={students}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        assignmentTitle={assignmentToDelete?.title || ""}
      />
    </DashboardLayout>
  );
}

