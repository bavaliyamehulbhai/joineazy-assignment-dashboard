import { Navigate } from "react-router-dom";

import { useApp } from "../context/AppContext";
import LoadingState from "../components/common/LoadingState";

export default function ProtectedRoute({ children, allowedRole }) {
  const { currentUser, isLoading } = useApp();

  if (isLoading) {
    return <LoadingState message="Verifying session..." />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return (
      <Navigate
        to={currentUser.role === "admin" ? "/admin" : "/student"}
        replace
      />
    );
  }

  return children;
}

