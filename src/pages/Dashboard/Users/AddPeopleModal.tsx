/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import SelectDropdown from "../../../components/Reusable/SelectDropdown/SelectDropdown";
import { TiDeleteOutline } from "react-icons/ti";
import Loader from "../../../components/Reusable/Loader/Loader";

interface AddPeopleModalProps {
  onClose: () => void;
}

export type RoleField = "verticle" | "category" | "role";

export const verticleOptions = [
  "Forge Labs",
  "Fort",
  "Academy",
  "Sales",
  "Human Resources",
  "Product",
  "Operations",
  "Finance",
];
export const categoryOptions = [
  "Board of Governors",
  "Executive Leadership",
  "Executives General Management",
  "Executives Program Management",
  "Experts",
  "Enablers",
];

const AddPeopleModal: React.FC<AddPeopleModalProps> = ({ onClose }) => {
  const token = Cookies.get("accessToken");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [verticles, setVerticles] = useState<any[]>([]);

  // Fetch all categories
 useEffect(() => {
  const fetchData = async () => {
    try {
      const [categoryRes, verticleRes] = await Promise.all([
        axios.get("https://admin-delta-rosy.vercel.app/api/category", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }),
        axios.get("https://admin-delta-rosy.vercel.app/api/verticles", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }),
      ]);

      const categories = categoryRes.data?.data?.categories?.map(
        (cat: any) => cat.name
      );

      const verticles = verticleRes.data?.data?.Verticles?.map(
        (v: any) => v.name
      );

      setCategories(categories || []);
      setVerticles(verticles || []);
    } catch (err) {
      console.error("Failed to fetch categories or verticles:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [token]);


  const [rolesData, setRolesData] = useState([
    { verticle: "", category: "", role: "" },
    { verticle: "", category: "", role: "" },
    { verticle: "", category: "", role: "" },
  ]);

  const handleRoleChange = (index: number, field: RoleField, value: string) => {
    const updated = [...rolesData];
    updated[index][field] = value;
    setRolesData(updated);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handAddPeople = async (formData: FormData) => {
    const toastId = toast.loading("Loading...");
    try {
      await axios.post(
        `https://admin-delta-rosy.vercel.app/api/people`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("People added successfully", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
      console.error("Add Error:", error);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("linkedInUrl", data.linkedInUrl);
    formData.append("writeUp", data.writeUp);
    formData.append("station", data.station);
    formData.append("attributes", JSON.stringify(rolesData));

    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    await handAddPeople(formData);
    onClose();
    window.location.reload();
  };

  const handleDeleteRole = (index: number) => {
    if (rolesData.length <= 1) return; // Prevent deleting the last item

    const updated = rolesData.filter((_, i) => i !== index);
    setRolesData(updated);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      {loading ? (
        <div
          className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 text-center animate-scaleIn h-[450px] md:h-[600px] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Loader size={40} />
        </div>
      ) : (
        <div
          className="bg-white w-full max-w-xl h-[450px] md:h-[600px] overflow-y-auto rounded-lg shadow-lg p-6 relative animate-scaleIn"
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
            Add People
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("file")}
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
              label="LinkedIn Url"
              placeholder="Enter your linkedIn profile url"
              {...register("linkedInUrl")}
              error={errors.linkedInUrl}
              isRequired={false}
            />
            <TextInput
              label="Bio"
              placeholder="Enter your bio"
              {...register("writeUp")}
              error={errors.writeUp}
              isRequired={false}
            />
            <TextInput
              label="Station"
              placeholder="Enter your station"
              {...register("station")}
              error={errors.station}
              isRequired={false}
            />

            <div className="space-y-4">
              {/* Dynamic Multiple Fields */}
              {rolesData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="grid grid-cols-3 gap-4">
                    <SelectDropdown
                      label="Verticle"
                      options={verticles}
                      value={entry.verticle}
                      onChange={(e) =>
                        handleRoleChange(index, "verticle", e.target.value)
                      }
                    />
                    <SelectDropdown
                      label="Categories"
                      options={categories}
                      value={entry.category}
                      onChange={(e) =>
                        handleRoleChange(index, "category", e.target.value)
                      }
                    />
                    <TextInput
                      label="Role"
                      placeholder="Enter role"
                      value={entry.role}
                      onChange={(e) =>
                        handleRoleChange(index, "role", e.target.value)
                      }
                    />
                  </div>
                  <TiDeleteOutline
                    onClick={() => handleDeleteRole(index)}
                    className="text-red-500 text-4xl cursor-pointer mt-8"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    setRolesData([
                      ...rolesData,
                      { verticle: "", category: "", role: "" },
                    ])
                  }
                  type="button"
                  className="block text-gray-500 font-Inter font-medium cursor-pointer italic"
                >
                  +Add More
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary-10 hover:bg-[#244F5B] active:scale-95 px-4 py-2 text-white font-medium transition duration-300 cursor-pointer"
            >
              Add People
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

export default AddPeopleModal;
