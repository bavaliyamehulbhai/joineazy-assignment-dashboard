import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import StudentDashboard from "../pages/StudentDashboard";
import StudentAssignments from "../pages/StudentAssignments";
import AdminDashboard from "../pages/AdminDashboard";
import AdminAssignments from "../pages/AdminAssignments";
import AssignmentDetails from "../pages/AssignmentDetails";
import AdminAssignmentDetails from "../pages/AdminAssignmentDetails";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Student Protected Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/assignments"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentAssignments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/assignment/:id"
          element={
            <ProtectedRoute allowedRole="student">
              <AssignmentDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assignments"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminAssignments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assignment/:id"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminAssignmentDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
