import { LayoutDashboard, BookOpen, ShieldCheck, GraduationCap, User } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Sidebar() {
  const { currentUser, assignments } = useApp();

  const isAdmin = currentUser?.role === "admin";
  const dashboardPath = isAdmin ? "/admin" : "/student";
  const assignmentsPath = isAdmin ? "/admin/assignments" : "/student/assignments";

  const relevantCount = isAdmin
    ? assignments.filter((a) => a.createdBy === currentUser?.id).length
    : assignments.filter((a) => a.assignedTo?.includes(currentUser?.id)).length;

  const links = [
    {
      label: "Dashboard",
      path: dashboardPath,
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Assignments",
      path: assignmentsPath,
      icon: BookOpen,
      badge: relevantCount > 0 ? relevantCount : null,
    },
  ];

  return (
    <aside className="hidden w-56 shrink-0 border-r border-black/[0.06] dark:border-white/[0.08] bg-white/50 dark:bg-[#121214]/50 backdrop-blur-xl md:block transition-colors">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] p-3 flex flex-col justify-between">
        <div>
          {/* Section Header */}
          <div className="px-2.5 py-1.5 mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            <span>Menu</span>
            {isAdmin ? (
              <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold">
                <ShieldCheck size={11} />
                Admin
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[#0071e3] dark:text-[#2997ff] font-semibold">
                <GraduationCap size={11} />
                Student
              </span>
            )}
          </div>

          <nav className="space-y-0.5">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.label}
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#0071e3] text-white shadow-xs font-semibold"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-neutral-900 dark:hover:text-neutral-100"
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} strokeWidth={2} />
                    <span>{link.label}</span>
                  </div>

                  {link.badge !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold tabular-nums`}
                    >
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Compact Apple Account Card */}
        <Link
          to="/profile"
          title="View Profile Settings"
          className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.04] dark:border-white/[0.06] p-2.5 transition block active:scale-[0.98] group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/[0.08] dark:bg-white/[0.1] text-neutral-900 dark:text-white font-semibold text-xs group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
              {currentUser?.name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-neutral-900 dark:text-white truncate group-hover:text-[#0071e3] transition-colors">
                {currentUser?.name}
              </p>
              <p className="text-[10px] text-neutral-400 truncate">
                {currentUser?.email}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
}
