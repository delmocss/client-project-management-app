interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  title,
  description,
  onConfirm,
  onCancel,
  loading,
}: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold dark:text-white">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
