import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function GuestLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <></>;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
