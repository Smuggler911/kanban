import React from "react";
import '../assets/styles/home.scss'
import {NavLink} from "react-router-dom";


export default function Home() {
    return (
        <body>
        <div className={"mainPage-wrapper"}>
            <div className={"mainPage"}>
                <div className={"mainPage-header"}>
                    <h1>Create your Kanban board</h1>
                    <p>
                        just simply click here
                    </p>
                </div>
                <div className={"mainPage-button"}>
                    <NavLink  to={'/dashboard'}>
                        Create new Board
                    </NavLink>
                </div>

            </div>
        </div>
        </body>
    )

}