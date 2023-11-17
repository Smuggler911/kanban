import SideBar from "../../bars/sideBar";
import SearchBar from "../../bars/searchBar";
import {Outlet} from "react-router-dom";

export const ElementLayout = (
    <div className={"container"}>
        <SearchBar/>
        <SideBar/>
        <Outlet/>
    </div>
)