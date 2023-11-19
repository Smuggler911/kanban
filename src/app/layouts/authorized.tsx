import SideBar from "../../bars/sideBar";
import { Outlet } from "react-router-dom";
import AuthorizedSearchBar from "../../bars/ Authorized/AuthorizedSearchBar";

export const Authorized = (
  <div className={"container"}>
    <AuthorizedSearchBar />
    <SideBar />
    <Outlet />
  </div>
);
