import React from "react";
import './home.scss'
import {NavLink} from "react-router-dom";


export function Homepage() {
    return (
        <div className={"mainPage-wrapper"}>
            <div className={"mainPage"}>
                <div className={"mainPage-header"}>
                    <h1>Create your Kanban board</h1>
                    <p>
                        just simply click here
                    </p>
                </div>
                <div className={"mainPage-button"}>
                    <NavLink to={'/dashboard'}>
                        Create new Board
                    </NavLink>
                </div>

            </div>
        </div>
    )

}