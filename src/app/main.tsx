import React from 'react'
import ReactDOM from 'react-dom/client'
import '../assets/styles/index.scss'
import {RouterProvider} from "react-router-dom";
import {appRoutes} from "./appRoutes";
import SideBar from "../bars/sideBar";
import SearchBar from "../bars/searchBar";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={appRoutes}/>
    </React.StrictMode>,
)
