import React, { useRef } from "react";
import "../assets/styles/searchBar.scss";
import { NavLink } from "react-router-dom";

export default function SearchBar() {
  const searchbar = useRef<HTMLInputElement>(null);
  const profile = useRef<HTMLDivElement>(null);

  function focusSearch() {
    if (searchbar.current !== null && profile.current !== null) {
      searchbar.current.style.width = "50rem";
      searchbar.current.style.transition = "all .5s ease-in-out";
      profile.current.style.display = "none";
    }
  }

  function blurSearch() {
    if (searchbar.current !== null && profile.current !== null) {
      searchbar.current.style.width = "20rem";
      searchbar.current.style.transition = "all .5s ease-in-out";
      profile.current.style.display = "flex";
    }
  }

  return (
    <header>
      <div className={"searchBar-wrapper"}>
        <div className={"searchBar"}>
          <div className={"searchBar-input"}>
            <input
              onFocus={focusSearch}
              onBlur={blurSearch}
              ref={searchbar}
              type={"search"}
              placeholder={"search..."}
            />
          </div>

          <div className={"searchbar-profile"} ref={profile}>
            <NavLink to="/login">Login</NavLink>
            <p>or</p>
            <NavLink to={"/signup"}>SignUp</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
