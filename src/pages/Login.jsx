import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { users, currentUser, login, isLoading } = useApp();
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
            <span className="text-2xl font-bold text-slate-950">J</span>
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">
            Joineazy
          </h1>

          <p className="mt-2 text-slate-400 text-sm">
            Assignment & Review Dashboard
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8 border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-900">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select a demo account to continue.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Demo Account
              </label>

              <select
                value={selectedUserId}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 cursor-pointer"
              >
                <option value="">Select account</option>

                <optgroup label="Administrators">
                  {users
                    .filter((u) => u.role === "admin")
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        👨‍🏫 {user.name} ({user.email})
                      </option>
                    ))}
                </optgroup>

                <optgroup label="Students">
                  {users
                    .filter((u) => u.role === "student")
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        👨‍🎓 {user.name} ({user.email})
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>

            {error && (
              <p className="text-sm text-red-600 font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 cursor-pointer shadow-sm active:scale-[0.99]"
            >
              Continue
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 border-t border-slate-100 pt-4">
            Demo authentication — no password or backend required.
          </p>
        </div>
      </div>
    </div>
  );
}
