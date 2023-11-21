import React from "react";
import "./Kanban.scss";
import KanbanBoards from "../store";
import { observer } from "mobx-react";

export const Kanban = observer(() => {
  const { getKanbanBoards } = KanbanBoards;
  window.addEventListener("load", async () => {
    await getKanbanBoards();
  });
  const kanbanData = JSON.parse(localStorage.getItem("currentBoard") || "");
  return (
    <>
      <div className={"kanbanBoard-header"}>
        <div className={"kanban-name"}>
          <h1>{kanbanData.name}</h1>
        </div>
        <div className={"kanbanBoard"}>
          <div className={"toDo"}>
            <div className={"toDo-header"}>
              <h1>To Do</h1>
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
    </>
  );
});
