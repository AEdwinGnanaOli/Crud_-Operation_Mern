import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {  updateItem } from "../services/apiServices";
import toast from "react-hot-toast";
import useForm from "..//hooks/formHook";
import useUserCrud from "../hooks/useUserCrud";
import { makeRequest } from "../services/apiServices";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { form, handleChange, setForm } = useForm({
    name: "",
    email: "",
    age: ""
  });

  const { useUpdateUser, useFetchUser } = useUserCrud();
  const { data, isLoading, isError } = useFetchUser({
    queryKey: "user",
    userId: id
  });
  const { mutate } = useUpdateUser({ queryKey: "user", navigate });
  console.log(data);
  useEffect(() => {
    if (data) setForm({ ...data });
  }, [data, setForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({ id, updateData: form });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-teal-400 to-orange-500 m-3 ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Add User
          </h2>

          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter the name"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter the email"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={form.age}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-4 focus:ring-green-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
