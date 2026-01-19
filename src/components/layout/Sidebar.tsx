const Sidebar = () => {
  return (
    <aside className="w-60 bg-slate-900 text-white p-4">
      <nav className="space-y-2">
        <a href="/" className="block px-3 py-2 rounded hover:bg-slate-800">
          Dashboard
        </a>
        <a
          href="/clients"
          className="block px-3 py-2 rounded hover:bg-slate-800"
        >
          Clients
        </a>
        <a
          href="/projects"
          className="block px-3 py-2 rounded hover:bg-slate-800"
        >
          Projects
        </a>
        <a
          href="/tasks"
          className="block px-3 py-2 rounded hover:bg-slate-800"
        >
          Tasks
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
