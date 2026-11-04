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

  const isAdmin = currentUser?.role === "admin";
  const userInitial = currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/85 dark:bg-[#161618]/85 backdrop-blur-2xl transition-colors">
      <div className="flex h-14 items-center justify-between px-3.5 sm:px-6 max-w-7xl mx-auto">
        {/* Brand & User Greeting */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-sm shadow-xs transition-transform active:scale-95">
            J
          </div>

          <div className="min-w-0">
            <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight block">
              Joineazy
            </span>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium truncate max-w-[160px] sm:max-w-none -mt-0.5">
              {currentUser?.name}
            </p>
          </div>
        </div>

        {/* Right Action Icons: Symmetrical Apple iOS Pill Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Apple Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition active:scale-90 cursor-pointer"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-600" />
            )}
          </button>

          {/* User Avatar Circle */}
          {currentUser && (
            <div
              title={`${currentUser.name} (${currentUser.role})`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs shadow-xs select-none"
            >
              {userInitial}
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            aria-label="Logout of application"
            title="Logout"
            className="flex h-8 w-8 sm:w-auto sm:px-3 items-center justify-center gap-1.5 rounded-full sm:rounded-xl bg-black/[0.04] dark:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 dark:hover:bg-rose-500/20 transition active:scale-90 cursor-pointer"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline text-xs font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
