import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../features/auth/hooks";
import { useProjects } from "../../features/projects/hooks";
import { useClients } from "../../features/clients/hooks";

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === value) return;

    const increment = Math.ceil(value / 20);
    const timer = setTimeout(
      () => setCount(Math.min(count + increment, value)),
      30
    );

    return () => clearTimeout(timer);
  }, [count, value]);

  return <>{count}</>;
};

const StatCard = ({
  label,
  value,
  index,
}: {
  label: string;
  value: number;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1 + 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      className="glass card p-4 sm:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
          {label}
        </p>
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          whileInView={{ width: "30%" }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        />
      </div>
      <motion.p
        className="text-3xl font-semibold mt-3 text-gray-900 dark:text-white"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
      >
        <AnimatedCounter value={value} />
      </motion.p>
    </motion.div>
  );
};

const DashboardPage = () => {
  const { user } = useAuth();
  const { data: projects } = useProjects();
  const { data: clients } = useClients();

  const totalProjects = projects?.length ?? 0;
  const activeProjects =
    projects?.filter((p) => p.status === "active").length ?? 0;
  const completedProjects =
    projects?.filter((p) => p.status === "completed").length ?? 0;

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Welcome back{user?.email ? `, ${user.email}` : ""} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {user?.role === "admin"
              ? "Manage your clients and projects"
              : "Here is an overview of your projects"}
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total projects"
            value={totalProjects}
            index={0}
          />
          <StatCard
            label="Active projects"
            value={activeProjects}
            index={1}
          />
          <StatCard
            label="Completed projects"
            value={completedProjects}
            index={2}
          />

          {user?.role === "admin" && (
            <StatCard
              label="Total clients"
              value={clients?.length ?? 0}
              index={3}
            />
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default DashboardPage;
