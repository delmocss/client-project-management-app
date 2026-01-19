import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useClients } from "../../features/clients/hooks";
import Modal from "../../components/ui/Modal";
import CreateClientForm from "../../features/clients/components/CreateClientForm";

const ClientsPage = () => {
  const { data, isLoading } = useClients();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Clients</h1>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded"
          >
            New Client
          </button>
        </div>

        {isLoading && <p>Loading clients...</p>}

        {data && data.length === 0 && (
          <p className="text-gray-500">No clients yet.</p>
        )}

        {data && data.length > 0 && (
          <div className="bg-white rounded border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Company</th>
                </tr>
              </thead>
              <tbody>
                {data.map((client) => (
                  <tr key={client.id} className="border-t">
                    <td className="p-3">{client.name}</td>
                    <td className="p-3">{client.email}</td>
                    <td className="p-3">
                      {client.company ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <CreateClientForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default ClientsPage;
