import { useAuth } from "../../features/auth/hooks";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <div className="font-semibold">Client / Project Management</div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600">
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
