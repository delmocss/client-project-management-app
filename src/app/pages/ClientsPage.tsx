import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import { useClients } from "../../features/clients/hooks";
import { useDeleteClient } from "../../features/clients/hooks";

import ClientForm from "../../features/clients/components/ClientForm";
import type { Client } from "../../types/client";

const ClientsPage = () => {
    // 🔒 HOOKS (TODOS DENTRO DEL COMPONENTE)
    const { data: clients, isLoading, isError } = useClients();
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;


    const deleteMutation = useDeleteClient();

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

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
            <div className="space-y-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Clients</h1>

                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-slate-900 text-white px-4 py-2 rounded"
                    >
                        New Client
                    </button>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}

                        className="w-full max-w-sm border p-2 rounded"
                    />
                </div>

                {/* LOADING */}
                {isLoading && (
                    <div className="bg-white p-4 rounded border">
                        Loading clients...
                    </div>
                )}

                {/* ERROR */}
                {isError && (
                    <div className="bg-white p-4 rounded border text-red-600">
                        Error loading clients
                    </div>
                )}

                {/* EMPTY */}
                {!isLoading && clients && clients.length === 0 && (
                    <div className="bg-white p-4 rounded border text-gray-500">
                        No clients found.
                    </div>
                )}

                {/* TABLE */}
                {clients && clients.length > 0 && (
                    <div className="bg-white rounded border overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Company</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedClients?.map((client) => (


                                    <tr
                                        key={client.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3">{client.name}</td>
                                        <td className="p-3">{client.email}</td>
                                        <td className="p-3">
                                            {client.company ?? "-"}
                                        </td>
                                        <td className="p-3 space-x-2 text-sm">
                                            <button
                                                onClick={() => setClientToEdit(client)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setClientToDelete(client)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {totalPages > 1 && (
                    <div className="flex justify-end items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}

            </div>

            {/* CREATE */}
            {isCreateOpen && (
                <Modal onClose={() => setIsCreateOpen(false)}>
                    <ClientForm onClose={() => setIsCreateOpen(false)} />
                </Modal>
            )}

            {/* EDIT */}
            {clientToEdit && (
                <Modal onClose={() => setClientToEdit(null)}>
                    <ClientForm
                        initialData={clientToEdit}
                        onClose={() => setClientToEdit(null)}
                    />
                </Modal>
            )}

            {/* DELETE */}
            {clientToDelete && (
                <Modal onClose={() => setClientToDelete(null)}>
                    <ConfirmDialog
                        title="Delete client"
                        description={`Are you sure you want to delete "${clientToDelete.name}"?`}
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
