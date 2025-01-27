import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../services/apiServices";
import toast from "react-hot-toast";

function useUserCrud() {
  const queryClient = useQueryClient();

  // Create User Hook
  const useCreateUser = ({
    queryKey = "user",
    resetForm = () => {},
    navigate = () => {}
  }) => {
    return useMutation({
      mutationFn: (userData) => makeRequest("/create", "POST", userData),
      onMutate: () => toast.loading("Creating user...", { duration: 500000 }),
      onSuccess: () => {
        queryClient.invalidateQueries([queryKey]);
        toast.dismiss();
        toast.success("User created successfully!", { duration: 5000 });
        resetForm();
        navigate("/");
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(`Creation failed: ${error.message}`);
      }
    });
  };

  // Fetch User Hook
  const useFetchUser = ({ queryKey = "user", userId }) => {
    return useQuery({
      queryKey: [queryKey, userId || "unknown"],
      queryFn: () => makeRequest(userId ? `/getUser/${userId}` : "/"),
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      select: (data) => (userId ? data : data?.users || []),
      onError: (error) => {
        toast.error(`Failed to fetch user: ${error.message}`);
      }
    });
  };

  // Update User Hook
  const useUpdateUser = ({ queryKey = "user", navigate = () => {} }) => {
    return useMutation({
      mutationFn: ({ id, updateData }) =>
        makeRequest(`/update/${id}`, "PUT", updateData),
      onMutate: async ({ updateData }) => {
        await queryClient.cancelQueries([queryKey]);
        const previousData = queryClient.getQueryData([queryKey]);
        queryClient.setQueryData([queryKey], (old) =>
          old?.map((item) =>
            item._id === updateData._id ? { ...item, ...updateData } : item
          )
        );
        return { previousData };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData([queryKey], context.previousData);
        toast.error("Update failed. Please try again.");
      },
      onSuccess: () => {
        toast.success("Update successful!");
      },
      onSettled: () => {
        queryClient.invalidateQueries([queryKey]);
        navigate("/");
      }
    });
  };

  // Delete User Hook
  const useDeleteUser = ({ queryKey = "user" }) => {
    return useMutation({
      mutationFn: (userId) => makeRequest(userId?"/delete/"+userId:'/delete',"DELETE"),
      onSuccess: () => {
        queryClient.invalidateQueries([queryKey]);
        toast.success("User deleted successfully!");
      },
      onError: (error) => {
        toast.error(`Deletion failed: ${error.message}`);
      }
    });
  };

  return {
    useCreateUser,
    useFetchUser,
    useUpdateUser,
    useDeleteUser
  };
}

export default useUserCrud;
