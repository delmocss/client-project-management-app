import { motion } from "framer-motion";
import { useAuthContext } from "../../app/providers/AuthProvider";
import { useTheme } from "../../app/providers/ThemeProvider";



const Navbar = () => {
  const { user, logout } = useAuthContext();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 bg-white dark:bg-slate-800 border-b dark:border-slate-700 flex items-center justify-between px-6 transition-colors">
      <div className="font-semibold dark:text-white">Client / Project Management</div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95"
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        {user && (
          <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
            {user.email} · {user.role}
          </span>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 shadow-md hover:shadow-lg"
        >
          Logout
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
