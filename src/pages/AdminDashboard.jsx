import { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import AdminStats from "../components/admin/AdminStats";
import AssignmentTable from "../components/admin/AssignmentTable";
import AssignmentModal from "../components/admin/AssignmentModal";
import DeleteConfirmDialog from "../components/common/DeleteConfirmDialog";
import EmptyState from "../components/common/EmptyState";

import { useApp } from "../context/AppContext";
import { getAssignmentProgress } from "../utils/calculations";

export default function AdminDashboard() {
  const {
    assignments,
    users,
    currentUser,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    isLoading,
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deletingAssignment, setDeletingAssignment] = useState(null);

  const [search, setSearch] = useState("");
  const [completionFilter, setCompletionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const adminAssignments = useMemo(() => {
    if (!currentUser) return [];

    return assignments.filter(
      (assignment) => assignment.createdBy === currentUser.id
    );
  }, [assignments, currentUser]);

  if (isLoading || !currentUser) {
    return null;
  }

  const cohortStudents = users.filter((u) => u.role === "student");

  // Filter assignments by search and class completion progress
  const filteredAssignments = adminAssignments.filter((assignment) => {
    const query = search.toLowerCase();
    const matchesSearch =
      assignment.title.toLowerCase().includes(query) ||
      assignment.description.toLowerCase().includes(query);

    const progress = getAssignmentProgress(assignment);
    let matchesCompletion = true;

    if (completionFilter === "completed") {
      matchesCompletion = progress === 100;
    } else if (completionFilter === "inProgress") {
      matchesCompletion = progress > 0 && progress < 100;
    } else if (completionFilter === "pending") {
      matchesCompletion = progress === 0;
    }

    return matchesSearch && matchesCompletion;
  });

  // Sort assignments
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortBy === "dueDateAsc") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === "dueDateDesc") {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
    return 0;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800/60 mb-2">
              Faculty / Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome, {currentUser.name} 👨‍🏫
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage your created assignments, student allocation, and track live class progress.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingAssignment(null);
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition cursor-pointer shadow-sm active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Create Assignment</span>
          </button>
        </div>

        {/* Admin Overview Metrics */}
        <AdminStats
          assignments={adminAssignments}
          users={users}
        />

        {/* Search, Filter & Sort Toolbar */}
        <section className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              id="admin-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or description..."
              aria-label="Search your created assignments"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-12 py-2.5 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-900 dark:focus:border-indigo-500 focus:ring-2 focus:ring-slate-200 dark:focus:ring-indigo-950 placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Completion Filter */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 shadow-2xs">
              <SlidersHorizontal className="h-4 w-4 text-slate-400 shrink-0" />
              <select
                value={completionFilter}
                onChange={(e) => setCompletionFilter(e.target.value)}
                aria-label="Filter assignments by class completion"
                className="w-full sm:w-36 bg-transparent text-xs sm:text-sm text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="all" className="dark:bg-slate-900">All Progress</option>
                <option value="completed" className="dark:bg-slate-900">Completed (100%)</option>
                <option value="inProgress" className="dark:bg-slate-900">In Progress</option>
                <option value="pending" className="dark:bg-slate-900">Not Started (0%)</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 shadow-2xs">
              <ArrowUpDown className="h-4 w-4 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort assignments"
                className="w-full sm:w-44 bg-transparent text-xs sm:text-sm text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="newest" className="dark:bg-slate-900">Newest Created</option>
                <option value="oldest" className="dark:bg-slate-900">Oldest Created</option>
                <option value="dueDateAsc" className="dark:bg-slate-900">Due Date: Earliest</option>
                <option value="dueDateDesc" className="dark:bg-slate-900">Due Date: Latest</option>
              </select>
            </div>
          </div>
        </section>

        {/* Assignment Table / Empty States */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              My Created Assignments
            </h2>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              Showing {sortedAssignments.length} of {adminAssignments.length}
            </span>
          </div>

          {adminAssignments.length === 0 ? (
            <EmptyState
              title="No assignments created yet"
              description="You have not created any assignments. Click the button below to publish your first task."
              actionLabel="+ Create Assignment"
              onAction={() => {
                setEditingAssignment(null);
                setShowModal(true);
              }}
            />
          ) : sortedAssignments.length === 0 ? (
            <EmptyState
              title="No matching assignments found"
              description="No assignments matched your search keyword or completion filter."
              actionLabel="Reset Filters"
              onAction={() => {
                setSearch("");
                setCompletionFilter("all");
                setSortBy("newest");
              }}
            />
          ) : (
            <AssignmentTable
              assignments={sortedAssignments}
              onEdit={(assignment) => {
                setEditingAssignment(assignment);
                setShowModal(true);
              }}
              onDelete={(assignment) => {
                setDeletingAssignment(assignment);
              }}
            />
          )}
        </section>

        {/* Create / Edit Modal */}
        <AssignmentModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingAssignment(null);
          }}
          students={cohortStudents}
          editingAssignment={editingAssignment}
          onCreate={createAssignment}
          onUpdate={updateAssignment}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmDialog
          isOpen={Boolean(deletingAssignment)}
          title={deletingAssignment?.title}
          onClose={() => setDeletingAssignment(null)}
          onConfirm={() => {
            if (deletingAssignment) {
              deleteAssignment(deletingAssignment.id);
              setDeletingAssignment(null);
            }
          }}
        />
      </div>
    </DashboardLayout>
  );
}
