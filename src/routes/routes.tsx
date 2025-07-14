import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/Login/Login";
import ProtectedRoute from './ProtectedRoute';
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../pages/Dashboard/Users/Users";
import Category from "../pages/Dashboard/Category/Category";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      {
        path: "",
        element:<Dashboard />,
      },
      {
        path: "users",
        element:<Users />,
      },
      {
        path: "category",
        element:<Category />,
      },
    ],
  },
]);
