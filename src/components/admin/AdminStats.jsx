import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

export default function AdminStats({ assignments = [], users = [] }) {
  const students = users.filter((user) => user.role === "student");

  const totalAssignments = assignments.length;

  const totalAssignedSlots = assignments.reduce((total, assignment) => {
    return total + (assignment.assignedTo?.length || 0);
  }, 0);

  const totalSubmitted = assignments.reduce((total, assignment) => {
    return (
      total +
      Object.values(assignment.submissions || {}).filter(
        (status) => status === "submitted"
      ).length
    );
  }, 0);

  const totalPending = Math.max(0, totalAssignedSlots - totalSubmitted);

  const stats = [
    {
      label: "My Assignments",
      value: totalAssignments,
      icon: ClipboardList,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      label: "Cohort Students",
      value: students.length,
      icon: Users,
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Submitted",
      value: totalSubmitted,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending Submissions",
      value: totalPending,
      icon: Clock3,
      iconBg: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                {stat.label}
              </p>

              <div className={`p-2 rounded-xl ${stat.iconBg}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
