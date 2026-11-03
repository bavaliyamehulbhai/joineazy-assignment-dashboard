import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import AdminStats from "../components/admin/AdminStats";
import AssignmentTable from "../components/admin/AssignmentTable";
import AssignmentModal from "../components/admin/AssignmentModal";
import DeleteConfirmDialog from "../components/common/DeleteConfirmDialog";

import { useApp } from "../context/AppContext";

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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 mb-2">
              Faculty / Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome, {currentUser.name} 👨‍🏫
            </h1>
            <p className="mt-1 text-sm text-slate-500">
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

        {/* Assignment Table & Mobile Card View */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              My Created Assignments
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {adminAssignments.length} Assignment{adminAssignments.length !== 1 ? "s" : ""}
            </span>
          </div>

          <AssignmentTable
            assignments={adminAssignments}
            onEdit={(assignment) => {
              setEditingAssignment(assignment);
              setShowModal(true);
            }}
            onDelete={(assignment) => {
              setDeletingAssignment(assignment);
            }}
          />
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
