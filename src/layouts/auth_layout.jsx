import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import NotFound from "../pages/NotFoundPage/404NotFound";

export default function AuthLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <NotFound />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
