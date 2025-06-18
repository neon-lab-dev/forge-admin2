/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import type { TUser } from "../../../types/users.types";
import TextInput from "../../../components/Reusable/TextInput/TextInput";

interface UpdateUserModalProps {
  userId: string;
  onClose: () => void;
  user: TUser | null;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  onClose,
  user,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      designation: "",
      station: "",
      role: "",
      photo: null,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        designation: user.designation || "",
        station: user.station || "",
        role: user.role || "",
        photo: undefined,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("designation", data.designation);
    formData.append("station", data.station);
    formData.append("role", data.role);

    if (data.photo && data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }

    // onUpdate(formData);
    onClose();
  };

  console.log(user);

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      {!user ? (
        <div
          className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 text-center animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-gray-600">Loading user data...</div>
        </div>
      ) : (
        <div
          className="bg-white w-full max-w-md h-[450px] md:h-[600px] overflow-y-auto rounded-lg shadow-lg p-6 relative animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FiX size={20} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Update user details
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {user?.photo && (
              <div className="flex flex-col items-center">
                <img
                  src={user.photo?.url}
                  alt="User"
                  className="w-24 h-24 object-cover rounded-full border border-gray-300 mb-2"
                />
                <span className="text-sm text-gray-600">Current photo</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Change Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0 file:text-sm file:font-semibold
               file:bg-primary-10 file:text-white hover:file:bg-[#244F5B]"
              />
            </div>

            <TextInput
              label="Name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              error={errors.name}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              error={errors.email}
            />
            <TextInput
              label="Designation"
              placeholder="Enter your designation"
              {...register("designation")}
              error={errors.designation}
            />
            <TextInput
              label="Station"
              placeholder="Enter your station"
              {...register("station")}
              error={errors.station}
            />
            <TextInput
              label="Role"
              placeholder="Enter user role"
              {...register("role")}
              error={errors.role}
            />
            <button
              type="submit"
              className="w-full rounded-md bg-primary-10 hover:bg-[#244F5B] active:scale-95 px-4 py-2 text-white font-medium transition duration-300"
            >
              Update User
            </button>
          </form>
        </div>
      )}

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

export default UpdateUserModal;
