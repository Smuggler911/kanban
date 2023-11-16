import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login";
import {ElementLayout} from "./layouts/elementLayout";

export const appRoutes = createBrowserRouter([
    {
        element: ElementLayout,
        errorElement: <div>error</div>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/login",
                element: <Login/>,
            }

        ],
    },
]);