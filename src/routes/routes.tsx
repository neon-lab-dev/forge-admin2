import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../pages/Login/Login";
import ProtectedRoute from './ProtectedRoute';
import Dashboard from "../pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
    ],
  }
]);
