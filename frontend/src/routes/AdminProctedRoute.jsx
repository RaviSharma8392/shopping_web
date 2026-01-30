import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/context/UserContext";

const AdminProctedRoute = () => {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) return null;

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminProctedRoute;
