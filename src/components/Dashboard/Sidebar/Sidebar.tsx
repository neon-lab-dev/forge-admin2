import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiUsers } from "react-icons/fi";

const links = [
  {
    name: "Peoples",
    path: "/dashboard/users",
    icon: <FiUsers size={18} />,
  },
//   {
//     name: "Products",
//     path: "/dashboard/products",
//     icon: <FiBox size={18} />,
//   },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-[260px]" : "w-[60px]"
      } sticky top-0 transition-all duration-300 bg-primary-10 text-white shadow-lg flex flex-col min-h-screen h-full`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-3 hover:bg-[#244f5b] transition-colors self-end"
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-primary-10 font-semibold"
                  : "hover:bg-[#244f5b] text-white"
              }`}
            >
              {/* Show Icon always */}
              <span>{link.icon}</span>
              {/* Show text only when sidebar is open */}
              {isOpen && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
