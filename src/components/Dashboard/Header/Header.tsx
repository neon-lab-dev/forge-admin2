import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Derive page title from path
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard/users":
        return "Manage Users";
      case "/dashboard/products":
        return "Manage Products";
      // add more cases as needed
      default:
        return "Dashboard";
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    // simulate async logout
    setTimeout(() => {
      setIsLoading(false);
      // TODO: add actual logout logic here (e.g. clearing auth tokens, redirect)
      alert("Logged out");
    }, 1500);
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow w-full">
      {/* Left side: page title */}
      <h1 className="text-2xl font-semibold">{getPageTitle()}</h1>

      {/* Right side: logout button */}
      <button
        type="button"
        className={`rounded-md px-4 py-4 font-medium text-white transition-all duration-300 cursor-pointer ${
          isLoading
            ? "bg-primary-10/60 cursor-not-allowed"
            : "bg-primary-10 hover:bg-[#244F5B] active:scale-95"
        }`}
        disabled={isLoading}
        onClick={handleLogout}
      >
        {isLoading ? "Signing Out..." : "Logout"}
      </button>
    </div>
  );
};

export default Header;
