import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../schema";
import type { ProjectFormValues } from "../schema";
import { useCreateProject, useUpdateProject } from "../hooks";
import type { Project } from "../../../types/project";
import type { Client } from "../../../types/client";

interface Props {
  initialData?: Project;
  clients: Client[] | undefined;
  onClose: () => void;
}

const ProjectForm = ({ initialData, clients, onClose }: Props) => {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          status: initialData.status,
          clientId: initialData.clientId,
        }
      : { status: "pending" },
  });

  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();

  const onSubmit = async (data: ProjectFormValues) => {
    if (isEdit && initialData) {
      await updateMutation.mutateAsync({
        id: initialData.id,
        data,
      });
    } else {
      await createMutation.mutateAsync({
        ...data,
        createdAt: new Date().toISOString(),
      });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">
        {isEdit ? "Edit Project" : "New Project"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Project Name
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
          Description
        </label>
        <textarea
          className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded placeholder-slate-400 dark:placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Description (optional)"
          rows={3}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Client
        </label>
        <select
          className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("clientId", { valueAsNumber: true })}
        >
          <option value="">Select a client</option>
          {clients?.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        {errors.clientId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.clientId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Status
        </label>
        <select
          className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("status")}
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
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
          {isSubmitting ? "Saving..." : isEdit ? "Save changes" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
