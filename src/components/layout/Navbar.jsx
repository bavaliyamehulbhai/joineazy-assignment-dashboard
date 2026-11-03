import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../context/AppContext";

export default function Navbar() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 shadow-sm">
            <span className="font-bold text-white text-base">J</span>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900 tracking-tight">
              Joineazy
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">
              Assignment Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">
              {currentUser?.name}
            </p>
            <p className="text-xs capitalize text-slate-500">
              {currentUser?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 cursor-pointer shadow-sm active:scale-95"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
