import { BookOpen, CheckCircle2, Clock3 } from "lucide-react";

export default function StudentStats({ total = 0, submitted = 0, pending = 0 }) {
  const stats = [
    {
      label: "Total Assignments",
      value: total,
      icon: BookOpen,
      iconBg: "bg-slate-100 text-slate-700",
    },
    {
      label: "Submitted",
      value: submitted,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock3,
      iconBg: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">
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
