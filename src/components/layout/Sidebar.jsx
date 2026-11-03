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
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
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
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={18} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-500">
          <p className="font-semibold text-slate-700">Joineazy {portalName}</p>
          <p className="mt-1">Logged in as {currentUser?.name}</p>
        </div>
      </div>
    </aside>
  );
}
