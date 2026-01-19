import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RouleRoute";
import DashboardPage from "../pages/DashboardPage";
import ClientsPage from "../pages/ClientsPage";
import LoginPage from "../../features/auth/components/LoginPage";
import { ROLES } from "../../utils/constants";

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
  {
    path: "/clients",
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={[ROLES.ADMIN]}>
          <ClientsPage />
        </RoleRoute>
      </ProtectedRoute>
    ),
  },
]);
