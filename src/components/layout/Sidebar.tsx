const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">CPM</h2>
      <nav className="space-y-3 text-sm">
        <div className="cursor-pointer hover:text-slate-300">Dashboard</div>
        <div className="cursor-pointer hover:text-slate-300">Clients</div>
        <div className="cursor-pointer hover:text-slate-300">Projects</div>
        <div className="cursor-pointer hover:text-slate-300">Tasks</div>
      </nav>
    </aside>
  );
};

export default Sidebar;
