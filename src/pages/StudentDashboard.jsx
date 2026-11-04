import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import StudentStats from "../components/student/StudentStats";
import AssignmentCard from "../components/student/AssignmentCard";
import ProgressBar from "../components/common/ProgressBar";
import EmptyState from "../components/common/EmptyState";

import { useApp } from "../context/AppContext";
import { isOverdue } from "../utils/helpers";

import {
  getStudentProgress,
  getSubmittedCount,
  getPendingCount,
} from "../utils/calculations";

export default function StudentDashboard() {
  const { currentUser, assignments, isLoading } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDateAsc");

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

  // Search & Status Filtering
  const filteredAssignments = studentAssignments.filter((assignment) => {
    const studentStatus =
      assignment.submissions?.[currentUser.id] || "pending";
    const overdue =
      studentStatus === "pending" && isOverdue(assignment.dueDate);

    const matchesSearch =
      assignment.title.toLowerCase().includes(search.toLowerCase()) ||
      assignment.description.toLowerCase().includes(search.toLowerCase());

    let matchesStatus = true;
    if (statusFilter === "submitted") {
      matchesStatus = studentStatus === "submitted";
    } else if (statusFilter === "pending") {
      matchesStatus = studentStatus === "pending" && !overdue;
    } else if (statusFilter === "overdue") {
      matchesStatus = overdue;
    }

    return matchesSearch && matchesStatus;
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
    if (sortBy === "titleDesc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <section>
          <span className="inline-block px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-full border border-indigo-200 dark:border-indigo-800/60 mb-2">
            Student Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome, {currentUser.name} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track your tasks, monitor due dates, and record verified submissions.
          </p>
        </section>

        {/* Metric Cards */}
        <StudentStats
          total={total}
          submitted={submitted}
          pending={pending}
        />

        {/* Progress Bar Section */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Overall Submission Progress
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {submitted} of {total} assignments completed
            </p>
          </div>

          <ProgressBar percentage={progress} />
        </section>

        {/* Search, Filter & Sort Toolbar */}
        <section className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              id="student-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assignments by title or keyword..."
              aria-label="Search assignments"
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
            {/* Status Filter */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 shadow-2xs">
              <SlidersHorizontal className="h-4 w-4 text-slate-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter assignments by status"
                className="w-full sm:w-36 bg-transparent text-xs sm:text-sm text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="all" className="dark:bg-slate-900">All Status</option>
                <option value="pending" className="dark:bg-slate-900">Pending</option>
                <option value="submitted" className="dark:bg-slate-900">Submitted</option>
                <option value="overdue" className="dark:bg-slate-900">Overdue</option>
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
                <option value="dueDateAsc" className="dark:bg-slate-900">Due Date: Earliest</option>
                <option value="dueDateDesc" className="dark:bg-slate-900">Due Date: Latest</option>
                <option value="titleAsc" className="dark:bg-slate-900">Title: A-Z</option>
                <option value="titleDesc" className="dark:bg-slate-900">Title: Z-A</option>
              </select>
            </div>
          </div>
        </section>

        {/* Assignment Cards Section */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              My Assignments
            </h2>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              Showing {sortedAssignments.length} of {total}
            </span>
          </div>

          {studentAssignments.length === 0 ? (
            <EmptyState
              title="No assignments assigned yet"
              description="Your instructor has not allocated any assignments to your account."
            />
          ) : sortedAssignments.length === 0 ? (
            <EmptyState
              title="No matching assignments found"
              description="No tasks match your current search query or filter combination."
              actionLabel="Reset Filters"
              onAction={() => {
                setSearch("");
                setStatusFilter("all");
                setSortBy("dueDateAsc");
              }}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {sortedAssignments.map((assignment) => (
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
