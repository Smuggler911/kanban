import React, { useRef } from "react";
import "./Kanban.scss";
import KanbanBoards from "../store";
import { observer } from "mobx-react";
import plusButton from "../assets/plus-large-svgrepo-com.svg";
import exitButton from "../assets/cross-svgrepo-com.svg";

export const Kanban = observer(() => {
  const { getKanbanBoards } = KanbanBoards;
  window.addEventListener("load", async () => {
    await getKanbanBoards();
  });
  const kanbanData = JSON.parse(localStorage.getItem("currentBoard") || "");
  const createToDoForm = useRef<HTMLDivElement>(null);
  const boardContainer = useRef<HTMLDivElement>(null);
  const ExitForm = () => {
    if (createToDoForm.current !== null && boardContainer.current !== null) {
      createToDoForm.current.style.display = "none";
      boardContainer.current.style.opacity = "100%";
      boardContainer.current.style.transition = "all .3s ";
    }
  };
  const EnterForm = () => {
    if (createToDoForm.current !== null && boardContainer.current !== null) {
      createToDoForm.current.style.display = "flex";
      boardContainer.current.style.opacity = "20%";
      boardContainer.current.style.transition = "all .3s ";
    }
  };
  return (
    <>
      <div className={"kanbanBoard-header"}>
        <div className={"kanban-name"}>
          <h1>{kanbanData.name}</h1>
        </div>
        <div className={"kanbanBoard"} ref={boardContainer}>
          <div className={"toDo"}>
            <div className={"toDo-header"}>
              <h1>To Do</h1>
              <div className={"header-button"}>
                <button onClick={EnterForm}>
                  <img src={plusButton} />
                </button>
              </div>
            </div>
          </div>
          <div className={"inProgress"}>
            <div className={"inProgress-header"}>
              <h1>in Progress</h1>
            </div>
          </div>
          <div className={"Done"}>
            <div className={"Done-header"}>
              <h1>Done</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={"createToDo"} ref={createToDoForm}>
        <form>
          <div className={"exit-ToDoCreation"}>
            <span onClick={ExitForm}>
              <img src={exitButton} />
            </span>
          </div>
          <div className={"toDoCreation-header"}>
            <h1>Create new Task</h1>
          </div>
          <div className={"toDoCreation-taskInput"}>
            <textarea
              placeholder={"create new task"}
              name={"taskInput"}
            ></textarea>
          </div>
          <div className={"toDoCreation-submit"}>
            <button type={"submit"}>Create</button>
          </div>
        </form>
      </div>
    </>
  );
});
