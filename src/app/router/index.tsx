import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import DashboardPage from "../pages/DashboardPage";
import ClientsPage from "../pages/ClientsPage";
import ProjectsPage from "../pages/ProjectsPage";
import LoginPage from "../../features/auth/components/LoginPage";

import { ROLES } from "../../utils/constants";

const router = createBrowserRouter([
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
  {
    path: "/projects",
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={[ROLES.ADMIN]}>
          <ProjectsPage />
        </RoleRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
