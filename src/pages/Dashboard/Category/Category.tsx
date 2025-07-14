/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Loader from "../../../components/Reusable/Loader/Loader";
import axios from "axios";
import Cookies from "js-cookie";
import AddCategoryModal from "./AddCategoryModal";
import { toast } from "sonner";

const Category = () => {
  const token = Cookies.get("accessToken");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://admin-delta-rosy.vercel.app/api/category",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(res);
        setCategories(res.data?.data?.categories);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  //   Delete category
  const deleteCategory = async (id: string) => {
    const toastId = toast.loading("Deleting user...");

    try {
      const res = await fetch(
        `https://admin-delta-rosy.vercel.app/api/category/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      toast.success("User deleted successfully", { id: toastId });
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.error(error);
    }
  };
  return (
    <div className="p-4 max-w-full">
      <button
        type="submit"
        className={`rounded-md px-4 py-2 font-medium text-white transition-all duration-300 cursor-pointer bg-primary-10 hover:bg-[#244F5B] active:scale-95 mb-4`}
        onClick={() => setIsAddCategoryModalOpen(true)}
      >
        Add People
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              {["Sl", "Name", "Action"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8}>
                  <div className="flex justify-center items-center gap-3 py-6">
                    <Loader size={25} />
                    <p className="text-gray-800">Please wait...</p>
                  </div>
                </td>
              </tr>
            ) : categories?.length > 0 ? (
              categories?.map((category, idx) => (
                <tr
                  key={category.id || idx}
                  className="hover:bg-gray-50 even:bg-white relative"
                >
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 border-b border-gray-200">
                    {category?.name}
                  </td>
                  <td>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      onClick={() => {
                        const confirmDelete = confirm(
                          `Are you sure you want to delete ${category.name}?`
                        );
                        if (confirmDelete) {
                          deleteCategory(category?.id || "");
                        }
                      }}
                    >
                      <FiTrash2 className="mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>
        {`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(10%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.2s ease forwards;
        }
      `}
      </style>

      {isAddCategoryModalOpen && (
        <AddCategoryModal onClose={() => setIsAddCategoryModalOpen(false)} />
      )}
    </div>
  );
};

export default Category;
