import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMoreVertical, FiTrash2, FiEdit2 } from "react-icons/fi";

const usersData = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    designation: "Manager",
    station: "Dhaka",
    role: "Admin",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    designation: "Developer",
    station: "Chittagong",
    role: "User",
  },
];

const Users = () => {
  const { register, watch } = useForm({ defaultValues: { email: "" } });
  const searchTerm = watch("email");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const filteredUsers = usersData.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="p-4 max-w-full">
      <div className="mb-4 max-w-sm">
        <input
          id="email"
          type="text"
          placeholder="Search by name or email"
          {...register("email")}
          className="flex h-11 w-full rounded-md border border-primary-10/30 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-transform focus:scale-[1.02] focus:ring-2 focus:ring-primary-10 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              {[
                "Sl",
                "Image",
                "Name",
                "Email",
                "Designation",
                "Station",
                "Role",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, idx) => (
                <tr key={user.id} className="hover:bg-gray-50 even:bg-white">
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 border-b border-gray-200">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {user.designation}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {user.station}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-200">
                    {user.role}
                  </td>
                  <td className="relative px-4 py-3 text-sm border-b border-gray-200">
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="flex items-center p-1 rounded hover:bg-gray-200 transition"
                      aria-label="Open actions menu"
                    >
                      <FiMoreVertical size={20} />
                    </button>

                    {dropdownOpen === user.id && (
                      <div
                        className="absolute right-0 top-full mt-2 w-40 rounded-md bg-white shadow-lg border border-gray-200 z-10
                          opacity-0 animate-fadeIn opacity-100"
                        style={{ animationFillMode: "forwards" }}
                      >
                        <ul>
                          <li>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() =>
                                alert(`Edit user ${user.name} details`)
                              }
                            >
                              <FiEdit2 className="mr-2" /> Update
                            </button>
                          </li>
                          <li>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              onClick={() =>
                                alert(`Delete user ${user.name} confirmation`)
                              }
                            >
                              <FiTrash2 className="mr-2" /> Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
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
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(-10%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Users;
