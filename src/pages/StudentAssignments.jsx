import { useMemo, useState } from "react";
import { Search, ArrowUpDown, X } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import AssignmentCard from "../components/student/AssignmentCard";
import EmptyState from "../components/common/EmptyState";

import { useApp } from "../context/AppContext";
import { isOverdue } from "../utils/helpers";

export default function StudentAssignments() {
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

  // Filter & Search
  const filteredAssignments = studentAssignments.filter((assignment) => {
    const studentStatus =
      assignment.submissions?.[currentUser.id] || "pending";
    const overdue =
      studentStatus === "pending" && isOverdue(assignment.dueDate);

    const matchesSearch =
      assignment.title.toLowerCase().includes(search.toLowerCase()) ||
      assignment.description.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "pending") {
      return studentStatus === "pending" && !overdue;
    }
    if (statusFilter === "submitted") {
      return studentStatus === "submitted";
    }
    if (statusFilter === "overdue") {
      return overdue;
    }

    return true;
  });

  // Sort
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
    return 0;
  });

  // Counts for Segmented Tabs
  const allCount = studentAssignments.length;
  const pendingCount = studentAssignments.filter(
    (a) =>
      (a.submissions?.[currentUser.id] || "pending") === "pending" &&
      !isOverdue(a.dueDate)
  ).length;
  const submittedCount = studentAssignments.filter(
    (a) => a.submissions?.[currentUser.id] === "submitted"
  ).length;
  const overdueCount = studentAssignments.filter(
    (a) =>
      (a.submissions?.[currentUser.id] || "pending") === "pending" &&
      isOverdue(a.dueDate)
  ).length;

  const filterTabs = [
    { id: "all", label: "All", count: allCount },
    { id: "pending", label: "Pending", count: pendingCount },
    { id: "submitted", label: "Submitted", count: submittedCount },
    { id: "overdue", label: "Overdue", count: overdueCount },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Page Title & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Assignments
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Browse, access materials, and submit your coursework.
            </p>
          </div>
          <span className="self-start sm:self-auto text-xs font-medium text-neutral-400 tabular-nums">
            {sortedAssignments.length} of {studentAssignments.length} shown
          </span>
        </div>

        {/* Apple Filter & Search Controls */}
        <div className="space-y-3">
          {/* Row 1: Apple Segmented Pill Control */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="bg-black/[0.04] dark:bg-white/[0.08] p-1 rounded-xl inline-flex gap-1 overflow-x-auto max-w-full">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] ${
                    statusFilter === tab.id
                      ? "bg-white dark:bg-[#2c2c2e] text-neutral-900 dark:text-white shadow-xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded-md ${
                      statusFilter === tab.id
                        ? "bg-black/[0.06] dark:bg-white/[0.1]"
                        : "opacity-60"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort Selector */}
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
              </select>
            </div>
          </div>

          {/* Row 2: Search Input */}
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

        {/* Assignments Grid or Empty State */}
        {sortedAssignments.length === 0 ? (
          <EmptyState
            title="No assignments match your filter"
            description={
              search
                ? `No assignments found for "${search}". Try clearing your search.`
                : "No assignments in this category."
            }
            actionLabel={search || statusFilter !== "all" ? "Reset Filters" : undefined}
            onAction={() => {
              setSearch("");
              setStatusFilter("all");
            }}
          />
        ) : (
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

