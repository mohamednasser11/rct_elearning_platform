import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
