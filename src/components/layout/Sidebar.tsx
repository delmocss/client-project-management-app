import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks";
import { ROLES } from "../../utils/constants";

const Sidebar = () => {
  const { user } = useAuth();

  const linkClass =
    "block px-3 py-2 rounded hover:bg-slate-700 transition-colors";

  const activeClass =
    "bg-slate-800 font-semibold";

  return (
    <aside className="w-60 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 shadow-xl dark:from-slate-800 dark:to-slate-900 dark:shadow-2xl transition-colors">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Dashboard
        </NavLink>

        {user?.role === ROLES.ADMIN && (
          <>
            <NavLink
              to="/clients"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Clients
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Projects
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
