import BaseLayout from "@src/layouts/base";
import { dashboardLoader } from "@src/loaders";
import Dashboard from "@src/pages/dashboard";
import { createBrowserRouter } from "react-router-dom";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
    ],
  },
]);
