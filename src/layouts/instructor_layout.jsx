import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function InstructorLayout() {
  const { isLoading, user } = useAuth();

  if (isLoading) return <></>;

  if (user.isStudent) return <Navigate to="/" replace />;

  return <Outlet />;
}
