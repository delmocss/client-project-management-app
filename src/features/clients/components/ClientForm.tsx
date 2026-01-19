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
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Client" : "New Client"}
      </h2>

      <div>
        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          className="w-full border p-2 rounded"
          placeholder="Phone"
          {...register("phone")}
        />
      </div>

      <div>
        <input
          className="w-full border p-2 rounded"
          placeholder="Company"
          {...register("company")}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-900 text-white px-4 py-2 rounded disabled:opacity-50"
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
