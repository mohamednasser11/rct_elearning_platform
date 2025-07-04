import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function AuthLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div style={{ height: "100vh" }}></div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
