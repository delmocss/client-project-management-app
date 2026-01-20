import { useAuth } from "../../features/auth/hooks";
import { useTheme } from "../../app/providers/ThemeProvider";



const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();


  return (
    <header className="h-14 bg-white dark:bg-slate-800 border-b dark:border-slate-700 flex items-center justify-between px-6 transition-colors">
      <div className="font-semibold dark:text-white">Client / Project Management</div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white transition-colors hover:bg-slate-200 dark:hover:bg-slate-600">
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        {user && (
          <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
            {user.email} · {user.role}
          </span>
        )}

        <button
          onClick={logout}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-slate-800 hover:-translate-y-[1px] active:translate-y-0 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
