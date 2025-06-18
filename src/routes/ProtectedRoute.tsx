import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }:{children:ReactNode}) => {
  if (Cookies.get("isAuthenticated") !== "true") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
