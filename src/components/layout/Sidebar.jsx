import { LayoutDashboard, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Sidebar() {
  const { currentUser } = useApp();

  const basePath = currentUser?.role === "admin" ? "/admin" : "/student";
  const portalName = currentUser?.role === "admin" ? "Admin Portal" : "Student Portal";

  const links = [
    {
      label: "Dashboard",
      path: basePath,
      icon: LayoutDashboard,
    },
    {
      label: "Assignments",
      path: basePath,
      icon: BookOpen,
    },
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 md:block transition-colors">
      <div className="sticky top-16 h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.label}
                to={link.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                  }`
                }
              >
                <Icon size={18} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-700 dark:text-slate-300">Joineazy {portalName}</p>
          <p className="mt-1 truncate">User: {currentUser?.name}</p>
        </div>
      </div>
    </aside>
  );
}
