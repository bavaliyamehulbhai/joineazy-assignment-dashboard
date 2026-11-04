import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
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

  const handleLogin = (e) => {
    e?.preventDefault();
    if (!selectedUserId) {
      setError("Please select a user");
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

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12 transition-colors">
      {/* Theme Toggle Button at Top-Right */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition shadow-2xs"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-slate-600" />
          )}
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 dark:bg-indigo-600 shadow-md">
            <span className="text-2xl font-bold text-white">J</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Joineazy
          </h1>

          <p className="mt-1.5 text-slate-500 dark:text-slate-400 text-sm">
            Assignment & Review Dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl sm:p-8 border border-slate-200/80 dark:border-slate-800 transition-colors">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select a demo account to sign in.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="account-select"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Demo Account
              </label>

              <select
                id="account-select"
                value={selectedUserId}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-900 dark:focus:border-indigo-500 focus:ring-2 focus:ring-slate-200 dark:focus:ring-indigo-950 cursor-pointer"
              >
                <option value="" className="dark:bg-slate-900">Select account</option>

                <optgroup label="Administrators" className="dark:bg-slate-900">
                  {users
                    .filter((u) => u.role === "admin")
                    .map((user) => (
                      <option key={user.id} value={user.id} className="dark:bg-slate-900">
                        👨‍🏫 {user.name} ({user.email})
                      </option>
                    ))}
                </optgroup>

                <optgroup label="Students" className="dark:bg-slate-900">
                  {users
                    .filter((u) => u.role === "student")
                    .map((user) => (
                      <option key={user.id} value={user.id} className="dark:bg-slate-900">
                        👨‍🎓 {user.name} ({user.email})
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>

            {error && (
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 dark:bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:hover:bg-indigo-500 cursor-pointer shadow-sm active:scale-[0.99]"
            >
              Continue
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-4">
            Demo authentication — no password or backend required.
          </p>
        </div>
      </div>
    </div>
  );
}
