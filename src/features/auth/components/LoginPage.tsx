import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { loginSchema } from "../schema"; 
import type { LoginFormValues } from "../schema"; 
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
      <motion.form
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-800 p-6 rounded-lg w-80 space-y-4 shadow-xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold dark:text-white"
        >
          Iniciar sesión
        </motion.h1>

        {serverError && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-red-500 text-sm"
          >
            {serverError}
          </motion.p>
        )}

        {/* EMAIL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-1"
        >
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs"
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        {/* PASSWORD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-1"
        >
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs"
            >
              {errors.password.message}
            </motion.p>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? "Entrando..." : "Login"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default LoginPage;
