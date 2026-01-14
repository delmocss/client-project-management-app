import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../features/auth/components/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
]);
