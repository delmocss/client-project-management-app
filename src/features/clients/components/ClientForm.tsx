import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "../schema";
import type { ClientFormValues } from "../schema";
import { useCreateClient } from "../hooks";
import { useUpdateClient } from "../hooks";
import type { Client } from "../../../types/client";

interface Props {
  initialData?: Client;
  onClose: () => void;
}

const ClientForm = ({ initialData, onClose }: Props) => {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          phone: initialData.phone,
          company: initialData.company,
        }
      : undefined,
  });

  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();

  const onSubmit = async (data: ClientFormValues) => {
    if (isEdit && initialData) {
      await updateMutation.mutateAsync({
        id: initialData.id,
        data,
      });
    } else {
      await createMutation.mutateAsync(data);
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">
        {isEdit ? "Edit Client" : "New Client"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Name
        </label>
        <input
          className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded placeholder-slate-400 dark:placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded placeholder-slate-400 dark:placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone
        </label>
        <input
          className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded placeholder-slate-400 dark:placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone"
          {...register("phone")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Company
        </label>
        <input
          className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded placeholder-slate-400 dark:placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Company"
          {...register("company")}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
            ? "Save changes"
            : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
