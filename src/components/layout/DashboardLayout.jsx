import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function DashboardLayout({ children }) {
  const { currentUser, assignments } = useApp();
  const isAdmin = currentUser?.role === "admin";
  const dashboardPath = isAdmin ? "/admin" : "/student";
  const assignmentsPath = isAdmin ? "/admin/assignments" : "/student/assignments";

  const relevantCount = isAdmin
    ? assignments.filter((a) => a.createdBy === currentUser?.id).length
    : assignments.filter((a) => a.assignedTo?.includes(currentUser?.id)).length;

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] flex flex-col transition-colors selection:bg-[#0071e3] selection:text-white">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content with bottom padding on mobile to account for fixed bottom tab bar */}
        <main className="min-w-0 flex-1 pb-24 md:pb-6">
          <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Apple iOS-Style Bottom Navigation Tab Bar (Mobile Only) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-black/[0.08] dark:border-white/[0.1] bg-white/85 dark:bg-[#161618]/85 backdrop-blur-2xl px-6 py-2 transition-colors shadow-[0_-2px_12px_rgba(0,0,0,0.04)] [padding-bottom:calc(0.5rem+env(safe-area-inset-bottom,0px))]"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Dashboard Tab */}
          <NavLink
            to={dashboardPath}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-1 px-4 rounded-xl transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? "text-[#0071e3] dark:text-[#2997ff] font-semibold"
                  : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <LayoutDashboard
                    size={21}
                    strokeWidth={isActive ? 2.4 : 1.8}
                  />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0071e3] dark:bg-[#2997ff]" />
                  )}
                </div>
                <span className="text-[11px] tracking-tight">Dashboard</span>
              </>
            )}
          </NavLink>

          {/* Assignments Tab */}
          <NavLink
            to={assignmentsPath}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-1 px-4 rounded-xl transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? "text-[#0071e3] dark:text-[#2997ff] font-semibold"
                  : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <BookOpen
                    size={21}
                    strokeWidth={isActive ? 2.4 : 1.8}
                  />
                  {relevantCount > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] flex items-center justify-center rounded-full bg-[#0071e3] text-white text-[9px] font-bold px-1 tabular-nums">
                      {relevantCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0071e3] dark:bg-[#2997ff]" />
                  )}
                </div>
                <span className="text-[11px] tracking-tight">Assignments</span>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
