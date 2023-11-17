import * as React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import {Homepage} from "../pages/home";
import {Dashboard} from "../pages/Dashboard";
import {Login} from "../pages/Login";
import {ElementLayout} from "./layouts/elementLayout";
import {SignUp} from "../pages/signUp";

export const appRoutes = createBrowserRouter([
    {
        element: ElementLayout,
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
                path:"/signup",
                Component:SignUp
            }

        ],
    },
]);