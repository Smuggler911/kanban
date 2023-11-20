import React from "react";
import "../assets/styles/sideBar.scss";

type links = {
  name: string;
  link: string;
};

interface items {
  links: Array<links>;
}

const item = (): items => ({
  links: [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Board",
      link: "/board",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Tasks",
      link: "#",
    },
  ],
});

export default function SideBar() {
  const items = item().links;
  return (
    <>
      <div className={"sidebar-wrapper"}>
        <div className={"sidebar"}>
          <div className={"sidebar-logo"}>
            <h1>Cane</h1>
          </div>
          <div className={"sidebar-items"}>
            {items.map((item, key) => (
              <a href={item.link} key={key}>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
