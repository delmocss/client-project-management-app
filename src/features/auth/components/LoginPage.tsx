import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema"; 
import type {LoginFormValues } from "../schema"; 

import { useState } from "react";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError("");

    try {
      await login(data.email, data.password);
    } catch {
      setServerError("Credenciales incorrectas");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded w-80 space-y-4"
      >
        <h1 className="text-xl font-semibold">Iniciar sesión</h1>

        {serverError && (
          <p className="text-red-500 text-sm">{serverError}</p>
        )}

        {/* EMAIL */}
        <div className="space-y-1">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="space-y-1">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border p-2 rounded"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-slate-900 text-white py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Entrando..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
