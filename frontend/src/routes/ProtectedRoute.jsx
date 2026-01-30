import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/context/UserContext";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
