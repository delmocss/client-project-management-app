import DashboardLayout from "../../components/layout/DashboardLayout";

const ClientsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Clients</h1>

          {/* En el siguiente paso será un modal o página */}
          <button className="bg-slate-900 text-white px-4 py-2 rounded">
            New Client
          </button>
        </div>

        {/* Placeholder del listado */}
        <div className="bg-white rounded border p-4">
          <p className="text-gray-500">
            Aquí irá el listado de clientes.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientsPage;
