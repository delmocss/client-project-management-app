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
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
