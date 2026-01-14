import { useAuthContext } from "../../app/providers/AuthProvider";

export const useAuth = () => {
  const { isAuthenticated, login, logout } = useAuthContext();

  return {
    isAuthenticated,
    login,
    logout,
  };
};
