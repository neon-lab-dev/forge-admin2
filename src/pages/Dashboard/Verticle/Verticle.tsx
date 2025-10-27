/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Loader from "../../../components/Reusable/Loader/Loader";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import AddVerticleModal from "./AddVerticleModal";

const Verticle = () => {
  const token = Cookies.get("accessToken");
  const [loading, setLoading] = useState(true);
  const [verticles, setVerticles] = useState<any[]>([]);
  const [isAddVerticleModalOpen, setIsAddVerticleModalOpen] = useState(false);

  // Fetch all categories
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://forge-server-pearl.vercel.app/api/verticles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setVerticles(res.data?.data?.Verticles);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  //   Delete category
  const deleteVerticle = async (id: string) => {
    const toastId = toast.loading("Deleting user...");

    try {
      const res = await fetch(
        `https://forge-server-pearl.vercel.app/api/verticles/${id}`,
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
        throw new Error("Failed to delete");
      }

      toast.success("Deleted successfully", { id: toastId });
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.error(error);
    }
  };
  return (
    <div className="p-4 max-w-full">
      <div className="flex justify-end">
        <button
          type="submit"
          className={`rounded-md px-4 py-2 font-medium text-white transition-all duration-300 cursor-pointer bg-primary-10 hover:bg-[#244F5B] active:scale-95 mb-4`}
          onClick={() => setIsAddVerticleModalOpen(true)}
        >
          Add Verticle
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center gap-3 py-6">
            <Loader size={25} />
            <p className="text-gray-800">Please wait...</p>
          </div>
        ) : verticles?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {verticles.map((verticle, idx) => (
              <div
                key={verticle.id || idx}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="text-sm text-gray-500 mb-1">Sl: {idx + 1}</div>
                <div className="text-lg font-semibold text-gray-800 mb-3">
                  {verticle?.name}
                </div>
                <button
                  className="flex items-center text-sm text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => {
                    const confirmDelete = confirm(
                      `Are you sure you want to delete ${verticle.name}?`
                    );
                    if (confirmDelete) {
                      deleteVerticle(verticle?.id || "");
                    }
                  }}
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No verticles found
          </div>
        )}
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

      {isAddVerticleModalOpen && (
        <AddVerticleModal onClose={() => setIsAddVerticleModalOpen(false)} />
      )}
    </div>
  );
};

export default Verticle;
