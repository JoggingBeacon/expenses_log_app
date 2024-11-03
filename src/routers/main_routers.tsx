import { dashboardLoader } from "@src/loaders";
import Dashboard from "@src/pages/dashboard";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/dashboard"} />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: dashboardLoader,
  },
]);
