import * as React from "react";
import { createBrowserRouter, json } from "react-router-dom";
import { Homepage } from "../pages/home";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { BaseElementLayout } from "./layouts/elementLayout";
import { SignUp } from "../pages/signUp";
import { Board } from "../pages/Board";
import { Kanban } from "../pages/Board";
import { Authorized } from "./layouts/authorized";
const authorized = Boolean(localStorage.getItem("authorized?"));
export const appRoutes = createBrowserRouter([
  {
    element: authorized ? Authorized : BaseElementLayout,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        Component: Homepage,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/board",
        Component: Board,
      },
      {
        path: "kanban/:kanbanId",
        Component: Kanban,
      },
    ],
  },
]);
