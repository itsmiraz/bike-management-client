import App from "@/App";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import BikeManagement from "@/pages/dashboard/bikeManagement/bikeManagement";
import SalesHistory from "@/pages/dashboard/salesHistory";
import SalesManagement from "@/pages/dashboard/salesManagement";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "bike-management",
        element: <BikeManagement />,
      },
      {
        path: "sales-management",
        element: <SalesManagement />,
      },
      {
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
]);
