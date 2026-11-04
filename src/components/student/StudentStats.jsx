import { BookOpen, CheckCircle2, Clock3 } from "lucide-react";

export default function StudentStats({ total = 0, submitted = 0, pending = 0 }) {
  const stats = [
    {
      label: "Total Assignments",
      value: total,
      icon: BookOpen,
      iconBg: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    },
    {
      label: "Submitted",
      value: submitted,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock3,
      iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {stat.value}
                </p>
              </div>

              <div className={`rounded-xl p-3 ${stat.iconBg}`}>
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
