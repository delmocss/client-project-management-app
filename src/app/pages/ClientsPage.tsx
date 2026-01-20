import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ClientForm from "../../features/clients/components/ClientForm";
import { useClients, useDeleteClient } from "../../features/clients/hooks";
import type { Client } from "../../types/client";

const ClientsPage = () => {
  const { data: clients, isLoading, isError } = useClients();
  const deleteMutation = useDeleteClient();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const ITEMS_PER_PAGE = 5;

  const handleDelete = async () => {
    if (!clientToDelete) return;
    await deleteMutation.mutateAsync(clientToDelete.id);
    setClientToDelete(null);
  };

  const filteredClients = clients?.filter((client) => {
    const term = search.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term)
    );
  });

  const totalItems = filteredClients?.length ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedClients = filteredClients?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-4"
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-between gap-4"
        >
          <h1 className="text-2xl font-semibold dark:text-white">Clients</h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            New Client
          </motion.button>
          <motion.input
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded placeholder-slate-400 dark:placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>

        {/* LOADING */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 transition-colors"
          >
            Loading clients...
          </motion.div>
        )}

        {/* ERROR */}
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-slate-800 p-4 rounded border border-slate-200 dark:border-slate-700 text-red-600 dark:text-red-400 transition-colors"
          >
            Error loading clients. Please try again.
          </motion.div>
        )}

        {/* EMPTY */}
        {!isLoading && !isError && clients && clients.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 p-8 rounded border border-slate-200 dark:border-slate-700 text-center transition-colors"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No clients found.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Create your first client by clicking "New Client" above.
            </p>
          </motion.div>
        )}

        {/* TABLE */}
        {clients && clients.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors shadow-md">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-slate-700 text-left border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="p-3 font-semibold text-gray-900 dark:text-white">
                    Name
                  </th>
                  <th className="p-3 font-semibold text-gray-900 dark:text-white">
                    Email
                  </th>
                  <th className="p-3 font-semibold text-gray-900 dark:text-white">
                    Company
                  </th>
                  <th className="p-3 font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedClients?.map((client, idx) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-t border-slate-200 dark:border-slate-700 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <td className="p-3 text-gray-900 dark:text-white">
                      {client.name}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {client.email}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {client.company ?? "-"}
                    </td>
                    <td className="p-3 space-x-2 text-sm">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setClientToEdit(client)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setClientToDelete(client)}
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
          <ClientForm onClose={() => setIsCreateOpen(false)} />
        </Modal>
      )}

      {/* EDIT */}
      {clientToEdit !== null && (
        <Modal onClose={() => setClientToEdit(null)}>
          <ClientForm
            initialData={clientToEdit}
            onClose={() => setClientToEdit(null)}
          />
        </Modal>
      )}

      {/* DELETE */}
      {clientToDelete !== null && (
        <Modal onClose={() => setClientToDelete(null)}>
          <ConfirmDialog
            title="Delete client"
            description={`Are you sure you want to delete "${clientToDelete.name}"? This action cannot be undone.`}
            onCancel={() => setClientToDelete(null)}
            onConfirm={handleDelete}
            loading={deleteMutation.isPending}
          />
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default ClientsPage;
