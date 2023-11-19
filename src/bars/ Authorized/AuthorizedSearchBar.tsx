import React, { useRef } from "react";
import "../../assets/styles/authorizedSearchBar.scss";
export default function AuthorizedSearchBar() {
  const searchbar = useRef<HTMLInputElement>(null);
  const login = localStorage.getItem("auth");

  function focusSearch() {
    if (searchbar.current !== null) {
      searchbar.current.style.width = "50rem";
      searchbar.current.style.transition = "all .3s ease-in-out";
    }
  }

  function blurSearch() {
    if (searchbar.current !== null) {
      searchbar.current.style.width = "20rem";
      searchbar.current.style.transition = "all .3s ease-in-out";
    }
  }

  return (
    <>
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
          <div className={"login-wrapper"}>
            <div className={"login"}>{login}</div>
          </div>
        </div>
      </div>
    </>
  );
}
