import { useAuth } from "../../features/auth/hooks";

const Navbar = () => {
  const { user } = useAuth();

  console.log("USER FROM CONTEXT:", user);

  return (
    <header className="h-14 bg-white border-b flex items-center px-6">
      {user && <span>{user.email}</span>}
    </header>
  );
};

export default Navbar;
