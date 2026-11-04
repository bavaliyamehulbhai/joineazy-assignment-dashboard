import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Sun, Moon, ArrowRight, ShieldCheck, GraduationCap } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { users, currentUser, login, isLoading, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState("");
  const [error, setError] = useState("");

  if (isLoading) {
    return null;
  }

  if (currentUser) {
    return (
      <Navigate
        to={currentUser.role === "admin" ? "/admin" : "/student"}
        replace
      />
    );
  }

  const handleQuickLogin = (userId) => {
    const result = login(userId);
    if (result.success) {
      navigate(result.user.role === "admin" ? "/admin" : "/student");
    }
  };

  const handleLogin = (e) => {
    e?.preventDefault();
    if (!selectedUserId) {
      setError("Please select an account to continue");
      return;
    }

    const result = login(selectedUserId);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  const adminUsers = users.filter((u) => u.role === "admin");
  const studentUsers = users.filter((u) => u.role === "student");

  return (
    <div className="relative min-h-screen bg-[#f5f5f7] dark:bg-[#000000] flex flex-col items-center justify-center px-4 py-8 transition-colors selection:bg-[#0071e3] selection:text-white">
      {/* Theme Toggle Button at Top-Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 dark:bg-[#1c1c1e]/80 border border-black/[0.06] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-[#2c2c2e] cursor-pointer shadow-xs transition active:scale-95"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-neutral-600" />
          )}
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Apple Brand Identity */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-xl shadow-xs">
            J
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Joineazy
          </h1>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Assignment & Review Workspace
          </p>
        </div>

        {/* Apple Frosted Card */}
        <div className="rounded-3xl bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none p-5 sm:p-7 space-y-5 transition-colors">
          {/* Quick 1-Click Persona Tiles */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
              Instant Access
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("student-1")}
                className="group flex flex-col items-start p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] hover:bg-[#0071e3]/10 dark:hover:bg-[#0071e3]/15 border border-black/[0.04] dark:border-white/[0.06] hover:border-[#0071e3]/30 transition text-left cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0071e3] mb-1">
                  <GraduationCap size={13} />
                  <span>Student</span>
                </div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate w-full">
                  Mehul Bavaliya
                </p>
                <span className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-0.5 group-hover:text-[#0071e3]">
                  <span>Sign in</span>
                  <ArrowRight size={10} />
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("admin-1")}
                className="group flex flex-col items-start p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] hover:bg-purple-500/10 dark:hover:bg-purple-500/15 border border-black/[0.04] dark:border-white/[0.06] hover:border-purple-500/30 transition text-left cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400 mb-1">
                  <ShieldCheck size={13} />
                  <span>Faculty</span>
                </div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate w-full">
                  Dr. Rajesh Patel
                </p>
                <span className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-0.5 group-hover:text-purple-600">
                  <span>Sign in</span>
                  <ArrowRight size={10} />
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-black/[0.04] dark:border-white/[0.06]" />
            <span className="absolute bg-white dark:bg-[#1c1c1e] px-2 text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
              or select any account
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            {error && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="user-select"
                className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500"
              >
                Choose Persona
              </label>

              <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] px-3.5 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white outline-none focus:border-[#0071e3] transition cursor-pointer"
              >
                <option value="" className="text-neutral-400">
                  Select a user account...
                </option>

                <optgroup label="Faculty / Administrators">
                  {adminUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </optgroup>

                <optgroup label="Cohort Students">
                  {studentUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0071e3] hover:bg-[#0077ed] px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-xs transition active:scale-[0.98] cursor-pointer"
            >
              Continue to Dashboard
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-[11px] text-neutral-400">
          Client-side persistence via localStorage • Zero external backend
        </p>
      </div>
    </div>
  );
}
