import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Builder from "../pages/Builder";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/builder" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/builder"
        element={
          <ProtectedRoute>
            <Builder />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/builder" />} />
    </Routes>
  );
}
