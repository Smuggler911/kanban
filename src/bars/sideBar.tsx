import React from "react";
import '../assets/styles/sideBar.scss'

type links = {
    name: string,
    link:string,
}

interface items {
    links: Array<links>
}

const item = (): items => ({
    links: [

        {
            name: "Profile",
            link:"#",
        },
        {
            name: "Dashboard",
            link:"/dashboard",

        },
        {
            name: "Tasks",
            link:"#"
        },
    ]
})

export default function SideBar() {
    const items = item().links;
    return (
        <body>
        <div className={"sidebar-wrapper"}>
            <div className={"sidebar"}>
                <div className={"sidebar-logo"}>
                    <h1>Cane</h1>
                </div>
                <div className={"sidebar-items"}>
                    {items.map(item => (
                        <a href={item.link}>
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
        </body>
    )
}