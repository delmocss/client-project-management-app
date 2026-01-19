import DashboardLayout from "../../components/layout/DashboardLayout";
import { useClients } from "../../features/clients/hooks";

const ClientsPage = () => {
  const { data, isLoading, isError } = useClients();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Clients</h1>

          <button className="bg-slate-900 text-white px-4 py-2 rounded">
            New Client
          </button>
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
        {!isLoading && data?.length === 0 && (
          <div className="bg-white p-4 rounded border text-gray-500">
            No clients found.
          </div>
        )}

        {/* LIST */}
        {data && data.length > 0 && (
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
                {data.map((client) => (
                  <tr
                    key={client.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">{client.name}</td>
                    <td className="p-3">{client.email}</td>
                    <td className="p-3">
                      {client.company ?? "-"}
                    </td>
                    <td className="p-3 text-sm text-slate-600">
                      Edit · Delete
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage;
