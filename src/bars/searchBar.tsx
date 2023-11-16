import React, {useRef} from "react";
import '../assets/styles/searchBar.scss';

export default function SearchBar() {

    const searchbar = useRef<HTMLInputElement>(null);

    function focusSearch() {
        if (searchbar.current !== null) {
            searchbar.current.style.width = '50rem';
            searchbar.current.style.transition = 'all .3s ease-in-out';
        }
    }

    function blurSearch() {
        if (searchbar.current !== null) {
            searchbar.current.style.width = '20rem';
            searchbar.current.style.transition = 'all .3s ease-in-out';
        }
    }

    return (
        <header>
            <div className={"searchBar-wrapper"}>
                <div className={"searchBar"}>
                    <div className={"searchBar-input"}>
                        <input onFocus={focusSearch} onBlur={blurSearch} ref={searchbar} type={"search"}
                               placeholder={"search..."}/>
                    </div>
                </div>
            </div>
        </header>
    )
}