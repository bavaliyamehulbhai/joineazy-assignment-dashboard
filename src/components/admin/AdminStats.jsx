import { ClipboardList, CheckCircle2, Clock3, Users } from "lucide-react";

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
      label: "Created",
      value: totalAssignments,
      subtext: "My assignments",
      icon: ClipboardList,
      iconColor: "text-[#0071e3] bg-[#0071e3]/10",
    },
    {
      label: "Cohort Size",
      value: students.length,
      subtext: "Enrolled students",
      icon: Users,
      iconColor: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
    },
    {
      label: "Submissions",
      value: totalSubmitted,
      subtext: "Received works",
      icon: CheckCircle2,
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Pending",
      value: totalPending,
      subtext: "Awaiting delivery",
      icon: Clock3,
      iconColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl bg-white dark:bg-[#1c1c1e] border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-black/[0.12] dark:hover:border-white/[0.15]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 tracking-tight">
                {stat.label}
              </span>
              <div className={`p-1.5 rounded-lg ${stat.iconColor}`}>
                <Icon size={14} strokeWidth={2.2} />
              </div>
            </div>

            <div className="mt-2 sm:mt-3">
              <p className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white tabular-nums">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-500 truncate mt-0.5">
                {stat.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
