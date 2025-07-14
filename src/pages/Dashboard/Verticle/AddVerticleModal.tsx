/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";
import axios from "axios";
import { FiX } from "react-icons/fi";
import TextInput from "../../../components/Reusable/TextInput/TextInput";

interface AddVerticleModalProps {
  onClose: () => void;
}
const AddVerticleModal: React.FC<AddVerticleModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const handAddCategory = async (formData: any) => {
    console.log(formData);
    const toastId = toast.loading("Loading...");
    const token = Cookies.get("accessToken");

    try {
      await axios.post(
        `https://admin-delta-rosy.vercel.app/api/verticles`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Verticle added successfully", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
      console.error("Add Error:", error);
    }
  };

  const onSubmit = async (data: any) => {
    await handAddCategory({ name: data.name });
    onClose();
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl h-fit overflow-y-auto rounded-lg shadow-lg p-6 relative animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            onClose();
            reset();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FiX size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add Verticle
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            label="Name"
            placeholder="Enter category"
            {...register("name", { required: "Category name is required" })}
            error={errors.name}
          />

          <button
            type="submit"
            className="w-full rounded-md bg-primary-10 hover:bg-[#244F5B] active:scale-95 px-4 py-2 text-white font-medium transition duration-300 cursor-pointer"
          >
            Add Verticle
          </button>
        </form>
      </div>

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}
      </style>
    </div>
  );
};

export default AddVerticleModal;
