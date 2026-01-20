import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { useProjects, useDeleteProject } from "../../features/projects/hooks";
import { useClients } from "../../features/clients/hooks";
import ProjectForm from "../../features/projects/components/ProjectForm";
import type { Project } from "../../types/project";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

const ProjectsPage = () => {
  const { data: projects, isLoading, isError } = useProjects();
  const { data: clients } = useClients();
  const deleteMutation = useDeleteProject();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const ITEMS_PER_PAGE = 8;

  const getClientName = (clientId: number) =>
    clients?.find((c) => c.id === clientId)?.name ?? "Unassigned";

  const handleDelete = async () => {
    if (!projectToDelete) return;
    await deleteMutation.mutateAsync(projectToDelete.id);
    setProjectToDelete(null);
  };

  const filteredProjects = projects?.filter((project) => {
    const term = search.toLowerCase();
    return (
      project.name.toLowerCase().includes(term) ||
      getClientName(project.clientId).toLowerCase().includes(term)
    );
  });

  const totalItems = filteredProjects?.length ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <DashboardLayout>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between gap-4"
        >
          <h1 className="text-2xl font-semibold dark:text-white">Projects</h1>

          <motion.input
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            type="text"
            placeholder="Search by name or client..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded placeholder-slate-400 dark:placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateOpen(true)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            New Project
          </motion.button>
        </motion.div>

        {/* LOADING */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 transition-colors"
          >
            Loading projects...
          </motion.div>
        )}

        {/* ERROR */}
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400 transition-colors"
          >
            Error loading projects. Please try again.
          </motion.div>
        )}

        {/* EMPTY */}
        {!isLoading && !isError && projects && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 p-8 rounded border border-slate-200 dark:border-slate-700 text-center transition-colors"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No projects found.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Create your first project by clicking "New Project" above.
            </p>
          </motion.div>
        )}

        {/* TABLE */}
        {projects && projects.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors shadow-md">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-slate-700 text-left border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="p-3 font-semibold text-gray-900 dark:text-white">
                    Name
                  </th>
                  <th className="p-3 font-semibold text-gray-900 dark:text-white">
                    Client
                  </th>
                  <th className="p-3 font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="p-3 font-semibold text-gray-900 dark:text-white">
                    Created
                  </th>
                  <th className="p-3 font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedProjects?.map((project, idx) => (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-t border-slate-200 dark:border-slate-700 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <td className="p-3 font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {getClientName(project.clientId)}
                    </td>
                    <td className="p-3">
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.05 + 0.1 }}
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusStyles[project.status]}`}
                      >
                        {project.status}
                      </motion.span>
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 space-x-2 text-sm">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setProjectToEdit(project)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setProjectToDelete(project)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0"
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>

      {/* CREATE */}
      {isCreateOpen && (
        <Modal onClose={() => setIsCreateOpen(false)}>
          <ProjectForm
            clients={clients}
            onClose={() => setIsCreateOpen(false)}
          />
        </Modal>
      )}

      {/* EDIT */}
      {projectToEdit && (
        <Modal onClose={() => setProjectToEdit(null)}>
          <ProjectForm
            initialData={projectToEdit}
            clients={clients}
            onClose={() => setProjectToEdit(null)}
          />
        </Modal>
      )}

      {/* DELETE */}
      {projectToDelete && (
        <Modal onClose={() => setProjectToDelete(null)}>
          <ConfirmDialog
            title="Delete project"
            description={`Are you sure you want to delete "${projectToDelete.name}"? This action cannot be undone.`}
            onCancel={() => setProjectToDelete(null)}
            onConfirm={handleDelete}
            loading={deleteMutation.isPending}
          />
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default ProjectsPage;
