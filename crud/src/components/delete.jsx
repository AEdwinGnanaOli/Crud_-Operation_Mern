import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import useUserCrud from "../hooks/useUserCrud";

export default function Delete({ userId, children, onClose, open }) {
  const { useDeleteUser } = useUserCrud();
  const { mutate } = useDeleteUser({ queryKey: "user" });

  const handleDelete = () => {
    if (userId) {
      mutate(userId, {
        onSuccess: () => {
          toast.success("User deleted successfully!");
        },
        onError: () => {
          toast.error("Failed to delete the user.");
        },
      });
      onClose();
    } else {
      toast.error("Invalid user ID.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-95 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="dialog-title"
    >
      <div className="bg-white w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-2xl shadow-lg p-6 animate-fade-in">
        {/* Header with Icon */}
        <div className="flex justify-center items-center mb-4">
          <DeleteIcon className="text-red-500 text-6xl" />
        </div>

        {/* Content Section */}
        <div className="text-center text-gray-700 text-lg font-medium mb-6">
          {children}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          >
            Close
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

Delete.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};
