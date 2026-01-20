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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-800 p-6 rounded w-80 space-y-4 shadow-xl"
      >
        <h1 className="text-xl font-semibold dark:text-white">Iniciar sesión</h1>

        {serverError && (
          <p className="text-red-500 text-sm">{serverError}</p>
        )}

        {/* EMAIL */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded placeholder-slate-400 dark:placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded placeholder-slate-400 dark:placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? "Entrando..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
