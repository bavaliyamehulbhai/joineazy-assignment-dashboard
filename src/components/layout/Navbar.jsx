import { LogOut, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../context/AppContext";

export default function Navbar() {
  const { currentUser, logout, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 dark:bg-indigo-600 shadow-sm">
            <span className="font-bold text-white text-base">J</span>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Joineazy
            </p>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              Assignment & Review Dashboard
            </p>
          </div>
        </div>

        {/* User profile, Theme Toggle & Logout */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>

          {currentUser && (
            <div className="hidden text-right sm:block border-l border-slate-200 dark:border-slate-800 pl-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {currentUser.name}
              </p>
              <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                {currentUser.role}
              </p>
            </div>
          )}

          <button
            onClick={handleLogout}
            aria-label="Logout of application"
            className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-sm active:scale-95"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
