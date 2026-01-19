import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { loginRequest, getUserById } from "../../features/auth/api";

interface User {
  email: string;
  role: "admin" | "user";
}


interface JwtPayload {
  sub: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.clear();
      setUser(null);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const token = await loginRequest(email, password);

    localStorage.setItem("token", token);

    // 🔥 decodificar token
    const decoded = jwtDecode<JwtPayload>(token);
    const userId = decoded.sub;

    // 🔥 pedir usuario real
    const userData = await getUserById(userId);

    const user: User = {
      email: userData.email,
      role: userData.role,
    };

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
