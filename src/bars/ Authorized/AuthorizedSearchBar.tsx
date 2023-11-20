import React, { useRef } from "react";
import "../../assets/styles/authorizedSearchBar.scss";
export default function AuthorizedSearchBar() {
  const searchbar = useRef<HTMLInputElement>(null);
  const login = localStorage.getItem("auth");
  const profile = useRef<HTMLDivElement>(null);

  function focusSearch() {
    if (searchbar.current !== null && profile.current !== null) {
      searchbar.current.style.width = "50rem";
      searchbar.current.style.transition = "all .3s ease-in-out";
      profile.current.style.display = "none";
      profile.current.style.transition = "all .3s ease-in-out";
    }
  }

  function blurSearch() {
    if (searchbar.current !== null && profile.current !== null) {
      searchbar.current.style.width = "20rem";
      searchbar.current.style.transition = "all .3s ease-in-out";
      profile.current.style.display = "flex";
      profile.current.style.transition = "all .3s ease-in-out";
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
          <div className={"login-wrapper"} ref={profile}>
            <div className={"login"}>{login}</div>
          </div>
        </div>
      </div>
    </>
  );
}
