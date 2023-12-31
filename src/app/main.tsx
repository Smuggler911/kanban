import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/styles/index.scss";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./appRoutes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={appRoutes} />
  </React.StrictMode>,
);
