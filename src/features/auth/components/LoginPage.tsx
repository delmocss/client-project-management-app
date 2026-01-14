import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-6 rounded w-80">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-slate-900 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
