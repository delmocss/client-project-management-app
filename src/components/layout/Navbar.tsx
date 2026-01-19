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
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
