import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Groups from "./Pages/Groups/index.tsx";
import Orders from "./Pages/Orders/index.tsx";
import OrderDetail from "./Pages/Order/index.tsx";
import Labels from "./Pages/Labels/index.tsx";
import Locations from "./Pages/Locations/index.tsx";
import DashboardMenu from "./Pages/Dashboard/index.tsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: DashboardMenu,
      },
      {
        path: "/dashboard",
        Component: DashboardMenu,
      },
      {
        path: "/groups",
        Component: Groups,
      },
      {
        path: "/orders/:waveId",
        Component: Orders,
      },
      {
        path: "/order/:id",
        Component: OrderDetail,
      },
      {
        path: "/orders",
        Component: Orders,
      },
      {
        path: "/order",
        Component: OrderDetail,
      },
      {
        path: "/labels",
        Component: Labels,
      },
      {
        path: "/locations",
        Component: Locations,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
