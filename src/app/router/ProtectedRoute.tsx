import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthContext } from "../../app/providers/AuthProvider";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
