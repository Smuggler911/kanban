
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";

 export const appRoutes = createBrowserRouter([
    {
        path: "/",
        element:<Home/>,
    },
]);