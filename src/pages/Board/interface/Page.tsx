import React, { useRef } from "react";
import "./Board.scss";
import CreateIcon from "./assets/plus-large-svgrepo-com.svg";
import { observer } from "mobx-react";
import KanbanBoards from "./store";
import { CreateKanban } from "./store";
import Cross from "./assets/cross-svgrepo-com.svg";
import { Simulate } from "react-dom/test-utils";
import blur = Simulate.blur;
import { NavLink } from "react-router-dom";
export const Board = observer(() => {
  const { data, getKanbanBoards } = KanbanBoards;
  window.addEventListener("load", async () => {
    await getKanbanBoards();
  });
  const { handleInput, submitForm } = CreateKanban;
  const form = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const allBoards = useRef<HTMLDivElement>(null);
  const onClick = () => {
    if (
      form.current !== null &&
      header.current !== null &&
      allBoards.current !== null
    ) {
      form.current.style.display = "flex";
      header.current.style.opacity = "20%";
      allBoards.current.style.opacity = "20%";
      header.current.style.transition = "all .3s";
      allBoards.current.style.transition = "all .3s";
    }
  };
  const exitForm = () => {
    if (
      form.current !== null &&
      header.current !== null &&
      allBoards.current !== null
    ) {
      form.current.style.display = "none";
      header.current.style.opacity = "100%";
      allBoards.current.style.opacity = "100%";
      header.current.style.transition = "all .3s";
      allBoards.current.style.transition = "all .3s";
    }
  };

  return (
    <>
      <div className={"createNewBoard-section"} ref={header}>
        <div className={"createNewBoard-button"}>
          <button onClick={onClick}>
            Create New Board <img src={CreateIcon} />
          </button>
        </div>
        <div className={"createNewBoard-header"}>
          <p>create kanban board to bring your thoughts in text </p>
        </div>
      </div>
      <div className={"allKanbanBoards-section"} ref={allBoards}>
        <div className={"allKanbanBoards-items"}>
          {data.response.map((items, key) => (
            <NavLink
              onClick={() => {
                localStorage.setItem("kanbanId", String(key));
                data.response.map((item, key) => {
                  const Key = localStorage.getItem("kanbanId");
                  const kanbanKey = Number(Key);
                  if (key === kanbanKey) {
                    const dataStorage = { name: item.name, owner: item.owner };
                    localStorage.setItem(
                      "currentBoard",
                      JSON.stringify(dataStorage),
                    );
                  }
                });
              }}
              to={`../kanban/${key}`}
              key={key}
            >
              {items.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={"CreateNewBoard-form"} ref={form}>
        <form onSubmit={submitForm}>
          <div className={"form-exit"}>
            <button onClick={exitForm}>
              <img src={Cross} />
            </button>
          </div>
          <div className={"form-header"}>
            <h1>Create new board</h1>
          </div>
          <div className={"form-name"}>
            <input
              type={"text"}
              name={"name"}
              placeholder={"name of a project"}
              onChange={handleInput}
              required
            />
          </div>
          <div className={"form-owner"}>
            <input type={"text"} name={"owner"} hidden />
          </div>
          <div className={"form-participants"}>
            <input type={"text"} name={"participants"} hidden />
          </div>
          <div className={"form-button"}>
            <button type={"submit"}>Create</button>
          </div>
        </form>
      </div>
    </>
  );
});
