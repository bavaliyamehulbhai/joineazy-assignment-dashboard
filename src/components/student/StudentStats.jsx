import { BookOpen, CheckCircle2, Clock3 } from "lucide-react";

export default function StudentStats({ total = 0, submitted = 0, pending = 0 }) {
  const stats = [
    {
      label: "Assigned",
      value: total,
      subtext: "Total coursework",
      icon: BookOpen,
      iconColor: "text-[#0071e3] bg-[#0071e3]/10",
    },
    {
      label: "Submitted",
      value: submitted,
      subtext: "Verified complete",
      icon: CheckCircle2,
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Pending",
      value: pending,
      subtext: "Action required",
      icon: Clock3,
      iconColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
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
