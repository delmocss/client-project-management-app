import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 bg-gradient-to-br from-slate-50 to-slate-200 p-6 overflow-y-auto">

          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
