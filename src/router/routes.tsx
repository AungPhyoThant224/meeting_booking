import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import BookingsPage from "../pages/BookingsPage";

const Dashboard = () => <div>Dashboard</div>;
const Users = () => <div>User Management</div>;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Navigate to="/bookings" replace /> },
          { path: "/bookings", element: <BookingsPage /> },
          
          {
            element: <ProtectedRoute allowedRoles={["OWNER", "ADMIN"]} />,
            children: [{ path: "/dashboard", element: <Dashboard /> }],
          },

          {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [{ path: "/users", element: <Users /> }],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/bookings" replace />,
  },
]);

export default router;