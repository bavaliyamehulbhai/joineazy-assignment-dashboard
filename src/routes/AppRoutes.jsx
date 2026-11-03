import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import StudentDashboard from "../pages/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AssignmentDetails from "../pages/AssignmentDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/student/assignment/:id" element={<AssignmentDetails />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/assignment/:id" element={<AssignmentDetails />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

