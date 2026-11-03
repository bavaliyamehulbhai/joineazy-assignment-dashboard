import { useMemo, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import StudentStats from "../components/student/StudentStats";
import AssignmentCard from "../components/student/AssignmentCard";
import ProgressBar from "../components/common/ProgressBar";
import EmptyState from "../components/common/EmptyState";

import { useApp } from "../context/AppContext";

import {
  getStudentProgress,
  getSubmittedCount,
  getPendingCount,
} from "../utils/calculations";

export default function StudentDashboard() {
  const { currentUser, assignments, isLoading } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const studentAssignments = useMemo(() => {
    if (!currentUser) return [];

    return assignments.filter((assignment) =>
      assignment.assignedTo?.includes(currentUser.id)
    );
  }, [assignments, currentUser]);

  if (isLoading || !currentUser) {
    return null;
  }

  const total = studentAssignments.length;
  const submitted = getSubmittedCount(assignments, currentUser.id);
  const pending = getPendingCount(assignments, currentUser.id);
  const progress = getStudentProgress(assignments, currentUser.id);

  const filteredAssignments = studentAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(search.toLowerCase()) ||
      assignment.description.toLowerCase().includes(search.toLowerCase());

    const studentStatus =
      assignment.submissions?.[currentUser.id] || "pending";

    const matchesStatus =
      statusFilter === "all" || studentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <section>
          <p className="text-sm font-medium text-slate-500">
            Student Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl tracking-tight">
            Welcome, {currentUser.name} 👋
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Keep track of your assigned tasks and submission progress in one place.
          </p>
        </section>

        {/* Metric Cards */}
        <StudentStats
          total={total}
          submitted={submitted}
          pending={pending}
        />

        {/* Progress Bar Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Overall Completion
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {submitted} of {total} assignments submitted
            </p>
          </div>

          <ProgressBar percentage={progress} />
        </section>

        {/* Search & Filter Toolbar */}
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assignments by title or keyword..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 sm:w-48 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="pending">Pending</option>
          </select>
        </section>

        {/* Assignment Cards Section */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              My Assignments
            </h2>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Showing {filteredAssignments.length} of {total}
            </span>
          </div>

          {filteredAssignments.length === 0 ? (
            <EmptyState
              title="No assignments found"
              description={
                search || statusFilter !== "all"
                  ? "Try adjusting your search query or status filter."
                  : "You currently have no assignments assigned."
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
