import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuthStore } from "../store/useAuthStore";

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user } = useAuthStore();
  const token = Cookies.get("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || "")) {
    return <Navigate to="/bookings" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;